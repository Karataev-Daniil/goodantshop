import { useState } from "react";
import { Link, useNavigate, useOutletContext, useParams } from "react-router-dom";
import ProductGallery from "../components/ProductGallery";
import SEO, { breadcrumbSchema, productSchema, productSeo, getText } from "../components/SEO";
import { getAccessory } from "../data/accessoriesData";

// Страница дополнительного товара - намеренно короткая: галерея, цена,
// описание, состав и памятка по использованию. Без табов, отзывов и блока
// «похожие» - аксессуару этого не нужно, а длинная страница только мешает.
export default function SingleAccessoryPage() {
  const { slug, lang = "ru" } = useParams();
  const { addToCart } = useOutletContext();
  const navigate = useNavigate();
  const item = getAccessory(slug);

  const [qty, setQty] = useState(1);

  if (!item) {
    return (
      <article className="section">
        <div className="panel">
          <h1>{getText({ ru: "Товар не найден", ro: "Produsul nu a fost găsit", en: "Product not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/ants`}>
            {getText({ ru: "В каталог", ro: "La catalog", en: "Go to catalog" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  const option = item.priceOptions?.[0] || null;
  const images = item.images?.length ? item.images : [item.image];
  const productPath = `/accessories/${item.slug}`;
  const seo = productSeo(item, "accessory", lang);

  const addItem = () => {
    for (let n = 0; n < qty; n += 1) addToCart(item.id, option);
  };
  const buyNow = () => {
    addItem();
    navigate(`/${lang}/cart`);
  };

  // Корм ведём в каталог муравьёв, инструменты - в формикарии.
  const backTo = item.kind === "food" ? "ants" : "formicariums";
  const backLabel =
    item.kind === "food"
      ? { ru: "Ко всем муравьям", ro: "La toate furnicile", en: "All ants" }
      : { ru: "Ко всем формикариям", ro: "La toate formicariile", en: "All formicariums" };

  return (
    <article className="section product-detail accessory-detail">
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
            { name: item.title, path: productPath },
          ]),
          productSchema(item, "accessory", lang, productPath),
        ]}
      />

      <Link className="product-detail__back" to={`/${lang}/${backTo}`}>
        ← {getText(backLabel, lang)}
      </Link>

      <div className="product-detail__top">
        <ProductGallery
          images={images}
          title={getText(item.title, lang)}
          imageAlt={getText(item.title, lang)}
          zoomLabel={getText({ ru: "Увеличить", ro: "Mărește", en: "Zoom" }, lang)}
        />

        <div className="product-buy">
          <p className="kicker">
            {getText(
              item.kind === "food"
                ? { ru: "Корм", ro: "Hrană", en: "Food" }
                : { ru: "Аксессуар", ro: "Accesoriu", en: "Accessory" },
              lang
            )}
          </p>
          <h1 className="product-buy__title">{getText(item.title, lang)}</h1>

          {option && (
            <div className="product-buy__price">
              <strong>{option.value}</strong>
              <span>{getText(option.label, lang)}</span>
            </div>
          )}

          <p className="product-buy__excerpt">{getText(item.excerpt, lang)}</p>

          {item.giftWithBundle && (
            <p className="gift-note">
              <span className="gift-note__tag">
                {getText({ ru: "В подарок", ro: "Cadou", en: "Free gift" }, lang)}
              </span>
              {getText(
                {
                  ru: "Идёт бесплатно, если берёте колонию вместе с формикарием.",
                  ro: "Vine gratuit dacă iei colonia împreună cu formicariul.",
                  en: "Included free when you take a colony together with a formicarium.",
                },
                lang
              )}{" "}
              <Link to={`/${lang}/ants`}>
                {getText({ ru: "Собрать комплект", ro: "Alege setul", en: "Build a set" }, lang)}
              </Link>
            </p>
          )}

          <div className="product-buy__cart">
            <div
              className="qty-stepper"
              aria-label={getText({ ru: "Количество", ro: "Cantitate", en: "Quantity" }, lang)}
            >
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="−">−</button>
              <span>{qty}</span>
              <button type="button" onClick={() => setQty((q) => q + 1)} aria-label="+">+</button>
            </div>
            <button type="button" className="btn" onClick={addItem}>
              {getText({ ru: "Добавить в корзину", ro: "Adaugă în coș", en: "Add to cart" }, lang)}
            </button>
            <button type="button" className="btn btn-secondary" onClick={buyNow}>
              {getText({ ru: "Оформить заказ", ro: "Finalizează comanda", en: "Place order" }, lang)}
            </button>
          </div>
        </div>
      </div>

      <section className="product-section">
        <h2>{getText({ ru: "Описание", ro: "Descriere", en: "Description" }, lang)}</h2>
        <p>{getText(item.description, lang)}</p>
      </section>

      {item.includes?.length > 0 && (
        <section className="product-section">
          <h2>{getText({ ru: "Что входит", ro: "Ce include", en: "What's included" }, lang)}</h2>
          <ul className="included-list">
            {item.includes.map((entry) => (
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
      )}

      {item.usage && (
        <section className="product-section">
          <h2>{getText({ ru: "Как использовать", ro: "Cum se folosește", en: "How to use" }, lang)}</h2>
          <p>{getText(item.usage, lang)}</p>
        </section>
      )}
    </article>
  );
}
