import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles.css";

// #root всегда есть в index.html.
const container = document.getElementById("root")!;
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// В собранном сайте разметка страницы уже лежит в HTML (scripts/prerender.mjs
// рендерит её через src/entry-server.tsx) - её гидрируем. В dev-сервере
// и на случай пустого контейнера рендерим с нуля.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app);
} else {
  ReactDOM.createRoot(container).render(app);
}
