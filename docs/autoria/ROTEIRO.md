# Oficina Docker — percurso pedagógico

Oficina de 180 minutos para ensino médio, ensino superior e participantes da comunidade. O foco é Docker; os exemplos de programação servem para tornar observáveis seus efeitos.

## Resultado esperado

A pessoa distingue imagem de container, explica onde os arquivos estão, executa ferramentas sem instalá-las no host, constrói uma imagem e compartilha uma aplicação por imagens e Compose.

O site está no GitHub Pages. Não há `sudo docker pull` para começar a ler slides, clone de repositório ou script de instalação apresentado à turma. Comandos ficam em diálogo próprio; a tela principal apresenta conceitos, explicações curtas e desenhos didáticos. Notas do instrutor pertencem a este roteiro e aos guias de consulta.

## Preparação

Docker Engine e Compose devem funcionar antes da oficina. O laboratório tem Linux, provavelmente Mint. A IDE é VS Code desktop em container, conectado à sessão gráfica local por X11/XWayland ou Wayland. O instrutor confere a integração no laboratório e prepara as imagens em joaolsodocker.

O arquivo `main.go` deve ser baixado para HOME/oficina-docker/go-soma antes da primeira experiência gráfica. Ele contém apenas uma soma. Não pedir Go instalado, configuração de módulos ou entendimento de backend. O template Vue/Vite é o original, com dependências declaradas e lockfile, executado com Node em container.

## Percurso de referência

| Minutos | Bloco | O que observar |
| --- | --- | --- |
| 00–15 | Fundamentos e história | Problema de distribuição; imagem, container, kernel e processo |
| 15–40 | Containers e arquivos | Tag, Hub, pull, run, exec, parada, remoção e camada gravável |
| 40–65 | Go simples e IDE desktop | Mesmo programa em imagem pronta; arquivo do host invisível sem mount e acessível com HOME |
| 65–85 | Vue/Vite | Ferramentas no container; desenvolvimento com Node versus arquivos estáticos servidos pelo Nginx |
| 85–130 | Imagens e Dockerfile | Contexto, COPY, WORKDIR, RUN, CMD/ENTRYPOINT, cache e multi-stage com Go e Vue |
| 130–165 | Compose e mural | Três serviços, nomes, portas, rede, prontidão e volume de banco |
| 165–180 | Docker Hub e compartilhamento | Tag, push, pull e execução da imagem de outra pessoa |

O tempo é uma referência de condução. Aprofundamentos e catálogo completo de opções ficam disponíveis para consulta; não é necessário percorrer cada flag em voz alta.

## 1. Fundamentos e containers

Começar pela necessidade de distribuir programas e seu ambiente. Docker foi desenvolvido em Go; um container usa o kernel do host Linux. Em sistemas que precisam de uma VM Linux, o funcionamento inclui essa camada.

Antes da primeira aplicação pronta, apresentar nesta ordem: Docker Hub como origem, repositório e tag, `sudo docker pull` como download para o Docker local e só então `sudo docker run` como criação e execução do container. O slide dedicado ao pull separa baixar de executar; não depender apenas do comando escondido no diálogo.

Usar Alpine para observar arquivos e processos. Separar comando principal de um shell aberto com `exec`. Mostrar que `stop` não remove arquivos, mas `rm` descarta a camada gravável. Relacionar `ps`, `ps -a`, logs e inspect a perguntas concretas. Apresentar os dois pontos de uma referência de imagem como separador da tag e mostrar a procedência no Hub.

## 2. Uma soma, uma IDE, os mesmos arquivos

Executar a imagem pronta do Go: imprime e termina. O container parado é esperado, porque o processo acabou. Baixar o mesmo `main.go` para o computador e abrir a IDE sem HOME. Pedir para encontrar o arquivo e discutir por que ele não está ali.

Recriar a IDE com HOME em `/host-home`. Agora o mesmo arquivo aparece. Editar um número ou mensagem e observar a alteração real no host. Executar o fonte usando o compilador Go em um container temporário. Não antecipar o Dockerfile longo da IDE; sua leitura vem no bloco de imagens.

Sockets gráficos e autorização já são compartilhados na primeira experiência. A distinção é ausência de acesso à pasta pessoal, não ausência absoluta de mounts.

## 3. Vue sem transformar a oficina em aula de frontend

Extrair `vue-vite.zip`. Iniciar Node em container, instalar dependências e executar `npm run dev -- --host 0.0.0.0`. O servidor Vite usa porta interna 5173; a publicação do exercício é 5174 no host.

Mudar um texto no template para ver a atualização. Depois executar a imagem Vue pronta do instrutor, com Nginx. São as mesmas fontes iniciais e a mesma tela. O contraste é ferramenta de desenvolvimento versus artefato construído.

## 4. Construir a própria imagem

Usar primeiro o Go sem dependências, para separar os conceitos. O último argumento de `sudo docker build` escolhe o contexto no host. O `-f` escolhe a receita. `WORKDIR` escolhe o diretório no estágio. `COPY` usa a origem no contexto; o destino relativo segue o WORKDIR. O ponto de `go build .` seleciona o pacote atual.

Evoluir para multi-stage: cada `FROM` inicia um estágio com a base escolhida; `COPY --from=build` lê o resultado do estágio de construção. Sem a flag, lê o contexto. O último estágio é a imagem final por padrão; `--target` permite selecionar outro. Uma imagem `scratch` tem filesystem mesmo sem shell.

Repetir a mesma ideia com Vue: Node produz `dist`; Nginx recebe só os arquivos estáticos. O frontend JavaScript executa no navegador. `EXPOSE` documenta uma porta; não publica. Mostrar cache com uma alteração pequena. Ler o Dockerfile da IDE como aprofundamento, sem exigir sua construção pela turma.

## 5. Compose como descrição de um conjunto

Só agora introduzir Compose. O mural vem pronto: web → API → PostgreSQL. Os participantes recebem os YAMLs, não precisam implementar a aplicação. O formulário torna visível a comunicação e a persistência.

Diferenciar nomes de projeto, serviço, imagem, container e rede. Observar `config`, `up`, `ps`, `logs`, `exec`, `stop`, `start` e `down`. Explicar `${VAR:-padrao}`, DNS por nome de serviço, loopback e publicação de portas. Persistir recados com volume nomeado. O overlay de rede aprofunda a separação entre entrada e dados.

A tradução da IDE para Compose é uma comparação opcional com o `sudo docker run` já conhecido, usando ZIP próprio. A referência pesquisável atende curiosidade sobre outras opções.

## 6. Publicar e trocar

Marcar a própria imagem Go ou Vue com o namespace pessoal, publicar e pedir que outra pessoa execute. Explicar que push envia a imagem pronta: não envia o volume do banco ou arquivos do host. A primeira execução do colega não exige código-fonte nem compilador instalado.

## Perguntas para fechar cada experiência

- Qual processo está executando e por que ele continua ou termina?
- De onde vieram os arquivos e onde uma alteração foi gravada?
- Qual recurso é removido ao apagar o container?
- Quem precisa resolver o nome ou acessar a porta?
- O que outra máquina precisa receber para repetir a execução?

Fontes técnicas e comandos detalhados ficam nos guias. Preparação e publicação pertencem a [INSTRUTOR.md](INSTRUTOR.md).
