import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import localforage from 'localforage';
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

function useLocalForage( key, initialValue ) {
  const [state, setState] = useState(initialValue)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    let mounted = true

    localforage.getItem(key).then(value => {
      if (!mounted) return

      if (value !== null) {
        setState(value)
      }

      setHydrated(true)
    })

    return () => {
      mounted = false
    }
  }, [key])

  useEffect(() => {
    if (!hydrated) return
    localforage.setItem(key, state)
  }, [key, state, hydrated])

  return [state, setState]
}

function Layout() {
  const { lang } = useParams();
  const curLang = lang || "ru";
  const navigate = useNavigate();
  const location = useLocation();

  const [cartIds, setcartIds] = useLocalForage('cart-ids', []);

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
    setcartIds((prev) => {
      const existing = prev.find((entry) => entry.id === item.id);
      if (existing) {
        return prev.map((entry) => (entry.id === item.id ? { ...entry, qty: entry.qty + 1 } : entry));
      }
      return [...prev, { id: item.id, qty: 1 }];
    });
  };

  const updateCartQty = (id, qty) => {
    setcartIds((prev) =>
      prev
        .map((item) => (item.id === id ? { id: item.id, qty: Math.max(1, qty) } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setcartIds((prev) => prev.filter((item) => !(item.id === id)));
  };

  const clearCart = () => setcartIds([]);

  const cartCount = useMemo(() => cartIds.reduce((sum, item) => sum + item.qty, 0), [cartIds]);

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
