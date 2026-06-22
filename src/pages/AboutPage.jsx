import { Link, useOutletContext, useParams } from "react-router-dom";
import SEO, { breadcrumbSchema, pageSeo } from "../components/SEO";
import { reviewStatsAll } from "../data/reviewsData";

export default function AboutPage() {
  const { t } = useOutletContext();
  const { lang = "ru" } = useParams();
  const stats = reviewStatsAll();

  const numbers = [
    { value: "10", label: t({ ru: "лет с муравьями", ro: "ani cu furnici", en: "years with ants" }) },
    { value: "5", label: t({ ru: "лет продаём колонии", ro: "ani vindem colonii", en: "years selling colonies" }) },
    { value: stats.ratingValue.toFixed(1), label: t({ ru: "★ на 999.md", ro: "★ pe 999.md", en: "★ on 999.md" }) },
  ];

  const values = [
    {
      title: t({ ru: "Только здоровые колонии", ro: "Doar colonii sănătoase", en: "Only healthy colonies" }),
      text: t({
        ru: "Каждая матка проходит карантин и проверку расплода. На отправку идут только активные, здоровые семьи.",
        ro: "Fiecare regină trece prin carantină și verificarea puietului. Trimitem doar familii active și sănătoase.",
        en: "Every queen passes quarantine and a brood check. Only active, healthy families get shipped.",
      }),
    },
    {
      title: t({ ru: "Рядом после покупки", ro: "Alături după achiziție", en: "With you after the purchase" }),
      text: t({
        ru: "Остаёмся на связи и помогаем запустить колонию, подобрать корм и условия, особенно если это ваш первый формикарий.",
        ro: "Rămânem în legătură și ajutăm la pornirea coloniei, alegerea hranei și a condițiilor, mai ales la primul formicariu.",
        en: "We stay in touch and help you start the colony, pick food and conditions, especially for a first formicarium.",
      }),
    },
    {
      title: t({ ru: "Честные условия", ro: "Condiții corecte", en: "Fair terms" }),
      text: t({
        ru: "Прозрачные цены, понятная доставка по Молдове и быстрые ответы в Telegram. Без сюрпризов.",
        ro: "Prețuri transparente, livrare clară în Moldova și răspunsuri rapide pe Telegram. Fără surprize.",
        en: "Transparent prices, clear delivery across Moldova and quick replies on Telegram. No surprises.",
      }),
    },
  ];

  return (
    <>
      <SEO
        lang={lang}
        path="/about"
        title={pageSeo.about.title}
        description={pageSeo.about.description}
        jsonLd={breadcrumbSchema(lang, [
          { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
          { name: { ru: "О нас", ro: "Despre noi", en: "About" }, path: "/about" },
        ])}
      />

      <section className="section about-page">
        <header className="section-heading">
          <div>
            <p className="kicker">{t({ ru: "О нас", ro: "Despre noi", en: "About" })}</p>
            <h1>
              {t({
                ru: "Живые колонии муравьёв с заботой о каждом старте",
                ro: "Colonii vii de furnici, cu grijă pentru fiecare început",
                en: "Live ant colonies, with care for every start",
              })}
            </h1>
          </div>
        </header>

        <p className="catalog-intro">
          {t({
            ru: "Мы небольшая команда из Молдовы и увлекаемся муравьями уже больше 10 лет. Последние 5 из них выращиваем и отправляем здоровые колонии и делаем формикарии, в которых за ними удобно наблюдать. Наша цель проста: чтобы ваш первый муравейник запустился спокойно и радовал вас годами.",
            ro: "GoodAntShop este o echipă mică din Moldova. Suntem pasionați de furnici de peste 10 ani, iar în ultimii 5 creștem și trimitem colonii sănătoase și fabricăm formicarii în care e ușor să le observi. Scopul nostru e simplu: primul tău mușuroi să pornească liniștit și să te bucure ani de zile.",
            en: "GoodAntShop is a small team from Moldova. We've been into ants for over 10 years, and for the last 5 we've raised and shipped healthy colonies and built formicariums that make them easy to watch. Our goal is simple: your first colony should start calmly and delight you for years.",
          })}
        </p>

        <div className="about-stats">
          {numbers.map((n) => (
            <div key={n.label}>
              <strong>{n.value}</strong>
              <span>{n.label}</span>
            </div>
          ))}
        </div>

        <div className="about-values">
          {values.map((v) => (
            <article key={v.title}>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </article>
          ))}
        </div>

        <div className="about-cta">
          <div>
            <h2>{t({ ru: "Остались вопросы?", ro: "Ai întrebări?", en: "Have questions?" })}</h2>
            <p>
              {t({
                ru: "Поможем выбрать вид, формикарий и подскажем по уходу. Напишите или позвоните, ответим быстро.",
                ro: "Te ajutăm să alegi specia, formicariul și îți dăm sfaturi de îngrijire. Scrie sau sună, răspundem rapid.",
                en: "We'll help you choose a species, a formicarium and advise on care. Message or call, we reply fast.",
              })}
            </p>
          </div>
          <div className="actions">
            <Link className="btn" to={`/${lang}/contacts`}>
              {t({ ru: "Связаться", ro: "Contact", en: "Contact us" })}
            </Link>
            <Link className="btn btn-light" to={`/${lang}/ants`}>
              {t({ ru: "Смотреть муравьёв", ro: "Vezi furnicile", en: "Browse ants" })}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
