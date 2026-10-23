# Docker, na prática

Material de uma oficina para ensino médio, ensino superior e comunidade. O percurso parte de processos e arquivos, passa por uma IDE desktop em container, constrói imagens de exemplos pequenos e termina com uma aplicação de três serviços no Compose.

Os slides são um site estático para **GitHub Pages**. A pessoa abre o endereço fornecido pelo instrutor; não precisa executar Docker para ler a apresentação. Este repositório é o material de autoria: **os participantes não precisam cloná-lo**.

## Percurso da oficina

1. Entender Docker, imagens, tags, containers e processos.
2. Explorar Alpine, arquivos e o ciclo de vida do container.
3. Baixar um `main.go` com uma soma; abrir a IDE primeiro sem acesso à pasta pessoal e depois com um bind mount de HOME.
4. Executar e modificar o mesmo programa usando Go em um container.
5. Explorar o template original Vue + Vite, com Node no Docker; comparar desenvolvimento e imagem pronta.
6. Construir Dockerfiles de Go e Vue, observar contexto, cache e múltiplos estágios.
7. Usar Compose com o mural pronto: frontend, API Go, PostgreSQL, rede e persistência.
8. Publicar uma imagem própria e executar a de um colega.

A IDE abre uma janela nativa do VS Code no desktop Linux. As ferramentas Go, Node e o banco ficam em containers. O conteúdo central é Docker; os programas de exercício continuam pequenos.

## Comandos e materiais

O painel de comandos reúne os exemplos copiáveis. O passo a passo de cada exercício abre uma página específica daquela tela; os guias completos conservam âncoras por seção para consulta. Flags têm explicações por mouse, toque e teclado. Os materiais ficam concentrados no catálogo; cada etapa oferece apenas o download necessário naquele momento.

Crie `$HOME/oficina-docker` pelo gerenciador de arquivos. Os ZIPs já contêm a pasta do exemplo; extraia diretamente nessa pasta, sem duplicar o nome do projeto.

| Arquivo | Conteúdo e destino |
| --- | --- |
| `main.go` | Primeiro arquivo, salvo em `HOME/oficina-docker/go-soma/main.go` |
| `go-receitas.zip` | Somente Dockerfiles e `.dockerignore` em `go-soma/`; preserva o main.go já editado |
| `go-soma.zip` | Projeto completo para recuperação opcional; pode substituir a edição de main.go |
| `vue-vite.zip` | Pasta `vue-vite/` com template Vue/Vite, lockfile, Dockerfile e Nginx |
| `compose-ide.zip` | Três YAMLs para traduzir a execução da IDE para Compose |
| `compose-mural.zip` | Três YAMLs para API, frontend, banco e rede |
| `receitas-dockerfile.zip` | Receita da IDE para leitura e discussão |

Preserve suas alterações antes de extrair novamente um pacote. O mural avançado usa imagens prontas: a turma não precisa estudar seu código-fonte.

## Imagens do instrutor

| Imagem | Uso |
| --- | --- |
| `joaolsodocker/oficina-go:1.0.0` | Programa de soma já compilado |
| `joaolsodocker/oficina-ide:1.0.0` | VS Code desktop |
| `joaolsodocker/oficina-vue:1.0.0` | Mesmo template Vue, compilado e servido por Nginx |
| `joaolsodocker/oficina-api:1.0.0` | API pronta do mural |
| `joaolsodocker/oficina-web:1.0.0` | Frontend e proxy do mural |
| `postgres:17-alpine` | Banco do mural |

As imagens precisam ser publicadas pelo instrutor antes da oficina. O site não depende de uma imagem de slides no Hub.

## Autoria e preparação

[INSTRUTOR.md](INSTRUTOR.md) descreve geração dos materiais, preview, preparação das imagens e publicação manual. [ROTEIRO.md](ROTEIRO.md) registra o percurso pedagógico. [DESIGN.md](DESIGN.md) descreve a interface. [TESTES.md](TESTES.md) registra a validação.

Para gerar os materiais e uma pasta estática local, sem publicar:

```bash
python3 ferramentas/preparar_materiais.py --site-dir .runtime/site
```

A ferramenta de autoria não faz parte dos comandos da aula. Ela copia somente os arquivos públicos permitidos para a pasta de site. O workflow de Pages é disparado manualmente no GitHub Actions; não há publicação automática em push.
