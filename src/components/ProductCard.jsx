import { Link, useParams } from "react-router-dom";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function ProductCard({ item, linkTo, onAddToCart }) {
  const { lang = "ru" } = useParams();
  const imageSrc = item.image || item.images?.[0] || "/logo.png";
  const title = getText(item.title, lang);
  const excerpt = getText(item.excerpt, lang);
  const priceOptions = item.priceOptions ?? [];

  const firstPrice = priceOptions[0];

  return (
    <article className="product-card">
      <Link className="product-media" to={linkTo}>
        <img src={imageSrc} alt={title} loading="lazy" />
      </Link>
      <div className="product-content">
        <h3>
          <Link to={linkTo}>{title}</Link>
        </h3>
        <p>{excerpt}</p>
        {priceOptions.length > 0 && (
          <div className="product-prices">
            {priceOptions.map((option) => (
              <p key={`${option.value}-${option.label?.ru ?? "price"}`} className="product-prices__row">
                <span>{getText(option.label, lang)}</span>
                <strong>{option.value}</strong>
              </p>
            ))}
          </div>
        )}
        <div className="product-actions">
          <Link className="btn" to={linkTo}>
            {getText({ ru: "Подробнее", ro: "Detalii", en: "Details" }, lang)}
          </Link>
          {onAddToCart && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() =>
                onAddToCart({
                  id: item.id,
                  slug: item.slug,
                  title,
                  qty: 1,
                  variant: firstPrice ? getText(firstPrice.label, lang) : "",
                  price: firstPrice?.value ?? "",
                })
              }
            >
              {getText({ ru: "В корзину", ro: "In cos", en: "Add to cart" }, lang)}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
