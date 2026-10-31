// Vite-плагин: после клиентской сборки нарезает уменьшенные webp-копии картинок
// для srcset. Ширины, список файлов из public/ и правило имён живут в
// src/responsiveImage.ts - там же строится srcset, поэтому имена всегда совпадают.
import path from "node:path";
import sharp from "sharp";
import { PUBLIC_RESPONSIVE, RESPONSIVE_WIDTHS, responsiveVariant } from "../src/responsiveImage.ts";

const RASTER = /\.(webp|jpe?g|png)$/i;

async function writeVariants(source, target) {
  const { width } = await sharp(source).metadata();
  await Promise.all(
    RESPONSIVE_WIDTHS.map((w) =>
      sharp(source)
        // Копия не шире исходника: увеличивать нечего, но файл нужен для srcset.
        .resize({ width: Math.min(w, width) })
        .webp({ quality: 74 })
        .toFile(responsiveVariant(target, w)),
    ),
  );
}

export default function responsiveImages() {
  let config;
  return {
    name: "goodant:responsive-images",
    apply: "build",
    configResolved(resolved) {
      config = resolved;
    },
    async writeBundle(options, bundle) {
      // SSR-сборка для пререндера пишет в node_modules/.cache - там копии не нужны.
      if (config.build.ssr) return;
      const jobs = Object.keys(bundle)
        .filter((name) => RASTER.test(name))
        .map((name) => [path.join(options.dir, name), path.join(options.dir, name)]);
      for (const url of PUBLIC_RESPONSIVE) {
        const name = url.replace(/^\//, "");
        jobs.push([path.join(config.publicDir, name), path.join(options.dir, name)]);
      }
      // По одной картинке за раз: исходники до 3000px, параллельно все сразу
      // съедают слишком много памяти.
      for (const [source, target] of jobs) await writeVariants(source, target);
      config.logger.info(`responsive images: ${jobs.length} × ${RESPONSIVE_WIDTHS.length} копий`);
    },
  };
}
