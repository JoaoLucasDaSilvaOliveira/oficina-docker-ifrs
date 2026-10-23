# Preparar e publicar a oficina

Somente o instrutor precisa deste repositório e do Python para preparar o site. Os participantes abrem os slides no GitHub Pages, baixam os exemplos da etapa e usam ferramentas em containers. Namespace das imagens de referência: **joaolsodocker**.

## 1. Gerar o site e os materiais

Na raiz do material de autoria:

```bash
python3 ferramentas/preparar_materiais.py --site-dir .runtime/site
```

A ferramenta usa apenas a biblioteca padrão do Python. Gera guias HTML com âncoras por seção, uma página de exercício para cada slide com comandos, ZIPs por etapa e `main.go`, e prepara um site com `index.html`, `apresentacao/`, `docs/`, `downloads/` e `.nojekyll`. As páginas de exercício usam os comandos da fonte dos slides, sem duplicar manualmente as instruções e sem incluir notas do apresentador. Não copia `.git`, `.env`, credenciais, ferramentas de autoria, código do mural ou arquivos de `.runtime`. Os ZIPs têm somente o exercício correspondente. No capítulo de build Go, `go-receitas.zip` acrescenta as receitas sem substituir o main.go editado. `go-soma.zip` é a recuperação opcional do projeto completo.

Abra localmente com um servidor estático, mantendo os caminhos relativos do site:

```bash
python3 -m http.server 8080 --directory .runtime/site
```

Se a porta 8080 já estiver ocupada pelo preview anterior, use 8081. O primeiro comando não precisa de Docker nem envia arquivos para a internet.

## 2. Publicar o site no GitHub Pages

No repositório de autoria no GitHub, escolha **Settings → Pages → Build and deployment → Source: GitHub Actions**. Quando quiser publicar a versão revisada, execute **Actions → Publicar oficina no GitHub Pages → Run workflow**.

O arquivo `.github/workflows/pages.yaml` aceita somente `workflow_dispatch`. Não executa por push. Gera `_site`, envia apenas esse artefato e publica no ambiente `github-pages`. Os links são relativos, de modo que a apresentação também funciona sob o caminho de um repositório, e não apenas na raiz de um domínio.

As actions seguem as versões documentadas pelo GitHub: checkout v6, configure-pages v5, upload-pages-artifact v4 e deploy-pages v4. As permissões de publicação pertencem apenas ao job de deploy. [Workflows personalizados do GitHub Pages](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).

Esta preparação não publica o site: o instrutor decide quando executar o workflow e configura as proteções do ambiente no GitHub.

## 3. Construir as imagens de referência

```bash
sudo docker build -t joaolsodocker/oficina-go:1.0.0 exemplos/go-soma
sudo docker build -t joaolsodocker/oficina-vue:1.0.0 exemplos/vue-vite
sudo docker build -t joaolsodocker/oficina-ide:1.0.0 exemplos/ide
sudo docker build -t joaolsodocker/oficina-api:1.0.0 exemplos/mural/api
sudo docker build -t joaolsodocker/oficina-web:1.0.0 exemplos/mural/frontend
```

A IDE usa somente a pasta `exemplos/ide` como contexto. Dentro dessa pasta, o comando equivalente é `sudo docker build -t joaolsodocker/oficina-ide:1.0.0 .`. A imagem inclui sua própria receita para leitura durante a oficina, sem depender das fontes do mural ou do Dockerfile dos slides. A turma escolhe o UID/GID efetivo com `--user`, sem reconstruir uma imagem por pessoa. O runtime gráfico fica em tmpfs com UID/GID e modo 0700. O editor abre `/workspace` na primeira experiência; com HOME montado, abre `/host-home`.

O programa da imagem Go deve ser o mesmo do `main.go` oferecido no site. O Vue é o template original; a diferença entre os dois acessos está na forma de executar, não no conteúdo da tela. O mural fica reservado ao capítulo de Compose, usando imagens prontas.

## 4. Publicar manualmente as imagens

```bash
sudo docker login
sudo docker push joaolsodocker/oficina-go:1.0.0
sudo docker push joaolsodocker/oficina-vue:1.0.0
sudo docker push joaolsodocker/oficina-ide:1.0.0
sudo docker push joaolsodocker/oficina-api:1.0.0
sudo docker push joaolsodocker/oficina-web:1.0.0
```

O instrutor executa login e push antes da oficina. Confira acesso público, arquitetura compatível e pull a partir de outra máquina. Podem ser pré-carregadas as imagens Go, Node, IDE, Vue, API, web e PostgreSQL para reduzir a dependência da rede durante a aula. Não é necessário publicar uma imagem dos slides.

## 5. Preview Docker opcional

O Dockerfile da raiz prepara o mesmo site estático e serve em Nginx na porta interna 8080. Ele existe para desenvolvimento local e não é um passo para os alunos:

```bash
sudo docker build -t joaolsodocker/oficina-slides:1.0.0 .
sudo -E docker compose -f compose.yaml up -d --pull never --wait
```

O `compose.yaml` da raiz foi preservado para esse preview. Ele não integra os downloads dos participantes. O endereço local é `http://localhost:8080/apresentacao/`.

## 6. Ensaio do laboratório

- Conferir Docker Engine, Compose e permissões da conta da turma.
- Conferir Bash, DISPLAY, XAUTHORITY e sessão gráfica do Mint; testar o VS Code nativo sem e com HOME.
- Baixar `main.go` antes de abrir a primeira IDE. O desafio é observar que o arquivo do host não aparece sem mount.
- Executar Go e Node pelo Docker, sem SDKs no host. A edição ocorre pela IDE com bind de HOME.
- Testar o template com `npm run dev` dentro do container de Node; depois testar a imagem pronta com Nginx.
- Conferir os ZIPs do site, o destino de extração e os contextos do build.
- Subir o mural com os YAMLs baixados em uma pasta limpa, sem checkout.
- Testar as contas do Hub antes do momento de compartilhar imagens.
