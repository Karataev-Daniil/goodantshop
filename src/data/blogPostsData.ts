// ============================================================================
// БЛОГ - сборка постов.
// ----------------------------------------------------------------------------
// Каждый пост живёт в отдельном файле в ./blog/ и экспортирует объект через
// `export default`. Здесь мы только собираем их в общий список `blogPosts` и
// держим справочник рубрик. Так один пост правится независимо от других.
//
// Как добавить новый пост:
//   1. Скопируйте любой файл из ./blog/ (напр. messor-structor.ts) в
//      ./blog/<slug>.ts, поменяйте id/slug/category и впишите тексты
//      (достаточно поля `ru` - ro/en подставят русский, пока нет перевода).
//   2. Импортируйте его ниже и добавьте в массив `allBlogPosts`.
//   3. Всё. sitemap.xml собирается при сборке (scripts/prerender.mjs) из того же
//      списка маршрутов, lastmod берётся из dateModified - обновляйте его при
//      правке статьи.
//
// Отложенная публикация: поставьте в datePublished будущую дату - до неё пост
// не появится на сайте. Выйдет при первой пересборке в этот день или позже.
// Закрепить пост наверху блога: поле pinned с меткой для карточки.
//
// Типы блоков content: lead · heading(level 2/3) · paragraph · image ·
// row (фото в ряд) · list(ordered?) · steps · deflist · accordion ·
// callout(tip/note/warning) · quote · keytakeaways · video · cta(to: "/ants").
// ============================================================================

import type { BlogCategory, BlogPost } from "../types";
import whyAntsAreFascinating from "./blog/why-ants-are-fascinating";
import messorStructor from "./blog/messor-structor";
import starterKitGuide from "./blog/starter-kit-guide";
import messorWintering from "./blog/messor-wintering";
import howToFeedAnts from "./blog/how-to-feed-ants";
import antQueen from "./blog/ant-queen";

// Рубрики блога. Список расширяемый - добавляйте новые разделы сюда, и они
// автоматически появятся в фильтре архива и в хлебных крошках статьи.
export const blogCategories: BlogCategory[] = [
  { slug: "beginners", label: { ru: "Новичкам", ro: "Începători", en: "Beginners" } },
  { slug: "care", label: { ru: "Уход и содержание", ro: "Îngrijire", en: "Care" } },
  { slug: "species", label: { ru: "Виды муравьёв", ro: "Specii de furnici", en: "Ant species" } },
  { slug: "formicariums", label: { ru: "Формикарии", ro: "Formicarii", en: "Formicariums" } },
];

export const getBlogCategory = (slug: string): BlogCategory | null =>
  blogCategories.find((category) => category.slug === slug) || null;

// Отложенная публикация. Пост с датой выхода в будущем не попадает в сборку -
// его нет ни в блоге, ни в sitemap, ни в «Читайте также», и прямая ссылка
// отдаёт 404. Сайт статический, поэтому пост выходит при первой сборке в день
// публикации или позже. В dev-сервере (npm run dev) запланированные посты
// видны с меткой «Запланировано», чтобы их можно было вычитать заранее.
const today = new Date().toISOString().slice(0, 10);
export const isPublished = (post: BlogPost): boolean => post.datePublished <= today;
const showScheduled = Boolean(import.meta.env?.DEV);

// Порядок = порядок на витрине блога. Крупной карточкой сверху идёт пост с
// pinned (инструкция к стартовому набору - её ищут сразу после покупки), без
// него - первый в списке. Новые посты добавляйте в конец.
const allBlogPosts: BlogPost[] = [
  whyAntsAreFascinating,
  messorStructor,
  starterKitGuide,
  messorWintering,
  howToFeedAnts,
  antQueen,
];

export const blogPosts: BlogPost[] = allBlogPosts.filter((post) => showScheduled || isPublished(post));
