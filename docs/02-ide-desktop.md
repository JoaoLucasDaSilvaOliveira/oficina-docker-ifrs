# IDE desktop executada dentro do container

Tempo: 20 minutos. O objetivo é abrir **uma janela do VS Code desktop no Linux**, com o processo do editor dentro do container. A demonstração não usa code-server, editor web, VNC ou IDE no navegador.

## 1. Entender a conexão

O container inclui o editor e suas bibliotecas. O host já possui uma sessão gráfica. Para exibir a janela, a aplicação precisa alcançar essa sessão por X11/XWayland ou Wayland, com autorização e permissões apropriadas.

Compartilhar sockets gráficos é diferente de montar a pasta do projeto. A primeira experiência tem integração gráfica, mas **sem diretório do projeto do host montado**.

Linux Mint foi informado como sistema provável. A versão ou o nome da distribuição, isoladamente, não garantem o tipo de sessão.

## 2. Caminho principal: X11 ou XWayland

No terminal **da sessão gráfica local**, na raiz do pacote:

```bash
echo "$XDG_SESSION_TYPE"
echo "$DISPLAY"
./scripts/ide.sh preparar
./scripts/ide.sh abrir
```

`preparar` constrói `oficina/ide:1.0.0` com UID/GID do usuário, extrai a autorização X11 usando uma ferramenta dentro da imagem e grava os arquivos locais em `.runtime/`. Não exige `xauth` instalado no host, não usa `xhost +`, não usa `--privileged` e não monta o socket Docker.

Resultado esperado: uma janela VS Code abre em `/workspace`. O terminal aguarda enquanto a janela está em uso. Crie `recado.txt` e escreva algo. Feche a janela e execute:

```bash
./scripts/ide.sh estado
./scripts/ide.sh abrir
```

O arquivo permanece. A imagem usa `sleep infinity` como processo principal e inicia a IDE com `exec`; fechar a IDE não encerra automaticamente esse processo principal.

## 3. Ver os comandos que o script organiza

Após preparar o caminho X11:

```bash
docker compose --env-file .runtime/grafico.env -f compose.ide.yaml up -d
docker compose --env-file .runtime/grafico.env -f compose.ide.yaml exec ide sh
```

Dentro do container:

```bash
pwd
id
ls -la /workspace
abrir-ide
```

O comando `abrir-ide` chama o executável `code`, com flags registradas em `exemplos/ide/abrir-ide`. Nesta imagem local, `--no-sandbox` desativa a sandbox do Electron para compatibilidade com o ambiente do container; isso não é uma necessidade geral do Docker. O editor roda como o usuário `aluno`, alinhado ao UID/GID do host. `--disable-gpu` prioriza renderização por software para não depender da GPU do laboratório.

Os comandos Docker dos demais exercícios continuam no terminal do host; não é preciso instalar Docker nem disponibilizar seu socket dentro da IDE.

## 4. Mostrar o efeito da remoção

Use somente o arquivo descartável criado na primeira experiência:

```bash
./scripts/ide.sh parar
./scripts/ide.sh abrir
```

O `recado.txt` da camada do container anterior não estará no novo container. A imagem do editor continua existindo.

## 5. Agora montar o projeto

```bash
./scripts/ide.sh com-projeto
```

Esse comando recria a IDE com o overlay `compose.ide.bind.yaml`, montando `exemplos/mural` em `/workspace`. Edite um arquivo do projeto pelo editor e observe no host. Os dados montados sobrevivem à remoção do container.

## 6. Alternativa: Wayland nativo

Se a sessão usa Wayland e você optar pela conexão nativa:

```bash
OFICINA_GUI_BACKEND=wayland ./scripts/ide.sh preparar
./scripts/ide.sh abrir
```

O script registra o socket em `.runtime/grafico.env` e escolhe `compose.ide.wayland.yaml`. Dentro do container ele monta o socket em `/tmp/runtime-aluno/wayland-0`, define `XDG_RUNTIME_DIR` e `WAYLAND_DISPLAY`, e inicia o editor com `--ozone-platform=wayland`.

Para inspecionar manualmente esse arranjo, substitua `compose.ide.yaml` por `compose.ide.wayland.yaml` nos comandos manuais anteriores. Não misture os arquivos base de X11 e Wayland no mesmo comando.

## 7. Diagnóstico gráfico

- `DISPLAY` ausente: executar no terminal da sessão gráfica, não numa conexão que não encaminha o display.
- Arquivo Xauthority ausente: `XAUTHORITY` pode apontar para o arquivo real da sessão; o fallback é a `.Xauthority` do usuário. Definir `XAUTHORITY` antes de preparar se necessário.
- Sessão reiniciada ou autorização mudou: fechar o container e preparar novamente. Arquivos de autorização não fazem parte do pacote de distribuição.
- Janela não abre: consultar a saída do comando `abrir-ide`, conferir sessão, permissões e existência do socket. O instrutor ajustará a integração no laboratório conforme o ambiente real.
- Permissão no projeto: conferir `id` no host e no container e as permissões da pasta. Ao mudar o usuário do laboratório, reconstruir a imagem com `preparar`.

Os sockets e arquivos de autorização são locais à sessão. Nenhum comando gráfico foi executado contra o display do laboratório durante a preparação deste material.

Fontes: [X11 e autorização](https://www.x.org/guide/communication/), [Wayland](https://wayland.freedesktop.org/docs/html/apb.html), [VS Code Linux](https://code.visualstudio.com/docs/setup/linux), [CLI](https://code.visualstudio.com/docs/configure/command-line).
