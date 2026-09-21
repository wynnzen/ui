import assert from "node:assert/strict"
import { createHash } from "node:crypto"
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { fileURLToPath } from "node:url"

const root = new URL(
  "../../apps/v4/registry/traveler/public/r/",
  import.meta.url
)
const source = new URL("v0.1.0-dev/", root)
const files = readdirSync(source)
  .sort()
  .map((name) => ({ name, bytes: readFileSync(new URL(name, source)) }))
const hashes = Object.fromEntries(
  files.map(({ name, bytes }) => [
    name,
    createHash("sha256").update(bytes).digest("hex"),
  ])
)
const digest = createHash("sha256").update(JSON.stringify(hashes)).digest("hex")
const target = new URL(`sha256-${digest}/`, root)
mkdirSync(target, { recursive: true })
for (const { name, bytes } of files) {
  const path = new URL(name, target)
  if (existsSync(path))
    assert.ok(
      readFileSync(path).equals(bytes),
      `Refusing to change pinned payload ${name}`
    )
  else writeFileSync(path, bytes, { flag: "wx" })
}
assert.deepEqual(
  readdirSync(target).sort(),
  files.map((file) => file.name)
)
const manifest = {
  status: "local development snapshot; release approval pending",
  digest,
  path: `r/sha256-${digest}/{name}.json`,
  files: hashes,
}
const output = new URL("../../.codex-artifacts/traveler/", import.meta.url)
mkdirSync(output, { recursive: true })
writeFileSync(
  new URL("release-candidate.json", output),
  JSON.stringify(manifest, null, 2) + "\n"
)
console.log(`Pinned ${files.length} files at ${fileURLToPath(target)}`)
console.log(
  "Existing pinned bytes are never overwritten. Publication remains separate."
)
