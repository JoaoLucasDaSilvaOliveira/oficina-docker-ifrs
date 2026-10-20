# Publicação e troca pelo Docker Hub

Tempo: 15 minutos. Execute na raiz do pacote, no host. Substitua os nomes de exemplo pelo namespace real; os scripts não fazem login ou publicação por você.

## 1. Construir e identificar

```bash
docker build -t oficina/api:1.0.0 exemplos/mural/api
docker image ls
```

A imagem existe localmente. Seu nome local não a publica em lugar nenhum.

## 2. Fazer login e publicar

```bash
docker login
docker tag oficina/api:1.0.0 SEUUSUARIO/oficina-api:1.0.0
docker push SEUUSUARIO/oficina-api:1.0.0
```

Prepare o repositório no Docker Hub e suas permissões. A conta deve conseguir escrever no namespace escolhido. O fluxo de login pode pedir autorização no navegador; isso é autenticação do registry, não a interface da IDE.

Resultado esperado: o push envia as camadas ausentes e apresenta o digest do artefato. Uma tag pode apontar a outro conteúdo no futuro. `latest` é somente uma tag convencional.

## 3. Executar a API publicada por um colega

O colega também recebe este pacote, pois precisa do frontend, da configuração e do banco. Se ainda não construiu o frontend:

```bash
docker compose -f compose.app.yaml build web
```

Defina a imagem publicada e aplique o overlay:

```bash
export API_IMAGE=COLEGA/oficina-api:1.0.0
docker compose -f compose.app.yaml -f compose.hub.yaml pull api
docker compose -f compose.app.yaml -f compose.hub.yaml \
  up -d --no-build --wait
```

`compose.hub.yaml` substitui a referência de imagem da API. `--no-build` impede construir a API local por engano, mesmo com a configuração de build herdada do arquivo base. As imagens locais do frontend e do banco devem estar disponíveis ou ser recuperáveis.

Abra o mural. O colega executa o artefato publicado, mas mantém seu próprio volume e seus próprios recados.

## 4. Voltar ao build local

```bash
unset API_IMAGE
docker compose -f compose.app.yaml up -d --build --wait
```

## 5. O que viaja

O push envia a imagem marcada: binário, arquivos incluídos e configuração. Não envia automaticamente o volume PostgreSQL, as credenciais locais, o Compose ou as outras imagens da aplicação. Distribuir uma API requer também documentar seu contrato de execução.

## 6. Aprofundamento: plataformas e digests

Os computadores do laboratório devem construir uma plataforma compatível com seus colegas. Uma imagem construída apenas para amd64 não é automaticamente multi-plataforma. Para distribuição entre plataformas diferentes, estudar `docker buildx build --platform linux/amd64,linux/arm64 --push`, os requisitos do builder e os estágios Go correspondentes antes de usá-lo.

O digest identifica conteúdo. Para repetibilidade, registrar a referência com digest e o Compose usado, além da tag de leitura humana.

Fontes: [build, tag e push](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/), [pull por digest](https://docs.docker.com/reference/cli/docker/image/pull/), [multi-plataforma](https://docs.docker.com/build/building/multi-platform/).
