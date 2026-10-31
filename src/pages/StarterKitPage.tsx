import { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import AntTrail from "../components/AntTrail";
import { responsiveImg } from "../responsiveImage";
import ProductGallery from "../components/ProductGallery";
import ProductReviews from "../components/ProductReviews";
import SEO, { breadcrumbSchema, faqSchema, pageSeo, productSchema, SITE_TELEGRAM } from "../components/SEO";
import { reviewsFor, reviewStatsFor } from "../data/reviewsData";
import {
  KIT_DELIVERY_VALUE,
  STARTER_KIT_PATH,
  kitAvailability,
  kitColony,
  kitColonyPrice,
  kitExcerpt,
  kitFormicarium,
  kitFormicariumPrice,
  kitGifts,
  kitGiftValue,
  kitImages,
  kitPrice,
  kitProduct,
  kitTitle,
  priceNumber,
} from "../data/starterKitData";
import type { Characteristic, Localized, OutletContext } from "../types";

// Строка характеристики по английской подписи («Difficulty», «Size»...).
const findChar = (rows: Characteristic[] | undefined, enKey: string): Localized | null =>
  rows?.find((row) => (row.label?.en || "").toLowerCase().includes(enKey))?.value ?? null;

const ADDED_FEEDBACK_MS = 2600;

export default function StarterKitPage() {
  const { t, addToCart } = useOutletContext<OutletContext>();
  const { lang = "ru" } = useParams();
  const navigate = useNavigate();
  const [added, setAdded] = useState(false);

  const isOutOfStock = kitAvailability === "outOfStock";
  const reviews = reviewsFor("ant", kitColony.slug);
  const reviewStats = reviewStatsFor("ant", kitColony.slug);
  const lei = (value: number) => `${value} ${t({ ru: "лей", ro: "lei", en: "lei" })}`;

  // Кнопка подтверждает добавление и через пару секунд возвращается к
  // обычному виду - иначе второй клик выглядел бы как «ничего не произошло».
  useEffect(() => {
    if (!added) return undefined;
    const timer = setTimeout(() => setAdded(false), ADDED_FEEDBACK_MS);
    return () => clearTimeout(timer);
  }, [added]);

  // В корзину кладём обе позиции каталога; подарки корзина добавит сама.
  const addKit = () => {
    addToCart(kitColony.id);
    addToCart(kitFormicarium.id);
    setAdded(true);
  };
  const buyNow = () => {
    addKit();
    navigate(`/${lang}/cart`);
  };

  const giftRole = { ru: "Подарок", ro: "Cadou", en: "Gift" };
  const contents = [
    {
      key: kitFormicarium.slug,
      to: `/${lang}/formic/${kitFormicarium.slug}`,
      image: kitFormicarium.images?.[0] || kitFormicarium.image,
      role: t({ ru: "Дом для колонии", ro: "Casa coloniei", en: "Home for the colony" }),
      title: t(kitFormicarium.title),
      note: t(kitFormicarium.excerpt),
      price: kitFormicariumPrice,
      gift: false,
    },
    {
      key: kitColony.slug,
      to: `/${lang}/ants/${kitColony.slug}`,
      image: kitColony.images?.[0] || kitColony.image,
      role: t({ ru: "Колония с маткой", ro: "Colonie cu regină", en: "Queen-right colony" }),
      title: t(kitColony.title),
      note: [kitColony.priceOptions?.[0]?.label, kitColony.excerpt]
        .filter((part): part is Localized => Boolean(part))
        .map((part) => t(part))
        .join(". "),
      price: kitColonyPrice,
      gift: false,
    },
    ...kitGifts.map((gift) => ({
      key: gift.slug,
      to: `/${lang}/accessories/${gift.slug}`,
      image: gift.images?.[0] || gift.image,
      role: t(giftRole),
      title: t(gift.title),
      note: t(gift.excerpt),
      price: priceNumber(gift.priceOptions?.[0]),
      gift: true,
    })),
  ];

  const steps = [
    {
      title: t({ ru: "Привозим всё одной посылкой", ro: "Aducem totul într-un colet", en: "Everything arrives in one parcel" }),
      text: t({
        ru: "Колония едет в пробирке-инкубаторе с водой, в холодное время года - в утеплённой упаковке. Вместе с ней формикарий, инструменты, корм и инструкция.",
        ro: "Colonia călătorește într-o eprubetă-incubator cu apă, iar pe timp rece - în ambalaj termoizolat. Împreună cu ea vin formicariul, instrumentele, hrana și instrucțiunea.",
        en: "The colony travels in a test-tube incubator with water, in an insulated pack in cold weather. The formicarium, tools, food and a guide come with it.",
      }),
    },
    {
      title: t({ ru: "Колония крепнет в пробирке", ro: "Colonia se întărește în eprubetă", en: "The colony settles in its tube" }),
      text: t({
        ru: "Первые недели её не тревожат и не спешат с переездом. Корм 2-3 раза в неделю, остатки убирают пинцетом из набора.",
        ro: "În primele săptămâni nu o deranjezi și nu te grăbești cu mutarea. Hrană de 2-3 ori pe săptămână, resturile se scot cu penseta din set.",
        en: "For the first weeks it is left alone and not rushed into a move. Food 2-3 times a week, leftovers removed with the tweezers from the kit.",
      }),
    },
    {
      title: t({ ru: "Переезд в Terra", ro: "Mutarea în Terra", en: "Moving into Terra" }),
      text: t({
        ru: "Когда в пробирке станет тесно, колонию переселяют в формикарий. Подскажем в чате, когда пора и как это сделать.",
        ro: "Când eprubeta devine strâmtă, colonia se mută în formicariu. Îți spunem în chat când e momentul și cum se face.",
        en: "Once the tube gets cramped, the colony moves into the formicarium. We'll tell you in chat when it's time and how to do it.",
      }),
    },
  ];

  // Один источник для видимых вопросов и FAQPage-разметки.
  const kitFaq = [
    {
      q: { ru: "Нужно ли сразу переселять колонию в формикарий?", ro: "Trebuie mutată colonia imediat în formicariu?", en: "Should the colony move into the formicarium right away?" },
      a: {
        ru: "Нет. Первое время колония живёт в пробирке, в которой приезжает. Маленькая семья плохо переносит стресс, поэтому переселяют её позже, когда она окрепнет и в пробирке станет тесно.",
        ro: "Nu. La început colonia trăiește în eprubeta în care vine. O familie mică suportă greu stresul, de aceea mutarea se face mai târziu, când colonia se întărește și eprubeta devine strâmtă.",
        en: "No. At first the colony lives in the test tube it arrives in. A small family copes badly with stress, so it is rehoused later, once it grows stronger and the tube gets cramped.",
      },
    },
    {
      q: { ru: "Что идёт в подарок?", ro: "Ce primesc cadou?", en: "What comes as a gift?" },
      a: {
        ru: "Набор инструментов для формикария и зерновая смесь для жнецов. Мы добавляем их в заказ сами, а доставка по Кишинёву для заказа с формикарием бесплатная.",
        ro: "Setul de instrumente pentru formicariu și amestecul de semințe pentru secerătoare. Le adăugăm noi la comandă, iar livrarea în Chișinău pentru o comandă cu formicariu e gratuită.",
        en: "The formicarium tool kit and the seed mix for harvester ants. We add them to the order ourselves, and delivery within Chișinău is free for an order with a formicarium.",
      },
    },
    {
      q: { ru: "Подходит ли набор новичку?", ro: "Este setul potrivit pentru începători?", en: "Is the kit right for a beginner?" },
      a: {
        ru: "Да. Messor Structor - спокойный зерноядный вид, с которого удобнее всего начинать, а места в Terra колонии хватит примерно на 5 лет роста. Инструкция идёт в посылке, а после покупки мы остаёмся на связи.",
        ro: "Da. Messor Structor este o specie granivoră calmă, cea mai comodă pentru început, iar în Terra coloniei îi ajunge loc pentru circa 5 ani de creștere. Instrucțiunea vine în colet, iar după cumpărare rămânem în legătură.",
        en: "Yes. Messor Structor is a calm seed-eating species, the easiest one to start with, and Terra gives the colony room for about 5 years of growth. The guide is in the parcel, and we stay in touch after the purchase.",
      },
    },
    {
      q: { ru: "Можно собрать набор с другим видом?", ro: "Pot face setul cu altă specie?", en: "Can I build the kit with another species?" },
      a: {
        ru: "Да. Любая колония вместе с формикарием тоже получает набор инструментов и корм в подарок и бесплатную доставку по Кишинёву. Выберите вид в каталоге или спросите нас в Telegram.",
        ro: "Da. Orice colonie împreună cu un formicariu primește de asemenea cadou setul de instrumente și hrana, plus livrare gratuită în Chișinău. Alege specia din catalog sau întreabă-ne pe Telegram.",
        en: "Yes. Any colony bought together with a formicarium also gets the tool kit and food as a gift, plus free delivery within Chișinău. Pick a species in the catalog or ask us on Telegram.",
      },
    },
    {
      q: { ru: "Сколько стоит доставка за город?", ro: "Cât costă livrarea în afara orașului?", en: "How much is delivery out of town?" },
      a: {
        ru: "Рядом с Кишинёвом (например, Анений Ной) - стоимость проезда плюс 100 лей. В дальние города дороже: считаем дорогу туда и обратно и время в пути, сумму называем заранее. Доставляем по всей Молдове, время согласуем в Telegram или по телефону.",
        ro: "Lângă Chișinău (de exemplu, Anenii Noi) - costul transportului plus 100 lei. În orașele mai îndepărtate costă mai mult: socotim drumul dus-întors și timpul pe drum, iar suma o spunem din timp. Livrăm în toată Moldova, ora o stabilim pe Telegram sau la telefon.",
        en: "Near Chișinău (for example, Anenii Noi) it is the fare plus 100 lei. Farther towns cost more: we count the round trip and the time on the road and tell you the price in advance. We deliver across Moldova and agree on the time over Telegram or by phone.",
      },
    },
  ];

  const duo = [
    {
      key: "colony",
      to: `/${lang}/ants/${kitColony.slug}`,
      image: kitColony.images?.[1] || kitColony.images?.[0] || kitColony.image,
      title: t({ ru: "Messor Structor, муравьи-жнецы", ro: "Messor Structor, furnici secerătoare", en: "Messor Structor, harvester ants" }),
      text: t(kitColony.excerpt),
      facts: [
        { label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" }, value: findChar(kitColony.characteristics, "diff") },
        { label: { ru: "Температура", ro: "Temperatura", en: "Temperature" }, value: findChar(kitColony.characteristics, "temp") },
        { label: { ru: "Питание", ro: "Hrană", en: "Food" }, value: kitColony.food },
      ],
      more: t({ ru: "Подробнее о виде", ro: "Mai multe despre specie", en: "More about the species" }),
    },
    {
      key: "home",
      to: `/${lang}/formic/${kitFormicarium.slug}`,
      image: kitFormicarium.images?.[3] || kitFormicarium.images?.[0],
      title: t({ ru: "Формикарий Terra", ro: "Formicariul Terra", en: "The Terra formicarium" }),
      text: t(kitFormicarium.excerpt),
      facts: [
        { label: { ru: "Размер", ro: "Dimensiune", en: "Size" }, value: findChar(kitFormicarium.characteristics, "size") },
        { label: { ru: "Хватит колонии на", ro: "Îi ajunge coloniei", en: "Lasts a colony" }, value: kitFormicarium.capacity },
        { label: { ru: "Увлажнение", ro: "Umidificare", en: "Humidity" }, value: kitFormicarium.humidityType },
      ],
      more: t({ ru: "Подробнее о формикарии", ro: "Mai multe despre formicariu", en: "More about the formicarium" }),
    },
  ];

  return (
    <article className="kit-page">
      <SEO
        lang={lang}
        path={STARTER_KIT_PATH}
        title={pageSeo.starterKit.title}
        description={pageSeo.starterKit.description}
        image={kitImages[0]}
        type="product"
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            { name: kitTitle, path: STARTER_KIT_PATH },
          ]),
          productSchema(kitProduct, "formicarium", lang, STARTER_KIT_PATH),
          faqSchema(lang, kitFaq),
        ]}
      />

      <Link className="product-detail__back" to={`/${lang}`}>
        ← {t({ ru: "На главную", ro: "Acasă", en: "Home" })}
      </Link>

      <section className="kit-hero">
        <ProductGallery
          images={kitImages}
          title={t(kitTitle)}
          imageAlt={t({
            ru: "Стартовый набор: формикарий Terra с колонией муравьёв Messor Structor",
            ro: "Set de start: formicariul Terra cu o colonie de furnici Messor Structor",
            en: "Starter kit: the Terra formicarium with a Messor Structor ant colony",
          })}
          zoomLabel={t({ ru: "Увеличить", ro: "Mărește", en: "Zoom" })}
          badge={
            kitAvailability === "inStock" ? (
              <span className="product-badge product-badge--inStock">
                {t({ ru: "В наличии", ro: "În stoc", en: "In stock" })}
              </span>
            ) : null
          }
        />

        <div className="kit-buy">
          <h1 className="kit-buy__title">
            {t(kitTitle)}
            <span className="sr-only">:</span>{" "}
            <span>
              {t({
                ru: "формикарий Terra и колония Messor Structor",
                ro: "formicariul Terra și colonia Messor Structor",
                en: "Terra formicarium and a Messor Structor colony",
              })}
            </span>
          </h1>

          <p className="kit-buy__lead">{t(kitExcerpt)}</p>

          <div className="kit-buy__price">
            <strong>{lei(kitPrice)}</strong>
            <span>
              Terra {kitFormicariumPrice} + Messor Structor {kitColonyPrice}
            </span>
          </div>

          <p className="kit-buy__gift">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M4 11h16v9H4zM3 7h18v4H3zM12 7v13M12 7c-1.5-3-5-3.5-5-1.2C7 7 9.5 7 12 7zm0 0c1.5-3 5-3.5 5-1.2C17 7 14.5 7 12 7z" />
            </svg>
            <span>
              {t({ ru: "Подарки на", ro: "Cadouri de", en: "Gifts worth" })} <strong>{lei(kitGiftValue)}</strong>
              {": "}
              {t({
                ru: "набор инструментов, зерновая смесь и доставка по Кишинёву",
                ro: "setul de instrumente, amestecul de semințe și livrarea în Chișinău",
                en: "the tool kit, the seed mix and delivery within Chișinău",
              })}
            </span>
          </p>

          <div className="kit-buy__actions">
            <button
              type="button"
              className={`btn kit-buy__add${added ? " is-added" : ""}`}
              onClick={addKit}
              disabled={isOutOfStock}
            >
              {added
                ? t({ ru: "Набор в корзине", ro: "Setul e în coș", en: "Kit is in the cart" })
                : t({ ru: "Добавить набор в корзину", ro: "Adaugă setul în coș", en: "Add the kit to cart" })}
            </button>
            <button type="button" className="btn btn-secondary" onClick={buyNow} disabled={isOutOfStock}>
              {t({ ru: "Оформить заказ", ro: "Finalizează comanda", en: "Place order" })}
            </button>
          </div>

          <p className="kit-buy__status" role="status">
            {added && (
              <Link to={`/${lang}/cart`}>
                {t({ ru: "Перейти в корзину", ro: "Mergi la coș", en: "Go to cart" })}
              </Link>
            )}
          </p>

          <ul className="kit-buy__facts">
            {kitAvailability === "inStock" && (
              <li>{t({ ru: "Собираем из наличия и отправляем сразу", ro: "Pregătim din stoc și trimitem imediat", en: "Packed from stock and shipped right away" })}</li>
            )}
            <li>
              {t({ ru: "Места в Terra хватит на", ro: "Locul din Terra ajunge pentru", en: "Terra has room for" })}{" "}
              {t(kitFormicarium.capacity)} {t({ ru: "роста колонии", ro: "de creștere a coloniei", en: "of colony growth" })}
            </li>
            <li>{t({ ru: "Отвечаем в чате до и после покупки", ro: "Răspundem în chat înainte și după cumpărare", en: "We answer in chat before and after you buy" })}</li>
          </ul>
        </div>
      </section>

      <section className="kit-contents" aria-labelledby="kit-contents-title">
        <div className="kit-contents__head">
          <h2 id="kit-contents-title">{t({ ru: "Что в наборе", ro: "Ce conține setul", en: "What's in the kit" })}</h2>
          <p>
            {t({
              ru: "Две покупки и три подарка. Каждую часть можно открыть и рассмотреть отдельно.",
              ro: "Două produse și trei cadouri. Fiecare parte poate fi deschisă și văzută separat.",
              en: "Two purchases and three gifts. Each part opens on its own page.",
            })}
          </p>
        </div>

        <ul className="kit-list">
          {contents.map((entry) => (
            <li className={`kit-item${entry.gift ? " kit-item--gift" : ""}`} key={entry.key}>
              <Link className="kit-item__media" to={entry.to} tabIndex={-1} aria-hidden="true">
                <img {...responsiveImg(entry.image || "/placeholder-ant.svg", "132px")} alt="" loading="lazy" />
              </Link>
              <div className="kit-item__body">
                <span className="kit-item__role">{entry.role}</span>
                <Link className="kit-item__title" to={entry.to}>
                  {entry.title}
                </Link>
                <p>{entry.note}</p>
              </div>
              <div className="kit-item__price">
                {entry.gift ? (
                  <>
                    <s>{lei(entry.price)}</s>
                    <strong>{lei(0)}</strong>
                  </>
                ) : (
                  <strong>{lei(entry.price)}</strong>
                )}
              </div>
            </li>
          ))}

          <li className="kit-item kit-item--gift">
            <span className="kit-item__media kit-item__media--icon" aria-hidden="true">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 7h11v8H3zM14 10h3.4L21 13v2h-7z" />
                <circle cx="7" cy="17" r="1.7" />
                <circle cx="17" cy="17" r="1.7" />
              </svg>
            </span>
            <div className="kit-item__body">
              <span className="kit-item__role">{t(giftRole)}</span>
              <span className="kit-item__title">
                {t({ ru: "Доставка по Кишинёву", ro: "Livrare în Chișinău", en: "Delivery within Chișinău" })}
              </span>
              <p>
                {t({
                  ru: "Бесплатно, потому что в заказе есть формикарий. Рядом с Кишинёвом - проезд плюс 100 лей, в дальние города дороже.",
                  ro: "Gratuit, pentru că în comandă este un formicariu. Lângă Chișinău - transportul plus 100 lei, în orașele mai îndepărtate costă mai mult.",
                  en: "Free because the order includes a formicarium. Near Chișinău it is the fare plus 100 lei; farther towns cost more.",
                })}
              </p>
            </div>
            <div className="kit-item__price">
              <s>{lei(KIT_DELIVERY_VALUE)}</s>
              <strong>{lei(0)}</strong>
            </div>
          </li>
        </ul>

        <div className="kit-total">
          <span className="kit-total__apart">
            {t({ ru: "По отдельности", ro: "Separat", en: "Bought separately" })} <s>{lei(kitPrice + kitGiftValue)}</s>
          </span>
          <span className="kit-total__kit">
            {t({ ru: "Набором", ro: "Ca set", en: "As a kit" })} <strong>{lei(kitPrice)}</strong>
          </span>
          <button type="button" className="btn" onClick={addKit} disabled={isOutOfStock}>
            {added
              ? t({ ru: "Набор в корзине", ro: "Setul e în coș", en: "Kit is in the cart" })
              : t({ ru: "Добавить набор в корзину", ro: "Adaugă setul în coș", en: "Add the kit to cart" })}
          </button>
        </div>
      </section>

      <AntTrail className="kit-trail" />

      <section className="kit-steps">
        <h2>{t({ ru: "Как пройдёт старт", ro: "Cum decurge startul", en: "How the start goes" })}</h2>
        <ol className="kit-steps__list">
          {steps.map((step, i) => (
            <li key={step.title}>
              <span className="kit-steps__num" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        <p className="kit-steps__more">
          <Link className="text-link" to={`/${lang}/blog/starter-kit-guide`}>
            {t({ ru: "Подробная инструкция с фото", ro: "Instrucțiunea completă cu fotografii", en: "The full guide with photos" })}
          </Link>{" "}
          {t({
            ru: "- что делать дальше, когда колония подрастёт - арена, кормление, этажи и вода.",
            ro: "- ce faci mai departe, când colonia crește - arena, hrănirea, etajele și apa.",
            en: "- what to do next as the colony grows - the arena, feeding, floors and water.",
          })}
        </p>
      </section>

      <section className="kit-duo">
        <h2 className="sr-only">
          {t({ ru: "Из чего собран набор", ro: "Din ce e făcut setul", en: "What the kit is made of" })}
        </h2>
        {duo.map((part) => (
          <div className="kit-duo__part" key={part.key}>
            <Link className="kit-duo__media" to={part.to} tabIndex={-1} aria-hidden="true">
              <img {...responsiveImg(part.image || "/placeholder-ant.svg", "(max-width: 980px) 100vw, 620px")} alt="" loading="lazy" />
            </Link>
            <h3>{part.title}</h3>
            <p>{part.text}</p>
            <dl className="kit-duo__facts">
              {part.facts
                .filter((fact) => fact.value)
                .map((fact) => (
                  <div key={t(fact.label)}>
                    <dt>{t(fact.label)}</dt>
                    <dd>{fact.value ? t(fact.value) : ""}</dd>
                  </div>
                ))}
            </dl>
            <Link className="kit-duo__more" to={part.to}>
              {part.more}
            </Link>
          </div>
        ))}
      </section>

      <ProductReviews reviews={reviews} stats={reviewStats} lang={lang} />

      <section className="kit-faq" id="faq">
        <div className="kit-faq__head">
          <h2>{t({ ru: "Вопросы о наборе", ro: "Întrebări despre set", en: "Questions about the kit" })}</h2>
          <p>
            {t({ ru: "Не нашли ответ?", ro: "Nu ai găsit răspunsul?", en: "Didn't find an answer?" })}{" "}
            <a href={SITE_TELEGRAM} target="_blank" rel="noopener noreferrer">
              {t({ ru: "Спросите в Telegram", ro: "Întreabă pe Telegram", en: "Ask on Telegram" })}
            </a>
          </p>
        </div>
        <div className="kit-faq__list">
          {kitFaq.map((item, i) => (
            <details className="faq-wrap__item" key={t(item.q)} open={i === 0}>
              <summary>{t(item.q)}</summary>
              <p>{t(item.a)}</p>
            </details>
          ))}
        </div>
      </section>
    </article>
  );
}
