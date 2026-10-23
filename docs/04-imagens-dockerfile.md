# Imagens, contexto e Dockerfile

Uma imagem reúne arquivos e configuração de execução. Dockerfile é a receita; `sudo docker build` executa essa receita; `sudo docker push` publica o resultado já construído. A pessoa que recebe a imagem não precisa reconstruir o código.

## 1. Obter as receitas do Go

Baixe [go-receitas.zip](../downloads/go-receitas.zip) e extraia em `HOME/oficina-docker`. Ele acrescenta apenas Dockerfile, Dockerfile.simples e .dockerignore em `go-soma/`. Seu `main.go`, baixado e editado na IDE, permanece intacto.

Se perdeu o fonte, o [projeto Go completo](../downloads/go-soma.zip) fica disponível para recuperação. Esse pacote contém também main.go e pode substituir sua edição: use somente quando quiser recuperar a versão original.

A aplicação é só uma soma. Não tem servidor, porta, módulo externo ou banco. Seu processo imprime e termina.

## 2. Construir a imagem simples

```bash
sudo docker build -t minha-soma-simples:1.0.0 \
  -f "$HOME/oficina-docker/go-soma/Dockerfile.simples" \
  "$HOME/oficina-docker/go-soma"
sudo docker run --rm minha-soma-simples:1.0.0
```

| Parte do comando | Significado |
| --- | --- |
| -t minha-soma-simples:1.0.0 | Nome e tag da imagem resultante |
| -f .../Dockerfile.simples | Receita escolhida |
| Último caminho | Contexto de build: pasta do host que fornece arquivos |

O contexto não sobrescreve WORKDIR. Se você entrar nessa pasta com `cd`, pode substituir o último caminho por `.`. Sem `-t`, um argumento como `minha-imagem` é interpretado como caminho de contexto, não como nome da imagem.

A receita simples:

```dockerfile
FROM golang:1.27.3-alpine
WORKDIR /src
COPY main.go .
RUN CGO_ENABLED=0 go build -o /soma main.go
CMD ["/soma"]
```

A base já contém ferramentas Go e arquivos Alpine. É uma imagem, não dois containers. `WORKDIR` cria e seleciona `/src`. `COPY` inclui o fonte. `RUN` executa a compilação no build e salva o executável em `/soma`. `CMD` registra o comando padrão para quando alguém iniciar um container. O estágio único mantém também ferramentas e fontes na imagem final.

## 3. Contexto, WORKDIR e COPY

Considere este comando executado em qualquer diretório do computador:

```bash
sudo docker build -t minha-soma:1.0.0 "$HOME/oficina-docker/go-soma"
```

O contexto é a pasta `HOME/oficina-docker/go-soma`. O Dockerfile recebe os arquivos disponíveis nesse contexto; não recebe automaticamente outras pastas do computador.

```dockerfile
WORKDIR /src
COPY main.go .
```

A origem é `main.go` na raiz do contexto. O destino relativo `.` é `/src`, dentro do estágio. O resultado é `/src/main.go`.

```dockerfile
COPY . .
```

O primeiro ponto representa todo o conteúdo da raiz do contexto. O segundo ponto representa o diretório de trabalho do estágio. Se o contexto contém `src/App.vue`, o destino com WORKDIR `/app` será `/app/src/App.vue`, sem criar uma pasta adicional com o nome do projeto.

```dockerfile
COPY package.json package-lock.json ./
```

Pode haver várias origens: o último argumento é sempre o destino. Aqui, os dois arquivos são copiados para o diretório atual. Com várias origens, o destino precisa ser diretório e terminar em `/`. O `.dockerignore` exclui arquivos do contexto antes da cópia.

Um destino absoluto ignora o WORKDIR:

```dockerfile
WORKDIR /src
COPY main.go /codigo/main.go
```

O resultado é `/codigo/main.go`, e não `/src/codigo/main.go`. Sem WORKDIR explícito, vale o herdado da base; se nenhum estiver definido, o padrão é `/`. A raiz `/` é diferente da pasta `/root`.

## 4. RUN, CMD e ENTRYPOINT

`RUN` executa durante o build. `CMD` e `ENTRYPOINT` registram o que executar depois, ao criar um container.

```dockerfile
ENTRYPOINT ["/soma"]
```

`/soma` é o binário da aplicação, não o compilador Go. Na forma JSON, o executável é iniciado diretamente, sem precisar de shell. Um CMD isolado pode registrar o comando padrão; combinado a ENTRYPOINT, normalmente fornece argumentos padrão. Um comando depois da imagem substitui CMD, mas não ENTRYPOINT. A flag `--entrypoint` permite substituir explicitamente o executável.

O ponto de `go build .` tem outro papel: é o argumento do Go que seleciona o pacote do diretório atual. Nosso programa inicial usa `go build ... main.go` para compilar diretamente esse único arquivo sem go.mod.

## 5. Separar construção e execução

A receita principal do Go é:

```dockerfile
FROM golang:1.27.3-alpine AS build
WORKDIR /src
COPY main.go .
RUN CGO_ENABLED=0 go build -o /out/soma main.go

FROM scratch
COPY --from=build /out/soma /soma
USER 65532:65532
ENTRYPOINT ["/soma"]
```

