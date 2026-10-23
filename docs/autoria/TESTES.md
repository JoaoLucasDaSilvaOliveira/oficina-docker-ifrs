# Validação do pacote

## Estado atual — 23/10/2026

A apresentação foi refatorada para o percurso Go mínimo → IDE → Vue/Vite → construção de imagens → Compose. O site público é estático e está preparado para GitHub Pages; Docker serve apenas como preview opcional do instrutor.

- Regressão de layout: a conferência anterior media caixas HTML, mas não detectava SVGs que ultrapassavam sua área e interceptavam os botões. O dimensionamento dos diagramas foi corrigido, incluindo quebras de títulos e textos; diagramas decorativos não capturam cliques. O quiz usa o espaço disponível sem reservar uma faixa vazia para ações.
- `node testes/layout.cjs`: 54 slides em 12 viewports, de 360×640 a 1920×1080, incluindo 1366×768 e o painel 483×714. As 648 combinações passaram no preview Docker em localhost:8080 sem overflow, sobreposição de textos SVG, mudança de posição da navegação ou erros JavaScript. O teste mede o conteúdo pintado dos SVGs, as linhas HTML e cinco pontos de cada botão para detectar obstrução. Inclui as seis perguntas do quiz nos estados inicial, acerto e erro, abertura de diálogos, Escape e retorno de foco.
- A sequência agora apresenta Hub → referência e tag → pull → execução da soma. O pull tem um slide conceitual próprio. Os materiais informam conteúdo e capítulo de uso; o pacote Go de recuperação é explicitamente opcional.
- Os comandos ficam em diálogo, com cópia fiel do texto, tooltips, Escape e retorno de foco ao botão de origem. Menu móvel e consulta de materiais passaram pela verificação de teclado.
- `OFICINA_URL=http://127.0.0.1:8080 node testes/interactions.cjs`: dez cenários passaram na versão Docker final, sem erros JavaScript ou respostas HTTP locais de erro. Inclui 41 diálogos de exercício, cópia fiel de 56 blocos, catálogo e busca de 307 comandos, consulta de sete downloads, extração lógica do ZIP recebido, abertura de guia e âncora, histórico, atalhos, link de acessibilidade, tela cheia, menu móvel e quiz. ZIPs são comparados por nomes e conteúdo extraído, pois versões distintas do zlib podem produzir bytes comprimidos diferentes.
- As 307 descrições do catálogo estão em pt-BR. A ajuda complementar usa recuo, fundo próprio e o nome do comando; a saída original de --help é identificada como referência em inglês. O capturador exige tradução para novas descrições antes de gerar o catálogo.
- O catálogo contém 307 comandos e subcomandos da CLI instalada (Docker 29.9.1, Compose 5.6.0, Buildx 0.38.0). A busca prioriza os nomes dos comandos e só pesquisa flags quando solicitadas: ps, docker ps, exec e compose logs retornam primeiro os comandos correspondentes. Plugins não instalados e comandos experimentais indisponíveis ficam fora da captura.
- `node --test testes/flags.cjs testes/command-search.cjs`: 14 testes passaram, incluindo regressões da busca por descrição, aliases, flags contextuais, todos os comandos dos slides e as opções da referência Compose.
- 41 páginas específicas de exercícios são geradas a partir dos comandos dos slides. Links, âncoras e recursos locais conferidos. Foram testados acesso direto ao exercício de exec, downloads reais e funcionamento sob um prefixo de repositório como /oficina-docker/.
- main.go contém só uma soma. O pacote go-receitas.zip acrescenta Dockerfiles e .dockerignore sem sobrescrever as edições do aluno; go-soma.zip completo é recuperação opcional. Extração sobre uma edição 3 + 4 foi conferida byte a byte.
- Builds Go simples e multi-stage, a partir apenas dos arquivos baixados em uma pasta temporária: saída 3 + 4 = 7. A imagem simples aceita sh no lugar do CMD; a final scratch executa como UID/GID 65532 e não contém shell.
- O frontend mantém os 14 arquivos originais do template JavaScript create-vite 9.3.1. Lockfile fixa Vue 3.5.44 e Vite 8.3.5. Dev e build executaram em Node 24 dentro de Docker. Nginx válido, tela padrão, contador 0→1, fallback SPA e ausência de erros no navegador foram verificados.
- Mural iniciado em uma pasta limpa contendo só os YAMLs: serviços healthy, HTTP 200, POST 201 e persistência após down/up. Foram usadas imagens locais com --pull never. Containers, redes, volumes e tags exclusivos de QA foram removidos; o preview do usuário foi preservado.
- A ferramenta de autoria gera guias, ZIPs e um site por allowlist, sem repositório, credenciais ou dependências locais. O workflow de Pages é exclusivamente manual. A imagem Docker de preview foi construída a partir do gerador estático.

