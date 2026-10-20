# Compose, bind mounts e volumes

Tempo: 25 minutos. Execute na raiz do pacote, no host.

## 1. Compose organiza uma aplicação

Abra `compose.yaml`: o serviço `slides` usa a imagem dos materiais, publica uma porta e executa com filesystem somente leitura, exceto `/tmp` temporário.

```bash
docker compose config
docker compose up -d --build
docker compose ps
docker compose logs -f --tail 50
```

Abra `http://localhost:8080`. Ctrl+C encerra somente o acompanhamento de logs. `config` mostra o modelo resolvido; `ps` mostra instâncias reais. O nome do projeto da raiz é `oficina-docker`.

`image`, `build` e `ports` são atributos do YAML. `-f`, `-d` e `--build` são flags da CLI. A chave superior `version:` está obsoleta e não escolhe um schema.

## 2. Ciclo de vida

```bash
docker compose stop
docker compose ps -a
docker compose start
docker compose down
docker compose up -d
```

`stop/start` preserva as instâncias. `down/up` remove e recria containers e redes do projeto. Volumes nomeados permanecem por padrão. `restart` não é uma substituição para `up` ao alterar o YAML.

## 3. Bind mount para editar o projeto

```bash
./scripts/ide.sh com-projeto
```

A pasta `exemplos/mural` aparece como `/workspace` no editor. Alterações nesse destino afetam a pasta do host. Montar uma pasta vazia sobre um diretório do container oculta seu conteúdo anterior; não faz uma cópia automática dos arquivos para o host.

Na sintaxe longa, `type: bind` explicita a intenção. Com a flag `--mount`, a origem precisa existir por padrão. `-v` pode criar uma pasta automaticamente quando o caminho não existe, inclusive se você pretendia montar um arquivo. Permissões reais e UID/GID continuam valendo.

## 4. Volume nomeado para dados

```bash
docker volume create dados-lab
docker run --rm --mount type=volume,src=dados-lab,dst=/dados \
  alpine:3.22 sh -c 'printf "persisti\n" > /dados/recado.txt'
docker run --rm --mount type=volume,src=dados-lab,dst=/dados \
  alpine:3.22 cat /dados/recado.txt
docker volume inspect dados-lab
```

Resultado esperado: `persisti`. O primeiro container foi removido por `--rm`, mas o volume nomeado continua e é montado no segundo. Não é preciso manipular diretamente a pasta interna de armazenamento Docker.

## 5. Detalhes que mudam a explicação

- A camada gravável pertence à instância; volumes nomeados têm ciclo próprio.
- Um `VOLUME` declarado na imagem pode criar volume anônimo mesmo quando o comando não informa `-v`.
- `run --rm` remove os volumes anônimos associados, mas preserva os nomeados.
- Um volume vazio montado sobre um diretório com conteúdo recebe uma cópia inicial por padrão; `volume-nocopy` altera esse comportamento. Bind mount não faz essa cópia.
- `tmpfs` guarda dados temporários em memória e não é o mecanismo de persistência do banco.
- `down -v` remove os volumes declarados abrangidos e os anônimos associados; volumes externos são preservados. Anônimos preservados por `down` não são automaticamente reutilizados no próximo `up`.

## 6. Consulta de configuração

```bash
docker compose -f compose.app.yaml config --services
docker compose -f compose.app.yaml config --images
docker compose -f compose.app.yaml config --quiet
```

O último comando valida sem imprimir o modelo. `config --environment` permite conferir a interpolação, mas pode exibir valores sensíveis da configuração: não publique essa saída com credenciais reais.

Fontes: [CLI Compose](https://docs.docker.com/reference/cli/docker/compose/), [volumes](https://docs.docker.com/engine/storage/volumes/), [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/).
