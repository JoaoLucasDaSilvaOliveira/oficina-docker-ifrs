# Docker, na prática

Pacote de uma oficina de **3 horas**, preparado para laboratório Linux, com Linux Mint como alvo provável. Editor, compilador e banco da oficina rodam em containers. Os slides são uma aplicação HTML/CSS/JavaScript; a IDE de demonstração é o **VS Code desktop dentro de um container**.

## Comece por aqui

Na pasta deste pacote, com Docker Engine e o plugin Compose funcionando:

```bash
docker compose up -d --build
```

Abra [os slides em localhost:8080](http://localhost:8080). Use **← / →**, **N** para notas, **F** para apresentação e **/** para a referência pesquisável. Os botões das simulações alteram apenas o modelo didático; não executam Docker.

Para subir o mural de recados:

```bash
docker compose -f compose.app.yaml up -d --build --wait
```

Abra [o mural em localhost:8088](http://localhost:8088). Publique um recado, recrie os containers sem remover o volume e confira a persistência.

Para a IDE desktop, execute no terminal da sessão gráfica local:

```bash
./scripts/ide.sh preparar
./scripts/ide.sh abrir
# Mais tarde, durante o bloco de bind mounts:
./scripts/ide.sh com-projeto
```

A primeira execução não monta o projeto; a segunda monta `exemplos/mural` em `/workspace`. A conexão gráfica usa sockets locais e autorização da sessão. O caminho principal é X11/XWayland; há alternativa Wayland. Consulte [o guia gráfico](docs/02-ide-desktop.md).

## Conteúdo

- `apresentacao/`: 44 slides, notas do instrutor, quiz, comandos copiáveis, simulações de filesystem, camadas, cache e rede, e explorador de Compose.
- `docs/`: nove guias em Markdown e HTML, com comandos, resultados esperados, correções e referências.
- `exemplos/mural/api/`: API Go com PostgreSQL, validação, readiness, reconexão, encerramento por sinal e testes.
- `exemplos/mural/frontend/`: frontend estático e proxy Nginx para a API.
- `exemplos/ide/`: Dockerfile do VS Code desktop e comando `abrir-ide`.
- `compose.yaml`: os próprios materiais em um container.
- `compose.app.yaml`: mural completo com web, API, banco, rede e volume nomeado.
- `compose.rede.yaml`: aprofundamento opcional com redes separadas para entrada e dados.
- `compose.hub.yaml`: overlay para executar a API publicada por outra pessoa, sem build local.
- `compose.ide*.yaml`: IDE com X11 ou Wayland e overlay para a pasta do projeto.
- `scripts/`: preparação, IDE, testes da API e da stack, exportação da ajuda Compose e empacotamento.
- `ROTEIRO.md`: agenda de 180 minutos.
- `REFERENCIAS.md`: notas técnicas e fontes primárias.

## Configuração

O pacote funciona com valores didáticos padrão, sem criar `.env`. Para personalizar, copie `.env.example` para `.env` e altere as portas, o endereço de publicação, a versão da API e os dados locais do banco.

As portas são publicadas em `127.0.0.1` por padrão. Para servir os materiais aos computadores do laboratório, defina `MATERIALS_BIND=0.0.0.0`, recrie o serviço e use o endereço da máquina do instrutor, conforme a rede local. A imagem dos slides não inclui dados ou credenciais do computador.

As credenciais padrão do banco servem somente ao exercício local. Se o volume já foi inicializado, alterar `POSTGRES_PASSWORD` não atualiza automaticamente a senha existente no PostgreSQL; veja o guia de diagnóstico.

## Guias na ordem da aula

1. [Preparação](docs/00-preparacao.md)
2. [Containers e filesystem](docs/01-containers.md)
3. [IDE desktop](docs/02-ide-desktop.md)
4. [Compose e armazenamento](docs/03-compose-armazenamento.md)
5. [Imagens e Dockerfile](docs/04-imagens-dockerfile.md)
6. [Aplicação e redes](docs/05-aplicacao-rede.md)
7. [Docker Hub](docs/06-docker-hub.md)
8. [Referência detalhada](docs/07-referencia.md)
9. [Desafios e diagnóstico](docs/08-desafios.md)

## Testes e preparo

```bash
./scripts/testar-api.sh
./scripts/testar-stack.sh
./scripts/precarregar.sh
./scripts/exportar-referencia-compose.sh
```

A referência pesquisável dos slides inclui uma captura da CLI Compose 5.6.0. A versão instalada no laboratório pode ser diferente; a ajuda local é a referência exata de opções disponíveis. Não é necessário atualizar o laboratório para essa versão para usar os exercícios centrais.

Para visualizar os slides sem servidor, abra `apresentacao/index.html`; navegação, notas e simulações funcionam localmente. Para baixar o ZIP e navegar pelos guias como em aula, prefira servir o pacote via Docker. Fontes, scripts e estilos são locais; consultas às fontes oficiais exigem internet.

O alcance das verificações está em [TESTES.md](TESTES.md).

## Compartilhar com a turma

O site oferece o pacote em `/downloads/oficina-docker.zip`. A imagem dos materiais gera esse arquivo no build. Para atualizar o ZIP local e as versões HTML dos guias após editar o material, execute `python3 scripts/empacotar.py`; esse utilitário é para manutenção, não um pré-requisito dos alunos.

Nenhum script faz login, publica imagens no Hub ou remove indiscriminadamente recursos Docker. As etapas de publicação são manuais e estão no guia.

## Encerrar

```bash
docker compose down
docker compose -f compose.app.yaml down
./scripts/ide.sh parar
```

Esses comandos preservam o volume nomeado do banco. Para apagar **os recados do exercício**, execute separadamente `docker compose -f compose.app.yaml down -v`.
