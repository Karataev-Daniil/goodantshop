import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import SpecsTable from "../components/SpecsTable";
import ProductCard from "../components/ProductCard";
import { formicariums } from "../data/formicariumsData";
import { ants } from "../data/antsData";
import { blogPosts } from "../data/blogPostsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }

  return value ?? "";
};

export default function FormicPage() {
  const { slug, lang = "ru" } = useParams();
  const { addToCart } = useOutletContext();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const formic = formicariums.find((item) => item.slug === slug);

  if (!formic) {
    return (
      <article className="section single-page single-formic-page">
        <div className="panel">
          <h1>{getText({ ru: "Формикарий не найден", ro: "Formicarul nu a fost găsit", en: "Formicarium not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/formicariums`}>
            {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  const relatedAnts = ants.filter((ant) => formic.recommendedAntIds?.includes(ant.id));
  const relatedPosts = blogPosts.filter((post) => formic.relatedBlogIds?.includes(post.id));
  const galleryImages = formic.images?.length ? formic.images : [formic.image || "/placeholder-ant.svg"];
  const currentImage = galleryImages[activeImageIndex] || "/placeholder-ant.svg";
  const slideCount = galleryImages.length;
  const movePrevious = () => setActiveImageIndex((prev) => (prev - 1 + slideCount) % slideCount);
  const moveNext = () => setActiveImageIndex((prev) => (prev + 1) % slideCount);

  return (
    <article className="section single-page single-formic-page">
      <header className="single-hero">
        <div className="single-hero__media">
          <img src={currentImage} alt={getText(formic.title, lang)} />
          {galleryImages.length > 1 && (
            <div className="single-slider-controls">
              <button type="button" className="slider-button prev" onClick={movePrevious}>
                ‹
              </button>
              <button type="button" className="slider-button next" onClick={moveNext}>
                ›
              </button>
            </div>
          )}
          {formic.availability && (
            <span className={`availability-tag availability-${formic.availability}`}>
              {getText({
                ru: formic.availability === "inStock" ? "В наличии" : formic.availability === "preorder" ? "Предзаказ" : "Нет в наличии",
                ro: formic.availability === "inStock" ? "În stoc" : formic.availability === "preorder" ? "Precomandă" : "Nu este în stoc",
                en: formic.availability === "inStock" ? "In stock" : formic.availability === "preorder" ? "Pre-order" : "Out of stock",
              }, lang)}
            </span>
          )}
        </div>
        <div className="single-hero__content">
          <p className="single-hero__kicker">{getText({ ru: "Формикарий", ro: "Formicar", en: "Formicarium" }, lang)}</p>
          <h1 className="single-hero__title">{getText(formic.title, lang)}</h1>
          <p className="single-hero__lead">{getText(formic.excerpt, lang)}</p>
          <div className="single-hero__actions">
            <Link className="btn" to={`/${lang}/formicariums`}>
              {getText({ ru: "Назад в каталог", ro: "Înapoi la catalog", en: "Back to catalog" }, lang)}
            </Link>
            <button
              className="btn btn-secondary"
              type="button"
              onClick={() => addToCart(formic.id)}
              disabled={formic.availability === "outOfStock"}
            >
              {getText(
                formic.availability === "preorder"
                  ? { ru: "Предзаказать", ro: "Precomandă", en: "Pre-order" }
                  : { ru: "Добавить в корзину", ro: "Adaugă în coș", en: "Add to cart" },
                lang
              )}
            </button>
          </div>
        </div>
      </header>

      <section className="single-grid">
        <div className="panel no-border">
          <h2>{getText({ ru: "Описание модели", ro: "Descrierea modelului", en: "Model description" }, lang)}</h2>
          <p>{getText(formic.description, lang)}</p>
        </div>

        <aside className="panel panel--stacked no-border">
          <h2>{getText({ ru: "Параметры", ro: "Parametri", en: "Specifications" }, lang)}</h2>
          {formic.characteristics?.length ? (
            <SpecsTable specs={formic.characteristics} />
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

      {galleryImages.length > 1 && (
        <section className="section panel no-border formic-slider">
          <div className="slider-thumbs">
            {galleryImages.map((src, index) => (
              <button
                key={index}
                type="button"
                className={index === activeImageIndex ? "active" : ""}
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={src} alt={`${getText(formic.title, lang)} ${index + 1}`} loading="lazy" />
              </button>
            ))}
          </div>
        </section>
      )}

      {relatedAnts.length > 0 && (
        <section className="section panel no-border">
          <h2>{getText({ ru: "Лучшие виды для этого формикария", ro: "Cele mai bune specii pentru acest formicar", en: "Best species for this formicarium" }, lang)}</h2>
          <div className="grid three">
            {relatedAnts.map((ant) => (
              <ProductCard key={ant.id} item={ant} linkTo={`/${lang}/ants/${ant.slug}`} onAddToCart={addToCart} />
            ))}
          </div>
        </section>
      )}

      {relatedPosts.length > 0 && (
        <section className="section panel no-border">
          <h2>{getText({ ru: "Полезные статьи", ro: "Articole utile", en: "Helpful articles" }, lang)}</h2>
          <div className="blog-grid">
            {relatedPosts.map((post) => (
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
