package main

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"mime"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"strings"
	"syscall"
	"time"
	"unicode/utf8"

	"github.com/jackc/pgx/v5/pgxpool"
)

var version = "1.0.0"

// A mesma API recebe um repositório real em produção e um substituto nos testes.
type Message struct {
	ID        int64     `json:"id"`
	Author    string    `json:"author"`
	Text      string    `json:"text"`
	CreatedAt time.Time `json:"created_at"`
}

type Repository interface {
	Ping(context.Context) error
	List(context.Context) ([]Message, error)
	Create(context.Context, string, string) (Message, error)
	Delete(context.Context, int64) (bool, error)
}

type Postgres struct{ pool *pgxpool.Pool }

func (p *Postgres) Ping(ctx context.Context) error { return p.pool.Ping(ctx) }
func (p *Postgres) List(ctx context.Context) ([]Message, error) {
	rows, err := p.pool.Query(ctx, `SELECT id, author, text, created_at FROM messages ORDER BY id DESC LIMIT 100`)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	messages := make([]Message, 0)
	for rows.Next() {
		var m Message
		if err := rows.Scan(&m.ID, &m.Author, &m.Text, &m.CreatedAt); err != nil {
			return nil, err
		}
		messages = append(messages, m)
	}
	return messages, rows.Err()
}
func (p *Postgres) Create(ctx context.Context, author, text string) (Message, error) {
	var m Message
	err := p.pool.QueryRow(ctx, `INSERT INTO messages(author, text) VALUES ($1, $2) RETURNING id, author, text, created_at`, author, text).Scan(&m.ID, &m.Author, &m.Text, &m.CreatedAt)
	return m, err
}
func (p *Postgres) Delete(ctx context.Context, id int64) (bool, error) {
	result, err := p.pool.Exec(ctx, `DELETE FROM messages WHERE id=$1`, id)
	return result.RowsAffected() > 0, err
}

func jsonResponse(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.Header().Set("Cache-Control", "no-store")
	w.Header().Set("X-Content-Type-Options", "nosniff")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(value); err != nil {
		slog.Warn("resposta interrompida", "erro", err)
	}
}
func problem(w http.ResponseWriter, status int, message string) {
	jsonResponse(w, status, map[string]string{"error": message})
}

func newHandler(repo Repository) http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /healthz", func(w http.ResponseWriter, r *http.Request) {
		jsonResponse(w, http.StatusOK, map[string]string{"status": "ok", "version": version})
	})
	mux.HandleFunc("GET /readyz", func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
		defer cancel()
		if err := repo.Ping(ctx); err != nil {
			problem(w, 503, "Banco indisponível. Tente novamente em instantes.")
			return
		}
		jsonResponse(w, 200, map[string]string{"status": "ready"})
	})
	mux.HandleFunc("GET /api/info", func(w http.ResponseWriter, r *http.Request) {
		host, _ := os.Hostname()
		jsonResponse(w, 200, map[string]string{"hostname": host, "version": version, "database": "PostgreSQL", "language": "Go"})
	})
	mux.HandleFunc("GET /api/messages", func(w http.ResponseWriter, r *http.Request) {
		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()
		messages, err := repo.List(ctx)
		if err != nil {
			slog.Error("listar recados", "erro", err)
			problem(w, 503, "Não foi possível consultar o banco. Tente atualizar.")
			return
		}
		if messages == nil {
			messages = []Message{}
		}
		jsonResponse(w, 200, map[string]any{"messages": messages})
	})
	mux.HandleFunc("POST /api/messages", func(w http.ResponseWriter, r *http.Request) {
		mediaType, _, err := mime.ParseMediaType(r.Header.Get("Content-Type"))
		if err != nil || mediaType != "application/json" {
			problem(w, 415, "Envie Content-Type: application/json.")
			return
		}
		r.Body = http.MaxBytesReader(w, r.Body, 4096)
		var body struct {
			Author string `json:"author"`
			Text   string `json:"text"`
		}
		decoder := json.NewDecoder(r.Body)
		decoder.DisallowUnknownFields()
		err = decoder.Decode(&body)
		if err == nil {
			var extra any
			if next := decoder.Decode(&extra); next != io.EOF {
				err = errors.New("conteúdo depois do JSON")
			}
		}
		if err != nil {
			var tooLarge *http.MaxBytesError
			if errors.As(err, &tooLarge) {
				problem(w, 413, "O corpo da requisição excedeu 4 KiB.")
			} else {
				problem(w, 400, "Envie um objeto JSON com author e text.")
			}
			return
		}
		body.Author = strings.TrimSpace(body.Author)
		body.Text = strings.TrimSpace(body.Text)
		if n := utf8.RuneCountInString(body.Author); n < 1 || n > 40 {
			problem(w, 400, "O nome deve ter entre 1 e 40 caracteres.")
			return
		}
		if n := utf8.RuneCountInString(body.Text); n < 1 || n > 280 {
			problem(w, 400, "O recado deve ter entre 1 e 280 caracteres.")
			return
		}
		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()
		message, err := repo.Create(ctx, body.Author, body.Text)
		if err != nil {
			slog.Error("salvar recado", "erro", err)
			problem(w, 503, "O recado não foi salvo. Tente novamente.")
			return
		}
		w.Header().Set("Location", fmt.Sprintf("/api/messages/%d", message.ID))
		jsonResponse(w, 201, message)
	})
	mux.HandleFunc("DELETE /api/messages/{id}", func(w http.ResponseWriter, r *http.Request) {
		id, err := strconv.ParseInt(r.PathValue("id"), 10, 64)
		if err != nil || id < 1 {
			problem(w, 400, "Identificador inválido.")
			return
		}
		ctx, cancel := context.WithTimeout(r.Context(), 3*time.Second)
		defer cancel()
		deleted, err := repo.Delete(ctx, id)
		if err != nil {
			slog.Error("excluir recado", "erro", err)
			problem(w, 503, "O recado não foi excluído. Tente novamente.")
			return
		}
		if !deleted {
			problem(w, 404, "Recado não encontrado.")
			return
		}
		w.WriteHeader(http.StatusNoContent)
	})
	return mux
}

