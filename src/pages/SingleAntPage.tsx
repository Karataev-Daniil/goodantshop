import { Link, useParams } from "react-router-dom";
import ProductDetail from "../components/ProductDetail";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { foodForAnt, foodsForAnt, toolKit } from "../data/accessoriesData";
import type { ProductExtras, StarterRole } from "../components/ProductDetail";
import type { Accessory, Formicarium, Lang, Text } from "../types";

const getText = (value: Text | null | undefined, lang: string): string => {
  if (value && typeof value === "object") {
    return value[lang as Lang] ?? value.ru ?? value.ro ?? value.en ?? "";
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

  // Cross-sell: formicariums a colony needs to start, in priority order
  // (the first id in recommendedFormicariumIds is the recommended pick).
  const crossSell = (ant.recommendedFormicariumIds ?? [])
    .map((id) => formicariums.find((item) => item.id === id))
    .filter((item): item is Formicarium => Boolean(item));
  // Similar: other ants only
  const similar = ants.filter((item) => item.slug !== ant.slug);

  // Что показываем к колонии: все подходящие корма (жнецам - семена и живой
  // белок, остальным - только живой) и набор инструментов. Подарком к комплекту
  // идут набор и ОСНОВНОЙ корм вида; второй корм - платное дополнение.
  const giftFood = foodForAnt(ant);
  const kit = toolKit();
  const extras: ProductExtras = {
    items: [
      ...foodsForAnt(ant).map((food): { product: Accessory; role: StarterRole } => ({
        product: food,
        role: food.id === giftFood?.id ? "gift" : "food",
      })),
      ...(kit ? [{ product: kit, role: "gift" as const }] : []),
    ],
  };

  // key по id: переход из блока «Похожие товары» не меняет маршрут, поэтому без
  // него компонент не перемонтируется и тащит на новый товар индекс галереи,
  // выбранную градацию цены и количество от предыдущего.
  return (
    <ProductDetail
      key={ant.id}
      item={ant}
      type="ant"
      crossSell={crossSell}
      similar={similar}
      extras={extras}
    />
  );
}
