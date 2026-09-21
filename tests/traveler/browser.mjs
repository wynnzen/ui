import assert from "node:assert/strict"
import { createRequire } from "node:module"

// Reuse the browser dependency already owned by the workspace's React tests.
const require = createRequire(
  new URL("../../packages/react/package.json", import.meta.url)
)
const { chromium } = require("playwright")
const { expect } = require("playwright/test")
const browser = await chromium.launch({ headless: true })
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
  assert.deepEqual(errors, [])
  console.log(
    `Traveler five-component contracts, forms, keyboard menus, nested portals and focus restoration passed (${await browser.version()}).`
  )
} finally {
  await browser.close()
}
