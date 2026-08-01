/**
 * Static pre-render script for GitHub Pages deployment.
 * Drives the built SSR server to produce HTML files for each route,
 * placing them in dist/client/ so GitHub Pages can serve them directly.
 */
import { existsSync, mkdirSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const BASE = "";

const staticPages = [
  "/",
  "/about",
  "/gallery",
  "/shop",
];

const fallbackProductPages = [
  "/shop/earth-balm-botanical-skin-balm-2oz",
  "/shop/moon-balm-lavender-botanical-balm-2-0z",
];

async function getShopifyProductPages() {
  try {
    const response = await fetch("https://ndkugy-pp.myshopify.com/api/2025-07/graphql.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": "176743865361306f1c0d7655ccd125a9",
      },
      body: JSON.stringify({
        query: `query GetProductHandles { products(first: 100) { edges { node { handle } } } }`,
      }),
    });

    if (!response.ok) throw new Error(`Shopify returned ${response.status}`);
    const data = await response.json();
    const handles = data?.data?.products?.edges?.map((edge) => edge?.node?.handle).filter(Boolean) ?? [];
    return handles.map((handle) => `/shop/${handle}`);
  } catch (error) {
    console.warn(`Could not fetch Shopify product handles; using fallback product pages. ${error.message}`);
    return fallbackProductPages;
  }
}

const pages = [...new Set([...staticPages, ...(await getShopifyProductPages())])];

// Dynamically import the built SSR server (ESM)
const { default: server } = await import("./node_modules/.nitro/vite/services/ssr/index.js");

let failed = false;

// Ensure the output directory exists before writing any files
mkdirSync(join(__dirname, ".output/public"), { recursive: true });

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

// Also create a 404.html that serves the SPA shell so client-side routing
// can handle any path GitHub Pages can't find directly (e.g. dynamic product slugs).
// Reusing the prerendered homepage HTML ensures the SPA bootstrap assets load
// under the correct base path, then TanStack Router resolves the real route.
const { readFileSync } = await import("fs");
const notFoundHtml = readFileSync(
  join(__dirname, ".output/public/index.html"),
  "utf-8"
);

writeFileSync(join(__dirname, ".output/public/404.html"), notFoundHtml, "utf-8");
console.log("✓ 404.html (redirect stub)");

if (failed) {
  console.error("\nSome pages failed to pre-render.");
  process.exit(1);
}

console.log("\nPre-rendering complete ✓");




