// ============================================================================
// БЛОГ - сборка постов.
// ----------------------------------------------------------------------------
// Каждый пост живёт в отдельном файле в ./blog/ и экспортирует объект через
// `export default`. Здесь мы только собираем их в общий список `blogPosts` и
// держим справочник рубрик. Так один пост правится независимо от других.
//
// Как добавить новый пост:
//   1. Скопируйте любой файл из ./blog/ (напр. messor-structor.js) в
//      ./blog/<slug>.js, поменяйте id/slug/category и впишите тексты
//      (достаточно поля `ru` - ro/en подставят русский, пока нет перевода).
//   2. Импортируйте его ниже и добавьте в массив `blogPosts`.
//   3. Добавьте URL поста (3 языка) в public/sitemap.xml.
//
// Типы блоков content: lead · heading(level 2/3) · paragraph · image ·
// row (фото в ряд) · list(ordered?) · steps · deflist · accordion ·
// callout(tip/note/warning) · quote · keytakeaways · video · cta(to: "/ants").
// ============================================================================

import whyAntsAreFascinating from "./blog/why-ants-are-fascinating";
import messorStructor from "./blog/messor-structor";

// Рубрики блога. Список расширяемый - добавляйте новые разделы сюда, и они
// автоматически появятся в фильтре архива и в хлебных крошках статьи.
export const blogCategories = [
  { slug: "beginners", label: { ru: "Новичкам", ro: "Începători", en: "Beginners" } },
  { slug: "care", label: { ru: "Уход и содержание", ro: "Îngrijire", en: "Care" } },
  { slug: "species", label: { ru: "Виды муравьёв", ro: "Specii de furnici", en: "Ant species" } },
  { slug: "formicariums", label: { ru: "Формикарии", ro: "Formicarii", en: "Formicariums" } },
];

export const getBlogCategory = (slug) =>
  blogCategories.find((category) => category.slug === slug) || null;

// Порядок = порядок на витрине блога. Первый пост показывается крупной
// featured-карточкой, поэтому вводный «манифест» держим первым - его логично
// прочитать раньше остального. Новые посты добавляйте после него.
export const blogPosts = [whyAntsAreFascinating, messorStructor];
