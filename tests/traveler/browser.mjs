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
      "disclosure.html",
      process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
    ).href
  )
  const road = page.getByRole("button", {
    name: "Which road is open?",
    exact: true,
  })
  await expect(road).toHaveAttribute("aria-expanded", "true")
  await road.focus()
  await page.keyboard.press("Enter")
  await expect(road).toHaveAttribute("aria-expanded", "false")
  await page.keyboard.press("ArrowDown")
  await expect(
    page.getByRole("button", { name: "Where can the party rest", exact: false })
  ).toBeFocused()
  await page.keyboard.press("End")
  await expect(
    page.getByRole("button", { name: "Where can the party rest", exact: false })
  ).toBeFocused()
  await page.keyboard.press("Home")
  await expect(road).toBeFocused()
  await expect(
    page.getByRole("button", {
      name: "Winter trail · unavailable",
      exact: true,
    })
  ).toBeDisabled()
  await page.getByRole("button", { name: "Supply notes", exact: true }).click()
  await expect(
    page.getByRole("button", { name: "Weather notes", exact: true })
  ).toHaveAttribute("aria-expanded", "true")
  await expect(page.locator("#accordion [role=status]")).toHaveText(
    "Open notes: weather, supplies"
  )
  await page
    .getByRole("button", { name: "Show shelter details", exact: true })
    .click()
  await expect(
    page.getByText("Three bunks, a covered hearth", { exact: false })
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Hide shelter details", exact: true })
    .press("Space")
  await expect(
    page.getByText("Three bunks, a covered hearth", { exact: false })
  ).toBeHidden()
  await page.getByRole("button", { name: "Visitor note", exact: true }).click()
  await expect(
    page.getByText("Leave the shelter ready for the next traveller.")
  ).toBeHidden()
  await expect(
    page.getByRole("button", { name: "Locked archive", exact: true })
  ).toBeDisabled()
  await expect(page.getByTestId("reading-direction")).toHaveText(
    "Primitive direction: rtl"
  )
  await page.getByRole("tab", { name: "Route", exact: true }).focus()
  await page.keyboard.press("ArrowLeft")
  await expect(
    page.getByRole("tab", { name: "Camp", exact: true })
  ).toBeFocused()
  await expect(
    page.getByRole("tab", { name: "Camp", exact: true })
  ).toHaveAttribute("aria-selected", "true")
  for (const [index, ratio] of [
    [0, 16 / 9],
    [1, 1],
  ]) {
    const bounds = await page
      .locator("[data-slot=aspect-ratio]")
      .nth(index)
      .boundingBox()
    assert.ok(Math.abs(bounds.width / bounds.height - ratio) < 0.02)
  }
  await expect(
    page.getByRole("status", { name: "Loading", exact: true })
  ).toHaveCSS("animation-name", "none")
  await expect(
    page.getByRole("status", { name: "Fetching weather", exact: true })
  ).toHaveCSS("width", "24px")
  await expect(page.locator("[data-slot=skeleton]").first()).toHaveCSS(
    "animation-name",
    "none"
  )
  await page.goto(
    new URL(
      "content.html",
      process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
    ).href
  )
  for (const [size, width] of [
    ["sm", 24],
    ["default", 32],
    ["lg", 40],
  ]) {
    const avatar = page
      .locator(`#avatar [data-slot=avatar][data-size=${size}]`)
      .first()
    await expect(avatar).toHaveCSS("width", `${width}px`)
    await expect(avatar.locator("img")).toBeVisible()
  }
  await expect(
    page.locator("[data-slot=avatar-fallback]").filter({ hasText: "MI" })
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Show hidden route levels", exact: true })
    .click()
  await expect(page.locator("#breadcrumb [role=status]")).toContainText(
    "Current season"
  )
  await page.getByRole("button", { name: "Add note", exact: true }).click()
  await expect(page.locator("#button-group output")).toHaveText(
    "Notes: 1. Facing north."
  )
  await page.getByRole("button", { name: "Face east", exact: true }).click()
  await expect(page.locator("#button-group output")).toHaveText(
    "Notes: 1. Facing east."
  )
  await page
    .getByRole("button", { name: "Record a route", exact: true })
    .click()
  await expect(page.locator("#button-group output")).toHaveText(
    "Notes: 2. Facing east."
  )
  await page
    .getByRole("button", { name: "Keyboard hint", exact: true })
    .scrollIntoViewIfNeeded()
  // Radix dismisses tooltips on scroll; let the explicit scroll finish first.
  await page.evaluate(
    () =>
      new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve))
      )
  )
  await page.getByRole("button", { name: "Keyboard hint", exact: true }).focus()
  await expect(page.getByRole("tooltip")).toBeVisible()
  await expect(
    page.locator("[data-slot=tooltip-content] > [data-slot=kbd]")
  ).toHaveCSS("color", "rgb(242, 238, 229)")
  await page.keyboard.press("Escape")
  await page.getByLabel("Travel pace", { exact: true }).selectOption("swift")
  await expect(page.getByLabel("Travel pace", { exact: true })).toHaveValue(
    "swift"
  )
  await expect(page.getByLabel("Unavailable", { exact: true })).toBeDisabled()
  const distanceSlider = page.getByRole("slider", {
    name: "Daily distance",
    exact: true,
  })
  await distanceSlider.focus()
  await page.keyboard.press("ArrowRight")
  await expect(distanceSlider).toHaveAttribute("aria-valuenow", "35")
  await expect(page.locator("#slider output")).toHaveText(
    "Distance: 35 km; committed: 35 km."
  )
  await page.keyboard.press("End")
  await expect(distanceSlider).toHaveAttribute("aria-valuenow", "100")
  await page.keyboard.press("Home")
  await expect(distanceSlider).toHaveAttribute("aria-valuenow", "0")
  await page.getByRole("slider", { name: "Range limit 1", exact: true }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(
    page.getByRole("slider", { name: "Range limit 1", exact: true })
  ).toHaveAttribute("aria-valuenow", "25")
  await page.getByRole("slider", { name: "Elevation", exact: true }).focus()
  await page.keyboard.press("ArrowUp")
  await expect(
    page.getByRole("slider", { name: "Elevation", exact: true })
  ).toHaveAttribute("aria-valuenow", "41")
  await expect(
    page.getByRole("slider", { name: "Unavailable distance", exact: true })
  ).not.toHaveAttribute("tabindex", "0")
  await expect(
    page.getByRole("slider", { name: "Invalid distance", exact: true })
  ).toHaveAttribute("aria-invalid", "true")
  await page
    .getByRole("button", { name: "Save travel controls", exact: true })
    .click()
  const travelValues = JSON.parse(
    await page.locator("#travel-values").textContent()
  )
  assert.ok(
    travelValues.some(([key, value]) => key === "pace" && value === "swift")
  )
  assert.deepEqual(
    travelValues.filter(([key]) => key === "range[]").map(([, value]) => value),
    ["25", "70"]
  )
  await page
    .getByRole("button", { name: "Pin journal", exact: true })
    .press("Space")
  await expect(
    page.getByRole("button", { name: "Pin journal", exact: true })
  ).toHaveAttribute("aria-pressed", "true")
  await expect(
    page.getByRole("button", { name: "Unavailable pin", exact: true })
  ).toBeDisabled()
  await page.getByRole("button", { name: "Roads", exact: true }).focus()
  await page.keyboard.press("ArrowRight")
  await expect(
    page.getByRole("button", { name: "Rivers", exact: true })
  ).toBeFocused()
  await page.keyboard.press("Space")
  await expect(page.locator("#toggle-group output")).toHaveText(
    "Layers: roads, rivers."
  )
  const near = page
    .locator("#toggle-group [data-slot=toggle-group-item]")
    .filter({ hasText: /^Near$/ })
  const far = page
    .locator("#toggle-group [data-slot=toggle-group-item]")
    .filter({ hasText: /^Far$/ })
  await near.focus()
  await page.keyboard.press("ArrowDown")
  await expect(far).toBeFocused()
  assert.ok((await far.boundingBox()).y > (await near.boundingBox()).y)
  await page.getByRole("link", { name: "Page 2", exact: true }).click()
  await expect(
    page.getByRole("link", { name: "Page 2", exact: true })
  ).toHaveAttribute("aria-current", "page")
  await expect(page.locator("#pagination output")).toHaveText("Journal page 2.")
  await page.goto(
    new URL(
      "advanced-forms.html",
      process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
    ).href
  )
  const profileName = page.getByLabel("Traveller name", { exact: true })
  await page
    .getByRole("button", { name: "Save traveller profile", exact: true })
    .click()
  await expect(profileName).toHaveAttribute("aria-invalid", "true")
  await expect(profileName).toBeFocused()
  const profileId = await profileName.getAttribute("id")
  await expect(profileName).toHaveAttribute(
    "aria-describedby",
    `${profileId}-description ${profileId}-message`
  )
  await expect(page.getByTestId("form-field-state")).toHaveText(
    "Field nickname: invalid."
  )
  await profileName.fill("A")
  await expect(
    page.getByText("Use at least two characters.", { exact: true })
  ).toBeVisible()
  await profileName.fill("Ari")
  await page
    .getByLabel("Profile notes", { exact: true })
    .fill("渡河前に地図を確認する。")
  await expect(
    page.getByLabel("Home region · readonly", { exact: true })
  ).not.toBeEditable()
  await expect(
    page.getByLabel("Permit · disabled", { exact: true })
  ).toBeDisabled()
  await page
    .getByRole("button", { name: "Save traveller profile", exact: true })
    .click()
  await expect
    .poll(async () =>
      JSON.parse(await page.locator("#profile-result").textContent())
    )
    .toEqual({
      nickname: "Ari",
      notes: "渡河前に地図を確認する。",
      region: "North Hollow",
    })
  await page.getByRole("button", { name: "Reset profile", exact: true }).click()
  await expect(profileName).toHaveValue("")
  await expect(profileName).toHaveAttribute("aria-invalid", "false")
  await expect(page.locator("#delivery-errors li")).toHaveCount(2)
  await page
    .getByRole("checkbox", { name: "Include a weather report", exact: true })
    .uncheck()
  await page
    .getByRole("button", { name: "Save delivery preferences", exact: true })
    .click()
  assert.ok(
    !JSON.parse(await page.locator("#delivery-result").textContent()).some(
      ([key]) => key === "weather"
    )
  )
  await page.getByText("Journal summary", { exact: true }).click()
  await expect(page.getByLabel("Route summary", { exact: true })).toBeFocused()
  await expect(page.locator("#summary-group")).toHaveCSS(
    "outline-color",
    "rgb(194, 215, 232)"
  )
  await page
    .getByLabel("Route summary", { exact: true })
    .fill("A new route note.")
  await page.getByRole("button", { name: "Save summary", exact: true }).click()
  await expect(page.locator("#command-result")).toHaveText(
    "Saved summary: A new route note."
  )
  const clearQuery = page.getByRole("button", {
    name: "Clear route query",
    exact: true,
  })
  await clearQuery.click()
  await expect(clearQuery).toBeFocused()
  await expect(page.getByLabel("Route query", { exact: true })).toHaveValue("")
  await expect(
    page.getByLabel("Disabled route", { exact: true })
  ).toBeDisabled()
  const courierCode = page.getByLabel("Courier code", { exact: true })
  await courierCode.pressSequentially("12a3456")
  await expect(courierCode).toHaveValue("123456")
  await expect(page.locator("#otp-complete")).toHaveText(
    "Last complete code: 123456."
  )
  await courierCode.press("Backspace")
  await expect(courierCode).toHaveValue("12345")
  await courierCode.fill("")
  await courierCode.evaluate((el) => {
    const data = new DataTransfer()
    data.setData("text/plain", "654-321")
    // Firefox discards constructor clipboardData on untrusted ClipboardEvents.
    // Supply the synthetic handler payload explicitly; this is not an OS clipboard test.
    const event = new Event("paste", { bubbles: true, cancelable: true })
    Object.defineProperty(event, "clipboardData", { value: data })
    el.dispatchEvent(event)
  })
  await expect(courierCode).toHaveValue("654321")
  await page
    .getByRole("button", { name: "Record courier code", exact: true })
    .click()
  await expect(page.locator("#otp-result")).toHaveText("Recorded code: 654321.")
  await expect(page.getByLabel("Locked code", { exact: true })).toBeDisabled()
  const commandInput = page.getByRole("combobox", {
    name: "Journey commands",
    exact: true,
  })
  await commandInput.fill("lantern")
  await page.keyboard.press("Enter")
  await expect(page.locator("#command-result")).toHaveText("Selected: lantern.")
  await commandInput.fill("no-route-matches-this")
  await expect(
    page.getByText("No matching journey commands.", { exact: true })
  ).toBeVisible()
  await commandInput.fill("")
  await expect(
    page.getByRole("option", { name: "Closed ferry", exact: true })
  ).toHaveAttribute("aria-disabled", "true")
  const commandTrigger = page.getByRole("button", {
    name: "Open command palette",
    exact: true,
  })
  await commandTrigger.click()
  await expect(
    page.getByRole("dialog", { name: "Command Palette", exact: true })
  ).toBeVisible()
  await expect(
    page.getByRole("combobox", { name: "Command Palette", exact: true })
  ).toBeFocused()
  await page.keyboard.press("End")
  await expect(
    page.getByRole("option", { name: "Route 24", exact: true })
  ).toHaveAttribute("aria-selected", "true")
  await expect
    .poll(() =>
      page
        .getByRole("dialog")
        .locator("[data-slot=command-list]")
        .evaluate((el) => el.scrollTop)
    )
    .toBeGreaterThan(0)
  await page.keyboard.press("Enter")
  await expect(page.getByRole("dialog")).toBeHidden()
  await expect(commandTrigger).toBeFocused()
  await commandTrigger.click()
  await page.keyboard.press("Escape")
  await expect(commandTrigger).toBeFocused()
  const quickTrigger = page.getByRole("button", {
    name: "Open quick search",
    exact: true,
  })
  await quickTrigger.click()
  await expect(
    page.getByRole("dialog", { name: "Quick route search", exact: true })
  ).toBeVisible()
  await expect(
    page.getByRole("button", { name: "Close", exact: true })
  ).toHaveCount(0)
  await page.keyboard.press("Escape")
  await expect(quickTrigger).toBeFocused()
  const destinationPicker = page.getByRole("combobox", {
    name: "Destination picker",
    exact: true,
  })
  await destinationPicker.click()
  await page
    .getByRole("combobox", { name: "Destination choices", exact: true })
    .fill("Willow")
  await page.keyboard.press("Enter")
  await expect(destinationPicker).toHaveText("Willowmere")
  await expect(destinationPicker).toBeFocused()
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
