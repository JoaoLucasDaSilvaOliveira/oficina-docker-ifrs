"use strict";

// Run against the local slides server: node testes/layout.cjs
// The report preserves every failure instead of stopping at the first slide.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const playwright = require(
  process.env.PLAYWRIGHT_MODULE ||
    "/home/dev_jao/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright",
);

const base = (process.env.OFICINA_URL || "http://127.0.0.1:8080").replace(/\/$/, "");
const url = /\/apresentacao$/.test(base) ? base : `${base}/apresentacao`;
const resultPath = path.resolve(
  process.env.LAYOUT_REPORT || ".test-results/layout.json",
);
const selectedIds = new Set((process.env.LAYOUT_SLIDES || "").split(",").filter(Boolean));
const viewports = [
  [1920, 1080],
  [1440, 900],
  [1366, 768],
  [1280, 720],
  [1024, 768],
  [960, 600],
  [900, 600], // Space available when the browser is zoomed on a small laptop.
  [800, 600],
  [375, 812],
  [390, 664],
  [483, 714], // The browser panel size used when the regression was reported.
  [360, 640],
];

// This runs in the page. SVG layout boxes alone do not describe visible ink:
// getBBox + getScreenCTM catches text painted beyond the SVG and over buttons.
function inspectSlide() {
  const failures = [];
  const tolerance = 2;
  const rect = (r) => ({
    left: r.left,
    top: r.top,
    right: r.right,
    bottom: r.bottom,
    width: r.width,
    height: r.height,
  });
  const bounds = (element) => rect(element.getBoundingClientRect());
  const visible = (element) => {
    const style = getComputedStyle(element);
    return (
      style.display !== "none" &&
      style.visibility !== "hidden" &&
      element.getClientRects().length > 0 &&
      element.getBoundingClientRect().width > 0 &&
      element.getBoundingClientRect().height > 0
    );
  };
  const fail = (kind, detail) => failures.push({ kind, ...detail });
  const outside = (inner, outer) =>
    inner.left < outer.left - tolerance ||
    inner.top < outer.top - tolerance ||
    inner.right > outer.right + tolerance ||
    inner.bottom > outer.bottom + tolerance;
  const overlaps = (a, b) =>
    Math.min(a.right, b.right) - Math.max(a.left, b.left) > tolerance &&
    Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > tolerance;
  const viewport = {
    left: 0,
    top: 0,
    right: innerWidth,
    bottom: innerHeight,
  };
  const slide = document.querySelector("#slide");
  const slideBounds = bounds(slide);
  const visual = document.querySelector(".visual-area");
  const visualBounds = bounds(visual);
  const actions = document.querySelector(".slide-actions");
  const heading = document.querySelector(".slide-heading");
  const navigation = document.querySelector(".navigation");
  const reserved = [heading, actions, navigation, document.querySelector(".topbar")]
    .filter((element) => element && visible(element))
    .map((element) => ({ selector: element.className, box: bounds(element) }));

  for (const [name, element] of [
    ["slide", slide],
    ["heading", heading],
    ["visual", visual],
    ["actions", actions],
    ["navigation", navigation],
  ]) {
    if (outside(bounds(element), viewport))
      fail("element-outside-viewport", { element: name, box: bounds(element) });
  }
  if (document.documentElement.scrollHeight > innerHeight + tolerance ||
      document.documentElement.scrollWidth > innerWidth + tolerance ||
      document.body.scrollHeight > innerHeight + tolerance ||
      document.body.scrollWidth > innerWidth + tolerance)
    fail("page-overflow", {
      document: [document.documentElement.scrollWidth, document.documentElement.scrollHeight],
      body: [document.body.scrollWidth, document.body.scrollHeight],
      viewport: [innerWidth, innerHeight],
    });

  // Every visual container must remain inside its assigned grid area.
  for (const element of visual.querySelectorAll("*")) {
    if (element.closest("svg") || !visible(element)) continue;
    const box = bounds(element);
    if (outside(box, visualBounds))
      fail("html-visual-overflow", { element: element.className || element.tagName, box, visualBounds });
  }

  const paintedText = [];
  function svgBox(element) {
    const box = element.getBBox();
    const matrix = element.getScreenCTM();
    if (!matrix || (!box.width && !box.height)) return null;
    const points = [
      [box.x, box.y], [box.x + box.width, box.y],
      [box.x, box.y + box.height], [box.x + box.width, box.y + box.height],
    ].map(([x, y]) => new DOMPoint(x, y).matrixTransform(matrix));
    const left = Math.min(...points.map((p) => p.x));
    const top = Math.min(...points.map((p) => p.y));
    const right = Math.max(...points.map((p) => p.x));
    const bottom = Math.max(...points.map((p) => p.y));
    return { left, top, right, bottom, width: right - left, height: bottom - top };
  }
  for (const svg of visual.querySelectorAll("svg")) {
    if (!visible(svg)) continue;
    const svgBounds = bounds(svg);
    if (outside(svgBounds, visualBounds))
      fail("svg-element-overflow", { box: svgBounds, visualBounds });
    const paint = svgBox(svg);
    if (paint && outside(paint, visualBounds))
      fail("svg-paint-overflow", { box: paint, visualBounds });
    if (paint && outside(paint, svgBounds))
      fail("svg-paint-outside-svg", { box: paint, svgBounds });
    for (const element of svg.querySelectorAll("text")) {
      // Compare individual lines, avoiding a parent's union box with its own tspans.
      const lines = element.querySelectorAll("tspan");
      for (const line of lines.length ? lines : [element]) {
        const box = svgBox(line);
        if (!box) continue;
        const item = { text: line.textContent.trim(), box };
        paintedText.push(item);
        if (outside(box, svgBounds))
          fail("svg-text-outside-svg", { ...item, svgBounds });
        if (outside(box, visualBounds))
          fail("svg-text-overflow", { ...item, visualBounds });
        for (const region of reserved)
          if (overlaps(box, region.box))
            fail("svg-text-in-reserved-region", { ...item, region });
      }
    }
  }
  for (let a = 0; a < paintedText.length; a++)
    for (let b = a + 1; b < paintedText.length; b++)
      if (overlaps(paintedText[a].box, paintedText[b].box))
        fail("svg-text-overlap", { first: paintedText[a], second: paintedText[b] });

  // Check actual HTML text ink as well as boxes; clipped overflowing text still
  // has Range rectangles even when its parent claims to fit.
  const walker = document.createTreeWalker(slide, NodeFilter.SHOW_TEXT);
  const htmlText = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!node.textContent.trim() || parent.closest("svg") || !visible(parent)) continue;
    const range = document.createRange();
    range.selectNodeContents(node);
    const region = parent.closest(".visual-area") ? visualBounds : slideBounds;
    for (const raw of range.getClientRects()) {
      const box = rect(raw);
      if (!box.width || !box.height) continue;
      const item = { text: node.textContent.trim(), box };
      htmlText.push({ ...item, element: parent });
      if (outside(box, region))
        fail("html-text-overflow", { ...item, region });
      if (!parent.closest(".slide-actions")) {
        for (const element of [actions, navigation, document.querySelector(".topbar")])
          if (overlaps(box, bounds(element)))
            fail("html-text-in-reserved-region", { ...item, region: element.className });
      }
    }
  }
  for (let a = 0; a < htmlText.length; a++)
    for (let b = a + 1; b < htmlText.length; b++)
      if (htmlText[a].element !== htmlText[b].element && overlaps(htmlText[a].box, htmlText[b].box))
        fail("html-text-overlap", {
          first: { text: htmlText[a].text, box: htmlText[a].box },
          second: { text: htmlText[b].text, box: htmlText[b].box },
        });

  const buttons = {};
  for (const selector of [
    "#previous", "#next", "#reference-button", "#slide-commands-button", "#slide-files-button",
    "#commands-button", "#resources-button", "#presentation-button",
    "#quiz-panel .quiz-next",
    ...Array.from(document.querySelectorAll("#quiz-panel [data-answer]"),
      (element) => `#quiz-panel [data-answer="${element.dataset.answer}"]`),
  ]) {
    const element = document.querySelector(selector);
    if (!element || !visible(element)) continue;
    const box = bounds(element);
    buttons[selector] = box;
    if (outside(box, viewport)) fail("button-outside-viewport", { selector, box });
    if (element.disabled) continue;
    const insetX = Math.min(6, box.width / 4);
    const insetY = Math.min(6, box.height / 4);
    for (const [x, y] of [
      [(box.left + box.right) / 2, (box.top + box.bottom) / 2],
      [box.left + insetX, box.top + insetY],
      [box.right - insetX, box.top + insetY],
      [box.left + insetX, box.bottom - insetY],
      [box.right - insetX, box.bottom - insetY],
    ]) {
      const hit = document.elementFromPoint(x, y);
      if (!hit || (hit !== element && !element.contains(hit)))
        fail("button-occluded", { selector, point: [x, y], hit: hit?.outerHTML.slice(0, 220) || null });
    }
  }
  return { failures, buttons, svgLines: paintedText.length, htmlLines: htmlText.length };
}

