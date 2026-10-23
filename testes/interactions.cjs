"use strict";

// Ações reais na apresentação servida; não modifica a interface nem executa Docker.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const { execFileSync } = require("node:child_process");
const { chromium } = require(process.env.PLAYWRIGHT_MODULE ||
  "/home/dev_jao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright");

const base = (process.env.OFICINA_URL || "http://127.0.0.1:8081").replace(/\/$/, "");
const start = /\/apresentacao$/.test(base) ? base + "/" : base + "/apresentacao/";
const origin = new URL(start).origin;
const reportFile = path.resolve(process.env.INTERACTIONS_REPORT || ".test-results/interactions.json");

(async () => {
  const browser = await chromium.launch({
    executablePath: "/usr/bin/google-chrome-stable", headless: true,
    args: ["--no-sandbox"],
  });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    permissions: ["clipboard-read", "clipboard-write"], acceptDownloads: true,
  });
  const page = await context.newPage();
  page.setDefaultTimeout(7000);
  const report = { url: start, passed: [], failed: [], pageerrors: [], badResponses: [], counts: {} };
  context.on("page", (p) => {
    p.on("pageerror", (e) => report.pageerrors.push(e.message));
    p.on("response", (r) => {
      if (r.status() >= 400 && r.url().startsWith(origin)) report.badResponses.push({ status: r.status(), url: r.url() });
    });
  });
  page.on("pageerror", (e) => report.pageerrors.push(e.message));
  page.on("response", (r) => {
    if (r.status() >= 400 && r.url().startsWith(origin)) report.badResponses.push({ status: r.status(), url: r.url() });
  });
  async function check(name, fn) {
    if (process.env.INTERACTIONS_ONLY && !name.includes(process.env.INTERACTIONS_ONLY)) return;
    try { await fn(); report.passed.push(name); console.log("PASS", name); }
    catch (e) { report.failed.push({ name, error: e.message }); console.log("FAIL", name, e.message.split("\n")[0]); }
  }
  let visit = 0;
  async function go(id) {
    await page.goto(start + "?qa=" + ++visit + "#/" + id, { waitUntil: "networkidle" });
    await page.locator(`#slide[data-slide-id="${id}"]`).waitFor();
  }
  async function closeDialog(selector, opener, byEscape = false) {
    if (byEscape) await page.keyboard.press("Escape");
    else await page.locator(selector + " .close-dialog").click();
    await page.waitForFunction((selector) => !document.querySelector(selector).open, selector);
    if (opener) assert.equal(await page.evaluate(() => document.activeElement.id), opener);
  }
  await page.goto(start, { waitUntil: "networkidle" });
  const slides = await page.evaluate(() => window.OFICINA_SLIDES);
  const slideWithCommands = slides.find((slide) => slide.id === "primeiro-container");

  await check("todos os comandos de exercícios são copiados fielmente", async () => {
    let blocks = 0, exercises = 0;
    for (const slide of slides.filter((slide) => slide.commands?.length)) {
      await go(slide.id);
      await page.locator("#slide-commands-button").click();
      assert.equal(await page.locator("#exercise-title").textContent(), slide.title);
      const code = page.locator("#exercise-content .code-block");
      assert.equal(await code.count(), slide.commands.length);
      for (let i = 0; i < slide.commands.length; i++) {
        assert.equal(await code.nth(i).locator("code").textContent(), slide.commands[i].text);
        await code.nth(i).locator(".copy-button").click();
        assert.equal(await page.evaluate(() => navigator.clipboard.readText()), slide.commands[i].text, slide.id);
        blocks++;
      }
      await closeDialog("#exercise-dialog", "slide-commands-button");
      await page.locator("#slide-commands-button").click();
      await closeDialog("#exercise-dialog", "slide-commands-button", true);
      exercises++;
    }
    report.counts.copiedExerciseBlocks = blocks;
    report.counts.exerciseDialogs = exercises;
  });

  await check("flags hover, foco, Escape e popup dentro da viewport", async () => {
    await go(slideWithCommands.id);
    await page.locator("#slide-commands-button").click();
    const flag = page.locator("#exercise-dialog .flag-token").filter({ hasText: /^-d$/ }).first();
    await flag.hover();
    await page.locator("#flag-tooltip:not([hidden])").waitFor();
    assert.match(await page.locator("#flag-tooltip").textContent(), /segundo plano/);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#flag-tooltip").isVisible(), false);
    assert.equal(await page.locator("#exercise-dialog").evaluate((d) => d.open), true);
    await flag.focus();
    await page.locator("#flag-tooltip:not([hidden])").waitFor();
    assert.equal(await flag.getAttribute("aria-expanded"), "true");
    await page.keyboard.press("Escape");
    await closeDialog("#exercise-dialog", "slide-commands-button", true);
    for (const viewport of [{ width: 1440, height: 900 }, { width: 375, height: 664 }]) {
      await page.setViewportSize(viewport);
      await go("ide-bind");
      await page.locator("#slide-commands-button").click();
      const last = page.locator("#exercise-dialog .flag-token").last();
      await last.scrollIntoViewIfNeeded();
      await last.focus();
      await page.locator("#flag-tooltip:not([hidden])").waitFor();
      const box = await page.locator("#flag-tooltip").boundingBox();
      assert.ok(box.x >= 10 && box.y >= 10 && box.x + box.width <= viewport.width - 10 && box.y + box.height <= viewport.height - 10, JSON.stringify({ viewport, box }));
      await page.keyboard.press("Escape");
      await closeDialog("#exercise-dialog", "slide-commands-button", true);
    }
    await page.setViewportSize({ width: 1440, height: 900 });
  });

  await check("catálogo307, buscas reais e cópia de comando e ajuda", async () => {
    await go("inicio");
    await page.locator("#commands-button").click();
    const total = await page.evaluate(() => window.OFICINA_DOCKER_REFERENCE.length);
    assert.equal(await page.locator("#command-results > .command-item").count(), total);
    assert.ok(total >= 307);
    report.counts.catalogEntries = total;
    for (const [query, expected] of [["ps", "docker ps"], ["docker ps", "docker ps"], ["exec", "docker exec"], ["compose logs", "docker compose logs"], ["container ex", "docker container exec"], ["buildx history ls", "docker buildx history ls"], ["--tail", null], ["", "docker"], ["docker", "docker"]]) {
      await page.locator("#command-search").fill(query);
      const items = page.locator("#command-results > .command-item");
      assert.ok(await items.count() > 0, query);
      const heading = await items.first().locator(":scope > summary").textContent();
      if (expected) assert.equal(heading, expected, query);
      if (query === "--tail") {
        const names = await items.locator(":scope > summary").allTextContents();
        const valid = await page.evaluate((names) => names.every((name) => window.OFICINA_DOCKER_REFERENCE.find((r) => r.command === name).flags.includes("--tail")), names);
        assert.ok(valid);
      }
      await items.first().locator(":scope > summary").click();
      await items.first().locator(".command-content[data-loaded]").waitFor();
      const commandBlock = items.first().locator(".command-content > .code-block");
      await commandBlock.locator(".copy-button").click();
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), heading);
      await items.first().locator(".official-help > summary").click();
      const help = items.first().locator(".official-help pre code");
      const expectedHelp = await page.evaluate((command) => window.OFICINA_DOCKER_REFERENCE.find((r) => r.command === command).help, heading);
      assert.equal(await help.textContent(), expectedHelp);
      await items.first().locator(".official-help .copy-button").click();
      assert.equal(await page.evaluate(() => navigator.clipboard.readText()), expectedHelp);
    }
    await page.locator("#command-search").fill("comando-inexistente-xxx");
    assert.equal(await page.locator("#command-results .command-item").count(), 0);
    await closeDialog("#commands-dialog", "commands-button", true);
    await page.locator("#commands-button").click();
    assert.equal(await page.locator("#command-search").inputValue(), "");
    await closeDialog("#commands-dialog", "commands-button");
  });

  await check("arquivos baixam de verdade e guias abrem a seção correta", async () => {
    await go("dockerfile-basico");
    await page.locator("#slide-files-button").click();
    const recipes = page.locator('#guide-list a[download][href$="go-receitas.zip"]');
    await recipes.waitFor();
    const [download] = await Promise.all([page.waitForEvent("download"), recipes.click()]);
    assert.equal(download.suggestedFilename(), "go-receitas.zip");
    const downloadPath = await download.path();
    // Compare extracted content: different zlib versions can produce different
    // compressed bytes for the same valid ZIP generated inside the Docker build.
    const entries = (file) => JSON.parse(execFileSync("python", ["-c", "import hashlib,json,sys,zipfile; z=zipfile.ZipFile(sys.argv[1]); print(json.dumps({n:hashlib.sha256(z.read(n)).hexdigest() for n in z.namelist()}))", file], { encoding: "utf8" }));
    assert.deepEqual(entries(downloadPath), entries(path.join(__dirname, "../downloads/go-receitas.zip")));
    const exercise = page.locator('#guide-list a[href*="/exercicios/dockerfile-basico.html"]');
    const [popup] = await Promise.all([page.waitForEvent("popup"), exercise.click()]);
    await popup.waitForLoadState("networkidle");
    assert.equal(await popup.locator("h1").textContent(), slides.find((s) => s.id === "dockerfile-basico").title);
    await popup.close();
    await page.locator("#all-materials-button").click();
    const files = page.locator("#guide-list a[download]");
    const hrefs = [...new Set(await files.evaluateAll((links) => links.map((link) => link.href)))];
    for (const href of hrefs) {
      const link = page.locator('#guide-list a[download][href="' + new URL(href).pathname.replace(/^\//, "../") + '"]');
      const response = await page.request.get(href);
      assert.equal(response.status(), 200, href);
      assert.ok((await response.body()).length > 0);
    }
    report.counts.downloadFiles = hrefs.length;
    await page.locator("#material-search").fill("WORKDIR");
    const anchored = page.locator('#guide-list a[href*="#"]').first();
    const href = await anchored.getAttribute("href");
    await anchored.locator("xpath=ancestor::details[1]").locator(":scope > summary").click();
    const [guide] = await Promise.all([context.waitForEvent("page"), anchored.click()]);
    await guide.waitForLoadState("networkidle");
    assert.equal(new URL(guide.url()).hash, new URL(href, page.url()).hash);
    assert.ok(await guide.locator(new URL(guide.url()).hash).count() === 1);
    await guide.close();
    await closeDialog("#resources-dialog", "slide-files-button");
    await page.locator("#resources-button").click();
    assert.equal(await page.locator("#material-search").inputValue(), "");
    await closeDialog("#resources-dialog", "resources-button", true);
  });

  await check("referências, backdrop e restauração de foco", async () => {
    await go("copy-workdir");
    for (let i = 0; i < 2; i++) {
      await page.locator("#reference-button").click();
      assert.equal(await page.evaluate(() => document.activeElement.closest("dialog")?.id), "reference-dialog");
      if (i === 0) await closeDialog("#reference-dialog", "reference-button", true);
      else {
        const box = await page.locator("#reference-dialog").boundingBox();
        await page.mouse.click(Math.max(2, box.x - 10), Math.max(2, box.y - 10));
        await page.waitForFunction(() => !document.querySelector("#reference-dialog").open);
        assert.equal(await page.evaluate(() => document.activeElement.id), "reference-button");
      }
    }
  });

  await check("navegação teclado, hash, histórico e atalhos", async () => {
    await go("inicio");
    await page.locator("#slide").focus();
    await page.keyboard.press("ArrowRight");
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), slides[1].id);
    await page.keyboard.press("PageDown");
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), slides[2].id);
    await page.goBack();
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), slides[1].id);
    await page.goForward();
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), slides[2].id);
    await page.keyboard.press("End");
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), slides.at(-1).id);
    assert.equal(await page.locator("#next").isDisabled(), true);
    await page.keyboard.press("Home");
    assert.equal(await page.locator("#previous").isDisabled(), true);
    await page.keyboard.press("/");
    await page.locator("#commands-dialog[open]").waitFor();
    await page.locator("#command-search").fill("exec");
    await page.keyboard.press("ArrowRight");
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), "inicio");
    await closeDialog("#commands-dialog", null, true);
    await page.locator("#slide").focus();
    await page.keyboard.press("n");
    await page.locator("#reference-dialog[open]").waitFor();
    assert.equal(await page.locator("#reference-title").textContent(), "Notas do instrutor");
    await closeDialog("#reference-dialog", null, true);
  });

  await check("link de acessibilidade preserva o slide atual", async () => {
    await go("copy-workdir");
    await page.locator(".skip-link").focus();
    await page.keyboard.press("Enter");
    await page.waitForTimeout(100);
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), "copy-workdir");
    assert.equal(await page.evaluate(() => document.activeElement.id), "slide");
  });

  await check("tela cheia entra, atualiza rótulo e sai", async () => {
    await go("inicio");
    await page.locator("#presentation-button").click();
    await page.waitForFunction(() => !!document.fullscreenElement);
    assert.equal(await page.locator("#presentation-button").getAttribute("aria-label"), "Sair do modo de apresentação");
    await page.locator("#presentation-button").click();
    await page.waitForFunction(() => !document.fullscreenElement);
    await page.waitForFunction(() => document.querySelector("#presentation-button").getAttribute("aria-label") === "Ativar modo de apresentação");
    assert.equal(await page.locator("#presentation-button").getAttribute("aria-label"), "Ativar modo de apresentação");
  });

  await check("menu móvel: inert, foco, ciclo Tab, seleção, scrim e Escape", async () => {
    await page.setViewportSize({ width: 375, height: 812 });
    await go("inicio");
    assert.equal(await page.locator("#sidebar").evaluate((element) => element.inert), true);
    await page.locator("#menu-toggle").click();
    assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "true");
    assert.equal(await page.locator("#sidebar").evaluate((element) => element.inert), false);
    assert.equal(await page.evaluate(() => document.activeElement.closest("#sidebar")?.id), "sidebar");
    const buttons = page.locator("#sidebar button");
    await buttons.last().focus();
    await page.keyboard.press("Tab");
    assert.equal(await page.evaluate(() => document.activeElement === document.querySelector("#sidebar button")), true);
    await page.keyboard.press("Shift+Tab");
    assert.equal(await page.evaluate(() => document.activeElement === [...document.querySelectorAll("#sidebar button")].at(-1)), true);
    await page.keyboard.press("Escape");
    assert.equal(await page.locator("#sidebar").evaluate((element) => element.inert), true);
    assert.equal(await page.evaluate(() => document.activeElement.id), "menu-toggle");
    await page.locator("#menu-toggle").click();
    await page.locator('.chapter-slide[data-goto="1"]').click();
    assert.equal(await page.locator("#slide").getAttribute("data-slide-id"), slides[1].id);
    assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "false");
    await page.locator("#menu-toggle").click();
    const scrim = await page.locator("#sidebar-scrim").boundingBox();
    await page.mouse.click(scrim.x + scrim.width - 5, scrim.y + scrim.height - 5);
    assert.equal(await page.locator("#menu-toggle").getAttribute("aria-expanded"), "false");
    assert.equal(await page.evaluate(() => document.activeElement.id), "menu-toggle");
  });

  await check("quiz aceita resposta, explica e avança", async () => {
    await page.setViewportSize({ width: 1440, height: 900 });
    const quiz = slides.find((slide) => slide.type === "quiz");
    await go(quiz.id);
    const question = await page.locator("#quiz-panel h2").textContent();
    const answer = await page.evaluate(() => window.OFICINA_QUIZ[0].correct);
    await page.locator(`[data-answer="${answer}"]`).click();
    assert.match(await page.locator(".quiz-feedback").textContent(), /^Correto\./);
    await page.locator(".quiz-next").click();
    assert.notEqual(await page.locator("#quiz-panel h2").textContent(), question);
  });

  report.counts.tests = report.passed.length + report.failed.length;
  fs.mkdirSync(path.dirname(reportFile), { recursive: true });
  fs.writeFileSync(reportFile, JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ counts: report.counts, failed: report.failed, pageerrors: report.pageerrors, badResponses: report.badResponses }, null, 2));
  await browser.close();
  if (report.failed.length || report.pageerrors.length || report.badResponses.length) process.exitCode = 1;
})().catch((error) => { console.error(error); process.exitCode = 1; });
