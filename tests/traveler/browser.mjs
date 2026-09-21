import assert from "node:assert/strict"
import { createRequire } from "node:module"

// Reuse the browser dependency already owned by the workspace's React tests.
const require = createRequire(
  new URL("../../packages/react/package.json", import.meta.url)
)
const { chromium } = require("playwright")
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
    await page.getByRole("status").textContent(),
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
  assert.deepEqual(errors, [])
  console.log(
    `Traveler Button keyboard, native disabled/link semantics, theme activation and consumer overrides passed (${await browser.version()}).`
  )
} finally {
  await browser.close()
}
