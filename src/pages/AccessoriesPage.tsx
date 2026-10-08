import { Link, useOutletContext, useParams } from "react-router-dom";
import SEO, { breadcrumbSchema, getText, itemListSchema, pageSeo } from "../components/SEO";
import { accessories, foodsForAnt, getAccessory } from "../data/accessoriesData";
import { ants } from "../data/antsData";
import type { Accessory, OutletContext, Text } from "../types";

// Страница-гайд, а не витрина. Товаров всего три, и голая сетка карточек
// выглядела бы пустой; здесь они стоят внутри разделов про уход, каждый - там,
// где о нём заходит речь.
//
// Каталожная карточка (ProductCard) тут не подошла: она рассчитана на сетку из
// трёх колонок и рядом с текстом смотрелась чужеродно. Вместо неё компактная
// строка - миниатюра, название, цена и кнопка в одну линию.
//
// Кормление разложено по видам, а не одним абзацем: рацион - первое, что
// спрашивают, и человеку нужен ответ про свой вид, а не общий текст.
interface CareItemProps {
  item: Accessory | null;
  lang: string;
  onAddToCart: (id: number) => void;
}

function CareItem({ item, lang, onAddToCart }: CareItemProps) {
  if (!item) return null;

  const t = (value: Text) => getText(value, lang);
  const price = item.priceOptions?.[0];
  const to = `/${lang}/accessories/${item.slug}`;

  return (
    <article className="care-item">
      <Link className="care-item__media" to={to} aria-label={t(item.title)}>
        <img src={item.image} alt={t(item.title)} loading="lazy" />
      </Link>

      <div className="care-item__body">
        <h3>
          <Link to={to}>{t(item.title)}</Link>
        </h3>
        <p>{t(item.excerpt)}</p>
      </div>

      <div className="care-item__buy">
        {price && <strong>{price.value}</strong>}
        <button type="button" className="btn btn-secondary" onClick={() => onAddToCart(item.id)}>
          {t({ ru: "В корзину", ro: "În coș", en: "Add to cart" })}
        </button>
      </div>
    </article>
  );
}

