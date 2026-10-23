# Uma soma em Go

Um único `main.go`, apenas biblioteca padrão e sem `go.mod`: o foco é acompanhar como o Docker compila e distribui um programa. A saída é `Olá, turma! 2 + 3 = 5`. Altere os números ou o texto antes de construir novamente.

Na pasta extraída:

```bash
docker run --rm --mount "type=bind,src=$PWD,dst=/src,readonly" \
  --workdir /src golang:1.27.3-alpine go run main.go

docker build -f Dockerfile.simples -t minha-soma-simples:1.0.0 .
docker run --rm minha-soma-simples:1.0.0

docker build -t joaolsodocker/oficina-go:1.0.0 .
docker run --rm joaolsodocker/oficina-go:1.0.0
```

A versão simples mantém compilador e fontes na imagem. O `Dockerfile` com dois estágios copia somente o executável para a imagem final baseada em `scratch`. O programa imprime e termina; não é um servidor e não abre porta.

A imagem publicada pelo instrutor usa a mesma fonte deste exercício. O comando de publicação, executado pelo instrutor após autenticar no Hub, é `docker push joaolsodocker/oficina-go:1.0.0`.
