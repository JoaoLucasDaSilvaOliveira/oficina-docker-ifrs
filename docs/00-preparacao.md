# Começar a oficina

Os slides são um site estático no GitHub Pages. Abra o endereço informado pelo instrutor. Não é necessário iniciar um container para acompanhar a apresentação, nem clonar o repositório.

## 1. Laboratório

Docker Engine e plugin Compose devem estar disponíveis no Linux do laboratório. Go, Node, VS Code e PostgreSQL serão executados em containers. O navegador e o terminal pertencem à sessão gráfica do computador.

Os comandos usam Bash. Se seu terminal for Fish, execute `bash` antes de copiar expressões como `${VAR:-padrao}`.

```bash
sudo docker version
sudo -E docker compose version
sudo docker info
echo "$XDG_SESSION_TYPE"
echo "$DISPLAY"
echo "$XAUTHORITY"
```

Cliente e servidor Docker precisam responder. A preparação das imagens e da sessão gráfica pertence ao instrutor, antes da aula.

## 2. Primeiro arquivo: uma soma em Go

Quando indicado, baixe [main.go](../downloads/main.go). Pelo gerenciador de arquivos, crie `HOME/oficina-docker/go-soma` e salve o arquivo nessa pasta como `main.go`. Confira que não foi acrescentado `.txt` ao nome.

Esse programa é o mesmo da imagem `joaolsodocker/oficina-go:1.0.0`, que imprime uma soma e termina. Não precisa de banco, frontend ou módulo Go para o primeiro experimento.

```bash
sudo docker pull joaolsodocker/oficina-go:1.0.0
sudo docker run --rm joaolsodocker/oficina-go:1.0.0
```

O término do processo é o comportamento esperado. Não é um servidor aguardando conexões.

## 3. Downloads por etapa

Os slides mostram o conceito e oferecem o comando em uma janela própria. O catálogo Materiais reúne os arquivos de consulta. Baixe somente o que o exercício precisa, sem clonar o projeto inteiro.

| Etapa | Download | Destino |
| --- | --- | --- |
| IDE e Go | main.go | HOME/oficina-docker/go-soma/main.go |
| Vue/Vite | vue-vite.zip | Extrair em HOME/oficina-docker; cria vue-vite/ |
| Imagens Go | go-receitas.zip | Extrair em HOME/oficina-docker; acrescenta receitas em go-soma/ sem alterar main.go |
| Recuperação Go | go-soma.zip | Projeto completo opcional; pode substituir a edição de main.go |
| Compose IDE | compose-ide.zip | Extrair em HOME/oficina-docker; cria três YAMLs |
| Compose mural | compose-mural.zip | Extrair em HOME/oficina-docker; cria três YAMLs |
| Leitura da IDE | receitas-dockerfile.zip | Extrair em HOME/oficina-docker; cria receitas/ |

O download principal do build Go contém somente receitas, preservando o arquivo editado. Se usar o projeto completo de recuperação `go-soma.zip`, guarde suas alterações antes de extrair sobre a pasta existente. Não crie diretórios duplicados como `vue-vite/vue-vite`.

## 4. IDE nativa

A imagem da IDE abre VS Code no desktop, e não uma página web. Primeiro ela não enxerga sua pasta pessoal. Depois um bind mount de HOME para `/host-home` permite encontrar e editar o `main.go` baixado.

A primeira execução já compartilha os recursos da sessão gráfica. Isso permite desenhar a janela, mas não dá automaticamente acesso aos seus projetos.

## 5. Docker Hub

As imagens de apoio são do instrutor, no namespace `joaolsodocker`. Quem compartilhar uma imagem própria usa sua própria conta no Hub e executa `sudo docker login` quando indicado. A publicação do site é independente das imagens.

Fontes: [Docker](https://docs.docker.com/get-started/docker-overview/), [Compose](https://docs.docker.com/compose/).

Os comandos Docker usam `sudo`. No Compose, `sudo -E` preserva as variáveis da sessão necessárias à IDE e aos caminhos locais.
