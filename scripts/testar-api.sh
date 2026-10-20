#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
docker run --rm --user "$(id -u):$(id -g)" \
  --mount "type=bind,source=$PWD/exemplos/mural/api,target=/src" \
  -w /src -e GOCACHE=/tmp/go-cache -e GOPATH=/tmp/go \
  golang:1.27.3-alpine go test ./...
