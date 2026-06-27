import { useState } from "react";

const ChevronLeft = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChevronRight = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function ProductGallery({ images, title, imageAlt, badge, zoomLabel = "Zoom" }) {
  const altText = imageAlt || title;
  const slides = images?.length ? images : ["/placeholder-ant.svg"];
  const [index, setIndex] = useState(0);
  const [zoom, setZoom] = useState(false);
  const [touchStartX, setTouchStartX] = useState(null);

  const count = slides.length;
  const current = slides[index] || "/placeholder-ant.svg";
  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  const onTouchStart = (event) => setTouchStartX(event.touches[0].clientX);
  const onTouchEnd = (event) => {
    if (touchStartX === null) return;
    const dx = event.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 40) {
      if (dx < 0) goNext();
      else goPrev();
    }
    setTouchStartX(null);
  };

  return (
    <div className="product-gallery">
      <div className="product-gallery__stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <img
          className="product-gallery__image"
          src={current}
          alt={altText}
          loading="lazy"
          onClick={() => setZoom(true)}
        />
        {badge}
        {count > 1 && (
          <>
            <button
              type="button"
              className="product-gallery__nav product-gallery__nav--prev"
              onClick={goPrev}
              aria-label="Previous image"
            >
              <ChevronLeft />
            </button>
            <button
              type="button"
              className="product-gallery__nav product-gallery__nav--next"
              onClick={goNext}
              aria-label="Next image"
            >
              <ChevronRight />
            </button>
          </>
        )}
        <button
          type="button"
          className="product-gallery__zoom"
          onClick={() => setZoom(true)}
          aria-label={zoomLabel}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M20 20l-3.2-3.2M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {count > 1 && (
        <div className="product-gallery__thumbs">
          {slides.map((src, i) => (
            <button
              key={i}
              type="button"
              className={`product-gallery__thumb ${i === index ? "is-active" : ""}`}
              onClick={() => setIndex(i)}
              aria-label={`Image ${i + 1}`}
            >
              <img src={src} alt="" loading="lazy" />
            </button>
          ))}
        </div>
      )}

      {zoom && (
        <div
          className="product-gallery__lightbox"
          onClick={() => setZoom(false)}
          role="dialog"
          aria-modal="true"
        >
          <img src={current} alt={altText} />
          <button type="button" className="product-gallery__close" aria-label="Close">
            ✕
          </button>
        </div>
      )}
    </div>
  );
}
