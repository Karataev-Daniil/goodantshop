import { useState } from "react";
import { Link, useParams } from "react-router-dom";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

const availabilityLabels = {
  inStock: {
    ru: "В наличии",
    ro: "În stoc",
    en: "In stock",
  },
  preorder: {
    ru: "Предзаказ",
    ro: "Precomandă",
    en: "Pre-order",
  },
  outOfStock: {
    ru: "Нет в наличии",
    ro: "Nu este în stoc",
    en: "Out of stock",
  },
};

const getAvailabilityTitle = (availability, lang) =>
  availability ? getText(availabilityLabels[availability] || {}, lang) : "";

export default function ProductCard({ item, linkTo, onAddToCart }) {
  const { lang = "ru" } = useParams();
  const [previewIndex, setPreviewIndex] = useState(0);
  const previewImages = item.images?.length ? item.images : [item.image || "/placeholder-ant.svg"];
  const imageSrc = previewImages[previewIndex] || "/placeholder-ant.svg";
  const title = getText(item.title, lang);
  const excerpt = getText(item.excerpt, lang);
  const availabilityTitle = getAvailabilityTitle(item.availability, lang);
  const isPreorder = item.availability === "preorder";
  const isOutOfStock = item.availability === "outOfStock";

  const handleProductHoverMove = (event) => {
    if (previewImages.length < 2) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const nextIndex = Math.min(
      previewImages.length - 1,
      Math.max(0, Math.floor((x / Math.max(rect.width, 1)) * previewImages.length))
    );
    setPreviewIndex(nextIndex);
  };

  const resetPreview = () => setPreviewIndex(0);

  return (
    <article className="product-card">
      <Link
        className="product-media"
        to={linkTo}
        aria-label={title}
        onMouseMove={handleProductHoverMove}
        onMouseLeave={resetPreview}
      >
        <img src={imageSrc} alt={title} loading="lazy" />
        {item.availability && (
          <span
            className={`product-card__status product-card__status--${item.availability}`}
            title={availabilityTitle}
            aria-label={availabilityTitle}
          >
            {availabilityTitle}
          </span>
        )}
        <span className="product-card__hover-delivery">
          {getText({ ru: "Доставка", ro: "Livrare", en: "Delivery" }, lang)}
        </span>
      </Link>
      <div className="product-content">
        <h3>
          <Link to={linkTo}>{title}</Link>
        </h3>
        <p>{excerpt}</p>
        <div className="product-actions">
          <Link className="btn" to={linkTo}>
            {getText({ ru: "Подробнее", ro: "Detalii", en: "Details" }, lang)}
          </Link>
          {onAddToCart && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => onAddToCart(item.id)}
              disabled={isOutOfStock}
            >
              {getText(
                isPreorder
                  ? { ru: "Предзаказать", ro: "Precomandă", en: "Pre-order" }
                  : { ru: "В корзину", ro: "In cos", en: "Add to cart" },
                lang
              )}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
