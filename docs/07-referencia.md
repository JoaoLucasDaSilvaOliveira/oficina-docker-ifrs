# Referência detalhada para o instrutor

Esta referência separa comandos da CLI, opções do Compose, atributos YAML e instruções Dockerfile. Use a versão instalada como autoridade para as opções disponíveis.

## 1. Catálogo completo da CLI Compose

Os slides incluem uma captura pesquisável da ajuda do **Compose 5.6.0**, incluindo ajuda global, comandos e subcomandos disponíveis nessa distribuição. A captura em texto está em `docs/compose-ajuda-5.6.0.txt`. Os grupos de comandos também foram percorridos.

Para consultar a versão instalada no laboratório e suas opções, use os comandos diretamente:

```bash
docker compose version
docker compose --help
docker compose up --help
docker compose run --help
docker compose exec --help
```

A família atual é `docker compose`; versões do plugin podem possuir opções diferentes. Não confundir o número da versão do programa com uma chave `version:` no YAML.

## 2. Opções globais de Compose

A captura da CLI documenta os valores exatos e os padrões. Opções globais aparecem antes do subcomando.

| Opção | Para que serve |
| --- | --- |
| -f, --file | Seleciona um ou mais arquivos; a ordem afeta a combinação |
| -p, --project-name | Nomeia o projeto e organiza seus recursos |
| --project-directory | Define o diretório-base do projeto |
| --env-file | Arquivo para interpolação/configuração do Compose |
| --profile | Ativa serviços opcionais por perfil |
| --parallel | Controla concorrência de operações |
| --progress | Formato da saída de progresso |
| --ansi | Controla sequências de cor/formatação |
| --dry-run | Mostra operações planejadas, quando suportado |
| --compatibility | Compatibilidade de comportamentos; não é requisito normal da aula |
| --all-resources | Inclui recursos que não são usados por serviços, conforme a operação |

## 3. Subir, construir e atualizar

| Comando/opção | Distinção que vale explicar |
| --- | --- |
| up -d | Cria/reconcilia e executa em segundo plano |
| up --build | Constrói imagens antes de iniciar |
| up --pull always/missing/never | Controla a busca das imagens para a execução |
| up --wait / --wait-timeout | Aguarda running/healthy; não cria um teste de saúde ausente |
| up --force-recreate | Recria mesmo sem mudança detectada |
| up --no-recreate | Preserva as instâncias existentes |
| up --no-deps | Atua sem iniciar dependências |
| up --remove-orphans | Remove containers do projeto que não estão no modelo atual |
| up --scale SERVICO=N | Ajusta réplicas; portas fixas publicadas podem conflitar |
| up --abort-on-container-exit | Interrompe a execução acompanhada ao terminar um container |
| up --abort-on-container-failure | Reage a encerramento com falha |
| up --exit-code-from SERVICO | Usa o código do serviço selecionado no fluxo de execução |
| build --pull | Busca atualização de bases |
| build --no-cache | Não reutiliza cache de instruções |
| build --build-arg CHAVE=VALOR | Parâmetro do build, não variável de runtime |
| --progress plain build | Seleciona saída textual no formato global antes do subcomando |

`restart` reinicia instâncias, mas não incorpora todas as alterações do modelo. `up` compara e reconcilia. Usar `--wait` não substitui testes funcionais.

## 4. Observar e executar

| Comando/opção | Efeito |
| --- | --- |
| config / config --quiet | Renderiza o modelo / valida sem imprimi-lo |
| config --services / --images | Lista os nomes dos serviços / referências de imagens |
| config --environment | Mostra as variáveis usadas na interpolação |
| ps / ps -a | Mostra instâncias em execução / inclui paradas |
| logs -f --tail 50 | Acompanha saída limitada inicialmente |
| logs --since 5m / --timestamps | Filtra tempo / inclui timestamps |
| exec SERVICO COMANDO | Outro processo numa instância já em execução |
| exec -T | Desativa TTY; útil em scripts e redirecionamentos |
| exec -u / -w / -e | Usuário / diretório / ambiente para esse processo |
| run --rm SERVICO COMANDO | Tarefa em um container novo, removido ao terminar |
| run --no-deps | Não inicia as dependências dessa tarefa |
| run --service-ports | Publica as portas do serviço; run não o faz por padrão |
| run -p / -v / --entrypoint | Publicação / mount / substituição do executável |
| cp | Copia arquivos entre host e container |
| events / top / stats | Eventos / processos / consumo |
| port | Consulta publicação de porta |
| images / volumes / ls | Imagens usadas / volumes / projetos |

TTY e interatividade são padrão em `docker compose exec`; `docker exec` precisa de `-it` para o mesmo uso interativo. `exec` não cria um container. `run` cria uma instância pontual e herda a configuração aplicável do serviço.

## 5. Encerrar e compartilhar

