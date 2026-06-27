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
        <h1>{t({ ru: "Купить муравьёв для домашней фермы", ro: "Cumpără furnici pentru ferma de acasă", en: "Buy ants for a home farm" })}</h1>

        <p className="catalog-intro">
          {t({
            ru: "В каталоге GoodAntShop можно купить живых муравьёв с маткой и расплодом — готовую колонию для запуска домашней муравьиной фермы. Мы предлагаем неприхотливые виды для новичков и эффектные виды для опытных киперов: Messor Structor, Lasius Niger, Lasius Neglectus и Camponotus Fellah. Каждая колония проверена и упакована для безопасной перевозки, а доставка работает по Кишинёву и всей Молдове.",
            ro: "În catalogul GoodAntShop poți cumpăra furnici vii cu regină și puiet — o colonie gata de pornit pentru ferma ta de acasă. Avem specii nepretențioase pentru începători și specii spectaculoase pentru pasionați: Messor Structor, Lasius Niger, Lasius Neglectus și Camponotus Fellah. Fiecare colonie este verificată și ambalată pentru transport sigur, cu livrare în Chișinău și în toată Moldova.",
            en: "At GoodAntShop you can buy live ants with a queen and brood — a ready-to-start colony for your home ant farm. We offer easy species for beginners and striking species for experienced keepers: Messor Structor, Lasius Niger, Lasius Neglectus and Camponotus Fellah. Every colony is checked and packed for safe transport, with delivery across Chișinău and all of Moldova.",
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
