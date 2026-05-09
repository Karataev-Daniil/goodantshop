import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { useOutletContext, useParams } from "react-router-dom";

export default function HomePage() {
  const { t } = useOutletContext();
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

      <section className="section">
        <h2>{t({ ru: "Все виды в продаже", ro: "Toate speciile disponibile", en: "All species in stock" })}</h2>
        <div className="grid three">
          {ants.map((item) => (
            <ProductCard key={item.id} item={item} linkTo={`/${lang}/ants/${item.slug}`} />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>{t({ ru: "Все формикарии в продаже", ro: "", en: "" })}</h2>
        <div className="grid three">
          {formicariums.map((item) => (
            <ProductCard key={item.id} item={item} linkTo={`/${lang}/formic/${item.slug}`} />
          ))}
        </div>
      </section>
    </>
  );
}
