import { NavLink } from "react-router-dom";
import cartIcon from "../../assets/images/icons/cart.svg";

export default function HeaderMenu({ curLang, switchLang, t, cartCount }) {
  const langLabel = curLang.toUpperCase();

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
        <nav className="main-nav">
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
          <NavLink
            className="cart-link"
            to={`/${curLang}/cart`}
            aria-label={t({ ru: "Корзина", ro: "Cos", en: "Cart" })}
          >
            <img className="cart-link__icon" src={cartIcon} alt={t({ ru: "Корзина", ro: "Cos", en: "Cart" })} />
            {cartCount > 0 && <span className="cart-link__badge">{cartCount}</span>}
          </NavLink>
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
              <button
                type="button"
                className={curLang === "ru" ? "is-current" : ""}
                onClick={(event) => onLangSelect(event, "ru")}
              >
                RU
              </button>
              <button
                type="button"
                className={curLang === "ro" ? "is-current" : ""}
                onClick={(event) => onLangSelect(event, "ro")}
              >
                RO
              </button>
              <button
                type="button"
                className={curLang === "en" ? "is-current" : ""}
                onClick={(event) => onLangSelect(event, "en")}
              >
                EN
              </button>
            </div>
          </details>
        </nav>
      </div>
    </header>
  );
}
