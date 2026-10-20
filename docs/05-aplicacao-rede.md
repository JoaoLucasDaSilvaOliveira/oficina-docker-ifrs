# Aplicação Go, frontend, PostgreSQL e rede

Tempo: 30 minutos. Execute na raiz do pacote, no terminal do host.

## 1. Arquitetura

O navegador acessa o serviço `web` pela porta 8088 do host. Nginx serve o frontend e encaminha `/api/` para `api:8080`. A API em Go usa `db:5432` para o PostgreSQL. Os serviços participam da rede padrão do projeto `oficina-mural`. O banco usa o volume `dados-postgres`.

A IDE continua desktop. O navegador aparece aqui porque o mural é uma aplicação web.

## 2. Subir e verificar

```bash
docker compose -f compose.app.yaml config
docker compose -f compose.app.yaml up -d --build --wait
docker compose -f compose.app.yaml ps
docker compose -f compose.app.yaml logs --tail 30 api
```

Abra `http://localhost:8088`. Escreva um nome e um recado. Resultado esperado: confirmação de gravação e o recado na lista. O rodapé mostra versão e hostname da API para relacionar interface e processo.

A API valida nome de 1 a 40 caracteres e recado de 1 a 280, limita o corpo JSON, usa parâmetros nas consultas e devolve mensagens de erro sem expor a configuração do banco. O frontend escreve os recados com `textContent`, de modo que o conteúdo é exibido como texto.

## 3. Inspecionar pelo lado do banco

```bash
docker compose -f compose.app.yaml exec db sh
```

Dentro do container do banco:

```bash
psql -U "$POSTGRES_USER" -d "$POSTGRES_DB" \
  -c 'SELECT id, author, text, created_at FROM messages ORDER BY id DESC LIMIT 5;'
exit
```

Resultado esperado: os recados que aparecem na página. `psql` pertence à imagem do PostgreSQL; não foi instalado no host.

## 4. Prontidão e vida do processo

```bash
docker compose -f compose.app.yaml exec -T api /api -healthcheck
```

A verificação retorna código zero quando `/readyz` consegue consultar o banco. `/healthz` identifica um processo HTTP vivo; `/readyz` inclui disponibilidade do banco. A API cria a tabela na inicialização e aguarda o banco por até 60 segundos. Depois de iniciar, o pool de conexões permite a recuperação de conexões quando o banco volta.

O Compose usa `depends_on` com `condition: service_healthy`. Um healthcheck testa somente a condição programada. `pg_isready` não verifica todas as tabelas, e marcar um container como unhealthy não implementa, por si, seu reinício.

## 5. Persistência real

Publique um recado e execute:

```bash
docker compose -f compose.app.yaml down
docker compose -f compose.app.yaml up -d --wait
```

Atualize o navegador. O recado permanece no volume nomeado. A imagem da API e a camada dos novos containers não contêm esses dados.

Para apagar os recados deliberadamente, apenas no ambiente de exercício:

```bash
docker compose -f compose.app.yaml down -v
docker compose -f compose.app.yaml up -d --wait
```

Agora o volume novo começa vazio. Os scripts não executam essa limpeza automaticamente.

## 6. Uma dependência fica indisponível

```bash
docker compose -f compose.app.yaml stop db
```

Tente publicar. Resultado esperado: uma mensagem de falha, sem afirmar que o recado foi salvo. Observe:

```bash
docker compose -f compose.app.yaml logs --tail 30 api
docker compose -f compose.app.yaml start db
```

Depois que o banco estiver pronto, atualize e publique novamente. A API não precisa de uma nova imagem para essa recuperação.

## 7. Rede sem decorar endereços IP

- `localhost` no processo da API aponta para o próprio container da API.
- `db` resolve o serviço PostgreSQL dentro da rede Compose.
- `api` resolve a API para o Nginx na mesma rede.
- O JavaScript roda no navegador do host e usa `/api`, na mesma origem da página. O Nginx encaminha internamente; o navegador não precisa resolver `api`.
- A publicação `127.0.0.1:8088:8080` significa endereço do host, porta do host e porta do serviço. `EXPOSE` sozinho não faz isso.
- O servidor Go escuta em `:8080`, alcançável pelas interfaces do container, e não apenas no loopback interno.

## 8. Aprofundamento opcional: duas redes

O overlay `compose.rede.yaml` coloca web e API na rede `entrada`, e API e banco na rede `dados`. O banco deixa de compartilhar uma rede com o frontend. A rede de dados é interna.

```bash
docker compose -f compose.app.yaml -f compose.rede.yaml config
docker compose -f compose.app.yaml -f compose.rede.yaml up -d --wait
docker network inspect oficina-mural_dados
```

A API continua usando `db:5432`, mas o nome do banco não é disponibilizado ao frontend por essa rede. Inspecione os membros e compare com o desenho. Esse isolamento de rede não substitui credenciais ou controles da aplicação.

Para voltar à configuração inicial, execute `docker compose -f compose.app.yaml up -d --wait`. O volume nomeado continua o mesmo.

## 9. Rotas da API

| Método e rota | Resultado |
| --- | --- |
| GET /healthz | Processo HTTP e versão |
| GET /readyz | Disponibilidade do banco |
| GET /api/info | Hostname e versão, sem credenciais |
| GET /api/messages | Até 100 recados, mais recentes primeiro |
| POST /api/messages | JSON com author e text; retorna 201 |
| DELETE /api/messages/ID | Exclui um recado e retorna 204 |

Fontes: [rede Compose](https://docs.docker.com/compose/how-tos/networking/), [prontidão](https://docs.docker.com/compose/how-tos/startup-order/), [imagem PostgreSQL](https://hub.docker.com/_/postgres), [pgx](https://github.com/jackc/pgx).
