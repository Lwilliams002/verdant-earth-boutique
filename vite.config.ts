// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - tanstackStart, viteReact, tailwindcss, tsConfigPaths, nitro (build-only using cloudflare as a default target),
//     componentTagger (dev-only), VITE_* env injection, @ path alias, React/TanStack dedupe,
//     error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const prerenderedPages = [
  "/",
  "/about",
  "/journal",
  "/shop",
  "/shop/gut-tonic",
  "/shop/sleep-drops",
  "/shop/hibiscus-bloom-soap",
  "/shop/milk-honey-body-butter",
];

const githubPagesBase = process.env.GITHUB_PAGES === "true" ? "/verdant-earth-boutique" : undefined;

export default defineConfig({
  vite: {
    base: githubPagesBase ? `${githubPagesBase}/` : "/",
  },
  tanstackStart: {
    router: {
      basepath: githubPagesBase,
    },
  },
});
