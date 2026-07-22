/**
 * Static pre-render script for GitHub Pages deployment.
 * Drives the built SSR server to produce HTML files for each route,
 * placing them in dist/client/ so GitHub Pages can serve them directly.
 */
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE = process.env.GITHUB_PAGES === "true" ? "/verdant-earth-boutique" : "";

const pages = [
  "/",
  "/about",
  "/journal",
  "/shop",
  "/shop/gut-tonic",
  "/shop/sleep-drops",
  "/shop/hibiscus-bloom-soap",
  "/shop/milk-honey-body-butter",
];

// Dynamically import the built SSR server (ESM)
const { default: server } = await import("./node_modules/.nitro/vite/services/ssr/index.js");

let failed = false;

for (const page of pages) {
  const url = `https://example.com${BASE}${page}`;
  try {
    const request = new Request(url, {
      headers: { accept: "text/html" },
    });
    const response = await server.fetch(request, {}, {});
    const html = await response.text();

    if (response.status >= 400) {
      console.error(`✗ ${page} — server returned ${response.status}`);
      failed = true;
      continue;
    }

    let outputPath;
    if (page === "/") {
      outputPath = join(__dirname, ".output/public/index.html");
    } else {
      outputPath = join(__dirname, `.output/public${page}/index.html`);
      mkdirSync(dirname(outputPath), { recursive: true });
    }

    writeFileSync(outputPath, html, "utf-8");
    console.log(`✓ ${page}`);
  } catch (err) {
    console.error(`✗ ${page} — ${err.message}`);
    failed = true;
  }
}

// Also create a 404.html that redirects to the SPA root
// This handles any routes GitHub Pages can't find directly
const notFoundHtml = `<!doctype html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Redirecting…</title>
    <script>
      // GitHub Pages SPA redirect trick
      var base = '${BASE}';
      var path = window.location.pathname.replace(base, '') || '/';
      var search = window.location.search;
      var hash = window.location.hash;
      window.location.replace(
        base + '/?redirect=' + encodeURIComponent(path + search) + hash
      );
    </script>
  </head>
  <body>Redirecting…</body>
</html>`;

writeFileSync(join(__dirname, ".output/public/404.html"), notFoundHtml, "utf-8");
console.log("✓ 404.html (redirect stub)");

if (failed) {
  console.error("\nSome pages failed to pre-render.");
  process.exit(1);
}

console.log("\nPre-rendering complete ✓");




