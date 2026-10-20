#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
docker pull alpine:3.22
docker pull golang:1.27.3-alpine
docker compose -f compose.app.yaml pull db
docker compose -f compose.app.yaml build
docker build -f exemplos/mural/api/Dockerfile.simples -t oficina/api-simples:1.0.0 exemplos/mural/api
docker compose build
printf '%s\n' 'Aplicação e materiais preparados. A IDE gráfica é preparada separadamente: ./scripts/ide.sh preparar'
