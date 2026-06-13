import { useOutletContext, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SEO, { breadcrumbSchema, itemListSchema, pageSeo } from "../components/SEO";
import { formicariums } from "../data/formicariumsData";

export default function FormicariumsPage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <>
      <SEO
        lang={lang}
        path="/formicariums"
        title={pageSeo.formicariums.title}
        description={pageSeo.formicariums.description}
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            { name: { ru: "Формикарии", ro: "Formicarii", en: "Formicariums" }, path: "/formicariums" },
          ]),
          itemListSchema(lang, formicariums, (item) => `/formic/${item.slug}`),
        ]}
      />

      <section className="section">
        <h1>
          {t({
            ru: "Формикарии",
            ro: "Formicarii",
            en: "Formicariums",
          })}
        </h1>

        <p className="catalog-intro">
          {t({
            ru: "Подберите формикарий для муравьиной фермы: компактные модели для молодых колоний и просторные формикарии для активного роста семьи. Прозрачные камеры, удобная арена и продуманное увлажнение помогают наблюдать за жизнью муравьев каждый день.",
            ro: "Alege un formicariu pentru colonia ta de furnici. Modele compacte pentru colonii tinere și modele spațioase pentru dezvoltare activă.",
            en: "Choose a formicarium for your ant colony. Compact models for young colonies and spacious nests for growing ant families.",
          })}
        </p>

        <div className="grid three">
          {formicariums.map((item) => (
            <ProductCard
              key={item.id}
              item={item}
              linkTo={`/${lang}/formic/${item.slug}`}
              onAddToCart={addToCart}
            />
          ))}
        </div>
      </section>
    </>
  );
}
