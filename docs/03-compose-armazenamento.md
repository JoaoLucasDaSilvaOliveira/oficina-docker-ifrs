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

A comparação é opcional e acontece depois dos exemplos de Dockerfile. Baixe [Compose da IDE](../downloads/compose-ide.zip) e extraia em `HOME/oficina-docker`. Remova apenas o container descartável da IDE anterior e forneça as variáveis da sessão:

```bash
docker rm -f ide
cd "$HOME/oficina-docker"
export LOCAL_UID="$(id -u)" LOCAL_GID="$(id -g)"
export HOST_HOSTNAME="$(hostname)"
export XAUTHORITY="${XAUTHORITY:-$HOME/.Xauthority}"
docker compose -f compose.ide.yaml up -d
```

A base abre `/workspace` sem pasta pessoal montada. Para recriar com HOME:

```bash
docker compose -f compose.ide.yaml -f compose.ide.bind.yaml config
docker compose -f compose.ide.yaml -f compose.ide.bind.yaml up -d --force-recreate
docker compose -f compose.ide.yaml -f compose.ide.bind.yaml ps -a
```

O overlay usa `source: ${HOME}`, `target: /host-home` e `working_dir: /host-home`. Como o CMD da imagem abre ponto, a IDE segue esse diretório. Para Wayland nativo, substitua a base por `compose.ide.wayland.yaml`; não combine as duas bases gráficas.

## 6. Montagem e permissões

Um bind aponta para uma pasta do host; um volume é administrado pelo Docker. Montar sobre um diretório oculta os arquivos anteriores naquele caminho, sem mesclar ou alterar a imagem. Acesso de escrita continua sujeito a UID/GID e permissões. Montar HOME não transforma o processo em root.

Fontes: [Compose](https://docs.docker.com/reference/cli/docker/compose/), [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/), [volumes](https://docs.docker.com/engine/storage/volumes/).
