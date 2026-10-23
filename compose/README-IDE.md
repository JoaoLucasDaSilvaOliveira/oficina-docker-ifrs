# Abrir a IDE com Compose

Extraia este ZIP em `HOME/oficina-docker`. Abra o terminal da sessão gráfica e use Bash. Não edite os arquivos YAML nem procure caminhos no computador: copie o bloco inteiro correspondente à etapa.

## 1. IDE sem acesso à pasta pessoal — Linux Mint / X11

Feche a janela da IDE usada no exercício anterior. A primeira linha remove apenas esse container de demonstração.

```bash
docker rm -f ide
cd "$HOME/oficina-docker"
LOCAL_UID="$(id -u)" LOCAL_GID="$(id -g)" \
HOST_HOSTNAME="$(hostname)" XAUTHORITY="${XAUTHORITY:-$HOME/.Xauthority}" \
docker compose -f compose.ide.yaml up -d
```

O comando identifica seu usuário e sua sessão gráfica automaticamente. Usa a autorização indicada pela sessão; se essa variável estiver vazia, usa `$HOME/.Xauthority`, o caminho padrão da sessão X11 do Mint. Nenhuma permissão global de acesso ao display é alterada.

## 2. IDE com acesso à pasta pessoal

```bash
cd "$HOME/oficina-docker"
LOCAL_UID="$(id -u)" LOCAL_GID="$(id -g)" \
HOST_HOSTNAME="$(hostname)" XAUTHORITY="${XAUTHORITY:-$HOME/.Xauthority}" \
docker compose -f compose.ide.yaml -f compose.ide.bind.yaml up -d --force-recreate
```

Agora a pasta pessoal aparece em `/host-home`. As alterações feitas ali são nos arquivos reais do computador. O comando fornece novamente todos os valores necessários; não depende de um `export` executado antes.

## 3. Encerrar

```bash
cd "$HOME/oficina-docker"
docker compose -f compose.ide.yaml down
```

## Alternativa: sessão Wayland nativa

Use apenas se o instrutor indicar Wayland. Feche a IDE anterior antes de trocar de base.

```bash
docker rm -f ide
cd "$HOME/oficina-docker"
LOCAL_UID="$(id -u)" LOCAL_GID="$(id -g)" \
WAYLAND_SOCKET="$(case "$WAYLAND_DISPLAY" in /*) printf '%s' "$WAYLAND_DISPLAY" ;; *) printf '%s/%s' "$XDG_RUNTIME_DIR" "$WAYLAND_DISPLAY" ;; esac)" \
docker compose -f compose.ide.wayland.yaml up -d
```

Esse comando também calcula o caminho do socket automaticamente. A integração gráfica do laboratório deve ser validada pelo instrutor antes da aula, não configurada pelos alunos.
