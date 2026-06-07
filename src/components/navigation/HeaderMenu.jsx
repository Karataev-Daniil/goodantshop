import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import cartIcon from "../../assets/images/icons/cart.svg";

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
          <img src="/logo.png" alt="GoodAnt" />
          <div>
            <strong><span>GOOD</span>ANTSHOP<span>.md</span></strong>
            <span>
              {t({
                ru: "Муравьи, формикарии, корм",
                ro: "Furnici, formicarii, hrana",
                en: "Ants, formicariums, food"
              })}
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
              {t({ ru: "Формикарии", ro: "Formicarii", en: "Formicariums" })}
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
