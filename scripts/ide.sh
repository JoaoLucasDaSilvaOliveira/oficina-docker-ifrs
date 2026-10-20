#!/usr/bin/env bash
set -euo pipefail
ROOT=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
cd "$ROOT"
RUNTIME="$ROOT/.runtime"
ENVFILE="$RUNTIME/grafico.env"
case "${1:-ajuda}" in
  preparar)
    [[ "$(id -u)" != 0 ]] || { echo "Execute como o usuário da sessão gráfica, sem sudo neste script." >&2; exit 1; }
    mkdir -p "$RUNTIME"
    chmod 700 "$RUNTIME"
    docker build --build-arg "LOCAL_UID=$(id -u)" --build-arg "LOCAL_GID=$(id -g)" -t oficina/ide:1.0.0 exemplos/ide
    backend=${OFICINA_GUI_BACKEND:-x11}
    if [[ "$backend" == wayland ]]; then
      socket=${WAYLAND_DISPLAY:-wayland-0}
      [[ "$socket" == /* ]] || socket="${XDG_RUNTIME_DIR:?Sessão Wayland sem XDG_RUNTIME_DIR}/$socket"
      [[ -S "$socket" ]] || { echo "Socket Wayland não encontrado: $socket" >&2; exit 1; }
      printf 'OFICINA_WAYLAND_SOCKET=%s\nOFICINA_GUI_BACKEND=wayland\n' "$socket" > "$ENVFILE"
    else
      : "${DISPLAY:?DISPLAY não definido. Execute no terminal da sessão gráfica local.}"
      auth=${XAUTHORITY:-$HOME/.Xauthority}
      [[ -f "$auth" ]] || { echo "Arquivo Xauthority não encontrado. Defina XAUTHORITY com o arquivo da sessão ou use o modo Wayland." >&2; exit 1; }
      [[ -d /tmp/.X11-unix ]] || { echo 'Sockets X11 não encontrados em /tmp/.X11-unix.' >&2; exit 1; }
      docker run --rm --user "$(id -u):$(id -g)" -e DISPLAY \
        --mount "type=bind,source=$auth,target=/tmp/original.xauth,readonly" \
        --mount "type=bind,source=$RUNTIME,target=/saida" \
        oficina/ide:1.0.0 sh -ec 'xauth -f /tmp/original.xauth nlist | sed "s/^..../ffff/" | xauth -f /saida/xauthority nmerge -; test -s /saida/xauthority; chmod 600 /saida/xauthority'
      printf 'DISPLAY=%s\nOFICINA_XAUTH=%s\nOFICINA_GUI_BACKEND=x11\n' "$DISPLAY" "$RUNTIME/xauthority" > "$ENVFILE"
    fi
    echo 'Integração preparada. Execute: ./scripts/ide.sh abrir'
    ;;
  abrir|com-projeto|parar|estado)
    [[ -f "$ENVFILE" ]] || { echo 'Execute primeiro: ./scripts/ide.sh preparar' >&2; exit 1; }
    backend=$(sed -n 's/^OFICINA_GUI_BACKEND=//p' "$ENVFILE")
    file=compose.ide.yaml
    [[ "$backend" != wayland ]] || file=compose.ide.wayland.yaml
    args=(--env-file "$ENVFILE" -f "$file")
    if [[ "${1}" == com-projeto ]]; then args+=(-f compose.ide.bind.yaml); fi
    case "$1" in
      abrir) docker compose "${args[@]}" up -d; docker compose "${args[@]}" exec ide abrir-ide ;;
      com-projeto) docker compose "${args[@]}" up -d --force-recreate; docker compose "${args[@]}" exec ide abrir-ide ;;
      parar) docker compose "${args[@]}" down ;;
      estado) docker compose "${args[@]}" ps -a ;;
    esac
    ;;
  *) printf '%s\n' 'Uso: ./scripts/ide.sh preparar|abrir|com-projeto|estado|parar' 'Alternativa: OFICINA_GUI_BACKEND=wayland ./scripts/ide.sh preparar' ;;
esac
