#!/usr/bin/env bash
set -euo pipefail
cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.."
output=${1:-docs/compose-ajuda-local.txt}
mkdir -p -- "$(dirname -- "$output")"
export_help() {
  local help command
  help=$(docker compose "$@" --help)
  printf '\n===== docker compose %s --help =====\n%s\n' "$*" "$help"
  [[ $# -lt 4 ]] || return 0
  while read -r command; do
    [[ "$command" =~ ^[a-z][a-z-]*$ && "$command" != help ]] || continue
    export_help "$@" "$command"
  done < <(printf '%s\n' "$help" | awk '/^(Management |Available )?Commands:/{active=1;next} /^[^[:space:]]/{active=0} active && /^  [a-z][a-z-]+[[:space:]]/{print $1}')
}
{
  docker compose version
  export_help
} > "$output"
printf 'Referência da versão instalada salva em %s\n' "$output"
