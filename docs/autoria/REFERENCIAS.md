# Referências verificadas — oficina Docker

Consulta: 20 de outubro de 2026. Público: laboratório Linux, provavelmente Linux Mint segundo o instrutor. Notas de pesquisa para o instrutor; comandos exemplificativos, sem execução ou download nesta pesquisa. Fixar e ensaiar as versões de Engine, Compose e imagens usadas no laboratório.

## História, problema e Go

- Docker foi apresentado por Solomon Hykes em 2013 para simplificar a entrega de software do desenvolvimento ao servidor. A proposta combina empacotamento, distribuição e execução consistente; não foi a invenção do isolamento de processos. [Docker: Next Chapter](https://www.docker.com/blog/docker-next-chapter-advancing-developer-workflows-for-modern-apps/), [Docker: Open Container Project, lançamento em março de 2013](https://www.docker.com/blog/open-container-project-foundation/).
- Docker é escrito em Go. A arquitetura é cliente/servidor: CLI → API → daemon `dockerd`, que administra imagens, containers, redes e volumes. [Docker overview](https://docs.docker.com/get-started/docker-overview/).
- **Incerteza histórica:** as fontes consultadas não estabelecem uma justificativa definitiva dos criadores para a escolha original de Go. É possível apresentar concorrência, compilação e produtividade como características técnicas da linguagem; não afirmar que elas foram o motivo histórico documentado. O FAQ descreve os objetivos de criação de Go, não a decisão da equipe Docker. [FAQ oficial de Go](https://go.dev/doc/faq#creating_a_new_language).

## O que realmente executa

- Em Linux, containers são processos isolados que compartilham o kernel do host; uma imagem Debian não inicia uma VM com outro kernel. [What is a container?](https://docs.docker.com/get-started/docker-concepts/the-basics/what-is-a-container/).
- O Engine usa `containerd` para o ciclo de vida; por padrão, o runtime é `runc`, acionado por um shim. Há runtimes alternativos: o desenho `CLI → dockerd → containerd → shim/runc → processos` é uma simplificação da configuração usual. [Alternative runtimes](https://docs.docker.com/engine/daemon/alternative-runtimes/).
- Namespaces isolam visões de processos/rede/mounts; cgroups fazem contabilização e controle de recursos. Containers não recebem automaticamente uma cota pequena de CPU/RAM: limites precisam ser configurados. [Engine security](https://docs.docker.com/engine/security/), [Resource constraints](https://docs.docker.com/engine/containers/resource_constraints/).
- Não ensinar `overlay2` como implementação universal. Instalações novas de Engine 29+ usam por padrão o image store do containerd; o snapshotter usual é `overlayfs`. Instalações anteriores/atualizadas podem manter o armazenamento clássico. O laboratório deve conferir `sudo docker info`. [Containerd image store](https://docs.docker.com/engine/storage/containerd/), [Storage drivers](https://docs.docker.com/engine/storage/drivers/select-storage-driver/).

## Filesystem: experiências e pegadinhas

| Operação | Arquivos escritos na camada do container |
| --- | --- |
| `stop` seguido de `start` no mesmo container | Permanecem |
| `restart` no mesmo container | Permanecem |
| `rm`, depois outro `run` da mesma imagem | Não são transferidos ao novo container |
| Escrita em volume ou bind mount | Segue o ciclo de vida do armazenamento montado |

A camada gravável pertence ao container, não à imagem. Parar não é remover; `run` cria outro container. Demonstração recomendada: escrever `/tmp/prova.txt`, parar/iniciar, remover e recriar. [Docker overview](https://docs.docker.com/get-started/docker-overview/), [Compose quickstart: persistence](https://docs.docker.com/compose/gettingstarted/).

- **Volume nomeado:** diretório administrado pelo Docker, com ciclo independente do container. **Bind mount:** caminho escolhido no host, ideal para editar os arquivos do projeto. Ambos podem persistir dados; não são sinônimos. [Volumes](https://docs.docker.com/engine/storage/volumes/), [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/).
- Sem `-v`/`--mount` na linha de comando não significa necessariamente sem volume: um `VOLUME` herdado da imagem pode criar volume anônimo. Verificar `.Config.Volumes` na imagem e `.Mounts` no container. Volumes anônimos também podem sobreviver à remoção normal; `run --rm` remove os anônimos associados, mas preserva os nomeados. [Dockerfile: VOLUME](https://docs.docker.com/reference/dockerfile/#volume), [Volumes: anonymous](https://docs.docker.com/engine/storage/volumes/#named-and-anonymous-volumes).
- Montar sobre diretório existente oculta seu conteúdo. Volume vazio recebe por padrão cópia do conteúdo existente no destino; bind mount não faz essa cópia. [Volumes: existing data](https://docs.docker.com/engine/storage/volumes/#mounting-a-volume-over-existing-data), [Bind mounts: existing data](https://docs.docker.com/engine/storage/bind-mounts/#bind-mounting-over-existing-data).
- `--mount type=bind` falha por padrão se a origem não existir; `-v` pode criar um diretório, inclusive quando o usuário pretendia montar um arquivo. As permissões são as do filesystem; conferir o usuário do processo e as permissões da pasta montada. [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/).
- `sudo -E docker compose down` remove containers e redes do projeto, preservando volumes por padrão. `down -v` remove volumes nomeados declarados e volumes anônimos anexados; volumes externos não são removidos. Anônimos preservados por `down` não são automaticamente reutilizados no próximo `up`. [Compose down](https://docs.docker.com/reference/cli/docker/compose/down/).
- `sudo docker exec -it NOME sh` inicia outro processo em container **em execução**. `-i` mantém stdin; `-t` fornece pseudo-TTY. Sair desse shell não para o processo principal. A imagem precisa conter `sh`; imagens mínimas podem não ter shell. [Container exec](https://docs.docker.com/reference/cli/docker/container/exec/).

## IDE desktop com janela no Linux

**Requisito confirmado pelo usuário:** iniciar a IDE gráfica por comandos dentro do container e exibir sua janela diretamente no desktop Linux. A aplicação do editor deve executar no container; não se trata de editor acessado pelo navegador. A finalidade pedagógica é mostrar que Docker também executa aplicações gráficas desktop.

1. Primeiro experimento: abrir a IDE usando a integração com o sistema gráfico do host, sem bind mount da pasta de projeto do aluno. Criar arquivos apenas no filesystem do container e observar separadamente o fechamento da janela, o término do processo, a parada e a remoção do container.
2. Segundo experimento: recriar com um bind mount de uma pasta específica de projeto. Comparar os arquivos visíveis no host e sua persistência após remover/recriar o container. [Bind mounts](https://docs.docker.com/engine/storage/bind-mounts/).

**Integração gráfica ainda a validar no laboratório:** identificar a sessão X11 ou Wayland, o suporte da IDE escolhida, os sockets necessários, os mecanismos de autorização da sessão e eventuais requisitos gráficos/GPU. Compartilhar a conexão com o sistema gráfico é uma integração distinta de compartilhar a pasta de projeto. Portanto, “sem pasta do projeto montada” não deve ser apresentado como “sem qualquer integração com o host”.

Nenhum comando GUI, imagem ou Dockerfile de IDE foi validado nesta pesquisa. A escolha e os comandos dependem da sessão gráfica real do laboratório; não presumir que X11 e Wayland aceitem a mesma configuração. O instrutor deve ensaiar essa demonstração antes de incluí-la no roteiro executável.

## Compose: flags, comandos e atributos são coisas distintas

Usar a família `sudo -E docker compose`, com Compose Specification, e conferir a versão instalada. A chave superior `version:` está obsoleta e não escolhe o schema. [Version/name](https://docs.docker.com/reference/compose-file/version-and-name/).

| Categoria | Referência de consulta e seleção didática |
| --- | --- |
| Opções globais | `-f`, `-p`, `--env-file`, `--profile`, `--project-directory`, `--parallel`, `--dry-run`. [CLI Compose](https://docs.docker.com/reference/cli/docker/compose/) |
| Subir/reconciliar | `up -d`, `--build`, `--pull always\|missing\|never`, `--force-recreate`, `--no-recreate`, `--no-deps`, `--remove-orphans`, `--wait`, `--wait-timeout`, `--scale`. `--wait` implica execução desacoplada e espera running/healthy conforme cada serviço. [up](https://docs.docker.com/reference/cli/docker/compose/up/) |
| Inspecionar modelo | `config`, `config --quiet`, `--services`, `--images`, `--environment`. Mostra configuração resultante/interpolação; não é estado em execução. [config](https://docs.docker.com/reference/cli/docker/compose/config/) |
| Construir | `build --pull`, `--no-cache`. Renovar a base e desativar cache são ações distintas. [build](https://docs.docker.com/reference/cli/docker/compose/build/) |
| Observar | `ps`, `ps -a`, `logs -f --tail 50`, `logs --since 5m`. [CLI](https://docs.docker.com/reference/cli/docker/compose/), [logs](https://docs.docker.com/reference/cli/docker/compose/logs/) |
| Entrar no serviço | `exec api sh`: TTY e interatividade são padrão no Compose; `-T` desativa TTY. [exec](https://docs.docker.com/reference/cli/docker/compose/exec/) |
| Tarefa pontual | `run --rm`, `--no-deps`, `--service-ports`. `run` cria container separado e não publica por padrão as portas do serviço. [run](https://docs.docker.com/reference/cli/docker/compose/run/) |
| Parar/remover | `stop`, `start`, `restart`, `down`, `down -v`; explicar o efeito antes de executar. [CLI](https://docs.docker.com/reference/cli/docker/compose/), [down](https://docs.docker.com/reference/cli/docker/compose/down/) |

`services`, `image`, `build`, `ports`, `environment`, `env_file`, `volumes`, `networks`, `depends_on`, `healthcheck`, `restart`, `user`, `working_dir`, `command`, `entrypoint`, `profiles` e `read_only` são **atributos do arquivo YAML**, não flags do comando. O schema completo é material de consulta, não uma meta realista de memorização em 3h. [Services reference](https://docs.docker.com/reference/compose-file/services/).

## Imagens, camadas e Dockerfile

Imagem contém camadas de filesystem e configuração/metadados. Camadas são reutilizáveis e imutáveis; o container acrescenta escrita. Não ensinar que cada linha necessariamente adiciona arquivos: instruções podem alterar somente configuração. `image history` mostra histórico; `image inspect` mostra configuração e identificadores. [Image layers](https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/), [history](https://docs.docker.com/reference/cli/docker/image/history/), [inspect](https://docs.docker.com/reference/cli/docker/image/inspect/).

Resumo das instruções, para manter build e execução separados:

| Instrução | Significado |
| --- | --- |
| `FROM` | Base e novo estágio |
| `RUN` | Executa durante build |
| `COPY` | Copia arquivos; `--from` lê outro estágio |
| `ADD` | Também aceita fontes remotas e extração; ensinar quando essas funções forem necessárias |
| `CMD` | Comando/argumentos padrão, substituíveis no runtime |
| `ENTRYPOINT` | Executável padrão; combina com argumentos de `CMD` |
| `EXPOSE` | Documenta porta; não publica no host |
| `VOLUME` | Declara destino de volume; não escolhe caminho do host |
| `WORKDIR` | Diretório de trabalho |
| `USER` | Usuário/grupo das instruções e execução subsequentes |
| `ARG` / `ENV` | Argumentos de build / ambiente persistido na configuração |
| `LABEL` | Metadados |
| `HEALTHCHECK` | Verificação de saúde |
| `STOPSIGNAL` | Sinal de parada |
| `SHELL` | Shell padrão |
| `ONBUILD` | Gatilhos para imagem descendente |

Preferir a forma JSON de `CMD`/`ENTRYPOINT` para explicar execução e sinais. `MAINTAINER` está obsoleta. Referência completa: [Dockerfile](https://docs.docker.com/reference/dockerfile/). Multi-stage permite compilar Go em um estágio e copiar somente o binário para outro: [Multi-stage builds](https://docs.docker.com/build/building/multi-stage/).

## Rede, navegador e prontidão

- A rede padrão do projeto permite descoberta por nome de serviço. API usa `db:5432`, não `localhost:5432`, para alcançar Postgres em outro container. Comunicação entre serviços usa a porta do container; publicação é para acesso externo à rede. [Compose networking](https://docs.docker.com/compose/how-tos/networking/).
- **Consequência para o projeto:** o JavaScript servido ao navegador executa no computador do aluno e não resolve o nome interno `api`. Use URL local com porta publicada, ou frontend/proxy que encaminhe `/api` para `api:8080`. No primeiro caso, origens distintas exigem tratar CORS. A escolha do proxy mantém a requisição do navegador na mesma origem. Essa é uma decisão de arquitetura derivada da distinção entre rede Docker e acesso pelo host. [Compose networking](https://docs.docker.com/compose/how-tos/networking/), [Docker: reverse proxy e CORS](https://docs.docker.com/guides/traefik/).
- Dentro do container, servidor HTTP deve ouvir em endereço alcançável pela interface de rede, normalmente `0.0.0.0`, e não apenas loopback. A publicação `127.0.0.1:PORTA:PORTA` restringe o acesso publicado à própria máquina do aluno. [Port publishing](https://docs.docker.com/engine/network/port-publishing/).
- `depends_on` curto não espera o banco aceitar SQL. Usar `healthcheck` e `condition: service_healthy`; `service_completed_successfully` serve para tarefa prévia que deve terminar bem. [Startup order](https://docs.docker.com/compose/how-tos/startup-order/).
- O healthcheck atesta apenas o teste escolhido; `pg_isready` não valida automaticamente as tabelas da aplicação. `depends_on` não é monitoramento contínuo que recupera a aplicação quando uma dependência falha depois: incluir reconexão/retry na API. A documentação de rede atribui ao container a responsabilidade de detectar conexões fechadas e reconectar. [Startup order](https://docs.docker.com/compose/how-tos/startup-order/), [Updating containers on the network](https://docs.docker.com/compose/how-tos/networking/#updating-containers-on-the-network).

## Docker Hub e reprodução pelo colega

Build produz imagem local; tag dá uma referência, push envia ao registry, pull recupera a imagem. Preparar conta/namespace e login antes da aula. Exemplo de referência: `USUARIO/oficina-api:1.0`. `latest` é uma tag convencional, não uma garantia de versão mais recente nem de conteúdo imutável. A prática deve publicar apenas a aplicação construída; código, dependências e artefatos copiados para a imagem viajam com ela, enquanto o volume do banco não viaja com `push`. [Build, tag and publish](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/), [Image tags/digests](https://docs.docker.com/reference/cli/docker/image/pull/), [Volumes](https://docs.docker.com/engine/storage/volumes/).

O colega precisa da imagem e da configuração de execução (Compose, variáveis, portas e banco). Uma tag da API não inclui automaticamente o frontend e o Postgres. Para reprodutibilidade mais forte, registrar digest e plataforma ensaiada. [Docker overview](https://docs.docker.com/get-started/docker-overview/), [Pull by digest](https://docs.docker.com/reference/cli/docker/image/pull/#pull-an-image-by-digest-immutable-identifier).

## Limites desta pesquisa documental

As notas acima foram produzidas por pesquisa documental. O pacote de código foi implementado posteriormente; consulte TESTES.md para a validação atual. Não houve execução de containers nesta pesquisa. Não houve teste de IDE gráfica desktop, pull/build, execução de stack ou publicação no Docker Hub. Os exemplos devem passar por ensaio no laboratório, especialmente a integração gráfica X11/Wayland, permissões de bind mount, disponibilidade de portas, versões de Compose e comportamento específico da imagem PostgreSQL escolhida.
