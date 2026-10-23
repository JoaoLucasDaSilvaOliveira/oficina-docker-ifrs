// Dados em JSON: compartilhados com o gerador dos exercícios.
// prettier-ignore
window.OFICINA_SLIDES = [
  {
    "id": "inicio",
    "chapter": "Fundamentos",
    "title": "Docker: do processo à imagem",
    "lead": "Entender o ambiente. Construir uma imagem. Executar em outra máquina.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Imagem",
          "detail": "Arquivos e configuração"
        },
        {
          "title": "Container",
          "detail": "Um processo em execução"
        },
        {
          "title": "Compartilhamento",
          "detail": "O mesmo artefato em outra máquina"
        }
      ]
    },
    "type": "hero",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "A apresentação fica no GitHub Pages. A turma entra pelo link, sem iniciar um container dos slides. Os exercícios exigem Docker com Compose, Bash e navegador; compiladores e Node serão usados em containers."
  },
  {
    "id": "problema",
    "chapter": "Fundamentos",
    "title": "Por que empacotar o ambiente?",
    "lead": "O código depende de mais coisas do que os arquivos do projeto.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Só o código",
        "lines": [
          "Runtime ou compilador",
          "Bibliotecas do sistema",
          "Configuração de execução"
        ]
      },
      "right": {
        "title": "Uma imagem",
        "lines": [
          "Aplicação e dependências",
          "Arquivos de espaço de usuário",
          "Instruções para iniciar"
        ]
      }
    },
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "A imagem não empacota o kernel Linux do host nem torna todas as arquiteturas compatíveis. Configuração, dados persistentes e recursos externos continuam separados."
  },
  {
    "id": "historia",
    "chapter": "Fundamentos",
    "title": "O que o Docker reuniu",
    "lead": "Isolamento já existia. Construir, distribuir e executar ganhou um fluxo comum.",
    "visual": {
      "kind": "timeline",
      "events": [
        {
          "year": "Antes de 2013",
          "title": "Processos e isolamento no Linux"
        },
        {
          "year": "2013",
          "title": "Docker é apresentado publicamente"
        },
        {
          "year": "2015",
          "title": "OCI: formatos e runtime abertos"
        },
        {
          "year": "Hoje",
          "title": "Um ecossistema de imagens e ferramentas"
        }
      ]
    },
    "source": "https://www.docker.com/blog/docker-10-years/",
    "notes": "Docker surgiu do trabalho da dotCloud, apresentado por Solomon Hykes. O Engine e componentes centrais são escritos em Go. Não atribuir uma razão histórica específica para a escolha de Go sem fonte; linguagem compilada, concorrência e ferramentas são características, não prova da motivação dos autores."
  },
  {
    "id": "vm-container",
    "chapter": "Fundamentos",
    "title": "Um container não inicia outro kernel",
    "lead": "Em Linux, os processos isolados compartilham o kernel do computador.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Máquina virtual",
        "lines": [
          "Aplicação e bibliotecas",
          "Sistema convidado com kernel próprio",
          "Hipervisor sobre o host"
        ]
      },
      "right": {
        "title": "Container Linux",
        "lines": [
          "Aplicação e bibliotecas",
          "Processos isolados",
          "Kernel Linux do host"
        ]
      }
    },
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "Namespaces isolam visões; cgroups contabilizam e limitam recursos. Docker Desktop em Windows/macOS usa um ambiente Linux por baixo. A oficina utiliza Linux nativo. Imagem Alpine ou Debian não inicia um kernel próprio."
  },
  {
    "id": "arquitetura",
    "chapter": "Fundamentos",
    "title": "Do terminal ao processo",
    "lead": "O comando solicita uma operação; o Docker administra sua execução.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "CLI",
          "detail": "docker run"
        },
        {
          "title": "Engine",
          "detail": "Imagens, redes e containers"
        },
        {
          "title": "Runtime",
          "detail": "Criação do ambiente isolado"
        },
        {
          "title": "Processo",
          "detail": "Sua aplicação em execução"
        }
      ]
    },
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "Modelo simplificado: a CLI conversa com a API do daemon. containerd e um runtime OCI participam da execução. O Docker pode apontar para um daemon remoto; os exemplos usam o daemon do próprio laboratório."
  },
  {
    "id": "vocabulario",
    "chapter": "Fundamentos",
    "title": "Três coisas que não são a mesma coisa",
    "lead": "A imagem é distribuída; o container é criado a partir dela.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Registry",
          "detail": "Armazena imagens"
        },
        {
          "title": "Imagem",
          "detail": "Arquivos e configuração de execução"
        },
        {
          "title": "Container",
          "detail": "Processo e estado próprios"
        }
      ]
    },
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "Uma imagem pode criar vários containers. Um container parado ainda existe. Registry é o serviço; Docker Hub é um registry. Repositório agrupa referências de uma imagem; uma tag aponta para conteúdo e pode mudar."
  },
  {
    "id": "origem-imagens",
    "chapter": "Imagens e containers",
    "title": "De onde vêm as imagens?",
    "lead": "O Docker Hub distribui imagens prontas para baixar.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Autor",
          "detail": "Constrói a imagem"
        },
        {
          "title": "Docker Hub",
          "detail": "Publica um repositório"
        },
        {
          "title": "Seu computador",
          "detail": "Baixa com pull"
        },
        {
          "title": "Container",
          "detail": "Inicia com run"
        }
      ]
    },
    "commands": [
      {
        "label": "Pesquisar no Docker Hub",
        "text": "sudo docker search alpine",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/docker-hub/",
    "notes": "Abrir hub.docker.com no navegador e comparar Alpine, golang e joaolsodocker/oficina-go. Imagens oficiais usam o namespace library, omitido na referência curta. docker search não substitui verificar a página, as tags e a procedência."
  },
  {
    "id": "nome-imagem",
    "chapter": "Imagens e containers",
    "title": "Leia o nome de uma imagem",
    "lead": "Os dois-pontos separam a referência do repositório da tag.",
    "visual": {
      "kind": "image-name",
      "value": "joaolsodocker/oficina-go:1.0.0"
    },
    "source": "https://docs.docker.com/reference/cli/docker/image/tag/",
    "notes": "docker.io é o registry padrão. joaolsodocker é o namespace; oficina-go é o repositório; 1.0.0 é a tag. Tags são nomes mutáveis, não uma garantia de imutabilidade. Sem tag, o padrão é latest, que não significa versão mais nova. Na imagem golang:1.27.3-alpine, a tag identifica uma variante com Go e arquivos Alpine na mesma imagem."
  },
  {
    "id": "baixar-imagem",
    "chapter": "Imagens e containers",
    "title": "Baixar uma imagem não inicia um container",
    "lead": "docker pull baixa a imagem do registry para o Docker local. A execução vem depois, com docker run.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Docker Hub",
          "detail": "Distribui alpine:3.22"
        },
        {
          "title": "docker pull",
          "detail": "Baixa a imagem e suas camadas"
        },
        {
          "title": "Imagem local",
          "detail": "Disponível para criar containers"
        }
      ]
    },
    "commands": [
      {
        "label": "Baixar e conferir a imagem local",
        "text": "sudo docker pull alpine:3.22\nsudo docker image ls",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/reference/cli/docker/image/pull/",
    "notes": "Abrir o Docker Hub antes de baixar. pull transfere a imagem, não inicia processo de aplicação. image ls lista imagens locais. No próximo slide, a mesma sequência é aplicada à imagem do programa de soma, seguida de run. run também pode baixar uma imagem ausente, mas aqui separamos os passos para ensinar."
  },
  {
    "id": "primeiro-go",
    "chapter": "Imagens e containers",
    "title": "Uma aplicação pronta, sem instalar Go",
    "lead": "Baixamos a imagem e executamos o programa que já veio nela.",
    "visual": {
      "kind": "output",
      "label": "Saída do programa Go",
      "lines": [
        "Olá, turma! 2 + 3 = 5"
      ]
    },
    "commands": [
      {
        "label": "Baixar e executar a imagem da soma",
        "text": "sudo docker pull joaolsodocker/oficina-go:1.0.0\nsudo docker run --name soma joaolsodocker/oficina-go:1.0.0\nsudo docker ps -a\nsudo docker logs soma",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/containers/run/",
    "notes": "A imagem de apoio deve ser publicada pelo instrutor antes da oficina e conter o mesmo main.go fornecido adiante. O processo imprime e termina: o container aparece em ps -a, não em ps. Não usar --rm neste primeiro exemplo para mostrar o estado parado. docker run baixa automaticamente a imagem se necessário, mas pull separado deixa o download explícito."
  },
  {
    "id": "primeiro-container",
    "chapter": "Imagens e containers",
    "title": "Um container que continua rodando",
    "lead": "O container permanece ativo enquanto seu processo principal está ativo.",
    "visual": {
      "kind": "cycle",
      "nodes": [
        {
          "title": "Criar",
          "detail": "run cria a instância"
        },
        {
          "title": "Executar",
          "detail": "sleep permanece ativo"
        },
        {
          "title": "Observar",
          "detail": "ps mostra o container"
        }
      ]
    },
    "commands": [
      {
        "label": "Criar o laboratório de filesystem",
        "text": "sudo docker run -d --name fs-lab alpine:3.22 sleep infinity\nsudo docker ps\nsudo docker ps -a",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/containers/run/",
    "guide": "01-containers",
    "notes": "Alpine é uma distribuição Linux pequena. Aqui ela fornece sleep, sh, ls, cat e outros utilitários. -d libera o terminal, não é o que mantém o container vivo: o processo sleep mantém a execução. Não há servidor web nem porta publicada."
  },
  {
    "id": "ler-ps",
    "chapter": "Imagens e containers",
    "title": "Imagem, processo e container na mesma linha",
    "lead": "docker ps descreve os containers ativos, não todas as imagens baixadas.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Imagem",
        "lines": [
          "alpine:3.22",
          "Base usada para criar",
          "Uma imagem pode ser reutilizada"
        ]
      },
      "right": {
        "title": "Container",
        "lines": [
          "fs-lab",
          "Processo: sleep infinity",
          "ID e estado próprios"
        ]
      }
    },
    "commands": [
      {
        "label": "Comparar imagens e containers",
        "text": "sudo docker image ls\nsudo docker ps\nsudo docker ps -a\nsudo docker inspect fs-lab",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/containers/run/",
    "notes": "Apontar ID, IMAGE, COMMAND, STATUS, PORTS e NAMES em uma saída real. PORTS vazia não impede uso do filesystem. Imagens ficam em image ls. ps -a inclui containers que terminaram. inspect mistura configuração escolhida, valores herdados e estado gerado pelo Docker."
  },
  {
    "id": "processo-principal",
    "chapter": "Imagens e containers",
    "title": "Executar de novo ou criar outro?",
    "lead": "start reutiliza o container; run cria uma nova instância.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "docker start soma",
        "lines": [
          "Mesmo container",
          "Mesma camada gravável",
          "Executa o comando registrado"
        ]
      },
      "right": {
        "title": "docker run IMAGEM",
        "lines": [
          "Novo container",
          "Nova camada gravável",
          "Novo nome e configuração"
        ]
      }
    },
    "commands": [
      {
        "label": "Reexecutar e comparar",
        "text": "sudo docker start -a soma\nsudo docker run --rm joaolsodocker/oficina-go:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/containers/run/",
    "notes": "Um programa que termina não é um container quebrado. O ciclo acompanha o processo principal. -a em start anexa a saída. --rm remove a nova instância ao terminar, sem apagar a imagem. Os comandos ilustram duas operações, não são intercambiáveis."
  },
  {
    "id": "imagem-camadas",
    "chapter": "Filesystem",
    "title": "Uma imagem, dois espaços de escrita",
    "lead": "Alterar um container não altera a imagem nem o outro container.",
    "visual": {
      "kind": "layers"
    },
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/understanding-image-layers/",
    "notes": "A base é compartilhada, somente leitura; cada container possui uma camada gravável. No desenho, recado.txt em A não aparece em B. A visão combinada forma o filesystem do container. O armazenamento existe no host, mas editar diretórios internos do Docker diretamente não é um fluxo suportado. Não incluir volumes neste desenho."
  },
  {
    "id": "exec",
    "chapter": "Filesystem",
    "title": "Entre no ambiente do processo",
    "lead": "exec inicia um novo processo em um container que já está rodando.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Seu terminal",
          "detail": "docker exec"
        },
        {
          "title": "fs-lab",
          "detail": "Um shell sh adicional"
        },
        {
          "title": "Filesystem",
          "detail": "Pastas e arquivos desse container"
        }
      ]
    },
    "commands": [
      {
        "label": "Abrir um shell no Alpine",
        "text": "sudo docker exec -it fs-lab sh",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Explorar e criar um arquivo",
        "text": "pwd\nls -la /\nprintf \"meu primeiro arquivo\\n\" > /tmp/recado.txt\ncat /tmp/recado.txt\nexit",
        "context": "Dentro do shell do container"
      },
      {
        "label": "Executar cat diretamente",
        "text": "sudo docker exec fs-lab cat /tmp/recado.txt",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/containers/run/",
    "notes": "-i mantém stdin; -t fornece pseudo-TTY. sh é o programa a executar, não uma flag obrigatória de exec. cat pode ser executado diretamente se existir na imagem. Alpine normalmente não inclui Bash. exit aqui encerra o shell criado por exec, mas sleep continua. Na forma run -it alpine sh, sair do shell principal encerra a execução do container. Imagens scratch têm filesystem, mesmo sem shell e utilitários."
  },
  {
    "id": "provar-persistencia",
    "chapter": "Filesystem",
    "title": "Parar não apaga os arquivos",
    "lead": "A camada gravável dura enquanto aquele container existir.",
    "visual": {
      "kind": "cycle",
      "nodes": [
        {
          "title": "Criar arquivo",
          "detail": "recado.txt no fs-lab"
        },
        {
          "title": "stop → start",
          "detail": "O arquivo continua"
        },
        {
          "title": "Remover",
          "detail": "A camada é descartada"
        },
        {
          "title": "Novo run",
          "detail": "Outro container, sem recado"
        }
      ]
    },
    "commands": [
      {
        "label": "Parar, reabrir e conferir",
        "text": "sudo docker stop fs-lab\nsudo docker start fs-lab\nsudo docker exec fs-lab cat /tmp/recado.txt",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Remover e criar outra instância",
        "text": "sudo docker rm -f fs-lab\nsudo docker run -d --name fs-lab alpine:3.22 sleep infinity\nsudo docker exec fs-lab cat /tmp/recado.txt",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/storage/",
    "notes": "A última leitura falha porque o arquivo estava na camada da instância removida. A imagem não foi alterada. rm -f é usado apenas no laboratório descartável. Se a camada contém um arquivo importante, copie antes da remoção. docker ps -a mostra os containers parados."
  },
  {
    "id": "tres-armazenamentos",
    "chapter": "Filesystem",
    "title": "O arquivo pertence a qual armazenamento?",
    "lead": "Escrever dentro do container não significa sempre escrever na mesma camada.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Camada do container",
        "lines": [
          "Faz parte daquela instância",
          "stop/start preserva",
          "Remover a instância descarta"
        ]
      },
      "right": {
        "title": "Armazenamento montado",
        "lines": [
          "Bind: pasta escolhida no host",
          "Volume: administrado pelo Docker",
          "Pode sobreviver à remoção"
        ]
      }
    },
    "source": "https://docs.docker.com/engine/storage/",
    "notes": "tmpfs é outra opção, em memória. Bind mount e volume são reais, não mocks. Montar um destino pode ocultar os arquivos que já existiam lá na imagem. Volumes vazios têm comportamento de inicialização diferente do bind. As permissões dos arquivos continuam valendo."
  },
  {
    "id": "volume-real",
    "chapter": "Filesystem",
    "title": "Um volume, duas instâncias",
    "lead": "O segundo container consegue ler o arquivo escrito pelo primeiro.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Container A",
          "detail": "Escreve recado.txt"
        },
        {
          "title": "dados-lab",
          "detail": "Volume administrado pelo Docker"
        },
        {
          "title": "Container B",
          "detail": "Lê o mesmo arquivo"
        }
      ]
    },
    "commands": [
      {
        "label": "Criar, escrever e ler um volume",
        "text": "sudo docker volume create dados-lab\nsudo docker run --rm --mount type=volume,src=dados-lab,dst=/dados \\\n  alpine:3.22 sh -c 'echo \"persisti\" > /dados/recado.txt'\nsudo docker run --rm --mount type=volume,src=dados-lab,dst=/dados \\\n  alpine:3.22 cat /dados/recado.txt\nsudo docker volume inspect dados-lab",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/storage/",
    "notes": "Os dois containers usam src=dados-lab, mesmo nome de volume. --rm remove as instâncias concluídas, não este volume nomeado. A escrita usa shell porque há redirecionamento; a leitura executa cat diretamente. Não apagar o volume até terminar o exercício."
  },
  {
    "id": "inspecionar",
    "chapter": "Filesystem",
    "title": "Faça perguntas ao estado real",
    "lead": "Cada ferramenta observa uma parte diferente do container.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "inspect",
          "detail": "Configuração e estado"
        },
        {
          "title": "logs",
          "detail": "Saída da aplicação"
        },
        {
          "title": "top / stats",
          "detail": "Processos e consumo"
        },
        {
          "title": "diff",
          "detail": "Mudanças na camada"
        }
      ]
    },
    "commands": [
      {
        "label": "Inspecionar o laboratório",
        "text": "sudo docker inspect fs-lab\nsudo docker logs --tail 50 fs-lab\nsudo docker top fs-lab\nsudo docker stats --no-stream fs-lab\nsudo docker diff fs-lab",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/containers/run/",
    "notes": "Sleep não gera logs, portanto logs pode ficar vazio. Config, HostConfig e NetworkSettings têm valores personalizados, herdados e preenchidos pelo Docker; State e IDs são observações geradas. diff não é uma listagem de todo arquivo e mounts têm seu próprio armazenamento. Não ensinar prune geral durante a oficina."
  },
  {
    "id": "desktop",
    "chapter": "IDE desktop",
    "title": "O mesmo programa, agora como arquivo",
    "lead": "Baixe main.go e guarde em $HOME/oficina-docker/go-soma.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "No computador",
        "lines": [
          "oficina-docker/go-soma/main.go",
          "Um programa com uma soma",
          "Arquivo para abrir e editar"
        ]
      },
      "right": {
        "title": "Na imagem pronta",
        "lines": [
          "O mesmo programa compilado",
          "Já executado com docker run",
          "Nenhum Go instalado no host"
        ]
      }
    },
    "downloads": [
      "go-source"
    ],
    "source": "https://docs.docker.com/engine/storage/bind-mounts/",
    "notes": "O botão baixa um único main.go, não um projeto grande nem ZIP. O aluno cria a pasta oficina-docker/go-soma em sua HOME pelo gerenciador de arquivos e move o arquivo para lá. Não há instalação de Go nem Git. Primeiro vamos tentar abrir esse arquivo em uma IDE cujo container não tem a pasta montada."
  },
  {
    "id": "abrir-ide",
    "chapter": "IDE desktop",
    "title": "Uma janela desktop executada no container",
    "lead": "O VS Code usa a sessão gráfica do Linux; não é uma IDE no navegador.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Container ide",
          "detail": "Processo do VS Code"
        },
        {
          "title": "Sessão gráfica",
          "detail": "Socket e autorização X11"
        },
        {
          "title": "Tela do computador",
          "detail": "Janela nativa da IDE"
        }
      ]
    },
    "commands": [
      {
        "label": "Baixar a imagem do editor",
        "text": "sudo docker pull joaolsodocker/oficina-ide:1.0.0",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Abrir sem montar a pasta pessoal",
        "text": "sudo docker run -d --name ide \\\n  --user \"$(id -u):$(id -g)\" \\\n  --hostname \"$(hostname)\" \\\n  -e DISPLAY -e XAUTHORITY=/tmp/oficina.xauth \\\n  --mount type=bind,src=/tmp/.X11-unix,dst=/tmp/.X11-unix,readonly \\\n  --mount \"type=bind,src=${XAUTHORITY:-$HOME/.Xauthority},dst=/tmp/oficina.xauth,readonly\" \\\n  --tmpfs \"/tmp/runtime-aluno:uid=$(id -u),gid=$(id -g),mode=0700\" \\\n  --shm-size=256m \\\n  joaolsodocker/oficina-ide:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://www.x.org/guide/communication/",
    "guide": "02-ide-desktop",
    "notes": "Comando Bash executado no terminal da sessão gráfica do aluno. --user usa UID/GID reais. tmpfs prepara XDG_RUNTIME_DIR com o dono correto. HOME interno é /tmp; WORKDIR inicial /workspace. Os únicos binds são para a sessão gráfica, não para o arquivo Go. Pré-validar X11/XWayland e XAUTHORITY no laboratório Linux Mint; guia inclui alternativa Wayland. Não usar xhost + ou montar todo o host."
  },
  {
    "id": "processo-ide",
    "chapter": "IDE desktop",
    "title": "Por que main.go não aparece?",
    "lead": "A IDE enxerga o filesystem do container, não toda a pasta pessoal do host.",
    "visual": {
      "kind": "filesystem",
      "host": [
        "$HOME/oficina-docker/",
        "└── go-soma/",
        "    └── main.go"
      ],
      "container": [
        "/workspace/",
        "└── arquivos internos",
        "Sem acesso ao main.go baixado"
      ],
      "mounted": false
    },
    "commands": [
      {
        "label": "Conferir a instância do editor",
        "text": "sudo docker ps\nsudo docker top ide\nsudo docker inspect ide\nsudo docker ps -a\nsudo docker start ide",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/storage/",
    "notes": "Pedir para procurar o main.go baixado pelo diálogo Abrir arquivo da IDE. A pasta do host não foi montada. Criar recado.txt em /workspace, fechar a janela e iniciar o mesmo container mostra que sua camada é preservada. code --wait mantém o ciclo ligado à janela. A ordem dos comandos de observação depende de quando a janela for fechada; não copiar start enquanto já estiver ativo."
  },
  {
    "id": "ide-bind",
    "chapter": "IDE desktop",
    "title": "Agora os dois caminhos apontam para os mesmos arquivos",
    "lead": "Um bind mount faz sua pasta pessoal aparecer em /host-home.",
    "visual": {
      "kind": "filesystem",
      "host": [
        "$HOME/oficina-docker/",
        "└── go-soma/",
        "    └── main.go"
      ],
      "container": [
        "/host-home/oficina-docker/",
        "└── go-soma/",
        "    └── main.go"
      ],
      "mounted": true
    },
    "commands": [
      {
        "label": "Recriar a IDE com acesso à HOME",
        "text": "sudo docker rm -f ide\nsudo docker run -d --name ide \\\n  --user \"$(id -u):$(id -g)\" \\\n  --hostname \"$(hostname)\" \\\n  -e DISPLAY -e XAUTHORITY=/tmp/oficina.xauth \\\n  --mount type=bind,src=/tmp/.X11-unix,dst=/tmp/.X11-unix,readonly \\\n  --mount \"type=bind,src=${XAUTHORITY:-$HOME/.Xauthority},dst=/tmp/oficina.xauth,readonly\" \\\n  --tmpfs \"/tmp/runtime-aluno:uid=$(id -u),gid=$(id -g),mode=0700\" \\\n  --mount \"type=bind,src=$HOME,dst=/host-home\" \\\n  --workdir /host-home \\\n  --shm-size=256m \\\n  joaolsodocker/oficina-ide:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/storage/bind-mounts/",
    "guide": "02-ide-desktop",
    "notes": "src=$HOME é expandido pelo shell do host; dst=/host-home é o nome escolhido dentro do container. São os mesmos arquivos, sem cópia; a escrita altera o arquivo real e respeita UID/GID. --workdir /host-home faz o CMD code ... ponto abrir essa pasta. HOME dentro da imagem continua /tmp. rm -f descarta a camada da IDE anterior: salvar arquivos internos relevantes antes. A turma ainda não usa Compose."
  },
  {
    "id": "editar-go",
    "chapter": "IDE desktop",
    "title": "Edite uma soma, execute de novo",
    "lead": "Mude os números em main.go; o compilador também pode rodar em um container.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "IDE",
          "detail": "Edita o arquivo do host"
        },
        {
          "title": "Bind mount",
          "detail": "O código aparece em /src"
        },
        {
          "title": "Container Go",
          "detail": "go run main.go"
        },
        {
          "title": "Terminal",
          "detail": "Mostra o novo resultado"
        }
      ]
    },
    "commands": [
      {
        "label": "Executar o código editado com Go no Docker",
        "text": "sudo docker run --rm \\\n  --user \"$(id -u):$(id -g)\" \\\n  --mount \"type=bind,src=$HOME/oficina-docker/go-soma,dst=/src,readonly\" \\\n  -w /src -e GOCACHE=/tmp/go-cache \\\n  golang:1.27.3-alpine go run main.go",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://hub.docker.com/_/golang",
    "notes": "Abrir /host-home/oficina-docker/go-soma/main.go no editor. Não instalar Go na IDE nem no host. Este container de ferramentas monta a fonte somente leitura e usa GOCACHE em /tmp; ele compila e executa temporariamente. A imagem publicada oficina-go permanece com o resultado original até um novo build. O objetivo é observar código, ambiente e imagem, não ensinar Go."
  },
  {
    "id": "vue-projeto",
    "chapter": "Frontend",
    "title": "Outro projeto, o mesmo problema de ambiente",
    "lead": "Uma tela inicial do Vue com Vite. O conteúdo da aplicação fica simples.",
    "visual": {
      "kind": "output",
      "label": "Vue + Vite",
      "lines": [
        "Tela inicial do template",
        "Código fonte disponível para editar"
      ]
    },
    "downloads": [
      "vue"
    ],
    "source": "https://vite.dev/guide/",
    "notes": "Extrair o ZIP em HOME/oficina-docker; o pacote contém a pasta vue-vite. O código deve preservar a tela inicial do template Vue/Vite, sem CRUD nem uma aplicação para aprender. Não rodar npm no host: o próximo passo executa as ferramentas em node:24-alpine."
  },
  {
    "id": "vue-dev",
    "chapter": "Frontend",
    "title": "Desenvolvimento: fonte montada, servidor ativo",
    "lead": "O Vite roda no container e atende o navegador pela porta publicada.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Host",
          "detail": "Fonte em vue-vite"
        },
        {
          "title": "Container Node",
          "detail": "npm run dev · :5173"
        },
        {
          "title": "Navegador",
          "detail": "localhost:5174"
        }
      ]
    },
    "commands": [
      {
        "label": "Executar o Vite sem Node instalado no computador",
        "text": "sudo docker run --rm -it --name vue-dev \\\n  -p 127.0.0.1:5174:5173 \\\n  --mount \"type=bind,src=$HOME/oficina-docker/vue-vite,dst=/app\" \\\n  --mount type=volume,dst=/app/node_modules \\\n  -w /app \\\n  node:24-alpine sh -c 'npm ci && npm run dev -- --host 0.0.0.0'",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://vite.dev/config/server-options.html",
    "notes": "Abrir http://localhost:5174. Editar um texto da tela e observar atualização. A porta padrão interna do Vite é 5173; 5174 é nossa porta escolhida no host. --host 0.0.0.0 permite chegar ao servidor pela rede do container, sem publicar em todas as interfaces do host. O volume anônimo guarda node_modules fora da pasta do host e é descartado com --rm; Ctrl+C encerra o dev e libera a porta. A imagem Node pode incluir ferramentas Linux mesmo quando usamos só npm."
  },
  {
    "id": "vue-imagem",
    "chapter": "Frontend",
    "title": "A mesma tela, sem instalar as dependências na execução",
    "lead": "Uma imagem pronta contém os arquivos já gerados e o servidor Nginx.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Durante o desenvolvimento",
        "lines": [
          "Código fonte montado",
          "Vite executando",
          "Mudanças recompiladas na hora"
        ]
      },
      "right": {
        "title": "Imagem de distribuição",
        "lines": [
          "HTML, JavaScript e CSS gerados",
          "Nginx executando",
          "Nova versão exige novo build"
        ]
      }
    },
    "commands": [
      {
        "label": "Executar a imagem pronta do frontend",
        "text": "sudo docker pull joaolsodocker/oficina-vue:1.0.0\nsudo docker run -d --name vue-web \\\n  -p 127.0.0.1:5174:80 \\\n  joaolsodocker/oficina-vue:1.0.0\nsudo docker logs --tail 20 vue-web",
        "context": "Encerre vue-dev com Ctrl+C no terminal anterior para liberar a porta 5174. Depois, execute no terminal do computador."
      }
    ],
    "source": "https://vite.dev/guide/static-deploy.html",
    "notes": "Encerrar vue-dev com Ctrl+C antes para liberar 5174. Abrir a mesma URL. A versão publicada usa o template original, por isso as edições locais não aparecem. Não há npm install ou npm run build na inicialização desta imagem. JavaScript do frontend executa no navegador; Nginx entrega arquivos estáticos."
  },
  {
    "id": "vue-portas",
    "chapter": "Frontend",
    "title": "A porta da aplicação e a porta de entrada",
    "lead": "Publicar uma porta cria um caminho até o processo no container.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Navegador",
          "detail": "localhost:5174"
        },
        {
          "title": "Publicação Docker",
          "detail": "127.0.0.1:5174 → :80"
        },
        {
          "title": "Nginx",
          "detail": "Escuta :80 no container"
        }
      ]
    },
    "commands": [
      {
        "label": "Observar a publicação de portas",
        "text": "sudo docker ps\nsudo docker port vue-web\nsudo docker exec vue-web nginx -v",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/engine/network/port-publishing/",
    "notes": "Em -p HOST:CONTAINER, o lado esquerdo escolhe a porta externa; o direito deve corresponder ao servidor real. EXPOSE documenta a intenção, não publica. O Nginx oficial mantém seu script de ENTRYPOINT; mudar CMD é diferente de substituir o entrypoint herdado. Não prometer porta universal padrão para Vue: Vite dev e Nginx são servidores distintos."
  },
  {
    "id": "dockerfile-basico",
    "chapter": "Construção de imagens",
    "title": "Da receita ao programa pronto",
    "lead": "O Dockerfile descreve o build; a imagem guarda o resultado.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Dockerfile + fonte",
          "detail": "Receita e main.go"
        },
        {
          "title": "docker build",
          "detail": "Executa a compilação"
        },
        {
          "title": "Imagem",
          "detail": "Contém o binário /soma"
        },
        {
          "title": "docker run",
          "detail": "Executa o binário"
        }
      ]
    },
    "commands": [
      {
        "label": "Receita Go em um estágio",
        "text": "FROM golang:1.27.3-alpine\nWORKDIR /src\nCOPY main.go ./\nRUN CGO_ENABLED=0 go build -o /soma main.go\nCMD [\"/soma\"]",
        "context": "Dockerfile.simples · leitura na IDE"
      }
    ],
    "downloads": [
      "go-project"
    ],
    "source": "https://docs.docker.com/reference/dockerfile/",
    "guide": "04-imagens-dockerfile",
    "notes": "Baixar o pacote do projeto Go: os Dockerfiles devem ser colocados junto do main.go já editado, sem sobrescrevê-lo. Esta aplicação não usa módulos externos: go build main.go basta. O exemplo simples mantém compilador e fonte na imagem final. Não há EXPOSE porque imprimir uma soma não usa servidor nem porta. RUN atua no build; CMD registra a execução futura."
  },
  {
    "id": "contexto-build",
    "chapter": "Construção de imagens",
    "title": "Receita e contexto são escolhas diferentes",
    "lead": "O último caminho do comando escolhe quais arquivos o build pode copiar.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "No computador",
        "lines": [
          "-f escolhe o Dockerfile",
          "Contexto: pasta go-soma",
          "Contém main.go e as receitas"
        ]
      },
      "right": {
        "title": "Dentro da imagem",
        "lines": [
          "WORKDIR /src",
          "COPY traz os arquivos",
          "RUN trabalha nesse filesystem"
        ]
      }
    },
    "commands": [
      {
        "label": "Construir usando caminhos completos",
        "text": "sudo docker build -t minha-soma-simples:1.0.0 \\\n  -f \"$HOME/oficina-docker/go-soma/Dockerfile.simples\" \\\n  \"$HOME/oficina-docker/go-soma\"",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "A mesma escolha, usando a pasta atual",
        "text": "cd \"$HOME/oficina-docker/go-soma\"\nsudo docker build -t minha-soma-simples:1.0.0 -f Dockerfile.simples .",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/build/building/context/",
    "notes": "O último ponto é o diretório atual do terminal no host. Sem -t, um argumento como minha-imagem é interpretado como caminho de contexto, não nome da imagem. O contexto não muda o WORKDIR. O Dockerfile pode ficar em outra pasta; a fonte do COPY continua relativa ao contexto."
  },
  {
    "id": "copy-workdir",
    "chapter": "Construção de imagens",
    "title": "Cada ponto tem um lugar de referência",
    "lead": "A origem vem do contexto. O destino relativo usa o WORKDIR.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Origem: contexto no host",
        "lines": [
          "main.go",
          "package.json e package-lock.json",
          "Ponto: conteúdo do contexto"
        ]
      },
      "right": {
        "title": "Destino: filesystem do estágio",
        "lines": [
          "WORKDIR /src → ./ significa /src/",
          "Destino /api → caminho absoluto",
          "Ponto: diretório de trabalho"
        ]
      }
    },
    "commands": [
      {
        "label": "Ler origem e destino",
        "text": "WORKDIR /src\nCOPY main.go ./\n# Origem: main.go no contexto. Destino: /src/main.go\n\nCOPY . .\n# Conteúdo do contexto → /src/, respeitando .dockerignore\n\nCOPY package.json package-lock.json /app/\n# Duas origens; o último argumento é o destino.",
        "context": "Trechos ilustrativos · não executar no terminal"
      }
    ],
    "source": "https://docs.docker.com/reference/dockerfile/",
    "notes": "COPY aceita uma ou várias origens e o último argumento é o destino. Com múltiplas origens, destino deve ser diretório terminado em barra. COPY diretório copia seu conteúdo. WORKDIR é herdado da base ou assume / se ausente; / não é /root. A cópia ocorre no build e não acompanha mudanças futuras do host. COPY não é um mount."
  },
  {
    "id": "run-compilacao",
    "chapter": "Construção de imagens",
    "title": "Onde o binário é criado?",
    "lead": "O compilador lê a fonte no estágio e grava o executável no caminho de saída.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Estágio Go",
          "detail": "/src/main.go"
        },
        {
          "title": "RUN go build",
          "detail": "Executado durante o build"
        },
        {
          "title": "Artefato",
          "detail": "/out/soma, um arquivo binário"
        }
      ]
    },
    "commands": [
      {
        "label": "Compilar um arquivo Go",
        "text": "WORKDIR /src\nCOPY main.go ./\nRUN CGO_ENABLED=0 go build -o /out/soma main.go",
        "context": "Trecho do Dockerfile"
      },
      {
        "label": "Quando o projeto contém um módulo Go",
        "text": "RUN CGO_ENABLED=0 go build -o /out/api .",
        "context": "Exemplo para projeto com go.mod"
      }
    ],
    "source": "https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies",
    "notes": "-o escolhe o arquivo de saída. main.go seleciona o arquivo da aplicação simples. No projeto com go.mod, o ponto em go build seleciona o pacote da pasta atual dentro do estágio, /src. Esse ponto não escolhe o contexto do Docker e não é um destino. CGO_ENABLED=0 desabilita cgo nesta compilação; o programa simples não precisa de bibliotecas C. Um binário ainda depende de plataforma/arquitetura e pode precisar de dados adicionais."
  },
  {
    "id": "cmd-entrypoint",
    "chapter": "Construção de imagens",
    "title": "Comando padrão ou executável principal?",
    "lead": "Na forma JSON, ENTRYPOINT e CMD podem ser combinados.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Somente CMD",
        "lines": [
          "CMD [\"/soma\"]",
          "run IMAGEM → /soma",
          "run IMAGEM sh → sh"
        ]
      },
      "right": {
        "title": "ENTRYPOINT + CMD",
        "lines": [
          "ENTRYPOINT [\"/minha-cli\"]",
          "CMD [\"ajuda\"]",
          "run IMAGEM listar → /minha-cli listar"
        ]
      }
    },
    "commands": [
      {
        "label": "Executar o comando padrão",
        "text": "sudo docker run --rm minha-soma-simples:1.0.0",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Substituir o CMD por um shell",
        "text": "sudo docker run --rm -it minha-soma-simples:1.0.0 sh",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Combinar executável e argumentos",
        "text": "ENTRYPOINT [\"/minha-cli\"]\nCMD [\"ajuda\"]",
        "context": "Exemplo de Dockerfile para uma CLI"
      }
    ],
    "source": "https://docs.docker.com/reference/dockerfile/",
    "notes": "O comando depois da imagem substitui CMD; com ENTRYPOINT em forma exec, vira argumento desse executável. ENTRYPOINT aceita vários elementos. --entrypoint permite substituir também o executável. Não executar sh na imagem scratch: ela não contém shell. No Nginx, manter CMD preserva o entrypoint de preparação herdado. docker exec cria outro processo no container ativo, não aplica novamente CMD."
  },
  {
    "id": "multi-stage",
    "chapter": "Construção de imagens",
    "title": "Construir exige mais do que executar",
    "lead": "Um novo FROM inicia outro estágio, baseado em outro filesystem.",
    "visual": {
      "kind": "stages",
      "left": {
        "title": "build · Go + Alpine",
        "lines": [
          "Fonte copiada em /src",
          "Compilador gera /out/soma",
          "Ferramentas ficam neste estágio"
        ]
      },
      "right": {
        "title": "Final · scratch",
        "lines": [
          "Começa sem arquivos da distribuição",
          "Recebe o binário /soma",
          "Inicia somente o programa"
        ]
      },
      "artifact": "/out/soma → /soma"
    },
    "commands": [
      {
        "label": "Receita Go em dois estágios",
        "text": "FROM golang:1.27.3-alpine AS build\nWORKDIR /src\nCOPY main.go ./\nRUN CGO_ENABLED=0 go build -o /out/soma main.go\n\nFROM scratch\nCOPY --from=build /out/soma /soma\nUSER 65532:65532\nENTRYPOINT [\"/soma\"]",
        "context": "Dockerfile · leitura na IDE"
      }
    ],
    "source": "https://docs.docker.com/build/building/multi-stage/",
    "notes": "AS build nomeia o estágio completo, inclusive COPY e RUN seguintes; não é apenas um apelido da base original. O segundo FROM não apaga o primeiro: as próximas instruções passam a atuar em outro estágio. Por padrão a imagem final resulta do último estágio. Scratch ainda tem filesystem, aqui com /soma, mas não fornece sh/ls. Cada base pode definir um WORKDIR próprio; o segundo FROM não herda automaticamente o /src do primeiro."
  },
  {
    "id": "copy-from",
    "chapter": "Construção de imagens",
    "title": "De qual filesystem o arquivo vem?",
    "lead": "--from=build troca a origem: busca no estágio anterior, não no computador.",
    "visual": {
      "kind": "stages",
      "left": {
        "title": "Origem · estágio build",
        "lines": [
          "/src/main.go",
          "/out/soma, criado pelo RUN",
          "O estágio completo continua disponível"
        ]
      },
      "right": {
        "title": "Destino · estágio final",
        "lines": [
          "COPY seleciona só /out/soma",
          "O binário aparece em /soma",
          "A origem não é copiada inteira"
        ]
      },
      "artifact": "COPY --from=build /out/soma /soma"
    },
    "commands": [
      {
        "label": "Comparar as duas origens",
        "text": "COPY --from=build /out/soma /soma\n# Busca /out/soma no estágio build.\n\nCOPY out/soma /soma\n# Busca out/soma no contexto enviado do host.",
        "context": "Trechos alternativos de Dockerfile"
      },
      {
        "label": "Construir só o estágio de compilação para explorar",
        "text": "sudo docker build --target build -t minha-soma-build \\\n  \"$HOME/oficina-docker/go-soma\"\nsudo docker run --rm -it --entrypoint sh minha-soma-build",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/reference/dockerfile/",
    "notes": "O destino /soma é absoluto, portanto não vira /src/soma. COPY --from sempre resolve a origem a partir da raiz do estágio de origem; COPY --from=build . /destino/ selecionaria seu filesystem inteiro, não o WORKDIR /src. Evitar esse uso: ele levaria também as ferramentas. --target gera outra imagem explorável. exec só acessa o container escolhido, não alterna entre estágios."
  },
  {
    "id": "frontend-build",
    "chapter": "Construção de imagens",
    "title": "No frontend, o artefato é a pasta dist",
    "lead": "Node faz o build. Nginx recebe HTML, JavaScript, CSS e arquivos estáticos.",
    "visual": {
      "kind": "stages",
      "left": {
        "title": "build · Node",
        "lines": [
          "npm ci instala dependências",
          "npm run build gera /app/dist",
          "Fonte e node_modules ficam aqui"
        ]
      },
      "right": {
        "title": "Final · Nginx",
        "lines": [
          "Arquivos em /usr/share/nginx/html",
          "Servidor escuta na porta 80",
          "Navegador executa o JavaScript"
        ]
      },
      "artifact": "/app/dist/ → /usr/share/nginx/html/"
    },
    "commands": [
      {
        "label": "Dockerfile do Vue com Vite",
        "text": "FROM node:24-alpine AS build\nWORKDIR /app\nCOPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\nFROM nginx:stable-alpine\nCOPY nginx.conf /etc/nginx/conf.d/default.conf\nCOPY --from=build /app/dist/ /usr/share/nginx/html/\nEXPOSE 80\nCMD [\"nginx\", \"-g\", \"daemon off;\"]",
        "context": "Dockerfile · projeto vue-vite"
      },
      {
        "label": "Construir e executar sua versão",
        "text": "sudo docker build -t meu-vue:1.0.0 \"$HOME/oficina-docker/vue-vite\"\nsudo docker run -d --name meu-vue \\\n  -p 127.0.0.1:5175:80 \\\n  meu-vue:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://vite.dev/guide/static-deploy.html",
    "notes": "O npm run build não sobe um servidor: produz arquivos. Nginx recebe só dist. nginx.conf do projeto define a pasta servida e fallback index.html para rotas SPA. A imagem oficial já possui configuração padrão e entrypoint; nosso COPY substitui default.conf e o CMD mantém nginx em primeiro plano. O exemplo é Vue estático, não SSR. Dockerignore exclui node_modules, dist e .git. Abrir localhost:5175 evita conflito com a imagem pronta em 5174."
  },
  {
    "id": "cache",
    "chapter": "Construção de imagens",
    "title": "Copie primeiro o que muda menos",
    "lead": "Separar dependências e fonte permite reutilizar trabalho no próximo build.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Manifestos",
          "detail": "package.json + lock"
        },
        {
          "title": "Dependências",
          "detail": "RUN npm ci"
        },
        {
          "title": "Fonte",
          "detail": "COPY . ."
        },
        {
          "title": "Artefato",
          "detail": "RUN npm run build"
        }
      ]
    },
    "commands": [
      {
        "label": "Organizar etapas que aproveitam cache",
        "text": "COPY package.json package-lock.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build",
        "context": "Trecho do Dockerfile Vue"
      },
      {
        "label": "Comparar um build repetido",
        "text": "sudo docker build -t meu-vue:1.0.0 \"$HOME/oficina-docker/vue-vite\"\nsudo docker image history meu-vue:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/build/cache/",
    "notes": "Editar um componente tende a reutilizar npm ci; editar package-lock pode invalidar a instalação e as etapas posteriores. O cache real do BuildKit é um grafo. --no-cache desativa reutilização das etapas; --pull verifica nova base. Nenhum deles substitui o outro. Cache não significa que um bind do código foi criado. Go simples sem dependências externas não exige copiar go.mod."
  },
  {
    "id": "ide-receita",
    "chapter": "Construção de imagens",
    "title": "A IDE também foi construída por uma receita",
    "lead": "A aplicação gráfica usa o mesmo modelo de arquivos, configuração e processo.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "FROM Debian",
          "detail": "Arquivos e bibliotecas da base"
        },
        {
          "title": "RUN",
          "detail": "Instala VS Code e prepara usuário"
        },
        {
          "title": "WORKDIR",
          "detail": "Escolhe /workspace"
        },
        {
          "title": "CMD",
          "detail": "Abre o editor no diretório atual"
        }
      ]
    },
    "commands": [
      {
        "label": "Abrir a receita completa na IDE",
        "text": "sudo docker start ide\nsudo docker exec ide code --no-sandbox --reuse-window /opt/oficina/receitas/ide.Dockerfile",
        "context": "Terminal do computador · Bash"
      }
    ],
    "downloads": [
      "receitas"
    ],
    "source": "https://docs.docker.com/reference/dockerfile/",
    "guide": "04-imagens-dockerfile",
    "notes": "A receita longa é material para consulta e explicação na IDE, não um bloco no palco. FROM, ARG, RUN, COPY, USER, ENV, WORKDIR e CMD já têm um modelo mental. ARG padrão é usado quando o build não recebe substituição; não vira ENV automaticamente. USER define identidade padrão; --user troca em runtime. O editor é um processo gráfico, não exige servidor HTTP. Não solicitar construir a IDE neste ponto."
  },
  {
    "id": "construir-api",
    "chapter": "Construção de imagens",
    "title": "Sua alteração agora vira uma imagem",
    "lead": "O novo build incorpora o código editado; a imagem anterior continua independente.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "main.go editado",
          "detail": "Arquivo na sua pasta"
        },
        {
          "title": "docker build",
          "detail": "Executa a receita multi-stage"
        },
        {
          "title": "minha-soma:1.0.0",
          "detail": "Contém seu resultado"
        },
        {
          "title": "docker run",
          "detail": "Não precisa da fonte montada"
        }
      ]
    },
    "commands": [
      {
        "label": "Construir e executar sua imagem",
        "text": "sudo docker build -t minha-soma:1.0.0 \"$HOME/oficina-docker/go-soma\"\nsudo docker run --rm minha-soma:1.0.0\nsudo docker image ls\nsudo docker image inspect minha-soma:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "notes": "Comparar a saída da imagem própria com joaolsodocker/oficina-go:1.0.0. Não há bind mount no run: a fonte usada no build já produziu o binário. Uma imagem pode ser renomeada com tag sem duplicar camadas. A imagem scratch não contém shell para exec; isso é esperado."
  },
  {
    "id": "mural",
    "chapter": "Compose",
    "title": "Agora, uma aplicação com três serviços",
    "lead": "A complexidade fica na relação entre os containers, não no código da aplicação.",
    "visual": {
      "kind": "network"
    },
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "notes": "O mural é um exemplo pronto: web Nginx recebe o navegador, encaminha API Go, que lê/grava em PostgreSQL. Não ensinar o CRUD nem pedir cópia dos fontes. A imagem oficina-vue anterior é um exercício separado; a tela do mural vem de oficina-web. Nenhum banco está embutido na imagem Go."
  },
  {
    "id": "introducao-compose",
    "chapter": "Compose",
    "title": "Descreva a execução em um arquivo",
    "lead": "Compose reúne serviços, redes e volumes em um projeto.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Arquivo YAML",
          "detail": "Imagens e configuração"
        },
        {
          "title": "docker compose up",
          "detail": "Cria os recursos do projeto"
        },
        {
          "title": "Serviços",
          "detail": "web + api + db"
        }
      ]
    },
    "downloads": [
      "compose-mural"
    ],
    "commands": [
      {
        "label": "Conferir o arquivo baixado",
        "text": "cd \"$HOME/oficina-docker\"\nsudo -E docker compose -f compose.app.yaml config",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/compose/",
    "guide": "03-compose-armazenamento",
    "notes": "Extrair o ZIP em HOME/oficina-docker. Sem repo, Git ou fonte nesta etapa. compose.app.yaml usa só imagens publicadas, sem build nem caminho exemplos. config valida e resolve variáveis, não inicia containers. -f antes do subcomando seleciona o arquivo. O arquivo principal chama compose.app.yaml, por isso indicar -f; compose.yaml seria detectado automaticamente."
  },
  {
    "id": "compose-modelo",
    "chapter": "Compose",
    "title": "Um serviço descreve uma responsabilidade",
    "lead": "O nome do projeto, do serviço, da imagem e do container têm papéis diferentes.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "No arquivo",
        "lines": [
          "Projeto: oficina-mural",
          "Serviço: api",
          "Imagem: joaolsodocker/oficina-api:1.0.0"
        ]
      },
      "right": {
        "title": "Criado pelo Compose",
        "lines": [
          "Container: oficina-mural-api-1",
          "Rede: oficina-mural_default",
          "Labels identificam projeto e serviço"
        ]
      }
    },
    "commands": [
      {
        "label": "Ver a configuração completa",
        "text": "cd \"$HOME/oficina-docker\"\nsudo -E docker compose -f compose.app.yaml config",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Ler um recorte do modelo",
        "text": "services:\n  api:\n    image: joaolsodocker/oficina-api:1.0.0\n    environment:\n      PGHOST: db",
        "context": "Trecho de compose.app.yaml"
      }
    ],
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "notes": "O projeto tem name: oficina-mural. O nome padrão do container combina projeto, serviço e índice. Dentro da rede usa-se o nome do serviço para DNS. Compose encontra os recursos por labels, não só por padrão textual do nome. environment e volumes são campos de YAML; -f e -d são flags da CLI."
  },
  {
    "id": "subir-stack",
    "chapter": "Compose",
    "title": "Suba e observe a aplicação inteira",
    "lead": "As imagens já estão prontas. Compose configura e inicia os serviços.",
    "visual": {
      "kind": "network"
    },
    "commands": [
      {
        "label": "Baixar, iniciar e conferir",
        "text": "cd \"$HOME/oficina-docker\"\nsudo -E docker compose -f compose.app.yaml pull\nsudo -E docker compose -f compose.app.yaml up -d --wait\nsudo -E docker compose -f compose.app.yaml ps",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Acompanhar a API",
        "text": "sudo -E docker compose -f compose.app.yaml logs -f --tail 50 api",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/compose/",
    "guide": "05-aplicacao-rede",
    "notes": "Abrir localhost:8088. -d desacopla, --wait aguarda running/healthy conforme a configuração. Aguardamos publicação das imagens pelo instrutor antes do curso. Ctrl+C em logs encerra acompanhamento, não os serviços. -f depois de logs significa follow, diferente do -f que escolhe arquivo antes do subcomando."
  },
  {
    "id": "compose-comandos",
    "chapter": "Compose",
    "title": "Qual conjunto de containers você quer ver?",
    "lead": "docker ps observa o daemon; compose ps filtra o projeto selecionado.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "docker ps",
        "lines": [
          "Containers ativos de vários projetos",
          "IDE, Vue, Alpine e mural",
          "docker ps -a inclui parados"
        ]
      },
      "right": {
        "title": "docker compose ps",
        "lines": [
          "Containers deste projeto",
          "web, api e db do mural",
          "ps -a inclui os parados do projeto"
        ]
      }
    },
    "commands": [
      {
        "label": "Comparar a visão geral e a do projeto",
        "text": "sudo docker ps\nsudo docker ps -a\nsudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" ps\nsudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" ps -a",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/reference/cli/docker/compose/ps/",
    "notes": "Esclarecer daemon/contexto Docker: docker ps não lista todo computador do mundo, só o Engine selecionado. Compose agrupa recursos por labels de projeto. docker compose exec usa nome de serviço; docker exec usa nome/ID do container. Nenhum dos dois ps é um inventário de imagens."
  },
  {
    "id": "rede",
    "chapter": "Compose",
    "title": "localhost é o próprio ambiente de quem chama",
    "lead": "Os serviços se encontram pelo nome na rede Compose.",
    "visual": {
      "kind": "network"
    },
    "commands": [
      {
        "label": "Ver a rede e a configuração",
        "text": "sudo docker network ls\nsudo docker network inspect oficina-mural_default\nsudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" config",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/compose/how-tos/networking/",
    "notes": "API usa db:5432, não localhost:5432. Web usa api:8080. O navegador não resolve o DNS interno api; usa localhost:8088 e Nginx encaminha /api. O mural não conecta computadores diferentes automaticamente: cada aluno tem rede, containers e volume próprios. Para compartilhar, uma instância precisa ser acessível pela LAN ou por servidor remoto."
  },
  {
    "id": "portas",
    "chapter": "Compose",
    "title": "A rede interna e a entrada pelo computador",
    "lead": "Publicamos a web; a API e o banco ficam na rede do projeto.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Navegador",
          "detail": "localhost:8088"
        },
        {
          "title": "web",
          "detail": "Container :8080"
        },
        {
          "title": "api",
          "detail": "api:8080"
        },
        {
          "title": "db",
          "detail": "db:5432"
        }
      ]
    },
    "commands": [
      {
        "label": "Ver a porta publicada",
        "text": "sudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" port web 8080",
        "context": "Terminal do computador · Bash"
      },
      {
        "label": "Ler a publicação configurável",
        "text": "ports:\n  - \"${APP_BIND:-127.0.0.1}:${APP_PORT:-8088}:8080\"",
        "context": "Trecho do serviço web"
      }
    ],
    "source": "https://docs.docker.com/compose/how-tos/environment-variables/variable-interpolation/",
    "notes": ":- fornece valor padrão quando variável está ausente ou vazia. 127.0.0.1 limita acesso à própria máquina; 0.0.0.0 escuta em todas as interfaces do host, sujeito à rede e firewall. Escolher esse alcance conscientemente ao mostrar acesso por colegas. Não publicar PostgreSQL para a experiência local. IP dos containers pode mudar; nomes de serviço continuam o contrato."
  },
  {
    "id": "readiness",
    "chapter": "Compose",
    "title": "Em execução não significa pronto para atender",
    "lead": "A API espera o banco aceitar conexões antes de iniciar sua dependência.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Processo iniciado",
          "detail": "O banco está vivo"
        },
        {
          "title": "Healthcheck",
          "detail": "Verifica se aceita conexões"
        },
        {
          "title": "service_healthy",
          "detail": "Libera a dependência"
        },
        {
          "title": "API pronta",
          "detail": "Pode atender o mural"
        }
      ]
    },
    "commands": [
      {
        "label": "Ler a condição de prontidão",
        "text": "depends_on:\n  db:\n    condition: service_healthy\n\n# No serviço db:\nhealthcheck:\n  test: [\"CMD-SHELL\", \"pg_isready -U oficina -d oficina\"]",
        "context": "Recorte ilustrativo de compose.app.yaml"
      },
      {
        "label": "Observar saúde e logs",
        "text": "sudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" ps\nsudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" logs --tail 30 db api",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/compose/how-tos/startup-order/",
    "notes": "O YAML real usa variáveis e escape $$ para expandir dentro do container. pg_isready verifica prontidão do PostgreSQL, não valida schema inteiro. A API prepara tabelas. depends_on curto ordena início, não espera saúde. Um healthcheck falho não reinicia automaticamente o processo nem substitui reconexão da aplicação."
  },
  {
    "id": "banco-persistencia",
    "chapter": "Compose",
    "title": "O container muda; os dados permanecem",
    "lead": "O volume nomeado guarda os recados fora da camada da instância do banco.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Banco original",
          "detail": "Grava o recado"
        },
        {
          "title": "Volume PostgreSQL",
          "detail": "Persiste sem o container"
        },
        {
          "title": "Novo banco",
          "detail": "Lê o mesmo recado"
        }
      ]
    },
    "commands": [
      {
        "label": "Recriar sem remover o volume",
        "text": "cd \"$HOME/oficina-docker\"\nsudo -E docker compose -f compose.app.yaml down\nsudo -E docker compose -f compose.app.yaml up -d --wait\nsudo docker volume ls",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/reference/cli/docker/compose/down/",
    "notes": "Publicar um recado antes e conferir a interface depois. down remove containers e redes do projeto, preserva volumes nomeados por padrão. down -v removeria o volume e os dados do exercício; não oferecer esse comando no fluxo normal. Backup não é sinônimo de volume. O caminho do PostgreSQL 17 neste projeto é /var/lib/postgresql/data."
  },
  {
    "id": "banco-falha",
    "chapter": "Compose",
    "title": "Uma falha, três perguntas",
    "lead": "O processo está vivo? Está pronto? Consegue alcançar sua dependência?",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "ps",
          "detail": "Estado e saúde"
        },
        {
          "title": "logs",
          "detail": "Erro observado pela API"
        },
        {
          "title": "config",
          "detail": "Destino e variáveis resolvidas"
        },
        {
          "title": "Recuperação",
          "detail": "Restaurar e tentar de novo"
        }
      ]
    },
    "commands": [
      {
        "label": "Interromper uma dependência e recuperar",
        "text": "cd \"$HOME/oficina-docker\"\nsudo -E docker compose -f compose.app.yaml stop db\nsudo -E docker compose -f compose.app.yaml logs --tail 30 api\nsudo -E docker compose -f compose.app.yaml start db\nsudo -E docker compose -f compose.app.yaml ps",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/compose/",
    "guide": "08-desafios",
    "notes": "Depois de stop db, tentar enviar recado e observar resposta antes de ler logs. A API pode continuar com processo ativo enquanto prontidão e operações falham. Iniciar o banco, aguardar prontidão e tentar novamente. Exercício de diagnóstico, não de manipulação de CRUD. Não despejar todas as flags na apresentação: referência completa fica na busca de comandos."
  },
  {
    "id": "hub",
    "chapter": "Compartilhamento",
    "title": "Publique o resultado, não só a receita",
    "lead": "O Hub recebe a imagem construída; outro computador não precisa compilar sua fonte.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Seu código",
          "detail": "main.go editado"
        },
        {
          "title": "Build local",
          "detail": "minha-soma:1.0.0"
        },
        {
          "title": "Push",
          "detail": "Seu repositório no Hub"
        },
        {
          "title": "Pull + run",
          "detail": "Outro computador executa"
        }
      ]
    },
    "commands": [
      {
        "label": "Publicar sua imagem no seu namespace",
        "text": "sudo docker login\nsudo docker tag minha-soma:1.0.0 SEUUSUARIO/oficina-go:1.0.0\nsudo docker push SEUUSUARIO/oficina-go:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "guide": "06-docker-hub",
    "notes": "Trocar SEUUSUARIO pela conta pessoal. O namespace joaolsodocker é do instrutor e serve para as imagens prontas. Login e publicação são manuais. Dockerfile, fonte e contexto precisam existir durante build; a imagem leva o que o estágio final contém. A tag extra não duplica as camadas localmente."
  },
  {
    "id": "colega",
    "chapter": "Compartilhamento",
    "title": "Execute a versão de outra pessoa",
    "lead": "O nome da imagem é suficiente para buscar o programa já compilado.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Autor",
        "lines": [
          "Edita main.go",
          "Constrói a imagem",
          "Publica no seu namespace"
        ]
      },
      "right": {
        "title": "Colega",
        "lines": [
          "Baixa a imagem",
          "Executa o programa",
          "Não recebe o compilador nem o projeto"
        ]
      }
    },
    "commands": [
      {
        "label": "Baixar e executar a imagem do colega",
        "text": "sudo docker pull COLEGA/oficina-go:1.0.0\nsudo docker run --rm COLEGA/oficina-go:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "notes": "O colega precisa de imagem compatível com a plataforma/arquitetura e de acesso ao repositório. Nenhuma pasta do autor aparece automaticamente. Num servidor com banco, configuração e volumes também precisam ser preparados; a soma evita dependências para tornar clara a distribuição."
  },
  {
    "id": "conteudo-push",
    "chapter": "Compartilhamento",
    "title": "O que viaja com a imagem?",
    "lead": "O conteúdo depende do que foi colocado no estágio final.",
    "visual": {
      "kind": "compare",
      "left": {
        "title": "Na imagem da soma",
        "lines": [
          "Executável /soma",
          "Configuração de inicialização",
          "Arquivos copiados para o estágio final"
        ]
      },
      "right": {
        "title": "Fora da imagem",
        "lines": [
          "Arquivos da HOME montados",
          "Volume do PostgreSQL",
          "Mudanças de containers já executados"
        ]
      }
    },
    "commands": [
      {
        "label": "Conferir a imagem pronta",
        "text": "sudo docker image inspect minha-soma:1.0.0\nsudo docker image history minha-soma:1.0.0",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/get-started/docker-concepts/building-images/build-tag-and-publish-an-image/",
    "notes": "Imagem de um único estágio pode incluir fonte, compilador e dependências. O multi-stage só leva o selecionado. docker push não inclui automaticamente escritas feitas em containers. Variáveis pessoais, credenciais, volume e Compose não são incluídos pelo push da imagem. history não é inventário de todos os arquivos."
  },
  {
    "id": "quiz",
    "chapter": "Compartilhamento",
    "title": "Explique o que vai acontecer",
    "lead": "Antes de executar, faça uma previsão sobre processo, arquivos e rede.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Processo",
          "detail": "O que mantém o container ativo?"
        },
        {
          "title": "Arquivos",
          "detail": "Onde a escrita fica?"
        },
        {
          "title": "Rede",
          "detail": "Quem está chamando quem?"
        },
        {
          "title": "Imagem",
          "detail": "O que o colega vai receber?"
        }
      ]
    },
    "type": "quiz",
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "Usar as perguntas do quiz para revisão, sem ranking. A avaliação é do modelo mental e do raciocínio, não de decorar comandos. O progresso de interação permanece no navegador, sem servidor de coleta."
  },
  {
    "id": "fim",
    "chapter": "Compartilhamento",
    "title": "Uma imagem, um contrato de execução",
    "lead": "Você consegue explicar o que executar, quais dados preservar e como os serviços se conectam.",
    "visual": {
      "kind": "flow",
      "nodes": [
        {
          "title": "Construir",
          "detail": "Receita + contexto → imagem"
        },
        {
          "title": "Executar",
          "detail": "Imagem + configuração → container"
        },
        {
          "title": "Persistir",
          "detail": "Mounts para os dados necessários"
        },
        {
          "title": "Compartilhar",
          "detail": "Registry para distribuir a imagem"
        }
      ]
    },
    "commands": [
      {
        "label": "Encerrar somente os exercícios da oficina",
        "text": "sudo -E docker compose -f \"$HOME/oficina-docker/compose.app.yaml\" down\nsudo docker rm -f fs-lab ide vue-web meu-vue\nsudo docker rm soma",
        "context": "Terminal do computador · Bash"
      }
    ],
    "source": "https://docs.docker.com/get-started/docker-overview/",
    "notes": "Encerramento opcional: confirmar que arquivos criados só na camada da IDE foram copiados antes da remoção. O comando remove apenas nomes dos exercícios, não executa prune geral nem remove o volume do mural. Containers já removidos geram avisos de inexistência sem afetar os demais. Materiais, receitas e comandos permanecem disponíveis no GitHub Pages."
  }
];