Nenhum push de imagem nem deploy do GitHub Pages foi executado. O pull público depende da publicação pelo instrutor. A sessão gráfica do laboratório Linux Mint ainda precisa ser conferida no local.

## Histórico das verificações anteriores

Verificações iniciais em 20/10/2026; revisões anteriores em 21/10/2026. As contagens e os fluxos abaixo registram as versões anteriores.

## Verificações concluídas

- Os 44 slides foram percorridos em navegador Chromium nas larguras 1440, 768 e 375 pixels, sem erros JavaScript ou overflow horizontal da página. Blocos de código podem ter rolagem própria.
- Foram verificadas navegação por teclado, notas, abertura e fechamento dos painéis, busca de flags, persistência local das respostas e links locais dos materiais.
- As explicações de flags foram verificadas nos 44 slides em 1440, 768 e 375 pixels. Foram exercitados mouse, foco/Enter/Esc, toque, posição dentro da tela, fechamento ao navegar, balões dentro do painel modal, guias HTML, impressão e cópia do comando original, sem erros JavaScript.
- `node --test testes/flags.cjs` verifica os significados contextuais de `-f`, flags combinadas (`-it`, `-la`), comandos multilinha, opções do Dockerfile, a cobertura dos exemplos dos slides e de todas as opções da captura Compose, além de evitar falsos positivos em nomes de arquivos e URLs.
- Foram exercitados os modelos de filesystem (parar/iniciar e remover/recriar, com camada ou volume) e rede (DNS interno versus localhost do navegador).
- O frontend foi testado em navegador: publicar, recarregar, excluir, exibir conteúdo como texto, informar indisponibilidade e recuperar a consulta. O layout móvel foi conferido.
- A API passou em `go test ./...` e `go vet ./...`, e foi compilada com Go 1.27.1 disponível no ambiente de preparação. O Dockerfile fixa Go 1.27.3.
- A API foi executada com PostgreSQL 17 real, em instância temporária exclusiva dos testes. Criação, listagem, exclusão, 404 e readiness foram conferidos. Os dados sobreviveram ao reinício do banco. Durante a parada, a API retornou 503; após o retorno, voltou a atender sem reiniciar o processo Go.
- Os arquivos Compose de materiais, aplicação, overlays de rede e do Hub e IDE X11/Wayland com bind mount passaram por `config --quiet` usando a CLI Compose 5.6.0.
- Os arquivos JavaScript passaram pela verificação de sintaxe. A referência da CLI registra 40 páginas de ajuda, incluindo grupos e subcomandos.
- As referências de imagem `golang:1.27.3-alpine`, `alpine:3.22`, `postgres:17-alpine` e `nginxinc/nginx-unprivileged:1.29-alpine` foram encontradas no registry na data da preparação.

## Alcance e limites

Na primeira etapa, os testes integrados usaram Go e PostgreSQL temporários e um proxy local. Após configurar o Docker na máquina do instrutor, foi realizada a validação adicional em containers descrita abaixo.

A janela da IDE não foi aberta no display do laboratório. A sessão e as permissões gráficas reais do Linux Mint serão ajustadas pelo instrutor no local, conforme combinado. O build da IDE depende do repositório Microsoft e do ambiente Docker que a executará.

Nenhuma imagem foi enviada ao Docker Hub e nenhuma conta da turma foi acessada.

## Validação adicional em Docker

Ainda em 20/10/2026, Docker Engine 29.9.1, Compose 5.6.0 e Buildx 0.38.0 foram verificados na máquina do instrutor.

