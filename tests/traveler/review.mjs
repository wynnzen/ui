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
  await page.keyboard.press("Escape")
  await expect(
    page.getByRole("button", { name: "Baseline nested menu", exact: true })
  ).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("dialog")).toBeHidden()
  await page
    .getByRole("combobox", { name: "Baseline destination", exact: true })
    .click()
  await expect(
    page.getByRole("option", { name: "Route 1", exact: true })
  ).toBeFocused()
  const inheritedSelect = await accessibility(
    "baseline open select",
    "baseline"
  )
  await page.keyboard.press("End")
  await expect(
    page.getByRole("option", { name: "Route 24", exact: true })
  ).toBeFocused()
  assert.ok(
    (await page
      .locator("[data-radix-select-viewport]")
      .evaluate((el) => el.scrollTop)) > 0
  )
  await page.keyboard.press("Escape")
  await page
    .getByRole("button", { name: "Baseline context actions", exact: true })
    .click({ button: "right" })
  const inheritedContextMenu = await accessibility(
    "baseline context menu",
    "baseline"
  )
  await page.keyboard.press("Escape")
  await page
    .getByRole("button", { name: "Baseline routes", exact: true })
    .click()
  const inheritedNavigation = await accessibility(
    "baseline navigation menu",
    "baseline"
  )
  await page.keyboard.press("Escape")
  await page
    .getByRole("combobox", { name: "Baseline commands", exact: true })
    .fill("no-match-route")
  const inheritedEmptyCommand = await accessibility(
    "baseline empty command results",
    "baseline"
  )
  await page.goto(url, { waitUntil: "networkidle" })
  await page.addScriptTag({ path: axePath })

  async function screenshot(name, locator = page) {
    // Avoid inheriting hover from an earlier page or viewport.
    await page.mouse.move(0, 0)
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
              [
                "aria-hidden-focus",
                "scrollable-region-focusable",
                "aria-required-children",
              ].includes(baseline.id) &&
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
    // Radix scrollbars recalculate their dimensions after a ResizeObserver tick.
    await expect
      .poll(
        () =>
          page.evaluate(
            () => document.documentElement.scrollWidth <= innerWidth
          ),
        { message: `${name}: horizontal document overflow` }
      )
      .toBe(true)
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

  await page.goto(new URL("forms.html", url).href, { waitUntil: "networkidle" })
  await page.addScriptTag({ path: axePath })
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`forms ${width}px reflow`)
    await screenshot(`forms-${width}`)
  }
  await accessibility("forms and content")

  await page.emulateMedia({ reducedMotion: "reduce" })
  await page.goto(new URL("overlays.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.addScriptTag({ path: axePath })
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`overlays ${width}px reflow`)
    await screenshot(`overlays-${width}`)
  }
  await accessibility("navigation and overlays")
  await page.getByRole("combobox", { name: "Destination", exact: true }).click()
  await expect(
    page.getByRole("option", { name: "Northreach", exact: true })
  ).toBeFocused()
  await screenshot("select", page.getByRole("listbox"))
  await accessibility("open select", inheritedSelect)
  await page.keyboard.press("End")
  await expect(
    page.getByRole("option", { name: "Waypoint 12", exact: true })
  ).toBeFocused()
  assert.ok(
    (await page
      .locator("[data-radix-select-viewport]")
      .evaluate((el) => el.scrollTop)) > 0
  )
  report.checks.push(
    "Themed and upstream Select scroll to End with the keyboard"
  )
  await page.keyboard.press("Escape")
  await page
    .getByRole("button", { name: "Archive journey", exact: true })
    .click()
  await expect(
    page.getByRole("button", { name: "Keep journey", exact: true })
  ).toBeFocused()
  await screenshot("alert-dialog", page.getByRole("alertdialog"))
  await accessibility("open alert dialog")
  await page.keyboard.press("Escape")
  await page.getByRole("button", { name: "Edit waypoint", exact: true }).click()
  await expect(page.getByLabel("Waypoint name", { exact: true })).toBeFocused()
  await screenshot("popover", page.locator("[data-slot=popover-content]"))
  await accessibility("open popover")
  await page.keyboard.press("Escape")
  await page.getByRole("button", { name: "Travel note", exact: true }).focus()
  await expect(page.getByRole("tooltip")).toBeVisible()
  await screenshot("tooltip", page.locator("[data-slot=tooltip-content]"))
  await accessibility("open tooltip")
  await page.keyboard.press("Escape")

  await page.setViewportSize({ width: 320, height: 360 })
  for (const name of ["Archive journey", "Open small alert"]) {
    await page.getByRole("button", { name, exact: true }).click()
    const alert = page.getByRole("alertdialog")
    const bounds = await alert.boundingBox()
    assert.ok(
      bounds.x >= 0 &&
        bounds.y >= 0 &&
        bounds.x + bounds.width <= 320 &&
        bounds.y + bounds.height <= 360
    )
    await alert.getByRole("button").first().click()
    await expect(alert).toBeHidden()
  }
  report.checks.push(
    "Both alert sizes fit a 320x360 viewport with reachable actions"
  )
  await page.getByRole("combobox", { name: "Destination", exact: true }).click()
  await page
    .getByRole("option", {
      name: "The old observatory beyond the eastern ridge",
      exact: true,
    })
    .click()
  await noOverflow("Long Select value at 320px")
  await page.setViewportSize({ width: 768, height: 1000 })
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%"
  })
  await noOverflow("Navigation at 200% text / 768px")

  for (const name of ["inventory", "catalog", "disclosure"]) {
    await page.goto(new URL(`${name}.html`, url).href, {
      waitUntil: "networkidle",
    })
    await page.addScriptTag({ path: axePath })
    for (const width of [320, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 })
      await noOverflow(`${name} ${width}px reflow`)
      if (name !== "catalog") await screenshot(`${name}-${width}`)
    }
    await accessibility(name)
    if (name === "catalog") {
      await page
        .getByLabel("Find a component or export", { exact: true })
        .fill("select")
      await screenshot("catalog-search")
    }
  }

  await page.setViewportSize({ width: 768, height: 1000 })
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%"
  })
  await noOverflow("Disclosure and feedback at 200% text")
  await page.evaluate(() => {
    document.documentElement.style.fontSize = ""
  })
  await page.emulateMedia({ forcedColors: "active" })
  await page
    .getByRole("button", { name: "Which road is open?", exact: true })
    .focus()
  await expect(
    page.getByRole("button", { name: "Which road is open?", exact: true })
  ).toHaveCSS("outline-style", "solid")
  await expect(page.locator("[data-slot=skeleton]").first()).toHaveCSS(
    "border-top-style",
    "solid"
  )
  await screenshot("disclosure-forced-colors", page.locator("#accordion"))
  report.checks.push(
    "Disclosure focus and placeholder borders survive forced colors"
  )
  await page.emulateMedia({ forcedColors: "none" })
  await page.goto(new URL("content.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.addScriptTag({ path: axePath })
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`Content and controls ${width}px reflow`)
    await screenshot(`content-${width}`)
  }
  await accessibility("content and controls")
  await page.setViewportSize({ width: 768, height: 1000 })
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%"
  })
  await noOverflow("Content and controls at 200% text")
  await page.evaluate(() => {
    document.documentElement.style.fontSize = ""
  })
  await page.emulateMedia({ forcedColors: "active" })
  await page
    .getByRole("slider", { name: "Daily distance", exact: true })
    .focus()
  await expect(
    page.getByRole("slider", { name: "Daily distance", exact: true })
  ).toHaveCSS("outline-style", "solid")
  await screenshot("slider-forced-colors", page.locator("#slider"))
  report.checks.push(
    "Slider thumb focus and system-color track/range remain visible"
  )
  await page.emulateMedia({ forcedColors: "none" })
  await page.goto(new URL("advanced-forms.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.addScriptTag({ path: axePath })
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`Advanced forms ${width}px reflow`)
    await screenshot(`advanced-forms-${width}`)
  }
  await accessibility("advanced forms")
  await page
    .getByRole("combobox", { name: "Journey commands", exact: true })
    .fill("no-match-route")
  await accessibility("empty command results", inheritedEmptyCommand)
  await page
    .getByRole("combobox", { name: "Journey commands", exact: true })
    .fill("")
  await page
    .getByRole("combobox", { name: "Destination picker", exact: true })
    .click()
  await accessibility("Popover Command recipe")
  await page.keyboard.press("Escape")
  await page
    .getByRole("button", { name: "Save traveller profile", exact: true })
    .click()
  await screenshot("form-validation", page.locator("#form"))
  await accessibility("form validation")
  await page
    .getByRole("button", { name: "Open command palette", exact: true })
    .click()
  await screenshot("command-dialog", page.getByRole("dialog"))
  await accessibility("command dialog")
  await page.setViewportSize({ width: 320, height: 360 })
  await noOverflow("Command palette 320x360 viewport")
  const commandBounds = await page.getByRole("dialog").boundingBox()
  assert.ok(
    commandBounds.y >= 0 && commandBounds.y + commandBounds.height <= 360
  )
  await page.keyboard.press("Escape")
  await page.setViewportSize({ width: 768, height: 1000 })
  await page.evaluate(() => {
    document.documentElement.style.fontSize = "200%"
  })
  await noOverflow("Advanced forms at 200% text")
  await page.evaluate(() => {
    document.documentElement.style.fontSize = ""
  })
  await page.emulateMedia({ forcedColors: "active" })
  await page.getByLabel("Courier code", { exact: true }).focus()
  await expect(
    page.locator("[data-slot=input-otp-slot][data-active=true]").first()
  ).toHaveCSS("outline-style", "solid")
  await expect(page.getByLabel("Courier code", { exact: true })).toHaveCSS(
    "forced-color-adjust",
    "none"
  )
  await expect(page.getByLabel("Courier code", { exact: true })).toHaveCSS(
    "color",
    "rgba(0, 0, 0, 0)"
  )
  await screenshot("otp-forced-colors", page.locator("#input-otp"))
  report.checks.push("OTP active slot retains forced-colors outline")
  await page.emulateMedia({ forcedColors: "none" })
  await page.emulateMedia({ forcedColors: "active" })
  for (const [name, selector] of [
    ["forms", "[data-slot=switch-thumb]"],
    [
      "inventory",
      "[data-slot=progress-indicator], [data-slot=scroll-area-thumb]",
    ],
  ]) {
    await page.goto(new URL(`${name}.html`, url).href, {
      waitUntil: "networkidle",
    })
    const visibility = await page
      .locator(selector)
      .evaluateAll((elements) =>
        elements.every(
          (el) =>
            getComputedStyle(el).backgroundColor !==
            getComputedStyle(el.parentElement).backgroundColor
        )
      )
    assert.equal(
      visibility,
      true,
      `${name}: state indicators must remain visible in forced colors`
    )
  }
  report.checks.push(
    "Progress, Switch and Scroll Area state indicators survive forced colors"
  )
  await page.emulateMedia({ forcedColors: "none" })

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
  await page.goto(new URL("extended-navigation.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.addScriptTag({ path: axePath })
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`Extended navigation ${width}px`)
    await screenshot(`extended-navigation-${width}`)
  }
  await accessibility("extended navigation")
  await page
    .getByRole("button", { name: "Map context actions", exact: true })
    .click({ button: "right" })
  await screenshot(
    "context-menu",
    page.locator("[data-slot=context-menu-content]")
  )
  await accessibility("open context menu", inheritedContextMenu)
  await page.keyboard.press("Escape")
  await page.getByRole("menuitem", { name: "Journal", exact: true }).click()
  await accessibility("open menubar")
  await page.keyboard.press("Escape")
  await page.getByRole("button", { name: "Destinations", exact: true }).click()
  await expect(
    page.locator("[data-slot=navigation-menu-viewport]")
  ).toBeVisible()
  await screenshot(
    "navigation-menu",
    page.locator("[data-slot=navigation-menu-viewport]")
  )
  await accessibility("open navigation menu", inheritedNavigation)
  await page.keyboard.press("Escape")
  await page
    .getByRole("button", { name: "Open sheet right", exact: true })
    .click()
  await screenshot("sheet-right", page.getByRole("dialog"))
  await accessibility("open sheet")
  await page.keyboard.press("Escape")
  await page
    .getByRole("button", { name: "Open drawer bottom", exact: true })
    .click()
  await screenshot("drawer-bottom", page.getByRole("dialog"))
  await accessibility("open drawer")
  await expect(page.getByRole("dialog")).toHaveCSS("animation-name", "none")
  await page
    .getByRole("button", { name: "Finish preparation", exact: true })
    .click()
  await page.setViewportSize({ width: 320, height: 360 })
  for (const kind of ["sheet", "drawer"])
    for (const side of ["right", "left", "top", "bottom"]) {
      await page
        .getByRole("button", { name: `Open ${kind} ${side}`, exact: true })
        .click()
      const panel = page.getByRole("dialog")
      await expect(panel).toBeVisible()
      const b = await panel.boundingBox()
      assert.ok(
        b.x >= -1 && b.y >= -1 && b.x + b.width <= 321 && b.y + b.height <= 361,
        `${kind} ${side} viewport bounds`
      )
      const close = page.getByRole("button", {
        name: kind === "sheet" ? "Save sheet notes" : "Finish preparation",
        exact: true,
      })
      await close.scrollIntoViewIfNeeded()
      await close.click()
      await expect(panel).toBeHidden()
    }
  report.checks.push(
    "Four Sheet sides and four Drawer directions fit 320x360 with reachable footer actions; reduced motion removes Drawer animations"
  )
  await page.setViewportSize({ width: 768, height: 1000 })
  await page.evaluate(() => (document.documentElement.style.fontSize = "200%"))
  await noOverflow("Extended navigation at 200% text")
  await page.goto(new URL("sidebar.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.addScriptTag({ path: axePath })
  for (const width of [320, 768, 1440]) {
    await page.setViewportSize({ width, height: 1000 })
    await noOverflow(`Sidebar ${width}px`)
    await screenshot(`sidebar-${width}`)
  }
  await accessibility("desktop sidebar")
  await page.locator("[data-slot=sidebar-trigger]").click()
  await screenshot("sidebar-icon")
  await accessibility("collapsed icon sidebar")
  await page
    .getByLabel("Collapse mode", { exact: true })
    .selectOption("offcanvas")
  await accessibility("collapsed offcanvas sidebar")
  await page.setViewportSize({ width: 320, height: 640 })
  await page.locator("[data-slot=sidebar-trigger]").click()
  await expect(
    page.getByRole("dialog", { name: "Sidebar", exact: true })
  ).toBeVisible()
  await noOverflow("Mobile sidebar open at 320px")
  await screenshot("sidebar-mobile", page.getByRole("dialog"))
  await accessibility("mobile sidebar")
  await page.keyboard.press("Escape")
  report.checks.push(
    "Sidebar desktop, icon, offcanvas and mobile Sheet semantics and responsive reflow"
  )
  await page.getByLabel("Collapse mode", { exact: true }).selectOption("none")
  await noOverflow("Noncollapsible Sidebar host stacks at 320px")
  await accessibility("noncollapsible sidebar")
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