async function selectSlide(page, id) {
  await page.evaluate((slideId) => { location.hash = `#/${slideId}`; }, id);
  await page.waitForFunction((slideId) => document.querySelector("#slide")?.dataset.slideId === slideId, id);
  await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
}

async function checkDialog(page, selector, dialog, failures) {
  try {
    await page.locator(selector).click({ timeout: 2000 });
    await page.locator(`${dialog}[open]`).waitFor({ state: "visible", timeout: 2000 });
    const box = await page.locator(dialog).boundingBox();
    const viewport = page.viewportSize();
    assert(box && box.x >= -2 && box.y >= -2 && box.x + box.width <= viewport.width + 2 && box.y + box.height <= viewport.height + 2, "dialog outside viewport");
    await page.keyboard.press("Escape");
    await page.locator(`${dialog}[open]`).waitFor({ state: "hidden", timeout: 2000 });
    assert(await page.locator(selector).evaluate((element) => document.activeElement === element), "focus did not return to opener");
  } catch (error) {
    failures.push({ kind: "dialog-interaction", selector, dialog, message: error.message.split("\n")[0] });
    await page.evaluate(() => document.querySelectorAll("dialog[open]").forEach((element) => element.close()));
  }
}

async function checkQuizStates(page, failures) {
  const questions = await page.evaluate(() => window.OFICINA_QUIZ.map(({ correct }) => ({ correct })));
  for (let question = 0; question < questions.length; question++) {
    for (const state of ["question", "correct", "wrong"]) {
      if (state !== "question") {
        const answer = state === "correct" ? questions[question].correct : (questions[question].correct + 1) % 3;
        const selector = `#quiz-panel [data-answer="${answer}"]`;
        try {
          await page.locator(selector).click({ timeout: 800 });
        } catch (error) {
          failures.push({ kind: "quiz-answer-interaction", question: question + 1, state, message: error.message.split("\n")[0] });
          // Preserve the audit of later questions even if an earlier answer is hidden.
          await page.locator(selector).evaluate((element) => element.click());
        }
      }
      const inspection = await page.evaluate(inspectSlide);
      failures.push(...inspection.failures.map((failure) => ({ ...failure, quizQuestion: question + 1, quizState: state })));
    }
    const selector = "#quiz-panel .quiz-next";
    try {
      await page.locator(selector).click({ timeout: 800 });
    } catch (error) {
      failures.push({ kind: "quiz-next-interaction", question: question + 1, message: error.message.split("\n")[0] });
      await page.locator(selector).evaluate((element) => element.click());
    }
  }
}

