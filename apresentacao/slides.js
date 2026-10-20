window.OFICINA_SLIDES = [
  {
    "id": "inicio",
    "chapter": "Fundamentos",
    "title": "Docker, na prática",
    "lead": "Empacote. Execute. Compartilhe.",
    "type": "hero",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "A proposta é explorar processos e arquivos, abrir uma IDE desktop dentro de um container e entregar uma aplicação para outra pessoa executar. O laboratório provavelmente usa Linux Mint. Docker Engine e Compose devem estar funcionando. Editor, SDK e banco ficam nas imagens. O site serve os slides; a IDE da demonstração é desktop."
  },
  {
    "id": "percurso",
    "chapter": "Fundamentos",
    "title": "O percurso da oficina",
    "lead": "Três horas para construir um modelo mental e uma aplicação.",
    "type": "agenda",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "Os tempos incluem os exercícios. O código inicial é fornecido para concentrar a oficina no Docker. As notas e os guias aprofundam os temas. Comandos abre a referência pesquisável, inclusive uma captura da ajuda do Compose. Não é preciso memorizar todas as flags."
  },
  {
    "id": "problema",
    "chapter": "Fundamentos",
    "title": "O problema do ambiente",
    "lead": "O mesmo código encontra dependências e configurações diferentes.",
    "type": "concept",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "bullets": [
      "Runtime e bibliotecas variam entre máquinas.",
      "A imagem empacota a aplicação e suas dependências de espaço de usuário.",
      "Configuração, arquitetura e dados externos ainda precisam de atenção."
    ],
    "notes": "Use um exemplo de biblioteca ou versão de runtime ausente no servidor. Imagem não torna configurações e sistemas universais: o kernel e a arquitetura importam. O objetivo é distribuir arquivos e configuração de execução de forma consistente."
  },
  {
    "id": "historia",
    "chapter": "Fundamentos",
    "title": "De onde veio o Docker",
    "lead": "Apresentado em 2013 por Solomon Hykes, a partir do trabalho na dotCloud.",
    "type": "timeline",
    "source": "https://www.docker.com/blog/open-container-project-foundation/",
    "bullets": [
      "Isolamento de processos já existia.",
      "Docker reuniu build, distribuição e execução em um fluxo acessível.",
      "O Engine e ferramentas centrais são escritos em Go."
    ],
    "notes": "Não apresentar Docker como inventor dos containers. Sobre a escolha de Go: compilação, concorrência e produtividade são características técnicas da linguagem; não atribuir uma motivação histórica específica aos autores sem fonte que a documente."
  },
  {
    "id": "vm-container",
    "chapter": "Fundamentos",
    "title": "Container e máquina virtual",
    "lead": "O processo do container usa o kernel Linux do host.",
    "type": "compare",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "columns": [
      [
        "Máquina virtual",
        "Aplicação e bibliotecas",
        "Sistema operacional convidado",
        "Kernel próprio e hipervisor"
      ],
      [
        "Container Linux",
        "Aplicação e bibliotecas",
        "Processos isolados",
        "Kernel compartilhado com o host"
      ]
    ],
    "notes": "Uma imagem Debian não inicia um kernel separado. Namespaces isolam visões e cgroups contabilizam e limitam recursos. Os limites de CPU e RAM precisam ser configurados. Em Docker Desktop pode haver uma VM Linux por baixo; a oficina usa Linux diretamente."
  },
  {
    "id": "arquitetura",
    "chapter": "Fundamentos",
    "title": "Do comando ao processo",
    "lead": "A CLI solicita; o Engine administra; o runtime executa.",
    "type": "architecture",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "nodes": [
      "docker CLI",
      "dockerd / API",
      "containerd",
      "runtime / processos"
    ],
    "notes": "Desenho simplificado da configuração usual. O daemon administra imagens, containers, volumes e redes. containerd coordena o ciclo de vida; runc é um runtime padrão comum. O registry armazena e distribui imagens, não é o processo da aplicação."
  },
  {
    "id": "vocabulario",
    "chapter": "Fundamentos",
    "title": "Imagem, container e registry",
    "lead": "Três objetos com funções diferentes.",
    "type": "terms",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "terms": [
      [
        "Imagem",
        "Arquivos imutáveis e configuração para iniciar um processo."
      ],
      [
        "Container",
        "Instância com processo, estado e camada gravável próprios."
      ],
      [
        "Registry",
        "Serviço que armazena e distribui imagens, como Docker Hub."
      ]
    ],
    "notes": "Uma imagem pode originar muitos containers. Um container parado continua existindo. Tags são referências mutáveis; digest identifica conteúdo. docker pull baixa imagens, não um container já criado."
  },
  {
    "id": "primeiro-container",
    "chapter": "Containers",
    "title": "O primeiro container",
    "lead": "Criar, iniciar e observar.",
    "type": "code",
    "source": "https://docs.docker.com/engine/containers/run/",
    "code": "docker pull alpine:3.22\ndocker run -d --name fs-lab alpine:3.22 sleep infinity\ndocker ps\ndocker ps -a",
    "notes": "No terminal do host: run cria e inicia; -d desacopla; --name escolhe o nome. sleep mantém o processo principal. Omitir --rm permite observar o container parado. Nomes não podem ser reutilizados enquanto o container anterior existir.",
    "guide": "01-containers"
  },
  {
    "id": "ler-ps",
    "chapter": "Containers",
    "title": "Como ler docker ps",
    "lead": "A saída mostra o que existe e o que está rodando.",
    "type": "table",
    "source": "https://docs.docker.com/engine/containers/run/",
    "headers": [
      "Coluna",
      "O que observar"
    ],
    "rows": [
      [
        "ID / NAMES",
        "Identificador e nome da instância"
      ],
      [
        "IMAGE / COMMAND",
        "Referência da imagem e comando principal"
      ],
      [
        "STATUS",
        "Em execução, parado e possível saúde"
      ],
      [
        "PORTS",
        "Portas documentadas e publicações no host"
      ]
    ],
    "notes": "ps -a inclui parados. Uma saída apenas como 80/tcp não indica publicação. A referência da imagem não prova procedência: tags podem mudar. inspect mostra configuração, ID da imagem e mounts."
  },
  {
    "id": "exec",
    "chapter": "Containers",
    "title": "Um shell dentro do container",
    "lead": "exec inicia outro processo em um container em execução.",
    "type": "code",
    "source": "https://docs.docker.com/engine/containers/run/",
    "code": "docker exec -it fs-lab sh\npwd\nls -la /\nprintf \"meu primeiro arquivo\\n\" > /tmp/recado.txt\nexit",
    "notes": "Primeira linha no host; demais no container até exit. -i mantém stdin; -t cria pseudo-TTY. Alpine tem sh, não Bash por padrão. Sair deste shell não encerra sleep. Imagens mínimas podem não ter shell."
  },
  {
    "id": "ciclo-arquivos",
    "chapter": "Containers",
    "title": "O que acontece com o arquivo?",
    "lead": "Experimente o ciclo de vida antes de executar de verdade.",
    "type": "filesystem",
    "source": "https://docs.docker.com/engine/containers/run/",
    "notes": "Peça uma previsão antes de clicar. stop/start preserva a camada do mesmo container; remover elimina essa camada. A imagem permanece igual. A simulação não executa Docker nem acessa arquivos reais."
  },
  {
    "id": "provar-persistencia",
    "chapter": "Containers",
    "title": "Pare, inicie, remova, recrie",
    "lead": "O arquivo sobrevive à parada do mesmo container.",
    "type": "code",
    "source": "https://docs.docker.com/engine/containers/run/",
    "code": "docker stop fs-lab\ndocker start fs-lab\ndocker exec fs-lab cat /tmp/recado.txt\ndocker rm -f fs-lab\ndocker run -d --name fs-lab alpine:3.22 sleep infinity\ndocker exec fs-lab cat /tmp/recado.txt",
    "notes": "A última linha deve falhar com arquivo inexistente: é o resultado esperado. -f força a parada antes da remoção. restart preserva a camada. Os destinos montados seguem outro ciclo. Use somente o container descartável do exercício.",
    "guide": "01-containers"
  },
  {
    "id": "inspecionar",
    "chapter": "Containers",
    "title": "Observe antes de adivinhar",
    "lead": "Estado, configuração, logs e consumo respondem perguntas diferentes.",
    "type": "code",
    "source": "https://docs.docker.com/engine/containers/run/",
    "code": "docker inspect fs-lab\ndocker logs --tail 50 fs-lab\ndocker top fs-lab\ndocker stats --no-stream fs-lab\ndocker diff fs-lab",
    "notes": "logs mostra stdout/stderr capturados, não todos os arquivos de log. sleep não produz saída. top mostra processos; stats mostra consumo; diff mostra alterações na camada. Procure State, Config.Image e Mounts no inspect."
  },
  {
    "id": "desktop",
    "chapter": "IDE desktop",
    "title": "Uma IDE desktop no container",
    "lead": "A aplicação roda no container. A janela aparece no Linux.",
    "type": "desktop",
    "source": "https://www.x.org/guide/communication/",
    "notes": "Abrir VS Code desktop sem editor web ou VNC no navegador. O container se conecta ao sistema gráfico do host. Montar sockets gráficos é diferente de montar a pasta do projeto. O Linux Mint é o alvo provável; X11/XWayland é o caminho principal, com alternativa Wayland nativo."
  },
  {
    "id": "abrir-ide",
    "chapter": "IDE desktop",
    "title": "Abra a IDE pelo terminal",
    "lead": "A imagem inclui o editor; o host fornece o sistema gráfico.",
    "type": "code",
    "source": "https://www.x.org/guide/communication/",
    "code": "echo \"$XDG_SESSION_TYPE\"\n./scripts/ide.sh preparar\n./scripts/ide.sh abrir",
    "notes": "preparar constrói a imagem com UID/GID do usuário e prepara autorização gráfica. Não usa xhost +, --privileged ou socket Docker. abrir executa abrir-ide no container. A imagem didática desativa a sandbox do Electron para compatibilidade local; isso não é requisito geral do Docker. Ajustes de display são feitos no laboratório.",
    "guide": "02-ide-desktop"
  },
  {
    "id": "processo-ide",
    "chapter": "IDE desktop",
    "title": "A janela é só a interface",
    "lead": "Fechar a IDE e remover o container são ações diferentes.",
    "type": "code",
    "source": "https://www.x.org/guide/communication/",
    "code": "./scripts/ide.sh estado\n# A IDE foi iniciada por exec.\n# sleep infinity continua como processo principal.\n# Crie /workspace/recado.txt no editor.\n# Feche a janela e confira novamente:\n./scripts/ide.sh estado",
    "notes": "Se a IDE fosse o processo principal, seu término poderia encerrar o container. Aqui sleep permanece. Reabrir a IDE mostra o arquivo. Parar/iniciar preserva; remover/recriar elimina a camada. Ainda não há pasta de projeto do host montada."
  },
  {
    "id": "introducao-compose",
    "chapter": "Armazenamento",
    "title": "A execução, descrita em arquivo",
    "lead": "Compose organiza serviços, redes e armazenamento.",
    "type": "compose",
    "source": "https://docs.docker.com/engine/storage/",
    "notes": "Selecione campos do exemplo para explorar. image, build e volumes são atributos YAML; não são flags. Serviço e container não são sinônimos: um serviço pode ter réplicas. version superior está obsoleta. O Compose completo está na raiz do pacote."
  },
  {
    "id": "compose-comandos",
    "chapter": "Armazenamento",
    "title": "O ciclo de vida com Compose",
    "lead": "Execute na raiz do pacote.",
    "type": "code",
    "source": "https://docs.docker.com/engine/storage/",
    "code": "docker compose config\ndocker compose up -d --build\ndocker compose ps\ndocker compose logs -f --tail 50\ndocker compose stop\ndocker compose down",
    "notes": "O compose.yaml da raiz serve estes slides em localhost:8080. config mostra o modelo resolvido. Ctrl+C em logs encerra apenas o acompanhamento. stop preserva containers; down os remove junto às redes do projeto. restart não aplica mudanças de configuração como up.",
    "guide": "03-compose-armazenamento"
  },
  {
    "id": "tres-armazenamentos",
    "chapter": "Armazenamento",
    "title": "Onde o arquivo mora?",
    "lead": "O destino da escrita determina o ciclo de vida dos dados.",
    "type": "table",
    "source": "https://docs.docker.com/engine/storage/",
    "headers": [
      "Opção",
      "Uso aqui",
      "Após remover o container"
    ],
    "rows": [
      [
        "Camada gravável",
        "Primeiro arquivo da IDE",
        "Arquivo dessa camada desaparece"
      ],
      [
        "Bind mount",
        "Código no host",
        "Arquivo permanece na pasta"
      ],
      [
        "Volume nomeado",
        "Dados do PostgreSQL",
        "Dados permanecem no volume"
      ]
    ],
    "notes": "Volume é administrado pelo Docker; bind aponta para caminho escolhido no host. VOLUME herdado pode criar volume anônimo sem -v. Mount oculta conteúdo anterior; volume vazio recebe cópia inicial por padrão, bind não faz essa cópia. Permissões UID/GID continuam valendo."
  },
  {
    "id": "ide-bind",
    "chapter": "Armazenamento",
    "title": "Agora a IDE vê o projeto",
    "lead": "O mesmo editor, conectado à pasta do host.",
    "type": "code",
    "source": "https://docs.docker.com/engine/storage/",
    "code": "./scripts/ide.sh com-projeto\n# Abra api/main.go pelo editor.\n# No terminal do host:\nls exemplos/mural/api\n# exemplos/mural → /workspace",
    "notes": "com-projeto recria o container com bind mount. Arquivos anteriores na camada são descartados na recriação: use só conteúdo de experimento. A integração gráfica é mantida. Não é preciso montar a pasta pessoal inteira. Os comandos Docker continuam no terminal do host.",
    "guide": "03-compose-armazenamento"
  },
  {
    "id": "volume-real",
    "chapter": "Armazenamento",
    "title": "Um volume, dois containers",
    "lead": "Remover a instância não remove o volume nomeado.",
    "type": "code",
    "source": "https://docs.docker.com/engine/storage/",
    "code": "docker volume create dados-lab\ndocker run --rm --mount type=volume,src=dados-lab,dst=/dados \\\n  alpine:3.22 sh -c 'echo \"persisti\" > /dados/recado.txt'\ndocker run --rm --mount type=volume,src=dados-lab,dst=/dados \\\n  alpine:3.22 cat /dados/recado.txt",
    "notes": "--rm limpa o container que termina, mas preserva o volume nomeado. Para anônimos associados a run --rm, o comportamento é diferente: são removidos. A experiência prepara a persistência do banco. Não recomendar edição direta no armazenamento interno do Docker."
  },
  {
    "id": "intervalo",
    "chapter": "Armazenamento",
    "title": "Pausa para respirar",
    "lead": "10 minutos para café, dúvidas e colocar a turma no mesmo ponto.",
    "type": "break",
    "source": "https://docs.docker.com/engine/storage/",
    "notes": "Confira: imagem não é container; parar não é remover; bind mount não é volume nomeado. Na volta, o projeto inicial do mural deve estar disponível."
  },
  {
    "id": "imagem-camadas",
    "chapter": "Imagens",
    "title": "Uma imagem em camadas",
    "lead": "Arquivos imutáveis, configuração e uma camada gravável por container.",
    "type": "layers",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "notes": "Clique para explorar. RUN/COPY frequentemente mudam o filesystem; CMD, EXPOSE e ENV podem alterar apenas metadados. Não afirmar uma camada de arquivos por linha. Storage drivers e snapshotters variam; overlay2 não é universal."
  },
  {
    "id": "contexto-build",
    "chapter": "Imagens",
    "title": "O contexto do build",
    "lead": "O último argumento define quais arquivos o builder pode acessar.",
    "type": "code",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "code": "docker build -t oficina/api-simples:1.0.0 \\\n  -f exemplos/mural/api/Dockerfile.simples \\\n  exemplos/mural/api\n# COPY usa caminhos relativos ao contexto.",
    "notes": "-f escolhe a receita, o último argumento escolhe o contexto. .dockerignore pertence ao contexto. A primeira imagem retém compilador; a versão final usa multi-stage. Nunca copiar .env e credenciais pessoais para a imagem.",
    "guide": "04-imagens-dockerfile"
  },
  {
    "id": "dockerfile-basico",
    "chapter": "Imagens",
    "title": "Build e execução",
    "lead": "RUN constrói. CMD configura o comando padrão.",
    "type": "code",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "code": "FROM golang:1.27.3-alpine\nWORKDIR /src\nCOPY go.mod go.sum ./\nRUN go mod download\nCOPY . .\nRUN CGO_ENABLED=0 go build -o /api .\nEXPOSE 8080\nCMD [\"/api\"]",
    "notes": "Percorra cada linha. FROM base; WORKDIR diretório; COPY conteúdo; RUN durante build; EXPOSE documenta, não publica. A forma JSON executa sem shell intermediário. Uma imagem pode existir sem container em execução."
  },
  {
    "id": "cmd-entrypoint",
    "chapter": "Imagens",
    "title": "CMD e ENTRYPOINT",
    "lead": "Executável e argumentos podem ter papéis diferentes.",
    "type": "compare",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "columns": [
      [
        "CMD [\"/api\"]",
        "run IMAGEM inicia /api",
        "run IMAGEM sh substitui o comando"
      ],
      [
        "ENTRYPOINT [\"/api\"]",
        "run IMAGEM inicia /api",
        "run IMAGEM -healthcheck passa argumento"
      ]
    ],
    "notes": "CMD também oferece argumentos padrão ao ENTRYPOINT. --entrypoint substitui o executável. A imagem final usa /api -healthcheck na verificação de prontidão. docker exec é outro processo em um container existente; não confundir com run."
  },
  {
    "id": "multi-stage",
    "chapter": "Imagens",
    "title": "O compilador fica no build",
    "lead": "A imagem final recebe o artefato necessário para executar.",
    "type": "code",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "code": "FROM golang:1.27.3-alpine AS build\n# ... compilar para /out/api ...\nFROM alpine:3.22\nRUN apk add --no-cache ca-certificates\nCOPY --from=build /out/api /api\nUSER 65532:65532\nENTRYPOINT [\"/api\"]",
    "notes": "Recorte do Dockerfile completo. CGO_ENABLED=0 serve para esta aplicação e driver; nem todo programa Go funciona em scratch sem preparação. Bibliotecas C, certificados e arquivos de dados podem ser necessários. USER usa um UID sem privilégios administrativos.",
    "guide": "04-imagens-dockerfile"
  },
  {
    "id": "cache",
    "chapter": "Imagens",
    "title": "Cache de build",
    "lead": "Separe dependências do código que muda com frequência.",
    "type": "cache",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "notes": "A simulação mostra que editar código preserva download de módulos; alterar go.mod invalida essa etapa e dependentes. O BuildKit real usa um grafo mais completo. Cache mounts reutilizam módulos e compilação. --no-cache e --pull têm efeitos diferentes."
  },
  {
    "id": "construir-api",
    "chapter": "Imagens",
    "title": "Construa sua imagem",
    "lead": "A mesma receita serve para você e para a turma.",
    "type": "code",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "code": "docker build -t oficina/api:1.0.0 exemplos/mural/api\ndocker image ls\ndocker image history oficina/api:1.0.0\ndocker image inspect oficina/api:1.0.0\n./scripts/testar-api.sh",
    "notes": "A API precisa de banco para inicializar; executar com a stack no próximo bloco. history não é inventário completo dos arquivos. inspect revela configuração e usuário. Os testes rodam Go em uma imagem de ferramentas, sem SDK no host."
  },
  {
    "id": "dockerfile-referencia",
    "chapter": "Imagens",
    "title": "As demais instruções",
    "lead": "Use a referência para escolher a ferramenta certa.",
    "type": "terms",
    "source": "https://docs.docker.com/reference/dockerfile/",
    "terms": [
      [
        "ARG / ENV",
        "Parâmetro de build / ambiente na imagem."
      ],
      [
        "ADD / COPY",
        "Fontes especiais e extração / cópia explícita."
      ],
      [
        "HEALTHCHECK / STOPSIGNAL",
        "Saúde / sinal de parada."
      ],
      [
        "VOLUME / ONBUILD / SHELL / LABEL",
        "Volume declarado / gatilhos / shell / metadados."
      ]
    ],
    "notes": "O guia cobre todas as instruções, inclusive MAINTAINER obsoleta. ARG não transporta segredo com segurança. VOLUME não escolhe pasta do host. ONBUILD atua no build descendente. Opções e diretivas do parser são explicadas no guia.",
    "guide": "07-referencia"
  },
  {
    "id": "mural",
    "chapter": "Aplicação",
    "title": "Nosso mural de recados",
    "lead": "Uma aplicação pequena, três responsabilidades.",
    "type": "architecture",
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "nodes": [
      "Navegador",
      "web / Nginx",
      "api / Go",
      "db / PostgreSQL"
    ],
    "notes": "Frontend estático; Nginx serve arquivos e encaminha /api. Go valida e grava no banco. Só a entrada web é publicada. O banco usa volume nomeado. É um mural didático local, sem autenticação de participantes. O navegador é cliente desta aplicação, não da IDE."
  },
  {
    "id": "subir-stack",
    "chapter": "Aplicação",
    "title": "Suba a aplicação inteira",
    "lead": "Compose acompanha os serviços e suas dependências.",
    "type": "code",
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "code": "docker compose -f compose.app.yaml config\ndocker compose -f compose.app.yaml up -d --build --wait\ndocker compose -f compose.app.yaml ps\n# Abra http://localhost:8088\ndocker compose -f compose.app.yaml logs -f api",
    "notes": "--wait aguarda running/healthy conforme cada serviço e implica modo desacoplado. O banco usa pg_isready; a API inicializa o schema e testa /readyz. O primeiro build depende de downloads, por isso há um script para pré-carregar.",
    "guide": "05-aplicacao-rede"
  },
  {
    "id": "rede",
    "chapter": "Aplicação",
    "title": "Quem está chamando quem?",
    "lead": "localhost pertence ao ambiente do processo que faz a conexão.",
    "type": "network",
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "notes": "API → db:5432 usa o DNS Compose. API → localhost:5432 procura o banco dentro da própria API. Navegador não resolve api:8080. localhost:8088 entra pela porta publicada do frontend. Esta atividade é uma simulação, não um teste da rede real."
  },
  {
    "id": "portas",
    "chapter": "Aplicação",
    "title": "Porta do host e do container",
    "lead": "127.0.0.1:8088:8080 publica a entrada web nesta máquina.",
    "type": "compare",
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "columns": [
      [
        "Na rede Compose",
        "api → db:5432",
        "web → api:8080",
        "Descoberta por nome de serviço"
      ],
      [
        "No computador do aluno",
        "navegador → localhost:8088",
        "Nginx encaminha /api",
        "Publicação permite a entrada"
      ]
    ],
    "notes": "EXPOSE não substitui -p ou ports. 127.0.0.1 limita a entrada publicada à própria máquina. Não usar IP fixo do container: muda ao recriar. O proxy consulta DNS interno para redescobrir a API. Se publicar API em outra origem diretamente, considerar CORS."
  },
  {
    "id": "readiness",
    "chapter": "Aplicação",
    "title": "Iniciado não significa pronto",
    "lead": "O processo do banco pode estar ativo antes de aceitar conexões.",
    "type": "code",
    "source": "https://docs.docker.com/compose/how-tos/startup-order/",
    "code": "depends_on:\n  db:\n    condition: service_healthy\n\n# No serviço db:\nhealthcheck:\n  test: [\"CMD-SHELL\", \"pg_isready -U oficina -d oficina\"]",
    "notes": "O recorte usa credenciais didáticas fixas por legibilidade; compose.app.yaml usa as variáveis reais. depends_on curto ordena o início, não a prontidão. pg_isready não valida as tabelas. A API cria o schema e trata falhas posteriores. HEALTHCHECK sozinho não reinicia o container."
  },
  {
    "id": "banco-persistencia",
    "chapter": "Aplicação",
    "title": "O recado sobrevive à recriação",
    "lead": "O volume do banco continua existindo.",
    "type": "lab",
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "steps": [
      "Publique um recado.",
      "Execute down sem -v e depois up.",
      "Atualize a página e confira o mesmo recado."
    ],
    "code": "docker compose -f compose.app.yaml down\ndocker compose -f compose.app.yaml up -d --wait\n# down -v removeria o volume do exercício.",
    "notes": "down preserva o volume nomeado. Dados não estão na imagem do banco nem da API. PostgreSQL 17 usa o caminho montado neste projeto; revisar armazenamento e atualização antes de trocar a versão major."
  },
  {
    "id": "banco-falha",
    "chapter": "Aplicação",
    "title": "Derrube uma dependência",
    "lead": "Use uma falha real para ler o estado da aplicação.",
    "type": "code",
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "code": "docker compose -f compose.app.yaml stop db\n# Tente publicar no mural e leia a mensagem.\ndocker compose -f compose.app.yaml logs --tail 30 api\ndocker compose -f compose.app.yaml start db\n# Atualize e tente novamente.",
    "notes": "A API continua viva, mas prontidão falha. Os handlers retornam 503. Quando o banco volta, o pool deve voltar a atender: confirme na interface. Falha no healthcheck não significa reinício automático. Reconexão faz parte da aplicação."
  },
  {
    "id": "hub",
    "chapter": "Compartilhamento",
    "title": "Compartilhe a imagem",
    "lead": "Build cria. Push envia ao registry. Pull recupera.",
    "type": "code",
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "code": "docker login\ndocker tag oficina/api:1.0.0 SEUUSUARIO/oficina-api:1.0.0\ndocker push SEUUSUARIO/oficina-api:1.0.0",
    "notes": "Substituir SEUUSUARIO pelo namespace real e preparar o repositório. Não compartilhar credenciais pessoais. Nenhum script publica automaticamente. latest é tag convencional e mutável, não uma seleção automática da versão mais nova.",
    "guide": "06-docker-hub"
  },
  {
    "id": "colega",
    "chapter": "Compartilhamento",
    "title": "Execute a imagem do colega",
    "lead": "A referência da imagem e a configuração formam o contrato.",
    "type": "code",
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "code": "export API_IMAGE=COLEGA/oficina-api:1.0.0\ndocker compose -f compose.app.yaml -f compose.hub.yaml pull api\ndocker compose -f compose.app.yaml -f compose.hub.yaml \\\n  up -d --no-build --wait",
    "notes": "O frontend local deve ter sido construído no bloco anterior. O overlay muda a referência e pull_policy. --no-build evita compilar a API local por engano. Cada pessoa mantém seu próprio banco. Dados do volume não viajam no push. Em arquiteturas diferentes, uma imagem multi-plataforma pode ser necessária."
  },
  {
    "id": "conteudo-push",
    "chapter": "Compartilhamento",
    "title": "O que foi enviado ao Hub?",
    "lead": "A imagem é um recurso específico do ambiente.",
    "type": "compare",
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "columns": [
      [
        "Na imagem da API",
        "Binário Go",
        "Arquivos copiados no build",
        "Configuração de inicialização"
      ],
      [
        "Recursos separados",
        "Volume do PostgreSQL",
        "Compose e variáveis locais",
        "Imagens de web e banco"
      ]
    ],
    "notes": "Escritas de um container em execução não entram automaticamente na imagem construída. Uma imagem também pode incluir fonte se COPY a colocar lá. Não transportar credenciais na imagem. Use tags explícitas e, para identificar conteúdo com precisão, digests."
  },
  {
    "id": "quiz",
    "chapter": "Fechamento",
    "title": "Antes de fechar o terminal",
    "lead": "Teste o modelo mental. O resultado fica neste navegador.",
    "type": "quiz",
    "source": "https://docs.docker.com/reference/cli/docker/compose/",
    "notes": "Peça que a turma explique as respostas. Há feedback imediato e a possibilidade de refazer. O progresso é guardado localmente; não é enviado a um servidor."
  },
  {
    "id": "desafio",
    "chapter": "Fechamento",
    "title": "Um problema por dupla",
    "lead": "Encontre a causa e explique como chegou nela.",
    "type": "lab",
    "source": "https://docs.docker.com/reference/cli/docker/compose/",
    "steps": [
      "Troque DB_HOST por localhost, ou use uma porta não publicada.",
      "Leia estado, modelo resolvido e logs.",
      "Corrija e confirme pela interface."
    ],
    "code": "docker compose -f compose.app.yaml ps -a\ndocker compose -f compose.app.yaml config\ndocker compose -f compose.app.yaml logs --tail 50 api",
    "notes": "Use uma falha por dupla. DB_HOST só se aplica quando a API é recriada. O guia traz comandos de introdução e recuperação, para evitar deixar a turma com um ambiente quebrado.",
    "guide": "08-desafios"
  },
  {
    "id": "consulta",
    "chapter": "Fechamento",
    "title": "Continue com o material",
    "lead": "Slides, guias e código ficam com você.",
    "type": "resources",
    "source": "https://docs.docker.com/reference/cli/docker/compose/",
    "notes": "O pacote completo está no botão Baixar. Fontes e scripts são locais. Documentação oficial exige internet. Para todas as flags da versão instalada, exporte a ajuda com scripts/exportar-referencia-compose.sh. Os guias indicam onde executar, o resultado esperado e como recuperar o ambiente."
  },
  {
    "id": "fim",
    "chapter": "Fechamento",
    "title": "Você construiu e compartilhou",
    "lead": "Explique onde o processo roda, onde os dados ficam e como outra pessoa executa.",
    "type": "closing",
    "source": "https://docs.docker.com/reference/cli/docker/compose/",
    "bullets": [
      "Processos: o que a imagem inicia?",
      "Dados: o que sobrevive à remoção?",
      "Rede: quem está chamando quem?",
      "Distribuição: qual é o contrato para executar?"
    ],
    "notes": "Docker não exige uma interface web. O mural usa navegador pela arquitetura escolhida; a IDE foi desktop. Próximos aprofundamentos: limites de recursos, sinais, build multi-plataforma, secrets, backup e entrega automatizada."
  }
];
