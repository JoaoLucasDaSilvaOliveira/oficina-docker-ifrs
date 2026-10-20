#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
docker compose -f compose.app.yaml config --quiet
docker compose -f compose.app.yaml up -d --build --wait --wait-timeout 120
docker compose -f compose.app.yaml exec -T api /api -healthcheck
response=$(docker compose -f compose.app.yaml exec -T web wget -q -O - http://127.0.0.1:8080/api/info)
case "$response" in
  *'"database":"PostgreSQL"'*) printf '%s\n' 'Frontend/proxy → API: resposta recebida.' ;;
  *) printf '%s\n' 'A resposta da API não foi a esperada.' >&2; exit 1 ;;
esac
docker compose -f compose.app.yaml exec -T db sh -c 'psql -v ON_ERROR_STOP=1 -U "$POSTGRES_USER" -d "$POSTGRES_DB" -c "SELECT count(*) AS recados FROM messages;"'
printf '%s\n' 'Verificação básica passou. A stack continua em execução; os dados foram preservados.'
