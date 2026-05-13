import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useMemo, useState } from "react";
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

function Layout() {
  const { lang } = useParams();
  const curLang = lang || "ru";
  const navigate = useNavigate();
  const location = useLocation();

  const [cartItems, setCartItems] = useState([]);

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
    setCartItems((prev) => {
      const idx = prev.findIndex((x) => x.id === item.id && x.variant === item.variant);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], qty: next[idx].qty + 1 };
        return next;
      }
      return [...prev, { ...item, qty: 1 }];
    });
  };

  const updateCartQty = (id, variant, qty) => {
    setCartItems((prev) =>
      prev
        .map((item) => (item.id === id && item.variant === variant ? { ...item, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id, variant) => {
    setCartItems((prev) => prev.filter((item) => !(item.id === id && item.variant === variant)));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.qty, 0), [cartItems]);

  return (
    <div className="site-shell">
      <HeaderMenu curLang={curLang} switchLang={switchLang} t={t} cartCount={cartCount} />
      <main className="container">
        <Outlet context={{ t, addToCart, cartItems, updateCartQty, removeFromCart, clearCart }} />
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
