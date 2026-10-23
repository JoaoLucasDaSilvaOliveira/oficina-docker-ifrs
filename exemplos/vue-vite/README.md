# Vue + Vite — exemplo da oficina

Template JavaScript oficial `template-vue` do pacote **create-vite 9.3.1**, sem alterações em `App.vue`, `HelloWorld.vue`, estilos, contador ou recursos visuais. Os arquivos Docker são os únicos acréscimos de execução.

Origem fixada: https://registry.npmjs.org/create-vite/-/create-vite-9.3.1.tgz
Projeto oficial: https://github.com/vitejs/vite/tree/main/packages/create-vite
Licença original: MIT, preservada em `LICENSE`. O `package-lock.json` fixa as dependências resolvidas para esta oficina.

Na pasta extraída, sem Node/npm instalados no computador:

```bash
sudo docker run --rm -it \
  --mount "type=bind,src=$PWD,dst=/app" \
  --mount type=volume,dst=/app/node_modules --workdir /app \
  -p 127.0.0.1:5174:5173 node:24-alpine \
  sh -c 'npm ci && npm run dev -- --host 0.0.0.0'
```

Abra http://localhost:5174. A opção `--host 0.0.0.0` faz o Vite escutar na interface do container; a publicação fica limitada ao computador. As dependências ficam em um volume anônimo em `/app/node_modules`, removido junto com o container por `--rm`. Ctrl+C encerra o servidor.

Para construir a imagem de produção e servir a mesma tela:

```bash
sudo docker build -t joaolsodocker/oficina-vue:1.0.0 .
sudo docker run --rm --name vue -p 127.0.0.1:8081:80 joaolsodocker/oficina-vue:1.0.0
```

Abra http://localhost:8081. Aqui o Node executa apenas durante o build; o container final usa Nginx. A aplicação não tem SSR.

---

## README original do template

# Vue 3 + Vite

This template should help get you started developing with Vue 3 in Vite. The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

Learn more about IDE Support for Vue in the [Vue Docs Scaling up Guide](https://vuejs.org/guide/scaling-up/tooling.html#ide-support).
