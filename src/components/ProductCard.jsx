import { Link, useParams } from "react-router-dom";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function ProductCard({ item, linkTo }) {
  const { lang = "ru" } = useParams();
  const imageSrc = item.image || item.images?.[0] || "/logo.png";
  const title = getText(item.title, lang);
  const excerpt = getText(item.excerpt, lang);

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
        <Link className="btn" to={linkTo}>
          Подробнее
        </Link>
      </div>
    </article>
  );
}
