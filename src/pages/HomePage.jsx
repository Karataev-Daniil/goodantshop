import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { useOutletContext, useParams } from "react-router-dom";

export default function HomePage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <>
      <section className="hero">
        <div>
          <p className="kicker">GOODANT</p>
          <h1>
            {t({
              ru: "МУРАВЬИ ДЛЯ НОВИЧКОВ И ПРОФИ",
              ro: "FURNICI PENTRU INCEPATORI SI PROFESIONISTI",
              en: "ANTS FOR BEGINNERS AND PROS"
            })}
          </h1>
          <p>
            {t({
              ru: "Профессиональная консультация, быстрая и легкая покупка, большой ассортимент.",
              ro: "Consultanta profesionala, cumparare rapida si usoara, sortiment mare.",
              en: "Professional guidance, fast and easy purchase, wide selection."
            })}
          </p>
          <div className="actions">
            <Link className="btn" to={`/${lang}/ants`}>
              {t({ ru: "Смотреть каталог", ro: "Vezi catalogul", en: "View catalog" })}
            </Link>
          </div>
        </div>
        <img className="hero-logo" src="/logo.png" alt="GoodAnt logo" loading="lazy" />
      </section>

      <section className="section hobby-intro">
        <h2>{t({ ru: "Впервые слышите об этом хобби?", ro: "Auzi pentru prima data de acest hobby?", en: "Hearing about this hobby for the first time?" })}</h2>
        <p>
          {t({
            ru: "Подготовили понятное объяснение: что такое муравьиная ферма, как начать и чего ожидать в первые недели.",
            ro: "Am pregatit o explicatie simpla: ce este o ferma de furnici, cum incepi si la ce sa te astepti in primele saptamani.",
            en: "We prepared a simple guide: what an ant farm is, how to start, and what to expect in your first weeks.",
          })}
        </p>
        <Link className="btn" to={`/${lang}/blog`}>
          {t({ ru: "Что это за хобби", ro: "Ce este acest hobby", en: "What is this hobby" })}
        </Link>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t({ ru: "Виды в продаже", ro: "Specii in vanzare", en: "Species for sale" })}</h2>
          <Link className="btn" to={`/${lang}/ants`}>
            {t({ ru: "Показать все", ro: "Arata tot", en: "Show all" })}
          </Link>
        </div>
        <div className="grid three">
          {ants.map((item) => (
            <ProductCard key={item.id} item={item} linkTo={`/${lang}/ants/${item.slug}`} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t({ ru: "Виды формикариев", ro: "Tipuri de formicarii", en: "Formicarium types" })}</h2>
          <Link className="btn" to={`/${lang}/formicariums`}>
            {t({ ru: "Показать все", ro: "Arata tot", en: "Show all" })}
          </Link>
        </div>
        <div className="grid three">
          {formicariums.map((item) => (
            <ProductCard key={item.id} item={item} linkTo={`/${lang}/formic/${item.slug}`} onAddToCart={addToCart} />
          ))}
        </div>
      </section>
    </>
  );
}
