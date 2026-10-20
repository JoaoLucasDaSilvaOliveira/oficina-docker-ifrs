# Imagens, Dockerfile e build Go

Tempo: 30 minutos. O contexto dos comandos é a raiz do pacote, no host.

## 1. Ler a receita simples

Abra `exemplos/mural/api/Dockerfile.simples` na IDE desktop. Ela usa uma imagem Go, copia o módulo e o código, baixa dependências e compila `/api`. O compilador continua na imagem final.

```bash
docker build -t oficina/api-simples:1.0.0 \
  -f exemplos/mural/api/Dockerfile.simples \
  exemplos/mural/api
```

`-f` escolhe a receita. O último argumento define o contexto; `COPY` usa caminhos relativos a esse contexto. O `.dockerignore` correspondente evita enviar arquivos desnecessários ou privados.

## 2. Separar build de runtime

- `RUN`: comando executado pelo builder.
- `CMD`: comando ou argumentos padrão para a inicialização.
- `ENTRYPOINT`: executável padrão, com argumentos de CMD ou do `run`.
- `EXPOSE`: documentação da porta; não publica no host.
- `COPY`: arquivos trazidos do contexto ou de outro estágio.
- `USER`: usuário das instruções posteriores e da execução configurada.

Use a referência para as demais instruções. Uma imagem contém camadas e metadados; não existe uma camada de novos arquivos para cada linha de Dockerfile.

## 3. Construir com multi-stage

Abra `exemplos/mural/api/Dockerfile`. O estágio `build` usa Go e caches do BuildKit. O estágio final usa Alpine, certificados e o binário, com usuário numérico sem privilégios administrativos.

```bash
docker build -t oficina/api:1.0.0 exemplos/mural/api
docker image ls
docker image history oficina/api:1.0.0
docker image inspect oficina/api:1.0.0
```

Compare os tamanhos exibidos das imagens simples e final no seu ambiente; não é necessário prometer um número fixo. O binário desta aplicação é compilado com `CGO_ENABLED=0`; outros projetos podem exigir bibliotecas C ou arquivos adicionais.

A API precisa de PostgreSQL para iniciar. O próximo guia executa as dependências. Não iniciar uma API sem banco esperando que ela funcione como uma página estática.

## 4. Observar o cache

```bash
docker build -t oficina/api:1.0.0 exemplos/mural/api
```

Repita sem alterações e observe os passos reutilizados. Depois edite no código o texto da mensagem `O recado não foi salvo` e execute novamente. O download de módulos pode ser reutilizado; os passos dependentes do código precisam ser refeitos.

Alterar `go.mod` ou `go.sum` muda a etapa de dependências. A ordenação de `COPY` separa esses arquivos do código. Cache mounts reaproveitam downloads e compilação; o grafo real do BuildKit é mais completo que a simulação dos slides.

`--no-cache` não reutiliza cache de instruções. `--pull` procura uma imagem base atualizada. Um não substitui o outro.

## 5. Testar sem instalar Go

```bash
./scripts/testar-api.sh
```

O script monta apenas a pasta da API numa imagem Go, executa `go test ./...`, e usa diretórios temporários para os caches do usuário dentro do container. Os testes verificam validação, limites, respostas de erro e recuperação depois de indisponibilidade do repositório.

## 6. Versionar o artefato

```bash
docker build --build-arg APP_VERSION=1.1.0 \
  -t oficina/api:1.1.0 exemplos/mural/api
```

`APP_VERSION` entra no binário no build. A versão aparece em `/api/info`. Variáveis como `PGHOST` são fornecidas na execução e não exigem recompilação.

Fontes: [Dockerfile](https://docs.docker.com/reference/dockerfile/), [contexto](https://docs.docker.com/build/concepts/context/), [multi-stage](https://docs.docker.com/build/building/multi-stage/), [cache](https://docs.docker.com/build/cache/).
