# Oficina Docker — do primeiro container à aplicação compartilhada

Roteiro pedagógico fechado para 180 minutos em laboratório Linux, com Linux Mint como alvo provável informado pelo instrutor. Revisão: 20/10/2026.

## Resultado esperado

Cada participante deve conseguir explicar imagem versus container, observar o ciclo de vida dos arquivos, executar uma IDE desktop dentro de um container, montar o projeto, subir uma aplicação com Compose, construir uma imagem e compartilhá-la com um colega pelo Docker Hub.

A IDE deve abrir uma janela no desktop Linux. O processo do editor executa dentro do container. A demonstração não usa editor no navegador.

Três horas permitem uma base prática consistente com alguns aprofundamentos. Percorrer todas as flags e todos os detalhes de Dockerfile, além de exercícios, exigiria mais encontros. A referência completa acompanha a oficina; na execução ao vivo, cada comando deve resolver um problema observável.

## Preparação do laboratório

- Docker Engine e plugin `docker compose` funcionando para a conta usada pela turma.
- Terminal e ambiente gráfico Linux já disponíveis. Editores, SDK Go, ferramentas de desenvolvimento e banco ficam nas imagens.
- Identificar a distribuição e a sessão gráfica: `echo "$XDG_SESSION_TYPE"`. O tipo de sessão ainda não foi informado.
- Preparar uma imagem própria da oficina com a IDE desktop, dependências, usuário e diretório `/workspace`. Não pressupor que existe uma imagem oficial pronta de VS Code ou Zed para essa demonstração.
- Ajustar a conexão gráfica ao ambiente do laboratório: X11/XWayland ou Wayland, autorização, permissões e renderização. O instrutor informou que verificará o comando no local e fará os ajustes necessários; essa definição não bloqueia o fechamento do roteiro.
- Fixar versões das imagens e pré-carregar as maiores. Disponibilizar a pasta do projeto e seus pontos de partida no laboratório, sem exigir Git instalado no host.
- Preparar contas e acesso ao Docker Hub antes da aula. Ensaiar publicação e download na rede do laboratório.
- Deixar o código da aplicação pronto para pequenas alterações. Construir um CRUD inteiro do zero consumiria o tempo reservado ao Docker.

Compartilhar o canal gráfico não equivale a montar a pasta do projeto. Mesmo no primeiro experimento da IDE, pode haver mounts de sockets e arquivos de autorização do sistema gráfico. A promessa didática é **sem pasta do projeto do host montada**, não ausência absoluta de integração com o host.

