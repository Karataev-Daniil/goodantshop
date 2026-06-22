import { useLayoutEffect, useRef, useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import ProductGallery from "./ProductGallery";
import ProductCard from "./ProductCard";
import SEO, { breadcrumbSchema, productSchema, productSeo } from "./SEO";
import Stars from "./Stars";
import { reviewsFor, reviewStatsFor, formatReviewDate, SELLER_999_URL } from "../data/reviewsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

// Карточка отзыва: текст обрезается до 3 строк, длинные разворачиваются по кнопке.
function ReviewCard({ review, lang }) {
  const bodyRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  useLayoutEffect(() => {
    const el = bodyRef.current;
    if (el) setIsClamped(el.scrollHeight > el.clientHeight + 1);
  }, [review.body, lang]);

  return (
    <article className="review-card">
      <div className="review-card__top">
        <span className="review-card__author">{review.author}</span>
        <Stars value={review.rating} />
      </div>
      <p ref={bodyRef} className={`review-card__body ${expanded ? "is-expanded" : ""}`}>
        {review.body}
      </p>
      <div className="review-card__footer">
        <time className="review-card__date" dateTime={review.date}>
          {formatReviewDate(review.date, lang)}
        </time>
        {(isClamped || expanded) && (
          <button
            type="button"
            className="review-card__toggle"
            onClick={() => setExpanded((value) => !value)}
          >
            {expanded
              ? getText({ ru: "Свернуть", ro: "Restrânge", en: "Show less" }, lang)
              : getText({ ru: "Читать полностью", ro: "Citește tot", en: "Read more" }, lang)}
          </button>
        )}
      </div>
    </article>
  );
}

const singlePath = (type, lang, slug) =>
  type === "ant" ? `/${lang}/ants/${slug}` : `/${lang}/formic/${slug}`;

const catalogPath = (type, lang) =>
  type === "ant" ? `/${lang}/ants` : `/${lang}/formicariums`;

const availabilityLabel = {
  inStock: { ru: "В наличии", ro: "În stoc", en: "In stock" },
  preorder: { ru: "Предзаказ", ro: "Precomandă", en: "Pre-order" },
  outOfStock: { ru: "Нет в наличии", ro: "Nu este în stoc", en: "Out of stock" },
};

export default function ProductDetail({ item, type, crossSell = [], similar = [] }) {
  const { lang = "ru" } = useParams();
  const { addToCart } = useOutletContext();
  const navigate = useNavigate();

  const [qty, setQty] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [showAllReviews, setShowAllReviews] = useState(false);

  const productReviews = reviewsFor(type);
  const reviewStats = reviewStatsFor(type);
  const REVIEWS_PREVIEW = 4;
  const visibleReviews = showAllReviews ? productReviews : productReviews.slice(0, REVIEWS_PREVIEW);

  const crossType = type === "ant" ? "formicarium" : "ant";
  const images = item.images?.length ? item.images : [item.image || "/placeholder-ant.svg"];
  const primaryPrice = item.priceOptions?.[0];
  const isOutOfStock = item.availability === "outOfStock";
  const isPreorder = item.availability === "preorder";

  const findChar = (enKey) => {
    const row = item.characteristics?.find((c) => (c.label?.en || "").toLowerCase().includes(enKey));
    return row ? row.value : null;
  };

  const addItem = (id, count = 1) => {
    for (let n = 0; n < count; n += 1) addToCart(id);
  };

  const handleAddToCart = () => addItem(item.id, qty);
  const handleBuyNow = () => {
    addItem(item.id, qty);
    navigate(`/${lang}/cart`);
  };

  const addLabel = getText(
    isPreorder
      ? { ru: "Предзаказать", ro: "Precomandă", en: "Pre-order" }
      : { ru: "Добавить в корзину", ro: "Adaugă în coș", en: "Add to cart" },
    lang
  );

  // 3. Characteristics
  const specCards = (type === "ant"
    ? [
        { label: { ru: "Вид", ro: "Specie", en: "Species" }, value: item.title },
        { label: { ru: "Размер матки", ro: "Mărimea reginei", en: "Queen size" }, value: item.queenSize },
        { label: { ru: "Размер рабочего", ro: "Mărimea lucrătoarei", en: "Worker size" }, value: item.workerSize },
        { label: { ru: "Размер солдата", ro: "Mărimea soldatului", en: "Soldier size" }, value: item.soldierSize },
        { label: { ru: "Уровень сложности", ro: "Dificultate", en: "Difficulty" }, value: findChar("diff") },
        { label: { ru: "Температура содержания", ro: "Temperatura", en: "Temperature" }, value: findChar("temp") },
        { label: { ru: "Питание", ro: "Hrană", en: "Food" }, value: item.food },
      ]
    : [
        { label: { ru: "Материал", ro: "Material", en: "Material" }, value: findChar("material") },
        { label: { ru: "Размеры", ro: "Dimensiuni", en: "Dimensions" }, value: findChar("size") },
        { label: { ru: "Вместимость колонии", ro: "Capacitatea coloniei", en: "Colony capacity" }, value: item.capacity },
        { label: { ru: "Тип увлажнения", ro: "Tip de umidificare", en: "Humidity system" }, value: item.humidityType },
        { label: { ru: "Комплектация", ro: "Set inclus", en: "Kit contents" }, value: { ru: "Полный стартовый набор", ro: "Set complet de start", en: "Full starter kit" } },
      ]
  ).filter((card) => card.value);

  // 4. What's included
  const includedList =
    type === "ant"
      ? [
          { ru: "Матка с расплодом", ro: "Regină cu puiet", en: "Queen with brood" },
          { ru: "Пробирка-инкубатор с водой", ro: "Eprubetă-incubator cu apă", en: "Test-tube incubator with water" },
          { ru: "Инструкция по запуску колонии", ro: "Instrucțiune de pornire a coloniei", en: "Colony start-up guide" },
          { ru: "Поддержка в чате после покупки", ro: "Suport în chat după achiziție", en: "Post-purchase chat support" },
        ]
      : [
          { ru: "Формикарий (гнездо + арена)", ro: "Formicariu (cuib + arenă)", en: "Formicarium (nest + arena)" },
          { ru: "Система увлажнения", ro: "Sistem de umidificare", en: "Humidification system" },
          { ru: "Вентиляция и защита от побега", ro: "Ventilație și protecție anti-evadare", en: "Ventilation and anti-escape protection" },
          { ru: "Инструкция по уходу", ro: "Instrucțiune de îngrijire", en: "Care instructions" },
        ];

  // 6. Tabs content
  const careText =
    type === "ant"
      ? {
          ru: "Держите арену сухой, а зону гнезда слегка увлажнённой. Кормите углеводами и белком 2–3 раза в неделю и убирайте остатки. Первые недели не тревожьте колонию, давая ей закрепиться.",
          ro: "Păstrează arena uscată, iar zona cuibului ușor umedă. Hrănește cu carbohidrați și proteine de 2–3 ori pe săptămână și îndepărtează resturile. Primele săptămâni nu deranja colonia.",
          en: "Keep the arena dry and the nest area slightly humid. Feed carbohydrates and protein 2–3 times a week and remove leftovers. Don't disturb the colony in the first weeks while it settles.",
        }
      : {
          ru: "Поддерживайте влажность через встроенную систему, регулярно проветривайте арену и очищайте её от остатков корма. Конструкция предотвращает побег и сохраняет стабильный микроклимат.",
          ro: "Menține umiditatea prin sistemul integrat, aerisește arena regulat și curăț-o de resturi. Construcția previne evadarea și păstrează un microclimat stabil.",
          en: "Maintain humidity through the built-in system, ventilate the arena regularly and clean leftovers. The build prevents escapes and keeps a stable microclimate.",
        };

  const deliveryText = {
    ru: "Доставка по всей Молдове. Колонии упаковываются в утеплённую защиту, чтобы безопасно перенести транспортировку. После оформления заказа мы свяжемся с вами для согласования удобного способа доставки.",
    ro: "Livrare în toată Moldova. Coloniile sunt ambalate cu protecție termică pentru a suporta transportul în siguranță. După plasarea comenzii te contactăm pentru a stabili metoda de livrare.",
    en: "Delivery across Moldova. Colonies are packed with insulated protection to travel safely. After you place the order we contact you to agree on a convenient delivery method.",
  };

  const faqItems = [
    {
      q: { ru: "Безопасно ли это?", ro: "Este sigur?", en: "Is it safe?" },
      a: {
        ru: "Да. Муравьи остаются внутри прозрачного дома, а все комплекты проверены.",
        ro: "Da. Furnicile rămân în interiorul unui habitat transparent, iar fiecare kit este verificat.",
        en: "Yes. The ants stay inside a clear habitat, and every kit is quality checked.",
      },
    },
    {
      q: { ru: "Нужен ли опыт?", ro: "Este nevoie de experiență?", en: "Do I need experience?" },
      a: {
        ru: "Нет. Мы даём простые инструкции и поддержку, чтобы старт был лёгким даже для новичка.",
        ro: "Nu. Oferim instrucțiuni simple și suport pentru un start ușor chiar și pentru începători.",
        en: "No. We provide simple instructions and support so the start is easy even for a beginner.",
      },
    },
    {
      q: { ru: "Убегают ли муравьи?", ro: "Furnicile scapă?", en: "Do ants escape?" },
      a: {
        ru: "Нет. Формикарии и колонии упакованы так, чтобы исключить побег.",
        ro: "Nu. Formicariile și coloniile sunt sigilate pentru a preveni scăparea.",
        en: "No. Formicariums and colonies are sealed to prevent escape.",
      },
    },
  ];

  const tabs = [
    { key: "description", label: { ru: "Описание", ro: "Descriere", en: "Description" } },
    { key: "care", label: { ru: "Уход", ro: "Îngrijire", en: "Care" } },
    { key: "delivery", label: { ru: "Доставка", ro: "Livrare", en: "Delivery" } },
    { key: "faq", label: { ru: "FAQ", ro: "FAQ", en: "FAQ" } },
  ];

  // 7. Advantages
  const advantages = [
    {
      title: { ru: "Безопасная доставка", ro: "Livrare sigură", en: "Safe delivery" },
      text: { ru: "Утеплённая упаковка и компенсация рисков в пути.", ro: "Ambalaj termic și compensarea riscurilor pe drum.", en: "Insulated packaging and risk coverage in transit." },
    },
    {
      title: { ru: "Поддержка новичков", ro: "Suport pentru începători", en: "Beginner support" },
      text: { ru: "Помогаем адаптировать колонию на новом месте.", ro: "Te ajutăm să adaptezi colonia la noul loc.", en: "We help you settle the colony in its new home." },
    },
    {
      title: { ru: "Проверенные колонии", ro: "Colonii verificate", en: "Verified colonies" },
      text: { ru: "Каждая матка проходит карантин и проверку.", ro: "Fiecare regină trece prin carantină și verificare.", en: "Every queen passes quarantine and inspection." },
    },
    {
      title: { ru: "Консультация после покупки", ro: "Consultanță după achiziție", en: "Consultation after purchase" },
      text: { ru: "Остаёмся на связи и отвечаем на вопросы.", ro: "Rămânem în legătură și răspundem la întrebări.", en: "We stay in touch and answer your questions." },
    },
  ];

  const crossHeading =
    type === "ant"
      ? { ru: "Для запуска колонии понадобится дом", ro: "Pentru pornirea coloniei e nevoie de o casă", en: "Your colony will need a home to start" }
      : { ru: "Выберите колонию для заселения", ro: "Alege o colonie pentru populare", en: "Choose a colony to move in" };
  const seo = productSeo(item, type, lang);
  const productPath = type === "ant" ? `/ants/${item.slug}` : `/formic/${item.slug}`;
  const catalogSeoPath = type === "ant" ? "/ants" : "/formicariums";
  const catalogSeoName =
    type === "ant"
      ? { ru: "Муравьи", ro: "Furnici", en: "Ants" }
      : { ru: "Формикарии", ro: "Formicarii", en: "Formicariums" };

  return (
    <article className="section product-detail">
      <SEO
        lang={lang}
        path={productPath}
        title={seo.title}
        description={seo.description}
        image={images[0]}
        type="product"
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            { name: catalogSeoName, path: catalogSeoPath },
            { name: item.title, path: productPath },
          ]),
          productSchema(item, type, lang, productPath),
        ]}
      />
      <Link className="product-detail__back" to={catalogPath(type, lang)}>
        ← {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
      </Link>

      {/* 1–2. Gallery + main info */}
      <div className="product-detail__top">
        <ProductGallery
          images={images}
          title={getText(item.title, lang)}
          zoomLabel={getText({ ru: "Увеличить", ro: "Mărește", en: "Zoom" }, lang)}
          badge={
            item.availability ? (
              <span className={`product-badge product-badge--${item.availability}`}>
                {getText(availabilityLabel[item.availability], lang)}
              </span>
            ) : null
          }
        />

        <div className="product-buy">
          <p className="kicker">
            {getText(type === "ant" ? { ru: "Колония", ro: "Colonie", en: "Colony" } : { ru: "Формикарий", ro: "Formicariu", en: "Formicarium" }, lang)}
          </p>
          <h1 className="product-buy__title">{getText(item.title, lang)}</h1>

          {reviewStats.reviewCount > 0 && (
            <a className="product-buy__rating" href="#reviews">
              <Stars value={reviewStats.ratingValue} />
              <strong>{reviewStats.ratingValue.toFixed(1)}</strong>
              <span>
                {reviewStats.reviewCount}{" "}
                {getText({ ru: "отзывов", ro: "recenzii", en: "reviews" }, lang)}
              </span>
            </a>
          )}

          {primaryPrice && (
            <div className="product-buy__price">
              <strong>{primaryPrice.value}</strong>
              <span>{getText(primaryPrice.label, lang)}</span>
            </div>
          )}

          <p className="product-buy__excerpt">{getText(item.excerpt, lang)}</p>

          <div className="product-buy__cart">
            <div className="qty-stepper" aria-label={getText({ ru: "Количество", ro: "Cantitate", en: "Quantity" }, lang)}>
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−">−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="+">+</button>
            </div>
            <button type="button" className="btn" onClick={handleAddToCart} disabled={isOutOfStock}>
              {addLabel}
            </button>
            <button type="button" className="btn btn-secondary" onClick={handleBuyNow} disabled={isOutOfStock}>
              {getText({ ru: "Купить сейчас", ro: "Cumpără acum", en: "Buy now" }, lang)}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Characteristics */}
      {specCards.length > 0 && (
        <section className="product-section">
          <h2>{getText({ ru: "Характеристики", ro: "Caracteristici", en: "Specifications" }, lang)}</h2>
          <div className="spec-cards">
            {specCards.map((card) => (
              <div className="spec-cards__item" key={getText(card.label, lang)}>
                <span className="spec-cards__label">{getText(card.label, lang)}</span>
                <span className="spec-cards__value">{getText(card.value, lang)}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 4. What's included */}
      <section className="product-section">
        <h2>{getText({ ru: "Что входит в комплект", ro: "Ce include setul", en: "What's included" }, lang)}</h2>
        <ul className="included-list">
          {includedList.map((entry) => (
            <li key={getText(entry, lang)}>
              <span className="included-list__icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12.5 10 17.5 19.5 7" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              {getText(entry, lang)}
            </li>
          ))}
        </ul>
      </section>

      {/* 5. Cross-sell */}
      {crossSell.length > 0 && (
        <section className="product-section">
          <h2>{getText(crossHeading, lang)}</h2>
          <div className="cross-sell">
            {crossSell.map((cross) => (
              <article className="cross-card" key={cross.id}>
                <Link className="cross-card__media" to={singlePath(crossType, lang, cross.slug)}>
                  <img src={cross.images?.[0] || cross.image || "/placeholder-ant.svg"} alt={getText(cross.title, lang)} loading="lazy" />
                </Link>
                <div className="cross-card__body">
                  <Link className="cross-card__title" to={singlePath(crossType, lang, cross.slug)}>
                    {getText(cross.title, lang)}
                  </Link>
                  {cross.priceOptions?.[0] && <span className="cross-card__price">{cross.priceOptions[0].value}</span>}
                  <button type="button" className="btn btn-light" onClick={() => addItem(cross.id)}>
                    {getText({ ru: "Добавить вместе", ro: "Adaugă împreună", en: "Add together" }, lang)}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {/* 6. Tabs */}
      <section className="product-section">
        <div className="product-tabs">
          <div className="product-tabs__nav" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.key}
                className={`product-tabs__tab ${activeTab === tab.key ? "is-active" : ""}`}
                onClick={() => setActiveTab(tab.key)}
              >
                {getText(tab.label, lang)}
              </button>
            ))}
          </div>
          <div className="product-tabs__panel">
            {activeTab === "description" && <p>{getText(item.description, lang)}</p>}
            {activeTab === "care" && <p>{getText(careText, lang)}</p>}
            {activeTab === "delivery" && <p>{getText(deliveryText, lang)}</p>}
            {activeTab === "faq" && (
              <div className="product-faq">
                {faqItems.map((faq) => (
                  <details className="faq-wrap__item" key={getText(faq.q, lang)}>
                    <summary>{getText(faq.q, lang)}</summary>
                    <p>{getText(faq.a, lang)}</p>
                  </details>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 7. Advantages */}
      <section className="product-section">
        <h2>{getText({ ru: "Почему покупают у нас", ro: "De ce cumpără la noi", en: "Why buy from us" }, lang)}</h2>
        <div className="product-advantages">
          {advantages.map((adv) => (
            <div className="product-advantages__card" key={getText(adv.title, lang)}>
              <strong>{getText(adv.title, lang)}</strong>
              <p>{getText(adv.text, lang)}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 7.5 Customer reviews */}
      {productReviews.length > 0 && (
        <section className="product-section product-reviews" id="reviews">
          <div className="product-reviews__head">
            <h2>{getText({ ru: "Отзывы покупателей", ro: "Recenziile clienților", en: "Customer reviews" }, lang)}</h2>
            <div className="product-reviews__summary">
              <span className="product-reviews__score">{reviewStats.ratingValue.toFixed(1)}</span>
              <Stars value={reviewStats.ratingValue} />
              <span className="product-reviews__count">
                {reviewStats.reviewCount}{" "}
                {getText({ ru: "отзывов", ro: "recenzii", en: "reviews" }, lang)}
              </span>
            </div>
            <p className="product-reviews__source">
              <a href={SELLER_999_URL} target="_blank" rel="noopener noreferrer">
                {getText(
                  {
                    ru: "Реальные отзывы с профиля продавца на 999.md",
                    ro: "Recenzii reale de pe profilul vânzătorului pe 999.md",
                    en: "Real reviews from the seller profile on 999.md",
                  },
                  lang
                )}
              </a>
            </p>
          </div>

          <div className="product-reviews__grid">
            {visibleReviews.map((review) => (
              <ReviewCard review={review} lang={lang} key={`${review.author}-${review.date}`} />
            ))}
          </div>

          {productReviews.length > REVIEWS_PREVIEW && (
            <button
              type="button"
              className="btn btn-secondary product-reviews__more"
              onClick={() => setShowAllReviews((value) => !value)}
            >
              {showAllReviews
                ? getText({ ru: "Свернуть отзывы", ro: "Ascunde recenziile", en: "Show fewer reviews" }, lang)
                : getText({ ru: "Показать все отзывы", ro: "Arată toate recenziile", en: "Show all reviews" }, lang)}
            </button>
          )}
        </section>
      )}

      {/* 8. Similar products */}
      {similar.length > 0 && (
        <section className="product-section">
          <h2>{getText({ ru: "Похожие товары", ro: "Produse similare", en: "Similar products" }, lang)}</h2>
          <div className="grid three">
            {similar.map((rel) => (
              <ProductCard key={rel.id} item={rel} linkTo={singlePath(type, lang, rel.slug)} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
