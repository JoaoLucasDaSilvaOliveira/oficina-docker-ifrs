# Compose, serviços e armazenamento

Compose descreve serviços e recursos em YAML. O primeiro conjunto deste bloco é o mural pronto: frontend, API Go e PostgreSQL. A turma não precisa baixar ou compreender o código dessa aplicação.

Baixe [Compose do mural](../downloads/compose-mural.zip) e extraia em `HOME/oficina-docker`. Devem aparecer `compose.app.yaml`, `compose.rede.yaml` e `compose.hub.yaml`. Todos consomem imagens prontas; não dependem de contexto local de build.

## 1. Conferir, iniciar e observar

```bash
cd "$HOME/oficina-docker"
docker compose -f compose.app.yaml config
docker compose -f compose.app.yaml pull
docker compose -f compose.app.yaml up -d --wait
docker compose -f compose.app.yaml ps
docker compose -f compose.app.yaml logs -f --tail 50
```

Abra `http://localhost:8088`. `config` mostra o modelo resolvido, sem iniciar os serviços. O `-f` antes do subcomando seleciona o arquivo; o `-f` de logs acompanha novas mensagens. Ctrl+C sai do acompanhamento sem parar os containers.

| Nome | Papel |
| --- | --- |
| oficina-mural | Projeto Compose |
| web, api, db | Serviços no YAML |
| joaolsodocker/oficina-api:1.0.0 | Imagem da API |
| oficina-mural-api-1 | Container criado para uma instância da API |
| oficina-mural_default | Rede padrão criada para o projeto |

`docker ps` vê todos os containers em execução do daemon selecionado. `docker compose -f compose.app.yaml ps` filtra o projeto selecionado. Ambos aceitam `-a` para incluir parados. Compose usa labels de projeto e serviço para identificar seus recursos.

## 2. Ciclo de vida

```bash
docker compose -f compose.app.yaml stop
docker compose -f compose.app.yaml ps -a
docker compose -f compose.app.yaml start
docker compose -f compose.app.yaml down
docker compose -f compose.app.yaml up -d --wait
```

Stop/start preserva as instâncias. Down/up remove e recria os containers e a rede. Volumes nomeados permanecem por padrão. `restart` não substitui `up` ao alterar o YAML. `down -v` remove os volumes abrangidos e descarta os recados, por isso deve ser usado apenas quando essa limpeza for intencional.

## 3. Valores padrão e portas

No YAML, `${APP_BIND:-127.0.0.1}` usa APP_BIND se estiver definido e não vazio; caso contrário usa 127.0.0.1. A publicação `127.0.0.1:8088:8080` liga porta 8088 do host à 8080 do container apenas na interface local.

A rede entre serviços usa os nomes `api` e `db`. A aplicação no navegador usa o endereço do host. `localhost` dentro da API não aponta para o banco.

## 4. Volume nomeado

Antes de explorar o volume PostgreSQL, esta experiência menor permite observar persistência:

```bash
docker volume create dados-lab
docker run --rm --mount type=volume,src=dados-lab,dst=/dados \
  alpine:3.22 sh -c 'printf "persisti\n" > /dados/recado.txt'
docker run --rm --mount type=volume,src=dados-lab,dst=/dados \
  alpine:3.22 cat /dados/recado.txt
docker volume inspect dados-lab
```

O primeiro container é removido por `--rm`, mas o volume nomeado continua e pode ser montado pelo segundo. O PostgreSQL usa esse princípio para preservar os recados do mural.

## 5. Traduzir a IDE já conhecida para Compose

Baixe [Compose da IDE](../downloads/compose-ide.zip) e extraia em `HOME/oficina-docker`. O ZIP inclui estes comandos em `README-IDE.md`. Copie cada bloco completo no Bash; não é necessário editar YAML, exportar variáveis separadamente ou localizar o arquivo de autorização.

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

Para encerrar, execute `docker compose -f compose.ide.yaml down` na pasta dos arquivos. A alternativa Wayland também possui um comando completo no README do ZIP.

## 6. Montagem e permissões

Um bind aponta para uma pasta do host; um volume é administrado pelo Docker. Montar sobre um diretório oculta os arquivos anteriores naquele caminho, sem mesclar ou alterar a imagem. Acesso de escrita continua sujeito a UID/GID e permissões. Montar HOME não transforma o processo em root.

Fontes: [Compose](https://docs.docker.com/reference/cli/docker/compose/), [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/), [volumes](https://docs.docker.com/engine/storage/volumes/).
