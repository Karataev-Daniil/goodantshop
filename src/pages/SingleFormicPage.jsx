import { Link, useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { formicariums } from "../data/formicariumsData";
import { ants } from "../data/antsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function FormicPage() {
  const { slug, lang = "ru" } = useParams();
  const formic = formicariums.find((item) => item.slug === slug);

  if (!formic) {
    return (
      <article className="section">
        <div className="panel">
          <h1>{getText({ ru: "Формикарий не найден", ro: "Formicarul nu a fost găsit", en: "Formicarium not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/formicariums`}>
            {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  // Cross-sell: colonies recommended for this formicarium
  const crossSell = ants.filter((ant) => formic.recommendedAntIds?.includes(ant.id));
  // Similar: other formicariums only — hidden when the catalog has a single model
  const similar = formicariums.filter((item) => item.slug !== formic.slug);

  return <ProductDetail item={formic} type="formicarium" crossSell={crossSell} similar={similar} />;
}
