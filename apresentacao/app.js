(() => {
  "use strict";
  const slides = window.OFICINA_SLIDES;
  const $ = (selector) => document.querySelector(selector);
  const esc = (value) =>
    String(value ?? "").replace(
      /[&<>"']/g,
      (c) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[c],
    );
  const normalize = (value) =>
    String(value || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  const chapters = [...new Set(slides.map((s) => s.chapter))];
  let index = 0,
    toastTimer,
    dialogOpener;
  const terminalIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><rect x="2" y="3" width="20" height="18" rx="2"/><path d="m6 8 4 4-4 4m7 0h5"/></svg>';
  const fileIcon =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M5 3h9l5 5v13H5zm9 0v5h5M8 13h8M8 17h6"/></svg>';
  const downloads = {
    "go-source": {
      file: "main.go",
      name: "main.go",
      detail: "Programa de soma · um único arquivo Go",
      destination: "Salve em $HOME/oficina-docker/go-soma/main.go.",
    },
    "go-project": {
      file: "go-receitas.zip",
      name: "Construir a imagem da soma",
      detail:
        "Use no capítulo Construção de imagens. Contém dois Dockerfiles e .dockerignore; não inclui nem substitui main.go.",
      destination:
        "Extraia em $HOME/oficina-docker, junto do main.go já editado.",
    },
    "go-complete": {
      file: "go-soma.zip",
      name: "Recuperar o exemplo Go completo (opcional)",
      detail:
        "Use se precisar recomeçar. Contém main.go original, dois Dockerfiles e .dockerignore. Pode substituir suas edições.",
      destination: "Use uma pasta separada se quiser preservar suas edições.",
    },
    vue: {
      file: "vue-vite.zip",
      name: "Frontend: projeto Vue + Vite",
      detail: "Use no capítulo Frontend. Código da tela padrão, package.json, lockfile, Dockerfile e configuração do Nginx.",
      destination: "Extraia em $HOME/oficina-docker. Use a pasta vue-vite.",
    },
    "compose-ide": {
      file: "compose-ide.zip",
      name: "Iniciar a IDE com Compose",
      detail: "Use no capítulo Compose. Três arquivos YAML: IDE em X11, acesso à pasta pessoal e alternativa Wayland. Usam a imagem pronta do VS Code.",
      destination: "Extraia em $HOME/oficina-docker.",
    },
    "compose-mural": {
      file: "compose-mural.zip",
      name: "Iniciar o mural com Compose",
      detail: "Use no capítulo Compose. Três arquivos YAML para frontend, API e PostgreSQL, redes e imagem do colega. Sem código-fonte: usam imagens prontas.",
      destination:
        "Extraia em $HOME/oficina-docker. Os YAMLs ficam nessa pasta.",
    },
    receitas: {
      file: "receitas-dockerfile.zip",
      name: "Entender como a imagem da IDE foi construída",
      detail: "Use na leitura do Dockerfile da IDE, em Construção de imagens. Contém o Dockerfile do VS Code para consulta; não é necessário para abrir a IDE pronta.",
      destination: "Extraia em $HOME/oficina-docker.",
    },
  };
  function code(text, label = "Terminal", context = "") {
    return `<div class="code-block" data-flag-context="${esc(context)}"><div class="code-header"><span>${esc(label)}</span><button type="button" class="copy-button">Copiar</button></div><pre><code>${esc(text)}</code></pre></div>`;
  }
  function toast(text) {
    $("#toast").textContent = text;
    $("#toast").classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(
      () => $("#toast").classList.remove("visible"),
      2200,
    );
  }
  async function copy(text) {
    try {
      if (navigator.clipboard && window.isSecureContext)
        await navigator.clipboard.writeText(text);
      else {
        const field = document.createElement("textarea");
        field.value = text;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.append(field);
        field.select();
        const ok = document.execCommand("copy");
        field.remove();
        if (!ok) throw Error("copy");
      }
      toast("Copiado.");
    } catch {
      toast("Selecione o texto para copiar.");
    }
  }
  const exerciseHref = (s) =>
    `../docs/exercicios/${encodeURIComponent(s.id)}.html`;
  const guideHref = (value) => {
    const [id, anchor] = String(value).split("#");
    return `../docs/${id}.html${anchor ? "#" + anchor : ""}`;
  };
  function sidebar() {
    $("#chapter-count").textContent = chapters.length;
    $("#chapters").innerHTML = chapters
      .map((chapter, i) => {
        const active = slides[index].chapter === chapter;
        return `<button class="chapter-button${active ? " active" : ""}" data-goto="${slides.findIndex((s) => s.chapter === chapter)}"${active ? ' aria-current="true"' : ""}><span class="chapter-number">${String(i + 1).padStart(2, "0")}</span><span>${esc(chapter)}</span></button>${active ? `<div class="chapter-slides">${slides.map((s, j) => (s.chapter === chapter ? `<button class="chapter-slide" data-goto="${j}"${j === index ? ' aria-current="page"' : ""}>${esc(s.title)}</button>` : "")).join("")}</div>` : ""}`;
      })
      .join("");
  }
  function visual(s) {
    if (s.type === "quiz")
      return '<div class="quiz-panel" id="quiz-panel"></div>';
    if (s.visual?.kind === "output" && s.visual.label === "Vue + Vite")
      return '<img class="vue-preview" src="assets/vue-vite.png" width="1200" height="850" alt="Tela inicial original Vue com Vite, com o contador e os links do template.">';
    return window.OFICINA_DIAGRAMS.render(s.visual);
  }
  function render() {
    window.OFICINA_FLAGS.hide();
    const s = slides[index];
    $("#slide").className = "slide" + (s.type === "hero" ? " hero" : "");
    $("#slide").dataset.slideId = s.id;
    $("#slide").innerHTML =
      `<div class="slide-heading"><h1>${esc(s.title)}</h1>${s.lead ? `<p class="lead">${esc(s.lead)}</p>` : ""}${s.body ? `<p class="slide-body">${esc(s.body)}</p>` : ""}</div><div class="visual-area">${visual(s)}</div><div class="slide-actions">${s.commands?.length ? `<button class="exercise-button" id="slide-commands-button" aria-haspopup="dialog" aria-controls="exercise-dialog">${terminalIcon}<span>Ver comandos</span></button>` : ""}${s.downloads?.length ? `<button class="stage-file-button" id="slide-files-button" aria-haspopup="dialog" aria-controls="resources-dialog">${fileIcon}<span>Arquivos do exercício</span></button>` : ""}</div>`;
    $("#breadcrumb").textContent = s.chapter;
    $("#page-count").textContent =
      `${String(index + 1).padStart(2, "0")} / ${slides.length}`;
    $("#progress").style.width = `${((index + 1) / slides.length) * 100}%`;
    $("#previous").disabled = index === 0;
    $("#next").disabled = index === slides.length - 1;
    document.title = `${s.title} · Oficina Docker`;
    sidebar();
    setSidebar(false, false);
    if (s.type === "quiz") mountQuiz();
    if ($("#slide-commands-button"))
      $("#slide-commands-button").onclick = openExercise;
    if ($("#slide-files-button"))
      $("#slide-files-button").onclick = () => openMaterials(true);
  }
  function navigate(next, focus = false) {
    const bounded = Math.max(0, Math.min(slides.length - 1, next));
    if (bounded === index) return;
    index = bounded;
    history.pushState(null, "", `#/${slides[index].id}`);
    render();
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
  function openDialog(selector) {
    window.OFICINA_FLAGS.hide();
    dialogOpener = document.activeElement;
    const dialog = $(selector);
    dialog.showModal();
    dialog.querySelector(".close-dialog").focus({ preventScroll: true });
  }
  function openExercise() {
    const s = slides[index];
    if (!s.commands?.length) return;
    $("#exercise-title").textContent = s.title;
    $("#exercise-content").innerHTML =
      `<p class="flag-hint">Passe o mouse ou use Tab nas flags sublinhadas para consultar o significado.</p>${s.commands.map((c) => `${c.context ? `<p class="exercise-context">${esc(c.context)}</p>` : ""}${code(c.text, c.label)}`).join("")}<a class="guide-link" href="${exerciseHref(s)}" target="_blank" rel="noopener">Passo a passo deste exercício ↗</a>`;
    openDialog("#exercise-dialog");
    window.OFICINA_FLAGS.annotate($("#exercise-content"));
  }
  function openReferences(notes = false) {
    const s = slides[index];
    $("#reference-title").textContent = notes
      ? "Notas do instrutor"
      : "Referências";
    $("#reference-content").innerHTML = notes
      ? `<p class="speaker-notes">${esc(s.notes || "")}</p>`
      : `<p>${esc(s.title)}</p>${s.commands?.length ? `<p><a href="${exerciseHref(s)}" target="_blank" rel="noopener">Passo a passo deste exercício ↗</a></p>` : ""}${s.guide ? `<p><a href="${guideHref(s.guide)}" target="_blank" rel="noopener">Guia de estudo</a></p>` : ""}${s.source ? `<p><a href="${esc(s.source)}" target="_blank" rel="noopener">Documentação da fonte ↗</a></p>` : ""}`;
    openDialog("#reference-dialog");
  }
  function downloadRow(id) {
    const d = downloads[id];
    if (!d) return "";
    return `<div class="resource-item"><div><strong>${esc(d.name)}</strong><small>${esc(d.detail)}</small><small>${esc(d.destination)}</small></div><a href="../downloads/${esc(d.file)}" download>Baixar ${d.file.endsWith(".zip") ? "ZIP" : "arquivo"}</a></div>`;
  }
  function renderMaterials(query = "", currentOnly = false) {
    const q = normalize(query);
    const s = slides[index];
    let html = "";
    if (!q && (s.downloads?.length || s.commands?.length))
      html += `<section class="resource-group"><h3>Neste exercício</h3>${(s.downloads || []).map(downloadRow).join("")}${s.commands?.length ? `<a class="guide-link" href="${exerciseHref(s)}" target="_blank" rel="noopener">${esc(s.title)}: passo a passo ↗</a>` : ""}</section>`;
    if (currentOnly) {
      html +=
        '<button class="text-button" id="all-materials-button">Ver todos os materiais</button>';
    } else {
      const files = Object.keys(downloads).filter(
        (id) =>
          !q ||
          normalize(
            `${downloads[id].name} ${downloads[id].file} ${downloads[id].detail}`,
          ).includes(q),
      );
      if (files.length)
        html += `<section class="resource-group"><h3>Arquivos</h3>${files.map(downloadRow).join("")}</section>`;
      const exercises = slides.filter(
        (s) =>
          s.commands?.length &&
          (!q || normalize(`${s.title} ${s.chapter}`).includes(q)),
      );
      if (exercises.length)
        html += `<section class="resource-group"><h3>Exercícios</h3>${chapters
          .map((ch) => {
            const items = exercises.filter((s) => s.chapter === ch);
            return items.length
              ? `<details${q || ch === s.chapter ? " open" : ""}><summary>${esc(ch)}</summary><div class="resource-exercises">${items.map((s) => `<a href="${exerciseHref(s)}" target="_blank" rel="noopener">${esc(s.title)} ↗</a>`).join("")}</div></details>`
              : "";
          })
          .join("")}</section>`;
      const guides = (window.OFICINA_GUIDE_INDEX || []).filter(
        (g) =>
          !q ||
          normalize(
            `${g.title} ${g.sections.map((s) => s.title).join(" ")}`,
          ).includes(q),
      );
      if (guides.length)
        html += `<section class="resource-group"><h3>Guias de estudo</h3>${guides
          .map(
            (g) =>
              `<details><summary>${esc(g.title)}</summary><div class="resource-exercises">${g.sections
                .filter(
                  (section) =>
                    !q || normalize(`${g.title} ${section.title}`).includes(q),
                )
                .map(
                  (section) =>
                    `<a href="${esc(g.href)}#${esc(section.id)}" target="_blank" rel="noopener">${esc(section.title)} ↗</a>`,
                )
                .join("")}</div></details>`,
          )
          .join("")}</section>`;
    }
    $("#guide-list").innerHTML =
      html ||
      '<p class="resource-empty">Nenhum exercício ou arquivo encontrado.</p>';
    if ($("#all-materials-button"))
      $("#all-materials-button").onclick = () => renderMaterials("");
  }
  function openMaterials(currentOnly = false) {
    $("#material-search").value = "";
    renderMaterials("", currentOnly);
    openDialog("#resources-dialog");
  }
  $("#material-search").addEventListener("input", (e) =>
    renderMaterials(e.target.value),
  );
  function records() {
    return window.OFICINA_DOCKER_REFERENCE || [];
  }
  let currentResults = [];
  function renderCommands(query = "") {
    window.OFICINA_FLAGS.hide();
    currentResults = window.OFICINA_COMMAND_SEARCH.search(records(), query);
    const versions = window.OFICINA_DOCKER_REFERENCE_INFO?.versions || {};
    const versionLabel = Object.entries(versions)
      .map(
        ([name, value]) =>
          `${name === "docker" ? "Docker" : name === "compose" ? "Compose" : "Buildx"} ${String(value).match(/\d+\.\d+\.\d+/)?.[0] || ""}`,
      )
      .join(" · ");
    $("#catalog-version").textContent =
      `${records().length} comandos e subcomandos · ${versionLabel || "CLI registrada"}`;
    $("#command-results").innerHTML = currentResults.length
      ? currentResults
          .map(
            (r, i) =>
              `<details class="command-item" data-command-result="${i}"><summary>${esc(r.command)}</summary><div class="command-content"></div></details>`,
          )
          .join("")
      : '<p class="resource-empty">Nenhum comando encontrado. Tente o nome do comando ou uma flag.</p>';
    $("#command-results")
      .querySelectorAll(".command-item")
      .forEach((item) =>
        item.addEventListener("toggle", () => {
          const content = item.querySelector(".command-content");
          if (!item.open || content.dataset.loaded) return;
          const r = currentResults[Number(item.dataset.commandResult)];
          content.dataset.loaded = "true";
          content.innerHTML = `<p class="command-description">${esc(r.description)}</p>${code(r.command, "Comando", r.command)}<details class="official-help"><summary>Opções e referência de ${esc(r.command)}</summary><p>Complemento deste comando: saída original de <code>--help</code>, em inglês.</p>${code(r.help, "Ajuda original da CLI · inglês", r.command)}</details>`;
          window.OFICINA_FLAGS.annotate(content, r.command);
        }),
      );
  }
  $("#commands-button").onclick = () => {
    renderCommands("");
    $("#command-search").value = "";
    openDialog("#commands-dialog");
    $("#command-search").focus();
  };
  $("#command-search").addEventListener("input", (e) =>
    renderCommands(e.target.value),
  );
  $("#resources-button").onclick = () => openMaterials();
  $(".skip-link").onclick = (event) => {
    event.preventDefault();
    $("#slide").focus({ preventScroll: true });
  };
  $("#reference-button").onclick = () => openReferences();
  $("#previous").onclick = () => navigate(index - 1, true);
  $("#next").onclick = () => navigate(index + 1, true);
  document.addEventListener("click", (event) => {
    const copier = event.target.closest(".copy-button");
    if (copier)
      copy(copier.closest(".code-block").querySelector("code").textContent);
    const goto = event.target.closest("[data-goto]");
    if (goto) navigate(Number(goto.dataset.goto), true);
  });
  document
    .querySelectorAll(".close-dialog")
    .forEach(
      (button) => (button.onclick = () => button.closest("dialog").close()),
    );
  document.querySelectorAll("dialog").forEach((dialog) => {
    dialog.addEventListener("close", () => {
      window.OFICINA_FLAGS.hide();
      if (dialogOpener?.isConnected)
        dialogOpener.focus({ preventScroll: true });
    });
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) {
        const r = dialog.getBoundingClientRect();
        if (
          event.clientX < r.left ||
          event.clientX > r.right ||
          event.clientY < r.top ||
          event.clientY > r.bottom
        )
          dialog.close();
      }
    });
  });
  function setSidebar(open, returnFocus = true) {
    document.body.classList.toggle("sidebar-open", open);
    $("#menu-toggle").setAttribute("aria-expanded", String(open));
    $("#sidebar-scrim").hidden = !open;
    $("#sidebar").inert =
      window.matchMedia("(max-width:800px)").matches && !open;
    if (open) $('#sidebar [aria-current="page"]')?.focus();
    else if (returnFocus) $("#menu-toggle").focus({ preventScroll: true });
  }
  $("#menu-toggle").onclick = () =>
    setSidebar(!document.body.classList.contains("sidebar-open"));
  $("#sidebar-scrim").onclick = () => setSidebar(false);
  window
    .matchMedia("(max-width:800px)")
    .addEventListener("change", () => setSidebar(false, false));
  $("#presentation-button").onclick = async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await document.documentElement.requestFullscreen();
    } catch {
      toast("Use F11 para abrir em tela cheia.");
    }
  };
  document.addEventListener("fullscreenchange", () =>
    $("#presentation-button").setAttribute(
      "aria-label",
      document.fullscreenElement
        ? "Sair do modo de apresentação"
        : "Ativar modo de apresentação",
    ),
  );
  document.addEventListener("keydown", (event) => {
    if (event.defaultPrevented) return;
    const dialog = document.querySelector("dialog[open]");
    if (dialog) {
      if (event.key === "Escape") {
        event.preventDefault();
        dialog.close();
      }
      return;
    }
    if (document.body.classList.contains("sidebar-open")) {
      if (event.key === "Escape") {
        event.preventDefault();
        setSidebar(false);
      } else if (event.key === "Tab") {
        const buttons = [...$("#sidebar").querySelectorAll("button")];
        const first = buttons[0],
          last = buttons.at(-1);
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
      return;
    }
    if (
      event.altKey ||
      event.ctrlKey ||
      event.metaKey ||
      event.target.closest(
        'input,textarea,select,button,a,summary,[contenteditable="true"]',
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
    } else if (event.key === "/") {
      event.preventDefault();
      $("#commands-button").click();
    } else if (event.key.toLowerCase() === "c") openExercise();
    else if (event.key.toLowerCase() === "f") $("#presentation-button").click();
    else if (event.key.toLowerCase() === "n") openReferences(true);
  });
  function mountQuiz() {
    const questions = window.OFICINA_QUIZ;
    let q = 0;
    function show() {
      const item = questions[q];
      $("#quiz-panel").innerHTML =
        `<h2>${esc(item.question)}</h2><div class="quiz-options">${item.answers.map((a, i) => `<button class="quiz-option" data-answer="${i}">${esc(a)}</button>`).join("")}</div><p class="quiz-feedback" aria-live="polite"></p><button class="quiz-next">${q + 1 < questions.length ? "Próxima pergunta" : "Recomeçar perguntas"} →</button>`;
      $("#quiz-panel")
        .querySelectorAll("[data-answer]")
        .forEach(
          (button) =>
            (button.onclick = () => {
              const ok = Number(button.dataset.answer) === item.correct;
              button.dataset.state = ok ? "correct" : "wrong";
              $("#quiz-panel .quiz-feedback").textContent =
                (ok ? "Correto. " : "Tente novamente. ") + item.explanation;
            }),
        );
      $("#quiz-panel .quiz-next").onclick = () => {
        q = (q + 1) % questions.length;
        show();
      };
    }
    show();
  }
  window.addEventListener("popstate", fromHash);
  window.addEventListener("hashchange", fromHash);
  fromHash();
})();
