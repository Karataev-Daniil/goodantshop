import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./pages/HomePage";
import AntsPage from "./pages/AntsPage";
import SingleAntPage from "./pages/SingleAntPage";
import FormicariumsPage from "./pages/FormicariumsPage";
import FormicPage from "./pages/SingleFormicPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";
import CartPage from "./pages/CartPage";

import HeaderMenu from "./components/navigation/HeaderMenu";
import FooterMenu from "./components/navigation/FooterMenu";

function useLocalStorage(key, initialValue) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    const stored = window.localStorage.getItem(key);
    if (stored) {
      try {
        setState(JSON.parse(stored));
      } catch {
        setState(initialValue);
      }
    }
  }, [key, initialValue]);

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

function Layout() {
  const { lang } = useParams();
  const curLang = lang || "ru";
  const navigate = useNavigate();
  const location = useLocation();

  const [cartIds, setcartIds] = useLocalStorage('cart-ids', []);

  const switchLang = (nextLang) => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts[0]) {
      parts[0] = nextLang;
    } else {
      parts.unshift(nextLang);
    }
    navigate(`/${parts.join('/')}`);
  };

  const t = (map) => map[curLang] ?? map.ru ?? map.ro ?? map.en;

  const addToCart = (item) => {
    setcartIds((prev) => [
      ...prev,
      {
        uid: `${item}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`,
        id: item,
      },
    ]);
  };

  const updateCartQty = (uid, qty) => {
    setcartIds((prev) =>
      prev.map((item) => (item.uid === uid ? { ...item, qty } : item))
    );
  };

  const removeFromCart = (uid) => {
    setcartIds((prev) => prev.filter((item) => item.uid !== uid));
  };

  const clearCart = () => setcartIds([]);

  const cartCount = cartIds.length;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="site-shell">
      <HeaderMenu curLang={curLang} switchLang={switchLang} t={t} cartCount={cartCount} />
      <main className="container">
        <Outlet context={{ t, addToCart, cartIds, updateCartQty, removeFromCart, clearCart }} />
      </main>
      <FooterMenu curLang={curLang} />
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/ru" replace />} />
      <Route path="/:lang/*" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="ants" element={<AntsPage />} />
        <Route path="ants/:slug" element={<SingleAntPage />} />
        <Route path="formicariums" element={<FormicariumsPage />} />
        <Route path="formic/:slug" element={<FormicPage />} />
        <Route path="blog" element={<BlogPage />} />
        <Route path="blog/:slug" element={<SingleBlogPage />} />
        <Route path="cart" element={<CartPage />} />
      </Route>
    </Routes>
  );
}
