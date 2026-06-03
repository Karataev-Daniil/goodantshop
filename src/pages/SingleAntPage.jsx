import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import SpecsTable from "../components/SpecsTable";
import ProductCard from "../components/ProductCard";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { blogPosts } from "../data/blogPostsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }

  return value ?? "";
};

export default function SingleAntPage() {
  const { slug, lang = "ru" } = useParams();
  const { addToCart } = useOutletContext();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const ant = ants.find((item) => item.slug === slug);

  if (!ant) {
    return (
      <article className="section single-page single-ant-page">
        <div className="panel">
          <h1>{getText({ ru: "Муравей не найден", ro: "Furnica nu a fost găsită", en: "Ant not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/ants`}>
            {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  const selectedFormicarium = formicariums.find(
    (item) => item.id === ant.recommendedFormicariumIds?.[0]
  );
  const antImages = ant.images?.length ? ant.images : [ant.image || "/placeholder-ant.svg"];
  const currentImage = antImages[activeImageIndex] || "/placeholder-ant.svg";
  const antSlideCount = antImages.length;
  const moveAntPrevious = () => setActiveImageIndex((prev) => (prev - 1 + antSlideCount) % antSlideCount);
  const moveAntNext = () => setActiveImageIndex((prev) => (prev + 1) % antSlideCount);

  const articleLinks = ant.relatedBlogIds
    ? blogPosts.filter((post) => ant.relatedBlogIds.includes(post.id))
    : [];

  return (
    <article className="section single-page single-ant-page">
      <header className="single-hero">
        <div className="single-hero__media">
          <img src={currentImage} alt={getText(ant.title, lang)} />
          {antImages.length > 1 && (
            <div className="single-slider-controls">
              <button type="button" className="slider-button prev" onClick={moveAntPrevious}>
                ‹
              </button>
              <button type="button" className="slider-button next" onClick={moveAntNext}>
                ›
              </button>
            </div>
          )}
          {ant.availability && (
            <span className={`availability-tag availability-${ant.availability}`}>
              {getText({
                ru: ant.availability === "inStock" ? "В наличии" : ant.availability === "preorder" ? "Предзаказ" : "Нет в наличии",
                ro: ant.availability === "inStock" ? "În stoc" : ant.availability === "preorder" ? "Precomandă" : "Nu este în stoc",
                en: ant.availability === "inStock" ? "In stock" : ant.availability === "preorder" ? "Pre-order" : "Out of stock",
              }, lang)}
            </span>
          )}
        </div>
        <div className="single-hero__content">
          <p className="single-hero__kicker">{getText({ ru: "Питомец", ro: "Animal de companie", en: "Ant profile" }, lang)}</p>
          <h1 className="single-hero__title">{getText(ant.title, lang)}</h1>
          <p className="single-hero__lead">{getText(ant.excerpt, lang)}</p>
          <div className="single-hero__actions">
            <Link className="btn" to={`/${lang}/ants`}>
              {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
            </Link>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => addToCart(ant.id)}
              disabled={ant.availability === "outOfStock"}
            >
              {getText(
                ant.availability === "preorder"
                  ? { ru: "Предзаказать", ro: "Precomandă", en: "Pre-order" }
                  : { ru: "Добавить в корзину", ro: "Adaugă în coș", en: "Add to cart" },
                lang
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="single-grid">
        <div className="panel">
          <h2>{getText({ ru: "Описание", ro: "Descriere", en: "Description" }, lang)}</h2>
          {ant.description ? (
            <p>{getText(ant.description, lang)}</p>
          ) : (
            <div>
              <div className="panel__placeholder" />
              <div className="panel__placeholder" />
              <div className="panel__placeholder panel__placeholder--short" />
            </div>
          )}
        </div>

        <aside className="panel panel--stacked">
          <h2>{getText({ ru: "Характеристики", ro: "Caracteristici", en: "Specifications" }, lang)}</h2>
          {ant.characteristics?.length ? (
            <SpecsTable specs={ant.characteristics} />
          ) : (
            <div className="specs-skeleton">
              <div className="specs-skeleton__row" />
              <div className="specs-skeleton__row" />
              <div className="specs-skeleton__row" />
              <div className="specs-skeleton__row" />
            </div>
          )}
        </aside>
      </section>

      {selectedFormicarium && (
        <section className="section panel no-border">
          <h2>{getText({ ru: "Рекомендуемый формикарий", ro: "Formicar recomandat", en: "Recommended formicarium" }, lang)}</h2>
          <ProductCard
            item={selectedFormicarium}
            linkTo={`/${lang}/formic/${selectedFormicarium.slug}`}
            onAddToCart={addToCart}
          />
        </section>
      )}

      {articleLinks.length > 0 && (
        <section className="section panel no-border">
          <h2>{getText({ ru: "Полезные статьи", ro: "Articole utile", en: "Helpful articles" }, lang)}</h2>
          <div className="blog-grid">
            {articleLinks.map((post) => (
              <article className="blog-card" key={post.id}>
                <div className="blog-card__content">
                  <h3>{getText(post.title, lang)}</h3>
                  <p>{getText(post.excerpt, lang)}</p>
                  <Link className="btn" to={`/${lang}/blog/${post.slug}`}>
                    {getText({ ru: "Читать", ro: "Citește", en: "Read" }, lang)}
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
