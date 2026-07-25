import { useEffect, useState } from "react";
import { getText } from "./SEO";

// Локальный ролик статьи как «живая гифка»: автоплей без звука по кругу, без
// стандартных кнопок (пауза/полный экран убраны). Клик открывает тот же ролик
// крупно в лайтбоксе - так же, как приближается фото (см. BlogImage).
export default function BlogClip({ clip, lang = "ru" }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event) => {
      if (event.key === "Escape") setOpen(false);
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
  const label = getText(clip.alt, lang) || "video";

  // Общие атрибуты видео: гифка без управления.
  const videoProps = {
    src: clip.src,
    autoPlay: true,
    muted: true,
    loop: true,
    playsInline: true,
    preload: "auto",
    disablePictureInPicture: true,
    controlsList: "nodownload nofullscreen noremoteplayback",
    "aria-label": label,
  };

  return (
    <>
      <figure className="blog-figure">
        <button type="button" className="blog-figure__btn" onClick={() => setOpen(true)} aria-label={zoomLabel}>
          <div className="blog-video">
            {/* muted до автоплея выставляем и через ref-атрибут, некоторые
                браузеры игнорируют проп muted при первом рендере */}
            <video {...videoProps} ref={(el) => el && (el.muted = true)} tabIndex={-1} />
          </div>
          <span className="blog-figure__zoom" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="M20 20l-3.2-3.2M11 8v6M8 11h6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
        </button>
        {clip.caption && <figcaption>{getText(clip.caption, lang)}</figcaption>}
      </figure>

      {open && (
        <div className="blog-lightbox" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <button type="button" className="blog-lightbox__close" onClick={() => setOpen(false)} aria-label={closeLabel}>
            ✕
          </button>
          <video
            {...videoProps}
            ref={(el) => el && (el.muted = true)}
            className="blog-lightbox__video"
            onClick={(event) => event.stopPropagation()}
          />
          {clip.caption && (
            <p className="blog-lightbox__caption" onClick={(event) => event.stopPropagation()}>
              {getText(clip.caption, lang)}
            </p>
          )}
        </div>
      )}
    </>
  );
}
