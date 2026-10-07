// Пост-билд пререндер: мета-теги + разметка страницы.
// Боты соцсетей/мессенджеров не исполняют JS и берут «сырой» HTML. Этот скрипт
// после `vite build` создаёт по index.html на каждый маршрут с его собственными
// title / description / og:image, чтобы превью ссылки было правильным на любой
// странице. Картинки для OG приводятся к jpg 1200×630 (совместимо с FB/VK).
//
// Тело страницы рендерится через src/entry-server.jsx (собран командой
// `vite build --ssr` в node_modules/.cache/prerender-ssr - см. package.json):
// H1, текст, ссылки и JSON-LD оказываются прямо в HTML, а браузер затем
// гидрирует эту разметку. Если рендер маршрута падает, падает и сборка -
// лучше не задеплоить, чем молча выкатить пустые страницы.
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
// Языковые версии и og:locale для статической разметки (совпадают с SEO.jsx).
const LANGS = ["ru", "ro", "en"];
const OG_LOCALE = { ru: "ru_MD", ro: "ro_MD", en: "en_US" };

// Из пути маршрута (/ru/ants) достаём язык и языконезависимый хвост (/ants),
// чтобы построить canonical и hreflang-альтернативы.
function splitLangPath(routePath) {
  const m = String(routePath).match(/^\/(ru|ro|en)(\/.*)?$/);
  if (!m) return { lang: "ru", rest: "" };
  return { lang: m[1], rest: m[2] || "" };
}

