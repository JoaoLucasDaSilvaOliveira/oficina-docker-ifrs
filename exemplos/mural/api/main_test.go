package main

import (
	"context"
	"errors"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

type memoryRepo struct {
	items   []Message
	offline bool
}

func (m *memoryRepo) Ping(context.Context) error {
	if m.offline {
		return errors.New("offline")
	}
	return nil
}
func (m *memoryRepo) List(ctx context.Context) ([]Message, error) { return m.items, m.Ping(ctx) }
func (m *memoryRepo) Create(ctx context.Context, a, s string) (Message, error) {
	if err := m.Ping(ctx); err != nil {
		return Message{}, err
	}
	v := Message{ID: int64(len(m.items) + 1), Author: a, Text: s, CreatedAt: time.Now()}
	m.items = append(m.items, v)
	return v, nil
}
func (m *memoryRepo) Delete(ctx context.Context, id int64) (bool, error) {
	if err := m.Ping(ctx); err != nil {
		return false, err
	}
	for i, v := range m.items {
		if v.ID == id {
			m.items = append(m.items[:i], m.items[i+1:]...)
			return true, nil
		}
	}
	return false, nil
}
func call(h http.Handler, method, path, body, contentType string) *httptest.ResponseRecorder {
	r := httptest.NewRequest(method, path, strings.NewReader(body))
	if contentType != "" {
		r.Header.Set("Content-Type", contentType)
	}
	w := httptest.NewRecorder()
	h.ServeHTTP(w, r)
	return w
}
func TestMessageLifecycleAndValidation(t *testing.T) {
	h := newHandler(&memoryRepo{})
	tests := []struct {
		body        string
		contentType string
		want        int
	}{
		{`{"author":" Ana ","text":" Aprendi volumes! "}`, "application/json", 201},
		{`{"author":"","text":"oi"}`, "application/json", 400},
		{`{"author":"Ana","text":""}`, "application/json", 400},
		{`{"author":"Ana","text":"oi","extra":1}`, "application/json", 400},
		{`{"author":"Ana","text":"oi"} {}`, "application/json", 400},
		{`null`, "application/json", 400},
		{`{`, "application/json", 400},
		{`{}`, "text/plain", 415},
		{`{"author":"Ana","text":"` + strings.Repeat("x", 5000) + `"}`, "application/json", 413},
		{`{"author":"Ana","text":"` + strings.Repeat("á", 280) + `"}`, "application/json", 201},
		{`{"author":"Ana","text":"` + strings.Repeat("á", 281) + `"}`, "application/json", 400},
	}
	for _, tt := range tests {
		w := call(h, "POST", "/api/messages", tt.body, tt.contentType)
		if w.Code != tt.want {
			t.Fatalf("want %d got %d: %s", tt.want, w.Code, w.Body.String())
		}
	}
	w := call(h, "GET", "/api/messages", "", "")
	if !strings.Contains(w.Body.String(), `"author":"Ana"`) || strings.Contains(w.Body.String(), `"author":" Ana "`) {
		t.Fatal(w.Body.String())
	}
	if w := call(h, "DELETE", "/api/messages/1", "", ""); w.Code != 204 {
		t.Fatal(w.Code)
	}
	if w := call(h, "DELETE", "/api/messages/1", "", ""); w.Code != 404 {
		t.Fatal(w.Code)
	}
	if w := call(h, "DELETE", "/api/messages/zero", "", ""); w.Code != 400 {
		t.Fatal(w.Code)
	}
}
func TestDatabaseFailureAndRecovery(t *testing.T) {
	repo := &memoryRepo{offline: true}
	h := newHandler(repo)
	for _, path := range []string{"/readyz", "/api/messages"} {
		if w := call(h, "GET", path, "", ""); w.Code != 503 {
			t.Fatal(path, w.Code)
		}
	}
	if w := call(h, "GET", "/healthz", "", ""); w.Code != 200 {
		t.Fatal(w.Code)
	}
	repo.offline = false
	if w := call(h, "GET", "/readyz", "", ""); w.Code != 200 {
		t.Fatal(w.Code)
	}
	if w := call(h, "GET", "/api/messages", "", ""); !strings.Contains(w.Body.String(), `"messages":[]`) {
		t.Fatal(w.Body.String())
	}
}
