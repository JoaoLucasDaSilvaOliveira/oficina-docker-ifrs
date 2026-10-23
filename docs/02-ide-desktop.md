# IDE desktop com imagens do Docker Hub

Execute no Bash do terminal da sessão gráfica, em qualquer diretório. Antes desta experiência, baixe main.go para HOME/oficina-docker/go-soma/main.go. Primeiro experimentamos a IDE; sua receita será lida no capítulo de imagens. A turma não recebe o repositório nem executa scripts auxiliares.

## 1. Baixar a imagem pronta

```bash
sudo docker pull joaolsodocker/oficina-ide:1.0.0
```

O instrutor constrói e publica essa imagem antes da oficina. Não é necessário ter Dockerfile, pasta exemplos/ide, VS Code ou SDK no computador do participante.

## 2. Abrir sem acesso à pasta pessoal: X11 ou XWayland

```bash
sudo docker run -d --name ide \
  --user "$(id -u):$(id -g)" \
  --hostname "$(hostname)" \
  -e DISPLAY -e XAUTHORITY=/tmp/oficina.xauth \
  --mount type=bind,src=/tmp/.X11-unix,dst=/tmp/.X11-unix,readonly \
  --mount "type=bind,src=${XAUTHORITY:-$HOME/.Xauthority},dst=/tmp/oficina.xauth,readonly" \
  --tmpfs "/tmp/runtime-aluno:uid=$(id -u),gid=$(id -g),mode=0700" \
  --shm-size=256m \
  joaolsodocker/oficina-ide:1.0.0
```

A janela do VS Code abre em /workspace, dentro do container. Tente encontrar o main.go baixado no computador: ele não está disponível, pois HOME não foi montado. Crie /workspace/recado.txt para comparar o armazenamento da instância com o arquivo do host.

| Argumento | Função |
| --- | --- |
| `--user "$(id -u):$(id -g)"` | Executa com o UID/GID do usuário real, usando a imagem compartilhada sem rebuild por pessoa. |
| `--hostname "$(hostname)"` | Permite encontrar as entradas locais de autorização X11 do host. |
| `-e DISPLAY` | Copia o endereço do display da sessão para o container. |
| `-e XAUTHORITY=/tmp/oficina.xauth` | Informa onde o arquivo de autorização aparece dentro do container. |
| Mounts somente leitura | Disponibilizam socket X11 e autorização. O comando usa a autorização da sessão automaticamente e, no Mint/X11, o caminho padrão HOME/.Xauthority quando necessário. |
| `--tmpfs ...` | Prepara o runtime gráfico com dono e permissões para o UID escolhido, mesmo se diferente de 1000. |
| `--shm-size=256m` | Define a capacidade de memória compartilhada em /dev/shm. |

O HOME interno da imagem é /tmp para guardar configurações do editor com diferentes UIDs. Ele é independente do HOME expandido pelo shell do host nos argumentos. O WORKDIR padrão é /workspace e o CMD abre ponto, isto é, o diretório de trabalho atual.

## 3. Observar e reabrir

```bash
sudo docker ps
sudo docker top ide
sudo docker exec -it ide sh
```

Dentro do container, execute pwd, id e ls -la /workspace, depois exit. Feche a janela. O comando code --wait termina e o container para. Confira e reabra o mesmo:

```bash
sudo docker ps -a
sudo docker start ide
```

O recado da camada permanece no mesmo container. Remover o container elimina essa camada, mas não a imagem.

## 4. Agora acessar a pasta pessoal do computador

Feche a IDE e use somente os arquivos descartáveis da primeira experiência. A primeira linha remove aquele container.

