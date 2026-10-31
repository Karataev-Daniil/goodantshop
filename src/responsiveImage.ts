import type { ImgHTMLAttributes } from "react";

// ============================================================================
// Адаптивные картинки (srcset).
// При сборке плагин scripts/responsive-images.mjs кладёт рядом с каждой
// растровой картинкой из dist/assets уменьшенные копии в webp:
//   assets/messor-worker-B9snAqN1.webp -> assets/messor-worker-B9snAqN1-640w.webp
// Здесь по этому же правилу строится srcset, а браузер сам берёт копию под
// ширину экрана - телефон больше не качает исходник шириной до 3000px.
// В dev-сервере копий нет, поэтому там отдаём только src.
// ============================================================================

// Ширины уменьшенных копий. 800 - под телефон: экран ~412px при плотности
// 1.75-2 просит ~720-820px. Если копия шире исходника, она остаётся
// в размере исходника - файл есть всегда, srcset не ведёт на 404.
export const RESPONSIVE_WIDTHS = [160, 400, 640, 800, 1280];

// Картинки из public/ (у них нет хеша в имени), для которых тоже режутся копии.
export const PUBLIC_RESPONSIVE = ["/formicarium-colony.webp", "/logo.webp"];

// sizes карточки в сетке .grid.three: 3 колонки по ~410px, на 980px - 2, на 620px - 1.
export const CARD_SIZES = "(max-width: 620px) 100vw, (max-width: 980px) 50vw, 410px";

const RASTER = /\.(webp|jpe?g|png)$/i;

// Путь уменьшенной копии; плагин сборки пишет файлы по этой же функции.
export const responsiveVariant = (src: string, width: number) => src.replace(RASTER, `-${width}w.webp`);

export function responsiveSrcSet(src?: string): string | undefined {
  if (!src || import.meta.env.DEV || !RASTER.test(src)) return undefined;
  if (!src.startsWith("/assets/") && !PUBLIC_RESPONSIVE.includes(src)) return undefined;
  return RESPONSIVE_WIDTHS.map((width) => `${responsiveVariant(src, width)} ${width}w`).join(", ");
}

// fetchpriority React 18 ещё не знает в camelCase - пишем атрибут как в HTML.
type ResponsiveImgProps = ImgHTMLAttributes<HTMLImageElement> & { fetchpriority?: "high" };

// Пропсы для <img>: src + srcset + sizes. priority - для главной картинки
// первого экрана (LCP): грузится сразу и с высоким приоритетом.
export function responsiveImg(src: string | undefined, sizes: string, { priority = false } = {}): ResponsiveImgProps {
  const srcSet = responsiveSrcSet(src);
  const props: ResponsiveImgProps = srcSet ? { src, srcSet, sizes } : { src };
  if (priority) props.fetchpriority = "high";
  return props;
}
