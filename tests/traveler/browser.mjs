import assert from "node:assert/strict"
import { createRequire } from "node:module"

// Reuse the browser dependency already owned by the workspace's React tests.
const require = createRequire(
  new URL("../../packages/react/package.json", import.meta.url)
)
const engines = require("playwright")
const browserName = process.env.TRAVELER_BROWSER || "chromium"
assert.ok(
  ["chromium", "firefox", "webkit"].includes(browserName),
  "Choose a supported Playwright engine"
)
const { expect } = require("playwright/test")
const browser = await engines[browserName].launch({
  headless: true,
  executablePath: process.env.TRAVELER_BROWSER_EXECUTABLE,
})
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 1000 },
    reducedMotion: "reduce",
  })
  const errors = []
  page.on("pageerror", (error) => errors.push(error.message))
  await page.goto(process.env.TRAVELER_URL || "http://127.0.0.1:4173/", {
    waitUntil: "networkidle",
  })
  const record = page.getByRole("button", {
    name: "Record progress",
    exact: true,
  })
  await record.focus()
  assert.equal(
    await record.evaluate((el) => getComputedStyle(el).outlineColor),
    "rgb(194, 215, 232)"
  )
  await page.keyboard.press("Enter")
  await page.keyboard.press("Space")
  assert.equal(
    await page.locator("#button [role=status]").textContent(),
    "Progress recorded 2 times."
  )
  assert.equal(
    await page
      .getByRole("button", { name: "Unavailable", exact: true })
      .isDisabled(),
    true
  )
  assert.equal(
    await page
      .getByRole("link", { name: "Usage notes", exact: true })
      .getAttribute("href"),
    "#button-notes"
  )
  assert.equal(
    await record.evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgb(228, 220, 203)"
  )
  assert.equal(
    await page
      .getByRole("button", { name: "Consumer override", exact: true })
      .evaluate((el) => getComputedStyle(el).paddingInlineStart),
    "32px"
  )
  await page.getByLabel("Traveler name", { exact: true }).fill("旅人 Ari")
  await page.getByLabel("Home town", { exact: true }).fill("Eastbank")
  await page.getByRole("button", { name: "Save settings", exact: true }).click()
  assert.equal(
    await page.locator("#input [role=status]").textContent(),
    "Saved 旅人 Ari from Eastbank."
  )
  await page.getByRole("button", { name: "Focus name", exact: true }).click()
  assert.equal(
    await page
      .getByLabel("Traveler name", { exact: true })
      .evaluate((el) => el === document.activeElement),
    true
  )
  assert.equal(
    await page
      .getByLabel("Journal ID / read only", { exact: true })
      .getAttribute("readonly"),
    ""
  )
  assert.equal(
    await page
      .getByLabel("Cloud sync / unavailable", { exact: true })
      .isDisabled(),
    true
  )
  assert.equal(
    await page
      .getByLabel("Email / invalid example", { exact: true })
      .getAttribute("aria-describedby"),
    "email-error"
  )

  const options = page.getByRole("button", {
    name: "Journey options",
    exact: true,
  })
  await options.focus()
  await page.keyboard.press("Enter")
  await expect(
    page.getByRole("menuitem", { name: "Open journal" })
  ).toBeFocused()
  await page.keyboard.press("ArrowDown")
  await expect(
    page.getByRole("menuitem", { name: "Travel pace", exact: true })
  ).toBeFocused()
  assert.equal(
    await page
      .getByRole("menuitem", { name: "Travel pace", exact: true })
      .evaluate((el) => getComputedStyle(el).outlineStyle),
    "solid"
  )
  await page.keyboard.press("ArrowRight")
  const swift = page.getByRole("menuitemradio", { name: "Swift", exact: true })
  await swift.waitFor()
  await swift.click()
  assert.match(await page.locator("#dropdown-menu").textContent(), /Pace swift/)
  await options.click()
  assert.equal(
    await page
      .getByRole("menuitemcheckbox", { name: "Show map", exact: true })
      .getAttribute("aria-checked"),
    "true"
  )
  assert.equal(
    await page
      .getByRole("menuitemcheckbox", {
        name: "Some notes visible",
        exact: true,
      })
      .getAttribute("aria-checked"),
    "mixed"
  )
  await page
    .getByRole("menuitemcheckbox", { name: "Show map", exact: true })
    .click()
  assert.match(await page.locator("#dropdown-menu").textContent(), /Map hidden/)
  await options.focus()
  await page.keyboard.press("Enter")
  await expect(
    page.getByRole("menuitem", { name: "Open journal" })
  ).toBeFocused()
  await page.keyboard.press("o")
  await page.keyboard.press("Enter")
  assert.equal(
    await page.locator("#dropdown-menu [role=status]").textContent(),
    "Journal opened."
  )

  const plan = page.getByRole("button", { name: "Plan a journey", exact: true })
  await plan.click()
  const dialog = page.getByRole("dialog", {
    name: "Before you set out",
    exact: true,
  })
  await dialog.waitFor()
  assert.equal(
    await dialog.evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgb(27, 30, 33)"
  )
  assert.ok(await dialog.getAttribute("aria-describedby"))
  await expect(page.getByLabel("Journey title", { exact: true })).toBeFocused()
  await page.keyboard.press("Shift+Tab")
  assert.equal(
    await dialog.evaluate((el) => el.contains(document.activeElement)),
    true
  )
  await page
    .getByRole("button", { name: "Destination: Northreach", exact: true })
    .click()
  const destination = page.getByRole("menuitemradio", {
    name: "Willowmere",
    exact: true,
  })
  await destination.waitFor()
  assert.equal(
    await page
      .getByRole("menu")
      .evaluate((el) => getComputedStyle(el).backgroundColor),
    "rgb(36, 40, 45)"
  )
  await destination.click()
  assert.equal(await dialog.isVisible(), true)
  assert.equal(
    await page
      .getByRole("button", { name: "Destination: Willowmere", exact: true })
      .isVisible(),
    true
  )
  await page.keyboard.press("Escape")
  await dialog.waitFor({ state: "hidden" })
  await expect(plan).toBeFocused()
  await plan.click()
  await page
    .getByRole("button", { name: "Confirm journey", exact: true })
    .click()
  await dialog.waitFor({ state: "hidden" })
  assert.equal(
    await page.locator("#dropdown-menu [role=status]").textContent(),
    "Journey planned for Willowmere."
  )

  const notice = page.getByRole("button", {
    name: "Read travel notice",
    exact: true,
  })
  await notice.click()
  const noticeDialog = page.getByRole("dialog", {
    name: "Take the longer road",
    exact: true,
  })
  await noticeDialog.waitFor()
  assert.equal(
    await noticeDialog
      .getByRole("button", { name: "Close", exact: true })
      .count(),
    1
  )
  await noticeDialog.getByRole("button", { name: "Close", exact: true }).click()
  await noticeDialog.waitFor({ state: "hidden" })
  await expect(notice).toBeFocused()
  await page.goto(
    new URL("forms.html", process.env.TRAVELER_URL || "http://127.0.0.1:4173/")
      .href
  )
  const mixed = page.getByRole("checkbox", {
    name: "Partly packed",
    exact: true,
  })
  await expect(mixed).toHaveAttribute("aria-checked", "mixed")
  await mixed.focus()
  await page.keyboard.press("Space")
  await expect(mixed).toBeChecked()
  const steady = page.getByRole("radio", { name: "Steady pace", exact: true })
  await steady.focus()
  // Radix selects on deferred focus while the arrow key is held.
  await page.keyboard.down("ArrowDown")
  await expect(
    page.getByRole("radio", { name: "Swift pace", exact: true })
  ).toBeChecked()
  await page.keyboard.up("ArrowDown")
  await page
    .getByRole("switch", { name: "Share itinerary", exact: true })
    .click()
  await page
    .getByLabel("Journey notes", { exact: true })
    .fill("旅の記録 / River road")
  await page
    .getByRole("button", { name: "Apply journey settings", exact: true })
    .click()
  const values = JSON.parse(await page.getByRole("status").textContent())
  assert.deepEqual(values, {
    notes: "旅の記録 / River road",
    provisions: "packed",
    pace: "swift",
    share: "on",
  })
  await expect(
    page.getByRole("checkbox", { name: "Archived supplies", exact: true })
  ).toBeDisabled()
  await expect(
    page.getByRole("switch", { name: "Cloud sharing unavailable", exact: true })
  ).toBeDisabled()
  await expect(
    page.getByRole("separator", { name: "Vertical rule", exact: true })
  ).toHaveAttribute("aria-orientation", "vertical")
  await expect(
    page.getByRole("link", { name: "Open settings", exact: true })
  ).toHaveAttribute("href", "#settings")
  await page.goto(
    new URL(
      "overlays.html",
      process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
    ).href
  )
  const select = page.getByRole("combobox", {
    name: "Destination",
    exact: true,
  })
  await select.focus()
  await page.keyboard.press("Space")
  await expect(
    page.getByRole("option", { name: "Northreach", exact: true })
  ).toBeFocused()
  await page.keyboard.press("w")
  await expect(
    page.getByRole("option", { name: "Willowmere", exact: true })
  ).toBeFocused()
  await page.keyboard.press("Enter")
  await expect(select).toHaveText("Willowmere")
  await expect(select).toBeFocused()
  await page
    .getByRole("button", { name: "Save destination", exact: true })
    .click()
  await expect(page.getByRole("status")).toHaveText(
    "Destination submitted: willowmere."
  )
  await page
    .getByRole("button", { name: "Plan destination in dialog", exact: true })
    .click()
  const nestedSelect = page.getByRole("combobox", {
    name: "Dialog destination",
    exact: true,
  })
  await nestedSelect.click()
  await expect(page.getByRole("listbox")).toHaveCSS(
    "background-color",
    "rgb(36, 40, 45)"
  )
  await page.getByRole("option", { name: "Eastbank", exact: true }).click()
  await expect(nestedSelect).toHaveText("Eastbank")
  await expect(nestedSelect).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(
    page.getByRole("button", {
      name: "Plan destination in dialog",
      exact: true,
    })
  ).toBeFocused()
  const journal = page.getByRole("tab", { name: "Journal", exact: true })
  await journal.focus()
  await page.keyboard.press("ArrowRight")
  await expect(
    page.getByRole("tab", { name: "Supplies", exact: true })
  ).toHaveAttribute("aria-selected", "true")
  await page.keyboard.press("ArrowRight")
  await expect(journal).toBeFocused()
  const riverTab = page.getByRole("tab", { name: "River", exact: true })
  const ridgeTab = page.getByRole("tab", { name: "Ridge", exact: true })
  await riverTab.focus()
  await page.keyboard.press("ArrowDown")
  await expect(ridgeTab).toBeFocused()
  await expect(riverTab).toHaveAttribute("aria-selected", "true")
  await page.keyboard.press("Enter")
  await expect(ridgeTab).toHaveAttribute("aria-selected", "true")
  const archive = page.getByRole("button", {
    name: "Archive journey",
    exact: true,
  })
  await archive.click()
  await expect(
    page.getByRole("button", { name: "Keep journey", exact: true })
  ).toBeFocused()
  await page
    .locator("[data-slot=alert-dialog-overlay]")
    .click({ position: { x: 1, y: 1 } })
  await expect(page.getByRole("alertdialog")).toBeVisible()
  // Outside pointer interaction may blur to body; Tab re-enters the focus trap.
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("button", { name: "Keep journey", exact: true })
  ).toBeFocused()
  await page.keyboard.press("Tab")
  await page.keyboard.press("Tab")
  await expect(
    page.getByRole("button", { name: "Keep journey", exact: true })
  ).toBeFocused()
  await page.keyboard.press("Escape")
  await expect(page.getByRole("alertdialog")).toBeHidden()
  await expect(archive).toBeFocused()
  await archive.click()
  await page
    .getByRole("button", { name: "Confirm archive", exact: true })
    .click()
  await expect(page.getByRole("status")).toHaveText("Journey archived.")
  await page
    .getByRole("button", { name: "Open small alert", exact: true })
    .click()
  await page.getByRole("button", { name: "Rest", exact: true }).click()
  await expect(page.getByRole("status")).toHaveText("Camp prepared.")
  const edit = page.getByRole("button", { name: "Edit waypoint", exact: true })
  await edit.click()
  await expect(page.getByLabel("Waypoint name", { exact: true })).toBeFocused()
  await page.getByLabel("Waypoint name", { exact: true }).fill("Eastbank ferry")
  await page.getByRole("button", { name: "Save waypoint", exact: true }).click()
  await expect(edit).toBeFocused()
  await edit.click()
  await page.keyboard.press("Escape")
  await expect(edit).toBeFocused()
  const tip = page.getByRole("button", { name: "Travel note", exact: true })
  await tip.focus()
  await expect(page.getByRole("tooltip")).toHaveText(
    "The old ferry takes foot passengers."
  )
  await page.keyboard.press("Escape")
  await expect(page.getByRole("tooltip")).toBeHidden()
  await expect(tip).toBeFocused()
  await page.goto(
    new URL(
      "inventory.html",
      process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
    ).href
  )
  const meter = page.getByRole("progressbar", {
    name: "Supplies packed",
    exact: true,
  })
  await expect(meter).toHaveAttribute("aria-valuenow", "2")
  await expect(meter).toHaveAttribute("aria-valuemax", "4")
  const fill = meter.locator("[data-slot=progress-indicator]")
  assert.ok(
    await fill.evaluate(
      (el) =>
        Math.abs(
          new DOMMatrix(getComputedStyle(el).transform).m41 / el.clientWidth +
            0.5
        ) < 0.01
    )
  )
  await page
    .getByRole("checkbox", { name: "Pack Dried orchard fruit", exact: true })
    .click()
  await expect(meter).toHaveAttribute("aria-valuenow", "3")
  await page
    .getByRole("checkbox", { name: "Pack Wool travelling cloak", exact: true })
    .click()
  await expect(meter).toHaveAttribute("data-state", "complete")
  await expect(
    page.getByRole("progressbar", { name: "Empty meter", exact: true })
  ).toHaveAttribute("aria-valuenow", "0")
  const pending = page.getByRole("progressbar", {
    name: "Weather report loading",
    exact: true,
  })
  await expect(pending).toHaveAttribute("data-state", "indeterminate")
  assert.equal(await pending.getAttribute("aria-valuenow"), null)
  const vertical = page
    .getByRole("region", { name: "Route log", exact: true })
    .locator("[data-slot=scroll-area-viewport]")
  await vertical.focus()
  await page.keyboard.press("End")
  await expect
    .poll(() => vertical.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(0)
  await page.setViewportSize({ width: 320, height: 800 })
  const tableRegion = page.getByRole("region", {
    name: "Supply ledger scrolling area",
    exact: true,
  })
  await tableRegion.focus()
  await page.keyboard.press("ArrowRight")
  await expect
    .poll(() => tableRegion.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0)
  const horizontal = page
    .getByRole("region", { name: "Horizontal route", exact: true })
    .locator("[data-slot=scroll-area-viewport]")
  await horizontal.focus()
  await page.keyboard.press("ArrowRight")
  await expect
    .poll(() => horizontal.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0)
  await page.goto(
    new URL(
      "catalog.html",
      process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
    ).href
  )
  await page
    .getByLabel("Find a component or export", { exact: true })
    .fill("CardTitle")
  await expect(page.getByRole("status")).toHaveText("1 of 61 components")
  await expect(
    page.getByRole("link", { name: "Open examples", exact: true })
  ).toHaveAttribute("href", "./index.html#card")
  await page.getByText("Exact component source", { exact: true }).click()
  await expect(page.getByLabel("card source", { exact: true })).toContainText(
    "function CardTitle"
  )
  await page
    .getByLabel("Find a component or export", { exact: true })
    .fill("does-not-exist")
  await expect(
    page.getByText("No matching components. Try a shorter name.")
  ).toBeVisible()
  assert.deepEqual(errors, [])
  console.log(
    `Traveler component contracts, forms, keyboard menus, nested portals and focus restoration passed (${browserName} ${await browser.version()}).`
  )
} finally {
  await browser.close()
}
