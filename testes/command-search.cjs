const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const context = { window: {} };
vm.createContext(context);
for (const name of ["docker-reference.js", "command-search.js"]) {
  vm.runInContext(
    fs.readFileSync(path.join(__dirname, "../apresentacao", name), "utf8"),
    context,
  );
}
const records = context.window.OFICINA_DOCKER_REFERENCE;
const search = (query, source = records) =>
  Array.from(context.window.OFICINA_COMMAND_SEARCH.search(source, query));
const commands = (query, source) =>
  search(query, source).map((record) => record.command);

test("todas as descrições têm tradução pt-BR e preservam a referência original", () => {
  const translations = JSON.parse(fs.readFileSync(path.join(__dirname, "../ferramentas/descricoes-cli.pt-BR.json"), "utf8"));
  for (const record of records) {
    assert.ok(record.descriptionOriginal, record.command);
    assert.equal(record.description, translations[record.descriptionOriginal], record.command);
    assert.notEqual(record.description, record.descriptionOriginal, record.command);
  }
  assert.equal(records.find((r) => r.command === "docker run").description, "Cria e inicia um container a partir de uma imagem.");
});

test("referência contém aliases usados na oficina e grupos da CLI completa", () => {
  const names = new Set(records.map((record) => record.command));
  for (const name of [
    "docker",
    "docker ps",
    "docker exec",
    "docker run",
    "docker build",
    "docker container ls",
    "docker image ls",
    "docker network create",
    "docker volume inspect",
    "docker buildx build",
    "docker compose logs",
    "docker service create",
    "docker stack deploy",
  ]) {
    assert.ok(names.has(name), name);
  }
  assert.equal(names.size, records.length, "sem duplicação de comandos");
  assert.ok(
    records.every(
      (record) =>
        !record.command.includes("--") && !/\s-\w/.test(record.command),
    ),
  );
  assert.ok(records.every((record) => record.help.includes("Usage:")));
});

test("nome exato e alias curto precedem subcomandos de grupos", () => {
  for (const [query, expected] of [
    ["ps", "docker ps"],
    ["docker ps", "docker ps"],
    ["exec", "docker exec"],
    ["compose logs", "docker compose logs"],
    ["docker container ls", "docker container ls"],
  ]) {
    assert.equal(commands(query)[0], expected, query);
  }
});

test("busca por comando não encontra palavras presentes apenas na descrição ou help", () => {
  const fixture = [
    {
      command: "docker ps",
      description: "List containers",
      help: "Usage: docker ps",
    },
    {
      command: "docker inspect",
      description: "Use ps first",
      help: "docker ps -a, compose logs",
    },
    { command: "docker logs", description: "docker exec", help: "Use ps" },
  ];
  assert.deepEqual(commands("ps", fixture), ["docker ps"]);
  assert.deepEqual(commands("compose logs", fixture), []);
  assert.deepEqual(commands("containers", fixture), []);
});

test("prefixos de tokens e sequências com vários subcomandos mantêm contexto", () => {
  assert.equal(commands("comp log")[0], "docker compose logs");
  assert.equal(commands("container ex")[0], "docker container exec");
  assert.ok(
    commands("compose bridge transformations").every((command) =>
      command.startsWith("docker compose bridge transformations"),
    ),
  );
  assert.ok(commands("logs").includes("docker compose logs"));
  assert.deepEqual(commands("compose inspect"), []);
});

test("flags são buscadas explicitamente sem virar variantes de comando", () => {
  const all = search("--all");
  assert.ok(all.length > 2);
  assert.ok(
    all.every((record) =>
      record.flags.some((flag) => flag.startsWith("--all")),
    ),
  );
  assert.equal(commands("ps -a")[0], "docker ps");
  assert.equal(commands("compose logs --tail")[0], "docker compose logs");
  assert.deepEqual(commands("compose logs --flag-inexistente"), []);
  assert.ok(search("-d").every((record) => record.flags.includes("-d")));
});

test("busca vazia ou docker começa pela raiz e comandos comuns, com resultado determinístico", () => {
  const empty = commands("");
  assert.deepEqual(empty.slice(0, 5), [
    "docker",
    "docker run",
    "docker ps",
    "docker exec",
    "docker pull",
  ]);
  assert.deepEqual(commands("docker"), empty);
  assert.deepEqual(commands("  DOCKER   PS  "), commands("ps"));
  assert.deepEqual(commands("logs", [...records].reverse()), commands("logs"));
});
