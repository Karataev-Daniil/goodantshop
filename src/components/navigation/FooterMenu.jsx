import { Link } from "react-router-dom";
import { SITE_PHONE, SITE_PHONE_DISPLAY } from "../SEO";

const footerText = {
  ru: {
    tagline: "Муравьи, формикарии и поддержка для спокойного старта по всей Молдове.",
    navTitle: "Каталог",
    ants: "Муравьи",
    formicariums: "Формикарий",
    about: "О нас",
    contacts: "Контакты",
    contactTitle: "Связаться",
    hours: "Звонки и сообщения 10:00–20:00",
    delivery: "Доставка по всей Молдове",
    location: "Кишинёв, Молдова",
    rights: "Все права защищены",
  },
  ro: {
    tagline: "Furnici, formicarii și suport pentru un start liniștit în toată Moldova.",
    navTitle: "Catalog",
    ants: "Furnici",
    formicariums: "Formicariu",
    about: "Despre noi",
    contacts: "Contacte",
    contactTitle: "Contact",
    hours: "Apeluri și mesaje 10:00–20:00",
    delivery: "Livrare în toată Moldova",
    location: "Chișinău, Moldova",
    rights: "Toate drepturile rezervate",
  },
  en: {
    tagline: "Ants, formicariums, and support for a calm start across Moldova.",
    navTitle: "Catalog",
    ants: "Ants",
    formicariums: "Formicarium",
    about: "About",
    contacts: "Contacts",
    contactTitle: "Get in touch",
    hours: "Calls and messages 10:00–20:00",
    delivery: "Delivery across Moldova",
    location: "Chișinău, Moldova",
    rights: "All rights reserved",
  },
};

export default function FooterMenu({ curLang }) {
  const copy = footerText[curLang] ?? footerText.ru;
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <Link className="footer-brand__name" to={`/${curLang}`}>
            <strong>GOOD</strong>ANTSHOP<span>.md</span>
          </Link>
          <p className="footer-brand__tagline">{copy.tagline}</p>
          <a
            className="footer-tg"
            href="https://t.me/GoodAnt_Shop"
            target="_blank"
            rel="noreferrer"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 2 11 13" />
              <path d="M22 2 15 22l-4-9-9-4 20-7z" />
            </svg>
            Telegram
          </a>
        </div>

        <nav className="footer-col">
          <h3 className="footer-col__title">{copy.navTitle}</h3>
          <Link to={`/${curLang}/ants`}>{copy.ants}</Link>
          <Link to={`/${curLang}/formicariums`}>{copy.formicariums}</Link>
          <Link to={`/${curLang}/about`}>{copy.about}</Link>
          <Link to={`/${curLang}/contacts`}>{copy.contacts}</Link>
        </nav>

        <div className="footer-col">
          <h3 className="footer-col__title">{copy.contactTitle}</h3>
          <a className="footer-phone" href={`tel:${SITE_PHONE}`}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            {SITE_PHONE_DISPLAY}
          </a>
          <span className="footer-col__muted">{copy.hours}</span>
          <span className="footer-col__muted">{copy.delivery}</span>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© {year} GoodAntShop · {copy.location}</span>
        <span>{copy.rights}</span>
      </div>
    </footer>
  );
}
