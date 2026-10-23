(() => {
  "use strict";
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
  const svg = (content) =>
    `<svg viewBox="0 0 1000 360" aria-hidden="true" focusable="false"><defs><marker id="arrowhead" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1 9 5 1 9" fill="none" stroke="#526a7b" stroke-width="1.5"/></marker></defs>${content}</svg>`;
  function wrap(text, width) {
    const words = String(text ?? "").split(/\s+/);
    const rows = [];
    let row = "";
    for (const word of words) {
      if (row && (row + " " + word).length > width) {
        rows.push(row);
        row = word;
      } else row += (row ? " " : "") + word;
    }
    if (row) rows.push(row);
    return rows;
  }
  function lines(text, x, y, size = 22, fill = "#526a7b", width = 28) {
    const rows = wrap(text, width);
    return `<text x="${x}" y="${y}" text-anchor="middle" fill="${fill}" font-size="${size}">${rows.map((r, i) => `<tspan x="${x}" dy="${i ? size * 1.3 : 0}">${esc(r)}</tspan>`).join("")}</text>`;
  }
  const mobileNodes = (nodes) =>
    `<div class="diagram-mobile" aria-hidden="true">${nodes.map((n, i) => `<div class="mobile-node"><small>${String(i + 1).padStart(2, "0")}</small><strong>${esc(n.title)}</strong><span>${esc(n.detail || "")}</span></div>`).join("")}</div>`;
  function frame(visual, label, mobile = "") {
    return `<div class="diagram" role="img" aria-label="${esc(label)}">${visual}${mobile}</div>`;
  }
  function glyph(title, x) {
    const name = title.toLowerCase();
    let path;
    if (/navegador|tela|frontend|web/.test(name)) {
      path = `M${x - 27} 112h54v35h-54zM${x} 147v13m-18 0h36`;
    } else if (/imagem|registry|hub|camada/.test(name)) {
      path = `M${x} 108l29 16-29 16-29-16zM${x - 29} 135l29 16 29-16M${x - 29} 146l29 16 29-16`;
    } else if (/container|processo|fs-lab|nginx|api|banco/.test(name)) {
      path = `M${x - 21} 113h42v42h-42zM${x - 10} 104v9m20-9v9m-20 42v9m20-9v9M${x - 30} 123h9m-9 20h9m42-20h9m-9 20h9`;
    } else if (
      /terminal|docker|npm|build|exec|inspect|logs|stats|diff|run|compil/.test(
        name,
      )
    ) {
      path = `M${x - 28} 111h56v46h-56zM${x - 17} 123l10 10-10 10m20 0h13`;
    } else {
      path = `M${x - 21} 109H${x + 11}L${x + 23} 121V158H${x - 21}ZM${x + 11} 109V121H${x + 23}M${x - 11} 135H${x + 12}M${x - 11} 145H${x + 5}`;
    }
    return `<path d="${path}" stroke="#175fe6" stroke-width="2" fill="none"/>`;
  }
  function flow(v) {
    const nodes = v.nodes || [];
    const gap = 1000 / nodes.length;
    let parts = "";
    nodes.forEach((n, i) => {
      const x = gap * (i + 0.5);
      if (i < nodes.length - 1)
        parts += `<path d="M${x + 67} 135H${x + gap - 67}" stroke="#9ab0c5" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>`;
      parts += `<rect x="${x - 48}" y="86" width="96" height="96" rx="6" fill="${i === nodes.length - 1 ? "#e0ecff" : "#fff"}" stroke="#175fe6" stroke-width="2"/>`;
      parts += glyph(n.title, x);
      parts += lines(
        n.title,
        x,
        223,
        26,
        "#102b43",
        nodes.length > 3 ? 17 : 24,
      );
      parts += lines(
        n.detail,
        x,
        294,
        20,
        "#526a7b",
        nodes.length > 3 ? 22 : 31,
      );
    });
    return frame(
      svg(parts),
      nodes.map((n) => `${n.title}: ${n.detail || ""}`).join(" → "),
      mobileNodes(nodes),
    );
  }
  function compare(v) {
    return `<div class="compare-visual">${[v.left, v.right].map((n) => `<section class="compare-side"><h2>${esc(n?.title)}</h2>${(n?.lines || []).map((l) => `<p>${esc(l)}</p>`).join("")}</section>`).join("")}</div>`;
  }
  function filesystem(v) {
    return `<div class="filesystem-visual"><section class="file-tree"><h2>Computador</h2>${(v.host || []).map((l) => `<p>${esc(l)}</p>`).join("")}</section><div class="mount-bridge" aria-label="${v.mounted ? "Pasta conectada por bind mount" : "Sem conexão com os arquivos pessoais"}">${v.mounted ? "↔" : "×"}<small>${v.mounted ? "bind mount" : "sem mount"}</small></div><section class="file-tree"><h2>Container</h2>${(v.container || []).map((l) => `<p>${esc(l)}</p>`).join("")}</section></div>`;
  }
  function stages(v) {
    let parts = "";
    [v.left, v.right].forEach((n, i) => {
      const x = i ? 660 : 30;
      parts += `<rect x="${x}" y="30" width="310" height="300" rx="4" fill="${i ? "#e0ecff" : "#fff"}" stroke="#175fe6" stroke-width="2"/>`;
      parts += lines(n?.title, x + 155, 76, 27, "#102b43", 22);
      const headerBottom = 98 + (wrap(n?.title, 22).length - 1) * 27 * 1.3;
      parts += `<path d="M${x} ${headerBottom}H${x + 310}" stroke="#c3d5e9"/>`;
      let cursor = headerBottom + 36;
      for (const text of n?.lines || []) {
        parts += lines(text, x + 155, cursor, 21, "#526a7b", 27);
        cursor += wrap(text, 27).length * 21 * 1.3 + 14;
      }
    });
    parts +=
      '<path d="M357 160H640" stroke="#175fe6" stroke-width="2.5" marker-end="url(#arrowhead)"/>';
    parts += lines(
      v.artifact || "Artefato gerado",
      500,
      124,
      21,
      "#175fe6",
      23,
    );
    const ns = [
      { title: v.left?.title, detail: (v.left?.lines || []).join(" · ") },
      { title: v.right?.title, detail: (v.right?.lines || []).join(" · ") },
    ];
    return frame(
      svg(parts),
      `${ns[0].title}: ${ns[0].detail}. ${v.artifact || "Cópia do artefato"}. ${ns[1].title}: ${ns[1].detail}`,
      mobileNodes(ns),
    );
  }
  function imageName(v) {
    const value = v.value || "joaolsodocker/oficina-go:1.0.0";
    const colon = value.lastIndexOf(":");
    const tag = colon >= 0 ? value.slice(colon + 1) : "latest";
    const rest = colon >= 0 ? value.slice(0, colon) : value;
    const slash = rest.lastIndexOf("/");
    const user = slash >= 0 ? rest.slice(0, slash) : null;
    const name = slash >= 0 ? rest.slice(slash + 1) : rest;
    return `<div class="image-reference">${user ? `<div class="reference-part">${esc(user)}/<small>namespace</small></div>` : ""}<div class="reference-part name">${esc(name)}<small>repositório</small></div><div class="reference-part tag">:${esc(tag)}<small>tag da imagem</small></div></div>`;
  }
  function network() {
    const nodes = [
      { title: "Navegador", detail: "localhost:8088" },
      { title: "web", detail: "Nginx · porta 80" },
      { title: "api", detail: "Go · porta 8080" },
      { title: "db", detail: "PostgreSQL · 5432" },
    ];
    let parts = "";
    parts +=
      '<rect x="270" y="37" width="710" height="274" rx="6" fill="#e5eefb" stroke="#a9bed8" stroke-dasharray="6 6"/><text x="625" y="68" text-anchor="middle" fill="#526a7b" font-size="19">Rede do Compose · nomes resolvidos pelo Docker</text>';
    nodes.forEach((n, i) => {
      const x = 125 + i * 250;
      parts += `<rect x="${x - 90}" y="111" width="180" height="94" rx="4" fill="white" stroke="#175fe6" stroke-width="2"/>`;
      parts += lines(n.title, x, 165, 29, "#102b43");
      parts += lines(n.detail, x, 248, 20, "#526a7b", 22);
      if (i < 3)
        parts += `<path d="M${x + 94} 158H${x + 150}" stroke="#526a7b" stroke-width="2" marker-end="url(#arrowhead)"/>`;
    });
    return frame(
      svg(parts),
      "Navegador acessa web pela porta publicada. web encaminha /api para api:8080. A API acessa db:5432 na rede Docker.",
      mobileNodes(nodes),
    );
  }
  function output(v) {
    return `<div class="output-visual"><p>${esc(v.label || "Resultado observado")}</p><pre>${(v.lines || []).map(esc).join("\n")}</pre></div>`;
  }
  function timeline(v) {
    const events = v.events || [];
    const step = 720 / Math.max(1, events.length - 1);
    let parts = '<path d="M140 140H860" stroke="#a6bcd4" stroke-width="2"/>';
    events.forEach((n, i) => {
      const x = 140 + i * step;
      parts += `<circle cx="${x}" cy="140" r="7" fill="#175fe6"/>`;
      parts += lines(n.year, x, 108, 31, "#175fe6");
      parts += lines(n.title, x, 197, 23, "#102b43", 20);
    });
    return frame(
      svg(parts),
      events.map((e) => `${e.year}: ${e.title}`).join(". "),
      mobileNodes(events.map((e) => ({ title: e.year, detail: e.title }))),
    );
  }
  function cycle(v) {
    const nodes = v.nodes || [];
    if (nodes.length < 4) return flow(v);
    const coords = [
      [200, 92],
      [800, 92],
      [800, 270],
      [200, 270],
    ];
    let parts = "";
    nodes.forEach((n, i) => {
      const [x, y] = coords[i] || [500, 180];
      parts += `<circle cx="${x}" cy="${y}" r="8" fill="#175fe6"/>`;
      parts += lines(n.title, x, y - 26, 28, "#102b43", 24);
      parts += lines(n.detail, x, y + 37, 21, "#526a7b", 24);
      if (i < nodes.length - 1) {
        const [nx, ny] = coords[i + 1];
        const direction = nx > x ? 1 : -1;
        const path =
          y === ny
            ? `M${x + 110 * direction} ${y}H${nx - 110 * direction}`
            : `M${x} ${y + 65}V${ny - 65}`;
        parts += `<path d="${path}" stroke="#a6bcd4" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>`;
      }
    });
    return frame(
      svg(parts),
      nodes.map((n) => `${n.title}: ${n.detail || ""}`).join(" → "),
      mobileNodes(nodes),
    );
  }
  function layers() {
    return `<div class="diagram" role="img" aria-label="Uma imagem somente leitura compartilhada fornece os arquivos para dois containers. Cada um tem sua própria camada gravável."><svg viewBox="0 0 900 490" aria-hidden="true" focusable="false"><image href="assets/imagem-containers.svg" width="900" height="490"/></svg>${mobileNodes(
      [
        { title: "Imagem", detail: "Arquivos compartilhados, somente leitura" },
        {
          title: "Container A",
          detail: "Sua camada gravável contém recado.txt",
        },
        {
          title: "Container B",
          detail: "Outra camada gravável, sem o recado de A",
        },
      ],
    )}</div>`;
  }
  const renderers = {
    flow,
    compare,
    filesystem,
    stages,
    "image-name": imageName,
    network,
    output,
    timeline,
    cycle,
    layers,
  };
  window.OFICINA_DIAGRAMS = {
    render: (v) => (renderers[v?.kind] || flow)(v || { nodes: [] }),
  };
})();
