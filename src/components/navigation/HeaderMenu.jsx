import { NavLink } from "react-router-dom";

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
          <NavLink to={`/${curLang}/blog`}>
            {t({ ru: "Блог", ro: "Blog", en: "Blog" })}
          </NavLink>
          <NavLink to={`/${curLang}/cart`}>
            {t({ ru: `Корзина (${cartCount})`, ro: `Cos (${cartCount})`, en: `Cart (${cartCount})` })}
          </NavLink>
          <details className="lang-dropdown">
            <summary className="lang-dropdown__trigger">{langLabel}</summary>
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