Fontes: [comunicação e autorização X11](https://www.x.org/guide/communication/), [conexão de clientes Wayland](https://wayland.freedesktop.org/docs/html/apb.html), [VS Code no Linux](https://code.visualstudio.com/docs/setup/linux), [requisitos do Zed](https://zed.dev/docs/installation).

## Agenda de 180 minutos

| Minutos | Bloco | Evidência de aprendizagem |
| --- | --- | --- |
| 00–15 | O que Docker resolve e como executa | Distinguir imagem, container e máquina virtual |
| 15–40 | CLI, processos e filesystem | Prever o efeito de parar, iniciar, remover e recriar |
| 40–60 | IDE desktop no container | Abrir uma janela gráfica e demonstrar que o processo está no container |
| 60–85 | Compose, bind mount e volume nomeado | Editar uma pasta do host e preservar dados fora do container |
| 85–95 | Intervalo e recuperação de atrasos | Turma parte do mesmo ponto |
| 95–125 | Imagens, Dockerfile e build Go | Construir a imagem e observar cache e estágios |
| 125–155 | API, frontend, banco e rede | Resolver comunicação e prontidão dos serviços |
| 155–170 | Docker Hub e troca entre colegas | Executar a imagem publicada por outra pessoa |
| 170–180 | Diagnóstico e desafio final | Encontrar uma falha usando estado, logs e configuração |

## 1. Fundamentos — 15 minutos

Começar pelo problema de distribuir software com suas dependências e executá-lo consistentemente. Explicar que Docker popularizou e organizou tecnologias de isolamento que já existiam.

Desenho conceitual: CLI → API/daemon → execução de processos isolados. Em Linux, o container compartilha o kernel do host. Namespaces isolam visões; cgroups controlam e contabilizam recursos. A imagem fornece arquivos e configuração, não outro kernel.

Docker é escrito em Go. Apresentar características de Go é válido, mas não atribuir aos criadores uma motivação histórica específica sem uma fonte que documente essa decisão.

Introduzir imagem, container, registry, tag e digest. Retomar camadas em profundidade no bloco de build.

Fontes e detalhes: [REFERENCIAS.md](./REFERENCIAS.md).

## 2. CLI e ciclo de vida dos arquivos — 25 minutos

Comandos centrais: `pull`, `run`, `ps`, `ps -a`, `exec`, `logs`, `inspect`, `stop`, `start`, `restart` e `rm`.

Usar uma imagem pequena previamente ensaiada, sem volume declarado para o caminho do experimento. Criar um container com processo principal duradouro; abrir outro processo usando `docker exec -it NOME sh`.

Sequência do exercício:

1. Criar um arquivo em `/tmp` dentro do container.
2. Sair do shell iniciado por `exec` e verificar que o processo principal continua.
3. Parar e iniciar o mesmo container: o arquivo permanece.
4. Remover o container e criar outro da mesma imagem: o arquivo criado no anterior não aparece.
5. Explicar que a imagem original permaneceu igual.

Ler as colunas de `docker ps`: ID, imagem, comando, criação, estado, portas e nome. Mostrar `ps -a` depois de parar um container.

Usar `inspect` para localizar configuração e mounts. Distinguir nome do container, referência da imagem e ID da imagem. A referência registrada não é prova completa da origem: tags podem ser reapontadas e imagens podem ser construídas localmente.

Fontes: [exec](https://docs.docker.com/reference/cli/docker/container/exec/), [camada gravável e armazenamento](https://docs.docker.com/engine/storage/drivers/).

## 3. IDE desktop — 20 minutos

Objetivo: demonstrar que uma aplicação gráfica é um processo que pode executar no container e se comunicar com o sistema gráfico do host.

Criar o container com a integração gráfica ensaiada e sem bind mount da pasta do projeto. Para entrar nele e iniciar a IDE, a sequência conceitual é:

```bash
docker exec -it ide sh
code --new-window --wait /workspace
```

Esses comandos pressupõem um container chamado `ide`, em execução, com o VS Code desktop instalado, usuário configurado, `/workspace` existente e acesso gráfico já preparado. Eles não configuram o display por conta própria. O comando de criação será ajustado pelo instrutor no local, conforme a sessão gráfica do laboratório.

Pedir à turma para criar e salvar um arquivo em `/workspace`. Mostrar o processo com `docker top ide`. Fechar a janela e verificar `docker ps -a`.

Explicar a diferença entre dois arranjos: se a IDE for o processo principal, seu encerramento pode encerrar o container; se for iniciada por `exec` enquanto outro processo principal continua, fechar a IDE não encerra esse outro processo. Usar o segundo arranjo para manter a continuidade com a demonstração de `exec`.

Reabrir a IDE, conferir o arquivo, remover e recriar o container, conferir novamente. Usar o filesystem anterior para explicar o resultado.

Fonte: [CLI do VS Code](https://code.visualstudio.com/docs/configure/command-line).

## 4. Compose e armazenamento — 25 minutos

Começar traduzindo a execução da mesma IDE para um serviço Compose. Mostrar que Compose descreve recursos e sua configuração; não altera a natureza dos containers.

Recriar a IDE com um bind mount de uma pasta exclusiva da oficina em `/workspace`. Manter a integração gráfica usada no bloco anterior. Criar um arquivo pelo editor e encontrá-lo no host. Remover e recriar o container: o arquivo permanece na pasta montada.

Em seguida, usar um volume nomeado em um container pequeno para escrever um arquivo e lê-lo a partir de um segundo container. Esse padrão será usado para os dados do banco.

| Armazenamento | Uso no exercício | Ciclo de vida |
| --- | --- | --- |
| Camada gravável | Primeiro arquivo da IDE | Pertence ao container |
| Bind mount | Código do projeto | Caminho escolhido no host |
| Volume nomeado | Dados persistentes | Armazenamento administrado pelo Docker |

Distinguir flags da CLI de atributos YAML. Ensinar `config`, `up -d`, `ps`, `logs -f`, `exec`, `stop`, `start` e `down`. Mostrar o efeito de `down -v` apenas sobre dados descartáveis do exercício: ele também remove os volumes abrangidos pela operação, com exceção dos externos.

Fontes: [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/), [volumes](https://docs.docker.com/engine/storage/volumes/), [Compose down](https://docs.docker.com/reference/cli/docker/compose/down/).

## 5. Imagem e Dockerfile — 30 minutos

Usar uma API Go curta, entregue como ponto de partida. A turma altera uma resposta ou mensagem, e compila usando a imagem de build. Nenhum SDK precisa estar instalado no host.

Construir primeiro uma imagem simples, depois apresentar multi-stage: compilar em um estágio e copiar o artefato para o estágio de execução. Escolher a imagem final de acordo com as dependências reais do binário; não presumir que todo programa Go funciona em `scratch` sem preparação.

Comparar o primeiro build com um segundo sem alterações e outro após editar o código. Mostrar contexto de build, `.dockerignore`, cache, `image history` e `image inspect`. Explicar que a imagem reúne camadas e metadados; nem toda instrução cria uma camada com novos arquivos.

Aprofundar no exercício: `FROM`, `WORKDIR`, `COPY`, `RUN`, `USER`, `EXPOSE`, `CMD` e `ENTRYPOINT`. Comparar build com runtime e documentar que `EXPOSE` não publica porta.

Entregar uma referência de todas as instruções, incluindo `ADD`, `ARG`, `ENV`, `LABEL`, `VOLUME`, `HEALTHCHECK`, `STOPSIGNAL`, `SHELL` e `ONBUILD`. `MAINTAINER` é obsoleta. O resumo está em [REFERENCIAS.md](./REFERENCIAS.md).

Fontes: [Dockerfile](https://docs.docker.com/reference/dockerfile/), [multi-stage](https://docs.docker.com/build/building/multi-stage/), [contexto](https://docs.docker.com/build/concepts/context/), [boas práticas](https://docs.docker.com/build/building/best-practices/).

## 6. Aplicação integrada — 30 minutos

Projeto sugerido: mural de recados. A página envia e lista recados, a API Go atende as requisições e o PostgreSQL persiste os dados. Frontend simples, sem exigir um framework ou Node no host.

Fluxo: navegador → frontend/proxy → API Go → PostgreSQL. O navegador entra aqui como cliente da aplicação web, não como interface da IDE.

Usar a imagem oficial do PostgreSQL, a imagem da API construída pela turma e um frontend estático servido por um proxy. Publicar a entrada web; API e banco podem conversar internamente sem portas publicadas no host.

Experimentos:

1. API alcança o banco pelo nome do serviço, por exemplo `db:5432`.
2. Trocar temporariamente esse endereço por `localhost` e diagnosticar a falha.
3. Mostrar que o JavaScript no navegador não resolve os nomes internos dos serviços; usar `/api` com encaminhamento pelo proxy.
4. Mostrar `healthcheck` e `depends_on` com `service_healthy`; manter reconexão na aplicação para falhas posteriores.
5. Salvar um recado, recriar os serviços e confirmar persistência no volume nomeado.

A disponibilidade do banco não implica que o schema da aplicação foi criado. Preparar inicialização/migração de modo explícito e ensaiado.

Fontes: [rede Compose](https://docs.docker.com/compose/how-tos/networking/), [ordem e prontidão](https://docs.docker.com/compose/how-tos/startup-order/).

## 7. Docker Hub e troca — 15 minutos

Ensinar `login`, `tag`, `push` e `pull`, com namespace e tag explícitos. O colega recebe a configuração Compose e a referência da imagem publicada; troca `build` pela imagem do colega para realmente exercitar o consumo pelo registry.

A imagem da API não inclui automaticamente o volume do banco, os recados salvos, as credenciais ou os demais serviços. O colega executa a mesma aplicação com seu próprio banco e dados.

Se houver atraso de conta ou rede, demonstrar com uma imagem de referência já publicada pelo instrutor e deixar a publicação individual como continuação prática.

Fonte: [construir, marcar e publicar uma imagem](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/).

## 8. Fechamento — 10 minutos

Entregar uma falha por dupla: nome de serviço incorreto, variável ausente, porta de entrada errada ou diretório montado no destino errado. Pedir diagnóstico usando `ps`, `logs`, `config` e `inspect`.

Perguntas de saída: onde estão os arquivos? O que é removido com o container? Qual processo está rodando? Quem resolve o nome `db`? O que exatamente foi enviado ao Hub?

## Referência de Compose para acompanhar a aula

Selecionar ao vivo conforme o problema apresentado; a lista completa e atual depende da versão instalada. Consultar `docker compose --help` e `docker compose SUBCOMANDO --help`.

| Grupo | Comandos e opções a mapear |
| --- | --- |
| Projeto e arquivos | `-f`, `-p`, `--project-directory`, `--env-file`, `--profile` |
| Planejar e validar | `--dry-run`, `config`, `config --quiet`, `config --environment` |
| Subir e atualizar | `up -d`, `--build`, `--pull`, `--wait`, `--wait-timeout`, `--force-recreate`, `--no-deps`, `--remove-orphans` |
| Build | `build`, `--pull`, `--no-cache` |
| Observar | `ps -a`, `logs -f --tail 50`, `logs --since 5m` |
| Executar | `exec`, `exec -T`, `run --rm`, `run --no-deps`, `run --service-ports` |
| Ciclo de vida | `stop`, `start`, `restart`, `down`, `down -v` |
| Compartilhar imagens | `pull`, `push`, `images` |
| Aprofundamento | `--scale`, `--parallel`, profiles e combinação de arquivos |

No YAML, distinguir `image`, `build`, `ports`, `volumes`, `networks`, `environment`, `env_file`, `depends_on`, `healthcheck`, `user`, `working_dir`, `command`, `entrypoint`, `restart` e `profiles`. `.env` usado para interpolação não injeta automaticamente todas as variáveis nos containers.

Fontes: [CLI Compose](https://docs.docker.com/reference/cli/docker/compose/), [serviços YAML](https://docs.docker.com/reference/compose-file/services/), [interpolação](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/).

## Estado deste material

Sequência de temas, distribuição dos 180 minutos, objetivos, exercícios e referências preparados. A cobertura ao vivo prioriza os comandos usados nos exercícios; a documentação oficial permite consultar o catálogo completo de opções.

O pacote agora inclui slides interativos em HTML/CSS/JavaScript, aplicação Go e frontend, Dockerfiles, arquivos Compose e nove guias passo a passo. A imagem dos materiais gera o pacote ZIP para a turma. Veja README.md para iniciar e TESTES.md para o alcance da validação. Nenhum artefato foi publicado no Hub automaticamente. Os ajustes da demonstração gráfica ficam a cargo do instrutor no laboratório, conforme sua preferência.
