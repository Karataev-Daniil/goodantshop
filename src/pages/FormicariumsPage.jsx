import ProductCard from "../components/ProductCard";
import { formicariums } from "../data/formicariumsData";
import { useOutletContext, useParams } from "react-router-dom";

export default function FormicariumsPage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <section className="section">
      <h1>{t({ ru: "Формикарии", ro: "Formicarii", en: "Formicariums" })}</h1>
      <p className="catalog-intro">
        {t({
          ru: "Подберите формикарий под размер колонии и место дома. Удобная арена, прозрачные камеры и продуманное увлажнение помогают спокойно наблюдать за развитием муравьев.",
          ro: "Alege un formicariu potrivit pentru marimea coloniei si locul din casa. Arena comoda, camerele transparente si umidificarea gandita ajuta la observarea calma a furnicilor.",
          en: "Pick a formicarium that fits your colony size and home space. A practical arena, clear chambers, and thoughtful humidity control make the colony easy to observe.",
        })}
      </p>
      <div className="grid three">
        {formicariums.map((item) => (
          <ProductCard key={item.id} item={item} linkTo={`/${lang}/formic/${item.slug}`} onAddToCart={addToCart} />
        ))}
      </div>
    </section>
  );
}
