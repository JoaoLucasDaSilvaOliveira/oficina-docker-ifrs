const assert = require("node:assert/strict");
const { readFileSync } = require("node:fs");
const { resolve } = require("node:path");
const { runInNewContext } = require("node:vm");
const { test } = require("node:test");
const root = resolve(__dirname, "..");
const sandbox = { window: {} };
for (const file of [
  "compose-reference.js",
  "docker-reference.js",
  "flag-tooltips.js",
  "slides.js",
]) {
  runInNewContext(
    readFileSync(resolve(root, "apresentacao", file), "utf8"),
    sandbox,
  );
}
const { scan } = sandbox.window.OFICINA_FLAGS;
const description = (match) =>
  match.entries.map((entry) => entry.description).join(" ");

test("a mesma flag recebe explicações diferentes conforme o comando", () => {
  const cases = [
    [
      "apt-get install -y --no-install-recommends code",
      /Responde sim/,
      /apenas recomendados/,
    ],
    ["docker rm -f exemplo", /Força a parada/],
    ["docker logs -f exemplo", /Acompanha novas linhas/],
    ["docker build -f outro.Dockerfile .", /Escolhe o Dockerfile/],
    [
      "docker compose -f compose.app.yaml logs -f api",
      /Escolhe um arquivo Compose/,
      /Acompanha novas linhas/,
    ],
    [
      "docker compose bridge transformations create -f exemplo .",
      /transformação existente/,
    ],
    ["pg_isready -d oficina", /banco de dados/],
  ];
  for (const [command, ...expected] of cases) {
    const found = scan(command);
    assert.equal(found.length, expected.length, command);
    expected.forEach((pattern, index) =>
      assert.match(description(found[index]), pattern, command),
    );
  }
});

test("flags combinadas e comandos dentro do container mantêm seu contexto", () => {
  const exec = scan("docker exec -it exemplo sh -c 'ls -la /'");
  assert.equal(exec.length, 3);
  assert.equal(exec[0].entries.length, 2);
  assert.match(description(exec[0]), /stdin/);
  assert.match(description(exec[0]), /TTY/);
  assert.match(description(exec[1]), /próximo argumento/);
  assert.match(description(exec[2]), /listagem detalhada/);
  assert.match(description(exec[2]), /nomes iniciados por ponto/);
});

test("continuações de linha preservam contexto, offsets e argumentos de flags", () => {
  const command =
    "docker compose -f compose.app.yaml -f compose.hub.yaml \\\n  up -d --no-build --wait";
  const found = scan(command);
  assert.equal(found.length, 5);
  assert.match(description(found.at(-1)), /healthchecks/);
  for (const item of found)
    assert.equal(command.slice(item.start, item.end), item.flag);
  const copy = scan("COPY --from=build /out/api /api");
  assert.equal(copy.length, 1);
  assert.equal(copy[0].flag, "--from");
  assert.match(description(copy[0]), /outro estágio/);
});

test("todos os exemplos dos slides e todas as opções da referência Compose têm explicação", () => {
  for (const slide of sandbox.window.OFICINA_SLIDES) {
    const code =
      (slide.commands || []).map((command) => command.text).join("\n") ||
      slide.code ||
      "";
    const found = scan(code);
    for (const match of code.matchAll(
      /(?<![\w./:-])(--?[A-Za-z][\w-]*)(?![\w-])/g,
    )) {
      assert.ok(
        found.some((item) => item.start === match.index),
        slide.id + ": " + match[0],
      );
    }
  }
  let count = 0;
  for (const record of sandbox.window.OFICINA_COMPOSE_REFERENCE) {
    const context = record.title.replace(/\s+--help$/, "");
    for (const match of record.help.matchAll(
      /^[ \t]+(?:(-\w), )?(--[\w-]+)\b/gm,
    )) {
      for (const flag of [match[1], match[2]].filter(Boolean)) {
        const found = scan(flag, context);
        assert.equal(found.length, 1, context + ": " + flag);
        assert.equal(found[0].entries.length, 1, context + ": " + flag);
        assert.ok(found[0].entries[0].description.length > 15);
        count++;
      }
    }
  }
  assert.ok(
    count > 250,
    "Inclui os aliases curtos e longos de todas as páginas de ajuda.",
  );
});

test("substituições do shell não confundem flags do host e do Docker", () => {
  const found = scan(
    'docker run --user "$(id -u):$(id -g)" --mount type=bind,src=/tmp,dst=/dados --shm-size=256m imagem',
  );
  assert.equal(found.length, 5);
  assert.equal(found[1].entries[0].context, "id");
  assert.equal(found[2].entries[0].context, "id");
  assert.equal(found[3].entries[0].context, "docker run");
  assert.match(description(found[4]), /memória compartilhada/);
});

test("nomes de arquivos, URLs e palavras com hífen não viram flags", () => {
  assert.equal(
    scan("alpine-os-release fs-lab compose.app.yaml https://example.com/--wait")
      .length,
    0,
  );
});

test("catálogo completo fornece flags e mantém contextos de Vite e Nginx", () => {
  for (const [command, expected] of [
    ["docker network create --scope local", /scope/i],
    [
      "docker context create --docker host=unix:///var/run/docker.sock",
      /docker/i,
    ],
    ["docker buildx history ls --local", /current repository/i],
    ["npm run dev -- --host 0.0.0.0", /servidor Vite/],
    ["nginx -v", /versão do Nginx/],
  ]) {
    const found = scan(command);
    assert.equal(found.length, 1, command);
    assert.match(description(found[0]), expected, command);
  }
});
