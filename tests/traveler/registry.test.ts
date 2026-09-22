import { readdirSync, readFileSync } from "node:fs"
import { expect, it } from "vitest"

import registry from "../../apps/v4/registry/traveler/registry.json"
import coverage from "../../docs/traveler/component-coverage.json"
import {
  registryItemSchema,
  registrySchema,
} from "../../packages/shadcn/dist/schema/index.js"

it("ships schema-valid, source-exact payloads with only explicit themed dependencies", () => {
  const parsed = registrySchema.parse(registry)
  const names = parsed.items.map((item) => item.name)
  expect(coverage.components).toHaveLength(61)
  expect(
    parsed.items.filter((item) => item.type === "registry:ui")
  ).toHaveLength(60)
  expect(
    coverage.components
      .filter((item) => item.status === "deferred")
      .map((item) => item.name)
  ).toEqual(["combobox"])
  expect(
    coverage.components
      .filter((item) => item.status === "prototype")
      .map((item) => item.name)
      .sort()
  ).toEqual(
    parsed.items
      .filter((item) => item.type === "registry:ui")
      .map((item) => item.name)
      .sort()
  )
  expect(coverage.components.every((item) => item.requiredStates?.length)).toBe(
    true
  )
  expect(names).not.toContain("combobox")
  for (const composition of coverage.compositions) {
    expect(composition.status).toBe("prototype")
    for (const dependency of composition.dependencies)
      expect(names).toContain(dependency)
  }

  const root = "apps/v4/registry/traveler"
  const built = `${root}/public/r/v0.1.0-dev`
  expect(
    parsed.items
      .filter((item) => item.type === "registry:ui")
      .map((item) => item.name)
      .sort()
  ).toEqual(
    readdirSync(`${root}/ui`)
      .map((name) => name.replace(/\.tsx$/, ""))
      .sort()
  )
  expect(JSON.parse(readFileSync(`${built}/registry.json`, "utf8"))).toEqual(
    registry
  )
  for (const item of parsed.items) {
    const payload = registryItemSchema.parse(
      JSON.parse(readFileSync(`${built}/${item.name}.json`, "utf8"))
    )
    expect(payload).toMatchObject(item)
    for (const file of payload.files ?? []) {
      expect(file.content, file.path).toBe(
        readFileSync(`apps/v4/${file.path}`, "utf8")
      )
      if (file.type !== "registry:ui") continue
      const upstream = coverage.components.find(
        (component) => component.name === item.name
      )!
      const exported = [...file.content!.matchAll(/export \{([^}]+)\}/g)]
        .flatMap((match) =>
          match[1]
            .split(",")
            .map((name) => name.trim().replace(/^type\s+/, ""))
            .filter(Boolean)
        )
        .concat(
          [...file.content!.matchAll(/export type (\w+)/g)].map(
            (match) => match[1]
          )
        )
        .sort()
      expect(exported, item.name).toEqual(upstream.exports)
      const imports = [...file.content!.matchAll(/from "([^"]+)"/g)].map(
        (match) => match[1]
      )
      expect(imports.filter((name) => name.includes("new-york"))).toEqual([])
      for (const dependency of imports.filter((name) =>
        name.startsWith("@/registry/traveler/")
      )) {
        expect(item.registryDependencies).toContain(
          `@traveler/${dependency.split("/").at(-1)}`
        )
      }
      for (const dependency of imports.filter(
        (name) => !name.startsWith("@/") && name !== "react"
      )) {
        expect(
          item.dependencies?.some((value) =>
            value.startsWith(
              `${dependency.startsWith("@") ? dependency.split("/").slice(0, 2).join("/") : dependency.split("/")[0]}@`
            )
          ),
          `${item.name}: ${dependency}`
        ).toBe(true)
      }
      expect(item.registryDependencies).toContain("@traveler/foundation")
    }
    for (const dependency of item.registryDependencies ?? []) {
      expect(dependency).toMatch(/^@traveler\//)
      expect(names).toContain(dependency.replace("@traveler/", ""))
    }
  }
  const foundation = parsed.items.find((item) => item.name === "foundation")!
  expect(foundation.files?.map((file) => file.target)).toEqual([
    "~/styles/traveler.css",
    "~/licenses/traveler/LICENSE.md",
  ])
  expect(readFileSync(`${root}/LICENSE.md`, "utf8")).toBe(
    readFileSync("LICENSE.md", "utf8")
  )
})

it("verifies every byte of the pinned local registry snapshot", async () => {
  const { createHash } = await import("node:crypto")
  for (const manifestFile of [
    "docs/traveler/release-candidates/mvp.json",
    "docs/traveler/release-candidate.json",
  ]) {
    const manifest = JSON.parse(readFileSync(manifestFile, "utf8"))
    const names = Object.keys(manifest.files).sort()
    const hashes = Object.fromEntries(
      names.map((name) => [
        name,
        createHash("sha256")
          .update(
            readFileSync(
              `apps/v4/registry/traveler/public/${manifest.path.replace("{name}.json", name)}`
            )
          )
          .digest("hex"),
      ])
    )
    expect(hashes).toEqual(manifest.files)
    expect(
      createHash("sha256").update(JSON.stringify(hashes)).digest("hex")
    ).toBe(manifest.digest)
    expect(manifest.path).toBe(`r/sha256-${manifest.digest}/{name}.json`)
  }
})
