import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import { mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { createRequire } from "node:module"
import os from "node:os"

const require = createRequire(
  new URL("../../packages/react/package.json", import.meta.url)
)
const { chromium } = require("playwright")
const { expect } = require("playwright/test")
// axe-core is already pinned through the app's accessibility lint dependency.
const appRequire = createRequire(
  new URL("../../apps/v4/package.json", import.meta.url)
)
const eslintRequire = createRequire(appRequire.resolve("eslint-config-next"))
const a11yRequire = createRequire(
  eslintRequire.resolve("eslint-plugin-jsx-a11y")
)
const axePath = a11yRequire.resolve("axe-core/axe.min.js")
const capture = process.argv.includes("--capture")
const output = new URL("../../docs/traveler/review/", import.meta.url)
const actualOutput = new URL(
  "../../.codex-artifacts/traveler/",
  import.meta.url
)
mkdirSync(output, { recursive: true })
mkdirSync(actualOutput, { recursive: true })
const browser = await chromium.launch({ headless: true })
const report = {
  browser: await browser.version(),
  playwright: require("playwright/package.json").version,
  platform: `${os.platform()} ${os.arch()}`,
  release: os.release(),
  screenshots: [],
  accessibility: [],
  checks: [],
  externalRequests: [],
}
const expectedReport = capture
  ? null
  : JSON.parse(readFileSync(new URL("evidence.json", output), "utf8"))

try {
  if (expectedReport) {
    assert.equal(
      report.browser,
      expectedReport.browser,
      "Use the pinned browser to compare screenshots."
    )
    assert.equal(
      report.platform,
      expectedReport.platform,
      "Use the recorded platform to compare screenshots."
    )
  }
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "dark",
    locale: "en-US",
    timezoneId: "UTC",
  })
  const page = await context.newPage()
  const errors = []
  const url = process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
  const origin = new URL(url).origin
  page.on("pageerror", (error) => errors.push(error.message))
  page.on("request", (request) => {
    if (!request.url().startsWith(origin) && !request.url().startsWith("data:"))
      report.externalRequests.push(request.url())
  })
  await page.goto(new URL("baseline.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.addScriptTag({ path: axePath })
  const baselineMenu = page.getByRole("button", {
    name: "Baseline menu",
    exact: true,
  })
  await baselineMenu.focus()
  await page.keyboard.press("Enter")
  await expect(
    page.getByRole("menuitem", { name: "Open journal", exact: true })
  ).toBeFocused()
  const inheritedMenu = await accessibility("baseline open menu", "baseline")
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("menuitem", { name: "Open journal", exact: true })
  ).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(baselineMenu).toBeFocused()
  await page
    .getByRole("button", { name: "Open baseline dialog", exact: true })
    .click()
  await page
    .getByRole("button", { name: "Baseline nested menu", exact: true })
    .click()
  await page
    .getByRole("menuitem", { name: "Choose destination", exact: true })
    .waitFor()
  const inheritedNested = await accessibility(
    "baseline nested menu",
    "baseline"
  )
  await page.goto(url, { waitUntil: "networkidle" })
  await page.addScriptTag({ path: axePath })

  async function screenshot(name, locator = page) {
    const bytes = await locator.screenshot({
      animations: "disabled",
      caret: "hide",
      ...(locator === page ? { fullPage: true } : {}),
    })
    const path = new URL(`${name}.png`, output)
    if (capture) writeFileSync(path, bytes)
    else {
      writeFileSync(new URL(`${name}.png`, actualOutput), bytes)
      assert.ok(
        bytes.equals(readFileSync(path)),
        `${name} changed. Inspect .codex-artifacts/traveler; do not replace review candidates without reviewing the diff.`
      )
    }
    report.screenshots.push({
      name,
      sha256: createHash("sha256").update(bytes).digest("hex"),
      bytes: bytes.length,
    })
  }

  async function accessibility(name, inherited = []) {
    const result = await page.evaluate(async () => {
      const scan = await window.axe.run(document, {
        runOnly: {
          type: "tag",
          values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
        },
      })
      return {
        violations: scan.violations.map(({ id, impact, nodes }) => ({
          id,
          impact,
          targets: nodes.map((node) => node.target),
          surfaces: nodes.map((node) => {
            const el = document.querySelector(node.target[0])
            return el?.getAttribute("role") || el?.id || el?.tagName
          }),
        })),
        incomplete: scan.incomplete.map(({ id, nodes }) => ({
          id,
          count: nodes.length,
        })),
      }
    })
    report.accessibility.push({ name, ...result })
    if (inherited !== "baseline") {
      const unexpected = result.violations.filter(
        (finding) =>
          !inherited.some(
            (baseline) =>
              baseline.id === "aria-hidden-focus" &&
              finding.id === baseline.id &&
              JSON.stringify(finding.surfaces) ===
                JSON.stringify(baseline.surfaces)
          )
      )
      assert.deepEqual(
        unexpected,
        [],
        `${name}: new accessibility findings require triage`
      )
    }
    return result.violations
  }

  async function noOverflow(name) {
    assert.equal(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth
      ),
      true,
      `${name}: horizontal document overflow`
    )
    report.checks.push(name)
  }

  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`${width}px reflow`)
    await screenshot(`gallery-${width}`)
  }
  await accessibility("plain gallery")
  await screenshot("status-panel", page.locator("[data-slot=card]").nth(0))
  await screenshot("item-list", page.locator("[data-slot=card]").nth(1))
  const record = page.getByRole("button", {
    name: "Record progress",
    exact: true,
  })
  await record.focus()
  await screenshot("button-focus", page.locator("#button"))
  const box = await record.boundingBox()
  await record.hover()
  assert.deepEqual(
    await record.boundingBox(),
    box,
    "Hover must not move controls"
  )
  report.checks.push("Button hover/focus have stable bounds")

  const options = page.getByRole("button", {
    name: "Journey options",
    exact: true,
  })
  await options.focus()
  await page.keyboard.press("Enter")
  await expect(
    page.getByRole("menuitem", { name: "Open journal" })
  ).toBeFocused()
  assert.equal(
    await page
      .getByRole("menu")
      .evaluate((el) => getComputedStyle(el).animationDuration),
    "0s"
  )
  await screenshot("menu-highlight", page.getByRole("menu"))
  await accessibility("open menu", inheritedMenu)
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("menuitem", { name: "Open journal" })
  ).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(options).toBeFocused()

  const plan = page.getByRole("button", { name: "Plan a journey", exact: true })
  await plan.click()
  const dialog = page.getByRole("dialog", {
    name: "Before you set out",
    exact: true,
  })
  await expect(page.getByLabel("Journey title", { exact: true })).toBeFocused()
  await screenshot("dialog", dialog)
  await accessibility("open dialog")
  await page
    .getByRole("button", { name: "Destination: Northreach", exact: true })
    .click()
  await page
    .getByRole("menuitemradio", { name: "Northreach", exact: true })
    .waitFor()
  await accessibility("dialog with nested menu", inheritedNested)
  await page.keyboard.press("Escape")
  await page.keyboard.press("Escape")
  await expect(plan).toBeFocused()

  await page.setViewportSize({ width: 320, height: 360 })
  await plan.click()
  await dialog.waitFor()
  const bounds = await dialog.boundingBox()
  assert.ok(
    bounds.x >= 0 &&
      bounds.y >= 0 &&
      bounds.x + bounds.width <= 320 &&
      bounds.y + bounds.height <= 360,
    "Dialog must fit a reduced mobile viewport"
  )
  await page
    .getByRole("button", { name: "Confirm journey", exact: true })
    .click()
  await expect(dialog).toBeHidden()
  report.checks.push("320x360 dialog and footer remain reachable")

  await page.setViewportSize({ width: 768, height: 1000 })
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%"
  })
  await noOverflow("200% text at 768px")
  await page.getByRole("button", { name: "Save settings", exact: true }).click()
  await page.evaluate(() => {
    document.documentElement.style.fontSize = ""
  })

  await page.setViewportSize({ width: 1440, height: 1000 })
  await page.evaluate(() => {
    document.body.style.zoom = "2"
  })
  await noOverflow("200% CSS zoom at 1440px (browser-zoom approximation)")
  await page.evaluate(() => {
    document.body.style.zoom = ""
  })
  await page.emulateMedia({ forcedColors: "active" })
  await record.focus()
  await expect(record).toHaveCSS("outline-style", "solid")
  await expect(page.locator("[data-slot=card]").first()).toHaveCSS(
    "box-shadow",
    "none"
  )
  await screenshot("forced-colors", page.locator("#button"))
  await options.focus()
  await page.keyboard.press("Enter")
  await expect(
    page.getByRole("menuitem", { name: "Open journal" })
  ).toBeFocused()
  await expect(page.getByRole("menuitem", { name: "Open journal" })).toHaveCSS(
    "outline-style",
    "solid"
  )
  await page.keyboard.press("Escape")
  report.checks.push(
    "Forced colors retain focus, frames and keyboard menu operation"
  )
  await page.emulateMedia({
    forcedColors: "none",
    reducedMotion: "no-preference",
  })
  await plan.click()
  await expect(dialog).toHaveCSS("animation-duration", "0.14s")
  await page.keyboard.press("Escape")
  await expect(plan).toBeFocused()
  report.checks.push(
    "Default overlay motion is 140ms and never blocks dismissal"
  )

  await page.goto(new URL("baseline.html", url).href, {
    waitUntil: "networkidle",
  })
  assert.equal(await page.locator("html").getAttribute("data-ui-theme"), null)
  assert.notEqual(
    await page
      .getByRole("button", { name: "Continue", exact: true })
      .evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgb(228, 220, 203)"
  )
  report.checks.push("Separate upstream document receives no Traveler tokens")
  assert.deepEqual(errors, [])
  assert.deepEqual(
    report.externalRequests,
    [],
    "Components must not trigger external requests"
  )
  if (capture)
    writeFileSync(
      new URL("evidence.json", output),
      JSON.stringify(report, null, 2) + "\n"
    )
  console.log(
    `${capture ? "Captured" : "Compared"} ${report.screenshots.length} review candidates; ${report.checks.length} responsive/interaction checks passed. No external requests or new accessibility violations; inherited findings remain in evidence.json.`
  )
} finally {
  await browser.close()
}
