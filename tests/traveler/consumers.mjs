import assert from "node:assert/strict"
import { spawn, spawnSync } from "node:child_process"
import { createHash } from "node:crypto"
import {
  closeSync,
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  openSync,
  readdirSync,
  readFileSync,
  writeFileSync,
} from "node:fs"
import { createRequire } from "node:module"
import { createServer } from "node:net"
import { tmpdir } from "node:os"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const repo = fileURLToPath(new URL("../../", import.meta.url))
const require = createRequire(
  new URL("../../packages/react/package.json", import.meta.url)
)
const { chromium } = require("playwright")
const { expect } = require("playwright/test")
const registryUrl =
  process.env.TRAVELER_REGISTRY_URL ||
  "http://127.0.0.1:4173/r/v0.1.0-dev/{name}.json"
const cli = join(repo, "packages/shadcn/dist/index.js")
const registry = JSON.parse(
  readFileSync(join(repo, "apps/v4/registry/traveler/registry.json"), "utf8")
)
const items = registry.items
  .filter((item) => item.type === "registry:ui")
  .map((item) => `@traveler/${item.name}`)
const workspace = mkdtempSync(join(tmpdir(), "traveler-consumers-"))
console.log(`Isolated consumers: ${workspace}`)
const evidence = { cli: "4.21.0", workspace, registryUrl, consumers: [] }
const env = {
  ...process.env,
  NEXT_TELEMETRY_DISABLED: "1",
  NO_COLOR: "1",
  npm_config_offline: "false",
}
const browser = await chromium.launch({ headless: true })
const hash = (value) => createHash("sha256").update(value).digest("hex")
function write(root, name, value) {
  const path = join(root, name)
  mkdirSync(dirname(path), { recursive: true })
  writeFileSync(
    path,
    typeof value === "string" ? value : JSON.stringify(value, null, 2) + "\n"
  )
}
function run(root, name, command, args, input) {
  console.log(`${root.split("/").at(-1)}: ${name}`)
  const result = spawnSync(command, args, {
    cwd: root,
    env,
    encoding: "utf8",
    input,
    timeout: 180000,
    maxBuffer: 8 * 1024 * 1024,
  })
  write(
    root,
    `logs/${name}.log`,
    `${result.stdout || ""}${result.stderr || ""}`
  )
  assert.equal(
    result.status,
    0,
    `${name} failed: ${result.error || ""}\n${result.stdout}\n${result.stderr}`
  )
  return `${result.stdout}${result.stderr}`
}
async function freePort() {
  const server = createServer()
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve))
  const port = server.address().port
  await new Promise((resolve) => server.close(resolve))
  return port
}
async function serve(root, framework, production, callback) {
  const port = await freePort(),
    url = `http://127.0.0.1:${port}`
  const command =
    framework === "vite"
      ? [
          "exec",
          "vite",
          ...(production ? ["preview"] : []),
          "--host",
          "127.0.0.1",
          "--port",
          String(port),
          "--strictPort",
        ]
      : [
          "exec",
          "next",
          production ? "start" : "dev",
          "--hostname",
          "127.0.0.1",
          "--port",
          String(port),
          ...(!production ? ["--webpack"] : []),
        ]
  const output = openSync(
    join(root, `logs/${production ? "production" : "development"}-server.log`),
    "w"
  )
  const child = spawn("pnpm", command, {
    cwd: root,
    env,
    stdio: ["ignore", output, output],
    detached: true,
  })
  try {
    for (let attempt = 0; attempt < 120; attempt++) {
      try {
        const response = await fetch(url)
        if (response.ok) break
      } catch {}
      if (child.exitCode !== null) throw new Error("Consumer server exited")
      if (attempt === 119) throw new Error("Consumer server did not start")
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    await callback(url)
  } finally {
    try {
      process.kill(-child.pid, "SIGTERM")
    } catch {}
    closeSync(output)
  }
}
try {
  for (const framework of ["vite", "next"]) {
    const root = join(workspace, framework),
      src = framework === "vite" ? "src" : "",
      cssPath = framework === "vite" ? "src/index.css" : "app/globals.css"
    mkdirSync(root, { recursive: true })
    const pkg = {
      name: `traveler-${framework}-consumer`,
      version: "0.0.0",
      private: true,
      type: "module",
      packageManager: "pnpm@10.33.4",
      scripts: {
        build:
          framework === "vite"
            ? "tsc --noEmit && vite build"
            : "next build --webpack",
      },
      dependencies: {
        react: "19.2.3",
        "react-dom": "19.2.3",
        ...(framework === "next" ? { next: "16.3.3" } : {}),
      },
      devDependencies: {
        "@tailwindcss/postcss": "4.3.0",
        tailwindcss: "4.3.0",
        postcss: "8.5.23",
        typescript: "5.9.2",
        "@types/react": "19.2.2",
        "@types/react-dom": "19.2.2",
        "@types/node": "20.19.10",
        ...(framework === "vite" ? { vite: "7.3.2" } : {}),
      },
    }
    write(root, "package.json", pkg)
    write(root, "tsconfig.json", {
      compilerOptions: {
        target: "ES2020",
        lib: ["DOM", "DOM.Iterable", "ES2020"],
        jsx: "react-jsx",
        module: "ESNext",
        moduleResolution: "bundler",
        strict: true,
        skipLibCheck: true,
        esModuleInterop: true,
        resolveJsonModule: true,
        noEmit: true,
        paths: { "@fixture/*": [framework === "vite" ? "./src/*" : "./*"] },
      },
      include: ["**/*.ts", "**/*.tsx"],
      exclude: ["node_modules"],
    })
    write(
      root,
      "postcss.config.mjs",
      'export default {plugins:{"@tailwindcss/postcss":{}}}\n'
    )
    write(root, "components.json", {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "new-york",
      rsc: framework === "next",
      tsx: true,
      tailwind: {
        config: "",
        css: cssPath,
        baseColor: "neutral",
        cssVariables: true,
        prefix: "",
      },
      aliases: {
        components: "@fixture/components",
        ui: "@fixture/components/ui",
        utils: "@fixture/lib/utils",
        lib: "@fixture/lib",
        hooks: "@fixture/hooks",
      },
      registries: { "@traveler": registryUrl },
      iconLibrary: "lucide",
    })
    // The host supplies its normal semantic utility bridge; foundation supplies the theme.
    const preview = readFileSync(
      join(repo, "apps/v4/registry/traveler/examples/preview.css"),
      "utf8"
    )
    const bridge = preview.slice(preview.indexOf("@custom-variant"))
    write(root, cssPath, '@import "tailwindcss";\n' + bridge)
    if (framework === "vite") {
      write(
        root,
        "vite.config.ts",
        'import {defineConfig} from "vite";import {fileURLToPath} from "node:url";export default defineConfig({resolve:{alias:{"@fixture":fileURLToPath(new URL("./src",import.meta.url))}}})\n'
      )
      write(
        root,
        "index.html",
        '<html lang="en" class="dark" data-ui-theme="traveler"><head><meta name="viewport" content="width=device-width, initial-scale=1"/><title>Traveler consumer</title></head><body class="bg-background text-foreground font-sans"><div id="root"></div><script type="module" src="/src/main.tsx"></script></body></html>'
      )
      write(
        root,
        "src/main.tsx",
        'import {createRoot} from "react-dom/client";import Consumer from "./consumer";import "./index.css";createRoot(document.getElementById("root")!).render(<Consumer/>);\n'
      )
    } else {
      write(
        root,
        "app/layout.tsx",
        'import "./globals.css";export default function Layout({children}:{children:React.ReactNode}) {return <html lang="en" className="dark" data-ui-theme="traveler"><body className="bg-background text-foreground font-sans">{children}</body></html>}\n'
      )
      write(
        root,
        "app/page.tsx",
        'import Consumer from "../consumer";import {Card,CardContent} from "@fixture/components/ui/card";export default function Page(){return <><Card><CardContent>Server-rendered Traveler panel</CardContent></Card><Consumer/></>}\n'
      )
    }
    write(
      root,
      join(src, "consumer.tsx"),
      readFileSync(new URL("fixtures/consumer.tsx", import.meta.url), "utf8")
    )
    run(root, "host-install", "pnpm", ["install", "--ignore-scripts"])
    const previewOutput = run(root, "install-dry-run", "node", [
      cli,
      "add",
      "@traveler/dialog",
      "--dry-run",
    ])
    assert.match(previewOutput, /button\.tsx/)
    assert.equal(existsSync(join(root, src, "components/ui/dialog.tsx")), false)
    run(root, "transitive-dialog-install", "node", [
      cli,
      "add",
      "@traveler/dialog",
      "--yes",
    ])
    assert.ok(
      readFileSync(
        join(root, src, "components/ui/button.tsx"),
        "utf8"
      ).includes("trav-control")
    )
    assert.ok(
      readFileSync(
        join(root, src, "components/ui/dialog.tsx"),
        "utf8"
      ).includes('"@fixture/components/ui/button"')
    )
    // CLI 4.21.0 uses a stateful /g regex for removing client directives.
    // Bulk non-RSC transforms can differ from a single-item install. Decline
    // replacement of existing files; validate complete install and stable hashes.
    run(
      root,
      "remaining-components-install",
      "node",
      [cli, "add", ...items, "--yes"],
      "n\n".repeat(items.length)
    )
    const ui = join(root, src, "components/ui")
    assert.equal(
      readdirSync(ui).filter((name) => name.endsWith(".tsx")).length,
      items.length
    )
    assert.equal(
      readFileSync(join(root, src, "hooks/use-mobile.ts"), "utf8").trim(),
      readFileSync(
        join(repo, "apps/v4/registry/traveler/hooks/use-mobile.ts"),
        "utf8"
      ).trim()
    )
    assert.ok(
      readFileSync(
        join(root, src, "components/ui/sidebar.tsx"),
        "utf8"
      ).includes('"@fixture/hooks/use-mobile"')
    )
    assert.equal(
      readFileSync(join(root, "styles/traveler.css"), "utf8"),
      readFileSync(
        join(repo, "apps/v4/registry/traveler/styles/theme.css"),
        "utf8"
      )
    )
    assert.equal(
      readFileSync(join(root, "licenses/traveler/LICENSE.md"), "utf8"),
      readFileSync(join(repo, "LICENSE.md"), "utf8")
    )
    write(
      root,
      cssPath,
      readFileSync(join(root, cssPath), "utf8").replace(
        '@import "tailwindcss";',
        '@import "tailwindcss";\n@import "../styles/traveler.css";'
      )
    )
    const before = Object.fromEntries(
      readdirSync(ui).map((name) => [name, hash(readFileSync(join(ui, name)))])
    )
    run(
      root,
      "identical-reinstall",
      "node",
      [cli, "add", ...items, "--yes"],
      "n\n".repeat(items.length)
    )
    assert.deepEqual(
      Object.fromEntries(
        readdirSync(ui).map((name) => [
          name,
          hash(readFileSync(join(ui, name))),
        ])
      ),
      before
    )
    const original = readFileSync(join(ui, "button.tsx"), "utf8"),
      customized = original.replace(
        '"trav-control ',
        '"consumer-custom trav-control '
      )
    assert.notEqual(customized, original)
    write(root, join(src, "components/ui/button.tsx"), customized)
    write(root, "backup/button.tsx", original)
    const packageBefore = readFileSync(join(root, "package.json"), "utf8")
    const diff = run(root, "customized-diff", "node", [
      cli,
      "add",
      "@traveler/button",
      "--diff",
      "button.tsx",
    ])
    assert.match(diff, /consumer-custom/)
    assert.equal(readFileSync(join(ui, "button.tsx"), "utf8"), customized)
    assert.equal(
      readFileSync(join(root, "package.json"), "utf8"),
      packageBefore
    )
    run(
      root,
      "decline-overwrite",
      "node",
      [cli, "add", "@traveler/button", "--yes"],
      "n\n"
    )
    assert.equal(readFileSync(join(ui, "button.tsx"), "utf8"), customized)
    write(root, join(src, "components/ui/button.tsx"), original)
    run(root, "production-build", "pnpm", ["run", "build"])
    const results = {
      framework,
      versions: JSON.parse(readFileSync(join(root, "package.json"), "utf8")),
      installedComponents: items.length,
      transitiveDialog: true,
      identicalReinstall: true,
      clientDirectiveDrift:
        framework === "vite"
          ? "CLI 4.21.0 non-RSC regex drift; overwrite declined"
          : "not applicable",
      customizedFilePreserved: true,
      cssSha256: hash(readFileSync(join(root, "styles/traveler.css"))),
      lockSha256: hash(readFileSync(join(root, "pnpm-lock.yaml"))),
      checks: [],
    }
    for (const production of [false, true])
      await serve(root, framework, production, async (url) => {
        const context = await browser.newContext({
            viewport: { width: 1024, height: 900 },
            reducedMotion: "reduce",
          }),
          page = await context.newPage(),
          errors = [],
          external = []
        page.on("pageerror", (error) => errors.push(error.message))
        page.on("console", (message) => {
          if (message.type() === "error") errors.push(message.text())
        })
        page.on("request", (request) => {
          if (
            !request.url().startsWith(url) &&
            !request.url().startsWith("data:")
          )
            external.push(request.url())
        })
        const response = await page.goto(url, { waitUntil: "networkidle" })
        if (framework === "next")
          assert.match(await response.text(), /Server-rendered Traveler panel/)
        // A streamed Next page can be visible before React attaches events.
        await expect(page.locator("main")).toHaveAttribute(
          "data-hydrated",
          "true"
        )
        const button = page.getByRole("button", {
          name: "Record progress",
          exact: true,
        })
        await expect(button).toHaveCSS("background-color", "rgb(228, 220, 203)")
        await button.click()
        await expect(page.locator("#recorded-progress")).toHaveText(
          "Recorded 1"
        )
        await page
          .getByRole("button", { name: "Open journey", exact: true })
          .click()
        await expect(page.getByRole("dialog")).toHaveCSS(
          "background-color",
          "rgb(27, 30, 33)"
        )
        await page
          .getByRole("combobox", { name: "Destination", exact: true })
          .click()
        await expect(page.getByRole("listbox")).toHaveCSS(
          "background-color",
          "rgb(36, 40, 45)"
        )
        await page
          .getByRole("option", { name: "Willowmere", exact: true })
          .click()
        await expect(
          page.getByRole("combobox", { name: "Destination", exact: true })
        ).toHaveText("Willowmere")
        await page.keyboard.press("Escape")
        await expect(
          page.getByRole("button", { name: "Open journey", exact: true })
        ).toBeFocused()
        await page
          .getByRole("button", { name: "Route notes", exact: true })
          .click()
        await expect(
          page.getByText("Installed disclosure content.", { exact: true })
        ).toBeVisible()
        await page
          .getByRole("button", { name: "Shelter details", exact: true })
          .click()
        await expect(
          page.getByText("Installed collapsible content.", { exact: true })
        ).toBeVisible()
        await expect(page.locator("main").getByRole("alert")).toHaveCSS(
          "background-color",
          "rgb(27, 30, 33)"
        )
        await expect(
          page.getByRole("status", { name: "Loading route", exact: true })
        ).toHaveCSS("animation-name", "none")
        await page.getByLabel("Terrain", { exact: true }).selectOption("river")
        await expect(page.getByLabel("Terrain", { exact: true })).toHaveValue(
          "river"
        )
        await page
          .getByRole("slider", { name: "Daily distance", exact: true })
          .focus()
        await page.keyboard.press("ArrowRight")
        await expect(
          page.getByRole("slider", { name: "Daily distance", exact: true })
        ).toHaveAttribute("aria-valuenow", "35")
        await page
          .getByRole("button", { name: "Pin route", exact: true })
          .click()
        await expect(
          page.getByRole("button", { name: "Pin route", exact: true })
        ).toHaveAttribute("aria-pressed", "true")
        await page
          .getByRole("button", { name: "Save consumer profile", exact: true })
          .click()
        await expect(
          page.getByLabel("Consumer profile name", { exact: true })
        ).toHaveAttribute("aria-invalid", "true")
        await page
          .getByLabel("Consumer profile name", { exact: true })
          .fill("Ari")
        await page
          .getByRole("button", { name: "Save consumer profile", exact: true })
          .click()
        await expect(page.locator("#consumer-profile")).toHaveText("Ari")
        await page.getByText("Summary addon", { exact: true }).click()
        await expect(
          page.getByLabel("Consumer summary", { exact: true })
        ).toBeFocused()
        await page
          .getByLabel("Consumer courier code", { exact: true })
          .fill("1234")
        await expect(
          page.getByLabel("Consumer courier code", { exact: true })
        ).toHaveValue("1234")
        const commandTrigger = page.getByRole("button", {
          name: "Open consumer commands",
          exact: true,
        })
        await commandTrigger.click()
        await expect(
          page.getByRole("dialog", { name: "Consumer commands", exact: true })
        ).toBeVisible()
        await page.keyboard.press("Escape")
        await expect(commandTrigger).toBeFocused()
        const sheetTrigger = page.getByRole("button", {
          name: "Open consumer sheet",
          exact: true,
        })
        await sheetTrigger.click()
        await expect(
          page.getByRole("dialog", { name: "Consumer sheet", exact: true })
        ).toBeVisible()
        await page.keyboard.press("Escape")
        await expect(sheetTrigger).toBeFocused()
        await page
          .getByRole("button", { name: "Open consumer drawer", exact: true })
          .click()
        await expect(
          page.getByRole("dialog", { name: "Consumer drawer", exact: true })
        ).toBeVisible()
        await page
          .getByRole("button", { name: "Close consumer drawer", exact: true })
          .click()
        await expect(page.getByRole("dialog")).toBeHidden()
        await expect(
          page.getByRole("button", { name: "Consumer journal", exact: true })
        ).toBeVisible()
        await page
          .locator('[data-slot=calendar] button[data-day="9/22/2026"]')
          .click()
        await expect(page.locator("#consumer-date")).toHaveText("22")
        const consumerCarousel = page.getByRole("region", {
          name: "Consumer stops",
          exact: true,
        })
        await consumerCarousel
          .getByRole("button", { name: "Next slide", exact: true })
          .click()
        await expect(
          consumerCarousel.getByRole("button", {
            name: "Previous slide",
            exact: true,
          })
        ).toBeEnabled()
        await page
          .getByRole("button", { name: "Notify consumer", exact: true })
          .click()
        await expect(page.locator("[data-sonner-toast]")).toContainText(
          "Consumer map saved"
        )
        const consumerTranscript = page.getByRole("region", {
          name: "Consumer transcript",
          exact: true,
        })
        await expect
          .poll(() => consumerTranscript.evaluate((el) => el.scrollTop))
          .toBeGreaterThan(0)
        await page
          .locator("[data-slot=message-scroller-button][data-direction=start]")
          .click()
        await expect
          .poll(() => consumerTranscript.evaluate((el) => el.scrollTop))
          .toBe(0)
        assert.deepEqual(errors, [])
        assert.deepEqual(external, [])
        results.checks.push(
          `${production ? "production" : "development"}: interaction, portal tokens, focus return, no errors/external requests${framework === "next" ? ", SSR/hydration" : ""}`
        )
        await context.close()
      })
    evidence.consumers.push(results)
    const output = join(repo, ".codex-artifacts/traveler/consumers", framework)
    mkdirSync(output, { recursive: true })
    cpSync(join(root, "logs"), join(output, "logs"), { recursive: true })
    cpSync(join(root, "pnpm-lock.yaml"), join(output, "pnpm-lock.yaml"))
    console.log(
      `${framework}: clean installation, production build and browser checks passed`
    )
  }
  write(repo, ".codex-artifacts/traveler/consumers/evidence.json", evidence)
  console.log(`Consumer evidence: ${workspace}`)
} finally {
  await browser.close()
}
