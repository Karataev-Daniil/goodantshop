// Собирает список всех маршрутов сайта с их title / description / картинкой.
// Используется скриптом prerender.mjs (запускается после vite build).
// Этот файл бандлится esbuild-ом с заглушкой ассетов, поэтому импорт картинок
// возвращает абсолютный путь к исходному файлу (его читает sharp для OG).
import { pageSeo, productSeo, getText } from "../src/components/SEO.jsx";
import { ants } from "../src/data/antsData.js";
import { formicariums } from "../src/data/formicariumsData.js";
import { blogPosts } from "../src/data/blogPostsData.js";

const LANGS = ["ru", "ro", "en"];

const staticPages = [
  { path: "", seo: pageSeo.home },
  { path: "/ants", seo: pageSeo.ants },
  { path: "/formicariums", seo: pageSeo.formicariums },
  { path: "/blog", seo: pageSeo.blog },
  { path: "/about", seo: pageSeo.about },
  { path: "/contacts", seo: pageSeo.contacts },
];

const list = [];

for (const lang of LANGS) {
  for (const page of staticPages) {
    list.push({
      path: `/${lang}${page.path}`,
      title: getText(page.seo.title, lang),
      description: getText(page.seo.description, lang),
      image: null,
    });
  }

  for (const ant of ants) {
    const seo = productSeo(ant, "ant", lang);
    list.push({
      path: `/${lang}/ants/${ant.slug}`,
      title: getText(seo.title, lang),
      description: getText(seo.description, lang),
      image: (ant.images && ant.images[0]) || ant.image || null,
    });
  }

  for (const formic of formicariums) {
    const seo = productSeo(formic, "formicarium", lang);
    list.push({
      path: `/${lang}/formic/${formic.slug}`,
      title: getText(seo.title, lang),
      description: getText(seo.description, lang),
      image: (formic.images && formic.images[0]) || formic.image || null,
    });
  }

  for (const post of blogPosts) {
    list.push({
      path: `/${lang}/blog/${post.slug}`,
      title: getText(post.seoTitle || post.title, lang),
      description: getText(post.seoDescription || post.excerpt, lang),
      image: (post.cover && post.cover.src) || null,
    });
  }
}

export const routes = list;
