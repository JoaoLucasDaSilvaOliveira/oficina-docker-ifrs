# Vue e Vite com ferramentas em containers

O exemplo usa o template original Vue + Vite em JavaScript. Não implementamos um novo frontend: a finalidade é comparar desenvolvimento, build e execução da imagem.

## 1. Obter o exemplo

Baixe [vue-vite.zip](../downloads/vue-vite.zip) e extraia em `HOME/oficina-docker`. O arquivo `package.json` deve aparecer em `HOME/oficina-docker/vue-vite/package.json`.

Na IDE com HOME montado, abra `/host-home/oficina-docker/vue-vite`. O computador não precisa de Node ou npm instalados.

## 2. Executar em desenvolvimento

No terminal do host:

```bash
docker run --rm -it --name vue-dev \
  -p 127.0.0.1:5174:5173 \
  --mount "type=bind,src=$HOME/oficina-docker/vue-vite,dst=/app" \
  --mount type=volume,dst=/app/node_modules \
  -w /app \
  node:24-alpine sh -c 'npm ci && npm run dev -- --host 0.0.0.0'
```

Abra `http://localhost:5174`. Vite escuta na porta interna 5173 e em todas as interfaces do container; Docker publica em 5174 apenas no loopback do host. Mude um texto em `src/components/HelloWorld.vue` pela IDE e observe a atualização.

O bind fornece as fontes. O volume anônimo em `/app/node_modules` guarda as dependências instaladas pelo npm, sem criar essa pasta no projeto do host. Neste experimento o Node executa como root dentro do container para poder escrever no volume novo. A instalação ocorre no volume; os caches npm ficam dentro do container. Evite usar esse terminal para gerar novos arquivos no bind se não quiser arquivos do host com dono root.

Ctrl+C encerra Vite. Como usamos `--rm`, esse container e o volume anônimo associado são removidos ao terminar. O código do bind permanece.

## 3. Executar a imagem pronta

Antes de continuar, pressione Ctrl+C no terminal do Vite. Isso encerra vue-dev e libera a porta 5174 para o próximo container.

```bash
docker pull joaolsodocker/oficina-vue:1.0.0
docker run -d --name vue-web \
  -p 127.0.0.1:5174:80 \
  joaolsodocker/oficina-vue:1.0.0
```

Abra `http://localhost:5174`. A tela inicial é a mesma, mas o servidor agora é Nginx. A imagem contém os arquivos já gerados pelo build; não precisa acessar a pasta local nem executar npm. Alterações no bind do ambiente de desenvolvimento não mudam essa imagem pronta.

## 4. Construir sua versão

No capítulo de imagens, leia o Dockerfile que veio no ZIP e construa:

```bash
docker build -t meu-vue:1.0.0 "$HOME/oficina-docker/vue-vite"
docker run -d --name meu-vue \
  -p 127.0.0.1:5175:80 \
  meu-vue:1.0.0
```

Abra `http://localhost:5175` para ver sua imagem.

O estágio Node instala dependências e executa `npm run build`, produzindo `/app/dist`. O estágio Nginx recebe apenas esse diretório, mais a configuração HTTP. O JavaScript entregue pelo Nginx executa no navegador. Node e o servidor Vite não participam da execução final.

`COPY --from=build /app/dist/ /usr/share/nginx/html/` lê a origem no estágio chamado build. A configuração própria do Nginx trata rotas do frontend. `EXPOSE 80` documenta; `-p` publica a porta no host.

## 5. Limpar somente esses exemplos

```bash
docker rm -f vue-web meu-vue
```

Não é necessário apagar o projeto ou usar prune global.

Fontes: [Vite: deploy estático](https://vite.dev/guide/static-deploy.html), [Vite: opções de servidor](https://vite.dev/config/server-options.html), [imagem Node](https://github.com/nodejs/docker-node), [imagem Nginx](https://hub.docker.com/_/nginx).
