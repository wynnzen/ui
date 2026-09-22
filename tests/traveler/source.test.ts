import { createHash } from "node:crypto"
import { readdirSync, readFileSync } from "node:fs"
import { expect, it } from "vitest"

import coverage from "../../docs/traveler/component-coverage.json"

it("freezes every canonical baseline component without modifying upstream source", () => {
  const sourceRoot = "apps/v4/registry/new-york-v4/ui"
  expect(coverage.components.map((item) => `${item.name}.tsx`).sort()).toEqual(
    readdirSync(sourceRoot)
      .filter((name) => name.endsWith(".tsx"))
      .sort()
  )
  for (const helper of coverage.supportingHelpers) {
    const source = readFileSync(helper.upstreamSource, "utf8")
    expect(createHash("sha256").update(source).digest("hex"), helper.name).toBe(
      helper.sourceSha256
    )
    expect(
      readFileSync(`apps/v4/registry/traveler/hooks/${helper.name}.ts`, "utf8")
    ).toBe(source)
  }
  for (const item of coverage.components) {
    const source = readFileSync(item.upstreamSource, "utf8")
    expect(createHash("sha256").update(source).digest("hex"), item.name).toBe(
      item.sourceSha256
    )
    expect(item.exports.length, item.name).toBeGreaterThan(0)
    expect(item.upstreamCommit).toBe(coverage.upstreamCommit)
  }
})
