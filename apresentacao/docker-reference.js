// Gerado por ferramentas/capturar_cli.py: somente help da CLI local.
window.OFICINA_DOCKER_VERSION = "Docker version 29.9.1, build dfc520dcc2 · Docker Compose version 5.6.0 · github.com/docker/buildx 0.38.0 0dbe87f36ed472fe36b6796c3f70b4210a731fc5";
window.OFICINA_DOCKER_REFERENCE_INFO = {
  "capturedAt": "2026-10-23T04:28:04+00:00",
  "versions": {
    "docker": "Docker version 29.9.1, build dfc520dcc2",
    "compose": "Docker Compose version 5.6.0",
    "buildx": "github.com/docker/buildx 0.38.0 0dbe87f36ed472fe36b6796c3f70b4210a731fc5"
  },
  "count": 307,
  "scope": "Comandos e aliases disponíveis nesta CLI local, incluindo Docker Engine, Compose e Buildx instalados. Plugins não instalados e comandos experimentais indisponíveis não estão incluídos.",
  "unavailable": [
    "docker checkpoint"
  ]
};
window.OFICINA_DOCKER_REFERENCE = [
  {
    "command": "docker",
    "description": "CLI do Docker",
    "help": "Usage:  docker [OPTIONS] COMMAND\n\nA self-sufficient runtime for containers\n\nCommon Commands:\n  run         Create and run a new container from an image\n  exec        Execute a command in a running container\n  ps          List containers\n  build       Build an image from a Dockerfile\n  bake        Build from a file\n  pull        Download an image from a registry\n  push        Upload an image to a registry\n  images      List images\n  login       Authenticate to a registry\n  logout      Log out from a registry\n  search      Search Docker Hub for images\n  version     Show the Docker version information\n  info        Display system-wide information\n\nManagement Commands:\n  builder     Manage builds\n  buildx*     Docker Buildx\n  compose*    Docker Compose\n  container   Manage containers\n  context     Manage contexts\n  image       Manage images\n  manifest    Manage Docker image manifests and manifest lists\n  network     Manage networks\n  plugin      Manage plugins\n  system      Manage Docker\n  volume      Manage volumes\n\nSwarm Commands:\n  swarm       Manage Swarm\n\nCommands:\n  attach      Attach local standard input, output, and error streams to a running container\n  commit      Create a new image from a container's changes\n  cp          Copy files/folders between a container and the local filesystem\n  create      Create a new container\n  diff        Inspect changes to files or directories on a container's filesystem\n  events      Get real time events from the server\n  export      Export a container's filesystem as a tar archive\n  history     Show the history of an image\n  import      Import the contents from a tarball to create a filesystem image\n  inspect     Return low-level information on Docker objects\n  kill        Kill one or more running containers\n  load        Load an image from a tar archive or STDIN\n  logs        Fetch the logs of a container\n  pause       Pause all processes within one or more containers\n  port        List port mappings or a specific mapping for the container\n  rename      Rename a container\n  restart     Restart one or more containers\n  rm          Remove one or more containers\n  rmi         Remove one or more images\n  save        Save one or more images to a tar archive (streamed to STDOUT by default)\n  start       Start one or more stopped containers\n  stats       Display a live stream of container(s) resource usage statistics\n  stop        Stop one or more running containers\n  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE\n  top         Display the running processes of a container\n  unpause     Unpause all processes within one or more containers\n  update      Update configuration of one or more containers\n  wait        Block until one or more containers stop, then print their exit codes\n\nGlobal Options:\n      --config string      Location of client config files (default\n                           \"$HOME/.docker\")\n  -c, --context string     Name of the context to use to connect to the\n                           daemon (overrides DOCKER_HOST env var and\n                           default context set with \"docker context use\")\n  -D, --debug              Enable debug mode\n  -H, --host string        Daemon socket to connect to\n  -l, --log-level string   Set the logging level (\"debug\", \"info\",\n                           \"warn\", \"error\", \"fatal\") (default \"info\")\n      --tls                Use TLS; implied by --tlsverify\n      --tlscacert string   Trust certs signed only by this CA (default\n                           \"$HOME/.docker/ca.pem\")\n      --tlscert string     Path to TLS certificate file (default\n                           \"$HOME/.docker/cert.pem\")\n      --tlskey string      Path to TLS key file (default\n                           \"$HOME/.docker/key.pem\")\n      --tlsverify          Use TLS and verify the remote\n  -v, --version            Print version information and quit\n\nRun 'docker COMMAND --help' for more information on a command.\n\nFor more help on how to use Docker, head to https://docs.docker.com/go/guides/\n",
    "flags": [
      "--config",
      "--context",
      "--debug",
      "--help",
      "--host",
      "--log-level",
      "--tls",
      "--tlscacert",
      "--tlscert",
      "--tlskey",
      "--tlsverify",
      "--version",
      "-D",
      "-H",
      "-c",
      "-l",
      "-v"
    ],
    "descriptionOriginal": "CLI Docker"
  },
  {
    "command": "docker attach",
    "description": "Conecta a entrada, a saída e os erros do terminal a um container em execução.",
    "help": "Usage:  docker attach [OPTIONS] CONTAINER\n\nAttach local standard input, output, and error streams to a running container\n\nAliases:\n  docker container attach, docker attach\n\nOptions:\n      --detach-keys string   Override the key sequence for detaching a\n                             container\n      --no-stdin             Do not attach STDIN\n      --sig-proxy            Proxy all received signals to the process\n                             (default true)\n",
    "flags": [
      "--detach-keys",
      "--help",
      "--no-stdin",
      "--sig-proxy"
    ],
    "descriptionOriginal": "Attach local standard input, output, and error streams to a running container"
  },
  {
    "command": "docker bake",
    "description": "Constrói imagens a partir de um arquivo de configuração.",
    "help": "Usage:  docker buildx bake [OPTIONS] [TARGET...]\n\nBuild from a file\n\nAliases:\n  docker buildx bake, docker buildx f\n\nOptions:\n      --allow stringArray      Allow build to access specified resources\n      --builder string         Override the configured builder instance\n                               (default \"default\")\n      --call string            Set method for evaluating build (\"check\",\n                               \"outline\", \"targets\") (default \"build\")\n      --check                  Shorthand for \"--call=check\"\n  -D, --debug                  Enable debug logging\n  -f, --file stringArray       Build definition file\n  -j, --jobs string            Set target execution behavior (format: \"N\"\n                               or \"mode[,parallel=N]\") (default \"fail-fast\")\n      --list string            List targets or variables\n      --load                   Shorthand for\n                               \"--set=*.output=type=docker\". Conditional.\n      --metadata-file string   Write build result metadata to a file\n      --no-cache               Do not use cache when building the image\n      --policy stringArray     Global policy evaluation options (format:\n                               \"[disabled=true|false][,strict=true|false][,log-level=level]\")\n      --print                  Print the options without building\n      --progress string        Set type of progress output (\"auto\",\n                               \"none\",  \"plain\", \"quiet\", \"rawjson\",\n                               \"tty\"). Use plain to show container output\n                               (default \"auto\")\n      --provenance string      Shorthand for \"--set=*.attest=type=provenance\"\n      --pull                   Always attempt to pull all referenced images\n      --push                   Shorthand for\n                               \"--set=*.output=type=registry\". Conditional.\n      --sbom string            Shorthand for \"--set=*.attest=type=sbom\"\n      --set stringArray        Override target value (e.g.,\n                               \"targetpattern.key=value\")\n      --var stringArray        Set a variable value (e.g., \"name=value\")\n",
    "flags": [
      "--allow",
      "--builder",
      "--call",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--jobs",
      "--list",
      "--load",
      "--metadata-file",
      "--no-cache",
      "--policy",
      "--print",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--sbom",
      "--set",
      "--var",
      "-D",
      "-f",
      "-j"
    ],
    "descriptionOriginal": "Build from a file"
  },
  {
    "command": "docker build",
    "description": "Constrói uma imagem a partir de um Dockerfile.",
    "help": "Usage:  docker buildx build [OPTIONS] PATH | URL | -\n\nStart a build\n\nAliases:\n  docker build, docker builder build, docker image build, docker buildx b\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder\n                                      instance (default \"default\")\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Build an image from a Dockerfile"
  },
  {
    "command": "docker builder",
    "description": "Gerencia construções de imagens.",
    "help": "Usage:  docker buildx [OPTIONS] COMMAND\n\nExtended build capabilities with BuildKit\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n\nManagement Commands:\n  dap         Start debug adapter protocol compatible debugger\n  history     Commands to work on build records\n  imagetools  Commands to work on images in registry\n  policy      Commands for working with build policies\n  replay      Replay a build from its provenance (EXPERIMENTAL)\n\nCommands:\n  bake        Build from a file\n  build       Start a build\n  create      Create a new builder instance\n  dial-stdio  Proxy current stdio streams to builder instance\n  du          Disk usage\n  inspect     Inspect current builder instance\n  ls          List builder instances\n  prune       Remove build cache\n  rm          Remove one or more builder instances\n  stop        Stop builder instance\n  use         Set the current builder instance\n  version     Show buildx version information\n\nRun 'docker buildx COMMAND --help' for more information on a command.\n\nExperimental commands and flags are hidden. Set BUILDX_EXPERIMENTAL=1 to show them.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Manage builds"
  },
  {
    "command": "docker buildx",
    "description": "Ferramentas de construção Docker Buildx.",
    "help": "Usage:  docker buildx [OPTIONS] COMMAND\n\nExtended build capabilities with BuildKit\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n\nManagement Commands:\n  dap         Start debug adapter protocol compatible debugger\n  history     Commands to work on build records\n  imagetools  Commands to work on images in registry\n  policy      Commands for working with build policies\n  replay      Replay a build from its provenance (EXPERIMENTAL)\n\nCommands:\n  bake        Build from a file\n  build       Start a build\n  create      Create a new builder instance\n  dial-stdio  Proxy current stdio streams to builder instance\n  du          Disk usage\n  inspect     Inspect current builder instance\n  ls          List builder instances\n  prune       Remove build cache\n  rm          Remove one or more builder instances\n  stop        Stop builder instance\n  use         Set the current builder instance\n  version     Show buildx version information\n\nRun 'docker buildx COMMAND --help' for more information on a command.\n\nExperimental commands and flags are hidden. Set BUILDX_EXPERIMENTAL=1 to show them.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Docker Buildx"
  },
  {
    "command": "docker commit",
    "description": "Cria uma imagem a partir das alterações de um container.",
    "help": "Usage:  docker commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]\n\nCreate a new image from a container's changes\n\nAliases:\n  docker container commit, docker commit\n\nOptions:\n  -a, --author string    Author (e.g., \"John Hannibal Smith\n                         <hannibal@a-team.com>\")\n  -c, --change list      Apply Dockerfile instruction to the created image\n  -m, --message string   Commit message\n      --no-pause         Disable pausing container during commit\n",
    "flags": [
      "--author",
      "--change",
      "--help",
      "--message",
      "--no-pause",
      "-a",
      "-c",
      "-m"
    ],
    "descriptionOriginal": "Create a new image from a container's changes"
  },
  {
    "command": "docker compose",
    "description": "Gerencia aplicações com Docker Compose.",
    "help": "Usage:  docker compose [OPTIONS] COMMAND\n\nDefine and run multi-container applications with Docker\n\nOptions:\n      --all-resources              Include all resources, even those not\n                                   used by services\n      --ansi string                Control when to print ANSI control\n                                   characters (\"never\"|\"always\"|\"auto\")\n                                   (default \"auto\")\n      --compatibility              Run compose in backward compatibility mode\n      --dry-run                    Execute command in dry run mode\n      --env-file stringArray       Specify an alternate environment file\n  -f, --file stringArray           Compose configuration files\n      --parallel int               Control max parallelism, -1 for\n                                   unlimited (default -1)\n      --profile stringArray        Specify a profile to enable\n      --progress string            Set type of progress output (auto,\n                                   tty, plain, json, quiet)\n      --project-directory string   Specify an alternate working directory\n                                   (default: the path of the, first\n                                   specified, Compose file)\n  -p, --project-name string        Project name\n\nManagement Commands:\n  bridge                  Convert compose files into another model\n\nCommands:\n  attach                  Attach local standard input, output, and error streams to a service's running container\n  build                   Build or rebuild services\n  commit                  Create a new image from a service container's changes\n  config                  Parse, resolve and render compose file in canonical format\n  cp                      Copy files/folders between a service container and the local filesystem\n  create                  Creates containers for a service\n  down                    Stop and remove containers, networks\n  events                  Receive real time events from containers\n  exec                    Execute a command in a running container\n  export                  Export a service container's filesystem as a tar archive\n  images                  List images used by the created containers\n  kill                    Force stop service containers\n  logs                    View output from containers\n  ls                      List running compose projects\n  pause                   Pause services\n  port                    List port mappings or print the public port for a specific mapping for the service\n  ps                      List containers\n  publish                 Publish compose application\n  pull                    Pull service images\n  push                    Push service images\n  restart                 Restart service containers\n  rm                      Removes stopped service containers\n  run                     Run a one-off command on a service\n  scale                   Scale services \n  start                   Start services\n  stats                   Display a live stream of container(s) resource usage statistics\n  stop                    Stop services\n  top                     Display the running processes\n  unpause                 Unpause services\n  up                      Create and start containers\n  version                 Show the Docker Compose version information\n  volumes                 List volumes\n  wait                    Block until containers of all (or specified) services stop.\n  watch                   Watch build context for service and rebuild/refresh containers when files are updated\n\nRun 'docker compose COMMAND --help' for more information on a command.\n",
    "flags": [
      "--all-resources",
      "--ansi",
      "--compatibility",
      "--dry-run",
      "--env-file",
      "--file",
      "--help",
      "--parallel",
      "--profile",
      "--progress",
      "--project-directory",
      "--project-name",
      "-f",
      "-p"
    ],
    "descriptionOriginal": "Docker Compose"
  },
  {
    "command": "docker config",
    "description": "Gerencia configurações do Swarm.",
    "help": "Usage:  docker config COMMAND\n\nManage Swarm configs\n\nCommands:\n  create      Create a config from a file or STDIN\n  inspect     Display detailed information on one or more configs\n  ls          List configs\n  rm          Remove one or more configs\n\nRun 'docker config COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm configs"
  },
  {
    "command": "docker container",
    "description": "Gerencia containers.",
    "help": "Usage:  docker container COMMAND\n\nManage containers\n\nCommands:\n  attach      Attach local standard input, output, and error streams to a running container\n  commit      Create a new image from a container's changes\n  cp          Copy files/folders between a container and the local filesystem\n  create      Create a new container\n  diff        Inspect changes to files or directories on a container's filesystem\n  exec        Execute a command in a running container\n  export      Export a container's filesystem as a tar archive\n  inspect     Display detailed information on one or more containers\n  kill        Kill one or more running containers\n  logs        Fetch the logs of a container\n  ls          List containers\n  pause       Pause all processes within one or more containers\n  port        List port mappings or a specific mapping for the container\n  prune       Remove all stopped containers\n  rename      Rename a container\n  restart     Restart one or more containers\n  rm          Remove one or more containers\n  run         Create and run a new container from an image\n  start       Start one or more stopped containers\n  stats       Display a live stream of container(s) resource usage statistics\n  stop        Stop one or more running containers\n  top         Display the running processes of a container\n  unpause     Unpause all processes within one or more containers\n  update      Update configuration of one or more containers\n  wait        Block until one or more containers stop, then print their exit codes\n\nRun 'docker container COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage containers"
  },
  {
    "command": "docker context",
    "description": "Gerencia contextos de conexão do Docker.",
    "help": "Usage:  docker context COMMAND\n\nManage contexts\n\nCommands:\n  create      Create a context\n  export      Export a context to a tar archive FILE or a tar stream on STDOUT.\n  import      Import a context from a tar or zip file\n  inspect     Display detailed information on one or more contexts\n  ls          List contexts\n  rm          Remove one or more contexts\n  show        Print the name of the current context\n  update      Update a context\n  use         Set the default docker context\n\nRun 'docker context COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage contexts"
  },
  {
    "command": "docker cp",
    "description": "Copia arquivos e pastas entre um container e o computador.",
    "help": "Usage:  docker cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-\n\tdocker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH\n\nCopy files/folders between a container and the local filesystem\n\nUse '-' as the source to read a tar archive from stdin\nand extract it to a directory destination in a container.\nUse '-' as the destination to stream a tar archive of a\ncontainer source to stdout.\n\nAliases:\n  docker container cp, docker cp\n\nOptions:\n  -a, --archive       Archive mode (copy all uid/gid information)\n  -L, --follow-link   Always follow symlinks in SRC_PATH\n  -q, --quiet         Suppress progress output during copy. Progress\n                      output is automatically suppressed if no terminal\n                      is attached\n",
    "flags": [
      "--archive",
      "--follow-link",
      "--help",
      "--quiet",
      "-L",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "Copy files/folders between a container and the local filesystem"
  },
  {
    "command": "docker create",
    "description": "Cria um container sem iniciá-lo.",
    "help": "Usage:  docker create [OPTIONS] IMAGE [COMMAND] [ARG...]\n\nCreate a new container\n\nAliases:\n  docker container create, docker create\n\nOptions:\n      --add-host list                    Add a custom host-to-IP mapping\n                                         (host:ip)\n      --annotation map                   Add an annotation to the\n                                         container (passed through to the\n                                         OCI runtime) (default map[])\n  -a, --attach list                      Attach to STDIN, STDOUT or STDERR\n      --blkio-weight uint16              Block IO (relative weight),\n                                         between 10 and 1000, or 0 to\n                                         disable (default 0)\n      --blkio-weight-device list         Block IO weight (relative device\n                                         weight) (default [])\n      --cap-add list                     Add Linux capabilities\n      --cap-drop list                    Drop Linux capabilities\n      --cgroup-parent string             Optional parent cgroup for the\n                                         container\n      --cgroupns string                  Cgroup namespace to use\n                                         (host|private)\n                                         'host':    Run the container in\n                                         the Docker host's cgroup\n                                         namespace\n                                         'private': Run the container in\n                                         its own private cgroup namespace\n                                         '':        Use the cgroup\n                                         namespace as configured by the\n                                                    default-cgroupns-mode\n                                         option on the daemon (default)\n      --cidfile string                   Write the container ID to the file\n      --cpu-period int                   Limit CPU CFS (Completely Fair\n                                         Scheduler) period\n      --cpu-quota int                    Limit CPU CFS (Completely Fair\n                                         Scheduler) quota\n      --cpu-rt-period int                Limit CPU real-time period in\n                                         microseconds\n      --cpu-rt-runtime int               Limit CPU real-time runtime in\n                                         microseconds\n  -c, --cpu-shares int                   CPU shares (relative weight)\n      --cpus decimal                     Number of CPUs\n      --cpuset-cpus string               CPUs in which to allow execution\n                                         (0-3, 0,1)\n      --cpuset-mems string               MEMs in which to allow execution\n                                         (0-3, 0,1)\n      --device list                      Add a host device to the container\n      --device-cgroup-rule list          Add a rule to the cgroup allowed\n                                         devices list\n      --device-read-bps list             Limit read rate (bytes per\n                                         second) from a device (default [])\n      --device-read-iops list            Limit read rate (IO per second)\n                                         from a device (default [])\n      --device-write-bps list            Limit write rate (bytes per\n                                         second) to a device (default [])\n      --device-write-iops list           Limit write rate (IO per second)\n                                         to a device (default [])\n      --dns list                         Set custom DNS servers\n      --dns-option list                  Set DNS options\n      --dns-search list                  Set custom DNS search domains\n      --domainname string                Container NIS domain name\n      --entrypoint string                Overwrite the default ENTRYPOINT\n                                         of the image\n  -e, --env list                         Set environment variables\n      --env-file list                    Read in a file of environment\n                                         variables\n      --expose list                      Expose a port or a range of ports\n      --gpus gpu-request                 GPU devices to add to the\n                                         container ('all' to pass all GPUs)\n      --group-add list                   Add additional groups to join\n      --health-cmd string                Command to run to check health\n      --health-interval duration         Time between running the check\n                                         (ms|s|m|h) (default 0s)\n      --health-retries int               Consecutive failures needed to\n                                         report unhealthy\n      --health-start-interval duration   Time between running the check\n                                         during the start period\n                                         (ms|s|m|h) (default 0s)\n      --health-start-period duration     Start period for the container\n                                         to initialize before starting\n                                         health-retries countdown\n                                         (ms|s|m|h) (default 0s)\n      --health-timeout duration          Maximum time to allow one check\n                                         to run (ms|s|m|h) (default 0s)\n      --help                             Print usage\n  -h, --hostname string                  Container host name\n      --init                             Run an init inside the container\n                                         that forwards signals and reaps\n                                         processes\n  -i, --interactive                      Keep STDIN open even if not attached\n      --ip ip                            IPv4 address (e.g., 172.30.100.104)\n      --ip6 ip                           IPv6 address (e.g., 2001:db8::33)\n      --ipc string                       IPC mode to use\n      --isolation string                 Container isolation technology\n  -l, --label list                       Set meta data on a container\n      --label-file list                  Read in a line delimited file of\n                                         labels\n      --link list                        Add link to another container\n      --link-local-ip list               Container IPv4/IPv6 link-local\n                                         addresses\n      --log-driver string                Logging driver for the container\n      --log-opt list                     Log driver options\n      --mac-address string               Container MAC address (e.g.,\n                                         92:d0:c6:0a:29:33)\n  -m, --memory bytes                     Memory limit\n      --memory-reservation bytes         Memory soft limit\n      --memory-swap bytes                Swap limit equal to memory plus\n                                         swap: '-1' to enable unlimited swap\n      --memory-swappiness int            Tune container memory swappiness\n                                         (0 to 100) (default -1)\n      --mount mount                      Attach a filesystem mount to the\n                                         container\n      --name string                      Assign a name to the container\n      --network network                  Connect a container to a network\n      --network-alias list               Add network-scoped alias for the\n                                         container\n      --no-healthcheck                   Disable any container-specified\n                                         HEALTHCHECK\n      --oom-kill-disable                 Disable OOM Killer\n      --oom-score-adj int                Tune host's OOM preferences\n                                         (-1000 to 1000)\n      --pid string                       PID namespace to use\n      --pids-limit int                   Tune container pids limit (set\n                                         -1 for unlimited)\n      --platform string                  Set platform if server is\n                                         multi-platform capable\n      --privileged                       Give extended privileges to this\n                                         container\n  -p, --publish list                     Publish a container's port(s) to\n                                         the host\n  -P, --publish-all                      Publish all exposed ports to\n                                         random ports\n      --pull string                      Pull image before creating\n                                         (\"always\", \"missing\", \"never\")\n                                         (default \"missing\")\n  -q, --quiet                            Suppress the pull output\n      --read-only                        Mount the container's root\n                                         filesystem as read only\n      --restart string                   Restart policy to apply when a\n                                         container exits (default \"no\")\n      --rm                               Automatically remove the\n                                         container and its associated\n                                         anonymous volumes when it exits\n      --runtime string                   Runtime to use for this container\n      --security-opt list                Security Options\n      --shm-size bytes                   Size of /dev/shm\n      --stop-signal string               Signal to stop the container\n      --stop-timeout int                 Timeout (in seconds) to stop a\n                                         container\n      --storage-opt list                 Storage driver options for the\n                                         container\n      --sysctl map                       Sysctl options (default map[])\n      --tmpfs list                       Mount a tmpfs directory\n  -t, --tty                              Allocate a pseudo-TTY\n      --ulimit ulimit                    Ulimit options (default [])\n      --umask umask                      Set umask for the container\n      --use-api-socket                   Bind mount Docker API socket and\n                                         required auth\n  -u, --user string                      Username or UID (format:\n                                         <name|uid>[:<group|gid>])\n      --userns string                    User namespace to use\n      --uts string                       UTS namespace to use\n  -v, --volume list                      Bind mount a volume\n      --volume-driver string             Optional volume driver for the\n                                         container\n      --volumes-from list                Mount volumes from the specified\n                                         container(s)\n  -w, --workdir string                   Working directory inside the\n                                         container\n",
    "flags": [
      "--add-host",
      "--annotation",
      "--attach",
      "--blkio-weight",
      "--blkio-weight-device",
      "--cap-add",
      "--cap-drop",
      "--cgroup-parent",
      "--cgroupns",
      "--cidfile",
      "--cpu-period",
      "--cpu-quota",
      "--cpu-rt-period",
      "--cpu-rt-runtime",
      "--cpu-shares",
      "--cpus",
      "--cpuset-cpus",
      "--cpuset-mems",
      "--device",
      "--device-cgroup-rule",
      "--device-read-bps",
      "--device-read-iops",
      "--device-write-bps",
      "--device-write-iops",
      "--dns",
      "--dns-option",
      "--dns-search",
      "--domainname",
      "--entrypoint",
      "--env",
      "--env-file",
      "--expose",
      "--gpus",
      "--group-add",
      "--health-cmd",
      "--health-interval",
      "--health-retries",
      "--health-start-interval",
      "--health-start-period",
      "--health-timeout",
      "--help",
      "--hostname",
      "--init",
      "--interactive",
      "--ip",
      "--ip6",
      "--ipc",
      "--isolation",
      "--label",
      "--label-file",
      "--link",
      "--link-local-ip",
      "--log-driver",
      "--log-opt",
      "--mac-address",
      "--memory",
      "--memory-reservation",
      "--memory-swap",
      "--memory-swappiness",
      "--mount",
      "--name",
      "--network",
      "--network-alias",
      "--no-healthcheck",
      "--oom-kill-disable",
      "--oom-score-adj",
      "--pid",
      "--pids-limit",
      "--platform",
      "--privileged",
      "--publish",
      "--publish-all",
      "--pull",
      "--quiet",
      "--read-only",
      "--restart",
      "--rm",
      "--runtime",
      "--security-opt",
      "--shm-size",
      "--stop-signal",
      "--stop-timeout",
      "--storage-opt",
      "--sysctl",
      "--tmpfs",
      "--tty",
      "--ulimit",
      "--umask",
      "--use-api-socket",
      "--user",
      "--userns",
      "--uts",
      "--volume",
      "--volume-driver",
      "--volumes-from",
      "--workdir",
      "-1",
      "-P",
      "-a",
      "-c",
      "-e",
      "-h",
      "-i",
      "-l",
      "-m",
      "-p",
      "-q",
      "-t",
      "-u",
      "-v",
      "-w"
    ],
    "descriptionOriginal": "Create a new container"
  },
  {
    "command": "docker diff",
    "description": "Mostra alterações em arquivos e pastas do filesystem do container.",
    "help": "Usage:  docker diff CONTAINER\n\nInspect changes to files or directories on a container's filesystem\n\nAliases:\n  docker container diff, docker diff\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Inspect changes to files or directories on a container's filesystem"
  },
  {
    "command": "docker events",
    "description": "Recebe eventos do Docker em tempo real.",
    "help": "Usage:  docker events [OPTIONS]\n\nGet real time events from the server\n\nAliases:\n  docker system events, docker events\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --since string    Show all events created since timestamp\n      --until string    Stream events until this timestamp\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--since",
      "--until",
      "-f"
    ],
    "descriptionOriginal": "Get real time events from the server"
  },
  {
    "command": "docker exec",
    "description": "Executa um comando em um container que já está rodando.",
    "help": "Usage:  docker exec [OPTIONS] CONTAINER COMMAND [ARG...]\n\nExecute a command in a running container\n\nAliases:\n  docker container exec, docker exec\n\nOptions:\n  -d, --detach               Detached mode: run command in the background\n      --detach-keys string   Override the key sequence for detaching a\n                             container\n  -e, --env list             Set environment variables\n      --env-file list        Read in a file of environment variables\n  -i, --interactive          Keep STDIN open even if not attached\n      --privileged           Give extended privileges to the command\n  -t, --tty                  Allocate a pseudo-TTY\n  -u, --user string          Username or UID (format:\n                             \"<name|uid>[:<group|gid>]\")\n  -w, --workdir string       Working directory inside the container\n",
    "flags": [
      "--detach",
      "--detach-keys",
      "--env",
      "--env-file",
      "--help",
      "--interactive",
      "--privileged",
      "--tty",
      "--user",
      "--workdir",
      "-d",
      "-e",
      "-i",
      "-t",
      "-u",
      "-w"
    ],
    "descriptionOriginal": "Execute a command in a running container"
  },
  {
    "command": "docker export",
    "description": "Exporta o filesystem de um container para um arquivo tar.",
    "help": "Usage:  docker export [OPTIONS] CONTAINER\n\nExport a container's filesystem as a tar archive\n\nAliases:\n  docker container export, docker export\n\nOptions:\n  -o, --output string   Write to a file, instead of STDOUT\n",
    "flags": [
      "--help",
      "--output",
      "-o"
    ],
    "descriptionOriginal": "Export a container's filesystem as a tar archive"
  },
  {
    "command": "docker help",
    "description": "Mostra a ajuda de um comando.",
    "help": "Usage:  docker help [command]\n\nHelp about the command\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Help about the command"
  },
  {
    "command": "docker history",
    "description": "Mostra o histórico de uma imagem.",
    "help": "Usage:  docker history [OPTIONS] IMAGE\n\nShow the history of an image\n\nAliases:\n  docker image history, docker history\n\nOptions:\n      --format string     Format output using a custom template:\n                          'table':            Print output in table\n                          format with column headers (default)\n                          'table TEMPLATE':   Print output in table\n                          format using the given Go template\n                          'json':             Print in JSON format\n                          'TEMPLATE':         Print output using the\n                          given Go template.\n                          Refer to https://docs.docker.com/go/formatting/\n                          for more information about formatting output\n                          with templates\n  -H, --human             Print sizes and dates in human readable format\n                          (default true)\n      --no-trunc          Don't truncate output\n      --platform string   Show history for the given platform. Formatted\n                          as \"os[/arch[/variant]]\" (e.g., \"linux/amd64\")\n  -q, --quiet             Only show image IDs\n",
    "flags": [
      "--format",
      "--help",
      "--human",
      "--no-trunc",
      "--platform",
      "--quiet",
      "-H",
      "-q"
    ],
    "descriptionOriginal": "Show the history of an image"
  },
  {
    "command": "docker image",
    "description": "Gerencia imagens.",
    "help": "Usage:  docker image COMMAND\n\nManage images\n\nCommands:\n  build       Build an image from a Dockerfile\n  history     Show the history of an image\n  import      Import the contents from a tarball to create a filesystem image\n  inspect     Display detailed information on one or more images\n  load        Load an image from a tar archive or STDIN\n  ls          List images\n  prune       Remove unused images\n  pull        Download an image from a registry\n  push        Upload an image to a registry\n  rm          Remove one or more images\n  save        Save one or more images to a tar archive (streamed to STDOUT by default)\n  tag         Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE\n\nRun 'docker image COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage images"
  },
  {
    "command": "docker images",
    "description": "Lista imagens locais.",
    "help": "Usage:  docker images [OPTIONS] [REPOSITORY[:TAG]]\n\nList images\n\nAliases:\n  docker image ls, docker image list, docker images\n\nOptions:\n  -a, --all             Show all images (default hides intermediate and\n                        dangling images)\n      --digests         Show digests\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only show image IDs\n      --tree            List multi-platform images as a tree (EXPERIMENTAL)\n",
    "flags": [
      "--all",
      "--digests",
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "--tree",
      "-a",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List images"
  },
  {
    "command": "docker import",
    "description": "Cria uma imagem de filesystem a partir de um arquivo tar.",
    "help": "Usage:  docker import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]\n\nImport the contents from a tarball to create a filesystem image\n\nAliases:\n  docker image import, docker import\n\nOptions:\n  -c, --change list       Apply Dockerfile instruction to the created image\n  -m, --message string    Set commit message for imported image\n      --platform string   Set platform if server is multi-platform capable\n",
    "flags": [
      "--change",
      "--help",
      "--message",
      "--platform",
      "-c",
      "-m"
    ],
    "descriptionOriginal": "Import the contents from a tarball to create a filesystem image"
  },
  {
    "command": "docker info",
    "description": "Mostra informações do ambiente Docker.",
    "help": "Usage:  docker info [OPTIONS]\n\nDisplay system-wide information\n\nAliases:\n  docker system info, docker info\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Display system-wide information"
  },
  {
    "command": "docker inspect",
    "description": "Mostra informações detalhadas dos objetos do Docker.",
    "help": "Usage:  docker inspect [OPTIONS] NAME|ID [NAME|ID...]\n\nReturn low-level information on Docker objects\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -s, --size            Display total file sizes if the type is container\n      --type string     Only inspect objects of the given type\n",
    "flags": [
      "--format",
      "--help",
      "--size",
      "--type",
      "-f",
      "-s"
    ],
    "descriptionOriginal": "Return low-level information on Docker objects"
  },
  {
    "command": "docker kill",
    "description": "Envia um sinal a um ou mais containers em execução.",
    "help": "Usage:  docker kill [OPTIONS] CONTAINER [CONTAINER...]\n\nKill one or more running containers\n\nAliases:\n  docker container kill, docker kill\n\nOptions:\n  -s, --signal string   Signal to send to the container\n",
    "flags": [
      "--help",
      "--signal",
      "-s"
    ],
    "descriptionOriginal": "Kill one or more running containers"
  },
  {
    "command": "docker load",
    "description": "Carrega uma imagem de um arquivo tar ou da entrada padrão.",
    "help": "Usage:  docker load [OPTIONS]\n\nLoad an image from a tar archive or STDIN\n\nAliases:\n  docker image load, docker load\n\nOptions:\n  -i, --input string       Read from tar archive file, instead of STDIN\n      --platform strings   Load only the given platform(s). Formatted as\n                           a comma-separated list of\n                           \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64,linux/arm64/v8\").\n  -q, --quiet              Suppress the load output\n",
    "flags": [
      "--help",
      "--input",
      "--platform",
      "--quiet",
      "-i",
      "-q"
    ],
    "descriptionOriginal": "Load an image from a tar archive or STDIN"
  },
  {
    "command": "docker login",
    "description": "Autentica em um registry de imagens.",
    "help": "Usage:  docker login [OPTIONS] [SERVER]\n\nAuthenticate to a registry.\nDefaults to Docker Hub if no server is specified.\n\nOptions:\n  -p, --password string   Password or Personal Access Token (PAT), or \"-\"\n                          to read from stdin\n      --password-stdin    Take the Password or Personal Access Token\n                          (PAT) from stdin\n  -u, --username string   Username\n",
    "flags": [
      "--help",
      "--password",
      "--password-stdin",
      "--username",
      "-p",
      "-u"
    ],
    "descriptionOriginal": "Authenticate to a registry"
  },
  {
    "command": "docker logout",
    "description": "Encerra a autenticação em um registry.",
    "help": "Usage:  docker logout [SERVER]\n\nLog out from a registry.\nIf no server is specified, the default is defined by the daemon.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Log out from a registry"
  },
  {
    "command": "docker logs",
    "description": "Mostra os logs de um container.",
    "help": "Usage:  docker logs [OPTIONS] CONTAINER\n\nFetch the logs of a container\n\nAliases:\n  docker container logs, docker logs\n\nOptions:\n      --details        Show extra details provided to logs\n  -f, --follow         Follow log output\n      --since string   Show logs since timestamp (e.g.\n                       \"2013-01-02T13:23:37Z\") or relative (e.g. \"42m\"\n                       for 42 minutes)\n  -n, --tail string    Number of lines to show from the end of the logs\n                       (default \"all\")\n  -t, --timestamps     Show timestamps\n      --until string   Show logs before a timestamp (e.g.\n                       \"2013-01-02T13:23:37Z\") or relative (e.g. \"42m\"\n                       for 42 minutes)\n",
    "flags": [
      "--details",
      "--follow",
      "--help",
      "--since",
      "--tail",
      "--timestamps",
      "--until",
      "-f",
      "-n",
      "-t"
    ],
    "descriptionOriginal": "Fetch the logs of a container"
  },
  {
    "command": "docker manifest",
    "description": "Gerencia manifestos de imagens e listas de manifestos.",
    "help": "Usage:  docker manifest COMMAND\n\nThe **docker manifest** command has subcommands for managing image manifests and\nmanifest lists. A manifest list allows you to use one name to refer to the same image\nbuilt for multiple architectures.\n\nTo see help for a subcommand, use:\n\n    docker manifest CMD --help\n\nFor full details on using docker manifest lists, see the registry v2 specification.\n\nEXPERIMENTAL:\n  docker manifest is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nCommands:\n  annotate    Add additional information to a local image manifest\n  create      Create a local manifest list for annotating and pushing to a registry\n  inspect     Display an image manifest, or manifest list\n  push        Push a manifest list to a repository\n  rm          Delete one or more manifest lists from local storage\n\nRun 'docker manifest COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Docker image manifests and manifest lists"
  },
  {
    "command": "docker network",
    "description": "Gerencia redes.",
    "help": "Usage:  docker network COMMAND\n\nManage networks\n\nCommands:\n  connect     Connect a container to a network\n  create      Create a network\n  disconnect  Disconnect a container from a network\n  inspect     Display detailed information on one or more networks\n  ls          List networks\n  prune       Remove all unused networks\n  rm          Remove one or more networks\n\nRun 'docker network COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage networks"
  },
  {
    "command": "docker node",
    "description": "Gerencia nós do Swarm.",
    "help": "Usage:  docker node COMMAND\n\nManage Swarm nodes\n\nCommands:\n  demote      Demote one or more nodes from manager in the swarm\n  inspect     Display detailed information on one or more nodes\n  ls          List nodes in the swarm\n  promote     Promote one or more nodes to manager in the swarm\n  ps          List tasks running on one or more nodes, defaults to current node\n  rm          Remove one or more nodes from the swarm\n  update      Update a node\n\nRun 'docker node COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm nodes"
  },
  {
    "command": "docker pause",
    "description": "Pausa todos os processos de um ou mais containers.",
    "help": "Usage:  docker pause CONTAINER [CONTAINER...]\n\nPause all processes within one or more containers\n\nAliases:\n  docker container pause, docker pause\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Pause all processes within one or more containers"
  },
  {
    "command": "docker plugin",
    "description": "Gerencia plugins.",
    "help": "Usage:  docker plugin COMMAND\n\nManage plugins\n\nCommands:\n  create      Create a plugin from a rootfs and configuration. Plugin data directory must contain config.json and rootfs directory.\n  disable     Disable a plugin\n  enable      Enable a plugin\n  inspect     Display detailed information on one or more plugins\n  install     Install a plugin\n  ls          List plugins\n  push        Push a plugin to a registry\n  rm          Remove one or more plugins\n  set         Change settings for a plugin\n  upgrade     Upgrade an existing plugin\n\nRun 'docker plugin COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage plugins"
  },
  {
    "command": "docker port",
    "description": "Lista as portas publicadas de um container.",
    "help": "Usage:  docker port CONTAINER [PRIVATE_PORT[/PROTO]]\n\nList port mappings or a specific mapping for the container\n\nAliases:\n  docker container port, docker port\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "List port mappings or a specific mapping for the container"
  },
  {
    "command": "docker ps",
    "description": "Lista containers.",
    "help": "Usage:  docker ps [OPTIONS]\n\nList containers\n\nAliases:\n  docker container ls, docker container list, docker container ps, docker ps\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -n, --last int        Show n last created containers (includes all\n                        states) (default -1)\n  -l, --latest          Show the latest created container (includes all\n                        states)\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only display container IDs\n  -s, --size            Display total file sizes\n",
    "flags": [
      "--all",
      "--filter",
      "--format",
      "--help",
      "--last",
      "--latest",
      "--no-trunc",
      "--quiet",
      "--size",
      "-a",
      "-f",
      "-l",
      "-n",
      "-q",
      "-s"
    ],
    "descriptionOriginal": "List containers"
  },
  {
    "command": "docker pull",
    "description": "Baixa uma imagem de um registry.",
    "help": "Usage:  docker pull [OPTIONS] NAME[:TAG|@DIGEST]\n\nDownload an image from a registry\n\nAliases:\n  docker image pull, docker pull\n\nOptions:\n  -a, --all-tags          Download all tagged images in the repository\n      --platform string   Set platform if server is multi-platform capable\n  -q, --quiet             Suppress verbose output\n",
    "flags": [
      "--all-tags",
      "--help",
      "--platform",
      "--quiet",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "Download an image from a registry"
  },
  {
    "command": "docker push",
    "description": "Envia uma imagem para um registry.",
    "help": "Usage:  docker push [OPTIONS] NAME[:TAG]\n\nUpload an image to a registry\n\nAliases:\n  docker image push, docker push\n\nOptions:\n  -a, --all-tags          Push all tags of an image to the repository\n      --platform string   Push a platform-specific manifest as a\n                          single-platform image to the registry.\n                          Image index won't be pushed, meaning that other\n                          manifests, including attestations won't be\n                          preserved.\n                          'os[/arch[/variant]]': Explicit platform (eg.\n                          linux/amd64)\n  -q, --quiet             Suppress verbose output\n",
    "flags": [
      "--all-tags",
      "--help",
      "--platform",
      "--quiet",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "Upload an image to a registry"
  },
  {
    "command": "docker rename",
    "description": "Renomeia um container.",
    "help": "Usage:  docker rename CONTAINER NEW_NAME\n\nRename a container\n\nAliases:\n  docker container rename, docker rename\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Rename a container"
  },
  {
    "command": "docker restart",
    "description": "Reinicia um ou mais containers.",
    "help": "Usage:  docker restart [OPTIONS] CONTAINER [CONTAINER...]\n\nRestart one or more containers\n\nAliases:\n  docker container restart, docker restart\n\nOptions:\n  -s, --signal string   Signal to send to the container\n  -t, --timeout int     Seconds to wait before killing the container\n",
    "flags": [
      "--help",
      "--signal",
      "--timeout",
      "-s",
      "-t"
    ],
    "descriptionOriginal": "Restart one or more containers"
  },
  {
    "command": "docker rm",
    "description": "Remove um ou mais containers.",
    "help": "Usage:  docker rm [OPTIONS] CONTAINER [CONTAINER...]\n\nRemove one or more containers\n\nAliases:\n  docker container rm, docker container remove, docker rm\n\nOptions:\n  -f, --force     Force the removal of a running container (uses SIGKILL)\n  -l, --link      Remove the specified link\n  -v, --volumes   Remove anonymous volumes associated with the container\n",
    "flags": [
      "--force",
      "--help",
      "--link",
      "--volumes",
      "-f",
      "-l",
      "-v"
    ],
    "descriptionOriginal": "Remove one or more containers"
  },
  {
    "command": "docker rmi",
    "description": "Remove uma ou mais imagens.",
    "help": "Usage:  docker rmi [OPTIONS] IMAGE [IMAGE...]\n\nRemove one or more images\n\nAliases:\n  docker image rm, docker image remove, docker rmi\n\nOptions:\n  -f, --force              Force removal of the image\n      --no-prune           Do not delete untagged parents\n      --platform strings   Remove only the given platform variant.\n                           Formatted as \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64\")\n",
    "flags": [
      "--force",
      "--help",
      "--no-prune",
      "--platform",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more images"
  },
  {
    "command": "docker run",
    "description": "Cria e inicia um container a partir de uma imagem.",
    "help": "Usage:  docker run [OPTIONS] IMAGE [COMMAND] [ARG...]\n\nCreate and run a new container from an image\n\nAliases:\n  docker container run, docker run\n\nOptions:\n      --add-host list                    Add a custom host-to-IP mapping\n                                         (host:ip)\n      --annotation map                   Add an annotation to the\n                                         container (passed through to the\n                                         OCI runtime) (default map[])\n  -a, --attach list                      Attach to STDIN, STDOUT or STDERR\n      --blkio-weight uint16              Block IO (relative weight),\n                                         between 10 and 1000, or 0 to\n                                         disable (default 0)\n      --blkio-weight-device list         Block IO weight (relative device\n                                         weight) (default [])\n      --cap-add list                     Add Linux capabilities\n      --cap-drop list                    Drop Linux capabilities\n      --cgroup-parent string             Optional parent cgroup for the\n                                         container\n      --cgroupns string                  Cgroup namespace to use\n                                         (host|private)\n                                         'host':    Run the container in\n                                         the Docker host's cgroup\n                                         namespace\n                                         'private': Run the container in\n                                         its own private cgroup namespace\n                                         '':        Use the cgroup\n                                         namespace as configured by the\n                                                    default-cgroupns-mode\n                                         option on the daemon (default)\n      --cidfile string                   Write the container ID to the file\n      --cpu-period int                   Limit CPU CFS (Completely Fair\n                                         Scheduler) period\n      --cpu-quota int                    Limit CPU CFS (Completely Fair\n                                         Scheduler) quota\n      --cpu-rt-period int                Limit CPU real-time period in\n                                         microseconds\n      --cpu-rt-runtime int               Limit CPU real-time runtime in\n                                         microseconds\n  -c, --cpu-shares int                   CPU shares (relative weight)\n      --cpus decimal                     Number of CPUs\n      --cpuset-cpus string               CPUs in which to allow execution\n                                         (0-3, 0,1)\n      --cpuset-mems string               MEMs in which to allow execution\n                                         (0-3, 0,1)\n  -d, --detach                           Run container in background and\n                                         print container ID\n      --detach-keys string               Override the key sequence for\n                                         detaching a container\n      --device list                      Add a host device to the container\n      --device-cgroup-rule list          Add a rule to the cgroup allowed\n                                         devices list\n      --device-read-bps list             Limit read rate (bytes per\n                                         second) from a device (default [])\n      --device-read-iops list            Limit read rate (IO per second)\n                                         from a device (default [])\n      --device-write-bps list            Limit write rate (bytes per\n                                         second) to a device (default [])\n      --device-write-iops list           Limit write rate (IO per second)\n                                         to a device (default [])\n      --dns list                         Set custom DNS servers\n      --dns-option list                  Set DNS options\n      --dns-search list                  Set custom DNS search domains\n      --domainname string                Container NIS domain name\n      --entrypoint string                Overwrite the default ENTRYPOINT\n                                         of the image\n  -e, --env list                         Set environment variables\n      --env-file list                    Read in a file of environment\n                                         variables\n      --expose list                      Expose a port or a range of ports\n      --gpus gpu-request                 GPU devices to add to the\n                                         container ('all' to pass all GPUs)\n      --group-add list                   Add additional groups to join\n      --health-cmd string                Command to run to check health\n      --health-interval duration         Time between running the check\n                                         (ms|s|m|h) (default 0s)\n      --health-retries int               Consecutive failures needed to\n                                         report unhealthy\n      --health-start-interval duration   Time between running the check\n                                         during the start period\n                                         (ms|s|m|h) (default 0s)\n      --health-start-period duration     Start period for the container\n                                         to initialize before starting\n                                         health-retries countdown\n                                         (ms|s|m|h) (default 0s)\n      --health-timeout duration          Maximum time to allow one check\n                                         to run (ms|s|m|h) (default 0s)\n      --help                             Print usage\n  -h, --hostname string                  Container host name\n      --init                             Run an init inside the container\n                                         that forwards signals and reaps\n                                         processes\n  -i, --interactive                      Keep STDIN open even if not attached\n      --ip ip                            IPv4 address (e.g., 172.30.100.104)\n      --ip6 ip                           IPv6 address (e.g., 2001:db8::33)\n      --ipc string                       IPC mode to use\n      --isolation string                 Container isolation technology\n  -l, --label list                       Set meta data on a container\n      --label-file list                  Read in a line delimited file of\n                                         labels\n      --link list                        Add link to another container\n      --link-local-ip list               Container IPv4/IPv6 link-local\n                                         addresses\n      --log-driver string                Logging driver for the container\n      --log-opt list                     Log driver options\n      --mac-address string               Container MAC address (e.g.,\n                                         92:d0:c6:0a:29:33)\n  -m, --memory bytes                     Memory limit\n      --memory-reservation bytes         Memory soft limit\n      --memory-swap bytes                Swap limit equal to memory plus\n                                         swap: '-1' to enable unlimited swap\n      --memory-swappiness int            Tune container memory swappiness\n                                         (0 to 100) (default -1)\n      --mount mount                      Attach a filesystem mount to the\n                                         container\n      --name string                      Assign a name to the container\n      --network network                  Connect a container to a network\n      --network-alias list               Add network-scoped alias for the\n                                         container\n      --no-healthcheck                   Disable any container-specified\n                                         HEALTHCHECK\n      --oom-kill-disable                 Disable OOM Killer\n      --oom-score-adj int                Tune host's OOM preferences\n                                         (-1000 to 1000)\n      --pid string                       PID namespace to use\n      --pids-limit int                   Tune container pids limit (set\n                                         -1 for unlimited)\n      --platform string                  Set platform if server is\n                                         multi-platform capable\n      --privileged                       Give extended privileges to this\n                                         container\n  -p, --publish list                     Publish a container's port(s) to\n                                         the host\n  -P, --publish-all                      Publish all exposed ports to\n                                         random ports\n      --pull string                      Pull image before running\n                                         (\"always\", \"missing\", \"never\")\n                                         (default \"missing\")\n  -q, --quiet                            Suppress the pull output\n      --read-only                        Mount the container's root\n                                         filesystem as read only\n      --restart string                   Restart policy to apply when a\n                                         container exits (default \"no\")\n      --rm                               Automatically remove the\n                                         container and its associated\n                                         anonymous volumes when it exits\n      --runtime string                   Runtime to use for this container\n      --security-opt list                Security Options\n      --shm-size bytes                   Size of /dev/shm\n      --sig-proxy                        Proxy received signals to the\n                                         process (default true)\n      --stop-signal string               Signal to stop the container\n      --stop-timeout int                 Timeout (in seconds) to stop a\n                                         container\n      --storage-opt list                 Storage driver options for the\n                                         container\n      --sysctl map                       Sysctl options (default map[])\n      --tmpfs list                       Mount a tmpfs directory\n  -t, --tty                              Allocate a pseudo-TTY\n      --ulimit ulimit                    Ulimit options (default [])\n      --umask umask                      Set umask for the container\n      --use-api-socket                   Bind mount Docker API socket and\n                                         required auth\n  -u, --user string                      Username or UID (format:\n                                         <name|uid>[:<group|gid>])\n      --userns string                    User namespace to use\n      --uts string                       UTS namespace to use\n  -v, --volume list                      Bind mount a volume\n      --volume-driver string             Optional volume driver for the\n                                         container\n      --volumes-from list                Mount volumes from the specified\n                                         container(s)\n  -w, --workdir string                   Working directory inside the\n                                         container\n",
    "flags": [
      "--add-host",
      "--annotation",
      "--attach",
      "--blkio-weight",
      "--blkio-weight-device",
      "--cap-add",
      "--cap-drop",
      "--cgroup-parent",
      "--cgroupns",
      "--cidfile",
      "--cpu-period",
      "--cpu-quota",
      "--cpu-rt-period",
      "--cpu-rt-runtime",
      "--cpu-shares",
      "--cpus",
      "--cpuset-cpus",
      "--cpuset-mems",
      "--detach",
      "--detach-keys",
      "--device",
      "--device-cgroup-rule",
      "--device-read-bps",
      "--device-read-iops",
      "--device-write-bps",
      "--device-write-iops",
      "--dns",
      "--dns-option",
      "--dns-search",
      "--domainname",
      "--entrypoint",
      "--env",
      "--env-file",
      "--expose",
      "--gpus",
      "--group-add",
      "--health-cmd",
      "--health-interval",
      "--health-retries",
      "--health-start-interval",
      "--health-start-period",
      "--health-timeout",
      "--help",
      "--hostname",
      "--init",
      "--interactive",
      "--ip",
      "--ip6",
      "--ipc",
      "--isolation",
      "--label",
      "--label-file",
      "--link",
      "--link-local-ip",
      "--log-driver",
      "--log-opt",
      "--mac-address",
      "--memory",
      "--memory-reservation",
      "--memory-swap",
      "--memory-swappiness",
      "--mount",
      "--name",
      "--network",
      "--network-alias",
      "--no-healthcheck",
      "--oom-kill-disable",
      "--oom-score-adj",
      "--pid",
      "--pids-limit",
      "--platform",
      "--privileged",
      "--publish",
      "--publish-all",
      "--pull",
      "--quiet",
      "--read-only",
      "--restart",
      "--rm",
      "--runtime",
      "--security-opt",
      "--shm-size",
      "--sig-proxy",
      "--stop-signal",
      "--stop-timeout",
      "--storage-opt",
      "--sysctl",
      "--tmpfs",
      "--tty",
      "--ulimit",
      "--umask",
      "--use-api-socket",
      "--user",
      "--userns",
      "--uts",
      "--volume",
      "--volume-driver",
      "--volumes-from",
      "--workdir",
      "-1",
      "-P",
      "-a",
      "-c",
      "-d",
      "-e",
      "-h",
      "-i",
      "-l",
      "-m",
      "-p",
      "-q",
      "-t",
      "-u",
      "-v",
      "-w"
    ],
    "descriptionOriginal": "Create and run a new container from an image"
  },
  {
    "command": "docker save",
    "description": "Salva imagens em um arquivo tar; por padrão, escreve na saída padrão.",
    "help": "Usage:  docker save [OPTIONS] IMAGE [IMAGE...]\n\nSave one or more images to a tar archive (streamed to STDOUT by default)\n\nAliases:\n  docker image save, docker save\n\nOptions:\n  -o, --output string      Write to a file, instead of STDOUT\n      --platform strings   Save only the given platform(s). Formatted as\n                           a comma-separated list of\n                           \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64,linux/arm64/v8\")\n",
    "flags": [
      "--help",
      "--output",
      "--platform",
      "-o"
    ],
    "descriptionOriginal": "Save one or more images to a tar archive (streamed to STDOUT by default)"
  },
  {
    "command": "docker search",
    "description": "Pesquisa imagens no Docker Hub.",
    "help": "Usage:  docker search [OPTIONS] TERM\n\nSearch Docker Hub for images\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Pretty-print search using a Go template\n      --limit int       Max number of search results\n      --no-trunc        Don't truncate output\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--limit",
      "--no-trunc",
      "-f"
    ],
    "descriptionOriginal": "Search Docker Hub for images"
  },
  {
    "command": "docker secret",
    "description": "Gerencia segredos do Swarm.",
    "help": "Usage:  docker secret COMMAND\n\nManage Swarm secrets\n\nCommands:\n  create      Create a secret from a file or STDIN as content\n  inspect     Display detailed information on one or more secrets\n  ls          List secrets\n  rm          Remove one or more secrets\n\nRun 'docker secret COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm secrets"
  },
  {
    "command": "docker service",
    "description": "Gerencia serviços do Swarm.",
    "help": "Usage:  docker service COMMAND\n\nManage Swarm services\n\nCommands:\n  create      Create a new service\n  inspect     Display detailed information on one or more services\n  logs        Fetch the logs of a service or task\n  ls          List services\n  ps          List the tasks of one or more services\n  rm          Remove one or more services\n  rollback    Revert changes to a service's configuration\n  scale       Scale one or multiple replicated services\n  update      Update a service\n\nRun 'docker service COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm services"
  },
  {
    "command": "docker stack",
    "description": "Gerencia conjuntos de serviços (stacks) do Swarm.",
    "help": "Usage:  docker stack COMMAND\n\nManage Swarm stacks\n\nCommands:\n  config      Outputs the final config file, after doing merges and interpolations\n  deploy      Deploy a new stack or update an existing stack\n  ls          List stacks\n  ps          List the tasks in the stack\n  rm          Remove one or more stacks\n  services    List the services in the stack\n\nRun 'docker stack COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm stacks"
  },
  {
    "command": "docker start",
    "description": "Inicia um ou mais containers parados.",
    "help": "Usage:  docker start [OPTIONS] CONTAINER [CONTAINER...]\n\nStart one or more stopped containers\n\nAliases:\n  docker container start, docker start\n\nOptions:\n  -a, --attach               Attach STDOUT/STDERR and forward signals\n      --detach-keys string   Override the key sequence for detaching a\n                             container\n  -i, --interactive          Attach container's STDIN\n",
    "flags": [
      "--attach",
      "--detach-keys",
      "--help",
      "--interactive",
      "-a",
      "-i"
    ],
    "descriptionOriginal": "Start one or more stopped containers"
  },
  {
    "command": "docker stats",
    "description": "Mostra o uso de recursos dos containers em tempo real.",
    "help": "Usage:  docker stats [OPTIONS] [CONTAINER...]\n\nDisplay a live stream of container(s) resource usage statistics\n\nAliases:\n  docker container stats, docker stats\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-stream       Disable streaming stats and only pull the first result\n      --no-trunc        Do not truncate output\n",
    "flags": [
      "--all",
      "--format",
      "--help",
      "--no-stream",
      "--no-trunc",
      "-a"
    ],
    "descriptionOriginal": "Display a live stream of container(s) resource usage statistics"
  },
  {
    "command": "docker stop",
    "description": "Solicita a parada de um ou mais containers em execução.",
    "help": "Usage:  docker stop [OPTIONS] CONTAINER [CONTAINER...]\n\nStop one or more running containers\n\nAliases:\n  docker container stop, docker stop\n\nOptions:\n  -s, --signal string   Signal to send to the container\n  -t, --timeout int     Seconds to wait before killing the container\n",
    "flags": [
      "--help",
      "--signal",
      "--timeout",
      "-s",
      "-t"
    ],
    "descriptionOriginal": "Stop one or more running containers"
  },
  {
    "command": "docker swarm",
    "description": "Gerencia o Swarm.",
    "help": "Usage:  docker swarm COMMAND\n\nManage Swarm\n\nCommands:\n  init        Initialize a swarm\n  join        Join a swarm as a node and/or manager\n\nRun 'docker swarm COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm"
  },
  {
    "command": "docker system",
    "description": "Gerencia recursos do Docker.",
    "help": "Usage:  docker system COMMAND\n\nManage Docker\n\nCommands:\n  df          Show docker disk usage\n  events      Get real time events from the server\n  info        Display system-wide information\n  prune       Remove unused data\n\nRun 'docker system COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Docker"
  },
  {
    "command": "docker tag",
    "description": "Cria uma tag de destino que referencia uma imagem de origem.",
    "help": "Usage:  docker tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]\n\nCreate a tag TARGET_IMAGE that refers to SOURCE_IMAGE\n\nAliases:\n  docker image tag, docker tag\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE"
  },
  {
    "command": "docker top",
    "description": "Lista os processos em execução de um container.",
    "help": "Usage:  docker top CONTAINER [ps OPTIONS]\n\nDisplay the running processes of a container\n\nAliases:\n  docker container top, docker top\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Display the running processes of a container"
  },
  {
    "command": "docker unpause",
    "description": "Retoma os processos pausados de um ou mais containers.",
    "help": "Usage:  docker unpause CONTAINER [CONTAINER...]\n\nUnpause all processes within one or more containers\n\nAliases:\n  docker container unpause, docker unpause\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Unpause all processes within one or more containers"
  },
  {
    "command": "docker update",
    "description": "Atualiza a configuração de um ou mais containers.",
    "help": "Usage:  docker update [OPTIONS] CONTAINER [CONTAINER...]\n\nUpdate configuration of one or more containers\n\nAliases:\n  docker container update, docker update\n\nOptions:\n      --blkio-weight uint16        Block IO (relative weight), between 10\n                                   and 1000, or 0 to disable (default 0)\n      --cpu-period int             Limit CPU CFS (Completely Fair\n                                   Scheduler) period\n      --cpu-quota int              Limit CPU CFS (Completely Fair\n                                   Scheduler) quota\n      --cpu-rt-period int          Limit the CPU real-time period in\n                                   microseconds\n      --cpu-rt-runtime int         Limit the CPU real-time runtime in\n                                   microseconds\n  -c, --cpu-shares int             CPU shares (relative weight)\n      --cpus decimal               Number of CPUs\n      --cpuset-cpus string         CPUs in which to allow execution (0-3, 0,1)\n      --cpuset-mems string         MEMs in which to allow execution (0-3, 0,1)\n  -m, --memory bytes               Memory limit\n      --memory-reservation bytes   Memory soft limit\n      --memory-swap bytes          Swap limit equal to memory plus swap:\n                                   -1 to enable unlimited swap\n      --pids-limit int             Tune container pids limit (set -1 for\n                                   unlimited)\n      --restart string             Restart policy to apply when a\n                                   container exits\n",
    "flags": [
      "--blkio-weight",
      "--cpu-period",
      "--cpu-quota",
      "--cpu-rt-period",
      "--cpu-rt-runtime",
      "--cpu-shares",
      "--cpus",
      "--cpuset-cpus",
      "--cpuset-mems",
      "--help",
      "--memory",
      "--memory-reservation",
      "--memory-swap",
      "--pids-limit",
      "--restart",
      "-1",
      "-c",
      "-m"
    ],
    "descriptionOriginal": "Update configuration of one or more containers"
  },
  {
    "command": "docker version",
    "description": "Mostra a versão do Docker.",
    "help": "Usage:  docker version [OPTIONS]\n\nShow the Docker version information\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Show the Docker version information"
  },
  {
    "command": "docker volume",
    "description": "Gerencia volumes.",
    "help": "Usage:  docker volume COMMAND\n\nManage volumes\n\nCommands:\n  create      Create a volume\n  inspect     Display detailed information on one or more volumes\n  ls          List volumes\n  prune       Remove unused local volumes\n  rm          Remove one or more volumes\n\nRun 'docker volume COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage volumes"
  },
  {
    "command": "docker wait",
    "description": "Espera containers pararem e mostra seus códigos de saída.",
    "help": "Usage:  docker wait CONTAINER [CONTAINER...]\n\nBlock until one or more containers stop, then print their exit codes\n\nAliases:\n  docker container wait, docker wait\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Block until one or more containers stop, then print their exit codes"
  },
  {
    "command": "docker builder bake",
    "description": "Constrói imagens a partir de um arquivo de configuração.",
    "help": "Usage:  docker buildx bake [OPTIONS] [TARGET...]\n\nBuild from a file\n\nAliases:\n  docker buildx bake, docker buildx f\n\nOptions:\n      --allow stringArray      Allow build to access specified resources\n      --builder string         Override the configured builder instance\n                               (default \"default\")\n      --call string            Set method for evaluating build (\"check\",\n                               \"outline\", \"targets\") (default \"build\")\n      --check                  Shorthand for \"--call=check\"\n  -D, --debug                  Enable debug logging\n  -f, --file stringArray       Build definition file\n  -j, --jobs string            Set target execution behavior (format: \"N\"\n                               or \"mode[,parallel=N]\") (default \"fail-fast\")\n      --list string            List targets or variables\n      --load                   Shorthand for\n                               \"--set=*.output=type=docker\". Conditional.\n      --metadata-file string   Write build result metadata to a file\n      --no-cache               Do not use cache when building the image\n      --policy stringArray     Global policy evaluation options (format:\n                               \"[disabled=true|false][,strict=true|false][,log-level=level]\")\n      --print                  Print the options without building\n      --progress string        Set type of progress output (\"auto\",\n                               \"none\",  \"plain\", \"quiet\", \"rawjson\",\n                               \"tty\"). Use plain to show container output\n                               (default \"auto\")\n      --provenance string      Shorthand for \"--set=*.attest=type=provenance\"\n      --pull                   Always attempt to pull all referenced images\n      --push                   Shorthand for\n                               \"--set=*.output=type=registry\". Conditional.\n      --sbom string            Shorthand for \"--set=*.attest=type=sbom\"\n      --set stringArray        Override target value (e.g.,\n                               \"targetpattern.key=value\")\n      --var stringArray        Set a variable value (e.g., \"name=value\")\n",
    "flags": [
      "--allow",
      "--builder",
      "--call",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--jobs",
      "--list",
      "--load",
      "--metadata-file",
      "--no-cache",
      "--policy",
      "--print",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--sbom",
      "--set",
      "--var",
      "-D",
      "-f",
      "-j"
    ],
    "descriptionOriginal": "Build from a file"
  },
  {
    "command": "docker builder build",
    "description": "Inicia a construção de uma imagem.",
    "help": "Usage:  docker buildx build [OPTIONS] PATH | URL | -\n\nStart a build\n\nAliases:\n  docker build, docker builder build, docker image build, docker buildx b\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder\n                                      instance (default \"default\")\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Start a build"
  },
  {
    "command": "docker builder create",
    "description": "Cria uma instância de construtor de imagens.",
    "help": "Usage:  docker buildx create [OPTIONS] [CONTEXT|ENDPOINT]\n\nCreate a new builder instance\n\nOptions:\n      --append                    Append a node to builder instead of\n                                  changing it\n      --bootstrap                 Boot builder after creation\n      --buildkitd-config string   BuildKit daemon config file\n      --buildkitd-flags string    BuildKit daemon flags\n  -D, --debug                     Enable debug logging\n      --driver string             Driver to use (available: \"cloud\",\n                                  \"docker-container\", \"kubernetes\", \"remote\")\n      --driver-opt stringArray    Options for the driver\n      --leave                     Remove a node from builder instead of\n                                  changing it\n      --name string               Builder instance name\n      --node string               Create/modify node with given name\n      --platform stringArray      Fixed platforms for current node\n      --timeout duration          Override the default timeout for\n                                  loading builder status (default 20s)\n      --use                       Set the current builder instance\n",
    "flags": [
      "--append",
      "--bootstrap",
      "--buildkitd-config",
      "--buildkitd-flags",
      "--debug",
      "--driver",
      "--driver-opt",
      "--help",
      "--leave",
      "--name",
      "--node",
      "--platform",
      "--timeout",
      "--use",
      "-D"
    ],
    "descriptionOriginal": "Create a new builder instance"
  },
  {
    "command": "docker builder dap",
    "description": "Inicia um depurador compatível com o protocolo DAP.",
    "help": "Usage:  docker buildx dap [OPTIONS] COMMAND\n\nStart debug adapter protocol compatible debugger\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n\nCommands:\n  build       Start a build\n\nRun 'docker buildx dap COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Start debug adapter protocol compatible debugger"
  },
  {
    "command": "docker builder dial-stdio",
    "description": "Encaminha os fluxos de entrada e saída para uma instância do construtor.",
    "help": "Usage:  docker buildx dial-stdio\n\nProxy current stdio streams to builder instance\n\nOptions:\n      --builder string    Override the configured builder instance\n                          (default \"default\")\n  -D, --debug             Enable debug logging\n      --platform string   Target platform: this is used for node selection\n      --progress string   Set type of progress output (\"auto\", \"plain\",\n                          \"rawjson\", \"tty\"). Use plain to show container\n                          output (default \"none\")\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "--platform",
      "--progress",
      "-D"
    ],
    "descriptionOriginal": "Proxy current stdio streams to builder instance"
  },
  {
    "command": "docker builder du",
    "description": "Mostra o uso de disco.",
    "help": "Usage:  docker buildx du\n\nDisk usage\n\nOptions:\n      --builder string     Override the configured builder instance\n                           (default \"default\")\n  -D, --debug              Enable debug logging\n      --filter filter      Provide filter values\n      --format string      Format the output\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n      --verbose            Shorthand for \"--format=pretty\"\n",
    "flags": [
      "--builder",
      "--debug",
      "--filter",
      "--format",
      "--help",
      "--timeout",
      "--verbose",
      "-D"
    ],
    "descriptionOriginal": "Disk usage"
  },
  {
    "command": "docker builder history",
    "description": "Consulta e gerencia registros de construção.",
    "help": "Usage:  docker buildx history [OPTIONS] COMMAND\n\nCommands to work on build records\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n\nManagement Commands:\n  inspect     Inspect a build record\n\nCommands:\n  export      Export build records into Docker Desktop bundle\n  import      Import build records into Docker Desktop\n  logs        Print the logs of a build record\n  ls          List build records\n  open        Open a build record in Docker Desktop\n  rm          Remove build records\n  trace       Show the OpenTelemetry trace of a build record\n\nRun 'docker buildx history COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Commands to work on build records"
  },
  {
    "command": "docker builder imagetools",
    "description": "Gerencia imagens em um registry.",
    "help": "Usage:  docker buildx imagetools [OPTIONS] COMMAND\n\nCommands to work on images in registry\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n\nCommands:\n  create      Create a new image based on source images\n  inspect     Show details of an image in the registry\n\nRun 'docker buildx imagetools COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Commands to work on images in registry"
  },
  {
    "command": "docker builder inspect",
    "description": "Inspeciona a instância atual do construtor.",
    "help": "Usage:  docker buildx inspect [NAME]\n\nInspect current builder instance\n\nOptions:\n      --bootstrap          Ensure builder has booted before inspecting\n      --builder string     Override the configured builder instance\n                           (default \"default\")\n  -D, --debug              Enable debug logging\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n",
    "flags": [
      "--bootstrap",
      "--builder",
      "--debug",
      "--help",
      "--timeout",
      "-D"
    ],
    "descriptionOriginal": "Inspect current builder instance"
  },
  {
    "command": "docker builder ls",
    "description": "Lista instâncias de construtores.",
    "help": "Usage:  docker buildx ls\n\nList builder instances\n\nOptions:\n  -D, --debug              Enable debug logging\n      --format string      Format the output (default \"table\")\n      --no-trunc           Don't truncate output\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n",
    "flags": [
      "--debug",
      "--format",
      "--help",
      "--no-trunc",
      "--timeout",
      "-D"
    ],
    "descriptionOriginal": "List builder instances"
  },
  {
    "command": "docker builder policy",
    "description": "Gerencia políticas de construção.",
    "help": "Usage:  docker buildx policy [OPTIONS] COMMAND\n\nCommands for working with build policies\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n\nCommands:\n  eval        Evaluate policy for a source\n  test        Run policy tests\n\nRun 'docker buildx policy COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Commands for working with build policies"
  },
  {
    "command": "docker builder prune",
    "description": "Remove o cache de construção.",
    "help": "Usage:  docker buildx prune\n\nRemove build cache\n\nOptions:\n  -a, --all                    Include internal/frontend images\n      --builder string         Override the configured builder instance\n                               (default \"default\")\n  -D, --debug                  Enable debug logging\n      --filter filter          Provide filter values\n  -f, --force                  Do not prompt for confirmation\n      --max-used-space bytes   Maximum amount of disk space allowed to\n                               keep for cache\n      --min-free-space bytes   Target amount of free disk space after pruning\n      --reserved-space bytes   Amount of disk space always allowed to\n                               keep for cache\n      --timeout duration       Override the default timeout for loading\n                               builder status (default 20s)\n      --verbose                Provide a more verbose output\n",
    "flags": [
      "--all",
      "--builder",
      "--debug",
      "--filter",
      "--force",
      "--help",
      "--max-used-space",
      "--min-free-space",
      "--reserved-space",
      "--timeout",
      "--verbose",
      "-D",
      "-a",
      "-f"
    ],
    "descriptionOriginal": "Remove build cache"
  },
  {
    "command": "docker builder replay",
    "description": "Repete uma construção a partir de sua proveniência (experimental).",
    "help": "Usage:  docker buildx replay [OPTIONS] COMMAND\n\nReplay a build from its provenance (EXPERIMENTAL)\n\nEXPERIMENTAL:\n  docker buildx replay is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n\nCommands:\n  build       Rebuild an image from provenance and pinned materials\n\nRun 'docker buildx replay COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Replay a build from its provenance (EXPERIMENTAL)"
  },
  {
    "command": "docker builder rm",
    "description": "Remove uma ou mais instâncias de construtores.",
    "help": "Usage:  docker buildx rm [OPTIONS] [NAME...]\n\nRemove one or more builder instances\n\nOptions:\n      --all-inactive       Remove all inactive builders\n      --builder string     Override the configured builder instance\n                           (default \"default\")\n  -D, --debug              Enable debug logging\n  -f, --force              Do not prompt for confirmation\n      --keep-daemon        Keep the BuildKit daemon running\n      --keep-state         Keep BuildKit state\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n",
    "flags": [
      "--all-inactive",
      "--builder",
      "--debug",
      "--force",
      "--help",
      "--keep-daemon",
      "--keep-state",
      "--timeout",
      "-D",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more builder instances"
  },
  {
    "command": "docker builder stop",
    "description": "Para uma instância do construtor.",
    "help": "Usage:  docker buildx stop [NAME]\n\nStop builder instance\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Stop builder instance"
  },
  {
    "command": "docker builder use",
    "description": "Seleciona a instância atual do construtor.",
    "help": "Usage:  docker buildx use [OPTIONS] NAME\n\nSet the current builder instance\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n      --default          Set builder as default for current context\n      --global           Builder persists context changes\n",
    "flags": [
      "--builder",
      "--debug",
      "--default",
      "--global",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Set the current builder instance"
  },
  {
    "command": "docker builder version",
    "description": "Mostra a versão do Buildx.",
    "help": "Usage:  docker buildx version\n\nShow buildx version information\n\nOptions:\n  -D, --debug   Enable debug logging\n",
    "flags": [
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Show buildx version information"
  },
  {
    "command": "docker buildx b",
    "description": "Inicia a construção de uma imagem.",
    "help": "Usage:  docker buildx build [OPTIONS] PATH | URL | -\n\nStart a build\n\nAliases:\n  docker build, docker builder build, docker image build, docker buildx b\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder instance\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Start a build"
  },
  {
    "command": "docker buildx bake",
    "description": "Constrói imagens a partir de um arquivo de configuração.",
    "help": "Usage:  docker buildx bake [OPTIONS] [TARGET...]\n\nBuild from a file\n\nAliases:\n  docker buildx bake, docker buildx f\n\nOptions:\n      --allow stringArray      Allow build to access specified resources\n      --builder string         Override the configured builder instance\n      --call string            Set method for evaluating build (\"check\",\n                               \"outline\", \"targets\") (default \"build\")\n      --check                  Shorthand for \"--call=check\"\n  -D, --debug                  Enable debug logging\n  -f, --file stringArray       Build definition file\n  -j, --jobs string            Set target execution behavior (format: \"N\"\n                               or \"mode[,parallel=N]\") (default \"fail-fast\")\n      --list string            List targets or variables\n      --load                   Shorthand for\n                               \"--set=*.output=type=docker\". Conditional.\n      --metadata-file string   Write build result metadata to a file\n      --no-cache               Do not use cache when building the image\n      --policy stringArray     Global policy evaluation options (format:\n                               \"[disabled=true|false][,strict=true|false][,log-level=level]\")\n      --print                  Print the options without building\n      --progress string        Set type of progress output (\"auto\",\n                               \"none\",  \"plain\", \"quiet\", \"rawjson\",\n                               \"tty\"). Use plain to show container output\n                               (default \"auto\")\n      --provenance string      Shorthand for \"--set=*.attest=type=provenance\"\n      --pull                   Always attempt to pull all referenced images\n      --push                   Shorthand for\n                               \"--set=*.output=type=registry\". Conditional.\n      --sbom string            Shorthand for \"--set=*.attest=type=sbom\"\n      --set stringArray        Override target value (e.g.,\n                               \"targetpattern.key=value\")\n      --var stringArray        Set a variable value (e.g., \"name=value\")\n",
    "flags": [
      "--allow",
      "--builder",
      "--call",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--jobs",
      "--list",
      "--load",
      "--metadata-file",
      "--no-cache",
      "--policy",
      "--print",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--sbom",
      "--set",
      "--var",
      "-D",
      "-f",
      "-j"
    ],
    "descriptionOriginal": "Build from a file"
  },
  {
    "command": "docker buildx build",
    "description": "Inicia a construção de uma imagem.",
    "help": "Usage:  docker buildx build [OPTIONS] PATH | URL | -\n\nStart a build\n\nAliases:\n  docker build, docker builder build, docker image build, docker buildx b\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder instance\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Start a build"
  },
  {
    "command": "docker buildx create",
    "description": "Cria uma instância de construtor de imagens.",
    "help": "Usage:  docker buildx create [OPTIONS] [CONTEXT|ENDPOINT]\n\nCreate a new builder instance\n\nOptions:\n      --append                    Append a node to builder instead of\n                                  changing it\n      --bootstrap                 Boot builder after creation\n      --buildkitd-config string   BuildKit daemon config file\n      --buildkitd-flags string    BuildKit daemon flags\n  -D, --debug                     Enable debug logging\n      --driver string             Driver to use (available: \"cloud\",\n                                  \"docker-container\", \"kubernetes\", \"remote\")\n      --driver-opt stringArray    Options for the driver\n      --leave                     Remove a node from builder instead of\n                                  changing it\n      --name string               Builder instance name\n      --node string               Create/modify node with given name\n      --platform stringArray      Fixed platforms for current node\n      --timeout duration          Override the default timeout for\n                                  loading builder status (default 20s)\n      --use                       Set the current builder instance\n",
    "flags": [
      "--append",
      "--bootstrap",
      "--buildkitd-config",
      "--buildkitd-flags",
      "--debug",
      "--driver",
      "--driver-opt",
      "--help",
      "--leave",
      "--name",
      "--node",
      "--platform",
      "--timeout",
      "--use",
      "-D"
    ],
    "descriptionOriginal": "Create a new builder instance"
  },
  {
    "command": "docker buildx dap",
    "description": "Inicia um depurador compatível com o protocolo DAP.",
    "help": "Usage:  docker buildx dap [OPTIONS] COMMAND\n\nStart debug adapter protocol compatible debugger\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n\nCommands:\n  build       Start a build\n\nRun 'docker buildx dap COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Start debug adapter protocol compatible debugger"
  },
  {
    "command": "docker buildx dial-stdio",
    "description": "Encaminha os fluxos de entrada e saída para uma instância do construtor.",
    "help": "Usage:  docker buildx dial-stdio\n\nProxy current stdio streams to builder instance\n\nOptions:\n      --builder string    Override the configured builder instance\n  -D, --debug             Enable debug logging\n      --platform string   Target platform: this is used for node selection\n      --progress string   Set type of progress output (\"auto\", \"plain\",\n                          \"rawjson\", \"tty\"). Use plain to show container\n                          output (default \"none\")\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "--platform",
      "--progress",
      "-D"
    ],
    "descriptionOriginal": "Proxy current stdio streams to builder instance"
  },
  {
    "command": "docker buildx du",
    "description": "Mostra o uso de disco.",
    "help": "Usage:  docker buildx du\n\nDisk usage\n\nOptions:\n      --builder string     Override the configured builder instance\n  -D, --debug              Enable debug logging\n      --filter filter      Provide filter values\n      --format string      Format the output\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n      --verbose            Shorthand for \"--format=pretty\"\n",
    "flags": [
      "--builder",
      "--debug",
      "--filter",
      "--format",
      "--help",
      "--timeout",
      "--verbose",
      "-D"
    ],
    "descriptionOriginal": "Disk usage"
  },
  {
    "command": "docker buildx f",
    "description": "Constrói imagens a partir de um arquivo de configuração.",
    "help": "Usage:  docker buildx bake [OPTIONS] [TARGET...]\n\nBuild from a file\n\nAliases:\n  docker buildx bake, docker buildx f\n\nOptions:\n      --allow stringArray      Allow build to access specified resources\n      --builder string         Override the configured builder instance\n      --call string            Set method for evaluating build (\"check\",\n                               \"outline\", \"targets\") (default \"build\")\n      --check                  Shorthand for \"--call=check\"\n  -D, --debug                  Enable debug logging\n  -f, --file stringArray       Build definition file\n  -j, --jobs string            Set target execution behavior (format: \"N\"\n                               or \"mode[,parallel=N]\") (default \"fail-fast\")\n      --list string            List targets or variables\n      --load                   Shorthand for\n                               \"--set=*.output=type=docker\". Conditional.\n      --metadata-file string   Write build result metadata to a file\n      --no-cache               Do not use cache when building the image\n      --policy stringArray     Global policy evaluation options (format:\n                               \"[disabled=true|false][,strict=true|false][,log-level=level]\")\n      --print                  Print the options without building\n      --progress string        Set type of progress output (\"auto\",\n                               \"none\",  \"plain\", \"quiet\", \"rawjson\",\n                               \"tty\"). Use plain to show container output\n                               (default \"auto\")\n      --provenance string      Shorthand for \"--set=*.attest=type=provenance\"\n      --pull                   Always attempt to pull all referenced images\n      --push                   Shorthand for\n                               \"--set=*.output=type=registry\". Conditional.\n      --sbom string            Shorthand for \"--set=*.attest=type=sbom\"\n      --set stringArray        Override target value (e.g.,\n                               \"targetpattern.key=value\")\n      --var stringArray        Set a variable value (e.g., \"name=value\")\n",
    "flags": [
      "--allow",
      "--builder",
      "--call",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--jobs",
      "--list",
      "--load",
      "--metadata-file",
      "--no-cache",
      "--policy",
      "--print",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--sbom",
      "--set",
      "--var",
      "-D",
      "-f",
      "-j"
    ],
    "descriptionOriginal": "Build from a file"
  },
  {
    "command": "docker buildx history",
    "description": "Consulta e gerencia registros de construção.",
    "help": "Usage:  docker buildx history [OPTIONS] COMMAND\n\nCommands to work on build records\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n\nManagement Commands:\n  inspect     Inspect a build record\n\nCommands:\n  export      Export build records into Docker Desktop bundle\n  import      Import build records into Docker Desktop\n  logs        Print the logs of a build record\n  ls          List build records\n  open        Open a build record in Docker Desktop\n  rm          Remove build records\n  trace       Show the OpenTelemetry trace of a build record\n\nRun 'docker buildx history COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Commands to work on build records"
  },
  {
    "command": "docker buildx imagetools",
    "description": "Gerencia imagens em um registry.",
    "help": "Usage:  docker buildx imagetools [OPTIONS] COMMAND\n\nCommands to work on images in registry\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n\nCommands:\n  create      Create a new image based on source images\n  inspect     Show details of an image in the registry\n\nRun 'docker buildx imagetools COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Commands to work on images in registry"
  },
  {
    "command": "docker buildx inspect",
    "description": "Inspeciona a instância atual do construtor.",
    "help": "Usage:  docker buildx inspect [NAME]\n\nInspect current builder instance\n\nOptions:\n      --bootstrap          Ensure builder has booted before inspecting\n      --builder string     Override the configured builder instance\n  -D, --debug              Enable debug logging\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n",
    "flags": [
      "--bootstrap",
      "--builder",
      "--debug",
      "--help",
      "--timeout",
      "-D"
    ],
    "descriptionOriginal": "Inspect current builder instance"
  },
  {
    "command": "docker buildx ls",
    "description": "Lista instâncias de construtores.",
    "help": "Usage:  docker buildx ls\n\nList builder instances\n\nOptions:\n  -D, --debug              Enable debug logging\n      --format string      Format the output (default \"table\")\n      --no-trunc           Don't truncate output\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n",
    "flags": [
      "--debug",
      "--format",
      "--help",
      "--no-trunc",
      "--timeout",
      "-D"
    ],
    "descriptionOriginal": "List builder instances"
  },
  {
    "command": "docker buildx policy",
    "description": "Gerencia políticas de construção.",
    "help": "Usage:  docker buildx policy [OPTIONS] COMMAND\n\nCommands for working with build policies\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n\nCommands:\n  eval        Evaluate policy for a source\n  test        Run policy tests\n\nRun 'docker buildx policy COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Commands for working with build policies"
  },
  {
    "command": "docker buildx prune",
    "description": "Remove o cache de construção.",
    "help": "Usage:  docker buildx prune\n\nRemove build cache\n\nOptions:\n  -a, --all                    Include internal/frontend images\n      --builder string         Override the configured builder instance\n  -D, --debug                  Enable debug logging\n      --filter filter          Provide filter values\n  -f, --force                  Do not prompt for confirmation\n      --max-used-space bytes   Maximum amount of disk space allowed to\n                               keep for cache\n      --min-free-space bytes   Target amount of free disk space after pruning\n      --reserved-space bytes   Amount of disk space always allowed to\n                               keep for cache\n      --timeout duration       Override the default timeout for loading\n                               builder status (default 20s)\n      --verbose                Provide a more verbose output\n",
    "flags": [
      "--all",
      "--builder",
      "--debug",
      "--filter",
      "--force",
      "--help",
      "--max-used-space",
      "--min-free-space",
      "--reserved-space",
      "--timeout",
      "--verbose",
      "-D",
      "-a",
      "-f"
    ],
    "descriptionOriginal": "Remove build cache"
  },
  {
    "command": "docker buildx replay",
    "description": "Repete uma construção a partir de sua proveniência (experimental).",
    "help": "Usage:  docker buildx replay [OPTIONS] COMMAND\n\nReplay a build from its provenance (EXPERIMENTAL)\n\nEXPERIMENTAL:\n  docker buildx replay is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n\nCommands:\n  build       Rebuild an image from provenance and pinned materials\n\nRun 'docker buildx replay COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Replay a build from its provenance (EXPERIMENTAL)"
  },
  {
    "command": "docker buildx rm",
    "description": "Remove uma ou mais instâncias de construtores.",
    "help": "Usage:  docker buildx rm [OPTIONS] [NAME...]\n\nRemove one or more builder instances\n\nOptions:\n      --all-inactive       Remove all inactive builders\n      --builder string     Override the configured builder instance\n  -D, --debug              Enable debug logging\n  -f, --force              Do not prompt for confirmation\n      --keep-daemon        Keep the BuildKit daemon running\n      --keep-state         Keep BuildKit state\n      --timeout duration   Override the default timeout for loading\n                           builder status (default 20s)\n",
    "flags": [
      "--all-inactive",
      "--builder",
      "--debug",
      "--force",
      "--help",
      "--keep-daemon",
      "--keep-state",
      "--timeout",
      "-D",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more builder instances"
  },
  {
    "command": "docker buildx stop",
    "description": "Para uma instância do construtor.",
    "help": "Usage:  docker buildx stop [NAME]\n\nStop builder instance\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Stop builder instance"
  },
  {
    "command": "docker buildx use",
    "description": "Seleciona a instância atual do construtor.",
    "help": "Usage:  docker buildx use [OPTIONS] NAME\n\nSet the current builder instance\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n      --default          Set builder as default for current context\n      --global           Builder persists context changes\n",
    "flags": [
      "--builder",
      "--debug",
      "--default",
      "--global",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Set the current builder instance"
  },
  {
    "command": "docker buildx version",
    "description": "Mostra a versão do Buildx.",
    "help": "Usage:  docker buildx version\n\nShow buildx version information\n\nOptions:\n  -D, --debug   Enable debug logging\n",
    "flags": [
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Show buildx version information"
  },
  {
    "command": "docker compose attach",
    "description": "Conecta o terminal ao container em execução de um serviço.",
    "help": "Usage:  docker compose attach [OPTIONS] SERVICE\n\nAttach local standard input, output, and error streams to a service's running container\n\nOptions:\n      --detach-keys string   Override the key sequence for detaching from\n                             a container.\n      --dry-run              Execute command in dry run mode\n      --index int            index of the container if service has\n                             multiple replicas.\n      --no-stdin             Do not attach STDIN\n      --sig-proxy            Proxy all received signals to the process\n                             (default true)\n",
    "flags": [
      "--detach-keys",
      "--dry-run",
      "--help",
      "--index",
      "--no-stdin",
      "--sig-proxy"
    ],
    "descriptionOriginal": "Attach local standard input, output, and error streams to a service's running container"
  },
  {
    "command": "docker compose bridge",
    "description": "Converte arquivos Compose para outro modelo.",
    "help": "Usage:  docker compose bridge [OPTIONS] COMMAND\n\nConvert compose files into another model\n\nOptions:\n      --dry-run   Execute command in dry run mode\n\nManagement Commands:\n  transformations Manage transformation images\n\nCommands:\n  convert         Convert compose files to Kubernetes manifests, Helm charts, or another model\n\nRun 'docker compose bridge COMMAND --help' for more information on a command.\n",
    "flags": [
      "--dry-run",
      "--help"
    ],
    "descriptionOriginal": "Convert compose files into another model"
  },
  {
    "command": "docker compose build",
    "description": "Constrói ou reconstrói as imagens dos serviços.",
    "help": "Usage:  docker compose build [OPTIONS] [SERVICE...]\n\nBuild or rebuild services\n\nOptions:\n      --build-arg stringArray   Set build-time variables for services\n      --builder string          Set builder to use\n      --check                   Check build configuration\n      --dry-run                 Execute command in dry run mode\n  -m, --memory bytes            Set memory limit for the build container.\n                                Not supported by BuildKit.\n      --no-cache                Do not use cache when building the image\n      --print                   Print equivalent bake file\n      --provenance string       Add a provenance attestation\n      --pull                    Always attempt to pull a newer version of\n                                the image\n      --push                    Push service images\n  -q, --quiet                   Suppress the build output\n      --sbom string             Add a SBOM attestation\n      --ssh string              Set SSH authentications used when\n                                building service images. (use 'default'\n                                for using your default SSH Agent)\n      --with-dependencies       Also build dependencies (transitively)\n",
    "flags": [
      "--build-arg",
      "--builder",
      "--check",
      "--dry-run",
      "--help",
      "--memory",
      "--no-cache",
      "--print",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--sbom",
      "--ssh",
      "--with-dependencies",
      "-m",
      "-q"
    ],
    "descriptionOriginal": "Build or rebuild services"
  },
  {
    "command": "docker compose commit",
    "description": "Cria uma imagem a partir das alterações do container de um serviço.",
    "help": "Usage:  docker compose commit [OPTIONS] SERVICE [REPOSITORY[:TAG]]\n\nCreate a new image from a service container's changes\n\nOptions:\n  -a, --author string    Author (e.g., \"John Hannibal Smith\n                         <hannibal@a-team.com>\")\n  -c, --change list      Apply Dockerfile instruction to the created image\n      --dry-run          Execute command in dry run mode\n      --index int        index of the container if service has multiple\n                         replicas.\n  -m, --message string   Commit message\n  -p, --pause            Pause container during commit (default true)\n",
    "flags": [
      "--author",
      "--change",
      "--dry-run",
      "--help",
      "--index",
      "--message",
      "--pause",
      "-a",
      "-c",
      "-m",
      "-p"
    ],
    "descriptionOriginal": "Create a new image from a service container's changes"
  },
  {
    "command": "docker compose config",
    "description": "Resolve variáveis e combina os arquivos Compose na configuração final.",
    "help": "Usage:  docker compose config [OPTIONS] [SERVICE...]\n\nParse, resolve and render compose file in canonical format\n\nOptions:\n      --dry-run                 Execute command in dry run mode\n      --environment             Print environment used for interpolation.\n      --format string           Format the output. Values: [yaml | json]\n      --hash string             Print the service config hash, one per line.\n      --images                  Print the image names, one per line.\n      --lock-image-digests      Produces an override file with image digests\n      --models                  Print the model names, one per line.\n      --networks                Print the network names, one per line.\n      --no-consistency          Don't check model consistency - warning:\n                                may produce invalid Compose output\n      --no-env-resolution       Don't resolve service env files\n      --no-interpolate          Don't interpolate environment variables\n      --no-normalize            Don't normalize compose model\n      --no-path-resolution      Don't resolve file paths\n  -o, --output string           Save to file (default to stdout)\n      --profiles                Print the profile names, one per line.\n  -q, --quiet                   Only validate the configuration, don't\n                                print anything\n      --resolve-image-digests   Pin image tags to digests\n      --services                Print the service names, one per line.\n      --variables               Print model variables and default values.\n      --volumes                 Print the volume names, one per line.\n",
    "flags": [
      "--dry-run",
      "--environment",
      "--format",
      "--hash",
      "--help",
      "--images",
      "--lock-image-digests",
      "--models",
      "--networks",
      "--no-consistency",
      "--no-env-resolution",
      "--no-interpolate",
      "--no-normalize",
      "--no-path-resolution",
      "--output",
      "--profiles",
      "--quiet",
      "--resolve-image-digests",
      "--services",
      "--variables",
      "--volumes",
      "-o",
      "-q"
    ],
    "descriptionOriginal": "Parse, resolve and render compose file in canonical format"
  },
  {
    "command": "docker compose cp",
    "description": "Copia arquivos e pastas entre o container de um serviço e o computador.",
    "help": "Usage:  docker compose cp [OPTIONS] SERVICE:SRC_PATH DEST_PATH|-\n\tdocker compose cp [OPTIONS] SRC_PATH|- SERVICE:DEST_PATH\n\nCopy files/folders between a service container and the local filesystem\n\nOptions:\n      --all           Include containers created by the run command\n  -a, --archive       Archive mode (copy all uid/gid information)\n      --dry-run       Execute command in dry run mode\n  -L, --follow-link   Always follow symbol link in SRC_PATH\n      --index int     Index of the container if service has multiple replicas\n",
    "flags": [
      "--all",
      "--archive",
      "--dry-run",
      "--follow-link",
      "--help",
      "--index",
      "-L",
      "-a"
    ],
    "descriptionOriginal": "Copy files/folders between a service container and the local filesystem"
  },
  {
    "command": "docker compose create",
    "description": "Cria os containers de um serviço.",
    "help": "Usage:  docker compose create [OPTIONS] [SERVICE...]\n\nCreates containers for a service\n\nOptions:\n      --build            Build images before starting containers\n      --dry-run          Execute command in dry run mode\n      --force-recreate   Recreate containers even if their configuration\n                         and image haven't changed\n      --no-build         Don't build an image, even if it's policy\n      --no-recreate      If containers already exist, don't recreate\n                         them. Incompatible with --force-recreate.\n      --pull string      Pull image before running\n                         (\"always\"|\"missing\"|\"never\"|\"build\") (default\n                         \"policy\")\n      --quiet-pull       Pull without printing progress information\n      --remove-orphans   Remove containers for services not defined in\n                         the Compose file\n      --scale scale      Scale SERVICE to NUM instances. Overrides the\n                         scale setting in the Compose file if present.\n  -y, --yes              Assume \"yes\" as answer to all prompts and run\n                         non-interactively\n",
    "flags": [
      "--build",
      "--dry-run",
      "--force-recreate",
      "--help",
      "--no-build",
      "--no-recreate",
      "--pull",
      "--quiet-pull",
      "--remove-orphans",
      "--scale",
      "--yes",
      "-y"
    ],
    "descriptionOriginal": "Creates containers for a service"
  },
  {
    "command": "docker compose down",
    "description": "Para e remove os containers e as redes do projeto.",
    "help": "Usage:  docker compose down [OPTIONS] [SERVICES]\n\nStop and remove containers, networks\n\nOptions:\n      --dry-run          Execute command in dry run mode\n      --remove-orphans   Remove containers for services not defined in\n                         the Compose file\n      --rmi string       Remove images used by services. \"local\" remove\n                         only images that don't have a custom tag\n                         (\"local\"|\"all\")\n  -t, --timeout int      Specify a shutdown timeout in seconds\n  -v, --volumes          Remove named volumes declared in the \"volumes\"\n                         section of the Compose file and anonymous\n                         volumes attached to containers\n",
    "flags": [
      "--dry-run",
      "--help",
      "--remove-orphans",
      "--rmi",
      "--timeout",
      "--volumes",
      "-t",
      "-v"
    ],
    "descriptionOriginal": "Stop and remove containers, networks"
  },
  {
    "command": "docker compose events",
    "description": "Recebe eventos dos containers em tempo real.",
    "help": "Usage:  docker compose events [OPTIONS] [SERVICE...]\n\nReceive real time events from containers\n\nOptions:\n      --dry-run        Execute command in dry run mode\n      --json           Output events as a stream of json objects\n      --since string   Show all events created since timestamp\n      --until string   Stream events until this timestamp\n",
    "flags": [
      "--dry-run",
      "--help",
      "--json",
      "--since",
      "--until"
    ],
    "descriptionOriginal": "Receive real time events from containers"
  },
  {
    "command": "docker compose exec",
    "description": "Executa um comando em um container que já está rodando.",
    "help": "Usage:  docker compose exec [OPTIONS] SERVICE COMMAND [ARGS...]\n\nExecute a command in a running container\n\nOptions:\n  -d, --detach            Detached mode: Run command in the background\n      --dry-run           Execute command in dry run mode\n  -e, --env stringArray   Set environment variables\n      --index int         Index of the container if service has multiple\n                          replicas\n  -T, --no-tty            Disable pseudo-TTY allocation. By default\n                          'docker compose exec' allocates a TTY. (default\n                          true)\n      --privileged        Give extended privileges to the process\n  -u, --user string       Run the command as this user\n  -w, --workdir string    Path to workdir directory for this command\n",
    "flags": [
      "--detach",
      "--dry-run",
      "--env",
      "--help",
      "--index",
      "--no-tty",
      "--privileged",
      "--user",
      "--workdir",
      "-T",
      "-d",
      "-e",
      "-u",
      "-w"
    ],
    "descriptionOriginal": "Execute a command in a running container"
  },
  {
    "command": "docker compose export",
    "description": "Exporta o filesystem do container de um serviço para um arquivo tar.",
    "help": "Usage:  docker compose export [OPTIONS] SERVICE\n\nExport a service container's filesystem as a tar archive\n\nOptions:\n      --dry-run         Execute command in dry run mode\n      --index int       index of the container if service has multiple\n                        replicas.\n  -o, --output string   Write to a file, instead of STDOUT\n",
    "flags": [
      "--dry-run",
      "--help",
      "--index",
      "--output",
      "-o"
    ],
    "descriptionOriginal": "Export a service container's filesystem as a tar archive"
  },
  {
    "command": "docker compose images",
    "description": "Lista as imagens usadas pelos containers criados.",
    "help": "Usage:  docker compose images [OPTIONS] [SERVICE...]\n\nList images used by the created containers\n\nOptions:\n      --dry-run         Execute command in dry run mode\n      --format string   Format the output. Values: [table | json]\n                        (default \"table\")\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--dry-run",
      "--format",
      "--help",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "List images used by the created containers"
  },
  {
    "command": "docker compose kill",
    "description": "Força a parada dos containers dos serviços.",
    "help": "Usage:  docker compose kill [OPTIONS] [SERVICE...]\n\nForce stop service containers\n\nOptions:\n      --dry-run          Execute command in dry run mode\n      --remove-orphans   Remove containers for services not defined in\n                         the Compose file\n  -s, --signal string    SIGNAL to send to the container (default \"SIGKILL\")\n",
    "flags": [
      "--dry-run",
      "--help",
      "--remove-orphans",
      "--signal",
      "-s"
    ],
    "descriptionOriginal": "Force stop service containers"
  },
  {
    "command": "docker compose logs",
    "description": "Mostra os logs dos containers.",
    "help": "Usage:  docker compose logs [OPTIONS] [SERVICE...]\n\nView output from containers\n\nOptions:\n      --dry-run         Execute command in dry run mode\n  -f, --follow          Follow log output\n      --index int       index of the container if service has multiple\n                        replicas\n      --no-color        Produce monochrome output\n      --no-log-prefix   Don't print prefix in logs\n      --since string    Show logs since timestamp (e.g.\n                        2013-01-02T13:23:37Z) or relative (e.g. 42m for\n                        42 minutes)\n  -n, --tail string     Number of lines to show from the end of the logs\n                        for each container (default \"all\")\n  -t, --timestamps      Show timestamps\n      --until string    Show logs before a timestamp (e.g.\n                        2013-01-02T13:23:37Z) or relative (e.g. 42m for\n                        42 minutes)\n",
    "flags": [
      "--dry-run",
      "--follow",
      "--help",
      "--index",
      "--no-color",
      "--no-log-prefix",
      "--since",
      "--tail",
      "--timestamps",
      "--until",
      "-f",
      "-n",
      "-t"
    ],
    "descriptionOriginal": "View output from containers"
  },
  {
    "command": "docker compose ls",
    "description": "Lista projetos Compose em execução.",
    "help": "Usage:  docker compose ls [OPTIONS]\n\nList running compose projects\n\nOptions:\n  -a, --all             Show all stopped Compose projects\n      --dry-run         Execute command in dry run mode\n      --filter filter   Filter output based on conditions provided\n      --format string   Format the output. Values: [table | json]\n                        (default \"table\")\n  -q, --quiet           Only display project names\n",
    "flags": [
      "--all",
      "--dry-run",
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "List running compose projects"
  },
  {
    "command": "docker compose pause",
    "description": "Pausa os serviços.",
    "help": "Usage:  docker compose pause [SERVICE...]\n\nPause services\n\nOptions:\n      --dry-run   Execute command in dry run mode\n",
    "flags": [
      "--dry-run",
      "--help"
    ],
    "descriptionOriginal": "Pause services"
  },
  {
    "command": "docker compose port",
    "description": "Mostra os mapeamentos de portas publicados de um serviço.",
    "help": "Usage:  docker compose port [OPTIONS] SERVICE [PRIVATE_PORT]\n\nList port mappings or print the public port for a specific mapping for the service\n\nOptions:\n      --dry-run           Execute command in dry run mode\n      --index int         Index of the container if service has multiple\n                          replicas\n      --protocol string   tcp or udp (default \"tcp\")\n",
    "flags": [
      "--dry-run",
      "--help",
      "--index",
      "--protocol"
    ],
    "descriptionOriginal": "List port mappings or print the public port for a specific mapping for the service"
  },
  {
    "command": "docker compose ps",
    "description": "Lista containers.",
    "help": "Usage:  docker compose ps [OPTIONS] [SERVICE...]\n\nList containers\n\nOptions:\n  -a, --all                  Show all stopped containers (including those\n                             created by the run command)\n      --dry-run              Execute command in dry run mode\n      --filter string        Filter services by a property (supported\n                             filters: status)\n      --format string        Format output using a custom template:\n                             'table':            Print output in table\n                             format with column headers (default)\n                             'table TEMPLATE':   Print output in table\n                             format using the given Go template\n                             'json':             Print in JSON format\n                             'TEMPLATE':         Print output using the\n                             given Go template.\n                             Refer to\n                             https://docs.docker.com/go/formatting/ for\n                             more information about formatting output\n                             with templates\n      --no-trunc             Don't truncate output\n      --orphans              Include orphaned services (not declared by\n                             project) (default true)\n  -q, --quiet                Only display IDs\n      --services             Display services\n      --status stringArray   Filter services by status. Values: [paused |\n                             restarting | removing | running | dead |\n                             created | exited]\n",
    "flags": [
      "--all",
      "--dry-run",
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--orphans",
      "--quiet",
      "--services",
      "--status",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "List containers"
  },
  {
    "command": "docker compose publish",
    "description": "Publica uma aplicação Compose.",
    "help": "Usage:  docker compose publish [OPTIONS] REPOSITORY[:TAG]\n\nPublish compose application\n\nOptions:\n      --app                     Published compose application (includes\n                                referenced images)\n      --dry-run                 Execute command in dry run mode\n      --oci-version string      OCI image/artifact specification version\n                                (automatically determined by default)\n      --resolve-image-digests   Pin image tags to digests\n      --with-env                Include environment variables in the\n                                published OCI artifact\n  -y, --yes                     Assume \"yes\" as answer to all prompts\n",
    "flags": [
      "--app",
      "--dry-run",
      "--help",
      "--oci-version",
      "--resolve-image-digests",
      "--with-env",
      "--yes",
      "-y"
    ],
    "descriptionOriginal": "Publish compose application"
  },
  {
    "command": "docker compose pull",
    "description": "Baixa as imagens dos serviços.",
    "help": "Usage:  docker compose pull [OPTIONS] [SERVICE...]\n\nPull service images\n\nOptions:\n      --dry-run                Execute command in dry run mode\n      --ignore-buildable       Ignore images that can be built\n      --ignore-pull-failures   Pull what it can and ignores images with\n                               pull failures\n      --include-deps           Also pull services declared as dependencies\n      --policy string          Apply pull policy (\"missing\"|\"always\")\n  -q, --quiet                  Pull without printing progress information\n",
    "flags": [
      "--dry-run",
      "--help",
      "--ignore-buildable",
      "--ignore-pull-failures",
      "--include-deps",
      "--policy",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "Pull service images"
  },
  {
    "command": "docker compose push",
    "description": "Envia as imagens dos serviços para um registry.",
    "help": "Usage:  docker compose push [OPTIONS] [SERVICE...]\n\nPush service images\n\nOptions:\n      --dry-run                Execute command in dry run mode\n      --ignore-push-failures   Push what it can and ignores images with\n                               push failures\n      --include-deps           Also push images of services declared as\n                               dependencies\n  -q, --quiet                  Push without printing progress information\n",
    "flags": [
      "--dry-run",
      "--help",
      "--ignore-push-failures",
      "--include-deps",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "Push service images"
  },
  {
    "command": "docker compose restart",
    "description": "Reinicia os containers dos serviços.",
    "help": "Usage:  docker compose restart [OPTIONS] [SERVICE...]\n\nRestart service containers\n\nOptions:\n      --dry-run       Execute command in dry run mode\n      --no-deps       Don't restart dependent services\n  -t, --timeout int   Specify a shutdown timeout in seconds\n",
    "flags": [
      "--dry-run",
      "--help",
      "--no-deps",
      "--timeout",
      "-t"
    ],
    "descriptionOriginal": "Restart service containers"
  },
  {
    "command": "docker compose rm",
    "description": "Remove os containers parados dos serviços.",
    "help": "Usage:  docker compose rm [OPTIONS] [SERVICE...]\n\nRemoves stopped service containers\n\nBy default, anonymous volumes attached to containers will not be removed. You\ncan override this with -v. To list all volumes, use \"docker volume ls\".\n\nAny data which is not in a volume will be lost.\n\nOptions:\n      --dry-run   Execute command in dry run mode\n  -f, --force     Don't ask to confirm removal\n  -s, --stop      Stop the containers, if required, before removing\n  -v, --volumes   Remove any anonymous volumes attached to containers\n",
    "flags": [
      "--dry-run",
      "--force",
      "--help",
      "--stop",
      "--volumes",
      "-f",
      "-s",
      "-v"
    ],
    "descriptionOriginal": "Removes stopped service containers"
  },
  {
    "command": "docker compose run",
    "description": "Executa um comando em um novo container temporário de um serviço.",
    "help": "Usage:  docker compose run [OPTIONS] SERVICE [COMMAND] [ARGS...]\n\nRun a one-off command on a service\n\nOptions:\n      --build                       Build image before starting container\n      --cap-add list                Add Linux capabilities\n      --cap-drop list               Drop Linux capabilities\n  -d, --detach                      Run container in background and print\n                                    container ID\n      --dry-run                     Execute command in dry run mode\n      --entrypoint string           Override the entrypoint of the image\n  -e, --env stringArray             Set environment variables\n      --env-from-file stringArray   Set environment variables from file\n  -i, --interactive                 Keep STDIN open even if not attached\n                                    (default true)\n  -l, --label stringArray           Add or override a label\n      --name string                 Assign a name to the container\n      --no-deps                     Don't start linked services\n  -T, --no-tty                      Disable pseudo-TTY allocation\n                                    (default: auto-detected) (default true)\n  -p, --publish stringArray         Publish a container's port(s) to the host\n      --pull string                 Pull image before running\n                                    (\"always\"|\"missing\"|\"never\") (default\n                                    \"policy\")\n  -q, --quiet                       Don't print anything to STDOUT\n      --quiet-build                 Suppress progress output from the\n                                    build process\n      --quiet-pull                  Pull without printing progress information\n      --remove-orphans              Remove containers for services not\n                                    defined in the Compose file\n      --rm                          Automatically remove the container\n                                    when it exits\n  -P, --service-ports               Run command with all service's ports\n                                    enabled and mapped to the host\n      --use-aliases                 Use the service's network useAliases\n                                    in the network(s) the container\n                                    connects to\n  -u, --user string                 Run as specified username or uid\n  -v, --volume stringArray          Bind mount a volume\n  -w, --workdir string              Working directory inside the container\n",
    "flags": [
      "--build",
      "--cap-add",
      "--cap-drop",
      "--detach",
      "--dry-run",
      "--entrypoint",
      "--env",
      "--env-from-file",
      "--help",
      "--interactive",
      "--label",
      "--name",
      "--no-deps",
      "--no-tty",
      "--publish",
      "--pull",
      "--quiet",
      "--quiet-build",
      "--quiet-pull",
      "--remove-orphans",
      "--rm",
      "--service-ports",
      "--use-aliases",
      "--user",
      "--volume",
      "--workdir",
      "-P",
      "-T",
      "-d",
      "-e",
      "-i",
      "-l",
      "-p",
      "-q",
      "-u",
      "-v",
      "-w"
    ],
    "descriptionOriginal": "Run a one-off command on a service"
  },
  {
    "command": "docker compose scale",
    "description": "Ajusta a quantidade de instâncias dos serviços.",
    "help": "Usage:  docker compose scale [SERVICE=REPLICAS...]\n\nScale services\n\nOptions:\n      --dry-run   Execute command in dry run mode\n      --no-deps   Don't start linked services\n",
    "flags": [
      "--dry-run",
      "--help",
      "--no-deps"
    ],
    "descriptionOriginal": "Scale services"
  },
  {
    "command": "docker compose start",
    "description": "Inicia os serviços.",
    "help": "Usage:  docker compose start [SERVICE...]\n\nStart services\n\nOptions:\n      --dry-run            Execute command in dry run mode\n      --wait               Wait for services to be running|healthy.\n                           Implies detached mode.\n      --wait-timeout int   Maximum duration in seconds to wait for the\n                           project to be running|healthy\n",
    "flags": [
      "--dry-run",
      "--help",
      "--wait",
      "--wait-timeout"
    ],
    "descriptionOriginal": "Start services"
  },
  {
    "command": "docker compose stats",
    "description": "Mostra o uso de recursos dos containers em tempo real.",
    "help": "Usage:  docker compose stats [OPTIONS] [SERVICE]\n\nDisplay a live stream of container(s) resource usage statistics\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n      --dry-run         Execute command in dry run mode\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to\n                        https://docs.docker.com/engine/cli/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-stream       Disable streaming stats and only pull the first result\n      --no-trunc        Do not truncate output\n",
    "flags": [
      "--all",
      "--dry-run",
      "--format",
      "--help",
      "--no-stream",
      "--no-trunc",
      "-a"
    ],
    "descriptionOriginal": "Display a live stream of container(s) resource usage statistics"
  },
  {
    "command": "docker compose stop",
    "description": "Para os serviços.",
    "help": "Usage:  docker compose stop [OPTIONS] [SERVICE...]\n\nStop services\n\nOptions:\n      --dry-run       Execute command in dry run mode\n  -t, --timeout int   Specify a shutdown timeout in seconds\n",
    "flags": [
      "--dry-run",
      "--help",
      "--timeout",
      "-t"
    ],
    "descriptionOriginal": "Stop services"
  },
  {
    "command": "docker compose top",
    "description": "Lista os processos em execução.",
    "help": "Usage:  docker compose top [SERVICES...]\n\nDisplay the running processes\n\nOptions:\n      --dry-run   Execute command in dry run mode\n",
    "flags": [
      "--dry-run",
      "--help"
    ],
    "descriptionOriginal": "Display the running processes"
  },
  {
    "command": "docker compose unpause",
    "description": "Retoma os serviços pausados.",
    "help": "Usage:  docker compose unpause [SERVICE...]\n\nUnpause services\n\nOptions:\n      --dry-run   Execute command in dry run mode\n",
    "flags": [
      "--dry-run",
      "--help"
    ],
    "descriptionOriginal": "Unpause services"
  },
  {
    "command": "docker compose up",
    "description": "Cria e inicia os containers dos serviços.",
    "help": "Usage:  docker compose up [OPTIONS] [SERVICE...]\n\nCreate and start containers\n\nOptions:\n      --abort-on-container-exit      Stops all containers if any\n                                     container was stopped. Incompatible\n                                     with -d\n      --abort-on-container-failure   Stops all containers if any\n                                     container exited with failure.\n                                     Incompatible with -d\n      --always-recreate-deps         Recreate dependent containers.\n                                     Incompatible with --no-recreate.\n      --attach stringArray           Restrict attaching to the specified\n                                     services. Incompatible with\n                                     --attach-dependencies.\n      --attach-dependencies          Automatically attach to log output\n                                     of dependent services\n      --build                        Build images before starting containers\n  -d, --detach                       Detached mode: Run containers in the\n                                     background\n      --dry-run                      Execute command in dry run mode\n      --exit-code-from string        Return the exit code of the selected\n                                     service container. Implies\n                                     --abort-on-container-exit\n      --force-recreate               Recreate containers even if their\n                                     configuration and image haven't changed\n      --menu                         Enable interactive shortcuts when\n                                     running attached. Incompatible with\n                                     --detach. Can also be enable/disable\n                                     by setting COMPOSE_MENU environment var.\n      --no-attach stringArray        Do not attach (stream logs) to the\n                                     specified services\n      --no-build                     Don't build an image, even if it's policy\n      --no-color                     Produce monochrome output\n      --no-deps                      Don't start linked services\n      --no-log-prefix                Don't print prefix in logs\n      --no-recreate                  If containers already exist, don't\n                                     recreate them. Incompatible with\n                                     --force-recreate.\n      --no-start                     Don't start the services after\n                                     creating them\n      --pull string                  Pull image before running\n                                     (\"always\"|\"missing\"|\"never\")\n                                     (default \"policy\")\n      --quiet-build                  Suppress the build output\n      --quiet-pull                   Pull without printing progress\n                                     information\n      --remove-orphans               Remove containers for services not\n                                     defined in the Compose file\n  -V, --renew-anon-volumes           Recreate anonymous volumes instead\n                                     of retrieving data from the previous\n                                     containers\n      --scale scale                  Scale SERVICE to NUM instances.\n                                     Overrides the scale setting in the\n                                     Compose file if present.\n  -t, --timeout int                  Use this timeout in seconds for\n                                     container shutdown when attached or\n                                     when containers are already running\n      --timestamps                   Show timestamps\n      --wait                         Wait for services to be\n                                     running|healthy. Implies detached mode.\n      --wait-timeout int             Maximum duration in seconds to wait\n                                     for the project to be running|healthy\n  -w, --watch                        Watch source code and\n                                     rebuild/refresh containers when\n                                     files are updated.\n  -y, --yes                          Assume \"yes\" as answer to all\n                                     prompts and run non-interactively\n",
    "flags": [
      "--abort-on-container-exit",
      "--abort-on-container-failure",
      "--always-recreate-deps",
      "--attach",
      "--attach-dependencies",
      "--build",
      "--detach",
      "--dry-run",
      "--exit-code-from",
      "--force-recreate",
      "--help",
      "--menu",
      "--no-attach",
      "--no-build",
      "--no-color",
      "--no-deps",
      "--no-log-prefix",
      "--no-recreate",
      "--no-start",
      "--pull",
      "--quiet-build",
      "--quiet-pull",
      "--remove-orphans",
      "--renew-anon-volumes",
      "--scale",
      "--timeout",
      "--timestamps",
      "--wait",
      "--wait-timeout",
      "--watch",
      "--yes",
      "-V",
      "-d",
      "-t",
      "-w",
      "-y"
    ],
    "descriptionOriginal": "Create and start containers"
  },
  {
    "command": "docker compose version",
    "description": "Mostra a versão do Docker Compose.",
    "help": "Usage:  docker compose version [OPTIONS]\n\nShow the Docker Compose version information\n\nOptions:\n      --dry-run         Execute command in dry run mode\n  -f, --format string   Format the output. Values: [pretty | json].\n                        (Default: pretty)\n      --short           Shows only Compose's version number\n",
    "flags": [
      "--dry-run",
      "--format",
      "--help",
      "--short",
      "-f"
    ],
    "descriptionOriginal": "Show the Docker Compose version information"
  },
  {
    "command": "docker compose volumes",
    "description": "Lista volumes.",
    "help": "Usage:  docker compose volumes [OPTIONS] [SERVICE...]\n\nList volumes\n\nOptions:\n      --dry-run         Execute command in dry run mode\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates (default \"table\")\n  -q, --quiet           Only display volume names\n",
    "flags": [
      "--dry-run",
      "--format",
      "--help",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "List volumes"
  },
  {
    "command": "docker compose wait",
    "description": "Espera os containers de todos os serviços, ou dos selecionados, pararem.",
    "help": "Usage:  docker compose wait SERVICE [SERVICE...] [OPTIONS]\n\nBlock until containers of all (or specified) services stop.\n\nOptions:\n      --down-project   Drops project when the first container stops\n      --dry-run        Execute command in dry run mode\n",
    "flags": [
      "--down-project",
      "--dry-run",
      "--help"
    ],
    "descriptionOriginal": "Block until containers of all (or specified) services stop."
  },
  {
    "command": "docker compose watch",
    "description": "Observa os arquivos do projeto e reconstrói ou atualiza os containers após alterações.",
    "help": "Usage:  docker compose watch [SERVICE...]\n\nWatch build context for service and rebuild/refresh containers when files are updated\n\nOptions:\n      --dry-run   Execute command in dry run mode\n      --no-up     Do not build & start services before watching\n      --prune     Prune dangling images on rebuild (default true)\n      --quiet     hide build output\n",
    "flags": [
      "--dry-run",
      "--help",
      "--no-up",
      "--prune",
      "--quiet"
    ],
    "descriptionOriginal": "Watch build context for service and rebuild/refresh containers when files are updated"
  },
  {
    "command": "docker config create",
    "description": "Cria uma configuração a partir de um arquivo ou da entrada padrão.",
    "help": "Usage:  docker config create [OPTIONS] CONFIG file|-\n\nCreate a config from a file or STDIN\n\nOptions:\n  -l, --label list               Config labels\n      --template-driver string   Template driver\n",
    "flags": [
      "--help",
      "--label",
      "--template-driver",
      "-l"
    ],
    "descriptionOriginal": "Create a config from a file or STDIN"
  },
  {
    "command": "docker config inspect",
    "description": "Mostra informações detalhadas de configurações.",
    "help": "Usage:  docker config inspect [OPTIONS] CONFIG [CONFIG...]\n\nDisplay detailed information on one or more configs\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --pretty          Print the information in a human friendly format\n",
    "flags": [
      "--format",
      "--help",
      "--pretty",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more configs"
  },
  {
    "command": "docker config list",
    "description": "Lista configurações.",
    "help": "Usage:  docker config ls [OPTIONS]\n\nList configs\n\nAliases:\n  docker config ls, docker config list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List configs"
  },
  {
    "command": "docker config ls",
    "description": "Lista configurações.",
    "help": "Usage:  docker config ls [OPTIONS]\n\nList configs\n\nAliases:\n  docker config ls, docker config list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List configs"
  },
  {
    "command": "docker config remove",
    "description": "Remove uma ou mais configurações.",
    "help": "Usage:  docker config rm CONFIG [CONFIG...]\n\nRemove one or more configs\n\nAliases:\n  docker config rm, docker config remove\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Remove one or more configs"
  },
  {
    "command": "docker config rm",
    "description": "Remove uma ou mais configurações.",
    "help": "Usage:  docker config rm CONFIG [CONFIG...]\n\nRemove one or more configs\n\nAliases:\n  docker config rm, docker config remove\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Remove one or more configs"
  },
  {
    "command": "docker container attach",
    "description": "Conecta a entrada, a saída e os erros do terminal a um container em execução.",
    "help": "Usage:  docker container attach [OPTIONS] CONTAINER\n\nAttach local standard input, output, and error streams to a running container\n\nAliases:\n  docker container attach, docker attach\n\nOptions:\n      --detach-keys string   Override the key sequence for detaching a\n                             container\n      --no-stdin             Do not attach STDIN\n      --sig-proxy            Proxy all received signals to the process\n                             (default true)\n",
    "flags": [
      "--detach-keys",
      "--help",
      "--no-stdin",
      "--sig-proxy"
    ],
    "descriptionOriginal": "Attach local standard input, output, and error streams to a running container"
  },
  {
    "command": "docker container commit",
    "description": "Cria uma imagem a partir das alterações de um container.",
    "help": "Usage:  docker container commit [OPTIONS] CONTAINER [REPOSITORY[:TAG]]\n\nCreate a new image from a container's changes\n\nAliases:\n  docker container commit, docker commit\n\nOptions:\n  -a, --author string    Author (e.g., \"John Hannibal Smith\n                         <hannibal@a-team.com>\")\n  -c, --change list      Apply Dockerfile instruction to the created image\n  -m, --message string   Commit message\n      --no-pause         Disable pausing container during commit\n",
    "flags": [
      "--author",
      "--change",
      "--help",
      "--message",
      "--no-pause",
      "-a",
      "-c",
      "-m"
    ],
    "descriptionOriginal": "Create a new image from a container's changes"
  },
  {
    "command": "docker container cp",
    "description": "Copia arquivos e pastas entre um container e o computador.",
    "help": "Usage:  docker container cp [OPTIONS] CONTAINER:SRC_PATH DEST_PATH|-\n\tdocker cp [OPTIONS] SRC_PATH|- CONTAINER:DEST_PATH\n\nCopy files/folders between a container and the local filesystem\n\nUse '-' as the source to read a tar archive from stdin\nand extract it to a directory destination in a container.\nUse '-' as the destination to stream a tar archive of a\ncontainer source to stdout.\n\nAliases:\n  docker container cp, docker cp\n\nOptions:\n  -a, --archive       Archive mode (copy all uid/gid information)\n  -L, --follow-link   Always follow symlinks in SRC_PATH\n  -q, --quiet         Suppress progress output during copy. Progress\n                      output is automatically suppressed if no terminal\n                      is attached\n",
    "flags": [
      "--archive",
      "--follow-link",
      "--help",
      "--quiet",
      "-L",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "Copy files/folders between a container and the local filesystem"
  },
  {
    "command": "docker container create",
    "description": "Cria um container sem iniciá-lo.",
    "help": "Usage:  docker container create [OPTIONS] IMAGE [COMMAND] [ARG...]\n\nCreate a new container\n\nAliases:\n  docker container create, docker create\n\nOptions:\n      --add-host list                    Add a custom host-to-IP mapping\n                                         (host:ip)\n      --annotation map                   Add an annotation to the\n                                         container (passed through to the\n                                         OCI runtime) (default map[])\n  -a, --attach list                      Attach to STDIN, STDOUT or STDERR\n      --blkio-weight uint16              Block IO (relative weight),\n                                         between 10 and 1000, or 0 to\n                                         disable (default 0)\n      --blkio-weight-device list         Block IO weight (relative device\n                                         weight) (default [])\n      --cap-add list                     Add Linux capabilities\n      --cap-drop list                    Drop Linux capabilities\n      --cgroup-parent string             Optional parent cgroup for the\n                                         container\n      --cgroupns string                  Cgroup namespace to use\n                                         (host|private)\n                                         'host':    Run the container in\n                                         the Docker host's cgroup\n                                         namespace\n                                         'private': Run the container in\n                                         its own private cgroup namespace\n                                         '':        Use the cgroup\n                                         namespace as configured by the\n                                                    default-cgroupns-mode\n                                         option on the daemon (default)\n      --cidfile string                   Write the container ID to the file\n      --cpu-period int                   Limit CPU CFS (Completely Fair\n                                         Scheduler) period\n      --cpu-quota int                    Limit CPU CFS (Completely Fair\n                                         Scheduler) quota\n      --cpu-rt-period int                Limit CPU real-time period in\n                                         microseconds\n      --cpu-rt-runtime int               Limit CPU real-time runtime in\n                                         microseconds\n  -c, --cpu-shares int                   CPU shares (relative weight)\n      --cpus decimal                     Number of CPUs\n      --cpuset-cpus string               CPUs in which to allow execution\n                                         (0-3, 0,1)\n      --cpuset-mems string               MEMs in which to allow execution\n                                         (0-3, 0,1)\n      --device list                      Add a host device to the container\n      --device-cgroup-rule list          Add a rule to the cgroup allowed\n                                         devices list\n      --device-read-bps list             Limit read rate (bytes per\n                                         second) from a device (default [])\n      --device-read-iops list            Limit read rate (IO per second)\n                                         from a device (default [])\n      --device-write-bps list            Limit write rate (bytes per\n                                         second) to a device (default [])\n      --device-write-iops list           Limit write rate (IO per second)\n                                         to a device (default [])\n      --dns list                         Set custom DNS servers\n      --dns-option list                  Set DNS options\n      --dns-search list                  Set custom DNS search domains\n      --domainname string                Container NIS domain name\n      --entrypoint string                Overwrite the default ENTRYPOINT\n                                         of the image\n  -e, --env list                         Set environment variables\n      --env-file list                    Read in a file of environment\n                                         variables\n      --expose list                      Expose a port or a range of ports\n      --gpus gpu-request                 GPU devices to add to the\n                                         container ('all' to pass all GPUs)\n      --group-add list                   Add additional groups to join\n      --health-cmd string                Command to run to check health\n      --health-interval duration         Time between running the check\n                                         (ms|s|m|h) (default 0s)\n      --health-retries int               Consecutive failures needed to\n                                         report unhealthy\n      --health-start-interval duration   Time between running the check\n                                         during the start period\n                                         (ms|s|m|h) (default 0s)\n      --health-start-period duration     Start period for the container\n                                         to initialize before starting\n                                         health-retries countdown\n                                         (ms|s|m|h) (default 0s)\n      --health-timeout duration          Maximum time to allow one check\n                                         to run (ms|s|m|h) (default 0s)\n      --help                             Print usage\n  -h, --hostname string                  Container host name\n      --init                             Run an init inside the container\n                                         that forwards signals and reaps\n                                         processes\n  -i, --interactive                      Keep STDIN open even if not attached\n      --ip ip                            IPv4 address (e.g., 172.30.100.104)\n      --ip6 ip                           IPv6 address (e.g., 2001:db8::33)\n      --ipc string                       IPC mode to use\n      --isolation string                 Container isolation technology\n  -l, --label list                       Set meta data on a container\n      --label-file list                  Read in a line delimited file of\n                                         labels\n      --link list                        Add link to another container\n      --link-local-ip list               Container IPv4/IPv6 link-local\n                                         addresses\n      --log-driver string                Logging driver for the container\n      --log-opt list                     Log driver options\n      --mac-address string               Container MAC address (e.g.,\n                                         92:d0:c6:0a:29:33)\n  -m, --memory bytes                     Memory limit\n      --memory-reservation bytes         Memory soft limit\n      --memory-swap bytes                Swap limit equal to memory plus\n                                         swap: '-1' to enable unlimited swap\n      --memory-swappiness int            Tune container memory swappiness\n                                         (0 to 100) (default -1)\n      --mount mount                      Attach a filesystem mount to the\n                                         container\n      --name string                      Assign a name to the container\n      --network network                  Connect a container to a network\n      --network-alias list               Add network-scoped alias for the\n                                         container\n      --no-healthcheck                   Disable any container-specified\n                                         HEALTHCHECK\n      --oom-kill-disable                 Disable OOM Killer\n      --oom-score-adj int                Tune host's OOM preferences\n                                         (-1000 to 1000)\n      --pid string                       PID namespace to use\n      --pids-limit int                   Tune container pids limit (set\n                                         -1 for unlimited)\n      --platform string                  Set platform if server is\n                                         multi-platform capable\n      --privileged                       Give extended privileges to this\n                                         container\n  -p, --publish list                     Publish a container's port(s) to\n                                         the host\n  -P, --publish-all                      Publish all exposed ports to\n                                         random ports\n      --pull string                      Pull image before creating\n                                         (\"always\", \"missing\", \"never\")\n                                         (default \"missing\")\n  -q, --quiet                            Suppress the pull output\n      --read-only                        Mount the container's root\n                                         filesystem as read only\n      --restart string                   Restart policy to apply when a\n                                         container exits (default \"no\")\n      --rm                               Automatically remove the\n                                         container and its associated\n                                         anonymous volumes when it exits\n      --runtime string                   Runtime to use for this container\n      --security-opt list                Security Options\n      --shm-size bytes                   Size of /dev/shm\n      --stop-signal string               Signal to stop the container\n      --stop-timeout int                 Timeout (in seconds) to stop a\n                                         container\n      --storage-opt list                 Storage driver options for the\n                                         container\n      --sysctl map                       Sysctl options (default map[])\n      --tmpfs list                       Mount a tmpfs directory\n  -t, --tty                              Allocate a pseudo-TTY\n      --ulimit ulimit                    Ulimit options (default [])\n      --umask umask                      Set umask for the container\n      --use-api-socket                   Bind mount Docker API socket and\n                                         required auth\n  -u, --user string                      Username or UID (format:\n                                         <name|uid>[:<group|gid>])\n      --userns string                    User namespace to use\n      --uts string                       UTS namespace to use\n  -v, --volume list                      Bind mount a volume\n      --volume-driver string             Optional volume driver for the\n                                         container\n      --volumes-from list                Mount volumes from the specified\n                                         container(s)\n  -w, --workdir string                   Working directory inside the\n                                         container\n",
    "flags": [
      "--add-host",
      "--annotation",
      "--attach",
      "--blkio-weight",
      "--blkio-weight-device",
      "--cap-add",
      "--cap-drop",
      "--cgroup-parent",
      "--cgroupns",
      "--cidfile",
      "--cpu-period",
      "--cpu-quota",
      "--cpu-rt-period",
      "--cpu-rt-runtime",
      "--cpu-shares",
      "--cpus",
      "--cpuset-cpus",
      "--cpuset-mems",
      "--device",
      "--device-cgroup-rule",
      "--device-read-bps",
      "--device-read-iops",
      "--device-write-bps",
      "--device-write-iops",
      "--dns",
      "--dns-option",
      "--dns-search",
      "--domainname",
      "--entrypoint",
      "--env",
      "--env-file",
      "--expose",
      "--gpus",
      "--group-add",
      "--health-cmd",
      "--health-interval",
      "--health-retries",
      "--health-start-interval",
      "--health-start-period",
      "--health-timeout",
      "--help",
      "--hostname",
      "--init",
      "--interactive",
      "--ip",
      "--ip6",
      "--ipc",
      "--isolation",
      "--label",
      "--label-file",
      "--link",
      "--link-local-ip",
      "--log-driver",
      "--log-opt",
      "--mac-address",
      "--memory",
      "--memory-reservation",
      "--memory-swap",
      "--memory-swappiness",
      "--mount",
      "--name",
      "--network",
      "--network-alias",
      "--no-healthcheck",
      "--oom-kill-disable",
      "--oom-score-adj",
      "--pid",
      "--pids-limit",
      "--platform",
      "--privileged",
      "--publish",
      "--publish-all",
      "--pull",
      "--quiet",
      "--read-only",
      "--restart",
      "--rm",
      "--runtime",
      "--security-opt",
      "--shm-size",
      "--stop-signal",
      "--stop-timeout",
      "--storage-opt",
      "--sysctl",
      "--tmpfs",
      "--tty",
      "--ulimit",
      "--umask",
      "--use-api-socket",
      "--user",
      "--userns",
      "--uts",
      "--volume",
      "--volume-driver",
      "--volumes-from",
      "--workdir",
      "-1",
      "-P",
      "-a",
      "-c",
      "-e",
      "-h",
      "-i",
      "-l",
      "-m",
      "-p",
      "-q",
      "-t",
      "-u",
      "-v",
      "-w"
    ],
    "descriptionOriginal": "Create a new container"
  },
  {
    "command": "docker container diff",
    "description": "Mostra alterações em arquivos e pastas do filesystem do container.",
    "help": "Usage:  docker container diff CONTAINER\n\nInspect changes to files or directories on a container's filesystem\n\nAliases:\n  docker container diff, docker diff\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Inspect changes to files or directories on a container's filesystem"
  },
  {
    "command": "docker container exec",
    "description": "Executa um comando em um container que já está rodando.",
    "help": "Usage:  docker container exec [OPTIONS] CONTAINER COMMAND [ARG...]\n\nExecute a command in a running container\n\nAliases:\n  docker container exec, docker exec\n\nOptions:\n  -d, --detach               Detached mode: run command in the background\n      --detach-keys string   Override the key sequence for detaching a\n                             container\n  -e, --env list             Set environment variables\n      --env-file list        Read in a file of environment variables\n  -i, --interactive          Keep STDIN open even if not attached\n      --privileged           Give extended privileges to the command\n  -t, --tty                  Allocate a pseudo-TTY\n  -u, --user string          Username or UID (format:\n                             \"<name|uid>[:<group|gid>]\")\n  -w, --workdir string       Working directory inside the container\n",
    "flags": [
      "--detach",
      "--detach-keys",
      "--env",
      "--env-file",
      "--help",
      "--interactive",
      "--privileged",
      "--tty",
      "--user",
      "--workdir",
      "-d",
      "-e",
      "-i",
      "-t",
      "-u",
      "-w"
    ],
    "descriptionOriginal": "Execute a command in a running container"
  },
  {
    "command": "docker container export",
    "description": "Exporta o filesystem de um container para um arquivo tar.",
    "help": "Usage:  docker container export [OPTIONS] CONTAINER\n\nExport a container's filesystem as a tar archive\n\nAliases:\n  docker container export, docker export\n\nOptions:\n  -o, --output string   Write to a file, instead of STDOUT\n",
    "flags": [
      "--help",
      "--output",
      "-o"
    ],
    "descriptionOriginal": "Export a container's filesystem as a tar archive"
  },
  {
    "command": "docker container inspect",
    "description": "Mostra informações detalhadas de containers.",
    "help": "Usage:  docker container inspect [OPTIONS] CONTAINER [CONTAINER...]\n\nDisplay detailed information on one or more containers\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -s, --size            Display total file sizes\n",
    "flags": [
      "--format",
      "--help",
      "--size",
      "-f",
      "-s"
    ],
    "descriptionOriginal": "Display detailed information on one or more containers"
  },
  {
    "command": "docker container kill",
    "description": "Envia um sinal a um ou mais containers em execução.",
    "help": "Usage:  docker container kill [OPTIONS] CONTAINER [CONTAINER...]\n\nKill one or more running containers\n\nAliases:\n  docker container kill, docker kill\n\nOptions:\n  -s, --signal string   Signal to send to the container\n",
    "flags": [
      "--help",
      "--signal",
      "-s"
    ],
    "descriptionOriginal": "Kill one or more running containers"
  },
  {
    "command": "docker container list",
    "description": "Lista containers.",
    "help": "Usage:  docker container ls [OPTIONS]\n\nList containers\n\nAliases:\n  docker container ls, docker container list, docker container ps, docker ps\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -n, --last int        Show n last created containers (includes all\n                        states) (default -1)\n  -l, --latest          Show the latest created container (includes all\n                        states)\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only display container IDs\n  -s, --size            Display total file sizes\n",
    "flags": [
      "--all",
      "--filter",
      "--format",
      "--help",
      "--last",
      "--latest",
      "--no-trunc",
      "--quiet",
      "--size",
      "-a",
      "-f",
      "-l",
      "-n",
      "-q",
      "-s"
    ],
    "descriptionOriginal": "List containers"
  },
  {
    "command": "docker container logs",
    "description": "Mostra os logs de um container.",
    "help": "Usage:  docker container logs [OPTIONS] CONTAINER\n\nFetch the logs of a container\n\nAliases:\n  docker container logs, docker logs\n\nOptions:\n      --details        Show extra details provided to logs\n  -f, --follow         Follow log output\n      --since string   Show logs since timestamp (e.g.\n                       \"2013-01-02T13:23:37Z\") or relative (e.g. \"42m\"\n                       for 42 minutes)\n  -n, --tail string    Number of lines to show from the end of the logs\n                       (default \"all\")\n  -t, --timestamps     Show timestamps\n      --until string   Show logs before a timestamp (e.g.\n                       \"2013-01-02T13:23:37Z\") or relative (e.g. \"42m\"\n                       for 42 minutes)\n",
    "flags": [
      "--details",
      "--follow",
      "--help",
      "--since",
      "--tail",
      "--timestamps",
      "--until",
      "-f",
      "-n",
      "-t"
    ],
    "descriptionOriginal": "Fetch the logs of a container"
  },
  {
    "command": "docker container ls",
    "description": "Lista containers.",
    "help": "Usage:  docker container ls [OPTIONS]\n\nList containers\n\nAliases:\n  docker container ls, docker container list, docker container ps, docker ps\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -n, --last int        Show n last created containers (includes all\n                        states) (default -1)\n  -l, --latest          Show the latest created container (includes all\n                        states)\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only display container IDs\n  -s, --size            Display total file sizes\n",
    "flags": [
      "--all",
      "--filter",
      "--format",
      "--help",
      "--last",
      "--latest",
      "--no-trunc",
      "--quiet",
      "--size",
      "-a",
      "-f",
      "-l",
      "-n",
      "-q",
      "-s"
    ],
    "descriptionOriginal": "List containers"
  },
  {
    "command": "docker container pause",
    "description": "Pausa todos os processos de um ou mais containers.",
    "help": "Usage:  docker container pause CONTAINER [CONTAINER...]\n\nPause all processes within one or more containers\n\nAliases:\n  docker container pause, docker pause\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Pause all processes within one or more containers"
  },
  {
    "command": "docker container port",
    "description": "Lista as portas publicadas de um container.",
    "help": "Usage:  docker container port CONTAINER [PRIVATE_PORT[/PROTO]]\n\nList port mappings or a specific mapping for the container\n\nAliases:\n  docker container port, docker port\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "List port mappings or a specific mapping for the container"
  },
  {
    "command": "docker container prune",
    "description": "Remove todos os containers parados.",
    "help": "Usage:  docker container prune [OPTIONS]\n\nRemove all stopped containers\n\nOptions:\n      --filter filter   Provide filter values (e.g. \"until=<timestamp>\")\n  -f, --force           Do not prompt for confirmation\n",
    "flags": [
      "--filter",
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove all stopped containers"
  },
  {
    "command": "docker container ps",
    "description": "Lista containers.",
    "help": "Usage:  docker container ls [OPTIONS]\n\nList containers\n\nAliases:\n  docker container ls, docker container list, docker container ps, docker ps\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -n, --last int        Show n last created containers (includes all\n                        states) (default -1)\n  -l, --latest          Show the latest created container (includes all\n                        states)\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only display container IDs\n  -s, --size            Display total file sizes\n",
    "flags": [
      "--all",
      "--filter",
      "--format",
      "--help",
      "--last",
      "--latest",
      "--no-trunc",
      "--quiet",
      "--size",
      "-a",
      "-f",
      "-l",
      "-n",
      "-q",
      "-s"
    ],
    "descriptionOriginal": "List containers"
  },
  {
    "command": "docker container remove",
    "description": "Remove um ou mais containers.",
    "help": "Usage:  docker container rm [OPTIONS] CONTAINER [CONTAINER...]\n\nRemove one or more containers\n\nAliases:\n  docker container rm, docker container remove, docker rm\n\nOptions:\n  -f, --force     Force the removal of a running container (uses SIGKILL)\n  -l, --link      Remove the specified link\n  -v, --volumes   Remove anonymous volumes associated with the container\n",
    "flags": [
      "--force",
      "--help",
      "--link",
      "--volumes",
      "-f",
      "-l",
      "-v"
    ],
    "descriptionOriginal": "Remove one or more containers"
  },
  {
    "command": "docker container rename",
    "description": "Renomeia um container.",
    "help": "Usage:  docker container rename CONTAINER NEW_NAME\n\nRename a container\n\nAliases:\n  docker container rename, docker rename\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Rename a container"
  },
  {
    "command": "docker container restart",
    "description": "Reinicia um ou mais containers.",
    "help": "Usage:  docker container restart [OPTIONS] CONTAINER [CONTAINER...]\n\nRestart one or more containers\n\nAliases:\n  docker container restart, docker restart\n\nOptions:\n  -s, --signal string   Signal to send to the container\n  -t, --timeout int     Seconds to wait before killing the container\n",
    "flags": [
      "--help",
      "--signal",
      "--timeout",
      "-s",
      "-t"
    ],
    "descriptionOriginal": "Restart one or more containers"
  },
  {
    "command": "docker container rm",
    "description": "Remove um ou mais containers.",
    "help": "Usage:  docker container rm [OPTIONS] CONTAINER [CONTAINER...]\n\nRemove one or more containers\n\nAliases:\n  docker container rm, docker container remove, docker rm\n\nOptions:\n  -f, --force     Force the removal of a running container (uses SIGKILL)\n  -l, --link      Remove the specified link\n  -v, --volumes   Remove anonymous volumes associated with the container\n",
    "flags": [
      "--force",
      "--help",
      "--link",
      "--volumes",
      "-f",
      "-l",
      "-v"
    ],
    "descriptionOriginal": "Remove one or more containers"
  },
  {
    "command": "docker container run",
    "description": "Cria e inicia um container a partir de uma imagem.",
    "help": "Usage:  docker container run [OPTIONS] IMAGE [COMMAND] [ARG...]\n\nCreate and run a new container from an image\n\nAliases:\n  docker container run, docker run\n\nOptions:\n      --add-host list                    Add a custom host-to-IP mapping\n                                         (host:ip)\n      --annotation map                   Add an annotation to the\n                                         container (passed through to the\n                                         OCI runtime) (default map[])\n  -a, --attach list                      Attach to STDIN, STDOUT or STDERR\n      --blkio-weight uint16              Block IO (relative weight),\n                                         between 10 and 1000, or 0 to\n                                         disable (default 0)\n      --blkio-weight-device list         Block IO weight (relative device\n                                         weight) (default [])\n      --cap-add list                     Add Linux capabilities\n      --cap-drop list                    Drop Linux capabilities\n      --cgroup-parent string             Optional parent cgroup for the\n                                         container\n      --cgroupns string                  Cgroup namespace to use\n                                         (host|private)\n                                         'host':    Run the container in\n                                         the Docker host's cgroup\n                                         namespace\n                                         'private': Run the container in\n                                         its own private cgroup namespace\n                                         '':        Use the cgroup\n                                         namespace as configured by the\n                                                    default-cgroupns-mode\n                                         option on the daemon (default)\n      --cidfile string                   Write the container ID to the file\n      --cpu-period int                   Limit CPU CFS (Completely Fair\n                                         Scheduler) period\n      --cpu-quota int                    Limit CPU CFS (Completely Fair\n                                         Scheduler) quota\n      --cpu-rt-period int                Limit CPU real-time period in\n                                         microseconds\n      --cpu-rt-runtime int               Limit CPU real-time runtime in\n                                         microseconds\n  -c, --cpu-shares int                   CPU shares (relative weight)\n      --cpus decimal                     Number of CPUs\n      --cpuset-cpus string               CPUs in which to allow execution\n                                         (0-3, 0,1)\n      --cpuset-mems string               MEMs in which to allow execution\n                                         (0-3, 0,1)\n  -d, --detach                           Run container in background and\n                                         print container ID\n      --detach-keys string               Override the key sequence for\n                                         detaching a container\n      --device list                      Add a host device to the container\n      --device-cgroup-rule list          Add a rule to the cgroup allowed\n                                         devices list\n      --device-read-bps list             Limit read rate (bytes per\n                                         second) from a device (default [])\n      --device-read-iops list            Limit read rate (IO per second)\n                                         from a device (default [])\n      --device-write-bps list            Limit write rate (bytes per\n                                         second) to a device (default [])\n      --device-write-iops list           Limit write rate (IO per second)\n                                         to a device (default [])\n      --dns list                         Set custom DNS servers\n      --dns-option list                  Set DNS options\n      --dns-search list                  Set custom DNS search domains\n      --domainname string                Container NIS domain name\n      --entrypoint string                Overwrite the default ENTRYPOINT\n                                         of the image\n  -e, --env list                         Set environment variables\n      --env-file list                    Read in a file of environment\n                                         variables\n      --expose list                      Expose a port or a range of ports\n      --gpus gpu-request                 GPU devices to add to the\n                                         container ('all' to pass all GPUs)\n      --group-add list                   Add additional groups to join\n      --health-cmd string                Command to run to check health\n      --health-interval duration         Time between running the check\n                                         (ms|s|m|h) (default 0s)\n      --health-retries int               Consecutive failures needed to\n                                         report unhealthy\n      --health-start-interval duration   Time between running the check\n                                         during the start period\n                                         (ms|s|m|h) (default 0s)\n      --health-start-period duration     Start period for the container\n                                         to initialize before starting\n                                         health-retries countdown\n                                         (ms|s|m|h) (default 0s)\n      --health-timeout duration          Maximum time to allow one check\n                                         to run (ms|s|m|h) (default 0s)\n      --help                             Print usage\n  -h, --hostname string                  Container host name\n      --init                             Run an init inside the container\n                                         that forwards signals and reaps\n                                         processes\n  -i, --interactive                      Keep STDIN open even if not attached\n      --ip ip                            IPv4 address (e.g., 172.30.100.104)\n      --ip6 ip                           IPv6 address (e.g., 2001:db8::33)\n      --ipc string                       IPC mode to use\n      --isolation string                 Container isolation technology\n  -l, --label list                       Set meta data on a container\n      --label-file list                  Read in a line delimited file of\n                                         labels\n      --link list                        Add link to another container\n      --link-local-ip list               Container IPv4/IPv6 link-local\n                                         addresses\n      --log-driver string                Logging driver for the container\n      --log-opt list                     Log driver options\n      --mac-address string               Container MAC address (e.g.,\n                                         92:d0:c6:0a:29:33)\n  -m, --memory bytes                     Memory limit\n      --memory-reservation bytes         Memory soft limit\n      --memory-swap bytes                Swap limit equal to memory plus\n                                         swap: '-1' to enable unlimited swap\n      --memory-swappiness int            Tune container memory swappiness\n                                         (0 to 100) (default -1)\n      --mount mount                      Attach a filesystem mount to the\n                                         container\n      --name string                      Assign a name to the container\n      --network network                  Connect a container to a network\n      --network-alias list               Add network-scoped alias for the\n                                         container\n      --no-healthcheck                   Disable any container-specified\n                                         HEALTHCHECK\n      --oom-kill-disable                 Disable OOM Killer\n      --oom-score-adj int                Tune host's OOM preferences\n                                         (-1000 to 1000)\n      --pid string                       PID namespace to use\n      --pids-limit int                   Tune container pids limit (set\n                                         -1 for unlimited)\n      --platform string                  Set platform if server is\n                                         multi-platform capable\n      --privileged                       Give extended privileges to this\n                                         container\n  -p, --publish list                     Publish a container's port(s) to\n                                         the host\n  -P, --publish-all                      Publish all exposed ports to\n                                         random ports\n      --pull string                      Pull image before running\n                                         (\"always\", \"missing\", \"never\")\n                                         (default \"missing\")\n  -q, --quiet                            Suppress the pull output\n      --read-only                        Mount the container's root\n                                         filesystem as read only\n      --restart string                   Restart policy to apply when a\n                                         container exits (default \"no\")\n      --rm                               Automatically remove the\n                                         container and its associated\n                                         anonymous volumes when it exits\n      --runtime string                   Runtime to use for this container\n      --security-opt list                Security Options\n      --shm-size bytes                   Size of /dev/shm\n      --sig-proxy                        Proxy received signals to the\n                                         process (default true)\n      --stop-signal string               Signal to stop the container\n      --stop-timeout int                 Timeout (in seconds) to stop a\n                                         container\n      --storage-opt list                 Storage driver options for the\n                                         container\n      --sysctl map                       Sysctl options (default map[])\n      --tmpfs list                       Mount a tmpfs directory\n  -t, --tty                              Allocate a pseudo-TTY\n      --ulimit ulimit                    Ulimit options (default [])\n      --umask umask                      Set umask for the container\n      --use-api-socket                   Bind mount Docker API socket and\n                                         required auth\n  -u, --user string                      Username or UID (format:\n                                         <name|uid>[:<group|gid>])\n      --userns string                    User namespace to use\n      --uts string                       UTS namespace to use\n  -v, --volume list                      Bind mount a volume\n      --volume-driver string             Optional volume driver for the\n                                         container\n      --volumes-from list                Mount volumes from the specified\n                                         container(s)\n  -w, --workdir string                   Working directory inside the\n                                         container\n",
    "flags": [
      "--add-host",
      "--annotation",
      "--attach",
      "--blkio-weight",
      "--blkio-weight-device",
      "--cap-add",
      "--cap-drop",
      "--cgroup-parent",
      "--cgroupns",
      "--cidfile",
      "--cpu-period",
      "--cpu-quota",
      "--cpu-rt-period",
      "--cpu-rt-runtime",
      "--cpu-shares",
      "--cpus",
      "--cpuset-cpus",
      "--cpuset-mems",
      "--detach",
      "--detach-keys",
      "--device",
      "--device-cgroup-rule",
      "--device-read-bps",
      "--device-read-iops",
      "--device-write-bps",
      "--device-write-iops",
      "--dns",
      "--dns-option",
      "--dns-search",
      "--domainname",
      "--entrypoint",
      "--env",
      "--env-file",
      "--expose",
      "--gpus",
      "--group-add",
      "--health-cmd",
      "--health-interval",
      "--health-retries",
      "--health-start-interval",
      "--health-start-period",
      "--health-timeout",
      "--help",
      "--hostname",
      "--init",
      "--interactive",
      "--ip",
      "--ip6",
      "--ipc",
      "--isolation",
      "--label",
      "--label-file",
      "--link",
      "--link-local-ip",
      "--log-driver",
      "--log-opt",
      "--mac-address",
      "--memory",
      "--memory-reservation",
      "--memory-swap",
      "--memory-swappiness",
      "--mount",
      "--name",
      "--network",
      "--network-alias",
      "--no-healthcheck",
      "--oom-kill-disable",
      "--oom-score-adj",
      "--pid",
      "--pids-limit",
      "--platform",
      "--privileged",
      "--publish",
      "--publish-all",
      "--pull",
      "--quiet",
      "--read-only",
      "--restart",
      "--rm",
      "--runtime",
      "--security-opt",
      "--shm-size",
      "--sig-proxy",
      "--stop-signal",
      "--stop-timeout",
      "--storage-opt",
      "--sysctl",
      "--tmpfs",
      "--tty",
      "--ulimit",
      "--umask",
      "--use-api-socket",
      "--user",
      "--userns",
      "--uts",
      "--volume",
      "--volume-driver",
      "--volumes-from",
      "--workdir",
      "-1",
      "-P",
      "-a",
      "-c",
      "-d",
      "-e",
      "-h",
      "-i",
      "-l",
      "-m",
      "-p",
      "-q",
      "-t",
      "-u",
      "-v",
      "-w"
    ],
    "descriptionOriginal": "Create and run a new container from an image"
  },
  {
    "command": "docker container start",
    "description": "Inicia um ou mais containers parados.",
    "help": "Usage:  docker container start [OPTIONS] CONTAINER [CONTAINER...]\n\nStart one or more stopped containers\n\nAliases:\n  docker container start, docker start\n\nOptions:\n  -a, --attach               Attach STDOUT/STDERR and forward signals\n      --detach-keys string   Override the key sequence for detaching a\n                             container\n  -i, --interactive          Attach container's STDIN\n",
    "flags": [
      "--attach",
      "--detach-keys",
      "--help",
      "--interactive",
      "-a",
      "-i"
    ],
    "descriptionOriginal": "Start one or more stopped containers"
  },
  {
    "command": "docker container stats",
    "description": "Mostra o uso de recursos dos containers em tempo real.",
    "help": "Usage:  docker container stats [OPTIONS] [CONTAINER...]\n\nDisplay a live stream of container(s) resource usage statistics\n\nAliases:\n  docker container stats, docker stats\n\nOptions:\n  -a, --all             Show all containers (default shows just running)\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-stream       Disable streaming stats and only pull the first result\n      --no-trunc        Do not truncate output\n",
    "flags": [
      "--all",
      "--format",
      "--help",
      "--no-stream",
      "--no-trunc",
      "-a"
    ],
    "descriptionOriginal": "Display a live stream of container(s) resource usage statistics"
  },
  {
    "command": "docker container stop",
    "description": "Solicita a parada de um ou mais containers em execução.",
    "help": "Usage:  docker container stop [OPTIONS] CONTAINER [CONTAINER...]\n\nStop one or more running containers\n\nAliases:\n  docker container stop, docker stop\n\nOptions:\n  -s, --signal string   Signal to send to the container\n  -t, --timeout int     Seconds to wait before killing the container\n",
    "flags": [
      "--help",
      "--signal",
      "--timeout",
      "-s",
      "-t"
    ],
    "descriptionOriginal": "Stop one or more running containers"
  },
  {
    "command": "docker container top",
    "description": "Lista os processos em execução de um container.",
    "help": "Usage:  docker container top CONTAINER [ps OPTIONS]\n\nDisplay the running processes of a container\n\nAliases:\n  docker container top, docker top\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Display the running processes of a container"
  },
  {
    "command": "docker container unpause",
    "description": "Retoma os processos pausados de um ou mais containers.",
    "help": "Usage:  docker container unpause CONTAINER [CONTAINER...]\n\nUnpause all processes within one or more containers\n\nAliases:\n  docker container unpause, docker unpause\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Unpause all processes within one or more containers"
  },
  {
    "command": "docker container update",
    "description": "Atualiza a configuração de um ou mais containers.",
    "help": "Usage:  docker container update [OPTIONS] CONTAINER [CONTAINER...]\n\nUpdate configuration of one or more containers\n\nAliases:\n  docker container update, docker update\n\nOptions:\n      --blkio-weight uint16        Block IO (relative weight), between 10\n                                   and 1000, or 0 to disable (default 0)\n      --cpu-period int             Limit CPU CFS (Completely Fair\n                                   Scheduler) period\n      --cpu-quota int              Limit CPU CFS (Completely Fair\n                                   Scheduler) quota\n      --cpu-rt-period int          Limit the CPU real-time period in\n                                   microseconds\n      --cpu-rt-runtime int         Limit the CPU real-time runtime in\n                                   microseconds\n  -c, --cpu-shares int             CPU shares (relative weight)\n      --cpus decimal               Number of CPUs\n      --cpuset-cpus string         CPUs in which to allow execution (0-3, 0,1)\n      --cpuset-mems string         MEMs in which to allow execution (0-3, 0,1)\n  -m, --memory bytes               Memory limit\n      --memory-reservation bytes   Memory soft limit\n      --memory-swap bytes          Swap limit equal to memory plus swap:\n                                   -1 to enable unlimited swap\n      --pids-limit int             Tune container pids limit (set -1 for\n                                   unlimited)\n      --restart string             Restart policy to apply when a\n                                   container exits\n",
    "flags": [
      "--blkio-weight",
      "--cpu-period",
      "--cpu-quota",
      "--cpu-rt-period",
      "--cpu-rt-runtime",
      "--cpu-shares",
      "--cpus",
      "--cpuset-cpus",
      "--cpuset-mems",
      "--help",
      "--memory",
      "--memory-reservation",
      "--memory-swap",
      "--pids-limit",
      "--restart",
      "-1",
      "-c",
      "-m"
    ],
    "descriptionOriginal": "Update configuration of one or more containers"
  },
  {
    "command": "docker container wait",
    "description": "Espera containers pararem e mostra seus códigos de saída.",
    "help": "Usage:  docker container wait CONTAINER [CONTAINER...]\n\nBlock until one or more containers stop, then print their exit codes\n\nAliases:\n  docker container wait, docker wait\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Block until one or more containers stop, then print their exit codes"
  },
  {
    "command": "docker context create",
    "description": "Cria um contexto de conexão.",
    "help": "Usage:  docker context create [OPTIONS] CONTEXT\n\nCreate a context\n\nDocker endpoint config:\n\nNAME                DESCRIPTION\nfrom                Copy named context's Docker endpoint configuration\nhost                Docker endpoint on which to connect\nca                  Trust certs signed only by this CA\ncert                Path to TLS certificate file\nkey                 Path to TLS key file\nskip-tls-verify     Skip TLS certificate validation\n\nExample:\n\n$ docker context create my-context --description \"some description\" --docker \"host=tcp://myserver:2376,ca=~/ca-file,cert=~/cert-file,key=~/key-file\"\n\nOptions:\n      --description string      Description of the context\n      --docker stringToString   set the docker endpoint (default [])\n      --from string             create context from a named context\n",
    "flags": [
      "--description",
      "--docker",
      "--from",
      "--help"
    ],
    "descriptionOriginal": "Create a context"
  },
  {
    "command": "docker context export",
    "description": "Exporta um contexto para um arquivo tar ou para a saída padrão.",
    "help": "Usage:  docker context export [OPTIONS] CONTEXT [FILE|-]\n\nExport a context to a tar archive FILE or a tar stream on STDOUT.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Export a context to a tar archive FILE or a tar stream on STDOUT."
  },
  {
    "command": "docker context import",
    "description": "Importa um contexto de um arquivo tar ou zip.",
    "help": "Usage:  docker context import CONTEXT FILE|-\n\nImport a context from a tar or zip file\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Import a context from a tar or zip file"
  },
  {
    "command": "docker context inspect",
    "description": "Mostra informações detalhadas de contextos.",
    "help": "Usage:  docker context inspect [OPTIONS] [CONTEXT] [CONTEXT...]\n\nDisplay detailed information on one or more contexts\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more contexts"
  },
  {
    "command": "docker context list",
    "description": "Lista contextos de conexão.",
    "help": "Usage:  docker context ls [OPTIONS]\n\nList contexts\n\nAliases:\n  docker context ls, docker context list\n\nOptions:\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only show context names\n",
    "flags": [
      "--format",
      "--help",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "List contexts"
  },
  {
    "command": "docker context ls",
    "description": "Lista contextos de conexão.",
    "help": "Usage:  docker context ls [OPTIONS]\n\nList contexts\n\nAliases:\n  docker context ls, docker context list\n\nOptions:\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only show context names\n",
    "flags": [
      "--format",
      "--help",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "List contexts"
  },
  {
    "command": "docker context remove",
    "description": "Remove um ou mais contextos.",
    "help": "Usage:  docker context rm CONTEXT [CONTEXT...]\n\nRemove one or more contexts\n\nAliases:\n  docker context rm, docker context remove\n\nOptions:\n  -f, --force   Force the removal of a context in use\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more contexts"
  },
  {
    "command": "docker context rm",
    "description": "Remove um ou mais contextos.",
    "help": "Usage:  docker context rm CONTEXT [CONTEXT...]\n\nRemove one or more contexts\n\nAliases:\n  docker context rm, docker context remove\n\nOptions:\n  -f, --force   Force the removal of a context in use\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more contexts"
  },
  {
    "command": "docker context show",
    "description": "Mostra o nome do contexto atual.",
    "help": "Usage:  docker context show\n\nPrint the name of the current context\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Print the name of the current context"
  },
  {
    "command": "docker context update",
    "description": "Atualiza um contexto.",
    "help": "Usage:  docker context update [OPTIONS] CONTEXT\n\nUpdate a context\n\nDocker endpoint config:\n\nNAME                DESCRIPTION\nfrom                Copy named context's Docker endpoint configuration\nhost                Docker endpoint on which to connect\nca                  Trust certs signed only by this CA\ncert                Path to TLS certificate file\nkey                 Path to TLS key file\nskip-tls-verify     Skip TLS certificate validation\n\nExample:\n\n$ docker context update my-context --description \"some description\" --docker \"host=tcp://myserver:2376,ca=~/ca-file,cert=~/cert-file,key=~/key-file\"\n\nOptions:\n      --description string      Description of the context\n      --docker stringToString   set the docker endpoint (default [])\n",
    "flags": [
      "--description",
      "--docker",
      "--help"
    ],
    "descriptionOriginal": "Update a context"
  },
  {
    "command": "docker context use",
    "description": "Seleciona o contexto padrão do Docker.",
    "help": "Usage:  docker context use CONTEXT\n\nSet the default docker context\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Set the default docker context"
  },
  {
    "command": "docker image build",
    "description": "Inicia a construção de uma imagem.",
    "help": "Usage:  docker buildx build [OPTIONS] PATH | URL | -\n\nStart a build\n\nAliases:\n  docker build, docker builder build, docker image build, docker buildx b\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder\n                                      instance (default \"default\")\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Start a build"
  },
  {
    "command": "docker image history",
    "description": "Mostra o histórico de uma imagem.",
    "help": "Usage:  docker image history [OPTIONS] IMAGE\n\nShow the history of an image\n\nAliases:\n  docker image history, docker history\n\nOptions:\n      --format string     Format output using a custom template:\n                          'table':            Print output in table\n                          format with column headers (default)\n                          'table TEMPLATE':   Print output in table\n                          format using the given Go template\n                          'json':             Print in JSON format\n                          'TEMPLATE':         Print output using the\n                          given Go template.\n                          Refer to https://docs.docker.com/go/formatting/\n                          for more information about formatting output\n                          with templates\n  -H, --human             Print sizes and dates in human readable format\n                          (default true)\n      --no-trunc          Don't truncate output\n      --platform string   Show history for the given platform. Formatted\n                          as \"os[/arch[/variant]]\" (e.g., \"linux/amd64\")\n  -q, --quiet             Only show image IDs\n",
    "flags": [
      "--format",
      "--help",
      "--human",
      "--no-trunc",
      "--platform",
      "--quiet",
      "-H",
      "-q"
    ],
    "descriptionOriginal": "Show the history of an image"
  },
  {
    "command": "docker image import",
    "description": "Cria uma imagem de filesystem a partir de um arquivo tar.",
    "help": "Usage:  docker image import [OPTIONS] file|URL|- [REPOSITORY[:TAG]]\n\nImport the contents from a tarball to create a filesystem image\n\nAliases:\n  docker image import, docker import\n\nOptions:\n  -c, --change list       Apply Dockerfile instruction to the created image\n  -m, --message string    Set commit message for imported image\n      --platform string   Set platform if server is multi-platform capable\n",
    "flags": [
      "--change",
      "--help",
      "--message",
      "--platform",
      "-c",
      "-m"
    ],
    "descriptionOriginal": "Import the contents from a tarball to create a filesystem image"
  },
  {
    "command": "docker image inspect",
    "description": "Mostra informações detalhadas de imagens.",
    "help": "Usage:  docker image inspect [OPTIONS] IMAGE [IMAGE...]\n\nDisplay detailed information on one or more images\n\nOptions:\n  -f, --format string     Format output using a custom template:\n                          'json':             Print in JSON format\n                          'TEMPLATE':         Print output using the\n                          given Go template.\n                          Refer to https://docs.docker.com/go/formatting/\n                          for more information about formatting output\n                          with templates\n      --platform string   Inspect a specific platform of the\n                          multi-platform image.\n                          If the image or the server is not\n                          multi-platform capable, the command will error\n                          out if the platform does not match.\n                          'os[/arch[/variant]]': Explicit platform (eg.\n                          linux/amd64)\n",
    "flags": [
      "--format",
      "--help",
      "--platform",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more images"
  },
  {
    "command": "docker image list",
    "description": "Lista imagens locais.",
    "help": "Usage:  docker image ls [OPTIONS] [REPOSITORY[:TAG]]\n\nList images\n\nAliases:\n  docker image ls, docker image list, docker images\n\nOptions:\n  -a, --all             Show all images (default hides intermediate and\n                        dangling images)\n      --digests         Show digests\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only show image IDs\n      --tree            List multi-platform images as a tree (EXPERIMENTAL)\n",
    "flags": [
      "--all",
      "--digests",
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "--tree",
      "-a",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List images"
  },
  {
    "command": "docker image load",
    "description": "Carrega uma imagem de um arquivo tar ou da entrada padrão.",
    "help": "Usage:  docker image load [OPTIONS]\n\nLoad an image from a tar archive or STDIN\n\nAliases:\n  docker image load, docker load\n\nOptions:\n  -i, --input string       Read from tar archive file, instead of STDIN\n      --platform strings   Load only the given platform(s). Formatted as\n                           a comma-separated list of\n                           \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64,linux/arm64/v8\").\n  -q, --quiet              Suppress the load output\n",
    "flags": [
      "--help",
      "--input",
      "--platform",
      "--quiet",
      "-i",
      "-q"
    ],
    "descriptionOriginal": "Load an image from a tar archive or STDIN"
  },
  {
    "command": "docker image ls",
    "description": "Lista imagens locais.",
    "help": "Usage:  docker image ls [OPTIONS] [REPOSITORY[:TAG]]\n\nList images\n\nAliases:\n  docker image ls, docker image list, docker images\n\nOptions:\n  -a, --all             Show all images (default hides intermediate and\n                        dangling images)\n      --digests         Show digests\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only show image IDs\n      --tree            List multi-platform images as a tree (EXPERIMENTAL)\n",
    "flags": [
      "--all",
      "--digests",
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "--tree",
      "-a",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List images"
  },
  {
    "command": "docker image prune",
    "description": "Remove imagens não utilizadas.",
    "help": "Usage:  docker image prune [OPTIONS]\n\nRemove unused images\n\nOptions:\n  -a, --all             Remove all unused images, not just dangling ones\n      --filter filter   Provide filter values (e.g. \"until=<timestamp>\")\n  -f, --force           Do not prompt for confirmation\n",
    "flags": [
      "--all",
      "--filter",
      "--force",
      "--help",
      "-a",
      "-f"
    ],
    "descriptionOriginal": "Remove unused images"
  },
  {
    "command": "docker image pull",
    "description": "Baixa uma imagem de um registry.",
    "help": "Usage:  docker image pull [OPTIONS] NAME[:TAG|@DIGEST]\n\nDownload an image from a registry\n\nAliases:\n  docker image pull, docker pull\n\nOptions:\n  -a, --all-tags          Download all tagged images in the repository\n      --platform string   Set platform if server is multi-platform capable\n  -q, --quiet             Suppress verbose output\n",
    "flags": [
      "--all-tags",
      "--help",
      "--platform",
      "--quiet",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "Download an image from a registry"
  },
  {
    "command": "docker image push",
    "description": "Envia uma imagem para um registry.",
    "help": "Usage:  docker image push [OPTIONS] NAME[:TAG]\n\nUpload an image to a registry\n\nAliases:\n  docker image push, docker push\n\nOptions:\n  -a, --all-tags          Push all tags of an image to the repository\n      --platform string   Push a platform-specific manifest as a\n                          single-platform image to the registry.\n                          Image index won't be pushed, meaning that other\n                          manifests, including attestations won't be\n                          preserved.\n                          'os[/arch[/variant]]': Explicit platform (eg.\n                          linux/amd64)\n  -q, --quiet             Suppress verbose output\n",
    "flags": [
      "--all-tags",
      "--help",
      "--platform",
      "--quiet",
      "-a",
      "-q"
    ],
    "descriptionOriginal": "Upload an image to a registry"
  },
  {
    "command": "docker image remove",
    "description": "Remove uma ou mais imagens.",
    "help": "Usage:  docker image rm [OPTIONS] IMAGE [IMAGE...]\n\nRemove one or more images\n\nAliases:\n  docker image rm, docker image remove, docker rmi\n\nOptions:\n  -f, --force              Force removal of the image\n      --no-prune           Do not delete untagged parents\n      --platform strings   Remove only the given platform variant.\n                           Formatted as \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64\")\n",
    "flags": [
      "--force",
      "--help",
      "--no-prune",
      "--platform",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more images"
  },
  {
    "command": "docker image rm",
    "description": "Remove uma ou mais imagens.",
    "help": "Usage:  docker image rm [OPTIONS] IMAGE [IMAGE...]\n\nRemove one or more images\n\nAliases:\n  docker image rm, docker image remove, docker rmi\n\nOptions:\n  -f, --force              Force removal of the image\n      --no-prune           Do not delete untagged parents\n      --platform strings   Remove only the given platform variant.\n                           Formatted as \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64\")\n",
    "flags": [
      "--force",
      "--help",
      "--no-prune",
      "--platform",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more images"
  },
  {
    "command": "docker image save",
    "description": "Salva imagens em um arquivo tar; por padrão, escreve na saída padrão.",
    "help": "Usage:  docker image save [OPTIONS] IMAGE [IMAGE...]\n\nSave one or more images to a tar archive (streamed to STDOUT by default)\n\nAliases:\n  docker image save, docker save\n\nOptions:\n  -o, --output string      Write to a file, instead of STDOUT\n      --platform strings   Save only the given platform(s). Formatted as\n                           a comma-separated list of\n                           \"os[/arch[/variant]]\" (e.g.,\n                           \"linux/amd64,linux/arm64/v8\")\n",
    "flags": [
      "--help",
      "--output",
      "--platform",
      "-o"
    ],
    "descriptionOriginal": "Save one or more images to a tar archive (streamed to STDOUT by default)"
  },
  {
    "command": "docker image tag",
    "description": "Cria uma tag de destino que referencia uma imagem de origem.",
    "help": "Usage:  docker image tag SOURCE_IMAGE[:TAG] TARGET_IMAGE[:TAG]\n\nCreate a tag TARGET_IMAGE that refers to SOURCE_IMAGE\n\nAliases:\n  docker image tag, docker tag\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Create a tag TARGET_IMAGE that refers to SOURCE_IMAGE"
  },
  {
    "command": "docker manifest annotate",
    "description": "Adiciona informações a um manifesto local de imagem.",
    "help": "Usage:  docker manifest annotate [OPTIONS] MANIFEST_LIST MANIFEST\n\nAdd additional information to a local image manifest\n\nEXPERIMENTAL:\n  docker manifest annotate is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --arch string           Set architecture\n      --os string             Set operating system\n      --os-features strings   Set operating system feature\n      --os-version string     Set operating system version\n      --variant string        Set architecture variant\n",
    "flags": [
      "--arch",
      "--help",
      "--os",
      "--os-features",
      "--os-version",
      "--variant"
    ],
    "descriptionOriginal": "Add additional information to a local image manifest"
  },
  {
    "command": "docker manifest create",
    "description": "Cria uma lista local de manifestos para anotar e enviar ao registry.",
    "help": "Usage:  docker manifest create MANIFEST_LIST MANIFEST [MANIFEST...]\n\nCreate a local manifest list for annotating and pushing to a registry\n\nEXPERIMENTAL:\n  docker manifest create is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n  -a, --amend      Amend an existing manifest list\n      --insecure   Allow communication with an insecure registry\n",
    "flags": [
      "--amend",
      "--help",
      "--insecure",
      "-a"
    ],
    "descriptionOriginal": "Create a local manifest list for annotating and pushing to a registry"
  },
  {
    "command": "docker manifest inspect",
    "description": "Mostra um manifesto de imagem ou uma lista de manifestos.",
    "help": "Usage:  docker manifest inspect [OPTIONS] [MANIFEST_LIST] MANIFEST\n\nDisplay an image manifest, or manifest list\n\nEXPERIMENTAL:\n  docker manifest inspect is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --insecure   Allow communication with an insecure registry\n  -v, --verbose    Output additional info including layers and platform\n",
    "flags": [
      "--help",
      "--insecure",
      "--verbose",
      "-v"
    ],
    "descriptionOriginal": "Display an image manifest, or manifest list"
  },
  {
    "command": "docker manifest push",
    "description": "Envia uma lista de manifestos para um repositório.",
    "help": "Usage:  docker manifest push [OPTIONS] MANIFEST_LIST\n\nPush a manifest list to a repository\n\nEXPERIMENTAL:\n  docker manifest push is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --insecure   Allow push to an insecure registry\n  -p, --purge      Remove the local manifest list after push\n",
    "flags": [
      "--help",
      "--insecure",
      "--purge",
      "-p"
    ],
    "descriptionOriginal": "Push a manifest list to a repository"
  },
  {
    "command": "docker manifest rm",
    "description": "Remove listas de manifestos do armazenamento local.",
    "help": "Usage:  docker manifest rm MANIFEST_LIST [MANIFEST_LIST...]\n\nDelete one or more manifest lists from local storage\n\nEXPERIMENTAL:\n  docker manifest rm is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Delete one or more manifest lists from local storage"
  },
  {
    "command": "docker network connect",
    "description": "Conecta um container a uma rede.",
    "help": "Usage:  docker network connect [OPTIONS] NETWORK CONTAINER\n\nConnect a container to a network\n\nOptions:\n      --alias strings           Add network-scoped alias for the container\n      --driver-opt strings      driver options for the network\n      --gw-priority int         Highest gw-priority provides the default\n                                gateway. Accepts positive and negative values.\n      --ip ip                   IPv4 address (e.g., \"172.30.100.104\")\n      --ip6 ip                  IPv6 address (e.g., \"2001:db8::33\")\n      --link list               Add link to another container\n      --link-local-ip ipSlice   Add a link-local address for the\n                                container (default [])\n",
    "flags": [
      "--alias",
      "--driver-opt",
      "--gw-priority",
      "--help",
      "--ip",
      "--ip6",
      "--link",
      "--link-local-ip"
    ],
    "descriptionOriginal": "Connect a container to a network"
  },
  {
    "command": "docker network create",
    "description": "Cria uma rede.",
    "help": "Usage:  docker network create [OPTIONS] NETWORK\n\nCreate a network\n\nOptions:\n      --attachable            Enable manual container attachment\n      --aux-address map       Auxiliary IPv4 or IPv6 addresses used by\n                              Network driver (default map[])\n      --config-from string    The network from which to copy the configuration\n      --config-only           Create a configuration only network\n  -d, --driver string         Driver to manage the Network (default \"bridge\")\n      --gateway ipSlice       IPv4 or IPv6 Gateway for the master subnet\n                              (default [])\n      --ingress               Create swarm routing-mesh network\n      --internal              Restrict external access to the network\n      --ip-range ipNetSlice   Allocate container ip from a sub-range\n                              (default [])\n      --ipam-driver string    IP Address Management Driver (default \"default\")\n      --ipam-opt map          Set IPAM driver specific options (default map[])\n      --ipv4                  Enable or disable IPv4 address assignment\n                              (default true)\n      --ipv6                  Enable or disable IPv6 address assignment\n      --label list            Set metadata on a network\n  -o, --opt map               Set driver specific options (default map[])\n      --scope string          Control the network's scope\n      --subnet strings        Subnet in CIDR format that represents a\n                              network segment\n",
    "flags": [
      "--attachable",
      "--aux-address",
      "--config-from",
      "--config-only",
      "--driver",
      "--gateway",
      "--help",
      "--ingress",
      "--internal",
      "--ip-range",
      "--ipam-driver",
      "--ipam-opt",
      "--ipv4",
      "--ipv6",
      "--label",
      "--opt",
      "--scope",
      "--subnet",
      "-d",
      "-o"
    ],
    "descriptionOriginal": "Create a network"
  },
  {
    "command": "docker network disconnect",
    "description": "Desconecta um container de uma rede.",
    "help": "Usage:  docker network disconnect [OPTIONS] NETWORK CONTAINER\n\nDisconnect a container from a network\n\nOptions:\n  -f, --force   Force the container to disconnect from a network\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Disconnect a container from a network"
  },
  {
    "command": "docker network inspect",
    "description": "Mostra informações detalhadas de redes.",
    "help": "Usage:  docker network inspect [OPTIONS] NETWORK [NETWORK...]\n\nDisplay detailed information on one or more networks\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -v, --verbose         Verbose output for diagnostics\n",
    "flags": [
      "--format",
      "--help",
      "--verbose",
      "-f",
      "-v"
    ],
    "descriptionOriginal": "Display detailed information on one or more networks"
  },
  {
    "command": "docker network list",
    "description": "Lista redes.",
    "help": "Usage:  docker network ls [OPTIONS]\n\nList networks\n\nAliases:\n  docker network ls, docker network list\n\nOptions:\n  -f, --filter filter   Provide filter values (e.g. \"driver=bridge\")\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Do not truncate the output\n  -q, --quiet           Only display network IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List networks"
  },
  {
    "command": "docker network ls",
    "description": "Lista redes.",
    "help": "Usage:  docker network ls [OPTIONS]\n\nList networks\n\nAliases:\n  docker network ls, docker network list\n\nOptions:\n  -f, --filter filter   Provide filter values (e.g. \"driver=bridge\")\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Do not truncate the output\n  -q, --quiet           Only display network IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List networks"
  },
  {
    "command": "docker network prune",
    "description": "Remove todas as redes não utilizadas.",
    "help": "Usage:  docker network prune [OPTIONS]\n\nRemove all unused networks\n\nOptions:\n      --filter filter   Provide filter values (e.g. \"until=<timestamp>\")\n  -f, --force           Do not prompt for confirmation\n",
    "flags": [
      "--filter",
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove all unused networks"
  },
  {
    "command": "docker network remove",
    "description": "Remove uma ou mais redes.",
    "help": "Usage:  docker network rm NETWORK [NETWORK...]\n\nRemove one or more networks\n\nAliases:\n  docker network rm, docker network remove\n\nOptions:\n  -f, --force   Do not error if the network does not exist\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more networks"
  },
  {
    "command": "docker network rm",
    "description": "Remove uma ou mais redes.",
    "help": "Usage:  docker network rm NETWORK [NETWORK...]\n\nRemove one or more networks\n\nAliases:\n  docker network rm, docker network remove\n\nOptions:\n  -f, --force   Do not error if the network does not exist\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more networks"
  },
  {
    "command": "docker node demote",
    "description": "Remove o papel de gerenciador de um ou mais nós do Swarm.",
    "help": "Usage:  docker node demote NODE [NODE...]\n\nDemote one or more nodes from manager in the swarm\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Demote one or more nodes from manager in the swarm"
  },
  {
    "command": "docker node inspect",
    "description": "Mostra informações detalhadas de nós.",
    "help": "Usage:  docker node inspect [OPTIONS] self|NODE [NODE...]\n\nDisplay detailed information on one or more nodes\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --pretty          Print the information in a human friendly format\n",
    "flags": [
      "--format",
      "--help",
      "--pretty",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more nodes"
  },
  {
    "command": "docker node list",
    "description": "Lista os nós do Swarm.",
    "help": "Usage:  docker node ls [OPTIONS]\n\nList nodes in the swarm\n\nAliases:\n  docker node ls, docker node list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List nodes in the swarm"
  },
  {
    "command": "docker node ls",
    "description": "Lista os nós do Swarm.",
    "help": "Usage:  docker node ls [OPTIONS]\n\nList nodes in the swarm\n\nAliases:\n  docker node ls, docker node list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List nodes in the swarm"
  },
  {
    "command": "docker node promote",
    "description": "Promove um ou mais nós a gerenciadores do Swarm.",
    "help": "Usage:  docker node promote NODE [NODE...]\n\nPromote one or more nodes to manager in the swarm\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Promote one or more nodes to manager in the swarm"
  },
  {
    "command": "docker node ps",
    "description": "Lista tarefas em um ou mais nós; por padrão, usa o nó atual.",
    "help": "Usage:  docker node ps [OPTIONS] [NODE...]\n\nList tasks running on one or more nodes, defaults to current node\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Pretty-print tasks using a Go template\n      --no-resolve      Do not map IDs to Names\n      --no-trunc        Do not truncate output\n  -q, --quiet           Only display task IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-resolve",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List tasks running on one or more nodes, defaults to current node"
  },
  {
    "command": "docker node remove",
    "description": "Remove um ou mais nós do Swarm.",
    "help": "Usage:  docker node rm [OPTIONS] NODE [NODE...]\n\nRemove one or more nodes from the swarm\n\nAliases:\n  docker node rm, docker node remove\n\nOptions:\n  -f, --force   Force remove a node from the swarm\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more nodes from the swarm"
  },
  {
    "command": "docker node rm",
    "description": "Remove um ou mais nós do Swarm.",
    "help": "Usage:  docker node rm [OPTIONS] NODE [NODE...]\n\nRemove one or more nodes from the swarm\n\nAliases:\n  docker node rm, docker node remove\n\nOptions:\n  -f, --force   Force remove a node from the swarm\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more nodes from the swarm"
  },
  {
    "command": "docker node update",
    "description": "Atualiza um nó.",
    "help": "Usage:  docker node update [OPTIONS] NODE\n\nUpdate a node\n\nOptions:\n      --availability string   Availability of the node (\"active\",\n                              \"pause\", \"drain\")\n      --label-add list        Add or update a node label (\"key=value\")\n      --label-rm list         Remove a node label if exists\n      --role string           Role of the node (\"worker\", \"manager\")\n",
    "flags": [
      "--availability",
      "--help",
      "--label-add",
      "--label-rm",
      "--role"
    ],
    "descriptionOriginal": "Update a node"
  },
  {
    "command": "docker plugin create",
    "description": "Cria um plugin a partir de rootfs e configuração; exige config.json e a pasta rootfs.",
    "help": "Usage:  docker plugin create [OPTIONS] PLUGIN PLUGIN-DATA-DIR\n\nCreate a plugin from a rootfs and configuration. Plugin data directory must contain config.json and rootfs directory.\n\nOptions:\n      --compress   Compress the context using gzip\n",
    "flags": [
      "--compress",
      "--help"
    ],
    "descriptionOriginal": "Create a plugin from a rootfs and configuration. Plugin data directory must contain config.json and rootfs directory."
  },
  {
    "command": "docker plugin disable",
    "description": "Desativa um plugin.",
    "help": "Usage:  docker plugin disable [OPTIONS] PLUGIN\n\nDisable a plugin\n\nOptions:\n  -f, --force   Force the disable of an active plugin\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Disable a plugin"
  },
  {
    "command": "docker plugin enable",
    "description": "Ativa um plugin.",
    "help": "Usage:  docker plugin enable [OPTIONS] PLUGIN\n\nEnable a plugin\n\nOptions:\n      --timeout int   HTTP client timeout (in seconds) (default 30)\n",
    "flags": [
      "--help",
      "--timeout"
    ],
    "descriptionOriginal": "Enable a plugin"
  },
  {
    "command": "docker plugin inspect",
    "description": "Mostra informações detalhadas de plugins.",
    "help": "Usage:  docker plugin inspect [OPTIONS] PLUGIN [PLUGIN...]\n\nDisplay detailed information on one or more plugins\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more plugins"
  },
  {
    "command": "docker plugin install",
    "description": "Instala um plugin.",
    "help": "Usage:  docker plugin install [OPTIONS] PLUGIN [KEY=VALUE...]\n\nInstall a plugin\n\nOptions:\n      --alias string            Local name for plugin\n      --disable                 Do not enable the plugin on install\n      --grant-all-permissions   Grant all permissions necessary to run\n                                the plugin\n",
    "flags": [
      "--alias",
      "--disable",
      "--grant-all-permissions",
      "--help"
    ],
    "descriptionOriginal": "Install a plugin"
  },
  {
    "command": "docker plugin list",
    "description": "Lista plugins.",
    "help": "Usage:  docker plugin ls [OPTIONS]\n\nList plugins\n\nAliases:\n  docker plugin ls, docker plugin list\n\nOptions:\n  -f, --filter filter   Provide filter values (e.g. \"enabled=true\")\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only display plugin IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List plugins"
  },
  {
    "command": "docker plugin ls",
    "description": "Lista plugins.",
    "help": "Usage:  docker plugin ls [OPTIONS]\n\nList plugins\n\nAliases:\n  docker plugin ls, docker plugin list\n\nOptions:\n  -f, --filter filter   Provide filter values (e.g. \"enabled=true\")\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-trunc        Don't truncate output\n  -q, --quiet           Only display plugin IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List plugins"
  },
  {
    "command": "docker plugin push",
    "description": "Envia um plugin para um registry.",
    "help": "Usage:  docker plugin push [OPTIONS] PLUGIN[:TAG]\n\nPush a plugin to a registry\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Push a plugin to a registry"
  },
  {
    "command": "docker plugin remove",
    "description": "Remove um ou mais plugins.",
    "help": "Usage:  docker plugin rm [OPTIONS] PLUGIN [PLUGIN...]\n\nRemove one or more plugins\n\nAliases:\n  docker plugin rm, docker plugin remove\n\nOptions:\n  -f, --force   Force the removal of an active plugin\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more plugins"
  },
  {
    "command": "docker plugin rm",
    "description": "Remove um ou mais plugins.",
    "help": "Usage:  docker plugin rm [OPTIONS] PLUGIN [PLUGIN...]\n\nRemove one or more plugins\n\nAliases:\n  docker plugin rm, docker plugin remove\n\nOptions:\n  -f, --force   Force the removal of an active plugin\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more plugins"
  },
  {
    "command": "docker plugin set",
    "description": "Altera as configurações de um plugin.",
    "help": "Usage:  docker plugin set PLUGIN KEY=VALUE [KEY=VALUE...]\n\nChange settings for a plugin\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Change settings for a plugin"
  },
  {
    "command": "docker plugin upgrade",
    "description": "Atualiza um plugin instalado.",
    "help": "Usage:  docker plugin upgrade [OPTIONS] PLUGIN [REMOTE]\n\nUpgrade an existing plugin\n\nOptions:\n      --grant-all-permissions   Grant all permissions necessary to run\n                                the plugin\n      --skip-remote-check       Do not check if specified remote plugin\n                                matches existing plugin image\n",
    "flags": [
      "--grant-all-permissions",
      "--help",
      "--skip-remote-check"
    ],
    "descriptionOriginal": "Upgrade an existing plugin"
  },
  {
    "command": "docker secret create",
    "description": "Cria um segredo com o conteúdo de um arquivo ou da entrada padrão.",
    "help": "Usage:  docker secret create [OPTIONS] SECRET [file|-]\n\nCreate a secret from a file or STDIN as content\n\nOptions:\n  -d, --driver string            Secret driver\n  -l, --label list               Secret labels\n      --template-driver string   Template driver\n",
    "flags": [
      "--driver",
      "--help",
      "--label",
      "--template-driver",
      "-d",
      "-l"
    ],
    "descriptionOriginal": "Create a secret from a file or STDIN as content"
  },
  {
    "command": "docker secret inspect",
    "description": "Mostra informações detalhadas de segredos.",
    "help": "Usage:  docker secret inspect [OPTIONS] SECRET [SECRET...]\n\nDisplay detailed information on one or more secrets\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --pretty          Print the information in a human friendly format\n",
    "flags": [
      "--format",
      "--help",
      "--pretty",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more secrets"
  },
  {
    "command": "docker secret list",
    "description": "Lista segredos.",
    "help": "Usage:  docker secret ls [OPTIONS]\n\nList secrets\n\nAliases:\n  docker secret ls, docker secret list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List secrets"
  },
  {
    "command": "docker secret ls",
    "description": "Lista segredos.",
    "help": "Usage:  docker secret ls [OPTIONS]\n\nList secrets\n\nAliases:\n  docker secret ls, docker secret list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List secrets"
  },
  {
    "command": "docker secret remove",
    "description": "Remove um ou mais segredos.",
    "help": "Usage:  docker secret rm SECRET [SECRET...]\n\nRemove one or more secrets\n\nAliases:\n  docker secret rm, docker secret remove\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Remove one or more secrets"
  },
  {
    "command": "docker secret rm",
    "description": "Remove um ou mais segredos.",
    "help": "Usage:  docker secret rm SECRET [SECRET...]\n\nRemove one or more secrets\n\nAliases:\n  docker secret rm, docker secret remove\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Remove one or more secrets"
  },
  {
    "command": "docker service create",
    "description": "Cria um serviço.",
    "help": "Usage:  docker service create [OPTIONS] IMAGE [COMMAND] [ARG...]\n\nCreate a new service\n\nOptions:\n      --cap-add list                       Add Linux capabilities\n      --cap-drop list                      Drop Linux capabilities\n      --config config                      Specify configurations to\n                                           expose to the service\n      --constraint list                    Placement constraints\n      --container-label list               Container labels\n      --credential-spec credential-spec    Credential spec for managed\n                                           service account (Windows only)\n  -d, --detach                             Exit immediately instead of\n                                           waiting for the service to converge\n      --dns list                           Set custom DNS servers\n      --dns-option list                    Set DNS options\n      --dns-search list                    Set custom DNS search domains\n      --endpoint-mode string               Endpoint mode (vip or dnsrr)\n                                           (default \"vip\")\n      --entrypoint command                 Overwrite the default\n                                           ENTRYPOINT of the image\n  -e, --env list                           Set environment variables\n      --env-file list                      Read in a file of environment\n                                           variables\n      --generic-resource list              User defined resources\n      --group list                         Set one or more supplementary\n                                           user groups for the container\n      --health-cmd string                  Command to run to check health\n      --health-interval duration           Time between running the check\n                                           (ms|s|m|h)\n      --health-retries int                 Consecutive failures needed to\n                                           report unhealthy\n      --health-start-interval duration     Time between running the check\n                                           during the start period (ms|s|m|h)\n      --health-start-period duration       Start period for the container\n                                           to initialize before counting\n                                           retries towards unstable (ms|s|m|h)\n      --health-timeout duration            Maximum time to allow one\n                                           check to run (ms|s|m|h)\n      --host list                          Set one or more custom\n                                           host-to-IP mappings (host:ip)\n      --hostname string                    Container hostname\n      --init                               Use an init inside each\n                                           service container to forward\n                                           signals and reap processes\n      --isolation string                   Service container isolation mode\n  -l, --label list                         Service labels\n      --limit-cpu decimal                  Limit CPUs\n      --limit-memory bytes                 Limit Memory\n      --limit-pids int                     Limit maximum number of\n                                           processes (default 0 = unlimited)\n      --log-driver string                  Logging driver for service\n      --log-opt list                       Logging driver options\n      --max-concurrent uint                Number of job tasks to run\n                                           concurrently (default equal to\n                                           --replicas)\n      --memory-swap bytes                  Swap Bytes (-1 for unlimited)\n      --memory-swappiness int              Tune memory swappiness\n                                           (0-100), -1 to reset to\n                                           default (default -1)\n      --mode string                        Service mode (\"replicated\",\n                                           \"global\", \"replicated-job\",\n                                           \"global-job\") (default\n                                           \"replicated\")\n      --mount mount                        Attach a filesystem mount to\n                                           the service\n      --name string                        Service name\n      --network network                    Network attachments\n      --no-healthcheck                     Disable any\n                                           container-specified HEALTHCHECK\n      --no-resolve-image                   Do not query the registry to\n                                           resolve image digest and\n                                           supported platforms\n      --oom-score-adj int                  Tune host's OOM preferences\n                                           (-1000 to 1000) \n      --placement-pref pref                Add a placement preference\n  -p, --publish port                       Publish a port as a node port\n  -q, --quiet                              Suppress progress output\n      --read-only                          Mount the container's root\n                                           filesystem as read only\n      --replicas uint                      Number of tasks\n      --replicas-max-per-node uint         Maximum number of tasks per\n                                           node (default 0 = unlimited)\n      --reserve-cpu decimal                Reserve CPUs\n      --reserve-memory bytes               Reserve Memory\n      --restart-condition string           Restart when condition is met\n                                           (\"none\", \"on-failure\", \"any\")\n                                           (default \"any\")\n      --restart-delay duration             Delay between restart attempts\n                                           (ns|us|ms|s|m|h) (default 5s)\n      --restart-max-attempts uint          Maximum number of restarts\n                                           before giving up\n      --restart-window duration            Window used to evaluate the\n                                           restart policy (ns|us|ms|s|m|h)\n      --rollback-delay duration            Delay between task rollbacks\n                                           (ns|us|ms|s|m|h) (default 0s)\n      --rollback-failure-action string     Action on rollback failure\n                                           (\"pause\", \"continue\") (default\n                                           \"pause\")\n      --rollback-max-failure-ratio float   Failure rate to tolerate\n                                           during a rollback (default 0)\n      --rollback-monitor duration          Duration after each task\n                                           rollback to monitor for\n                                           failure (ns|us|ms|s|m|h)\n                                           (default 5s)\n      --rollback-order string              Rollback order (\"start-first\",\n                                           \"stop-first\") (default\n                                           \"stop-first\")\n      --rollback-parallelism uint          Maximum number of tasks rolled\n                                           back simultaneously (0 to roll\n                                           back all at once) (default 1)\n      --secret secret                      Specify secrets to expose to\n                                           the service\n      --stop-grace-period duration         Time to wait before force\n                                           killing a container\n                                           (ns|us|ms|s|m|h) (default 10s)\n      --stop-signal string                 Signal to stop the container\n      --sysctl list                        Sysctl options\n  -t, --tty                                Allocate a pseudo-TTY\n      --ulimit ulimit                      Ulimit options (default [])\n      --update-delay duration              Delay between updates\n                                           (ns|us|ms|s|m|h) (default 0s)\n      --update-failure-action string       Action on update failure\n                                           (\"pause\", \"continue\",\n                                           \"rollback\") (default \"pause\")\n      --update-max-failure-ratio float     Failure rate to tolerate\n                                           during an update (default 0)\n      --update-monitor duration            Duration after each task\n                                           update to monitor for failure\n                                           (ns|us|ms|s|m|h) (default 5s)\n      --update-order string                Update order (\"start-first\",\n                                           \"stop-first\") (default\n                                           \"stop-first\")\n      --update-parallelism uint            Maximum number of tasks\n                                           updated simultaneously (0 to\n                                           update all at once) (default 1)\n  -u, --user string                        Username or UID (format:\n                                           <name|uid>[:<group|gid>])\n      --with-registry-auth                 Send registry authentication\n                                           details to swarm agents\n  -w, --workdir string                     Working directory inside the\n                                           container\n",
    "flags": [
      "--cap-add",
      "--cap-drop",
      "--config",
      "--constraint",
      "--container-label",
      "--credential-spec",
      "--detach",
      "--dns",
      "--dns-option",
      "--dns-search",
      "--endpoint-mode",
      "--entrypoint",
      "--env",
      "--env-file",
      "--generic-resource",
      "--group",
      "--health-cmd",
      "--health-interval",
      "--health-retries",
      "--health-start-interval",
      "--health-start-period",
      "--health-timeout",
      "--help",
      "--host",
      "--hostname",
      "--init",
      "--isolation",
      "--label",
      "--limit-cpu",
      "--limit-memory",
      "--limit-pids",
      "--log-driver",
      "--log-opt",
      "--max-concurrent",
      "--memory-swap",
      "--memory-swappiness",
      "--mode",
      "--mount",
      "--name",
      "--network",
      "--no-healthcheck",
      "--no-resolve-image",
      "--oom-score-adj",
      "--placement-pref",
      "--publish",
      "--quiet",
      "--read-only",
      "--replicas",
      "--replicas-max-per-node",
      "--reserve-cpu",
      "--reserve-memory",
      "--restart-condition",
      "--restart-delay",
      "--restart-max-attempts",
      "--restart-window",
      "--rollback-delay",
      "--rollback-failure-action",
      "--rollback-max-failure-ratio",
      "--rollback-monitor",
      "--rollback-order",
      "--rollback-parallelism",
      "--secret",
      "--stop-grace-period",
      "--stop-signal",
      "--sysctl",
      "--tty",
      "--ulimit",
      "--update-delay",
      "--update-failure-action",
      "--update-max-failure-ratio",
      "--update-monitor",
      "--update-order",
      "--update-parallelism",
      "--user",
      "--with-registry-auth",
      "--workdir",
      "-d",
      "-e",
      "-l",
      "-p",
      "-q",
      "-t",
      "-u",
      "-w"
    ],
    "descriptionOriginal": "Create a new service"
  },
  {
    "command": "docker service inspect",
    "description": "Mostra informações detalhadas de serviços.",
    "help": "Usage:  docker service inspect [OPTIONS] SERVICE [SERVICE...]\n\nDisplay detailed information on one or more services\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --pretty          Print the information in a human friendly format\n",
    "flags": [
      "--format",
      "--help",
      "--pretty",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more services"
  },
  {
    "command": "docker service list",
    "description": "Lista serviços.",
    "help": "Usage:  docker service ls [OPTIONS]\n\nList services\n\nAliases:\n  docker service ls, docker service list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List services"
  },
  {
    "command": "docker service logs",
    "description": "Mostra os logs de um serviço ou tarefa.",
    "help": "Usage:  docker service logs [OPTIONS] SERVICE|TASK\n\nFetch the logs of a service or task\n\nOptions:\n      --details        Show extra details provided to logs\n  -f, --follow         Follow log output\n      --no-resolve     Do not map IDs to Names in output\n      --no-task-ids    Do not include task IDs in output\n      --no-trunc       Do not truncate output\n      --raw            Do not neatly format logs\n      --since string   Show logs since timestamp (e.g.\n                       \"2013-01-02T13:23:37Z\") or relative (e.g. \"42m\"\n                       for 42 minutes)\n  -n, --tail string    Number of lines to show from the end of the logs\n                       (default \"all\")\n  -t, --timestamps     Show timestamps\n",
    "flags": [
      "--details",
      "--follow",
      "--help",
      "--no-resolve",
      "--no-task-ids",
      "--no-trunc",
      "--raw",
      "--since",
      "--tail",
      "--timestamps",
      "-f",
      "-n",
      "-t"
    ],
    "descriptionOriginal": "Fetch the logs of a service or task"
  },
  {
    "command": "docker service ls",
    "description": "Lista serviços.",
    "help": "Usage:  docker service ls [OPTIONS]\n\nList services\n\nAliases:\n  docker service ls, docker service list\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List services"
  },
  {
    "command": "docker service ps",
    "description": "Lista as tarefas de um ou mais serviços.",
    "help": "Usage:  docker service ps [OPTIONS] SERVICE [SERVICE...]\n\nList the tasks of one or more services\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Pretty-print tasks using a Go template\n      --no-resolve      Do not map IDs to Names\n      --no-trunc        Do not truncate output\n  -q, --quiet           Only display task IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-resolve",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List the tasks of one or more services"
  },
  {
    "command": "docker service remove",
    "description": "Remove um ou mais serviços.",
    "help": "Usage:  docker service rm SERVICE [SERVICE...]\n\nRemove one or more services\n\nAliases:\n  docker service rm, docker service remove\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Remove one or more services"
  },
  {
    "command": "docker service rm",
    "description": "Remove um ou mais serviços.",
    "help": "Usage:  docker service rm SERVICE [SERVICE...]\n\nRemove one or more services\n\nAliases:\n  docker service rm, docker service remove\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Remove one or more services"
  },
  {
    "command": "docker service rollback",
    "description": "Reverte alterações na configuração de um serviço.",
    "help": "Usage:  docker service rollback [OPTIONS] SERVICE\n\nRevert changes to a service's configuration\n\nOptions:\n  -d, --detach   Exit immediately instead of waiting for the service to\n                 converge\n  -q, --quiet    Suppress progress output\n",
    "flags": [
      "--detach",
      "--help",
      "--quiet",
      "-d",
      "-q"
    ],
    "descriptionOriginal": "Revert changes to a service's configuration"
  },
  {
    "command": "docker service scale",
    "description": "Ajusta o número de réplicas de um ou mais serviços.",
    "help": "Usage:  docker service scale SERVICE=REPLICAS [SERVICE=REPLICAS...]\n\nScale one or multiple replicated services\n\nOptions:\n  -d, --detach   Exit immediately instead of waiting for the service to\n                 converge\n",
    "flags": [
      "--detach",
      "--help",
      "-d"
    ],
    "descriptionOriginal": "Scale one or multiple replicated services"
  },
  {
    "command": "docker service update",
    "description": "Atualiza um serviço.",
    "help": "Usage:  docker service update [OPTIONS] SERVICE\n\nUpdate a service\n\nOptions:\n      --args command                       Service command args\n      --cap-add list                       Add Linux capabilities\n      --cap-drop list                      Drop Linux capabilities\n      --config-add config                  Add or update a config file on\n                                           a service\n      --config-rm list                     Remove a configuration file\n      --constraint-add list                Add or update a placement\n                                           constraint\n      --constraint-rm list                 Remove a constraint\n      --container-label-add list           Add or update a container label\n      --container-label-rm list            Remove a container label by its key\n      --credential-spec credential-spec    Credential spec for managed\n                                           service account (Windows only)\n  -d, --detach                             Exit immediately instead of\n                                           waiting for the service to converge\n      --dns-add list                       Add or update a custom DNS server\n      --dns-option-add list                Add or update a DNS option\n      --dns-option-rm list                 Remove a DNS option\n      --dns-rm list                        Remove a custom DNS server\n      --dns-search-add list                Add or update a custom DNS\n                                           search domain\n      --dns-search-rm list                 Remove a DNS search domain\n      --endpoint-mode string               Endpoint mode (vip or dnsrr)\n      --entrypoint command                 Overwrite the default\n                                           ENTRYPOINT of the image\n      --env-add list                       Add or update an environment\n                                           variable\n      --env-rm list                        Remove an environment variable\n      --force                              Force update even if no\n                                           changes require it\n      --generic-resource-add list          Add a Generic resource\n      --generic-resource-rm list           Remove a Generic resource\n      --group-add list                     Add an additional\n                                           supplementary user group to\n                                           the container\n      --group-rm list                      Remove a previously added\n                                           supplementary user group from\n                                           the container\n      --health-cmd string                  Command to run to check health\n      --health-interval duration           Time between running the check\n                                           (ms|s|m|h)\n      --health-retries int                 Consecutive failures needed to\n                                           report unhealthy\n      --health-start-interval duration     Time between running the check\n                                           during the start period (ms|s|m|h)\n      --health-start-period duration       Start period for the container\n                                           to initialize before counting\n                                           retries towards unstable (ms|s|m|h)\n      --health-timeout duration            Maximum time to allow one\n                                           check to run (ms|s|m|h)\n      --host-add list                      Add a custom host-to-IP\n                                           mapping (\"host:ip\")\n      --host-rm list                       Remove a custom host-to-IP\n                                           mapping (\"host:ip\")\n      --hostname string                    Container hostname\n      --image string                       Service image tag\n      --init                               Use an init inside each\n                                           service container to forward\n                                           signals and reap processes\n      --isolation string                   Service container isolation mode\n      --label-add list                     Add or update a service label\n      --label-rm list                      Remove a label by its key\n      --limit-cpu decimal                  Limit CPUs\n      --limit-memory bytes                 Limit Memory\n      --limit-pids int                     Limit maximum number of\n                                           processes (default 0 = unlimited)\n      --log-driver string                  Logging driver for service\n      --log-opt list                       Logging driver options\n      --max-concurrent uint                Number of job tasks to run\n                                           concurrently (default equal to\n                                           --replicas)\n      --memory-swap bytes                  Swap Bytes (-1 for unlimited)\n      --memory-swappiness int              Tune memory swappiness\n                                           (0-100), -1 to reset to\n                                           default (default -1)\n      --mount-add mount                    Add or update a mount on a service\n      --mount-rm list                      Remove a mount by its target path\n      --network-add network                Add a network\n      --network-rm list                    Remove a network\n      --no-healthcheck                     Disable any\n                                           container-specified HEALTHCHECK\n      --no-resolve-image                   Do not query the registry to\n                                           resolve image digest and\n                                           supported platforms\n      --oom-score-adj int                  Tune host's OOM preferences\n                                           (-1000 to 1000) \n      --placement-pref-add pref            Add a placement preference\n      --placement-pref-rm pref             Remove a placement preference\n      --publish-add port                   Add or update a published port\n      --publish-rm port                    Remove a published port by its\n                                           target port\n  -q, --quiet                              Suppress progress output\n      --read-only                          Mount the container's root\n                                           filesystem as read only\n      --replicas uint                      Number of tasks\n      --replicas-max-per-node uint         Maximum number of tasks per\n                                           node (default 0 = unlimited)\n      --reserve-cpu decimal                Reserve CPUs\n      --reserve-memory bytes               Reserve Memory\n      --restart-condition string           Restart when condition is met\n                                           (\"none\", \"on-failure\", \"any\")\n      --restart-delay duration             Delay between restart attempts\n                                           (ns|us|ms|s|m|h)\n      --restart-max-attempts uint          Maximum number of restarts\n                                           before giving up\n      --restart-window duration            Window used to evaluate the\n                                           restart policy (ns|us|ms|s|m|h)\n      --rollback                           Rollback to previous specification\n      --rollback-delay duration            Delay between task rollbacks\n                                           (ns|us|ms|s|m|h)\n      --rollback-failure-action string     Action on rollback failure\n                                           (\"pause\", \"continue\")\n      --rollback-max-failure-ratio float   Failure rate to tolerate\n                                           during a rollback\n      --rollback-monitor duration          Duration after each task\n                                           rollback to monitor for\n                                           failure (ns|us|ms|s|m|h)\n      --rollback-order string              Rollback order (\"start-first\",\n                                           \"stop-first\")\n      --rollback-parallelism uint          Maximum number of tasks rolled\n                                           back simultaneously (0 to roll\n                                           back all at once)\n      --secret-add secret                  Add or update a secret on a service\n      --secret-rm list                     Remove a secret\n      --stop-grace-period duration         Time to wait before force\n                                           killing a container\n                                           (ns|us|ms|s|m|h)\n      --stop-signal string                 Signal to stop the container\n      --sysctl-add list                    Add or update a Sysctl option\n      --sysctl-rm list                     Remove a Sysctl option\n  -t, --tty                                Allocate a pseudo-TTY\n      --ulimit-add ulimit                  Add or update a ulimit option\n                                           (default [])\n      --ulimit-rm list                     Remove a ulimit option\n      --update-delay duration              Delay between updates\n                                           (ns|us|ms|s|m|h)\n      --update-failure-action string       Action on update failure\n                                           (\"pause\", \"continue\", \"rollback\")\n      --update-max-failure-ratio float     Failure rate to tolerate\n                                           during an update\n      --update-monitor duration            Duration after each task\n                                           update to monitor for failure\n                                           (ns|us|ms|s|m|h)\n      --update-order string                Update order (\"start-first\",\n                                           \"stop-first\")\n      --update-parallelism uint            Maximum number of tasks\n                                           updated simultaneously (0 to\n                                           update all at once)\n  -u, --user string                        Username or UID (format:\n                                           <name|uid>[:<group|gid>])\n      --with-registry-auth                 Send registry authentication\n                                           details to swarm agents\n  -w, --workdir string                     Working directory inside the\n                                           container\n",
    "flags": [
      "--args",
      "--cap-add",
      "--cap-drop",
      "--config-add",
      "--config-rm",
      "--constraint-add",
      "--constraint-rm",
      "--container-label-add",
      "--container-label-rm",
      "--credential-spec",
      "--detach",
      "--dns-add",
      "--dns-option-add",
      "--dns-option-rm",
      "--dns-rm",
      "--dns-search-add",
      "--dns-search-rm",
      "--endpoint-mode",
      "--entrypoint",
      "--env-add",
      "--env-rm",
      "--force",
      "--generic-resource-add",
      "--generic-resource-rm",
      "--group-add",
      "--group-rm",
      "--health-cmd",
      "--health-interval",
      "--health-retries",
      "--health-start-interval",
      "--health-start-period",
      "--health-timeout",
      "--help",
      "--host-add",
      "--host-rm",
      "--hostname",
      "--image",
      "--init",
      "--isolation",
      "--label-add",
      "--label-rm",
      "--limit-cpu",
      "--limit-memory",
      "--limit-pids",
      "--log-driver",
      "--log-opt",
      "--max-concurrent",
      "--memory-swap",
      "--memory-swappiness",
      "--mount-add",
      "--mount-rm",
      "--network-add",
      "--network-rm",
      "--no-healthcheck",
      "--no-resolve-image",
      "--oom-score-adj",
      "--placement-pref-add",
      "--placement-pref-rm",
      "--publish-add",
      "--publish-rm",
      "--quiet",
      "--read-only",
      "--replicas",
      "--replicas-max-per-node",
      "--reserve-cpu",
      "--reserve-memory",
      "--restart-condition",
      "--restart-delay",
      "--restart-max-attempts",
      "--restart-window",
      "--rollback",
      "--rollback-delay",
      "--rollback-failure-action",
      "--rollback-max-failure-ratio",
      "--rollback-monitor",
      "--rollback-order",
      "--rollback-parallelism",
      "--secret-add",
      "--secret-rm",
      "--stop-grace-period",
      "--stop-signal",
      "--sysctl-add",
      "--sysctl-rm",
      "--tty",
      "--ulimit-add",
      "--ulimit-rm",
      "--update-delay",
      "--update-failure-action",
      "--update-max-failure-ratio",
      "--update-monitor",
      "--update-order",
      "--update-parallelism",
      "--user",
      "--with-registry-auth",
      "--workdir",
      "-d",
      "-q",
      "-t",
      "-u",
      "-w"
    ],
    "descriptionOriginal": "Update a service"
  },
  {
    "command": "docker stack config",
    "description": "Mostra a configuração final após combinar arquivos e resolver variáveis.",
    "help": "Usage:  docker stack config [OPTIONS]\n\nOutputs the final config file, after doing merges and interpolations\n\nOptions:\n  -c, --compose-file strings   Path to a Compose file, or \"-\" to read\n                               from stdin\n      --skip-interpolation     Skip interpolation and output only merged\n                               config\n",
    "flags": [
      "--compose-file",
      "--help",
      "--skip-interpolation",
      "-c"
    ],
    "descriptionOriginal": "Outputs the final config file, after doing merges and interpolations"
  },
  {
    "command": "docker stack deploy",
    "description": "Publica uma stack nova ou atualiza uma existente.",
    "help": "Usage:  docker stack deploy [OPTIONS] STACK\n\nDeploy a new stack or update an existing stack\n\nAliases:\n  docker stack deploy, docker stack up\n\nOptions:\n  -c, --compose-file strings   Path to a Compose file, or \"-\" to read\n                               from stdin\n  -d, --detach                 Exit immediately instead of waiting for\n                               the stack services to converge (default true)\n      --prune                  Prune services that are no longer referenced\n  -q, --quiet                  Suppress progress output\n      --resolve-image string   Query the registry to resolve image digest\n                               and supported platforms (\"always\",\n                               \"changed\", \"never\") (default \"always\")\n      --with-registry-auth     Send registry authentication details to\n                               Swarm agents\n",
    "flags": [
      "--compose-file",
      "--detach",
      "--help",
      "--prune",
      "--quiet",
      "--resolve-image",
      "--with-registry-auth",
      "-c",
      "-d",
      "-q"
    ],
    "descriptionOriginal": "Deploy a new stack or update an existing stack"
  },
  {
    "command": "docker stack down",
    "description": "Remove uma ou mais stacks.",
    "help": "Usage:  docker stack rm [OPTIONS] STACK [STACK...]\n\nRemove one or more stacks\n\nAliases:\n  docker stack rm, docker stack remove, docker stack down\n\nOptions:\n  -d, --detach   Do not wait for stack removal (default true)\n",
    "flags": [
      "--detach",
      "--help",
      "-d"
    ],
    "descriptionOriginal": "Remove one or more stacks"
  },
  {
    "command": "docker stack list",
    "description": "Lista stacks.",
    "help": "Usage:  docker stack ls [OPTIONS]\n\nList stacks\n\nAliases:\n  docker stack ls, docker stack list\n\nOptions:\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help"
    ],
    "descriptionOriginal": "List stacks"
  },
  {
    "command": "docker stack ls",
    "description": "Lista stacks.",
    "help": "Usage:  docker stack ls [OPTIONS]\n\nList stacks\n\nAliases:\n  docker stack ls, docker stack list\n\nOptions:\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help"
    ],
    "descriptionOriginal": "List stacks"
  },
  {
    "command": "docker stack ps",
    "description": "Lista as tarefas de uma stack.",
    "help": "Usage:  docker stack ps [OPTIONS] STACK\n\nList the tasks in the stack\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --no-resolve      Do not map IDs to Names\n      --no-trunc        Do not truncate output\n  -q, --quiet           Only display task IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--no-resolve",
      "--no-trunc",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List the tasks in the stack"
  },
  {
    "command": "docker stack remove",
    "description": "Remove uma ou mais stacks.",
    "help": "Usage:  docker stack rm [OPTIONS] STACK [STACK...]\n\nRemove one or more stacks\n\nAliases:\n  docker stack rm, docker stack remove, docker stack down\n\nOptions:\n  -d, --detach   Do not wait for stack removal (default true)\n",
    "flags": [
      "--detach",
      "--help",
      "-d"
    ],
    "descriptionOriginal": "Remove one or more stacks"
  },
  {
    "command": "docker stack rm",
    "description": "Remove uma ou mais stacks.",
    "help": "Usage:  docker stack rm [OPTIONS] STACK [STACK...]\n\nRemove one or more stacks\n\nAliases:\n  docker stack rm, docker stack remove, docker stack down\n\nOptions:\n  -d, --detach   Do not wait for stack removal (default true)\n",
    "flags": [
      "--detach",
      "--help",
      "-d"
    ],
    "descriptionOriginal": "Remove one or more stacks"
  },
  {
    "command": "docker stack services",
    "description": "Lista os serviços de uma stack.",
    "help": "Usage:  docker stack services [OPTIONS] STACK\n\nList the services in the stack\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display IDs\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List the services in the stack"
  },
  {
    "command": "docker stack up",
    "description": "Publica uma stack nova ou atualiza uma existente.",
    "help": "Usage:  docker stack deploy [OPTIONS] STACK\n\nDeploy a new stack or update an existing stack\n\nAliases:\n  docker stack deploy, docker stack up\n\nOptions:\n  -c, --compose-file strings   Path to a Compose file, or \"-\" to read\n                               from stdin\n  -d, --detach                 Exit immediately instead of waiting for\n                               the stack services to converge (default true)\n      --prune                  Prune services that are no longer referenced\n  -q, --quiet                  Suppress progress output\n      --resolve-image string   Query the registry to resolve image digest\n                               and supported platforms (\"always\",\n                               \"changed\", \"never\") (default \"always\")\n      --with-registry-auth     Send registry authentication details to\n                               Swarm agents\n",
    "flags": [
      "--compose-file",
      "--detach",
      "--help",
      "--prune",
      "--quiet",
      "--resolve-image",
      "--with-registry-auth",
      "-c",
      "-d",
      "-q"
    ],
    "descriptionOriginal": "Deploy a new stack or update an existing stack"
  },
  {
    "command": "docker swarm ca",
    "description": "Mostra ou renova a autoridade certificadora raiz.",
    "help": "Usage:  docker swarm ca [OPTIONS]\n\nDisplay and rotate the root CA\n\nOptions:\n      --ca-cert pem-file          Path to the PEM-formatted root CA\n                                  certificate to use for the new cluster\n      --ca-key pem-file           Path to the PEM-formatted root CA key\n                                  to use for the new cluster\n      --cert-expiry duration      Validity period for node certificates\n                                  (ns|us|ms|s|m|h) (default 2160h0m0s)\n  -d, --detach                    Exit immediately instead of waiting for\n                                  the root rotation to converge\n      --external-ca external-ca   Specifications of one or more\n                                  certificate signing endpoints\n  -q, --quiet                     Suppress progress output\n      --rotate                    Rotate the swarm CA - if no certificate\n                                  or key are provided, new ones will be\n                                  generated\n",
    "flags": [
      "--ca-cert",
      "--ca-key",
      "--cert-expiry",
      "--detach",
      "--external-ca",
      "--help",
      "--quiet",
      "--rotate",
      "-d",
      "-q"
    ],
    "descriptionOriginal": "Display and rotate the root CA"
  },
  {
    "command": "docker swarm init",
    "description": "Inicializa um Swarm.",
    "help": "Usage:  docker swarm init [OPTIONS]\n\nInitialize a swarm\n\nOptions:\n      --advertise-addr string                  Advertised address\n                                               (format:\n                                               \"<ip|interface>[:port]\")\n      --autolock                               Enable manager autolocking\n                                               (requiring an unlock key\n                                               to start a stopped manager)\n      --availability string                    Availability of the node\n                                               (\"active\", \"pause\",\n                                               \"drain\") (default \"active\")\n      --cert-expiry duration                   Validity period for node\n                                               certificates\n                                               (ns|us|ms|s|m|h) (default\n                                               2160h0m0s)\n      --data-path-addr string                  Address or interface to\n                                               use for data path traffic\n                                               (format: \"<ip|interface>\")\n      --data-path-port uint32                  Port number to use for\n                                               data path traffic (1024 -\n                                               49151). If no value is set\n                                               or is set to 0, the\n                                               default port (4789) is used.\n      --default-addr-pool ipNetSlice           default address pool in\n                                               CIDR format (default [])\n      --default-addr-pool-mask-length uint32   default address pool\n                                               subnet mask length (default 24)\n      --dispatcher-heartbeat duration          Dispatcher heartbeat\n                                               period (ns|us|ms|s|m|h)\n                                               (default 5s)\n      --external-ca external-ca                Specifications of one or\n                                               more certificate signing\n                                               endpoints\n      --force-new-cluster                      Force create a new cluster\n                                               from current state\n      --listen-addr node-addr                  Listen address (format:\n                                               \"<ip|interface>[:port]\")\n                                               (default 0.0.0.0:2377)\n      --max-snapshots uint                     Number of additional Raft\n                                               snapshots to retain\n      --snapshot-interval uint                 Number of log entries\n                                               between Raft snapshots\n                                               (default 10000)\n      --task-history-limit int                 Task history retention\n                                               limit (default 5)\n",
    "flags": [
      "--advertise-addr",
      "--autolock",
      "--availability",
      "--cert-expiry",
      "--data-path-addr",
      "--data-path-port",
      "--default-addr-pool",
      "--default-addr-pool-mask-length",
      "--dispatcher-heartbeat",
      "--external-ca",
      "--force-new-cluster",
      "--help",
      "--listen-addr",
      "--max-snapshots",
      "--snapshot-interval",
      "--task-history-limit"
    ],
    "descriptionOriginal": "Initialize a swarm"
  },
  {
    "command": "docker swarm inspect",
    "description": "Gerencia o Swarm.",
    "help": "Usage:  docker swarm COMMAND\n\nManage Swarm\n\nCommands:\n  init        Initialize a swarm\n  join        Join a swarm as a node and/or manager\n\nRun 'docker swarm COMMAND --help' for more information on a command.\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Manage Swarm"
  },
  {
    "command": "docker swarm join",
    "description": "Ingressa em um Swarm como nó de trabalho ou gerenciador.",
    "help": "Usage:  docker swarm join [OPTIONS] HOST:PORT\n\nJoin a swarm as a node and/or manager\n\nOptions:\n      --advertise-addr string   Advertised address (format:\n                                \"<ip|interface>[:port]\")\n      --availability string     Availability of the node (\"active\",\n                                \"pause\", \"drain\") (default \"active\")\n      --data-path-addr string   Address or interface to use for data path\n                                traffic (format: \"<ip|interface>\")\n      --listen-addr node-addr   Listen address (format:\n                                \"<ip|interface>[:port]\") (default\n                                0.0.0.0:2377)\n      --token string            Token for entry into the swarm\n",
    "flags": [
      "--advertise-addr",
      "--availability",
      "--data-path-addr",
      "--help",
      "--listen-addr",
      "--token"
    ],
    "descriptionOriginal": "Join a swarm as a node and/or manager"
  },
  {
    "command": "docker swarm join-token",
    "description": "Gerencia tokens de ingresso no Swarm.",
    "help": "Usage:  docker swarm join-token [OPTIONS] (worker|manager)\n\nManage join tokens\n\nOptions:\n  -q, --quiet    Only display token\n      --rotate   Rotate join token\n",
    "flags": [
      "--help",
      "--quiet",
      "--rotate",
      "-q"
    ],
    "descriptionOriginal": "Manage join tokens"
  },
  {
    "command": "docker swarm leave",
    "description": "Sai do Swarm.",
    "help": "Usage:  docker swarm leave [OPTIONS]\n\nLeave the swarm\n\nOptions:\n  -f, --force   Force this node to leave the swarm, ignoring warnings\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Leave the swarm"
  },
  {
    "command": "docker swarm unlock",
    "description": "Desbloqueia o Swarm.",
    "help": "Usage:  docker swarm unlock\n\nUnlock swarm\n",
    "flags": [
      "--help"
    ],
    "descriptionOriginal": "Unlock swarm"
  },
  {
    "command": "docker swarm unlock-key",
    "description": "Gerencia a chave de desbloqueio.",
    "help": "Usage:  docker swarm unlock-key [OPTIONS]\n\nManage the unlock key\n\nOptions:\n  -q, --quiet    Only display token\n      --rotate   Rotate unlock key\n",
    "flags": [
      "--help",
      "--quiet",
      "--rotate",
      "-q"
    ],
    "descriptionOriginal": "Manage the unlock key"
  },
  {
    "command": "docker swarm update",
    "description": "Atualiza o Swarm.",
    "help": "Usage:  docker swarm update [OPTIONS]\n\nUpdate the swarm\n\nOptions:\n      --autolock                        Change manager autolocking\n                                        setting (true|false)\n      --cert-expiry duration            Validity period for node\n                                        certificates (ns|us|ms|s|m|h)\n                                        (default 2160h0m0s)\n      --dispatcher-heartbeat duration   Dispatcher heartbeat period\n                                        (ns|us|ms|s|m|h) (default 5s)\n      --external-ca external-ca         Specifications of one or more\n                                        certificate signing endpoints\n      --max-snapshots uint              Number of additional Raft\n                                        snapshots to retain\n      --snapshot-interval uint          Number of log entries between\n                                        Raft snapshots (default 10000)\n      --task-history-limit int          Task history retention limit\n                                        (default 5)\n",
    "flags": [
      "--autolock",
      "--cert-expiry",
      "--dispatcher-heartbeat",
      "--external-ca",
      "--help",
      "--max-snapshots",
      "--snapshot-interval",
      "--task-history-limit"
    ],
    "descriptionOriginal": "Update the swarm"
  },
  {
    "command": "docker system df",
    "description": "Mostra o espaço em disco usado pelo Docker.",
    "help": "Usage:  docker system df [OPTIONS]\n\nShow docker disk usage\n\nOptions:\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -v, --verbose         Show detailed information on space usage\n",
    "flags": [
      "--format",
      "--help",
      "--verbose",
      "-v"
    ],
    "descriptionOriginal": "Show docker disk usage"
  },
  {
    "command": "docker system events",
    "description": "Recebe eventos do Docker em tempo real.",
    "help": "Usage:  docker system events [OPTIONS]\n\nGet real time events from the server\n\nAliases:\n  docker system events, docker events\n\nOptions:\n  -f, --filter filter   Filter output based on conditions provided\n      --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n      --since string    Show all events created since timestamp\n      --until string    Stream events until this timestamp\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--since",
      "--until",
      "-f"
    ],
    "descriptionOriginal": "Get real time events from the server"
  },
  {
    "command": "docker system info",
    "description": "Mostra informações do ambiente Docker.",
    "help": "Usage:  docker system info [OPTIONS]\n\nDisplay system-wide information\n\nAliases:\n  docker system info, docker info\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Display system-wide information"
  },
  {
    "command": "docker system prune",
    "description": "Remove dados não utilizados.",
    "help": "Usage:  docker system prune [OPTIONS]\n\nRemove unused data\n\nOptions:\n  -a, --all             Remove all unused images not just dangling ones\n      --filter filter   Provide filter values (e.g. \"label=<key>=<value>\")\n  -f, --force           Do not prompt for confirmation\n      --volumes         Prune anonymous volumes\n",
    "flags": [
      "--all",
      "--filter",
      "--force",
      "--help",
      "--volumes",
      "-a",
      "-f"
    ],
    "descriptionOriginal": "Remove unused data"
  },
  {
    "command": "docker volume create",
    "description": "Cria um volume.",
    "help": "Usage:  docker volume create [OPTIONS] [VOLUME]\n\nCreate a volume\n\nOptions:\n  -d, --driver string   Specify volume driver name (default \"local\")\n      --label list      Set metadata for a volume\n  -o, --opt map         Set driver specific options (default map[])\n",
    "flags": [
      "--driver",
      "--help",
      "--label",
      "--opt",
      "-d",
      "-o"
    ],
    "descriptionOriginal": "Create a volume"
  },
  {
    "command": "docker volume inspect",
    "description": "Mostra informações detalhadas de volumes.",
    "help": "Usage:  docker volume inspect [OPTIONS] VOLUME [VOLUME...]\n\nDisplay detailed information on one or more volumes\n\nOptions:\n  -f, --format string   Format output using a custom template:\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n",
    "flags": [
      "--format",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Display detailed information on one or more volumes"
  },
  {
    "command": "docker volume list",
    "description": "Lista volumes.",
    "help": "Usage:  docker volume ls [OPTIONS]\n\nList volumes\n\nAliases:\n  docker volume ls, docker volume list\n\nOptions:\n  -f, --filter filter   Provide filter values (e.g. \"dangling=true\")\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display volume names\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List volumes"
  },
  {
    "command": "docker volume ls",
    "description": "Lista volumes.",
    "help": "Usage:  docker volume ls [OPTIONS]\n\nList volumes\n\nAliases:\n  docker volume ls, docker volume list\n\nOptions:\n  -f, --filter filter   Provide filter values (e.g. \"dangling=true\")\n      --format string   Format output using a custom template:\n                        'table':            Print output in table format\n                        with column headers (default)\n                        'table TEMPLATE':   Print output in table format\n                        using the given Go template\n                        'json':             Print in JSON format\n                        'TEMPLATE':         Print output using the given\n                        Go template.\n                        Refer to https://docs.docker.com/go/formatting/\n                        for more information about formatting output with\n                        templates\n  -q, --quiet           Only display volume names\n",
    "flags": [
      "--filter",
      "--format",
      "--help",
      "--quiet",
      "-f",
      "-q"
    ],
    "descriptionOriginal": "List volumes"
  },
  {
    "command": "docker volume prune",
    "description": "Remove volumes locais não utilizados.",
    "help": "Usage:  docker volume prune [OPTIONS]\n\nRemove unused local volumes\n\nOptions:\n  -a, --all             Remove all unused volumes, not just anonymous ones\n      --filter filter   Provide filter values (e.g. \"label=<label>\")\n  -f, --force           Do not prompt for confirmation\n",
    "flags": [
      "--all",
      "--filter",
      "--force",
      "--help",
      "-a",
      "-f"
    ],
    "descriptionOriginal": "Remove unused local volumes"
  },
  {
    "command": "docker volume remove",
    "description": "Remove volumes; um volume em uso por um container não pode ser removido.",
    "help": "Usage:  docker volume rm [OPTIONS] VOLUME [VOLUME...]\n\nRemove one or more volumes. You cannot remove a volume that is in use by a container.\n\nAliases:\n  docker volume rm, docker volume remove\n\nOptions:\n  -f, --force   Force the removal of one or more volumes\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more volumes. You cannot remove a volume that is in use by a container."
  },
  {
    "command": "docker volume rm",
    "description": "Remove um ou mais volumes.",
    "help": "Usage:  docker volume rm [OPTIONS] VOLUME [VOLUME...]\n\nRemove one or more volumes. You cannot remove a volume that is in use by a container.\n\nAliases:\n  docker volume rm, docker volume remove\n\nOptions:\n  -f, --force   Force the removal of one or more volumes\n",
    "flags": [
      "--force",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Remove one or more volumes"
  },
  {
    "command": "docker builder dap build",
    "description": "Inicia a construção de uma imagem.",
    "help": "Usage:  docker buildx dap build [OPTIONS] PATH | URL | -\n\nStart a build\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder\n                                      instance (default \"default\")\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Start a build"
  },
  {
    "command": "docker builder history export",
    "description": "Exporta registros de construção para um pacote do Docker Desktop.",
    "help": "Usage:  docker buildx history export [OPTIONS] [REF...]\n\nExport build records into Docker Desktop bundle\n\nOptions:\n      --all              Export all build records for the builder\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n      --finalize         Ensure build records are finalized before exporting\n  -o, --output string    Output file path\n",
    "flags": [
      "--all",
      "--builder",
      "--debug",
      "--finalize",
      "--help",
      "--output",
      "-D",
      "-o"
    ],
    "descriptionOriginal": "Export build records into Docker Desktop bundle"
  },
  {
    "command": "docker builder history import",
    "description": "Importa registros de construção no Docker Desktop.",
    "help": "Usage:  docker buildx history import [OPTIONS] -\n\nImport build records into Docker Desktop\n\nOptions:\n      --builder string     Override the configured builder instance\n                           (default \"default\")\n  -D, --debug              Enable debug logging\n  -f, --file stringArray   Import from a file path\n",
    "flags": [
      "--builder",
      "--debug",
      "--file",
      "--help",
      "-D",
      "-f"
    ],
    "descriptionOriginal": "Import build records into Docker Desktop"
  },
  {
    "command": "docker builder history inspect",
    "description": "Inspeciona um registro de construção.",
    "help": "Usage:  docker buildx history inspect [OPTIONS] COMMAND\n\nInspect a build record\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n      --format string    Format the output (default \"pretty\")\n\nCommands:\n  attachment  Inspect a build record attachment\n\nRun 'docker buildx history inspect COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--format",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Inspect a build record"
  },
  {
    "command": "docker builder history logs",
    "description": "Mostra os logs de um registro de construção.",
    "help": "Usage:  docker buildx history logs [OPTIONS] [REF]\n\nPrint the logs of a build record\n\nOptions:\n      --builder string    Override the configured builder instance\n                          (default \"default\")\n  -D, --debug             Enable debug logging\n      --progress string   Set type of progress output (plain, rawjson,\n                          tty) (default \"plain\")\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "--progress",
      "-D"
    ],
    "descriptionOriginal": "Print the logs of a build record"
  },
  {
    "command": "docker builder history ls",
    "description": "Lista registros de construção.",
    "help": "Usage:  docker buildx history ls [OPTIONS]\n\nList build records\n\nOptions:\n      --builder string       Override the configured builder instance\n                             (default \"default\")\n  -D, --debug                Enable debug logging\n      --filter stringArray   Provide filter values (e.g., \"status=error\")\n      --format string        Format the output (default \"table\")\n      --local                List records for current repository only\n      --no-trunc             Don't truncate output\n",
    "flags": [
      "--builder",
      "--debug",
      "--filter",
      "--format",
      "--help",
      "--local",
      "--no-trunc",
      "-D"
    ],
    "descriptionOriginal": "List build records"
  },
  {
    "command": "docker builder history open",
    "description": "Abre um registro de construção no Docker Desktop.",
    "help": "Usage:  docker buildx history open [OPTIONS] [REF]\n\nOpen a build record in Docker Desktop\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Open a build record in Docker Desktop"
  },
  {
    "command": "docker builder history rm",
    "description": "Remove registros de construção.",
    "help": "Usage:  docker buildx history rm [OPTIONS] [REF...]\n\nRemove build records\n\nOptions:\n      --all              Remove all build records\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--all",
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Remove build records"
  },
  {
    "command": "docker builder history trace",
    "description": "Mostra o rastreamento OpenTelemetry de uma construção.",
    "help": "Usage:  docker buildx history trace [OPTIONS] [REF]\n\nShow the OpenTelemetry trace of a build record\n\nOptions:\n      --addr string      Address to bind the UI server (default \"127.0.0.1:0\")\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n      --compare string   Compare with another build record\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--addr",
      "--builder",
      "--compare",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Show the OpenTelemetry trace of a build record"
  },
  {
    "command": "docker builder imagetools create",
    "description": "Cria uma imagem a partir de imagens de origem.",
    "help": "Usage:  docker buildx imagetools create [OPTIONS] [SOURCE...]\n\nCreate a new image based on source images\n\nOptions:\n      --annotation stringArray   Add annotation to the image\n      --append                   Append to existing manifest\n      --builder string           Override the configured builder instance\n                                 (default \"default\")\n  -D, --debug                    Enable debug logging\n      --dry-run                  Show final image instead of pushing\n  -f, --file stringArray         Read source descriptor from file\n      --metadata-file string     Write create result metadata to a file\n  -p, --platform stringArray     Filter specified platforms of target image\n      --prefer-index             When only a single source is specified,\n                                 prefer outputting an image index or\n                                 manifest list instead of performing a\n                                 carbon copy (default true)\n      --progress string          Set type of progress output (\"auto\",\n                                 \"none\", \"plain\", \"rawjson\", \"tty\"). Use\n                                 plain to show container output (default\n                                 \"auto\")\n  -t, --tag stringArray          Set reference for new image\n",
    "flags": [
      "--annotation",
      "--append",
      "--builder",
      "--debug",
      "--dry-run",
      "--file",
      "--help",
      "--metadata-file",
      "--platform",
      "--prefer-index",
      "--progress",
      "--tag",
      "-D",
      "-f",
      "-p",
      "-t"
    ],
    "descriptionOriginal": "Create a new image based on source images"
  },
  {
    "command": "docker builder imagetools inspect",
    "description": "Mostra detalhes de uma imagem no registry.",
    "help": "Usage:  docker buildx imagetools inspect [OPTIONS] NAME\n\nShow details of an image in the registry\n\nOptions:\n      --builder string   Override the configured builder instance\n                         (default \"default\")\n  -D, --debug            Enable debug logging\n      --format string    Format the output using the given Go template\n      --raw              Show original, unformatted JSON manifest\n",
    "flags": [
      "--builder",
      "--debug",
      "--format",
      "--help",
      "--raw",
      "-D"
    ],
    "descriptionOriginal": "Show details of an image in the registry"
  },
  {
    "command": "docker builder policy eval",
    "description": "Avalia uma política para uma origem.",
    "help": "Usage:  docker buildx policy eval [OPTIONS] source\n\nEvaluate policy for a source\n\nOptions:\n      --builder string    Override the configured builder instance\n                          (default \"default\")\n  -D, --debug             Enable debug logging\n      --fields strings    Fields to evaluate\n  -f, --file string       Policy filename to evaluate (default \"Dockerfile\")\n      --platform string   Target platform for policy evaluation\n      --print             Print policy output\n",
    "flags": [
      "--builder",
      "--debug",
      "--fields",
      "--file",
      "--help",
      "--platform",
      "--print",
      "-D",
      "-f"
    ],
    "descriptionOriginal": "Evaluate policy for a source"
  },
  {
    "command": "docker builder policy test",
    "description": "Executa testes de políticas.",
    "help": "Usage:  docker buildx policy test <path>\n\nRun policy tests\n\nOptions:\n      --builder string    Override the configured builder instance\n                          (default \"default\")\n  -D, --debug             Enable debug logging\n      --filename string   Name of the Dockerfile to validate (default\n                          \"Dockerfile\")\n      --run string        Run only tests with name containing this substring\n",
    "flags": [
      "--builder",
      "--debug",
      "--filename",
      "--help",
      "--run",
      "-D"
    ],
    "descriptionOriginal": "Run policy tests"
  },
  {
    "command": "docker builder replay build",
    "description": "Reconstrói uma imagem usando proveniência e materiais fixados.",
    "help": "Usage:  docker buildx replay build [OPTIONS] SUBJECT\n\nRebuild an image from provenance and pinned materials\n\nEXPERIMENTAL:\n  docker buildx replay build is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --builder string         Override the configured builder instance\n                               (default \"default\")\n  -D, --debug                  Enable debug logging\n      --dry-run                Print a plan of the replay without solving\n                               or exporting\n      --format string          Format dry-run output (\"pretty\" | \"json\")\n                               (default \"pretty\")\n      --load                   Shorthand for \"--output=type=docker\"\n      --network string         Network mode for RUN instructions\n                               (\"default\" | \"none\"; defaults to the mode\n                               of the original build)\n  -o, --output stringArray     Output destination (format:\n                               \"type=local,dest=path\")\n      --platform stringArray   Platform of the subject to replay\n                               (defaults to the only platform of the\n                               subject or the builder default platform)\n      --progress string        Set type of progress output (\"auto\" |\n                               \"plain\" | \"tty\" | \"quiet\" | \"rawjson\")\n                               (default \"auto\")\n      --push                   Shorthand for\n                               \"--output=type=registry,unpack=false\"\n      --replay-mode string     Replay mode (\"materials\" | \"frontend\")\n                               (default \"materials\")\n      --secret stringArray     Secret to expose to the replayed build\n                               (format: \"id=mysecret[,src=/local/secret]\")\n      --ssh stringArray        SSH agent socket or keys to expose\n                               (format:\n                               \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray        Image identifier (format:\n                               \"[registry/]repository[:tag]\")\n",
    "flags": [
      "--builder",
      "--debug",
      "--dry-run",
      "--format",
      "--help",
      "--load",
      "--network",
      "--output",
      "--platform",
      "--progress",
      "--push",
      "--replay-mode",
      "--secret",
      "--ssh",
      "--tag",
      "-D",
      "-o",
      "-t"
    ],
    "descriptionOriginal": "Rebuild an image from provenance and pinned materials"
  },
  {
    "command": "docker buildx dap build",
    "description": "Inicia a construção de uma imagem.",
    "help": "Usage:  docker buildx dap build [OPTIONS] PATH | URL | -\n\nStart a build\n\nOptions:\n      --add-host strings              Add a custom host-to-IP mapping\n                                      (format: \"host:ip\")\n      --allow stringArray             Allow extra privileged entitlement\n                                      (e.g., \"network.host\",\n                                      \"security.insecure\", \"device\",\n                                      \"buildx.local.delete\")\n      --annotation stringArray        Add annotation to the image\n      --attest stringArray            Attestation parameters (format:\n                                      \"type=sbom,generator=image\")\n      --build-arg stringArray         Set build-time variables\n      --build-context stringArray     Additional build contexts (e.g.,\n                                      name=path)\n      --builder string                Override the configured builder instance\n      --cache-from stringArray        External cache sources (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,src=path/to/dir\")\n      --cache-to stringArray          Cache export destinations (e.g.,\n                                      \"user/app:cache\",\n                                      \"type=local,dest=path/to/dir\")\n      --call string                   Set method for evaluating build\n                                      (\"check\", \"outline\", \"targets\")\n                                      (default \"build\")\n      --cgroup-parent string          Set the parent cgroup for the \"RUN\"\n                                      instructions during build\n      --check                         Shorthand for \"--call=check\"\n  -D, --debug                         Enable debug logging\n  -f, --file string                   Name of the Dockerfile (default:\n                                      \"PATH/Dockerfile\")\n      --iidfile string                Write the image ID to a file\n      --label stringArray             Set metadata for an image\n      --load                          Shorthand for \"--output=type=docker\"\n      --metadata-file string          Write build result metadata to a file\n      --network string                Set the networking mode for the\n                                      \"RUN\" instructions during build\n                                      (default \"default\")\n      --no-cache                      Do not use cache when building the image\n      --no-cache-filter stringArray   Do not cache specified stages\n  -o, --output stringArray            Output destination (format:\n                                      \"type=local,dest=path\")\n      --platform stringArray          Set target platform for build\n      --policy stringArray            Policy configuration (format:\n                                      \"filename=path[,filename=path][,reset=true|false][,disabled=true|false][,strict=true|false][,log-level=level]\")\n      --progress string               Set type of progress output\n                                      (\"auto\", \"none\",  \"plain\", \"quiet\",\n                                      \"rawjson\", \"tty\"). Use plain to\n                                      show container output (default \"auto\")\n      --provenance string             Shorthand for \"--attest=type=provenance\"\n      --pull                          Always attempt to pull all\n                                      referenced images\n      --push                          Shorthand for\n                                      \"--output=type=registry,unpack=false\"\n  -q, --quiet                         Suppress the build output and print\n                                      image ID on success\n      --resource stringArray          Resource limits for build\n                                      containers (format: \"memory=2g\",\n                                      \"cpu-quota=50000\")\n      --sbom string                   Shorthand for \"--attest=type=sbom\"\n      --secret stringArray            Secret to expose to the build\n                                      (format:\n                                      \"id=mysecret[,src=/local/secret]\")\n      --shm-size bytes                Shared memory size for build containers\n      --ssh stringArray               SSH agent socket or keys to expose\n                                      to the build (format:\n                                      \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray               Image identifier (format:\n                                      \"[registry/]repository[:tag]\")\n      --target string                 Set the target build stage to build\n      --ulimit ulimit                 Ulimit options (default [])\n",
    "flags": [
      "--add-host",
      "--allow",
      "--annotation",
      "--attest",
      "--build-arg",
      "--build-context",
      "--builder",
      "--cache-from",
      "--cache-to",
      "--call",
      "--cgroup-parent",
      "--check",
      "--debug",
      "--file",
      "--help",
      "--iidfile",
      "--label",
      "--load",
      "--metadata-file",
      "--network",
      "--no-cache",
      "--no-cache-filter",
      "--output",
      "--platform",
      "--policy",
      "--progress",
      "--provenance",
      "--pull",
      "--push",
      "--quiet",
      "--resource",
      "--sbom",
      "--secret",
      "--shm-size",
      "--ssh",
      "--tag",
      "--target",
      "--ulimit",
      "-D",
      "-f",
      "-o",
      "-q",
      "-t"
    ],
    "descriptionOriginal": "Start a build"
  },
  {
    "command": "docker buildx history export",
    "description": "Exporta registros de construção para um pacote do Docker Desktop.",
    "help": "Usage:  docker buildx history export [OPTIONS] [REF...]\n\nExport build records into Docker Desktop bundle\n\nOptions:\n      --all              Export all build records for the builder\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n      --finalize         Ensure build records are finalized before exporting\n  -o, --output string    Output file path\n",
    "flags": [
      "--all",
      "--builder",
      "--debug",
      "--finalize",
      "--help",
      "--output",
      "-D",
      "-o"
    ],
    "descriptionOriginal": "Export build records into Docker Desktop bundle"
  },
  {
    "command": "docker buildx history import",
    "description": "Importa registros de construção no Docker Desktop.",
    "help": "Usage:  docker buildx history import [OPTIONS] -\n\nImport build records into Docker Desktop\n\nOptions:\n      --builder string     Override the configured builder instance\n  -D, --debug              Enable debug logging\n  -f, --file stringArray   Import from a file path\n",
    "flags": [
      "--builder",
      "--debug",
      "--file",
      "--help",
      "-D",
      "-f"
    ],
    "descriptionOriginal": "Import build records into Docker Desktop"
  },
  {
    "command": "docker buildx history inspect",
    "description": "Inspeciona um registro de construção.",
    "help": "Usage:  docker buildx history inspect [OPTIONS] COMMAND\n\nInspect a build record\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n      --format string    Format the output (default \"pretty\")\n\nCommands:\n  attachment  Inspect a build record attachment\n\nRun 'docker buildx history inspect COMMAND --help' for more information on a command.\n",
    "flags": [
      "--builder",
      "--debug",
      "--format",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Inspect a build record"
  },
  {
    "command": "docker buildx history logs",
    "description": "Mostra os logs de um registro de construção.",
    "help": "Usage:  docker buildx history logs [OPTIONS] [REF]\n\nPrint the logs of a build record\n\nOptions:\n      --builder string    Override the configured builder instance\n  -D, --debug             Enable debug logging\n      --progress string   Set type of progress output (plain, rawjson,\n                          tty) (default \"plain\")\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "--progress",
      "-D"
    ],
    "descriptionOriginal": "Print the logs of a build record"
  },
  {
    "command": "docker buildx history ls",
    "description": "Lista registros de construção.",
    "help": "Usage:  docker buildx history ls [OPTIONS]\n\nList build records\n\nOptions:\n      --builder string       Override the configured builder instance\n  -D, --debug                Enable debug logging\n      --filter stringArray   Provide filter values (e.g., \"status=error\")\n      --format string        Format the output (default \"table\")\n      --local                List records for current repository only\n      --no-trunc             Don't truncate output\n",
    "flags": [
      "--builder",
      "--debug",
      "--filter",
      "--format",
      "--help",
      "--local",
      "--no-trunc",
      "-D"
    ],
    "descriptionOriginal": "List build records"
  },
  {
    "command": "docker buildx history open",
    "description": "Abre um registro de construção no Docker Desktop.",
    "help": "Usage:  docker buildx history open [OPTIONS] [REF]\n\nOpen a build record in Docker Desktop\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Open a build record in Docker Desktop"
  },
  {
    "command": "docker buildx history rm",
    "description": "Remove registros de construção.",
    "help": "Usage:  docker buildx history rm [OPTIONS] [REF...]\n\nRemove build records\n\nOptions:\n      --all              Remove all build records\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--all",
      "--builder",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Remove build records"
  },
  {
    "command": "docker buildx history trace",
    "description": "Mostra o rastreamento OpenTelemetry de uma construção.",
    "help": "Usage:  docker buildx history trace [OPTIONS] [REF]\n\nShow the OpenTelemetry trace of a build record\n\nOptions:\n      --addr string      Address to bind the UI server (default \"127.0.0.1:0\")\n      --builder string   Override the configured builder instance\n      --compare string   Compare with another build record\n  -D, --debug            Enable debug logging\n",
    "flags": [
      "--addr",
      "--builder",
      "--compare",
      "--debug",
      "--help",
      "-D"
    ],
    "descriptionOriginal": "Show the OpenTelemetry trace of a build record"
  },
  {
    "command": "docker buildx imagetools create",
    "description": "Cria uma imagem a partir de imagens de origem.",
    "help": "Usage:  docker buildx imagetools create [OPTIONS] [SOURCE...]\n\nCreate a new image based on source images\n\nOptions:\n      --annotation stringArray   Add annotation to the image\n      --append                   Append to existing manifest\n      --builder string           Override the configured builder instance\n  -D, --debug                    Enable debug logging\n      --dry-run                  Show final image instead of pushing\n  -f, --file stringArray         Read source descriptor from file\n      --metadata-file string     Write create result metadata to a file\n  -p, --platform stringArray     Filter specified platforms of target image\n      --prefer-index             When only a single source is specified,\n                                 prefer outputting an image index or\n                                 manifest list instead of performing a\n                                 carbon copy (default true)\n      --progress string          Set type of progress output (\"auto\",\n                                 \"none\", \"plain\", \"rawjson\", \"tty\"). Use\n                                 plain to show container output (default\n                                 \"auto\")\n  -t, --tag stringArray          Set reference for new image\n",
    "flags": [
      "--annotation",
      "--append",
      "--builder",
      "--debug",
      "--dry-run",
      "--file",
      "--help",
      "--metadata-file",
      "--platform",
      "--prefer-index",
      "--progress",
      "--tag",
      "-D",
      "-f",
      "-p",
      "-t"
    ],
    "descriptionOriginal": "Create a new image based on source images"
  },
  {
    "command": "docker buildx imagetools inspect",
    "description": "Mostra detalhes de uma imagem no registry.",
    "help": "Usage:  docker buildx imagetools inspect [OPTIONS] NAME\n\nShow details of an image in the registry\n\nOptions:\n      --builder string   Override the configured builder instance\n  -D, --debug            Enable debug logging\n      --format string    Format the output using the given Go template\n      --raw              Show original, unformatted JSON manifest\n",
    "flags": [
      "--builder",
      "--debug",
      "--format",
      "--help",
      "--raw",
      "-D"
    ],
    "descriptionOriginal": "Show details of an image in the registry"
  },
  {
    "command": "docker buildx policy eval",
    "description": "Avalia uma política para uma origem.",
    "help": "Usage:  docker buildx policy eval [OPTIONS] source\n\nEvaluate policy for a source\n\nOptions:\n      --builder string    Override the configured builder instance\n  -D, --debug             Enable debug logging\n      --fields strings    Fields to evaluate\n  -f, --file string       Policy filename to evaluate (default \"Dockerfile\")\n      --platform string   Target platform for policy evaluation\n      --print             Print policy output\n",
    "flags": [
      "--builder",
      "--debug",
      "--fields",
      "--file",
      "--help",
      "--platform",
      "--print",
      "-D",
      "-f"
    ],
    "descriptionOriginal": "Evaluate policy for a source"
  },
  {
    "command": "docker buildx policy test",
    "description": "Executa testes de políticas.",
    "help": "Usage:  docker buildx policy test <path>\n\nRun policy tests\n\nOptions:\n      --builder string    Override the configured builder instance\n  -D, --debug             Enable debug logging\n      --filename string   Name of the Dockerfile to validate (default\n                          \"Dockerfile\")\n      --run string        Run only tests with name containing this substring\n",
    "flags": [
      "--builder",
      "--debug",
      "--filename",
      "--help",
      "--run",
      "-D"
    ],
    "descriptionOriginal": "Run policy tests"
  },
  {
    "command": "docker buildx replay build",
    "description": "Reconstrói uma imagem usando proveniência e materiais fixados.",
    "help": "Usage:  docker buildx replay build [OPTIONS] SUBJECT\n\nRebuild an image from provenance and pinned materials\n\nEXPERIMENTAL:\n  docker buildx replay build is an experimental feature.\n  Experimental features provide early access to product functionality. These\n  features may change between releases without warning, or can be removed from a\n  future release. Learn more about experimental features in our documentation:\n  https://docs.docker.com/go/experimental/\n\nOptions:\n      --builder string         Override the configured builder instance\n  -D, --debug                  Enable debug logging\n      --dry-run                Print a plan of the replay without solving\n                               or exporting\n      --format string          Format dry-run output (\"pretty\" | \"json\")\n                               (default \"pretty\")\n      --load                   Shorthand for \"--output=type=docker\"\n      --network string         Network mode for RUN instructions\n                               (\"default\" | \"none\"; defaults to the mode\n                               of the original build)\n  -o, --output stringArray     Output destination (format:\n                               \"type=local,dest=path\")\n      --platform stringArray   Platform of the subject to replay\n                               (defaults to the only platform of the\n                               subject or the builder default platform)\n      --progress string        Set type of progress output (\"auto\" |\n                               \"plain\" | \"tty\" | \"quiet\" | \"rawjson\")\n                               (default \"auto\")\n      --push                   Shorthand for\n                               \"--output=type=registry,unpack=false\"\n      --replay-mode string     Replay mode (\"materials\" | \"frontend\")\n                               (default \"materials\")\n      --secret stringArray     Secret to expose to the replayed build\n                               (format: \"id=mysecret[,src=/local/secret]\")\n      --ssh stringArray        SSH agent socket or keys to expose\n                               (format:\n                               \"default|<id>[=<socket>|<key>[,<key>]]\")\n  -t, --tag stringArray        Image identifier (format:\n                               \"[registry/]repository[:tag]\")\n",
    "flags": [
      "--builder",
      "--debug",
      "--dry-run",
      "--format",
      "--help",
      "--load",
      "--network",
      "--output",
      "--platform",
      "--progress",
      "--push",
      "--replay-mode",
      "--secret",
      "--ssh",
      "--tag",
      "-D",
      "-o",
      "-t"
    ],
    "descriptionOriginal": "Rebuild an image from provenance and pinned materials"
  },
  {
    "command": "docker compose bridge convert",
    "description": "Converte arquivos Compose para manifestos Kubernetes, charts Helm ou outro modelo.",
    "help": "Usage:  docker compose bridge convert\n\nConvert compose files to Kubernetes manifests, Helm charts, or another model\n\nOptions:\n      --dry-run                      Execute command in dry run mode\n  -o, --output string                The output directory for the\n                                     Kubernetes resources (default \"out\")\n      --templates string             Directory containing transformation\n                                     templates\n  -t, --transformation stringArray   Transformation to apply to compose\n                                     model (default:\n                                     docker/compose-bridge-kubernetes)\n  -y, --yes                          Assume \"yes\" to the output directory\n                                     overwrite prompt. For scripts/CI,\n                                     where no interactive confirmation is\n                                     possible\n",
    "flags": [
      "--dry-run",
      "--help",
      "--output",
      "--templates",
      "--transformation",
      "--yes",
      "-o",
      "-t",
      "-y"
    ],
    "descriptionOriginal": "Convert compose files to Kubernetes manifests, Helm charts, or another model"
  },
  {
    "command": "docker compose bridge transformations",
    "description": "Gerencia imagens de transformação.",
    "help": "Usage:  docker compose bridge transformations [OPTIONS] COMMAND\n\nManage transformation images\n\nOptions:\n      --dry-run   Execute command in dry run mode\n\nCommands:\n  create      Create a new transformation\n  list        List available transformations\n\nRun 'docker compose bridge transformations COMMAND --help' for more information on a command.\n",
    "flags": [
      "--dry-run",
      "--help"
    ],
    "descriptionOriginal": "Manage transformation images"
  },
  {
    "command": "docker builder history inspect attachment",
    "description": "Inspeciona um anexo do registro de construção.",
    "help": "Usage:  docker buildx history inspect attachment [OPTIONS] [REF [DIGEST]]\n\nInspect a build record attachment\n\nOptions:\n      --builder string    Override the configured builder instance\n                          (default \"default\")\n  -D, --debug             Enable debug logging\n      --platform string   Platform of attachment\n      --type string       Type of attachment\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "--platform",
      "--type",
      "-D"
    ],
    "descriptionOriginal": "Inspect a build record attachment"
  },
  {
    "command": "docker buildx history inspect attachment",
    "description": "Inspeciona um anexo do registro de construção.",
    "help": "Usage:  docker buildx history inspect attachment [OPTIONS] [REF [DIGEST]]\n\nInspect a build record attachment\n\nOptions:\n      --builder string    Override the configured builder instance\n  -D, --debug             Enable debug logging\n      --platform string   Platform of attachment\n      --type string       Type of attachment\n",
    "flags": [
      "--builder",
      "--debug",
      "--help",
      "--platform",
      "--type",
      "-D"
    ],
    "descriptionOriginal": "Inspect a build record attachment"
  },
  {
    "command": "docker compose bridge transformations create",
    "description": "Cria uma transformação.",
    "help": "Usage:  docker compose bridge transformations create [OPTION] PATH\n\nCreate a new transformation\n\nOptions:\n      --dry-run       Execute command in dry run mode\n  -f, --from string   Existing transformation to copy (default:\n                      docker/compose-bridge-kubernetes)\n",
    "flags": [
      "--dry-run",
      "--from",
      "--help",
      "-f"
    ],
    "descriptionOriginal": "Create a new transformation"
  },
  {
    "command": "docker compose bridge transformations list",
    "description": "Lista as transformações disponíveis.",
    "help": "Usage:  docker compose bridge transformations list\n\nList available transformations\n\nAliases:\n  docker compose bridge transformations list, docker compose bridge transformations ls\n\nOptions:\n      --dry-run         Execute command in dry run mode\n      --format string   Format the output. Values: [table | json]\n                        (default \"table\")\n  -q, --quiet           Only display transformer names\n",
    "flags": [
      "--dry-run",
      "--format",
      "--help",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "List available transformations"
  },
  {
    "command": "docker compose bridge transformations ls",
    "description": "Lista as transformações disponíveis.",
    "help": "Usage:  docker compose bridge transformations list\n\nList available transformations\n\nAliases:\n  docker compose bridge transformations list, docker compose bridge transformations ls\n\nOptions:\n      --dry-run         Execute command in dry run mode\n      --format string   Format the output. Values: [table | json]\n                        (default \"table\")\n  -q, --quiet           Only display transformer names\n",
    "flags": [
      "--dry-run",
      "--format",
      "--help",
      "--quiet",
      "-q"
    ],
    "descriptionOriginal": "List available transformations"
  }
];
