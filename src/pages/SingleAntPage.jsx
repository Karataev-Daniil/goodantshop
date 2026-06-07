import { Link, useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function SingleAntPage() {
  const { slug, lang = "ru" } = useParams();
  const ant = ants.find((item) => item.slug === slug);

  if (!ant) {
    return (
      <article className="section">
        <div className="panel">
          <h1>{getText({ ru: "Муравей не найден", ro: "Furnica nu a fost găsită", en: "Ant not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/ants`}>
            {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  // Cross-sell: the formicarium a colony needs to start
  const crossSell = formicariums.filter((item) => ant.recommendedFormicariumIds?.includes(item.id));
  // Similar: other ants only
  const similar = ants.filter((item) => item.slug !== ant.slug);

  return <ProductDetail item={ant} type="ant" crossSell={crossSell} similar={similar} />;
}
