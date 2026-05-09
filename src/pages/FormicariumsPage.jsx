import ProductCard from "../components/ProductCard";
import { formicariums } from "../data/formicariumsData";
import { useOutletContext, useParams } from "react-router-dom";

export default function FormicariumsPage() {
  const { t } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <section className="section">
      <h1>{t({ ru: "Формикарии", ro: "Formicarii", en: "Formicariums" })}</h1>
      <div className="grid three">
        {formicariums.map((item) => (
          <ProductCard key={item.id} item={item} linkTo={`/${lang}/formicariums#${item.slug}`} />
        ))}
      </div>
    </section>
  );
}
