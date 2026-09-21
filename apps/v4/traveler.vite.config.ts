import { fileURLToPath } from "node:url"
import { defineConfig } from "vite"

const appRoot = fileURLToPath(new URL(".", import.meta.url))

export default defineConfig({
  root: `${appRoot}registry/traveler/examples`,
  resolve: {
    alias: { "@": appRoot },
    dedupe: ["react", "react-dom"],
  },
  css: { postcss: appRoot },
  server: { host: "127.0.0.1", port: 4173, strictPort: true },
  preview: { host: "127.0.0.1", port: 4173, strictPort: true },
  build: {
    outDir: `${appRoot}build/traveler`,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        catalog: `${appRoot}registry/traveler/examples/catalog.html`,
        inventory: `${appRoot}registry/traveler/examples/inventory.html`,
        overlays: `${appRoot}registry/traveler/examples/overlays.html`,
        forms: `${appRoot}registry/traveler/examples/forms.html`,
        traveler: `${appRoot}registry/traveler/examples/index.html`,
        baseline: `${appRoot}registry/traveler/examples/baseline.html`,
      },
    },
  },
})
