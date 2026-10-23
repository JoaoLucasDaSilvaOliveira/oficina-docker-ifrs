/* Explicações locais: nenhuma consulta externa ou execução de comandos. */
(() => {
  "use strict";
  const rules = new Map();
  const composeDescriptions = {
    "--all-resources":
      "Inclui todos os recursos, mesmo os que não são usados pelos serviços.",
    "--ansi":
      "Controla as cores e os códigos ANSI da saída: auto, always ou never.",
    "--compatibility":
      "Ativa o modo de compatibilidade com comportamentos anteriores do Compose.",
    "--dry-run": "Mostra o que o Compose faria, sem executar as alterações.",
    "--env-file":
      "Escolhe o arquivo de variáveis usado pelo Compose na interpolação da configuração. Não injeta sozinho todas as variáveis nos containers.",
    "--file":
      "Escolhe um arquivo Compose. Repita -f para combinar arquivos; os seguintes complementam ou sobrescrevem os anteriores.",
    "--parallel":
      "Limita as operações executadas em paralelo. -1 significa sem limite.",
    "--profile": "Ativa um profile, incluindo os serviços associados a ele.",
    "--progress":
      "Escolhe a apresentação do progresso: auto, tty, plain, json ou quiet.",
    "--project-directory":
      "Define o diretório de trabalho do projeto, usado como base para os caminhos relativos.",
    "--project-name":
      "Define o nome do projeto, usado para agrupar e nomear seus recursos.",
    "--detach":
      "Executa em segundo plano e libera o terminal. O serviço continua rodando.",
    "--detach-keys":
      "Personaliza a sequência de teclas que desanexa o terminal do container.",
    "--index": "Escolhe a réplica do serviço quando há mais de um container.",
    "--no-stdin": "Não conecta a entrada padrão do terminal ao container.",
    "--sig-proxy":
      "Encaminha ao processo os sinais recebidos pelo cliente, como a interrupção do terminal.",
    "--build-arg":
      "Fornece uma variável ARG para o build. Não é um meio seguro para enviar segredos.",
    "--builder": "Seleciona o builder que construirá as imagens.",
    "--check":
      "Verifica a configuração de build e possíveis problemas no Dockerfile.",
    "--memory":
      "Define o limite de memória do build legado. Esta opção não é suportada pelo BuildKit no Compose.",
    "--no-cache":
      "Constrói sem reutilizar o cache das etapas. Não baixa automaticamente uma base mais nova.",
    "--print": "Exibe a configuração equivalente do Bake para o build.",
    "--provenance":
      "Inclui uma atestação sobre a origem e o processo de construção da imagem.",
    "--pull":
      "Tenta baixar uma versão mais nova das imagens usadas como base do build.",
    "--push": "Envia ao registry as imagens resultantes do build.",
    "--quiet":
      "Reduz a saída do comando. O que permanece visível depende do subcomando.",
    "--sbom":
      "Inclui uma atestação com a lista de componentes de software da imagem.",
    "--ssh":
      "Disponibiliza uma chave ou agente SSH durante o build, para etapas que declaram esse acesso.",
    "--with-dependencies":
      "Constrói também as imagens das dependências, inclusive dependências indiretas.",
    "--author": "Registra o autor nos metadados da imagem criada.",
    "--change":
      "Aplica uma instrução Dockerfile à configuração da imagem criada pelo commit.",
    "--message": "Registra uma mensagem no commit da imagem.",
    "--pause":
      "Pausa os processos do container durante o commit, para reduzir inconsistências.",
    "--environment":
      "Mostra as variáveis usadas para interpolar a configuração Compose.",
    "--format":
      "Escolhe o formato da saída, entre os formatos aceitos por este subcomando.",
    "--hash": "Mostra o hash da configuração dos serviços selecionados.",
    "--images":
      "Mostra os nomes das imagens presentes na configuração resolvida.",
    "--lock-image-digests":
      "Gera um arquivo de sobreposição que fixa as imagens por digest.",
    "--models": "Lista os nomes dos modelos declarados na configuração.",
    "--networks": "Lista os nomes das redes presentes na configuração.",
    "--no-consistency":
      "Desativa a verificação de consistência do modelo Compose.",
    "--no-env-resolution": "Não resolve os arquivos env_file dos serviços.",
    "--no-interpolate":
      "Não substitui as referências de variáveis na configuração.",
    "--no-normalize": "Não converte o modelo para a representação normalizada.",
    "--no-path-resolution":
      "Mantém os caminhos sem convertê-los em caminhos resolvidos.",
    "--profiles": "Lista os profiles definidos na configuração.",
    "--resolve-image-digests":
      "Resolve as tags das imagens para seus digests de conteúdo.",
    "--services": "Lista os nomes dos serviços definidos na configuração.",
    "--variables": "Lista as variáveis do modelo e seus valores padrão.",
    "--all": "Inclui também os containers parados na listagem.",
    "--archive":
      "Copia preservando as informações de usuário e grupo dos arquivos.",
    "--follow-link": "Segue links simbólicos na origem ao copiar os arquivos.",
    "--build": "Constrói as imagens antes de criar ou iniciar os containers.",
    "--force-recreate":
      "Recria os containers mesmo se a imagem e a configuração não mudaram.",
    "--no-build":
      "Não constrói imagens. As imagens necessárias devem existir ou poder ser baixadas.",
    "--no-recreate":
      "Preserva os containers existentes, mesmo quando seria possível recriá-los.",
    "--remove-orphans":
      "Remove containers deste projeto cujos serviços não aparecem no Compose atual.",
    "--scale":
      "Define a quantidade de réplicas de um serviço, no formato serviço=quantidade.",
    "--rmi":
      "Remove também imagens dos serviços: local remove as sem tag personalizada; all inclui todas as usadas.",
    "--timeout":
      "Define, em segundos, o tempo de espera para encerrar os processos antes da parada forçada.",
    "--volumes":
      "Remove também os volumes nomeados declarados e os anônimos associados. Apaga seus dados; volumes externos são preservados.",
    "--json": "Produz a saída no formato JSON.",
    "--env":
      "Define uma variável de ambiente para o processo executado no container.",
    "--interactive":
      "Mantém a entrada padrão aberta para interação com o processo.",
    "--no-tty":
      "Desativa a alocação de pseudo-TTY. Útil em scripts sem terminal interativo.",
    "--privileged":
      "Concede privilégios ampliados ao processo. O alcance depende de ser run ou exec.",
    "--user":
      "Escolhe o usuário ou UID e, opcionalmente, o grupo/GID do processo.",
    "--workdir":
      "Define o diretório de trabalho do processo dentro do container.",
    "--output": "Escolhe o arquivo ou diretório de saída deste comando.",
    "--signal":
      "Escolhe o sinal enviado ao processo do container, como SIGTERM ou SIGKILL.",
    "--follow":
      "Acompanha novas linhas de log continuamente. Ctrl+C encerra o acompanhamento.",
    "--no-color": "Exibe a saída sem cores ANSI.",
    "--no-log-prefix":
      "Omite o prefixo que identifica o serviço em cada linha de log.",
    "--since":
      "Mostra os logs a partir do instante ou período informado, como 10m.",
    "--tail": "Seleciona quantas linhas recentes de log mostrar por container.",
    "--timestamps": "Acrescenta a data e a hora às linhas de log.",
    "--until": "Mostra os logs até o instante ou período informado.",
    "--filter": "Filtra a listagem por critérios aceitos pelo subcomando.",
    "--protocol": "Escolhe o protocolo da porta consultada, como tcp ou udp.",
    "--no-trunc": "Não abrevia o conteúdo das colunas da listagem.",
    "--orphans": "Inclui na listagem containers órfãos do projeto.",
    "--status": "Filtra os containers pelo estado informado.",
    "--app": "Publica a aplicação Compose incluindo as imagens referenciadas.",
    "--oci-version":
      "Escolhe a versão da especificação OCI usada no artefato publicado.",
    "--with-env":
      "Inclui variáveis de ambiente no artefato publicado. Confira os valores para não publicar segredos.",
    "--ignore-buildable":
      "Não baixa imagens dos serviços que podem ser construídos localmente.",
    "--ignore-pull-failures":
      "Continua o comando mesmo quando o download de alguma imagem falha.",
    "--include-deps":
      "Inclui também os serviços declarados como dependências nesta operação.",
    "--policy":
      "Escolhe quando baixar imagens: missing baixa as ausentes; always tenta baixar sempre.",
    "--ignore-push-failures":
      "Continua o envio das demais imagens mesmo quando algum push falha.",
    "--no-deps":
      "Não inicia os serviços dependentes junto com o serviço solicitado.",
    "--force": "Remove os containers sem pedir confirmação.",
    "--stop": "Para os containers, se necessário, antes de removê-los.",
    "--cap-add": "Acrescenta capabilities Linux ao container.",
    "--cap-drop": "Retira capabilities Linux do container.",
    "--entrypoint": "Substitui o executável ENTRYPOINT definido na imagem.",
    "--env-from-file":
      "Lê de um arquivo variáveis que serão entregues ao processo no container.",
    "--label": "Acrescenta metadados no formato chave=valor ao container.",
    "--name": "Define um nome explícito para o container criado.",
    "--publish":
      "Publica uma porta do container no host, no formato [IP:]porta_host:porta_container.",
    "--quiet-pull": "Oculta o progresso dos downloads de imagens.",
    "--rm":
      "Remove o container quando o processo termina. Sua camada gravável é perdida.",
    "--service-ports":
      "Publica no container temporário as portas declaradas para o serviço.",
    "--use-aliases":
      "Usa também os aliases de rede do serviço no container temporário.",
    "--volume":
      "Monta um volume ou diretório, no formato origem:destino[:opções].",
    "--no-stream":
      "Mostra uma única leitura do consumo, em vez de atualizar continuamente.",
    "--wait":
      "Espera os serviços ficarem running ou healthy, conforme seus healthchecks. Implica execução em segundo plano.",
    "--wait-timeout":
      "Define o máximo de segundos para aguardar os serviços ficarem running ou healthy.",
    "--abort-on-container-exit":
      "Para os demais containers se qualquer container terminar. Incompatível com -d.",
    "--abort-on-container-failure":
      "Para os demais containers se algum terminar com erro. Incompatível com -d.",
    "--always-recreate-deps": "Recria também os containers das dependências.",
    "--attach": "Conecta a saída apenas dos serviços selecionados.",
    "--attach-dependencies": "Conecta também a saída dos serviços dependentes.",
    "--exit-code-from":
      "Usa como resultado do comando o código de saída do serviço escolhido; implica abort-on-container-exit.",
    "--menu":
      "Ativa atalhos interativos no modo conectado. Incompatível com -d.",
    "--no-attach": "Não conecta a saída dos serviços selecionados.",
    "--no-start": "Cria os containers sem iniciar seus processos.",
    "--quiet-build": "Oculta a saída detalhada da construção das imagens.",
    "--renew-anon-volumes":
      "Cria novos volumes anônimos em vez de reaproveitar os dos containers anteriores.",
    "--watch":
      "Observa os arquivos e aplica as ações de desenvolvimento configuradas, como sincronizar ou reconstruir.",
    "--down-project":
      "Executa down no projeto quando o primeiro container aguardado termina.",
    "--no-up": "Começa a observar sem construir nem iniciar os serviços antes.",
    "--prune": "Remove imagens sem tag durante as reconstruções do modo watch.",
    "--short": "Mostra apenas a versão, sem texto adicional.",
    "--templates":
      "Escolhe o diretório de templates usado na conversão do Compose.",
    "--transformation":
      "Seleciona a transformação usada para converter o modelo Compose.",
    "--yes":
      "Aceita automaticamente as confirmações do comando, sem interação.",
    "--from": "Escolhe a transformação existente que será copiada como base.",
  };

  function define(context, definitions) {
    const options = rules.get(context) || new Map();
    for (const [aliases, description] of Object.entries(definitions)) {
      const names = aliases.split(" ");
      const rule = { context, names, description };
      for (const name of names) options.set(name, rule);
    }
    rules.set(context, options);
  }

  // A captura cobre a CLI instalada. As explicações didáticas em português
  // abaixo prevalecem sobre a descrição oficial quando existe uma específica.
  for (const record of window.OFICINA_DOCKER_REFERENCE || []) {
    const definitions = {};
    for (const match of record.help.matchAll(
      /^[ \t]+(?:(-\w), )?(--[\w-]+)\b[^\n]*?[ \t]{2,}(\S[^\n]*)/gm,
    )) {
      const [, short, long, description] = match;
      definitions[[short, long].filter(Boolean).join(" ")] = description;
    }
    define(record.command, definitions);
  }

  // Os aliases vêm da captura da CLI usada no material, não de uma lista global:
  // -f pode significar --file, --follow, --force ou --from.
  for (const record of window.OFICINA_COMPOSE_REFERENCE || []) {
    const context = record.title.replace(/\s+--help$/, "");
    const definitions = {};
    for (const match of record.help.matchAll(
      /^[ \t]+(?:(-\w), )?(--[\w-]+)\b[^\n]*?[ \t]{2,}(\S[^\n]*)/gm,
    )) {
      const [, short, long, original] = match;
      definitions[[short, long].filter(Boolean).join(" ")] =
        composeDescriptions[long] || original;
    }
    define(context, definitions);
  }
  for (const context of rules.keys()) {
    if (context.startsWith("docker compose"))
      define(context, {
        "--help": "Mostra a ajuda e as opções disponíveis para este comando.",
      });
  }
  define("docker compose ls", {
    "-a --all": "Inclui também os projetos Compose parados.",
  });
  define("docker compose cp", {
    "--all": "Inclui também os containers temporários criados por compose run.",
  });
  define("docker compose rm", {
    "-v --volumes":
      "Remove também os volumes anônimos associados aos containers removidos. Volumes nomeados permanecem.",
  });
  for (const name of ["ps", "images"])
    define("docker compose " + name, {
      "-q --quiet": "Mostra apenas os IDs, sem a tabela detalhada.",
    });
  define("docker compose config", {
    "-q --quiet": "Valida a configuração sem exibir o modelo resolvido.",
  });
  define("docker compose bridge convert", {
    "-y --yes":
      "Aceita automaticamente a confirmação de sobrescrita do diretório de saída.",
  });
  define("docker compose up", {
    "--pull":
      "Escolhe a política de download antes de iniciar: always, missing ou never.",
  });
  define("docker compose create", {
    "--pull":
      "Escolhe a política de download antes de criar: always, missing ou never.",
  });
  define("docker compose run", {
    "--pull":
      "Escolhe a política de download antes de executar: always, missing ou never.",
  });
  define("docker compose wait", {
    "--down-project": composeDescriptions["--down-project"],
  });

  const interactive = {
    "-i --interactive":
      "Mantém a entrada padrão (stdin) aberta para enviar comandos ao processo.",
    "-t --tty":
      "Aloca um pseudo-terminal (TTY), permitindo interação como em um terminal normal.",
    "-d --detach":
      "Executa em segundo plano e libera o terminal; o processo continua rodando.",
    "-e --env":
      "Define uma variável de ambiente do processo, como CHAVE=valor.",
    "--env-file":
      "Lê de um arquivo as variáveis de ambiente do processo no container.",
    "-u --user": composeDescriptions["--user"],
    "-w --workdir": composeDescriptions["--workdir"],
    "--privileged":
      "Concede privilégios ampliados. Não é necessário para os exercícios desta oficina.",
  };
  define("docker run", {
    ...interactive,
    "--name": composeDescriptions["--name"],
    "--rm":
      "Remove automaticamente o container quando ele termina, incluindo sua camada gravável e volumes anônimos associados. Volumes nomeados permanecem.",
    "--mount":
      "Monta armazenamento no container. type escolhe bind, volume ou tmpfs; src é a origem e dst é o caminho interno.",
    "-v --volume": composeDescriptions["--volume"],
    "-p --publish": composeDescriptions["--publish"],
    "-P --publish-all":
      "Publica em portas disponíveis do host todas as portas expostas pela imagem.",
    "--entrypoint": composeDescriptions["--entrypoint"],
    "--network": "Escolhe a rede à qual o container será conectado.",
    "-h --hostname":
      "Define o hostname interno do container. Nesta IDE, usamos o hostname do host para encontrar a autorização local X11.",
    "--shm-size":
      "Define a capacidade de /dev/shm, usada para memória compartilhada. Não é o limite total de RAM do container.",
    "--read-only":
      "Monta a raiz do container somente para leitura. Montagens separadas podem continuar graváveis.",
    "--tmpfs":
      "Monta um diretório temporário em memória, descartado quando o container para.",
    "--memory -m":
      "Limita a memória disponível ao container, por exemplo 256m ou 1g.",
    "--cpus":
      "Limita o tempo de CPU disponível, por exemplo 0.5 equivale à metade de uma CPU.",
    "--restart":
      "Define a política de reinício automático, como unless-stopped ou on-failure.",
    "--platform":
      "Escolhe sistema e arquitetura da imagem, como linux/amd64 ou linux/arm64.",
    "--pull": "Escolhe quando baixar a imagem: always, missing ou never.",
  });
  define("docker exec", interactive);
  define("apt-get", {
    "-y --yes":
      "Responde sim automaticamente às confirmações da instalação de pacotes.",
    "--no-install-recommends":
      "Instala as dependências necessárias sem acrescentar os pacotes apenas recomendados.",
  });
  define("curl", {
    "-f --fail":
      "Retorna erro para respostas HTTP de falha, como 404, em vez de tratar a página de erro como download bem-sucedido.",
    "-s --silent":
      "Oculta o progresso e as mensagens de erro; combinado com -S, os erros continuam visíveis.",
    "-S --show-error":
      "Mostra mensagens de erro mesmo quando -s desativa o progresso.",
    "-L --location": "Segue redirecionamentos HTTP até o endereço de destino.",
  });
  define("gpg", {
    "--dearmor":
      "Converte a chave em texto ASCII para o formato binário usado neste arquivo de chave APT.",
    "-o --output": "Grava o resultado no arquivo indicado.",
  });
  define("install", {
    "-d --directory":
      "Cria o diretório indicado, incluindo os pais necessários.",
  });
  define("dpkg", {
    "--print-architecture":
      "Mostra a arquitetura de pacotes do Debian usado no build, como amd64 ou arm64.",
  });
  define("groupadd", {
    "-g --gid": "Define o identificador numérico GID do grupo criado.",
  });
  define("useradd", {
    "-u --uid": "Define o identificador numérico UID do usuário criado.",
    "-g --gid": "Escolhe o grupo principal do usuário pelo nome ou GID.",
    "-m --create-home":
      "Cria o diretório pessoal do usuário, neste caso /home/aluno.",
    "-s --shell":
      "Define o shell associado à conta do usuário, neste caso /bin/bash.",
  });
  define("mkdir", {
    "-p --parents":
      "Cria os diretórios pais necessários e aceita que o diretório já exista.",
  });
  define("id", {
    "-u --user":
      "Mostra o UID do usuário. O shell entrega esse número ao argumento de build ou à opção --user do Docker.",
    "-g --group":
      "Mostra o GID principal do usuário, usado para alinhar as permissões entre host e container.",
  });
  define("docker start", {
    "-a --attach":
      "Conecta a saída e encaminha sinais ao iniciar o mesmo container.",
    "-i --interactive": "Conecta a entrada padrão ao iniciar o container.",
  });
  define("docker ps", {
    "-a --all":
      "Lista todos os containers, incluindo os parados. Sem esta flag, mostra apenas os em execução.",
    "-q --quiet": "Mostra apenas os IDs dos containers.",
    "-f --filter":
      "Filtra os containers por um critério, como status=exited ou name=fs-lab.",
    "--format":
      "Formata a saída com um template Go ou um formato aceito pelo comando.",
    "--no-trunc": composeDescriptions["--no-trunc"],
  });
  define("docker rm", {
    "-f --force":
      "Força a parada do container em execução e o remove. Sua camada gravável é apagada.",
    "-v --volumes":
      "Remove também os volumes anônimos associados ao container. Volumes nomeados permanecem.",
  });
  define("docker logs", {
    "-f --follow": composeDescriptions["--follow"],
    "--tail": composeDescriptions["--tail"],
    "--since": composeDescriptions["--since"],
    "--until": composeDescriptions["--until"],
    "-t --timestamps": composeDescriptions["--timestamps"],
  });
  define("docker stats", {
    "--no-stream": composeDescriptions["--no-stream"],
    "-a --all": composeDescriptions["--all"],
  });
  define("docker inspect", {
    "-f --format": "Seleciona informações da inspeção usando um template Go.",
  });
  define("docker build", {
    "-t --tag":
      "Atribui um nome e uma tag à imagem construída, como oficina/api:1.0.0.",
    "-f --file":
      "Escolhe o Dockerfile. O contexto de build continua sendo o argumento de caminho no final do comando.",
    "--build-arg": composeDescriptions["--build-arg"],
    "--no-cache": composeDescriptions["--no-cache"],
    "--pull": composeDescriptions["--pull"],
    "--platform":
      "Escolhe as plataformas de destino, como linux/amd64,linux/arm64.",
    "--push": "Envia o resultado do build diretamente ao registry.",
    "--load":
      "Carrega o resultado do build no armazenamento local de imagens Docker.",
    "--target":
      "Escolhe o estágio do Dockerfile que será o resultado do build.",
    "--progress":
      "Escolhe como mostrar o progresso do build, por exemplo plain para texto detalhado.",
  });
  define("docker image ls", {
    "-a --all": "Inclui imagens intermediárias na listagem.",
    "-q --quiet": "Mostra apenas os IDs das imagens.",
  });
  define("docker image history", {
    "--no-trunc": composeDescriptions["--no-trunc"],
  });
  define("docker system prune", {
    "-a --all":
      "Remove todas as imagens não usadas por containers, além da limpeza padrão.",
    "-f --force": "Executa a limpeza sem pedir confirmação.",
    "--volumes":
      "Inclui na limpeza os volumes anônimos sem uso. Seus dados são apagados.",
  });
  define("docker container prune", {
    "-f --force":
      "Remove todos os containers parados sem pedir confirmação. Seus arquivos internos são apagados.",
  });
  define("ls", {
    "-a --all":
      "Mostra também nomes iniciados por ponto, como .dockerenv, incluindo . e ...",
    "-l": "Usa a listagem detalhada: tipo, permissões, dono, tamanho e data.",
    "-d --directory":
      "Mostra o próprio diretório, em vez de listar seu conteúdo.",
    "-h --human-readable":
      "Mostra os tamanhos em unidades legíveis, como K, M e G.",
  });
  define("sh", {
    "-c": "Executa como comando o texto passado no próximo argumento.",
    "-i": "Abre um shell interativo.",
  });
  define("rm", {
    "-r -R --recursive": "Remove diretórios e seu conteúdo recursivamente.",
    "-f --force": "Não pede confirmação e ignora arquivos inexistentes.",
  });
  define("apk add", {
    "--no-cache":
      "Instala os pacotes sem manter o cache local dos índices de repositórios do Alpine.",
  });
  define("go build", {
    "-o": "Escolhe o caminho do executável gerado pela compilação.",
    "-trimpath":
      "Remove dos artefatos os caminhos locais usados na compilação.",
    "-ldflags": "Envia opções ao linker, como definir uma variável de versão.",
  });
  define("npm run dev", {
    "--host":
      "Passa ao servidor Vite o endereço em que deve escutar. 0.0.0.0 permite chegar a ele pela rede do container.",
    "--port": "Escolhe a porta do servidor de desenvolvimento Vite.",
  });
  define("nginx", {
    "-v": "Mostra a versão do Nginx e encerra.",
    "-t": "Valida a configuração do Nginx sem iniciar o servidor.",
    "-g": "Fornece diretivas globais, como daemon off; para executar em primeiro plano.",
  });
  define("pg_isready", {
    "-U --username":
      "Escolhe o usuário PostgreSQL usado na tentativa de conexão.",
    "-d --dbname":
      "Escolhe o banco de dados usado na verificação de disponibilidade.",
    "-h --host": "Escolhe o endereço do servidor PostgreSQL.",
    "-p --port": "Escolhe a porta do servidor PostgreSQL.",
  });
  define("psql", {
    "-U --username": "Escolhe o usuário da conexão com o PostgreSQL.",
    "-d --dbname": "Escolhe o banco de dados da conexão.",
    "-c --command": "Executa a instrução SQL fornecida no próximo argumento.",
    "-h --host": "Escolhe o endereço do servidor PostgreSQL.",
    "-p --port": "Escolhe a porta do servidor PostgreSQL.",
  });
  define("code", {
    "--reuse-window":
      "Abre o arquivo na janela existente do VS Code. Aqui serve para ler a cópia do Dockerfile da IDE.",
    "--no-sandbox":
      "Desativa a sandbox do Electron neste exemplo de IDE. É um ajuste de compatibilidade da demonstração.",
    "--disable-gpu": "Desativa a aceleração gráfica por GPU na IDE.",
    "--disable-dev-shm-usage":
      "Evita usar /dev/shm para a memória compartilhada do Chromium.",
    "--ozone-platform":
      "Escolhe o backend gráfico do Electron, como x11 ou wayland.",
    "--user-data-dir":
      "Escolhe a pasta de configurações e dados de usuário da IDE.",
    "--new-window": "Abre a IDE em uma nova janela.",
    "--wait":
      "Mantém o comando aguardando até fechar os arquivos ou a janela aberta.",
  });
  define("/api", {
    "-healthcheck":
      "Executa a verificação de prontidão implementada pela API Go desta oficina e encerra com seu resultado.",
  });
  define("COPY", {
    "--from":
      "Copia arquivos de outro estágio, imagem ou contexto nomeado do build.",
    "--chown":
      "Define o usuário e grupo dos arquivos copiados na imagem Linux.",
    "--chmod": "Define as permissões dos arquivos copiados.",
    "--link":
      "Cria uma camada de cópia independente para facilitar a reutilização do cache.",
  });
  define(
    "ADD",
    Object.fromEntries(
      [...rules.get("COPY")].map(([flag, rule]) => [flag, rule.description]),
    ),
  );
  define("RUN", {
    "--mount":
      "Monta recursos apenas durante esta etapa de build, como um cache de compilação ou um secret.",
    "--network": "Escolhe a rede disponível durante esta etapa de build.",
  });
  define("HEALTHCHECK", {
    "--interval": "Define o intervalo entre as verificações de saúde.",
    "--timeout": "Define quanto uma verificação pode durar antes de falhar.",
    "--start-period":
      "Define o período inicial de tolerância antes de contar falhas.",
    "--retries":
      "Define quantas falhas consecutivas tornam o container unhealthy.",
  });

  const aliases = new Map([
    ["apt-get install", "apt-get"],
    ["apt-get update", "apt-get"],
    ["docker buildx build", "docker build"],
    ["docker container ls", "docker ps"],
    ...["run", "exec", "start", "rm", "logs", "stats", "inspect", "prune"].map(
      (name) => [
        "docker container " + name,
        name === "prune" ? "docker container prune" : "docker " + name,
      ],
    ),
    ["docker image inspect", "docker inspect"],
  ]);
  const canonical = (context) => aliases.get(context) || context;
  const escapeRE = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const commandPattern = new RegExp(
    "(?<![\\w/.-])(" +
      [...rules.keys(), ...aliases.keys()]
        .sort((a, b) => b.length - a.length)
        .map((s) => escapeRE(s).replace(/ /g, "\\s+"))
        .join("|") +
      ")(?![\\w.-])",
    "g",
  );
  const flagPattern = /(?<![\w./:-])(--?[A-Za-z][\w-]*)(?![\w-])/g;

  function lookup(flag, context) {
    const key = canonical(context || "");
    const local = rules.get(key)?.get(flag);
    if (local) return [local];
    if (key.startsWith("docker compose ")) {
      const inherited = rules.get("docker compose")?.get(flag);
      if (inherited) return [inherited];
    }
    if (/^-[A-Za-z]{2,}$/.test(flag)) {
      const parts = [...flag.slice(1)].map((letter) =>
        rules.get(key)?.get("-" + letter),
      );
      if (parts.every(Boolean)) return [...new Set(parts)];
    }
    if (flag === "--help")
      return [
        {
          context: key || "CLI",
          names: [flag],
          description:
            "Mostra a ajuda e as opções disponíveis para este comando.",
        },
      ];
    return [];
  }

  function fallback(flag) {
    const candidates = [];
    for (const context of rules.keys()) {
      for (const rule of lookup(flag, context)) {
        if (!candidates.some((item) => item.description === rule.description))
          candidates.push(rule);
      }
    }
    // Sem um comando ao lado, aliases curtos podem ser ambíguos. Nesse caso,
    // explicitar os significados evita ensinar uma associação incorreta.
    return candidates;
  }

  function commandsIn(line) {
    const commands = [...line.matchAll(commandPattern)].map((match) => ({
      context: canonical(match[0].replace(/\s+/g, " ")),
      start: match.index,
      end: match.index + match[0].length,
    }));
    for (const command of [...commands]) {
      if (command.context !== "docker compose") continue;
      const tail = line.slice(command.end);
      const words = [...tail.matchAll(/"(?:\\.|[^"\\])*"|'[^']*'|[^\s,;|]+/g)];
      let path = command.context;
      for (let i = 0; i < words.length; i++) {
        const word = words[i][0];
        if (word.startsWith("-")) {
          const option = lookup(word.split("=")[0], "docker compose")[0];
          if (!option) break;
          if (
            !word.includes("=") &&
            [
              "--ansi",
              "--env-file",
              "--file",
              "--parallel",
              "--profile",
              "--progress",
              "--project-directory",
              "--project-name",
            ].some((name) => option.names.includes(name))
          )
            i++;
          continue;
        }
        if (!rules.has(path + " " + word)) break;
        path += " " + word;
        commands.push({
          context: path,
          start: command.end + words[i].index,
          end: command.end + words[i].index + word.length,
        });
      }
    }
    // O contexto de id em $(id -u) termina no parêntese da substituição.
    for (const command of commands) {
      const openings = [];
      for (let i = 0; i < command.start; i++) {
        if (line.slice(i, i + 2) === "$(") {
          openings.push(i);
          i++;
        } else if (line[i] === ")") openings.pop();
      }
      if (!openings.length) continue;
      let depth = 1;
      for (let i = openings.at(-1) + 2; i < line.length; i++) {
        if (line[i] === "(") depth++;
        if (line[i] === ")" && --depth === 0) {
          command.limit = i;
          break;
        }
      }
    }
    return commands.sort((a, b) => a.start - b.start || b.end - a.end);
  }

  function scan(text, context = "") {
    const matches = [];
    const normalized = text.replace(/\\\r?\n/g, (value) =>
      " ".repeat(value.length),
    );
    let offset = 0;
    for (const line of normalized.split("\n")) {
      const commands = commandsIn(line);
      for (const match of line.matchAll(flagPattern)) {
        const command = commands
          .filter(
            (item) =>
              item.end <= match.index && match.index < (item.limit ?? Infinity),
          )
          .at(-1);
        const selected = command?.context || context;
        let entries = lookup(match[1], selected);
        if (!entries.length && !command) entries = fallback(match[1]);
        if (!entries.length) continue;
        matches.push({
          start: offset + match.index,
          end: offset + match.index + match[1].length,
          flag: match[1],
          entries,
        });
      }
      offset += line.length + 1;
    }
    return matches;
  }

  window.OFICINA_FLAGS = { scan };
  if (typeof document === "undefined") return;

  let active = null;
  let hideTimer;
  let pointer = null;
  const tooltip = document.createElement("div");
  tooltip.id = "flag-tooltip";
  tooltip.className = "flag-tooltip";
  tooltip.setAttribute("role", "tooltip");
  tooltip.hidden = true;
  document.body.append(tooltip);

  function hide() {
    clearTimeout(hideTimer);
    if (active) {
      active.removeAttribute("aria-describedby");
      active.setAttribute("aria-expanded", "false");
    }
    active = null;
    pointer = null;
    tooltip.hidden = true;
  }
  function position() {
    if (!active) return;
    const bounds = active.getBoundingClientRect();
    const margin = 12;
    const x = pointer?.x ?? bounds.left;
    const y = pointer?.y ?? bounds.bottom;
    const width = tooltip.offsetWidth;
    const height = tooltip.offsetHeight;
    const viewport = window.visualViewport;
    const left = viewport?.offsetLeft || 0;
    const top = viewport?.offsetTop || 0;
    const right = left + (viewport?.width || innerWidth);
    const bottom = top + (viewport?.height || innerHeight);
    const availableBelow = bottom - y - margin * 2;
    const desiredTop =
      availableBelow >= height
        ? y + margin
        : (pointer?.y ?? bounds.top) - height - margin;
    tooltip.style.left =
      Math.max(left + margin, Math.min(x + margin, right - width - margin)) +
      "px";
    tooltip.style.top =
      Math.max(top + margin, Math.min(desiredTop, bottom - height - margin)) +
      "px";
  }
  function show(target, event) {
    clearTimeout(hideTimer);
    if (active !== target) hide();
    active = target;
    pointer =
      event?.pointerType === "mouse"
        ? { x: event.clientX, y: event.clientY }
        : null;
    tooltip.replaceChildren();
    const title = document.createElement("strong");
    title.className = "flag-tooltip-title";
    title.textContent = target.textContent;
    tooltip.append(title);
    const entries = JSON.parse(target.dataset.flagHelp);
    for (const entry of entries) {
      const item = document.createElement("p");
      const label = document.createElement("span");
      label.className = "flag-tooltip-context";
      label.textContent = entry.context + " · " + entry.names.join(" / ");
      item.append(label, document.createTextNode(entry.description));
      tooltip.append(item);
    }
    target.setAttribute("aria-describedby", tooltip.id);
    target.setAttribute("aria-expanded", "true");
    // Dialogs modais ficam na top layer; o tooltip deve pertencer ao mesmo
    // dialog para continuar visível e acessível, inclusive quando há rolagem.
    (target.closest("dialog") || document.body).append(tooltip);
    tooltip.hidden = false;
    position();
  }
  function scheduleHide() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (
        active &&
        (active === document.activeElement ||
          active.matches(":hover") ||
          tooltip.matches(":hover"))
      )
        return;
      hide();
    }, 180);
  }
  document.addEventListener("pointerover", (event) => {
    const target = event.target.closest(".flag-token");
    if (
      target &&
      event.pointerType === "mouse" &&
      !target.contains(event.relatedTarget)
    )
      show(target, event);
    if (event.target.closest(".flag-tooltip")) clearTimeout(hideTimer);
  });
  document.addEventListener("pointerout", (event) => {
    if (event.target.closest(".flag-token,.flag-tooltip")) scheduleHide();
  });
  document.addEventListener("focusin", (event) => {
    if (event.target.matches(".flag-token")) show(event.target);
    else hide();
  });
  document.addEventListener("focusout", (event) => {
    if (event.target.matches(".flag-token")) scheduleHide();
  });
  document.addEventListener("click", (event) => {
    const target = event.target.closest(".flag-token");
    if (target) {
      // Não deixar o clique em uma flag abrir/fechar o <details> da referência.
      event.preventDefault();
      if (active !== target || tooltip.hidden) show(target);
    } else if (!event.target.closest(".flag-tooltip")) hide();
  });
  document.addEventListener(
    "keydown",
    (event) => {
      if (event.key === "Escape" && active) {
        event.preventDefault();
        event.stopImmediatePropagation();
        hide();
      } else if (
        event.target.matches(".flag-token") &&
        ["Enter", " "].includes(event.key)
      ) {
        event.preventDefault();
        event.stopImmediatePropagation();
        show(event.target);
      }
    },
    true,
  );
  document.addEventListener(
    "scroll",
    (event) => {
      if (!tooltip.contains(event.target)) hide();
    },
    true,
  );
  window.addEventListener("resize", hide);
  document.addEventListener("close", hide, true);
  window.addEventListener("beforeprint", hide);

  function annotate(root, context = "") {
    if (active && root.contains(active)) hide();
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
      acceptNode(node) {
        return node.parentElement.closest(
          ".flag-token,.flag-tooltip,script,style,textarea,input,.copy-button,.code-header,.code-bar,.print-deck,[data-no-flags]",
        )
          ? NodeFilter.FILTER_REJECT
          : NodeFilter.FILTER_ACCEPT;
      },
    });
    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    for (const node of nodes) {
      const matches = scan(
        node.textContent,
        node.parentElement.closest("[data-flag-context]")?.dataset
          .flagContext || context,
      );
      if (!matches.length) continue;
      const fragment = document.createDocumentFragment();
      let previous = 0;
      for (const match of matches) {
        fragment.append(
          document.createTextNode(
            node.textContent.slice(previous, match.start),
          ),
        );
        const token = document.createElement("span");
        token.className = "flag-token";
        token.textContent = match.flag;
        token.tabIndex = 0;
        token.setAttribute("role", "button");
        token.setAttribute("aria-label", "Explicar " + match.flag);
        token.setAttribute("aria-expanded", "false");
        token.dataset.flagHelp = JSON.stringify(match.entries);
        fragment.append(token);
        previous = match.end;
      }
      fragment.append(
        document.createTextNode(node.textContent.slice(previous)),
      );
      node.replaceWith(fragment);
    }
  }
  window.OFICINA_FLAGS.annotate = annotate;
  window.OFICINA_FLAGS.hide = hide;
})();
