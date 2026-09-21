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
  const root = "apps/v4/registry/traveler"
  const built = `${root}/public/r/v0.1.0-dev`
  expect(names.filter((name) => name !== "foundation").sort()).toEqual(
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
            .map((name) => name.trim())
            .filter(Boolean)
        )
        .sort()
      expect(exported, item.name).toEqual(upstream.exports)
      const imports = [...file.content!.matchAll(/from "([^"]+)"/g)].map(
        (match) => match[1]
      )
      expect(imports.filter((name) => name.includes("new-york"))).toEqual([])
      for (const dependency of imports.filter((name) =>
        name.startsWith("@/registry/traveler/ui/")
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
            value.startsWith(`${dependency}@`)
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
