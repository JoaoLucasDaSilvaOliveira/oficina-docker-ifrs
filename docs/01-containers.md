# Containers, processos e filesystem

Tempo: 25 minutos. Execute em qualquer diretório do host, no terminal do host, salvo indicação diferente.

## 1. Baixar a imagem e criar uma instância

```bash
sudo docker pull alpine:3.22
sudo docker image ls
sudo docker run -d --name fs-lab alpine:3.22 sleep infinity
sudo docker ps
sudo docker ps -a
```

`pull` baixa uma imagem. `run` cria um container novo e inicia seu processo. `-d` desacopla o terminal, `--name` escolhe o nome. `sleep infinity` mantém o processo principal ativo para explorar o ambiente. Não usamos `--rm`, pois queremos observar a instância parada.

Se `fs-lab` já existir, observe com `sudo docker ps -a` antes de decidir se vai usá-lo ou removê-lo. O nome identifica uma instância, não a imagem.

## 2. Abrir outro processo

No host:

```bash
sudo docker exec -it fs-lab sh
```

Agora **dentro do container**:

```bash
pwd
ls -la /
cat /etc/os-release
printf 'meu primeiro arquivo\n' > /tmp/recado.txt
cat /tmp/recado.txt
exit
```

`-i` mantém stdin aberto; `-t` cria um pseudo-terminal. `sh` existe nesta imagem; Bash não é garantido. `exit` encerra esse shell, enquanto `sleep` continua como processo principal. `exec` exige um container em execução.

## 3. Parar não é remover

De volta ao host:

```bash
sudo docker stop fs-lab
sudo docker ps
sudo docker ps -a
sudo docker start fs-lab
sudo docker exec fs-lab cat /tmp/recado.txt
```

Resultado esperado: o arquivo permanece. `stop` encerra o processo principal, preservando o container e sua camada gravável. `restart` também preserva essa camada.

## 4. Remover e recriar

```bash
sudo docker rm -f fs-lab
sudo docker run -d --name fs-lab alpine:3.22 sleep infinity
sudo docker exec fs-lab cat /tmp/recado.txt
```

Resultado esperado da última linha: erro de arquivo inexistente. O novo container usa a mesma imagem, mas tem outra camada gravável. O nome igual não transfere a camada anterior. A imagem Alpine permaneceu intacta.

`rm -f` força a parada antes de remover; use somente o container descartável do exercício.

## 5. Ler o que o Docker sabe

```bash
sudo docker inspect fs-lab
sudo docker inspect --format '{{.State.Status}}' fs-lab
sudo docker inspect --format '{{.Config.Image}}' fs-lab
sudo docker inspect --format '{{json .Mounts}}' fs-lab
sudo docker logs --tail 50 fs-lab
sudo docker top fs-lab
sudo docker stats --no-stream fs-lab
sudo docker diff fs-lab
```

`inspect` mostra estado e configuração. `logs` mostra stdout/stderr capturados; `sleep` não produz saída e logs vazios são normais. `top` mostra os processos. `stats` mostra consumo. `diff` mostra alterações da camada, não é backup dos volumes.

Em `ps`, observe ID, imagem, comando, criação, estado, portas e nome. A coluna IMAGE é uma referência registrada, não uma prova completa de procedência. Tags podem mudar e imagens podem ser construídas localmente.

## 6. Uma imagem, dois containers

```bash
sudo docker run -d --name fs-outro alpine:3.22 sleep infinity
sudo docker exec fs-outro ls /tmp
sudo docker rm -f fs-outro
```

Cada instância tem sua própria camada. Mais tarde, montaremos armazenamento externo à instância.

Fontes: [run](https://docs.docker.com/engine/containers/run/), [exec](https://docs.docker.com/reference/cli/docker/container/exec/), [armazenamento](https://docs.docker.com/engine/storage/).