- O container hello-world executou, e um container Alpine conseguiu acessar a internet.
- O Dockerfile dos materiais foi construído pelo BuildKit. O serviço slides ficou healthy; página, guias e ZIP responderam com HTTP 200. O ZIP servido foi conferido.
- A aplicação foi construída e iniciada em Docker; os três serviços ficaram healthy. A API foi consultada pelo proxy Nginx e a tabela foi consultada no PostgreSQL.
- Pelo endereço publicado do frontend, um recado de teste foi criado, lido e excluído com os retornos HTTP esperados.
- Os serviços foram mantidos em execução nos endereços locais 8080 (materiais) e 8088 (mural).

A integração gráfica da IDE com a sessão real do laboratório continua pendente de conferência local. A publicação no Hub continua manual e não foi executada.

## Revisão dos comandos da oficina — 21/10/2026

- A sequência passou para 45 slides: imagem da IDE com docker build, IDE com docker run sem a pasta do projeto, ciclo do mesmo container, docker run com bind mount e só então Compose.
- Os 45 slides revisados foram percorridos em 1440, 768 e 375 pixels, sem erros JavaScript ou overflow da página. Mouse, teclado, toque, cópia e referência de flags passaram novamente.
- Um arquivo de teste na camada da IDE sobreviveu a stop/start. Uma pasta temporária do host foi montada em /workspace; a alteração feita pelo container apareceu no arquivo real do host. Os containers temporários de verificação foram removidos.
- Os scripts auxiliares de preparação, abertura da IDE, testes e exportação da ajuda foram removidos do pacote. Os slides e os guias usam comandos Docker explícitos.
- A imagem da IDE foi construída na máquina do instrutor. A conexão X11/XWayland autenticada com o arquivo da sessão e hostname correspondente respondeu. O VS Code iniciou com janela desktop; code --status identificou a janela Welcome - workspace e os processos do editor no container.
- As opções novas --hostname e --shm-size receberam explicações. As flags de id -u e id -g são identificadas no shell do host sem alterar o contexto das opções Docker seguintes.

A sessão real do Linux Mint no laboratório ainda deve ser conferida no local. A verificação gráfica acima foi na máquina do instrutor, usando XWayland.

## Conferência no laboratório

Use os comandos completos dos guias, sem scripts auxiliares. Para conferir a aplicação:

```bash
sudo -E docker compose -f compose.app.yaml config --quiet
sudo -E docker compose -f compose.app.yaml up -d --build --wait
sudo -E docker compose -f compose.app.yaml exec -T api /api -healthcheck
sudo -E docker compose -f compose.app.yaml exec -T web wget -q -O - http://127.0.0.1:8080/api/info
```

Esses comandos preservam os dados do banco. Para a IDE, siga docs/02-ide-desktop.md, começando por docker build e docker run. O processo principal chama code --wait; não existe wrapper de abertura.

## Retomada do Dockerfile da IDE em 05 · Imagens

O roteiro passou para 50 slides. A sequência inicial de experimentação da IDE continua antes do Compose. No capítulo Imagens, cinco slides retomam a receita já usada: abertura do arquivo real, FROM/ARG, instalação no RUN, continuação com usuário e permissões, e configuração USER/ENV/WORKDIR/CMD. Os trechos reproduzem todas as linhas do Dockerfile da IDE; o arquivo da imagem não foi alterado nesta revisão. Os 50 slides foram percorridos em navegador em 1440, 768 e 375 pixels, sem erros JavaScript nem overflow da página. Foram conferidos os rótulos de contexto, as notas e as flags Linux como curl -fsSL.

## Distribuição por imagens e HOME — 21/10/2026

A revisão desta seção substituiu o fluxo anterior que presumia um checkout: imagens de apoio joaolsodocker, sete arquivos Compose para baixar e bind de HOME em /host-home. A revisão seguinte, registrada abaixo, acrescenta ZIPs de fontes e receitas por etapa. O build das imagens de apoio pertence ao instrutor, em INSTRUTOR.md.