const schema = `CREATE TABLE IF NOT EXISTS messages (
    id BIGSERIAL PRIMARY KEY,
    author TEXT NOT NULL CHECK (char_length(author) BETWEEN 1 AND 40),
    text TEXT NOT NULL CHECK (char_length(text) BETWEEN 1 AND 280),
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
)`

func connect(ctx context.Context) (*pgxpool.Pool, error) {
	// Sem DATABASE_URL, pgx lê PGHOST, PGPORT, PGUSER, PGPASSWORD, PGDATABASE e PGSSLMODE.
	pool, err := pgxpool.New(ctx, os.Getenv("DATABASE_URL"))
	if err != nil {
		return nil, err
	}
	for {
		attempt, cancel := context.WithTimeout(ctx, 2*time.Second)
		err = pool.Ping(attempt)
		if err == nil {
			_, err = pool.Exec(attempt, schema)
		}
		cancel()
		if err == nil {
			return pool, nil
		}
		slog.Info("aguardando banco e schema", "erro", err)
		select {
		case <-ctx.Done():
			pool.Close()
			return nil, ctx.Err()
		case <-time.After(time.Second):
		}
	}
}
func port() string {
	if p := os.Getenv("PORT"); p != "" {
		return p
	}
	return "8080"
}
func healthcheck() int {
	client := http.Client{Timeout: 3 * time.Second}
	resp, err := client.Get("http://127.0.0.1:" + port() + "/readyz")
	if err != nil {
		return 1
	}
	defer resp.Body.Close()
	if resp.StatusCode != 200 {
		return 1
	}
	return 0
}
func run() error {
	ctx, stop := signal.NotifyContext(context.Background(), syscall.SIGINT, syscall.SIGTERM)
	defer stop()
	startup, cancel := context.WithTimeout(ctx, 60*time.Second)
	pool, err := connect(startup)
	cancel()
	if err != nil {
		return fmt.Errorf("iniciar banco: %w", err)
	}
	defer pool.Close()
	server := &http.Server{Addr: ":" + port(), Handler: newHandler(&Postgres{pool}), ReadHeaderTimeout: 5 * time.Second, ReadTimeout: 10 * time.Second, WriteTimeout: 10 * time.Second, IdleTimeout: 60 * time.Second}
	result := make(chan error, 1)
	go func() { slog.Info("API pronta", "porta", port(), "versao", version); result <- server.ListenAndServe() }()
	select {
	case err := <-result:
		return err
	case <-ctx.Done():
		shutdown, cancel := context.WithTimeout(context.Background(), 10*time.Second)
		defer cancel()
		slog.Info("encerrando API")
		return server.Shutdown(shutdown)
	}
}
func main() {
	if len(os.Args) > 1 && os.Args[1] == "-healthcheck" {
		os.Exit(healthcheck())
	}
	if err := run(); err != nil && !errors.Is(err, http.ErrServerClosed) {
		slog.Error("API encerrada", "erro", err)
		os.Exit(1)
	}
}
