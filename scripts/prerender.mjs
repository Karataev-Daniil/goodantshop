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

// index.html больше не содержит статических мета-тегов (иначе react-helmet
// дублировал бы их в рантайме). Поэтому здесь мы не заменяем теги, а вписываем
// полный набор на каждый маршрут - сразу после <title>. Константы (robots,
// og:type, og:site_name, twitter:card) одинаковы для всех пререндеренных
// страниц; per-route значения - title/description/url/image.
function applyMeta(html, { title, description, url, image }) {
  const t = esc(title);
  const d = esc(description);
  const block = [
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="GoodAntShop" />`,
    `<meta property="og:title" content="${t}" />`,
    `<meta property="og:description" content="${d}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(image)}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:image:alt" content="${t}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${t}" />`,
    `<meta name="twitter:description" content="${d}" />`,
    `<meta name="twitter:image" content="${esc(image)}" />`,
  ]
    .map((tag) => `    ${tag}`)
    .join("\n");

  return html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>\n${block}`);
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
