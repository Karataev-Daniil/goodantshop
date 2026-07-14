// Пост-билд пререндер мета-тегов.
// Боты соцсетей/мессенджеров не исполняют JS и берут «сырой» HTML. Этот скрипт
// после `vite build` создаёт по index.html на каждый маршрут с его собственными
// title / description / og:image, чтобы превью ссылки было правильным на любой
// странице. Картинки для OG приводятся к jpg 1200×630 (совместимо с FB/VK).
import esbuild from "esbuild";
import sharp from "sharp";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(dirname, "..");
const dist = path.join(root, "dist");
const SITE_URL = "https://goodantshop.md";
const assetRe = /\.(webp|jpe?g|png|svg|ico|gif|avif)$/i;
const reactStub = /^(react|react-dom|react\/jsx-runtime|react\/jsx-dev-runtime|react-helmet-async)$/;

// --- 1. Собираем маршруты: бандлим routes.mjs с заглушками, чтобы он выполнился
//        в Node (ассеты -> путь к файлу, react/helmet -> пустышки) ---
const built = await esbuild.build({
  entryPoints: [path.join(root, "scripts/routes.mjs")],
  bundle: true,
  format: "esm",
  platform: "node",
  jsx: "automatic",
  write: false,
  plugins: [
    {
      name: "prerender-stubs",
      setup(build) {
        build.onResolve({ filter: assetRe }, (args) => ({
          path: path.resolve(args.resolveDir, args.path),
          namespace: "asset",
        }));
        build.onLoad({ filter: /.*/, namespace: "asset" }, (args) => ({
          contents: `export default ${JSON.stringify(args.path)};`,
          loader: "js",
        }));
        build.onResolve({ filter: reactStub }, (args) => ({
          path: args.path,
          namespace: "stub",
        }));
        build.onLoad({ filter: /.*/, namespace: "stub" }, () => ({
          contents:
            "export const Helmet=()=>null;export const HelmetProvider=(p)=>p&&p.children;" +
            "export const jsx=()=>null;export const jsxs=()=>null;export const Fragment=null;export default {};",
          loader: "js",
        }));
      },
    },
  ],
});

const cacheDir = path.join(root, "node_modules", ".cache");
await mkdir(cacheDir, { recursive: true });
const bundlePath = path.join(cacheDir, "prerender-routes.mjs");
await writeFile(bundlePath, built.outputFiles[0].text, "utf8");
const { routes } = await import(pathToFileURL(bundlePath).href);

// --- 2. OG-картинки (jpg 1200×630) ---
const ogDir = path.join(dist, "og");
await mkdir(ogDir, { recursive: true });

const toJpg = (srcAbs, name) =>
  sharp(srcAbs).resize(1200, 630, { fit: "cover" }).jpeg({ quality: 82 }).toFile(path.join(ogDir, `${name}.jpg`));

let defaultOg = "/og/default.jpg";
try {
  await toJpg(path.join(dist, "formicarium-colony.webp"), "default");
} catch {
  defaultOg = "/formicarium-colony.webp";
}

const ogCache = new Map();
async function ogFor(srcAbs) {
  if (!srcAbs) return defaultOg;
  if (ogCache.has(srcAbs)) return ogCache.get(srcAbs);
  const key = createHash("sha1").update(srcAbs).digest("hex").slice(0, 12);
  const rel = `/og/${key}.jpg`;
  try {
    await toJpg(srcAbs, key);
    ogCache.set(srcAbs, rel);
    return rel;
  } catch {
    // Файл мог быть удалён/переименован - откатываемся на дефолтную картинку.
    console.warn(`  ! OG image missing, using default for: ${srcAbs}`);
    ogCache.set(srcAbs, defaultOg);
    return defaultOg;
  }
}

// --- 3. Пишем per-route HTML из собранного dist/index.html ---
const template = await readFile(path.join(dist, "index.html"), "utf8");
const esc = (s) =>
  String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Заменяем весь тег целиком - устойчиво к многострочному форматированию
// (в index.html часть мета-тегов записаны на нескольких строках).
function replaceMeta(html, attr, key, value) {
  const re = new RegExp(`<meta\\s+${attr}="${key}"\\s+content="[^"]*"\\s*/>`, "i");
  return html.replace(re, `<meta ${attr}="${key}" content="${esc(value)}" />`);
}

function applyMeta(html, { title, description, url, image }) {
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = replaceMeta(html, "name", "description", description);
  html = replaceMeta(html, "property", "og:title", title);
  html = replaceMeta(html, "property", "og:description", description);
  html = replaceMeta(html, "property", "og:url", url);
  html = html.replace(
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/>/i,
    `<meta property="og:image" content="${esc(image)}" />\n` +
      `    <meta property="og:image:width" content="1200" />\n` +
      `    <meta property="og:image:height" content="630" />\n` +
      `    <meta property="og:image:alt" content="${esc(title)}" />`
  );
  html = replaceMeta(html, "name", "twitter:title", title);
  html = replaceMeta(html, "name", "twitter:description", description);
  html = replaceMeta(html, "name", "twitter:image", image);
  return html;
}

let count = 0;
for (const route of routes) {
  const ogRel = await ogFor(route.image);
  const html = applyMeta(template, {
    title: route.title,
    description: route.description,
    url: SITE_URL + route.path,
    image: SITE_URL + ogRel,
  });
  const outDir = path.join(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf8");
  count += 1;
}

console.log(`✓ Prerendered ${count} route HTML files (+ OG images in dist/og)`);