Cada FROM inicia outro estágio, com os arquivos da base escolhida. O nome `build` identifica todo o primeiro estágio, incluindo as alterações feitas depois de FROM. Depois do RUN, ele contém Go, Alpine, `/src/main.go` e o binário `/out/soma`.

O segundo FROM começa um estágio vazio, sem apagar o primeiro. O COPY busca somente `/out/soma` no estágio chamado build e grava `/soma` no estágio atual. USER escolhe uma identidade numérica sem privilégios administrativos; não exige uma conta com nome no filesystem. ENTRYPOINT registra o executável. Sem `--from=build`, a origem seria procurada no contexto do host, não no resultado da compilação anterior.

```bash
sudo docker build -t minha-soma:1.0.0 "$HOME/oficina-docker/go-soma"
sudo docker run --rm minha-soma:1.0.0
sudo docker image ls
sudo docker image history minha-soma:1.0.0
```

A imagem final é a do último estágio por padrão. `--target build` permite produzir a imagem do primeiro estágio para inspeção:

```bash
sudo docker build --target build -t minha-soma-build "$HOME/oficina-docker/go-soma"
sudo docker run --rm -it --entrypoint sh minha-soma-build
```

## 6. Filesystem não depende de shell

A imagem scratch começa vazia, mas o COPY já cria um filesystem com `/soma`. O programa pode ler e escrever arquivos conforme permissões e mounts. A ausência de `sh`, `ls` ou `cat` impede executar esses programas com exec; não significa ausência de arquivos.

`CGO_ENABLED=0` desabilita cgo. Para esse programa simples, o binário não precisa das bibliotecas C da base. Outros programas podem exigir certificados TLS, dados de fuso horário ou bibliotecas e precisam desses arquivos no estágio final.

Alpine é uma base pequena, com musl e utilitários; não é obrigatório usá-la. Debian/Ubuntu usam normalmente glibc e podem ser mais adequados para dependências específicas. A escolha depende do programa, não da vontade de abrir um terminal.

## 7. Cache e Vue

Repita o build sem mudanças e observe as etapas em cache. Altere o texto da soma, salve e construa novamente. Uma imagem já construída não acompanha automaticamente a edição do host.

No exemplo Vue, o primeiro estágio instala dependências a partir de package.json e package-lock.json antes de copiar o restante. Essa ordem permite reutilizar a instalação quando só o código muda. Node executa `npm run build` e gera `/app/dist`; Nginx recebe esse diretório no estágio final. O procedimento completo está no [guia Vue/Vite](09-vue-vite.md).

`EXPOSE 80` documenta a porta pretendida; `sudo docker run -p` publica no host. As portas do Vite em desenvolvimento não determinam a porta do Nginx em execução.

## 8. Ler a receita da IDE

A IDE já foi usada antes sem exigir entendimento de sua construção. Agora baixe [receitas-dockerfile.zip](../downloads/receitas-dockerfile.zip), extraia em HOME/oficina-docker e abra `/host-home/oficina-docker/receitas/ide.Dockerfile` na própria IDE.

A receita é para leitura, não exige que a turma reconstrua o editor. As instruções principais:

| Instrução | Efeito na IDE |
| --- | --- |
| FROM debian:bookworm-slim | Fornece base e gerenciador APT; não inicia outro kernel |
| ARG LOCAL_UID / LOCAL_GID | Padrões de build para criar a conta aluno; não são automaticamente ENV de runtime |
| RUN apt-get update/install | Instala bibliotecas gráficas e o VS Code dentro da imagem |
| RUN curl/gpg/printf | Configura o repositório de pacotes usado para instalar o editor |
| groupadd / useradd | Criam a conta padrão sem root e associam UID/GID |
| mkdir / chown / chmod | Preparam pastas e permissões dentro da imagem |
| USER aluno | Define a identidade padrão; o docker run pode escolher outro UID/GID com --user |
| ENV HOME=/tmp | Configura a pasta interna dos dados do editor, independente do HOME montado do host |
| ENV XDG_RUNTIME_DIR | Local interno de runtime gráfico; a execução fornece tmpfs com dono correto |
| WORKDIR /workspace | Diretório padrão da primeira abertura |
| CMD code ... . | Registra o editor e seus argumentos; o ponto abre o diretório de trabalho |

Na instrução RUN, barra invertida continua a linha; `&&` só segue após sucesso; `|` conecta saída e entrada; `>` grava em um arquivo. Esses operadores pertencem ao shell, não são instruções Dockerfile. O shell do RUN vem da imagem, independentemente de Bash ou Fish no host.

O CMD não abre a IDE no build. A conexão gráfica depende dos sockets e da autorização fornecidos no docker run. O bind HOME e `--workdir /host-home` mudam o diretório aberto sem reconstruir a imagem. O argumento `--no-sandbox` é o ajuste Electron da demonstração, não uma explicação geral de isolamento Docker.

Fontes: [Dockerfile](https://docs.docker.com/reference/dockerfile/), [contexto](https://docs.docker.com/build/concepts/context/), [multi-stage](https://docs.docker.com/build/building/multi-stage/), [cache](https://docs.docker.com/build/cache/).
