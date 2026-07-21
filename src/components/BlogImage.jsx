import { useEffect, useState } from "react";
import { getText } from "./SEO";

// Одиночное фото статьи с приближением: клик по снимку (или кнопке-лупе)
// открывает полноэкранный лайтбокс, где картинку можно ещё раз кликнуть, чтобы
// увеличить. Закрытие по Esc или клику по фону. Галереи нет - только зум.
export default function BlogImage({ image, lang = "ru" }) {
  const [open, setOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);

  const close = () => {
    setOpen(false);
    setZoomed(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  const zoomLabel = getText({ ru: "Увеличить", ro: "Mărește", en: "Zoom" }, lang);
  const closeLabel = getText({ ru: "Закрыть", ro: "Închide", en: "Close" }, lang);
  const alt = getText(image.alt, lang);

  return (
    <>
      <figure className="blog-figure">
        <button type="button" className="blog-figure__btn" onClick={() => setOpen(true)} aria-label={zoomLabel}>
          <img src={image.src} alt={alt} loading="lazy" />
          <span className="blog-figure__zoom" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
        {image.caption && <figcaption>{getText(image.caption, lang)}</figcaption>}
      </figure>

      {open && (
        <div className="blog-lightbox" role="dialog" aria-modal="true" onClick={close}>
          <button type="button" className="blog-lightbox__close" onClick={close} aria-label={closeLabel}>
            ✕
          </button>
          <img
            className={`blog-lightbox__img${zoomed ? " is-zoomed" : ""}`}
            src={image.src}
            alt={alt}
            onClick={(event) => {
              event.stopPropagation();
              setZoomed((z) => !z);
            }}
          />
          {image.caption && (
            <p className="blog-lightbox__caption" onClick={(event) => event.stopPropagation()}>
              {getText(image.caption, lang)}
            </p>
          )}
        </div>
      )}
    </>
  );
}
