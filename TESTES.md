# Validação do pacote

Verificado em 20/10/2026.

## Verificações concluídas

- Os 44 slides foram percorridos em navegador Chromium nas larguras 1440, 768 e 375 pixels, sem erros JavaScript ou overflow horizontal da página. Blocos de código podem ter rolagem própria.
- Foram verificadas navegação por teclado, notas, abertura e fechamento dos painéis, busca de flags, persistência local das respostas e links locais dos materiais.
- Foram exercitados os modelos de filesystem (parar/iniciar e remover/recriar, com camada ou volume) e rede (DNS interno versus localhost do navegador).
- O frontend foi testado em navegador: publicar, recarregar, excluir, exibir conteúdo como texto, informar indisponibilidade e recuperar a consulta. O layout móvel foi conferido.
- A API passou em `go test ./...` e `go vet ./...`, e foi compilada com Go 1.27.1 disponível no ambiente de preparação. O Dockerfile fixa Go 1.27.3.
- A API foi executada com PostgreSQL 17 real, em instância temporária exclusiva dos testes. Criação, listagem, exclusão, 404 e readiness foram conferidos. Os dados sobreviveram ao reinício do banco. Durante a parada, a API retornou 503; após o retorno, voltou a atender sem reiniciar o processo Go.
- Os arquivos Compose de materiais, aplicação, overlays de rede e do Hub e IDE X11/Wayland com bind mount passaram por `config --quiet` usando a CLI Compose 5.6.0.
- Os scripts shell e os arquivos JavaScript passaram pela verificação de sintaxe. A referência da CLI registra 40 páginas de ajuda, incluindo grupos e subcomandos.
- As referências de imagem `golang:1.27.3-alpine`, `alpine:3.22`, `postgres:17-alpine` e `nginxinc/nginx-unprivileged:1.29-alpine` foram encontradas no registry na data da preparação.

## Alcance e limites

Na primeira etapa, os testes integrados usaram Go e PostgreSQL temporários e um proxy local. Após configurar o Docker na máquina do instrutor, foi realizada a validação adicional em containers descrita abaixo.

A janela da IDE não foi aberta no display do laboratório. A sessão e as permissões gráficas reais do Linux Mint serão ajustadas pelo instrutor no local, conforme combinado. O build da IDE depende do repositório Microsoft e do ambiente Docker que a executará.

Nenhuma imagem foi enviada ao Docker Hub e nenhuma conta da turma foi acessada.

## Validação adicional em Docker

Ainda em 20/10/2026, Docker Engine 29.9.1, Compose 5.6.0 e Buildx 0.38.0 foram verificados na máquina do instrutor.

- O container hello-world executou, e um container Alpine conseguiu acessar a internet.
- O Dockerfile dos materiais foi construído pelo BuildKit. O serviço slides ficou healthy; página, guias e ZIP responderam com HTTP 200. O ZIP servido foi conferido.
- O script `scripts/testar-stack.sh` construiu API e frontend, iniciou PostgreSQL e confirmou os três serviços healthy. Verificou a API através do proxy Nginx e consultou a tabela no banco.
- Pelo endereço publicado do frontend, um recado de teste foi criado, lido e excluído com os retornos HTTP esperados.
- Os serviços foram mantidos em execução nos endereços locais 8080 (materiais) e 8088 (mural).

A integração gráfica da IDE com a sessão real do laboratório continua pendente de conferência local. A publicação no Hub continua manual e não foi executada.

## Conferência no laboratório

Os comandos preparados para validar os containers reais são:

```bash
./scripts/testar-api.sh
./scripts/testar-stack.sh
./scripts/ide.sh preparar
./scripts/ide.sh abrir
```

`testar-stack.sh` constrói e sobe a aplicação, verifica readiness, consulta a API pelo proxy web e consulta a tabela pelo cliente do banco. Ele mantém os serviços em execução e preserva os dados.
