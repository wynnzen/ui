import { readFileSync } from "node:fs"
import { gzipSync } from "node:zlib"
import { expect, it } from "vitest"

const css = readFileSync("apps/v4/registry/traveler/styles/theme.css", "utf8")
const tokens = Object.fromEntries(
  [...css.matchAll(/(--[\w-]+):\s*(#[0-9a-f]{6});/gi)].map((match) => [
    match[1],
    match[2],
  ])
)

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/../g)!
    .map((part) => {
      const value = parseInt(part, 16) / 255
      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
    })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

it("keeps opaque text pairs and required control/focus indicators readable", () => {
  const pairs: [string, string, number][] = [
    ["foreground", "background", 4.5],
    ["card-foreground", "card", 4.5],
    ["popover-foreground", "popover", 4.5],
    ["primary-foreground", "primary", 4.5],
    ["secondary-foreground", "secondary", 4.5],
    ["accent-foreground", "accent", 4.5],
    ["muted-foreground", "background", 4.5],
    ["muted-foreground", "card", 4.5],
    ["muted-foreground", "popover", 4.5],
    ["muted-foreground", "accent", 4.5],
    ["destructive-foreground", "destructive", 4.5],
    ["destructive", "accent", 4.5],
    ["trav-success-foreground", "trav-success", 4.5],
    ["input", "background", 3],
    ["input", "card", 3],
    ["input", "popover", 3],
    ["ring", "background", 3],
    ["ring", "card", 3],
    ["ring", "popover", 3],
  ]
  for (const [foreground, background, minimum] of pairs) {
    const values = [
      luminance(tokens[`--${foreground}`]),
      luminance(tokens[`--${background}`]),
    ].sort((a, b) => a - b)
    expect(
      (values[1] + 0.05) / (values[0] + 0.05),
      `${foreground} on ${background}`
    ).toBeGreaterThanOrEqual(minimum)
  }
})

it("keeps the shared theme within the 20 KiB compressed CSS budget", () => {
  expect(gzipSync(css).byteLength).toBeLessThanOrEqual(20 * 1024)
})
