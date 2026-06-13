import { useOutletContext, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SEO, { breadcrumbSchema, itemListSchema, pageSeo } from "../components/SEO";
import { ants } from "../data/antsData";

export default function AntsPage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <>
      <SEO
        lang={lang}
        path="/ants"
        title={pageSeo.ants.title}
        description={pageSeo.ants.description}
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            { name: { ru: "Муравьи", ro: "Furnici", en: "Ants" }, path: "/ants" },
          ]),
          itemListSchema(lang, ants, (item) => `/ants/${item.slug}`),
        ]}
      />

      <section className="section">
        <h1>{t({ ru: "Муравьи", ro: "Furnici", en: "Ants" })}</h1>

        <p className="catalog-intro">
          {t({
            ru: "Выберите живую колонию для первого запуска или расширения домашней муравьиной фермы. Все виды подобраны так, чтобы уход был понятным и спокойным.",
            ro: "Alege o colonie vie pentru primul start sau pentru extinderea fermei de furnici de acasa. Speciile sunt selectate pentru ingrijire clara si linistita.",
            en: "Choose a live colony for your first setup or to expand your home ant farm. Each species is selected for clear, calm care.",
          })}
        </p>

        <div className="grid three">
          {ants.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              linkTo={`/${lang}/ants/${item.slug}`}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}