function applyMeta(html, { title, description, url, image, path: routePath, robots = "index, follow" }) {
  const t = esc(title);
  const d = esc(description);
  const { lang, rest } = splitLangPath(routePath);

  const hreflang = [
    ...LANGS.map(
      (code) => `<link rel="alternate" hreflang="${code}" href="${SITE_URL}/${code}${rest}" />`
    ),
    `<link rel="alternate" hreflang="x-default" href="${SITE_URL}/ru${rest}" />`,
  ];

  const block = [
    `<meta name="description" content="${d}" />`,
    `<meta name="robots" content="${esc(robots)}" />`,
    // canonical + hreflang: раньше их вписывал только react-helmet в рантайме,
    // из-за чего боты без JS (и до рендера) их не видели - ro/en склеивались с ru.
    `<link rel="canonical" href="${esc(url)}" />`,
    ...hreflang,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:locale" content="${OG_LOCALE[lang] || OG_LOCALE.ru}" />`,
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

  // Язык страницы в <html>: в шаблоне всегда ru, проставляем реальный язык
  // маршрута - иначе Google читает ro/en страницы как русские.
  const withLang = html.replace(/<html([^>]*)\slang="[^"]*"/i, `<html$1 lang="${lang}"`);

  return withLang.replace(/<title>[\s\S]*?<\/title>/i, `<title>${t}</title>\n${block}`);
}

const ssrEntry = path.join(root, "node_modules", ".cache", "prerender-ssr", "entry-server.js");
const { render } = await import(pathToFileURL(ssrEntry).href);

function applyBody(html, routePath) {
  const { html: appHtml, head } = render(routePath);
  if (!appHtml) throw new Error(`SSR rendered nothing for ${routePath}`);
  // Функции-замены: в разметке могут встретиться «$&», «$'» и т.п., которые
  // строковая замена интерпретировала бы как шаблоны.
  return html
    .replace("</head>", () => `${head ? `    ${head}\n` : ""}  </head>`)
    .replace('<div id="root"></div>', () => `<div id="root">${appHtml}</div>`);
}

let count = 0;
for (const route of routes) {
  const ogRel = await ogFor(route.image);
  const withMeta = applyMeta(template, {
    title: route.title,
    description: route.description,
    url: SITE_URL + route.path,
    image: SITE_URL + ogRel,
    path: route.path,
    robots: route.robots,
  });
  const html = applyBody(withMeta, route.path);
  const outDir = path.join(dist, route.path);
  await mkdir(outDir, { recursive: true });
  await writeFile(path.join(outDir, "index.html"), html, "utf8");
  count += 1;
}

// --- 4. sitemap.xml ---
// Собирается из того же списка routes, что и HTML: новый товар или статья
// попадает в sitemap автоматически (раньше public/sitemap.xml вёлся руками).
// Маршруты с sitemap: false (корзина) не включаются. hreflang-альтернативы и
// x-default (= ru) совпадают с теми, что prerender вписывает в <head>.
// lastmod - только там, где есть настоящая дата изменения (статьи блога):
// одинаковая выдуманная дата на всех URL Google только учит игнорировать поле.
const xmlEsc = (s) => esc(s).replace(/'/g, "&apos;");
const sitemapUrls = routes
  .filter((route) => route.sitemap !== false)
  .map((route) => {
    const { rest } = splitLangPath(route.path);
    const alternates = [
      ...LANGS.map((code) => [code, `${SITE_URL}/${code}${rest}`]),
      ["x-default", `${SITE_URL}/ru${rest}`],
    ]
      .map(([code, href]) => `    <xhtml:link rel="alternate" hreflang="${code}" href="${xmlEsc(href)}"/>`)
      .join("\n");
    return [
      "  <url>",
      `    <loc>${xmlEsc(SITE_URL + route.path)}</loc>`,
      ...(route.lastmod ? [`    <lastmod>${xmlEsc(route.lastmod)}</lastmod>`] : []),
      alternates,
      "  </url>",
    ].join("\n");
  });

const sitemap = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
  '  xmlns:xhtml="http://www.w3.org/1999/xhtml">',
  ...sitemapUrls,
  "</urlset>",
  "",
].join("\n");
await writeFile(path.join(dist, "sitemap.xml"), sitemap, "utf8");
console.log(`✓ sitemap.xml: ${sitemapUrls.length} URLs`);

// --- 5. 404.html ---
// Vercel отдаёт dist/404.html со статусом 404 для любого неизвестного URL.
// Раньше там был голый текст Vercel «NOT_FOUND»: человек со старой или битой
// ссылки попадал в тупик. Страница статическая (без бандла приложения: роутер
// для неизвестного пути отрисовал бы пустой <main>), со стилями сайта и
// ссылками на основные разделы. Язык неизвестен заранее - выводим все три,
// а маленький инлайн-скрипт оставляет нужный по префиксу пути.
const NOT_FOUND = {
  ru: {
    title: "Страница не найдена",
    text: "Такой страницы нет: возможно, ссылка устарела или в адресе опечатка. Загляните в каталог или напишите нам.",
    links: [["/ru/ants", "Муравьи"], ["/ru/formicariums", "Формикарии"], ["/ru/blog", "Блог"], ["/ru/contacts", "Контакты"], ["/ru", "На главную"]],
  },
  ro: {
    title: "Pagina nu a fost găsită",
    text: "Această pagină nu există: poate linkul e vechi sau adresa are o greșeală. Vezi catalogul sau scrie-ne.",
    links: [["/ro/ants", "Furnici"], ["/ro/formicariums", "Formicarii"], ["/ro/blog", "Blog"], ["/ro/contacts", "Contacte"], ["/ro", "Pagina principală"]],
  },
  en: {
    title: "Page not found",
    text: "This page does not exist: the link may be outdated or the address mistyped. Browse the catalog or get in touch.",
    links: [["/en/ants", "Ants"], ["/en/formicariums", "Formicariums"], ["/en/blog", "Blog"], ["/en/contacts", "Contacts"], ["/en", "Home page"]],
  },
};

function render404(html) {
  const styles = (html.match(/<link[^>]+rel="stylesheet"[^>]*>/gi) || []).join("\n    ");
  const icons = (html.match(/<link[^>]+rel="(?:icon|apple-touch-icon)"[^>]*>/gi) || []).join("\n    ");
  const sections = LANGS.map((code) => {
    const t = NOT_FOUND[code];
    const links = t.links
      .map(([href, label], i) => `<a class="btn${i === t.links.length - 1 ? " btn-secondary" : ""}" href="${href}">${esc(label)}</a>`)
      .join("\n          ");
    return `      <section class="panel" lang="${code}" data-lang="${code}" style="margin:24px 0;padding:32px">
        <p style="margin:0 0 8px;font-weight:700;color:var(--accent)">404</p>
        <h1 style="margin:0 0 12px">${esc(t.title)}</h1>
        <p style="margin:0 0 20px">${esc(t.text)}</p>
        <nav style="display:flex;flex-wrap:wrap;gap:12px">
          ${links}
        </nav>
      </section>`;
  }).join("\n");

  return `<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>404 · ${esc(NOT_FOUND.ru.title)} | GoodAntShop</title>
    <meta name="robots" content="noindex, follow" />
    ${icons}
    ${styles}
  </head>
  <body>
    <main class="container" style="max-width:760px;padding:48px 16px">
      <a href="/ru" style="display:inline-flex;align-items:center;gap:10px;font-weight:700;color:inherit;text-decoration:none">
        <img src="/logo.webp" alt="GoodAntShop" width="40" height="40" style="border-radius:50%" />GoodAntShop
      </a>
${sections}
    </main>
    <script>
      (function () {
        var m = location.pathname.match(/^\\/(ru|ro|en)(\\/|$)/);
        if (!m) return;
        document.documentElement.lang = m[1];
        var titles = ${JSON.stringify(Object.fromEntries(LANGS.map((c) => [c, `404 · ${NOT_FOUND[c].title} | GoodAntShop`])))};
        document.title = titles[m[1]];
        document.querySelectorAll("[data-lang]").forEach(function (el) {
          if (el.getAttribute("data-lang") !== m[1]) el.style.display = "none";
        });
      })();
    </script>
  </body>
</html>
`;
}

await writeFile(path.join(dist, "404.html"), render404(template), "utf8");

console.log(`✓ Prerendered ${count} route HTML files (+ OG images in dist/og, 404.html)`);
