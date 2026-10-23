# Publicar e executar a imagem do colega

O Hub recebe a imagem já construída, não apenas o Dockerfile. Os fontes são necessários durante o build; a execução do colega usa os arquivos e a configuração da imagem pronta.

## 1. Nome, namespace e tag

`joaolsodocker/oficina-go:1.0.0` reúne namespace, repositório e tag. Imagens oficiais como Alpine ficam no namespace especial library, que pode ser omitido: `alpine:3.22` corresponde a `docker.io/library/alpine:3.22`.

Uma tag local curta não é automaticamente o repositório da sua conta. Para publicar, marque a imagem no seu namespace.

## 2. Publicar o programa Go

Depois de construir sua imagem `minha-soma:1.0.0`:

```bash
docker login
docker tag minha-soma:1.0.0 SEUUSUARIO/oficina-go:1.0.0
docker push SEUUSUARIO/oficina-go:1.0.0
```

Substitua SEUUSUARIO por sua conta ou organização no Docker Hub. A pessoa executa login e push explicitamente; nenhum script de materiais publica imagens ou compartilha credenciais.

## 3. Executar a imagem do colega

```bash
docker pull COLEGA/oficina-go:1.0.0
docker run --rm COLEGA/oficina-go:1.0.0
```

Troque COLEGA pelo namespace escolhido. A mensagem impressa confirma a versão do programa recebido. O colega não precisa baixar seu fonte, Dockerfile ou compilador.

O mesmo vale para o Vue:

```bash
docker tag meu-vue:1.0.0 SEUUSUARIO/oficina-vue:1.0.0
docker push SEUUSUARIO/oficina-vue:1.0.0
```

Em outra máquina, ou depois de o colega publicar:

```bash
docker run -d --name front-colega \
  -p 127.0.0.1:8083:80 \
  COLEGA/oficina-vue:1.0.0
```

Abra `http://localhost:8083`. Se a imagem ainda não estiver no daemon local, docker run tenta baixá-la. O nome da tag deve ser compatível com a que foi publicada.

## 4. Imagem da API no Compose

No aprofundamento do mural, a configuração permite selecionar outra imagem compatível da API. Isso não exige mostrar seu código ao restante da turma. Baixe os YAMLs do [Compose do mural](../downloads/compose-mural.zip), extraídos em HOME/oficina-docker:

```bash
cd "$HOME/oficina-docker"
export API_IMAGE=COLEGA/oficina-api:1.0.0
docker compose -f compose.app.yaml -f compose.hub.yaml config --images
docker compose -f compose.app.yaml -f compose.hub.yaml pull api
docker compose -f compose.app.yaml -f compose.hub.yaml up -d --wait
```

A referência precisa ser uma API com o mesmo contrato esperado pelo frontend e pelo banco. Não use a imagem da soma nesse campo: ela é um programa que termina, e não um servidor HTTP de recados.

Para voltar ao padrão:

```bash
unset API_IMAGE
docker compose -f compose.app.yaml up -d --wait
```

Se também definiu API_IMAGE em `.env`, ajuste o arquivo. O padrão é `joaolsodocker/oficina-api:1.0.0`.

## 5. O que viaja

Push envia os arquivos e a configuração da imagem selecionada. Não envia volumes do banco, bind mounts, variáveis do shell, YAMLs ou outras imagens. No multi-stage, fontes e compiladores não entram no estágio final se você não os copiar.

Tags são referências mutáveis. Digest identifica conteúdo. `latest` é uma tag convencional, não uma seleção automática da versão mais recente. A imagem precisa ser compatível com a arquitetura e o ambiente do destinatário; builds multi-platform pertencem ao aprofundamento do instrutor.

Fontes: [build, tag e push](https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/), [pull e digests](https://docs.docker.com/reference/cli/docker/image/pull/).
