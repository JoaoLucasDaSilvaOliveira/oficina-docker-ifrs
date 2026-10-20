# Preparação do laboratório

O pacote foi preparado para Linux, com Linux Mint informado como sistema provável do laboratório em Osório. A versão e a sessão gráfica devem ser verificadas no local. Não é necessário instalar Go, Node, PostgreSQL ou uma IDE no host.

## 1. Verificar a base

No terminal do host:

```bash
docker version
docker compose version
docker info
echo "$XDG_SESSION_TYPE"
```

Resultado esperado: cliente e servidor Docker respondem; Compose mostra uma versão; o último comando costuma retornar `x11` ou `wayland`. Se o daemon não responder, resolver o acesso ao Docker com a equipe do laboratório antes da atividade. Não transformar a abertura da oficina em instalação de sistema.

## 2. Disponibilizar o pacote

Cada dupla recebe a pasta completa, com seus arquivos ocultos de exemplo e os guias. Entre nela pelo terminal e mantenha esse terminal como **terminal do host**. O terminal aberto por `docker exec` será explicitamente identificado nos exercícios.

`.env.example` é uma referência; os padrões funcionam sem copiar o arquivo. O nome do projeto Compose da aplicação é `oficina-mural`, independente do nome da pasta. As portas de entrada padrão são 8080 para os materiais e 8088 para o mural.

## 3. Preparar downloads antes da aula

```bash
./scripts/precarregar.sh
```

Esse script baixa a imagem pequena e a imagem Go, prepara o banco e constrói web, API e slides. A imagem da IDE é maior e tem preparação própria:

```bash
./scripts/ide.sh preparar
```

O primeiro build da IDE instala o VS Code **dentro da imagem**, usando o repositório assinado da Microsoft. Esse build precisa de internet. As demais imagens também são baixadas na primeira execução. Depois de preparadas, as atividades centrais podem usar o cache local; login e push/pull no Hub continuam exigindo acesso ao registry.

## 4. Abrir o material e confirmar a aplicação

```bash
docker compose up -d --build
docker compose -f compose.app.yaml up -d --build --wait
```

Abra os materiais em `http://localhost:8080` e o mural em `http://localhost:8088`. Publique um recado de teste. A apresentação contém notas pelo botão Notas e atalhos de teclado; os botões de simulação não executam comandos.

## 5. Preparar a troca de imagens

Cada pessoa que publicar deve ter conta e namespace próprios no Docker Hub. Faça o login interativo antes da etapa de publicação, sem compartilhar senha com a turma.

## 6. Plano de recuperação

Se uma dupla atrasar, use os arquivos fornecidos como ponto de partida. Se faltar acesso ao Hub, a turma pode executar uma imagem de referência já publicada pelo instrutor. Para falhas de display, use o guia da IDE; mantenha os demais exercícios independentes dessa configuração.

Fontes: [Docker Engine](https://docs.docker.com/engine/install/), [Compose](https://docs.docker.com/compose/), [Linux Mint](https://www.linuxmint.com/download_all.php).
