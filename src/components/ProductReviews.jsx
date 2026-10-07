import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Stars from "./Stars";
import { formatReviewDate, SELLER_999_URL } from "../data/reviewsData";
import { getText } from "./SEO";

// Блок отзывов товара. Жил внутри ProductDetail, но отзывы понадобились и на
// странице аксессуара - вынесен целиком, чтобы разметка и логика «показать все»
// не разъезжались между двумя страницами.
//
// `source` подписывает происхождение отзывов. У колоний и формикариев это
// профиль на 999.md, у аксессуаров - переписка в Telegram; подменять одно
// другим нельзя, иначе подпись под блоком станет неправдой.

const REVIEWS_PREVIEW = 4;

// На сервере (пререндер) useLayoutEffect не выполняется и сыплет
// предупреждениями - там подменяем его на useEffect, который тоже не запустится.
const useIsomorphicLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

// Карточка отзыва: текст обрезается до 3 строк, длинные разворачиваются по кнопке.
function ReviewCard({ review, lang }) {
  const bodyRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const [isClamped, setIsClamped] = useState(false);

  useIsomorphicLayoutEffect(() => {
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

export default function ProductReviews({ reviews, stats, lang, source = "999" }) {
  const [showAll, setShowAll] = useState(false);

  if (!reviews.length) return null;

  const visible = showAll ? reviews : reviews.slice(0, REVIEWS_PREVIEW);

  return (
    <section className="product-section product-reviews" id="reviews">
      <div className="product-reviews__head">
        <h2>
          {getText({ ru: "Отзывы покупателей", ro: "Recenziile clienților", en: "Customer reviews" }, lang)}
        </h2>
        <div className="product-reviews__summary">
          <span className="product-reviews__score">{stats.ratingValue.toFixed(1)}</span>
          <Stars value={stats.ratingValue} />
          <span className="product-reviews__count">
            {stats.reviewCount} {getText({ ru: "отзывов", ro: "recenzii", en: "reviews" }, lang)}
          </span>
        </div>

        <p className="product-reviews__source">
          {source === "telegram" ? (
            getText(
              {
                ru: "Отзывы покупателей, оставленные при покупке и в Telegram",
                ro: "Recenzii lăsate de clienți la cumpărare și pe Telegram",
                en: "Customer feedback given at purchase and on Telegram",
              },
              lang
            )
          ) : (
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
          )}
        </p>
      </div>

      <div className="product-reviews__grid">
        {visible.map((review) => (
          <ReviewCard review={review} lang={lang} key={`${review.author}-${review.date}`} />
        ))}
      </div>

      {reviews.length > REVIEWS_PREVIEW && (
        <button
          type="button"
          className="btn btn-secondary product-reviews__more"
          onClick={() => setShowAll((value) => !value)}
        >
          {showAll
            ? getText({ ru: "Свернуть отзывы", ro: "Ascunde recenziile", en: "Show fewer reviews" }, lang)
            : getText({ ru: "Показать все отзывы", ro: "Arată toate recenziile", en: "Show all reviews" }, lang)}
        </button>
      )}
    </section>
  );
}