export default function AccessoriesPage() {
  const { t, addToCart } = useOutletContext<OutletContext>();
  const { lang = "ru" } = useParams();

  const toolKit = getAccessory("tool-kit");

  return (
    <>
      <SEO
        lang={lang}
        path="/accessories"
        title={pageSeo.accessories.title}
        description={pageSeo.accessories.description}
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            {
              name: { ru: "Уход за колонией", ro: "Îngrijirea coloniei", en: "Colony care" },
              path: "/accessories",
            },
          ]),
          itemListSchema(lang, accessories, (item) => `/accessories/${item.slug}`),
        ]}
      />

      <section className="section">
        <h1>
          {t({
            ru: "Уход за колонией",
            ro: "Îngrijirea coloniei",
            en: "Colony care",
          })}
        </h1>

        <p className="catalog-intro">
          {t({
            ru: "Колония не требует ежедневных хлопот: раз в неделю долить воду, положить корм и убрать остатки. Ниже - что нужно каждому виду и чем это делается. При покупке колонии вместе с формикарием корм и набор инструментов идут в подарок.",
            ro: "Colonia nu cere grijă zilnică: o dată pe săptămână completezi apa, pui hrană și strângi resturile. Mai jos - de ce are nevoie fiecare specie și cu ce se face. La achiziția coloniei împreună cu formicariul, hrana și setul de instrumente vin cadou.",
            en: "A colony needs no daily fuss: once a week top up the water, put out food and clear the leftovers. Below is what each species needs and what you do it with. Buy a colony together with a formicarium and the food and tool kit come free.",
          })}
        </p>

        <div className="care-guide">
          {/* --- Кормление по видам --- */}
          <section className="care-block">
            <h2>{t({ ru: "Чем кормить", ro: "Cu ce hrănești", en: "What to feed" })}</h2>
            <p className="care-block__lead">
              {t({
                ru: "Рацион зависит от вида: жнецам нужны семена, остальным - живой белок. Сахарный сироп нужен всем, два-три раза в неделю.",
                ro: "Hrana depinde de specie: secerătoarelor le trebuie semințe, celorlalte - proteină vie. Siropul de zahăr le trebuie tuturor, de două-trei ori pe săptămână.",
                en: "Diet depends on the species: harvesters need seeds, the rest need live protein. All of them need sugar syrup, two or three times a week.",
              })}
            </p>

            <ul className="care-species">
              {ants.map((ant) => (
                <li key={ant.id} className="care-species__row">
                  <img src={ant.image} alt={getText(ant.title, lang)} loading="lazy" />
                  <div className="care-species__name">
                    <Link to={`/${lang}/ants/${ant.slug}`}>{getText(ant.title, lang)}</Link>
                    <span>{getText(ant.food, lang)}</span>
                  </div>
                  <div className="care-species__food">
                    {foodsForAnt(ant).map((food) => (
                      <Link key={food.slug} to={`/${lang}/accessories/${food.slug}`}>
                        {getText(food.title, lang)}
                      </Link>
                    ))}
                  </div>
                </li>
              ))}
            </ul>

            <div className="care-block__items">
              {accessories
                .filter((item) => item.kind === "food")
                .map((food) => (
                  <CareItem key={food.id} item={food} lang={lang} onAddToCart={addToCart} />
                ))}
            </div>
          </section>

          {/* --- Инструменты --- */}
          <section className="care-block">
            <h2>{t({ ru: "Чем ухаживать", ro: "Cu ce îngrijești", en: "What to tend it with" })}</h2>
            <p className="care-block__lead">
              {t({
                ru: "Пинцет достаёт остатки корма, шприц и пипетка подают воду, кисточка сметает муравьёв с крышки, не придавив их. Моют инструменты тёплой водой без химии - муравьи чувствительны к запаху.",
                ro: "Penseta scoate resturile, seringa și pipeta dau apă, pensula mătură furnicile de pe capac fără să le strivească. Se spală cu apă caldă, fără detergent - furnicile sunt sensibile la miros.",
                en: "Tweezers pull out leftovers, the syringe and pipette deliver water, the brush sweeps ants off the lid without crushing them. Wash in warm water without detergent - ants are sensitive to smells.",
              })}
            </p>

            <div className="care-block__items">
              <CareItem item={toolKit} lang={lang} onAddToCart={addToCart} />
            </div>
          </section>

          {/* --- Короткие памятки --- */}
          <section className="care-block">
            <h2>{t({ ru: "Что важно помнить", ro: "Ce este important", en: "Worth remembering" })}</h2>
            <dl className="care-notes">
              <div>
                <dt>{t({ ru: "Влажность", ro: "Umiditate", en: "Humidity" })}</dt>
                <dd>
                  {t({
                    ru: "Колония переживёт неделю без еды, но не переживёт пересохший расплод. Воду в увлажнитель доливают, когда камеры светлеют. Арену держат сухой - особенно у жнецов, иначе зерно плесневеет.",
                    ro: "Colonia rezistă o săptămână fără hrană, dar nu rezistă cu puietul uscat. Apa se completează când camerele se deschid la culoare. Arena se ține uscată - mai ales la secerătoare, altfel semințele mucegăiesc.",
                    en: "A colony survives a week without food, but not dried-out brood. Top up the water when the chambers lighten. Keep the arena dry - especially for harvesters, or the grain moulds.",
                  })}
                </dd>
              </div>
              <div>
                <dt>{t({ ru: "Переселение", ro: "Mutarea", en: "Rehousing" })}</dt>
                <dd>
                  {t({
                    ru: "Спешить не нужно: молодая колония живёт в пробирке, пока рабочих не станет тесно - обычно от 20-30 особей. Переселяют не руками: новое гнездо затемняют, старое оставляют на свету, и колония уходит сама.",
                    ro: "Nu e nevoie de grabă: colonia tânără stă în eprubetă până devine strâmt - de obicei de la 20-30 de indivizi. Mutarea nu se face cu mâna: cuibul nou se întunecă, cel vechi se lasă la lumină, iar colonia se mută singură.",
                    en: "No rush: a young colony stays in its tube until the workers get cramped - usually 20-30 of them. Do not move them by hand: darken the new nest, leave the old one lit, and the colony walks over on its own.",
                  })}
                </dd>
              </div>
              <div>
                <dt>{t({ ru: "Остатки корма", ro: "Resturile de hrană", en: "Leftovers" })}</dt>
                <dd>
                  {t({
                    ru: "Живой корм и сироп убирают на следующий день. Не убрали - в арене заводится плесень и мошка, а вывести их из формикария куда труднее, чем не допустить.",
                    ro: "Hrana vie și siropul se scot a doua zi. Dacă nu, în arenă apar mucegaiul și muștele, iar scoaterea lor din formicariu e mult mai grea decât prevenirea.",
                    en: "Remove live food and syrup the next day. If you do not, mould and flies take hold in the arena, and clearing them out is far harder than preventing them.",
                  })}
                </dd>
              </div>
            </dl>
          </section>
        </div>
      </section>
    </>
  );
}
