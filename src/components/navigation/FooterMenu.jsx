import { Link } from "react-router-dom";

const footerText = {
  ru: {
    lead: "Муравьи, формикарии и поддержка для спокойного старта по всей Молдове.",
    ants: "Муравьи",
    formicariums: "Формикарий",
    contacts: "Контакты",
    blog: "Блог",
  },
  ro: {
    lead: "Furnici, formicarii și suport pentru un start liniștit în toată Moldova.",
    ants: "Furnici",
    formicariums: "Formicariu",
    contacts: "Contacte",
    blog: "Blog",
  },
  en: {
    lead: "Ants, formicariums, and support for a calm start across Moldova.",
    ants: "Ants",
    formicariums: "Formicarium",
    contacts: "Contacts",
    blog: "Blog",
  },
};

export default function FooterMenu({ curLang }) {
  const copy = footerText[curLang] ?? footerText.ru;

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <strong>GOODANTSHOP</strong>
          <p>{copy.lead}</p>
        </div>
        <div className="footer-links">
          <Link to={`/${curLang}/ants`}>{copy.ants}</Link>
          <Link to={`/${curLang}/formicariums`}>{copy.formicariums}</Link>
          <Link to={`/${curLang}/contacts`}>{copy.contacts}</Link>
          {/* <Link to={`/${curLang}/blog`}>{copy.blog}</Link> */}
          <a href="https://t.me/goodantshop" target="_blank" rel="noreferrer">
            Telegram
          </a>
        </div>
      </div>
    </footer>
  );
}