`stop`, `start`, `restart`, `pause`, `unpause`, `kill`, `rm`, `down`, `pull` e `push` tratam recursos e ciclos distintos. `kill` envia um sinal abrupto conforme sua configuração; `stop` solicita encerramento e usa um prazo antes de forçar. `down -v` remove volumes abrangidos e apaga seus dados; `--rmi` também pode remover imagens. Use a ajuda local para os valores aceitos.

`wait` espera o término dos serviços, diferente de `up --wait`, que espera o estado de execução/saúde. `watch` acompanha mudanças conforme regras declaradas. Recursos como `publish`, `bridge`, hooks e grupos experimentais dependem da versão: são consulta de aprofundamento, não pré-requisitos do mural.

## 6. Atributos YAML

| Campo | Significado |
| --- | --- |
| services | Descrições dos serviços |
| image / build | Referência da imagem / contexto e parâmetros para construir |
| ports / expose | Publicação no host / declaração de portas internas |
| environment / env_file | Ambiente fornecido ao container |
| volumes | Montagens do serviço; a seção superior declara volumes nomeados |
| networks | Participação em redes; a seção superior descreve redes |
| depends_on / healthcheck | Dependências de início / teste de saúde |
| command / entrypoint | Substituições do comando e executável da imagem |
| user / working_dir | Usuário e diretório do processo |
| restart | Política de reinício; não aplica mudanças do YAML |
| profiles | Grupos opcionais de serviços |
| read_only / tmpfs | Raiz somente leitura / armazenamento temporário |
| secrets / configs | Arquivos de configuração disponibilizados ao serviço |
| cpus / mem_limit | Limites de recursos, conforme implementação |
| init / stop_grace_period | Processo init auxiliar / prazo para encerramento |
| pull_policy | Política de busca de imagem |

`.env` fornece valores para interpolação; não injeta automaticamente todas as chaves no container. `env_file` de serviço tem outro papel. O shell também influencia a interpolação. Use `$$` quando quiser que um dólar alcance o shell do container em vez de ser interpolado pelo Compose.

Com múltiplos `-f`, a combinação não é uma substituição textual trivial: o schema possui regras para mapas e sequências. Confira sempre `config`. Caminhos relativos usam a base do primeiro arquivo, salvo configuração explícita de diretório.

## 7. Todas as instruções Dockerfile

| Instrução | Função e detalhe para a aula |
| --- | --- |
| FROM | Define base e novo estágio; AS dá nome ao estágio |
| RUN | Executa no build; aceita forma shell ou JSON e recursos do frontend selecionado |
| COPY | Copia do contexto; --from pode ler outro estágio |
| ADD | Também oferece fontes remotas e extração em casos suportados |
| WORKDIR | Define diretório para instruções posteriores e execução |
| USER | Define usuário/grupo posterior; permissões de mounts continuam valendo |
| ARG | Argumento de build, com escopo; não é um transporte apropriado para segredos |
| ENV | Persiste ambiente na configuração da imagem |
| CMD | Comando ou argumentos padrão, substituíveis na execução |
| ENTRYPOINT | Executável padrão; combina com argumentos de CMD ou de run |
| EXPOSE | Documenta porta/protocolo, sem publicar no host |
| VOLUME | Declara um destino; pode gerar volume anônimo, sem escolher pasta do host |
| LABEL | Metadados da imagem |
| HEALTHCHECK | Define teste, intervalos e prazos de saúde; não garante recuperação automática |
| STOPSIGNAL | Define o sinal de parada solicitado ao processo |
| SHELL | Muda o interpretador usado nas formas shell seguintes |
| ONBUILD | Registra instruções para builds de imagens descendentes |
| MAINTAINER | Obsoleta; usar LABEL para metadados de autoria |

Diretivas de parser como `# syntax=`, `# escape=` e `# check=` não são comandos de runtime. A versão do frontend determina opções disponíveis. Comentários, continuação de linha, heredocs, forma shell e forma JSON afetam como a receita é interpretada.

`COPY --chown` altera dono dos arquivos copiados; `--chmod` pode definir modo. `RUN --mount=type=cache` fornece cache ao build; `type=secret` atende segredos de build; nenhum dos dois é o volume persistente do banco em runtime. Consulte a referência para limites e versões de cada opção.

## 8. Detalhes de imagens e armazenamento

Camadas são diferenças imutáveis de filesystem; configuração registra usuário, comando, ambiente e outros metadados. Ao iniciar uma instância, existe uma camada gravável própria. A implementação pode usar storage driver ou image store/snapshotter. Instalações novas de Engine 29+ usam por padrão o image store do containerd; não ensinar overlay2 como universal.

Tag é referência mutável. Digest identifica conteúdo. O ID local de configuração de uma imagem e o digest de um manifest no registry não são sempre o mesmo objeto.

Fontes: [CLI Compose](https://docs.docker.com/reference/cli/docker/compose/), [serviços YAML](https://docs.docker.com/reference/compose-file/services/), [interpolação](https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/), [Dockerfile](https://docs.docker.com/reference/dockerfile/), [image store](https://docs.docker.com/engine/storage/containerd/).