```bash
sudo docker rm -f ide
sudo docker run -d --name ide \
  --user "$(id -u):$(id -g)" \
  --hostname "$(hostname)" \
  -e DISPLAY -e XAUTHORITY=/tmp/oficina.xauth \
  --mount type=bind,src=/tmp/.X11-unix,dst=/tmp/.X11-unix,readonly \
  --mount "type=bind,src=${XAUTHORITY:-$HOME/.Xauthority},dst=/tmp/oficina.xauth,readonly" \
  --tmpfs "/tmp/runtime-aluno:uid=$(id -u),gid=$(id -g),mode=0700" \
  --mount "type=bind,src=$HOME,dst=/host-home" \
  --workdir /host-home \
  --shm-size=256m \
  joaolsodocker/oficina-ide:1.0.0
```

A diferença é o bind mount de **toda a pasta pessoal**, sem supor uma pasta da oficina:

```text
HOME do computador → /host-home no container
```

--workdir muda o diretório para /host-home. Como o CMD abre ponto, a IDE passa a abrir a pasta pessoal. O Linux mantém as permissões do usuário escolhido; não é necessário executar como root. A raiz / do computador não é montada.

Exemplo: um arquivo HOME/Documentos/recado.txt aparece em /host-home/Documentos/recado.txt. É o mesmo arquivo, com leitura e escrita; não é uma cópia. Alterações feitas pelo editor afetam os arquivos reais. Ao remover o container, os arquivos desse bind permanecem no host.

Agora abra `/host-home/oficina-docker/go-soma/main.go` na IDE. É o arquivo baixado antes, sem cópia. Altere um dos números ou a mensagem impressa e salve.

Para executar esse fonte sem Go instalado no computador, no terminal do host:

```bash
sudo docker run --rm --user "$(id -u):$(id -g)" \
  --mount "type=bind,src=$HOME/oficina-docker/go-soma,dst=/src,readonly" \
  -w /src -e GOCACHE=/tmp/go-cache \
  golang:1.27.3-alpine go run main.go
```

O bind entrega o fonte ao compilador do container. `go run main.go` compila e executa esse arquivo; não exige go.mod neste exercício simples. O container é removido ao terminar. O arquivo editado continua no host. Os caches ficam em /tmp dentro do container, com permissões do UID escolhido.

## 5. Alternativa Wayland nativo

Se optar por Wayland nativo, use este comando no lugar do X11. Não mantenha outro container chamado ide. A primeira experiência continua sem pasta pessoal montada.

```bash
sudo docker run -d --name ide \
  --user "$(id -u):$(id -g)" \
  -e XDG_RUNTIME_DIR=/tmp/runtime-aluno \
  -e WAYLAND_DISPLAY=wayland-0 \
  --mount "type=bind,src=$XDG_RUNTIME_DIR/$WAYLAND_DISPLAY,dst=/tmp/runtime-aluno/wayland-0" \
  --tmpfs "/tmp/runtime-aluno:uid=$(id -u),gid=$(id -g),mode=0700" \
  --shm-size=256m \
  joaolsodocker/oficina-ide:1.0.0 \
  code --no-sandbox --disable-gpu --ozone-platform=wayland --new-window --wait .
```

Se WAYLAND_DISPLAY já for um caminho absoluto, use-o diretamente como origem do mount. Para a segunda experiência, acrescente --mount "type=bind,src=$HOME,dst=/host-home" e --workdir /host-home antes da imagem. O argumento final ponto seguirá esse diretório.

## 6. Diagnóstico

```bash
sudo docker ps -a
sudo docker logs --tail 50 ide
sudo docker inspect ide
```

Copie os comandos completos no Bash, no terminal da sessão gráfica. Eles já identificam a autorização da sessão; o aluno não precisa procurar arquivos nem editar caminhos. Se a janela não abrir no laboratório, o instrutor confere a integração gráfica antes da atividade.

A mesma ideia de ferramentas no Docker será usada com Vue/Vite. Mais tarde, a configuração da IDE poderá ser traduzida para Compose. A receita da IDE fica disponível para leitura no capítulo de imagens; o primeiro build da turma usa o programa de soma, sem o código do mural.

Fontes: [bind mounts](https://docs.docker.com/engine/storage/bind-mounts/), [X11](https://www.x.org/guide/communication/), [VS Code CLI](https://code.visualstudio.com/docs/configure/command-line).