- As imagens IDE, API e frontend foram construídas localmente com os nomes do namespace informado. Nenhum login ou push no Docker Hub foi executado nesta revisão. O pull público só poderá ser validado depois da publicação manual.
- A IDE foi iniciada com docker run a partir de /tmp, fora do repositório. A janela host-home foi identificada pelo VS Code; o UID/GID foi 1000:1000. O bind apontou para a pasta pessoal real em leitura e escrita; leitura e alteração de um arquivo temporário foram verificadas. O container de teste foi removido, preservando a IDE que o usuário já estava usando.
- A imagem compartilhada também executou code --version como UID/GID 12345:12345, com runtime tmpfs de propriedade correspondente, sem rebuild por usuário.
- O ZIP foi extraído em uma pasta temporária inicialmente vazia. Continha apenas sete YAMLs. Nenhum serviço do Compose da aplicação tinha build ou contexto local.
- O mural foi copiado de /opt/oficina/mural na imagem, e a API foi construída usando somente essas fontes na pasta temporária, sem checkout.
- A stack de referência ficou healthy e aceitou um recado. A API foi substituída pela imagem construída do conteúdo extraído; a stack voltou a healthy e preservou o recado no volume.
- Os containers, rede e volume exclusivos dessa verificação foram removidos. Os dados do usuário não foram usados na stack de teste.

A sessão real do Linux Mint continua sujeita à conferência do display e da autorização no laboratório. As verificações gráficas foram em XWayland no computador do instrutor.

## Downloads por etapa e camadas — 21/10/2026

- A apresentação tem 49 slides após a remoção da pausa. Os 180 minutos foram redistribuídos entre Compose e Imagens. Os IDs de navegação foram preservados; o antigo slide 24 agora é o 23 e o antigo 31 é o 30.
- Os exercícios oferecem ZIPs próprios para Compose dos slides, Compose da IDE, receitas para leitura, fontes do mural Go e Compose do mural. O pacote com todos os sete YAMLs e os downloads individuais continuam disponíveis. Os guias indicam a extração em HOME/oficina-docker, sem clone.
- Todos os arquivos dos seis ZIPs servidos pela imagem Docker foram comparados com as fontes. O pacote Go inclui .dockerignore. Os caminhos internos são relativos e os pacotes foram extraídos em uma pasta temporária vazia.
- As combinações Compose dos slides, IDE X11/Wayland com HOME, mural com rede e mural com imagem do colega passaram por config --quiet usando apenas os YAMLs extraídos.
- A API simples foi compilada por Docker usando somente o mural-go.zip baixado, fora do repositório e sem Go instalado no host.
- Downloads reais pelo navegador, nomes dos ZIPs e instruções de extração foram conferidos nos exercícios de Compose e Go.
- O slide 23 foi simplificado para uma única ilustração SVG estática: imagem somente leitura compartilhada na base e duas camadas graváveis independentes acima. O recado aparece só em A. Não há botões, simulação nem blocos explicativos no slide. As explicações adicionais ficam nas notas. A ilustração foi conferida em 1440, 768 e 375 pixels, sem erros JavaScript ou overflow da página.
- Os 49 slides foram percorridos em 1440, 768 e 375 pixels, sem erros JavaScript nem overflow da página. Mouse, teclado, toque, cópia, referência e guias passaram. Os seis testes de explicações contextuais das flags também passaram.

As imagens foram preparadas localmente. Nenhum login ou push foi executado.

## Comandos prontos da IDE — 23/10/2026

O ZIP Compose da IDE inclui README-IDE.md com comandos completos e independentes para X11 sem HOME, com HOME e alternativa Wayland. Não exige exports prévios nem edição do YAML. Os campos de autorização usam automaticamente XAUTHORITY da sessão, com fallback HOME/.Xauthority. Os valores UID/GID e hostname são calculados no comando. As mensagens de preenchimento :? foram removidas.

`python testes/compose-ide.py` validou os comandos extraídos do ZIP, o fallback sem XAUTHORITY e UID/GID diferentes de1000, sem criar containers. Um container descartável iniciado pelo Compose acessou a sessão X11 real com xdpyinfo; container e rede de QA foram removidos. A sessão gráfica específica do laboratório continua sendo conferida pelo instrutor antes da aula.

## Build isolado da IDE — 23/10/2026

Removidas as cópias antigas do mural e da receita dos slides. A IDE mantém somente sua própria receita, copiada do contexto local. Build executado com sucesso dentro de exemplos/ide usando docker build -t joaolsodocker/oficina-ide:1.0.0 .. O container descartável executou code --version e confirmou a receita em /opt/oficina/receitas/ide.Dockerfile, sem os materiais antigos. O ZIP da receita foi comparado com o Dockerfile atualizado.
