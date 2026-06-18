import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cartIcon from "../../assets/images/icons/cart.svg";
import { SITE_PHONE, SITE_PHONE_DISPLAY } from "../SEO";

const LANGS = ["ru", "ro", "en"];

export default function HeaderMenu({ curLang, switchLang, t, cartCount }) {
  const langLabel = curLang.toUpperCase();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close the mobile menu on navigation.
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Lock background scroll while the menu is open (only takes effect on mobile,
  // where `.nav-locked` is wired up in CSS).
  useEffect(() => {
    document.body.classList.toggle("nav-locked", menuOpen);
    return () => document.body.classList.remove("nav-locked");
  }, [menuOpen]);

  const onLangSelect = (event, nextLang) => {
    switchLang(nextLang);
    const details = event.currentTarget.closest("details");
    if (details) details.removeAttribute("open");
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <NavLink className="brand" to={`/${curLang}`}>
          <img src="/logo.webp" alt="GoodAnt" />
          <div>
            <strong><span>GOOD</span>ANTSHOP<span>.md</span></strong>
            <span>
              {t({
                ru: "Муравьи • Формикарии",
                ro: "Furnici • Formicarii",
                en: "Ants • Formicariums"
              })}
              <span className="brand__subtitle-extra">
                {t({
                  ru: " • Корм",
                  ro: " • Hrană",
                  en: " • Food"
                })}
              </span>
            </span>
          </div>
        </NavLink>

        <div className="header-actions">
          <nav
            id="primary-nav"
            className={`main-nav ${menuOpen ? "is-open" : ""}`}
          >
            <NavLink to={`/${curLang}/ants`}>
              {t({ ru: "Муравьи", ro: "Furnici", en: "Ants" })}
            </NavLink>
            <NavLink to={`/${curLang}/formicariums`}>
              {t({ ru: "Формикарий", ro: "Formicariu", en: "Formicarium" })}
            </NavLink>
            <NavLink to={`/${curLang}/contacts`}>
              {t({ ru: "Контакты", ro: "Contacte", en: "Contacts" })}
            </NavLink>
            {/* <NavLink to={`/${curLang}/blog`}>
              {t({ ru: "Блог", ro: "Blog", en: "Blog" })}
            </NavLink> */}

            {/* Language picker — shown only inside the mobile menu (CSS) */}
            <div className="nav-lang">
              <span className="nav-lang__label">
                {t({ ru: "Язык", ro: "Limba", en: "Language" })}
              </span>
              <div className="nav-lang__options">
                {LANGS.map((lng) => (
                  <button
                    key={lng}
                    type="button"
                    className={curLang === lng ? "is-current" : ""}
                    onClick={() => switchLang(lng)}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>
          </nav>

          <a
            className="header-phone"
            href={`tel:${SITE_PHONE}`}
            aria-label={t({ ru: "Позвонить", ro: "Sună", en: "Call" })}
          >
            <svg
              className="header-phone__icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.9"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            <span className="header-phone__number">{SITE_PHONE_DISPLAY}</span>
          </a>

          <NavLink
            className="cart-link"
            to={`/${curLang}/cart`}
            aria-label={t({ ru: "Корзина", ro: "Cos", en: "Cart" })}
          >
            <img className="cart-link__icon" src={cartIcon} alt={t({ ru: "Корзина", ro: "Cos", en: "Cart" })} />
            {cartCount > 0 && <span className="cart-link__badge">{cartCount}</span>}
          </NavLink>

          {/* Desktop language dropdown — hidden on mobile (CSS) */}
          <details className="lang-dropdown">
            <summary className="lang-dropdown__trigger">
              <span className="lang-dropdown__label">{langLabel}</span>
              <svg
                className="lang-dropdown__chevron"
                width="10"
                height="10"
                viewBox="0 0 10 10"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 3.5 5 6.5 8 3.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </summary>
            <div className="lang-dropdown__menu" role="listbox" aria-label="Language">
              {LANGS.map((lng) => (
                <button
                  key={lng}
                  type="button"
                  className={curLang === lng ? "is-current" : ""}
                  onClick={(event) => onLangSelect(event, lng)}
                >
                  {lng.toUpperCase()}
                </button>
              ))}
            </div>
          </details>

          <button
            type="button"
            className={`nav-toggle ${menuOpen ? "is-open" : ""}`}
            aria-label={t({ ru: "Меню", ro: "Meniu", en: "Menu" })}
            aria-expanded={menuOpen}
            aria-controls="primary-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
            <span className="nav-toggle__bar" />
          </button>
        </div>
      </div>
    </header>
  );
}
