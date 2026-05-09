import ProductCard from "../components/ProductCard";
import { ants } from "../data/antsData";
import { useOutletContext, useParams } from "react-router-dom";

export default function AntsPage() {
  const { t } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <section className="section">
      <h1>{t({ ru: "Муравьи", ro: "Furnici", en: "Ants" })}</h1>
      <div className="grid three">
        {ants.map((item) => (
          <ProductCard key={item.id} item={item} linkTo={`/${lang}/ants/${item.slug}`} />
        ))}
      </div>
    </section>
  );
}
