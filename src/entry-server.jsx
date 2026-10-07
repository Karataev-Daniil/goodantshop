// Серверный вход для пререндера (scripts/prerender.mjs). Собирается отдельно:
// `vite build --ssr src/entry-server.jsx`. Рендерит приложение для одного URL
// в строку, чтобы в статическом HTML каждой страницы сразу были H1, текст,
// ссылки и JSON-LD - их видят боты, которые не исполняют JS (Bing, Яндекс без
// рендера, AI-краулеры, мессенджеры). В браузере main.jsx гидрирует эту
// разметку (hydrateRoot) вместо того, чтобы рисовать страницу с нуля.
import React from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";

export function render(url) {
  const helmetContext = {};
  const html = renderToString(
    <React.StrictMode>
      <StaticRouter location={url}>
        <App helmetContext={helmetContext} />
      </StaticRouter>
    </React.StrictMode>
  );
  const { helmet } = helmetContext;
  // В <head> берём только JSON-LD: title, description, canonical, hreflang и OG
  // prerender.mjs уже вписал сам. У тегов Helmet есть data-rh - по нему
  // клиентский Helmet найдёт и заменит их при навигации, а не задублирует.
  return { html, head: helmet ? helmet.script.toString() : "" };
}
