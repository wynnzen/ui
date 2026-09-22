import assert from "node:assert/strict"

export async function checkAdvanced(page, expect) {
  const url = process.env.TRAVELER_URL || "http://127.0.0.1:4173/"
  await page.goto(new URL("advanced.html", url).href, {
    waitUntil: "networkidle",
  })
  await page.setViewportSize({ width: 1440, height: 1000 })
  const calendars = page.locator("#calendar [data-slot=calendar]")
  await calendars.last().locator('button[data-day="9/22/2026"]').click()
  await expect(page.locator("#multiple-result")).toHaveText("2 rest days")
  await calendars
    .first()
    .locator('button[data-day="9/6/2026"]')
    .isDisabled()
    .then(assert.ok)
  await calendars.first().locator('button[data-day="9/22/2026"]').click()
  await calendars.first().locator('button[data-day="9/25/2026"]').click()
  await expect(page.locator("#range-result")).toHaveText(
    "September 21, 2026 — September 25, 2026"
  )
  await calendars
    .first()
    .getByRole("combobox", { name: /month/i })
    .selectOption({ label: "Oct" })
  await expect(calendars.first().getByRole("grid")).toHaveAttribute(
    "aria-label",
    "October 2026"
  )
  const dateTrigger = page.locator("#departure")
  await dateTrigger.click()
  await expect(
    page.locator('[data-slot=popover-content] button[data-day="9/21/2026"]')
  ).toBeFocused()
  await page.keyboard.press("ArrowRight")
  await page.keyboard.press("Enter")
  await expect(dateTrigger).toBeFocused()
  await expect(dateTrigger).toHaveText("September 22, 2026")
  await page
    .getByRole("button", { name: "Record departure", exact: true })
    .click()
  await expect(page.locator("#date-result")).toHaveText("Recorded: 2026-09-22")
  await dateTrigger.click()
  await page.keyboard.press("Escape")
  await expect(dateTrigger).toBeFocused()

  await page
    .getByRole("checkbox", { name: "Select Old bridge", exact: true })
    .check()
  await expect(page.locator("#table-result")).toContainText("1 selected")
  await page.getByRole("button", { name: "Next routes", exact: true }).click()
  await expect(page.locator("#table-result")).toContainText("Page 2 of 2")
  await page.getByRole("button", { name: "Distance ↑", exact: true }).click()
  await expect(page.locator("#data-table tbody tr").first()).toContainText(
    "North pass"
  )
  await page.getByLabel("Filter routes", { exact: true }).fill("Willow")
  await expect(page.locator("#data-table tbody tr")).toHaveCount(1)
  await expect(page.locator("#data-table tbody")).toContainText("Willowmere")
  await page.getByLabel("Filter routes", { exact: true }).fill("no-match")
  await expect(
    page.getByText("No routes match your filter.", { exact: true })
  ).toBeVisible()
  await page.getByLabel("Filter routes", { exact: true }).fill("")
  await page
    .getByRole("button", { name: "Show loading state", exact: true })
    .click()
  await expect(page.getByText("Loading routes…", { exact: true })).toBeVisible()
  await page
    .getByRole("button", { name: "Finish loading", exact: true })
    .click()

  const horizontal = page.getByRole("region", {
    name: "Route stops",
    exact: true,
  })
  await expect(
    horizontal.getByRole("button", { name: "Previous slide", exact: true })
  ).toBeDisabled()
  const note = page.getByLabel("Slide note", { exact: true })
  await note.focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#horizontal-slide")).toHaveText("Stop 1 of 3")
  await horizontal.focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#horizontal-slide")).toHaveText("Stop 2 of 3")
  await horizontal
    .getByRole("button", { name: "Next slide", exact: true })
    .click()
  await expect(page.locator("#horizontal-slide")).toHaveText("Stop 3 of 3")
  await expect(
    horizontal.getByRole("button", { name: "Next slide", exact: true })
  ).toBeDisabled()
  const vertical = page.getByRole("region", {
    name: "Trail notes",
    exact: true,
  })
  await vertical.focus()
  await page.keyboard.press("ArrowDown")
  await expect(page.locator("#vertical-slide")).toHaveText("Stop 2 of 3")
  await page.keyboard.press("ArrowUp")
  await expect(page.locator("#vertical-slide")).toHaveText("Stop 1 of 3")

  const chart = page.locator("#chart .recharts-surface").first()
  await expect(
    page.locator("#chart .recharts-cartesian-axis-tick-value").first()
  ).toHaveCSS("fill", "rgb(185, 179, 167)")
  await chart.scrollIntoViewIfNeeded()
  await chart.focus()
  await page.keyboard.press("ArrowRight")
  await expect(page.locator("#chart .recharts-tooltip-wrapper")).toBeVisible()
  await expect(page.locator("#chart .recharts-tooltip-wrapper")).toContainText(
    "Walked (km)"
  )
  for (const indicator of ["line", "dashed", "dot"]) {
    await page
      .getByLabel("Tooltip marker", { exact: true })
      .selectOption(indicator)
    await chart.focus()
    await page.keyboard.press("ArrowRight")
    await expect(
      page.locator("#chart .recharts-tooltip-wrapper")
    ).toContainText("Planned (km)")
  }
  await page
    .getByRole("checkbox", { name: "Hide legend icons", exact: true })
    .check()
  await expect(
    page.locator("#chart .recharts-legend-wrapper [aria-hidden=true]")
  ).toHaveCount(0)
  const divider = page.getByRole("separator", {
    name: "Resize map and notes",
    exact: true,
  })
  await divider.focus()
  const before = Number(await divider.getAttribute("aria-valuenow"))
  await page.keyboard.press("ArrowRight")
  await expect
    .poll(async () => Number(await divider.getAttribute("aria-valuenow")))
    .toBeGreaterThan(before)
  const verticalDivider = page.getByRole("separator", {
    name: "Resize morning and evening",
    exact: true,
  })
  await verticalDivider.focus()
  const previous = Number(await verticalDivider.getAttribute("aria-valuenow"))
  await page.keyboard.press("ArrowDown")
  await expect
    .poll(async () =>
      Number(await verticalDivider.getAttribute("aria-valuenow"))
    )
    .toBeGreaterThan(previous)

  await page
    .getByRole("button", { name: "Save with undo", exact: true })
    .click()
  await page.getByRole("button", { name: "Undo save", exact: true }).click()
  await expect(page.locator("#toast-result")).toHaveText("Save undone.")
  await page.getByRole("button", { name: "Start copying", exact: true }).click()
  await expect(
    page.locator("[data-sonner-toast][data-type=loading]")
  ).toContainText("Copying map…")
  await page
    .getByRole("button", { name: "Finish copying", exact: true })
    .click()
  await expect(
    page.locator("[data-sonner-toast][data-type=success]")
  ).toContainText("Map copied")
  await page
    .getByRole("button", { name: "Dismiss notices", exact: true })
    .click()
  await expect(page.locator("[data-sonner-toast]")).toHaveCount(0)
  for (const kind of ["success", "info", "warning", "error"]) {
    await page
      .getByRole("button", { name: `${kind} notice`, exact: true })
      .click()
    await expect(
      page.locator(`[data-sonner-toast][data-type=${kind}]`)
    ).toContainText(`${kind}: route notice`)
    await page
      .getByRole("button", { name: "Dismiss notices", exact: true })
      .click()
    await expect(
      page.locator(`[data-sonner-toast][data-type=${kind}]`)
    ).toHaveCount(0)
  }

  await page.goto(new URL("conversation.html", url).href, {
    waitUntil: "networkidle",
  })
  await page
    .getByRole("button", { name: "Retry map upload", exact: true })
    .click()
  await expect(
    page.getByText("Retry complete · 4 KB", { exact: true })
  ).toBeVisible()
  await page
    .getByRole("button", { name: "Open river map", exact: true })
    .click()
  await expect(page.locator("#attachment-result")).toHaveText(
    "River map opened locally."
  )
  await page
    .getByRole("button", { name: "Remove river map", exact: true })
    .click()
  await expect(
    page.getByRole("button", { name: "Open river map", exact: true })
  ).toHaveCount(0)
  await expect(
    page.getByRole("button", { name: "Unavailable map", exact: true })
  ).toBeDisabled()
  await page
    .getByRole("button", { name: "Appreciate note, 2 reactions", exact: true })
    .click()
  await expect(
    page.getByRole("button", {
      name: "Appreciate note, 3 reactions",
      exact: true,
    })
  ).toBeVisible()
  const bottomReaction = await page
    .locator("[data-slot=bubble-reactions][data-side=bottom]")
    .boundingBox()
  const topReaction = await page
    .locator("[data-slot=bubble-reactions][data-side=top]")
    .boundingBox()
  assert.ok(
    bottomReaction.y + bottomReaction.height <= topReaction.y,
    "Adjacent reactions must not overlap"
  )
  await page
    .getByRole("button", { name: "Copy this route note", exact: true })
    .click()
  await expect(page.locator("#attachment-result")).toHaveText(
    "Message copied locally."
  )
  const transcript = page.getByRole("region", {
    name: "Route transcript",
    exact: true,
  })
  await transcript.scrollIntoViewIfNeeded()
  const atEnd = () =>
    transcript.evaluate(
      (el) => Math.abs(el.scrollHeight - el.clientHeight - el.scrollTop) < 3
    )
  await expect.poll(atEnd).toBe(true)
  await page
    .getByRole("button", { name: "Append route report", exact: true })
    .click()
  await expect(page.locator("#entry-count")).toHaveText("25 journal entries")
  await expect.poll(atEnd).toBe(true)
  await page
    .locator("[data-slot=message-scroller-button][data-direction=start]")
    .click()
  await expect.poll(() => transcript.evaluate((el) => el.scrollTop)).toBe(0)
  await page
    .getByRole("button", { name: "Append route report", exact: true })
    .click()
  await expect(page.locator("#entry-count")).toHaveText("26 journal entries")
  await expect.poll(() => transcript.evaluate((el) => el.scrollTop)).toBe(0)
  await page
    .getByRole("button", { name: "Load earlier note", exact: true })
    .click()
  await expect(page.locator("#entry-count")).toHaveText("27 journal entries")
  await page
    .getByRole("button", { name: "Jump to note 12", exact: true })
    .click()
  await expect
    .poll(() => transcript.evaluate((el) => el.scrollTop))
    .toBeGreaterThan(100)
  await expect(page.locator("#scroll-state")).toContainText("12")
  await page
    .locator("[data-slot=message-scroller-button][data-direction=end]")
    .click()
  await expect.poll(atEnd).toBe(true)
  await page
    .getByLabel("New local note", { exact: true })
    .fill("旅の記録 — next crossing")
  await page
    .getByRole("button", { name: "Add to journal", exact: true })
    .click()
  await expect(page.locator("#entry-count")).toHaveText("28 journal entries")
  await expect.poll(atEnd).toBe(true)
  await expect(page.getByLabel("New local note", { exact: true })).toHaveValue(
    ""
  )
}
