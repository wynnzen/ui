import assert from "node:assert/strict"
import { spawnSync } from "node:child_process"
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  symlinkSync,
  writeFileSync,
} from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import { fileURLToPath } from "node:url"
import { gzipSync } from "node:zlib"

const repo = fileURLToPath(new URL("../../", import.meta.url))
const root = mkdtempSync(join(tmpdir(), "traveler-bundle-"))
const theme = readFileSync(
  join(repo, "apps/v4/registry/traveler/styles/theme.css")
)
const report = {
  tool: "Vite 7.3.2 / production minification, hidden source maps excluded",
  foundation: { bytes: theme.length, gzipBytes: gzipSync(theme).length },
  cases: [],
}
// Measurement only: reuse installed packages while isolating sources and CSS scans.
mkdirSync(join(root, "node_modules"))
for (const name of [
  "react",
  "react-dom",
  "cn",
  "radix-ui",
  "class-variance-authority",
  "@tailwindcss/postcss",
  "tailwindcss",
]) {
  const target = join(root, "node_modules", name)
  mkdirSync(join(target, ".."), { recursive: true })
  symlinkSync(join(repo, "apps/v4/node_modules", name), target)
}
writeFileSync(join(root, "package.json"), '{"type":"module"}')
writeFileSync(
  join(root, "postcss.config.mjs"),
  'export default {plugins:{"@tailwindcss/postcss":{}}}'
)
const preview = readFileSync(
  join(repo, "apps/v4/registry/traveler/examples/preview.css"),
  "utf8"
)
const bridge = preview.slice(preview.indexOf("@custom-variant"))
for (const name of ["baseline", "traveler"]) {
  const sourceRoot = `apps/v4/registry/${name === "baseline" ? "new-york-v4" : "traveler"}/ui`
  const source = readFileSync(join(repo, sourceRoot, "button.tsx"), "utf8")
  writeFileSync(join(root, "button.tsx"), source)
  writeFileSync(join(root, "theme.css"), name === "traveler" ? theme : "")
  writeFileSync(
    join(root, "main.tsx"),
    'import React from "react";import {createRoot} from "react-dom/client";import {Button} from "./button";import "./style.css";createRoot(document.getElementById("root")!).render(<Button>Continue</Button>);'
  )
  writeFileSync(
    join(root, "index.html"),
    '<html><body><div id="root"></div><script type="module" src="/main.tsx"></script></body></html>'
  )
  writeFileSync(
    join(root, "style.css"),
    '@import "tailwindcss" source(none);\n@import "./theme.css";\n@source "./button.tsx";\n@source "./main.tsx";\n' +
      bridge
  )
  const result = spawnSync(
    "node",
    [
      join(
        fileURLToPath(new URL("../../node_modules/vite", import.meta.url)),
        "bin/vite.js"
      ),
      "build",
      root,
      "--sourcemap",
      "hidden",
      "--logLevel",
      "error",
    ],
    { cwd: root, encoding: "utf8" }
  )
  assert.equal(result.status, 0, `${result.stdout}\n${result.stderr}`)
  const assets = join(root, "dist/assets"),
    files = readdirSync(assets),
    sizes = {}
  for (const extension of ["js", "css"]) {
    const bytes = files
      .filter((file) => file.endsWith(`.${extension}`))
      .map((file) => readFileSync(join(assets, file)))
    sizes[extension] = {
      bytes: bytes.reduce((total, value) => total + value.length, 0),
      gzipBytes: bytes.reduce(
        (total, value) => total + gzipSync(value).length,
        0
      ),
    }
  }
  const sources = files
    .filter((file) => file.endsWith(".js.map"))
    .flatMap(
      (file) => JSON.parse(readFileSync(join(assets, file), "utf8")).sources
    )
  assert.equal(
    sources.filter((source) => source.endsWith("button.tsx")).length,
    1
  )
  assert.equal(
    sources.some((source) => source.includes("registry/traveler/examples")),
    false
  )
  assert.equal(
    sources.some((source) =>
      /\/(dialog|select|dropdown-menu|tooltip)\.tsx$/.test(source)
    ),
    false
  )
  report.cases.push({
    name,
    ...sizes,
    sourceModules: sources.length,
    otherComponentsBundled: false,
  })
}
report.delta = {
  jsGzipBytes: report.cases[1].js.gzipBytes - report.cases[0].js.gzipBytes,
  cssGzipBytes: report.cases[1].css.gzipBytes - report.cases[0].css.gzipBytes,
}
assert.ok(report.foundation.gzipBytes <= 20 * 1024)
const output = join(repo, ".codex-artifacts/traveler")
mkdirSync(output, { recursive: true })
writeFileSync(
  join(output, "performance.json"),
  JSON.stringify(report, null, 2) + "\n"
)
console.log(JSON.stringify(report, null, 2))
