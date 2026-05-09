import { NavLink, Navigate, Route, Routes, useLocation, useNavigate, useParams, Outlet } from "react-router-dom";
import HomePage from "./pages/HomePage";
import AntsPage from "./pages/AntsPage";
import SingleAntPage from "./pages/SingleAntPage";
import FormicariumsPage from "./pages/FormicariumsPage";
import FormicPage from "./pages/SingleFormicPage";
import BlogPage from "./pages/BlogPage";
import SingleBlogPage from "./pages/SingleBlogPage";

import HeaderMenu from "./components/navigation/HeaderMenu";
import FooterMenu from "./components/navigation/FooterMenu";

function Layout({ children }) {
  const { lang } = useParams();
  const curLang = lang || "ru";
  const navigate = useNavigate();
  const location = useLocation();

  const switchLang = (nextLang) => {
    const parts = location.pathname.split('/').filter(Boolean);
    if (parts[0]) {
      parts[0] = nextLang
    } else {
      parts.unshift(nextLang)
    } 
    navigate(`/${parts.join('/')}`);
  }

  const t = (map) => map[curLang] ?? map.ru ?? map.ro;

  return (
    <div className="site-shell">
      <HeaderMenu curLang={curLang} switchLang={switchLang} t={t} />
      <main className="container"><Outlet context={{t}} /></main>
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
      </Route>
    </Routes>
  );
}
