import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AntsPage from "./pages/AntsPage";
import SingleAntPage from "./pages/SingleAntPage";
import FormicariumsPage from "./pages/FormicariumsPage";
import FormicPage from "./pages/SingleFormicPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import AccessoriesPage from "./pages/AccessoriesPage";
import SingleAccessoryPage from "./pages/SingleAccessoryPage";
import SpeciesMapPage from "./pages/SpeciesMapPage";
import ContactsPage from "./pages/ContactsPage";
import AboutPage from "./pages/AboutPage";
import CartPage from "./pages/CartPage";

import HeaderMenu from "./components/navigation/HeaderMenu";
import FooterMenu from "./components/navigation/FooterMenu";

import { HelmetProvider } from "react-helmet-async";
import type { HelmetServerState } from "react-helmet-async";
import type { Dispatch, SetStateAction } from "react";
import type { CartItem, Lang, LocalizedValue, OutletContext, PriceOption } from "./types";

// Страницы пререндерятся на сервере, где localStorage нет, а первый
// клиентский рендер при гидрации обязан совпасть с серверным. Поэтому стартуем
// с initialValue и читаем сохранённое значение уже после монтирования.
// Запись включается только после чтения (ready), иначе первый же эффект
// затёр бы сохранённую корзину пустым массивом.
function useLocalStorage<T>(key: string, initialValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(key);
      if (stored) setState(JSON.parse(stored) as T);
    } catch {
      // Битое значение или запрещённый storage - остаёмся на initialValue.
    }
    setReady(true);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // Приватный режим / переполненный storage - корзина живёт до перезагрузки.
    }
  }, [key, state, ready]);

  return [state, setState];
}

function Layout() {
  const { lang } = useParams();
  const curLang = lang || "ru";
  const navigate = useNavigate();
  const location = useLocation();

  const [cartIds, setcartIds] = useLocalStorage<CartItem[]>('cart-ids', []);

  const switchLang = (nextLang: string) => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts[0]) {
      parts[0] = nextLang;
    } else {
      parts.unshift(nextLang);
    }
    navigate(`/${parts.join('/')}`);
  };

  // curLang - из URL; для неизвестного языка индекс даёт undefined -> ru.
  const t = <T extends {}>(map: LocalizedValue<T>): T => map[curLang as Lang] ?? map.ru ?? map.ro ?? map.en;

  const addToCart = (id: number | string, option?: PriceOption | null) => {
    setcartIds((prev) => [
      ...prev,
      {
        uid: crypto.randomUUID(),
        id,
        option: option || null,
      },
    ]);
  };

  const updateCartQty = (uid: string, qty: number) => {
    setcartIds((prev) =>
      prev.map((item) => (item.uid === uid ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (uid: string) => {
    setcartIds((prev) => prev.filter((item) => item.uid !== uid));
  };

  const clearCart = () => setcartIds([]);

  const cartCount = cartIds.length;

  // Don't let the browser restore the previous scroll position on reload/back:
  // together with the scroll-to-top below it produced a visible jump on open
  // (page loaded scrolled down, then animated up, flashing the next section).
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <HeaderMenu curLang={curLang} switchLang={switchLang} t={t} cartCount={cartCount} />
      <main className="container">
        <Outlet context={{ t, addToCart, cartIds, updateCartQty, removeFromCart, clearCart } satisfies OutletContext} />
      </main>
      <FooterMenu curLang={curLang} />
    </div>
  );
}

// helmetContext передаёт только серверный рендер (src/entry-server.tsx), чтобы
// забрать JSON-LD для статического HTML; в браузере он не нужен.
// Helmet дописывает в объект контекста поле helmet после рендера.
export interface HelmetContext {
  helmet?: HelmetServerState | null;
}

export default function App({ helmetContext }: { helmetContext?: HelmetContext }) {
  return (
    <HelmetProvider context={helmetContext}>
      <Routes>
        <Route path="/" element={<Navigate to="/ru" replace />} />
        <Route path="/:lang/*" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="ants" element={<AntsPage />} />
          <Route path="ants/:slug" element={<SingleAntPage />} />
          <Route path="formicariums" element={<FormicariumsPage />} />
          <Route path="formic/:slug" element={<FormicPage />} />
          <Route path="accessories" element={<AccessoriesPage />} />
          <Route path="accessories/:slug" element={<SingleAccessoryPage />} />
          <Route path="species-map" element={<SpeciesMapPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:slug" element={<SingleBlogPage />} />
          <Route path="contacts" element={<ContactsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="cart" element={<CartPage />} />
        </Route>
      </Routes>
    </HelmetProvider>
  );
}
