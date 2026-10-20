(() => {
  "use strict";
  const slides = window.OFICINA_SLIDES;
  const quiz = window.OFICINA_QUIZ;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (char) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[char],
    );
  const read = (key, fallback) => {
    try {
      return (
        JSON.parse(localStorage.getItem("oficina-docker:" + key)) ?? fallback
      );
    } catch {
      return fallback;
    }
  };
  const save = (key, value) => {
    try {
      localStorage.setItem("oficina-docker:" + key, JSON.stringify(value));
    } catch {}
  };
  const chapters = [...new Set(slides.map((s) => s.chapter))];
  const guides = [
    [
      "00-preparacao",
      "Preparação do laboratório",
      "Imagens, portas, Linux Mint e primeiros comandos",
    ],
    [
      "01-containers",
      "Containers e filesystem",
      "Criação, processos, inspeção e ciclo dos arquivos",
    ],
    [
      "02-ide-desktop",
      "IDE desktop no container",
      "X11/XWayland e alternativa Wayland",
    ],
    [
      "03-compose-armazenamento",
      "Compose e armazenamento",
      "Bind mounts, volumes e ciclo de vida",
    ],
    [
      "04-imagens-dockerfile",
      "Imagens e Dockerfile",
      "Build, cache, instruções e multi-stage",
    ],
    [
      "05-aplicacao-rede",
      "Aplicação e redes",
      "Frontend, Go, PostgreSQL e prontidão",
    ],
    [
      "06-docker-hub",
      "Docker Hub",
      "Publicação e execução da imagem do colega",
    ],
    [
      "07-referencia",
      "Referência detalhada",
      "Flags, YAML e todas as instruções Dockerfile",
    ],
    [
      "08-desafios",
      "Desafios e diagnóstico",
      "Falhas intencionais, correção e limpeza",
    ],
  ];
  const basics = [
    ["docker pull alpine:3.22", "Baixar uma imagem do registry."],
    [
      "docker run -d --name fs-lab alpine:3.22 sleep infinity",
      "Criar e iniciar um container desacoplado.",
    ],
    ["docker ps -a", "Listar containers em execução e parados."],
    [
      "docker exec -it fs-lab sh",
      "Iniciar um shell em um container em execução.",
    ],
    [
      "docker stop fs-lab",
      "Parar o processo principal, preservando o container.",
    ],
    ["docker start fs-lab", "Iniciar o mesmo container."],
    [
      "docker rm -f fs-lab",
      "Forçar parada e remover apenas o container do exercício.",
    ],
    ["docker inspect fs-lab", "Inspecionar estado, configuração e mounts."],
    [
      "docker logs -f --tail 50 fs-lab",
      "Acompanhar stdout/stderr capturados. Ctrl+C encerra o acompanhamento.",
    ],
    ["docker top fs-lab", "Listar processos."],
    ["docker stats --no-stream fs-lab", "Observar consumo de recursos."],
    [
      "docker image history oficina/api:1.0.0",
      "Examinar o histórico da imagem.",
    ],
    [
      "docker build -t oficina/api:1.0.0 exemplos/mural/api",
      "Construir a imagem da API.",
    ],
    ["docker volume ls", "Listar volumes administrados pelo Docker."],
    ["docker network ls", "Listar redes."],
    [
      "docker compose -f compose.app.yaml up -d --build --wait",
      "Construir e subir o mural aguardando prontidão.",
    ],
    [
      "docker compose -f compose.app.yaml down",
      "Remover os containers e a rede, preservando volumes por padrão.",
    ],
    [
      "docker compose -f compose.app.yaml down -v",
      "Remover também os volumes abrangidos. Apaga os dados do exercício.",
    ],
  ];
  let index = 0,
    notesOpen = read("notes", false),
    toastTimeout;
  function code(text, label = "Terminal") {
    return (
      '<div class="code-block"><div class="code-header"><span>' +
      esc(label) +
      '</span><button class="copy-button" type="button">Copiar</button></div><pre><code>' +
      esc(text) +
      "</code></pre></div>"
    );
  }
  function toast(message) {
    $("#toast").textContent = message;
    $("#toast").classList.add("visible");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(
      () => $("#toast").classList.remove("visible"),
      2600,
    );
  }
  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext)
        await navigator.clipboard.writeText(text);
      else {
        const input = document.createElement("textarea");
        input.value = text;
        input.style.position = "fixed";
        input.style.opacity = "0";
        document.body.append(input);
        input.select();
        const copied = document.execCommand("copy");
        input.remove();
        if (!copied) throw new Error("copy");
      }
      toast("Comando copiado. Execute no terminal indicado pelo guia.");
    } catch {
      toast("Não foi possível copiar. Selecione o texto do comando.");
    }
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest(".copy-button");
    if (button)
      copyText(button.closest(".code-block").querySelector("code").textContent);
  });
  function guideLink(id) {
    return (
      '<a class="guide-link" href="../docs/' +
      esc(id) +
      '.html" target="_blank" rel="noopener">Abrir o passo a passo deste exercício ↗</a>'
    );
  }
  function flow(nodes) {
    return (
      '<div class="flow">' +
      nodes
        .map(
          (n, i) =>
            (i ? '<span class="flow-arrow" aria-hidden="true">→</span>' : "") +
            '<div class="flow-node">' +
            esc(n) +
            "</div>",
        )
        .join("") +
      "</div>"
    );
  }
  function stack() {
    return '<div class="hero-stack" aria-label="Camada do container acima das camadas imutáveis da imagem"><div class="stack-top"><div class="stack-label"><strong>Container em execução</strong><span>gravável</span></div><div class="stack-process">$ ./sua-aplicacao</div></div><div class="stack-base"><span>Imagem</span><strong>Sua aplicação</strong></div><div class="stack-base secondary"><span>Imagem</span><strong>Arquivos e dependências</strong></div><div class="stack-base tertiary"><span>Host Linux</span><strong>Um kernel compartilhado</strong></div><p class="stack-caption">A mesma imagem. Novas possibilidades.</p></div>';
  }
  function content(s) {
    const title = "<h1>" + esc(s.title) + "</h1>",
      lead = '<p class="lead">' + esc(s.lead) + "</p>";
    let body = "";
    switch (s.type) {
      case "hero":
        return (
          '<div class="hero-layout"><div><p class="hero-intro">Oficina prática · 3 horas</p><h1>Docker,<br>na prática</h1><p class="hero-line">Empacote. Execute.<br>Compartilhe.</p><span class="hero-footer">Do primeiro container à sua aplicação no mundo.</span></div>' +
          stack() +
          "</div>"
        );
      case "agenda":
        body =
          '<div class="agenda-list">' +
          [
            ["Fundamentos", "15 min"],
            ["Containers e arquivos", "25 min"],
            ["IDE desktop", "20 min"],
            ["Compose e armazenamento", "25 min"],
            ["Intervalo", "10 min"],
            ["Imagens e Dockerfile", "30 min"],
            ["Aplicação e redes", "30 min"],
            ["Hub e compartilhamento", "15 min"],
            ["Diagnóstico e dúvidas", "10 min"],
          ]
            .map(
              (v, i) =>
                '<div class="agenda-row"><span>' +
                String(i + 1).padStart(2, "0") +
                "</span><span>" +
                v[0] +
                "</span><span>" +
                v[1] +
                "</span></div>",
            )
            .join("") +
          "</div>";
        break;
      case "compare":
        body =
          '<div class="columns">' +
          s.columns
            .map(
              (c) =>
                '<section class="column"><h2>' +
                esc(c[0]) +
                "</h2>" +
                c
                  .slice(1)
                  .map((x) => "<p>" + esc(x) + "</p>")
                  .join("") +
                "</section>",
            )
            .join("") +
          "</div>";
        break;
      case "terms":
        body =
          '<dl class="terms">' +
          s.terms
            .map(
              (t) =>
                '<div class="term"><dt>' +
                esc(t[0]) +
                "</dt><dd>" +
                esc(t[1]) +
                "</dd></div>",
            )
            .join("") +
          "</dl>";
        break;
      case "architecture":
        body =
          flow(s.nodes) +
          '<p class="flow-note">Cada conexão tem uma função. A origem da chamada importa.</p>';
        break;
      case "table":
        body =
          '<table class="slide-table"><thead><tr>' +
          s.headers.map((h) => '<th scope="col">' + esc(h) + "</th>").join("") +
          "</tr></thead><tbody>" +
          s.rows
            .map(
              (r) =>
                "<tr>" +
                r.map((c) => "<td>" + esc(c) + "</td>").join("") +
                "</tr>",
            )
            .join("") +
          "</tbody></table>";
        break;
      case "code":
        body =
          s.id === "exec"
            ? code("docker exec -it fs-lab sh", "Terminal do host") +
              code(
                'pwd\nls -la /\nprintf \"meu primeiro arquivo\\n\" > /tmp/recado.txt\nexit',
                "Dentro do container, após abrir o shell",
              )
            : code(
                s.code,
                s.chapter === "Imagens" && s.code.startsWith("FROM")
                  ? "Dockerfile"
                  : "Terminal · confira o contexto no guia",
              );
        break;
      case "lab":
        body =
          '<ol class="lab-steps">' +
          s.steps.map((t) => "<li>" + esc(t) + "</li>").join("") +
          "</ol>" +
          code(s.code);
        break;
      case "desktop":
        body =
          '<div class="desktop-scene"><div class="desktop-terminal"><small>Processo no container</small>$ docker exec -it ide sh<br>$ abrir-ide<br><br><span style="color:#9cc4e8"># Uma aplicação gráfica.</span></div><div class="desktop-window"><div class="window-chrome"><span>recado.txt — IDE desktop</span><span aria-hidden="true">− □ ×</span></div><div class="window-content"><div class="window-tree">workspace<br>└ recado.txt</div><div class="window-code">1 &nbsp;Olá, turma!<br>2 &nbsp;Estou no container.</div></div><div class="window-note">Janela exibida pelo sistema gráfico do Linux</div></div></div>';
        break;
      case "filesystem":
        body = '<div id="filesystem-widget"></div>';
        break;
      case "layers":
        body = '<div id="layers-widget"></div>';
        break;
      case "cache":
        body = '<div id="cache-widget"></div>';
        break;
      case "network":
        body = '<div id="network-widget"></div>';
        break;
      case "compose":
        body = '<div id="compose-widget"></div>';
        break;
      case "quiz":
        body = '<div id="quiz-widget"></div>';
        break;
      case "break":
        body =
          '<div class="break-time">10<span>minutos</span></div><p class="flow-note">Na volta: transformar código em uma imagem.</p>';
        break;
      case "resources":
        body =
          '<div class="resources-list">' +
          guides
            .slice(0, 8)
            .map(
              (g) =>
                '<a class="resource-link" href="../docs/' +
                g[0] +
                '.html" target="_blank" rel="noopener">' +
                esc(g[1]) +
                "<span>" +
                esc(g[2]) +
                "</span></a>",
            )
            .join("") +
          "</div>";
        break;
      default:
        body =
          "<ul>" +
          s.bullets.map((b) => "<li>" + esc(b) + "</li>").join("") +
          "</ul>";
    }
    return title + lead + body + (s.guide ? guideLink(s.guide) : "");
  }
  function renderSidebar() {
    $("#chapters").innerHTML = chapters
      .map((chapter, i) => {
        const active = slides[index].chapter === chapter;
        return (
          '<button class="chapter-button ' +
          (active ? "active" : "") +
          '" data-goto="' +
          slides.findIndex((s) => s.chapter === chapter) +
          '" ' +
          (active ? 'aria-current="true"' : "") +
          '><span class="chapter-number">' +
          String(i + 1).padStart(2, "0") +
          "</span>" +
          esc(chapter) +
          "</button>" +
          (active
            ? '<div class="chapter-slides">' +
              slides
                .map((s, j) =>
                  s.chapter === chapter
                    ? '<button class="chapter-slide" data-goto="' +
                      j +
                      '" ' +
                      (j === index ? 'aria-current="page"' : "") +
                      ">" +
                      esc(s.title) +
                      "</button>"
                    : "",
                )
                .join("") +
              "</div>"
            : "")
        );
      })
      .join("");
  }
  function render() {
    const s = slides[index];
    $("#slide").className = "slide " + s.type;
    $("#slide").dataset.slideId = s.id;
    $("#slide").innerHTML = content(s);
    $("#breadcrumb").textContent = s.chapter;
    $("#slide-kind").textContent =
      {
        filesystem: "Experimente",
        network: "Experimente",
        layers: "Explore as camadas",
        cache: "Experimente",
        compose: "Explore o YAML",
        quiz: "Confira o que aprendeu",
        lab: "Mão na massa",
        code: "Comandos da oficina",
      }[s.type] || "Oficina Docker";
    $("#page-count").textContent =
      String(index + 1).padStart(2, "0") + " / " + slides.length;
    $("#progress").style.width = ((index + 1) / slides.length) * 100 + "%";
    $("#previous").disabled = index === 0;
    $("#next").disabled = index === slides.length - 1;
    $("#notes").hidden = !notesOpen;
    $("#notes-button").setAttribute("aria-pressed", String(notesOpen));
    $("#notes-text").textContent = s.notes;
    $("#notes-links").innerHTML =
      '<a href="' +
      esc(s.source) +
      '" target="_blank" rel="noopener">Documentação da fonte ↗</a>' +
      (s.guide ? guideLink(s.guide) : "");
    document.title =
      (index ? "Docker · " + s.title : "Docker, na prática") + " · Oficina";
    renderSidebar();
    const widgets = {
      filesystem: mountFilesystem,
      layers: mountLayers,
      cache: mountCache,
      network: mountNetwork,
      compose: mountCompose,
      quiz: mountQuiz,
    };
    if (widgets[s.type]) widgets[s.type]();
    document.body.classList.remove("sidebar-open");
    $("#menu-toggle").setAttribute("aria-expanded", "false");
  }
  function navigate(next, focus = false) {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    if (bounded === index) return;
    index = bounded;
    history.pushState({ slide: slides[index].id }, "", "#/" + slides[index].id);
    render();
    window.scrollTo({ top: 0, behavior: "instant" });
    if (focus) $("#slide").focus({ preventScroll: true });
  }
  function fromHash() {
    let id = "";
    try {
      id = decodeURIComponent(location.hash.replace(/^#\/?/, ""));
    } catch {}
    const found = slides.findIndex((s) => s.id === id);
    index = found >= 0 ? found : 0;
    render();
  }
  document.addEventListener("click", (event) => {
    const button = event.target.closest("[data-goto]");
    if (button) navigate(Number(button.dataset.goto), true);
  });
  $("#previous").onclick = () => navigate(index - 1, true);
  $("#next").onclick = () => navigate(index + 1, true);
  $("#notes-button").onclick = () => {
    notesOpen = !notesOpen;
    save("notes", notesOpen);
    $("#notes").hidden = !notesOpen;
    $("#notes-button").setAttribute("aria-pressed", String(notesOpen));
  };
  $("#menu-toggle").onclick = () => {
    document.body.classList.toggle("sidebar-open");
    $("#menu-toggle").setAttribute(
      "aria-expanded",
      String(document.body.classList.contains("sidebar-open")),
    );
  };
  $("#presentation-button").onclick = async () => {
    const enabled = document.body.classList.toggle("presentation");
    $("#presentation-button").setAttribute(
      "aria-label",
      enabled ? "Sair do modo de apresentação" : "Ativar modo de apresentação",
    );
    try {
      if (enabled && !document.fullscreenElement)
        await document.documentElement.requestFullscreen();
      else if (!enabled && document.fullscreenElement)
        await document.exitFullscreen();
    } catch {
      toast("Modo de apresentação ativado nesta janela.");
    }
  };
  document.addEventListener("fullscreenchange", () => {
    if (!document.fullscreenElement) {
      document.body.classList.remove("presentation");
      $("#presentation-button").setAttribute(
        "aria-label",
        "Ativar modo de apresentação",
      );
    }
  });
  function openDialog(id) {
    $(id).showModal();
  }
  $("#commands-button").onclick = () => {
    renderCommands("");
    $("#command-search").value = "";
    openDialog("#commands-dialog");
    $("#command-search").focus();
  };
  $("#resources-button").onclick = () => openDialog("#resources-dialog");
  document
    .querySelectorAll(".close-dialog")
    .forEach((b) => (b.onclick = () => b.closest("dialog").close()));
  document.querySelectorAll("dialog").forEach((d) =>
    d.addEventListener("click", (e) => {
      if (e.target === d) {
        const rect = d.getBoundingClientRect();
        if (
          e.clientX < rect.left ||
          e.clientX > rect.right ||
          e.clientY < rect.top ||
          e.clientY > rect.bottom
        )
          d.close();
      }
    }),
  );
  $("#guide-list").innerHTML =
    guides
      .map(
        (g) =>
          '<div class="guide-item"><a href="../docs/' +
          g[0] +
          '.html" target="_blank" rel="noopener">' +
          esc(g[1]) +
          "</a><small>" +
          esc(g[2]) +
          "</small></div>",
      )
      .join("") +
    '<div class="guide-item"><button class="sim-action" id="print-button">Imprimir os slides ou salvar em PDF</button></div>';
  $("#print-button").onclick = () => {
    document.querySelectorAll("dialog[open]").forEach((d) => d.close());
    window.print();
  };
  function renderCommands(query) {
    const q = query.trim().toLocaleLowerCase("pt-BR");
    const records = basics
      .map(([title, description]) => ({ title, description, help: title }))
      .concat(
        (window.OFICINA_COMPOSE_REFERENCE || []).map((r) => ({
          ...r,
          description:
            "Ajuda oficial da CLI · " +
            (window.OFICINA_COMPOSE_VERSION || "versão registrada"),
        })),
      );
    const matches = records.filter((r) =>
      (r.title + " " + r.description + " " + r.help)
        .toLocaleLowerCase("pt-BR")
        .includes(q),
    );
    $("#command-results").innerHTML =
      '<p class="command-description">' +
      matches.length +
      " resultado(s). A captura da CLI inclui as flags da versão indicada.</p>" +
      matches
        .map(
          (r) =>
            '<details class="command-item"><summary>' +
            esc(r.title) +
            '</summary><p class="command-description">' +
            esc(r.description) +
            "</p>" +
            code(r.help, "Referência · texto para consultar") +
            "</details>",
        )
        .join("");
  }
  $("#command-search").addEventListener("input", (e) =>
    renderCommands(e.target.value),
  );
  document.addEventListener("keydown", (event) => {
    const dialog = document.querySelector("dialog[open]");
    if (dialog) {
      if (event.key === "Escape") {
        event.preventDefault();
        dialog.close();
      }
      return;
    }
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target.closest(
        'input,textarea,select,button,a,[contenteditable="true"],summary',
      )
    )
      return;
    if (["ArrowRight", "PageDown", " "].includes(event.key)) {
      event.preventDefault();
      navigate(index + 1, true);
    } else if (["ArrowLeft", "PageUp"].includes(event.key)) {
      event.preventDefault();
      navigate(index - 1, true);
    } else if (event.key === "Home") {
      event.preventDefault();
      navigate(0, true);
    } else if (event.key === "End") {
      event.preventDefault();
      navigate(slides.length - 1, true);
    } else if (event.key.toLowerCase() === "n") $("#notes-button").click();
    else if (event.key.toLowerCase() === "f") $("#presentation-button").click();
    else if (event.key === "/") {
      event.preventDefault();
      $("#commands-button").click();
    }
  });
  let elapsed = 0,
    timerStart = null;
  function tick() {
    const total = elapsed + (timerStart ? Date.now() - timerStart : 0);
    const sec = Math.floor(total / 1000);
    $("#timer").textContent =
      String(Math.floor(sec / 60)).padStart(2, "0") +
      ":" +
      String(sec % 60).padStart(2, "0");
  }
  $("#timer-button").onclick = () => {
    if (timerStart) {
      elapsed += Date.now() - timerStart;
      timerStart = null;
    } else timerStart = Date.now();
    $("#timer-button").setAttribute(
      "aria-label",
      timerStart ? "Pausar cronômetro" : "Iniciar cronômetro",
    );
    tick();
  };
  $("#timer-reset").onclick = () => {
    elapsed = 0;
    timerStart = null;
    $("#timer-button").setAttribute("aria-label", "Iniciar cronômetro");
    tick();
  };
  setInterval(tick, 1000);
  function mountFilesystem() {
    const host = $("#filesystem-widget");
    host.innerHTML =
      '<p class="simulation-tag">Simulação didática. Nenhum comando é executado.</p><label class="sim-label" for="storage-mode">Destino da escrita </label><select id="storage-mode"><option value="layer">Camada gravável</option><option value="bind">Bind mount</option><option value="volume">Volume nomeado</option></select><div class="filesystem-layout"><div class="fs-container"><div class="fs-header"><strong id="fs-id"></strong><span id="fs-status" class="fs-badge"></span></div><div id="fs-container-file" class="fs-file"></div></div><div class="fs-store"><div class="fs-header"><strong id="fs-store-title"></strong></div><div id="fs-external" class="fs-file"></div></div></div><div class="sim-controls"><input id="fs-text" class="sim-input" value="Olá, turma!" aria-label="Conteúdo do arquivo" maxlength="40"><button id="fs-write" class="primary">Gravar arquivo</button><button id="fs-stop">stop</button><button id="fs-start">start</button><button id="fs-remove">rm</button><button id="fs-create">run novo</button><button id="fs-reset">Reiniciar simulação</button></div><p id="fs-feedback" class="sim-feedback" role="status"></p>';
    let exists = true,
      running = true,
      id = 1,
      mode = "layer",
      layer = "",
      external = "";
    function update(message) {
      $("#fs-id").textContent = exists
        ? "container-" + id
        : "Container removido";
      $("#fs-status").textContent = exists
        ? running
          ? "Em execução"
          : "Parado"
        : "Não existe";
      const file = mode === "layer" ? layer : external;
      $("#fs-container-file").textContent = exists
        ? file
          ? "recado.txt → " + file
          : "Nenhum recado.txt"
        : "A camada anterior foi eliminada.";
      $("#fs-store-title").textContent =
        mode === "layer"
          ? "Imagem original"
          : mode === "bind"
            ? "Pasta do host"
            : "Volume dados-lab";
      $("#fs-external").textContent =
        mode === "layer"
          ? "Sem o arquivo criado em runtime."
          : external
            ? "recado.txt → " + external
            : "Armazenamento sem recado.";
      $("#fs-write").disabled = !running || !exists;
      $("#fs-stop").disabled = !running || !exists;
      $("#fs-start").disabled = running || !exists;
      $("#fs-remove").disabled = !exists;
      $("#fs-create").disabled = exists;
      $("#fs-feedback").textContent = message;
    }
    $("#storage-mode").onchange = (e) => {
      mode = e.target.value;
      exists = running = true;
      id = 1;
      layer = external = "";
      update("Nova experiência: grave um arquivo e compare as operações.");
    };
    $("#fs-write").onclick = () => {
      const text = $("#fs-text").value.trim();
      if (!text) {
        update("Digite o conteúdo antes de gravar.");
        return;
      }
      if (mode === "layer") layer = text;
      else external = text;
      update(
        "Arquivo gravado " +
          (mode === "layer"
            ? "na camada deste container."
            : "no armazenamento montado."),
      );
    };
    $("#fs-stop").onclick = () => {
      running = false;
      update("O processo parou. A camada e o arquivo continuam existindo.");
    };
    $("#fs-start").onclick = () => {
      running = true;
      update("O mesmo container iniciou. O armazenamento foi preservado.");
    };
    $("#fs-remove").onclick = () => {
      exists = running = false;
      layer = "";
      update(
        mode === "layer"
          ? "Container removido: sua camada gravável foi eliminada."
          : "Container removido: o armazenamento montado permanece.",
      );
    };
    $("#fs-create").onclick = () => {
      exists = running = true;
      id++;
      layer = "";
      update(
        mode === "layer"
          ? "Outro container da imagem: o arquivo anterior não existe."
          : "Outro container usando o mesmo armazenamento: o arquivo permanece.",
      );
    };
    $("#fs-reset").onclick = () => {
      exists = running = true;
      id = 1;
      layer = external = "";
      update("Simulação reiniciada.");
    };
    update("Grave um arquivo e teste stop → start ou rm → run novo.");
  }
  function mountLayers() {
    const layers = [
      [
        "Camada gravável",
        "Container",
        "Escritas feitas em runtime pertencem ao container.",
        "Remover o container elimina essa camada. A imagem original permanece intacta.",
      ],
      [
        "Binário /api",
        "Imagem",
        "COPY --from=build /out/api /api",
        "O estágio final recebe o artefato compilado, sem levar o compilador.",
      ],
      [
        "Certificados e arquivos",
        "Imagem",
        "RUN apk add --no-cache ca-certificates",
        "Dependências necessárias em runtime permanecem na imagem final.",
      ],
      [
        "Base Alpine",
        "Imagem",
        "FROM alpine:3.22",
        "A base fornece arquivos de espaço de usuário. O kernel é o do host.",
      ],
      [
        "Configuração",
        "Metadados",
        "USER, EXPOSE, ENTRYPOINT e HEALTHCHECK",
        "Estas instruções configuram a imagem; não são cada uma uma camada de novos arquivos.",
      ],
    ];
    $("#layers-widget").innerHTML =
      '<p class="simulation-tag">Selecione uma parte para explorar o modelo.</p><div class="layer-layout"><div class="layer-stack">' +
      layers
        .map(
          (l, i) =>
            '<button class="layer-button" data-layer="' +
            i +
            '" aria-pressed="false">' +
            l[0] +
            "<span>" +
            l[1] +
            "</span></button>",
        )
        .join("") +
      '</div><div class="layer-explanation" id="layer-explanation" aria-live="polite"></div></div>';
    function choose(i) {
      document
        .querySelectorAll("[data-layer]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", String(Number(b.dataset.layer) === i)),
        );
      $("#layer-explanation").innerHTML =
        "<strong>" +
        esc(layers[i][2]) +
        "</strong><p>" +
        esc(layers[i][3]) +
        "</p>";
    }
    document
      .querySelectorAll("[data-layer]")
      .forEach((b) => (b.onclick = () => choose(Number(b.dataset.layer))));
    choose(0);
  }
  function mountCache() {
    const names = [
      "COPY go.mod / go.sum",
      "RUN go mod download",
      "COPY código",
      "RUN go build",
    ];
    $("#cache-widget").innerHTML =
      '<p class="simulation-tag">Modelo didático de invalidação. Não executa um build.</p><div class="sim-controls"><button data-cache="4">Sem alterações</button><button data-cache="2">Alterei o código Go</button><button data-cache="0">Alterei go.mod</button></div><div class="cache-steps">' +
      names
        .map(
          (n, i) =>
            '<div class="cache-step" data-cache-step="' +
            i +
            '">' +
            n +
            "<strong></strong></div>",
        )
        .join("") +
      '</div><p class="sim-feedback" id="cache-feedback" role="status"></p>';
    function choose(first) {
      document.querySelectorAll("[data-cache-step]").forEach((el, i) => {
        el.classList.toggle("invalid", i >= first);
        el.querySelector("strong").textContent =
          i >= first ? "Executar novamente" : "Reutilizar cache";
      });
      $("#cache-feedback").textContent =
        first === 4
          ? "Os resultados anteriores podem ser reutilizados."
          : first === 2
            ? "O código mudou; as dependências podem continuar no cache."
            : "Os arquivos de dependências mudaram; os passos dependentes precisam ser refeitos.";
    }
    document
      .querySelectorAll("[data-cache]")
      .forEach((b) => (b.onclick = () => choose(Number(b.dataset.cache))));
    choose(4);
  }
  function mountNetwork() {
    $("#network-widget").innerHTML =
      '<p class="simulation-tag">Simulação da configuração deste projeto. Não testa conexões reais.</p><div class="network-layout"><div class="network-inputs"><label class="sim-label" for="network-origin">Quem faz a chamada?</label><select id="network-origin"><option value="api">API Go no container</option><option value="browser">Navegador no host</option><option value="web">Nginx no container web</option></select><label class="sim-label" for="network-destination">Qual endereço?</label><select id="network-destination"><option value="db">db:5432</option><option value="localhost-db">localhost:5432</option><option value="api">api:8080</option><option value="localhost-web">localhost:8088</option></select><button class="sim-action" id="network-test">Testar caminho</button></div><div class="network-target"><span id="network-path"></span><small id="network-domain"></small></div></div><p class="sim-feedback" id="network-feedback" role="status"></p>';
    function test() {
      const origin = $("#network-origin").value,
        dest = $("#network-destination").value;
      let good = false,
        message = "";
      if (origin === "browser") {
        good = dest === "localhost-web";
        message = good
          ? "Entrada publicada encontrada. O frontend pode encaminhar /api para a rede interna."
          : dest === "db" || dest === "api"
            ? "O navegador não usa o DNS interno da rede Compose."
            : "Nenhuma porta de banco foi publicada no host neste projeto.";
      } else {
        good = dest === "db" || dest === "api";
        message = good
          ? "Nome de serviço resolvido na rede Compose; porta interna alcançável."
          : dest === "localhost-db"
            ? "localhost aponta para este container. Aqui não há PostgreSQL local."
            : "localhost aponta para este container, não para a porta publicada no host.";
      }
      $("#network-path").textContent =
        $("#network-origin").selectedOptions[0].textContent +
        " → " +
        $("#network-destination").selectedOptions[0].textContent;
      $("#network-domain").textContent =
        origin === "browser"
          ? "Origem: computador do aluno"
          : "Origem: rede do projeto Compose";
      $("#network-feedback").textContent =
        (good ? "Caminho disponível. " : "Caminho incorreto. ") + message;
      $("#network-feedback").classList.toggle("error", !good);
    }
    $("#network-test").onclick = test;
    $("#network-origin").onchange = test;
    $("#network-destination").onchange = test;
    test();
  }
  function mountCompose() {
    const fields = [
      [
        "services:",
        "Serviços",
        "Cada serviço descreve como executar uma responsabilidade da aplicação. Não é o nome de uma imagem.",
      ],
      [
        "  api:",
        "Serviço api",
        "O nome também pode ser resolvido por outros serviços na mesma rede.",
      ],
      [
        "    build: ./exemplos/mural/api",
        "Build",
        "Escolhe o contexto usado para construir a imagem. O Dockerfile fica nesse diretório.",
      ],
      [
        "    image: oficina/api:1.0.0",
        "Imagem",
        "Referência atribuída à imagem construída, ou usada para recuperar uma imagem existente.",
      ],
      [
        "    environment:",
        "Ambiente",
        "Variáveis entregues ao processo em runtime. São diferentes de argumentos de build.",
      ],
      [
        "      PGHOST: db",
        "Endereço do banco",
        "A API encontra o PostgreSQL pelo nome do serviço db, não por localhost.",
      ],
      [
        "    depends_on:",
        "Dependências",
        "Com condition: service_healthy, a criação respeita a prontidão verificada da dependência.",
      ],
      ["      db:", "Serviço dependente", "A API depende do serviço db."],
      [
        "        condition: service_healthy",
        "Prontidão",
        "O banco precisa possuir um healthcheck apropriado. A aplicação ainda trata falhas posteriores.",
      ],
      [
        "volumes:",
        "Volumes declarados",
        "A seção superior declara armazenamento administrado pelo Docker. A montagem no serviço liga origem e destino.",
      ],
      [
        "  dados-postgres:",
        "Volume nomeado",
        "Persiste além do container. No projeto, o serviço db o monta no diretório de dados do PostgreSQL 17.",
      ],
    ];
    $("#compose-widget").innerHTML =
      '<div class="compose-layout"><div class="compose-code">' +
      fields
        .map(
          (f, i) =>
            '<button class="yaml-field" data-field="' +
            i +
            '" aria-pressed="false">' +
            esc(f[0]) +
            "</button>",
        )
        .join("") +
      '</div><div class="yaml-explanation" id="yaml-explanation" aria-live="polite"></div></div><p class="code-hint">Trecho selecionado para explicar os campos. Consulte compose.app.yaml para executar.</p>';
    function select(i) {
      document
        .querySelectorAll("[data-field]")
        .forEach((b) =>
          b.setAttribute("aria-pressed", String(Number(b.dataset.field) === i)),
        );
      $("#yaml-explanation").innerHTML =
        "<strong>" + fields[i][1] + "</strong><p>" + fields[i][2] + "</p>";
    }
    document
      .querySelectorAll("[data-field]")
      .forEach((b) => (b.onclick = () => select(Number(b.dataset.field))));
    select(0);
  }
  let quizIndex = 0;
  let answers = read("quiz", []);
  if (!Array.isArray(answers)) answers = [];
  function mountQuiz() {
    const question = quiz[quizIndex],
      selected = answers[quizIndex],
      answered =
        Number.isInteger(selected) &&
        selected >= 0 &&
        selected < question.answers.length;
    const done = quiz.filter((_, i) => Number.isInteger(answers[i])).length;
    $("#quiz-widget").innerHTML =
      '<p class="quiz-meta">Questão ' +
      (quizIndex + 1) +
      " de " +
      quiz.length +
      " · " +
      done +
      ' respondida(s)</p><p class="quiz-question" tabindex="-1">' +
      esc(question.question) +
      '</p><div class="quiz-answers">' +
      question.answers
        .map(
          (a, i) =>
            '<button class="quiz-answer ' +
            (answered
              ? i === question.correct
                ? "correct"
                : i === selected
                  ? "wrong"
                  : ""
              : "") +
            '" data-answer="' +
            i +
            '" ' +
            (answered ? "disabled" : "") +
            ">" +
            esc(a) +
            "</button>",
        )
        .join("") +
      '</div><p class="quiz-feedback" role="status">' +
      (answered
        ? "<strong>" +
          (selected === question.correct ? "Correto. " : "Vamos rever. ") +
          "</strong>" +
          esc(question.explanation)
        : "Escolha uma resposta.") +
      '</p><div class="quiz-actions"><button class="sim-action" id="quiz-prev" ' +
      (quizIndex === 0 ? "disabled" : "") +
      '>Anterior</button><button class="sim-action" id="quiz-next">' +
      (quizIndex === quiz.length - 1 ? "Ver resultado" : "Próxima questão") +
      '</button><button class="text-button" id="quiz-reset">Refazer</button></div>';
    document.querySelectorAll("[data-answer]").forEach(
      (b) =>
        (b.onclick = () => {
          answers[quizIndex] = Number(b.dataset.answer);
          save("quiz", answers);
          mountQuiz();
        }),
    );
    $("#quiz-prev").onclick = () => {
      quizIndex--;
      mountQuiz();
    };
    $("#quiz-next").onclick = () => {
      if (quizIndex < quiz.length - 1) {
        quizIndex++;
        mountQuiz();
      } else {
        const score = quiz.filter((q, i) => answers[i] === q.correct).length;
        $("#quiz-widget").innerHTML =
          '<p class="quiz-meta">' +
          done +
          " de " +
          quiz.length +
          " respondidas</p><h2>" +
          score +
          " de " +
          quiz.length +
          ' acertos</h2><p class="lead">Use as explicações para revisar os conceitos.</p><button id="quiz-review" class="sim-action">Revisar as respostas</button>';
        $("#quiz-review").onclick = () => {
          quizIndex = 0;
          mountQuiz();
        };
      }
    };
    $("#quiz-reset").onclick = () => {
      answers = [];
      quizIndex = 0;
      save("quiz", answers);
      mountQuiz();
    };
  }
  function buildPrint() {
    const deck = document.createElement("div");
    deck.className = "print-deck";
    deck.innerHTML = slides
      .map(
        (s, i) =>
          '<section class="print-slide"><small>' +
          esc(s.chapter) +
          " · " +
          (i + 1) +
          " / " +
          slides.length +
          "</small><h1>" +
          esc(s.title) +
          "</h1><p>" +
          esc(s.lead) +
          "</p>" +
          (s.bullets
            ? "<ul>" +
              s.bullets.map((t) => "<li>" + esc(t) + "</li>").join("") +
              "</ul>"
            : "") +
          (s.code ? "<pre>" + esc(s.code) + "</pre>" : "") +
          (s.columns
            ? s.columns
                .map(
                  (c) =>
                    "<p><strong>" +
                    esc(c[0]) +
                    ":</strong> " +
                    esc(c.slice(1).join(" / ")) +
                    "</p>",
                )
                .join("")
            : "") +
          (s.terms
            ? s.terms
                .map(
                  (t) =>
                    "<p><strong>" +
                    esc(t[0]) +
                    ":</strong> " +
                    esc(t[1]) +
                    "</p>",
                )
                .join("")
            : "") +
          (s.rows
            ? "<p>" +
              s.rows.map((r) => esc(r.join(" — "))).join("<br>") +
              "</p>"
            : "") +
          (s.nodes ? "<p>" + esc(s.nodes.join(" → ")) + "</p>" : "") +
          (s.steps
            ? "<ol>" +
              s.steps.map((t) => "<li>" + esc(t) + "</li>").join("") +
              "</ol>"
            : "") +
          '<p class="print-notes">' +
          esc(s.notes) +
          '</p><a href="' +
          esc(s.source) +
          '">Fonte: ' +
          esc(s.source) +
          "</a></section>",
      )
      .join("");
    document.body.append(deck);
  }
  window.addEventListener("hashchange", fromHash);
  buildPrint();
  fromHash();
})();