(async () => {
  const browser = await playwright.chromium.launch({
    executablePath: process.env.CHROMIUM_PATH || "/usr/bin/google-chrome-stable",
    headless: true,
    args: ["--no-sandbox"],
  });
  const report = { url, started: new Date().toISOString(), slides: 0, results: [], errors: [] };
  try {
    for (const [width, height] of viewports) {
      const page = await browser.newPage({ viewport: { width, height } });
      page.on("pageerror", (error) => report.errors.push({ viewport: [width, height], message: error.message }));
      await page.goto(`${url}/#/inicio`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const allSlides = await page.evaluate(() => window.OFICINA_SLIDES.map(({ id, commands, downloads }) => ({ id, commands: !!commands?.length, downloads: !!downloads?.length })));
      const slides = allSlides.filter((slide) => !selectedIds.size || selectedIds.has(slide.id));
      report.slides = slides.length;
      let navigationBaseline;
      const exercised = new Set();
      for (let index = 0; index < slides.length; index++) {
        const slide = slides[index];
        await selectSlide(page, slide.id);
        const inspection = await page.evaluate(inspectSlide);
        if (!navigationBaseline) navigationBaseline = inspection.buttons;
        for (const selector of ["#previous", "#next", "#reference-button"])
          for (const dimension of ["left", "top", "right", "bottom"])
            if (Math.abs(inspection.buttons[selector][dimension] - navigationBaseline[selector][dimension]) > 1)
              inspection.failures.push({ kind: "navigation-shift", selector, dimension, expected: navigationBaseline[selector], actual: inspection.buttons[selector] });
        // Test every slide's modal buttons at the common laptop size; repeat each
        // modal type on every other viewport. Geometry/hit tests cover all slides.
        const allDialogs = width === 1440;
        for (const [selector, dialog] of [
          ["#reference-button", "#reference-dialog"],
          ["#slide-commands-button", "#exercise-dialog"],
          ["#slide-files-button", "#resources-dialog"],
          ["#commands-button", "#commands-dialog"],
          ["#resources-button", "#resources-dialog"],
        ]) {
          if (inspection.buttons[selector] && (allDialogs || !exercised.has(selector))) {
            await checkDialog(page, selector, dialog, inspection.failures);
            exercised.add(selector);
          }
        }
        if (slide.id === "quiz") await checkQuizStates(page, inspection.failures);
        // Actual next/previous clicks must preserve the same visible slide.
        if (!selectedIds.size && [0, Math.floor(slides.length / 2), slides.length - 2].includes(index)) {
          try {
            await page.locator("#next").click({ timeout: 2000 });
            await page.waitForFunction((id) => document.querySelector("#slide").dataset.slideId === id, slides[index + 1].id);
            await page.locator("#previous").click({ timeout: 2000 });
            await page.waitForFunction((id) => document.querySelector("#slide").dataset.slideId === id, slide.id);
          } catch (error) {
            inspection.failures.push({ kind: "navigation-interaction", message: error.message.split("\n")[0] });
            await selectSlide(page, slide.id);
          }
        }
        report.results.push({ viewport: [width, height], slide: slide.id, ...inspection });
      }
      await page.close();
      const failures = report.results.filter((r) => r.viewport[0] === width && r.viewport[1] === height).flatMap((r) => r.failures);
      fs.mkdirSync(path.dirname(resultPath), { recursive: true });
      fs.writeFileSync(resultPath, JSON.stringify(report, null, 2));
      console.log(`${width}x${height}: ${slides.length} slides, ${failures.length} problems`);
    }
  } catch (error) {
    report.errors.push({ message: error.stack });
  } finally {
    await browser.close();
    report.finished = new Date().toISOString();
    report.failures = report.results.reduce((sum, result) => sum + result.failures.length, 0);
    fs.mkdirSync(path.dirname(resultPath), { recursive: true });
    fs.writeFileSync(resultPath, JSON.stringify(report, null, 2));
    console.log(`${report.results.length} slide/viewport checks, ${report.failures} layout failures, ${report.errors.length} JavaScript/test errors. Report: ${resultPath}`);
    if (report.failures || report.errors.length || report.results.length !== report.slides * viewports.length)
      process.exitCode = 1;
  }
})();
