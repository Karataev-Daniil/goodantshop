import { Helmet } from "react-helmet-async";
import { ownReviewsFor, ownReviewStatsFor, SELLER_999_URL } from "../data/reviewsData";
import type {
  Availability,
  BlogPost,
  BlogVideo,
  FaqItem,
  Lang,
  Localized,
  PriceOption,
  ProductLike,
  ProductType,
  Review,
  Text,
} from "../types";

// --- Типы JSON-LD ------------------------------------------------------------
// Описывают ровно то, что строят функции ниже, - не весь словарь schema.org.

export interface OrganizationRef {
  "@id": string;
}

export interface OrganizationSchema {
  "@type": "Organization";
  "@id": string;
  name: string;
  url: string;
  logo: string;
  contactPoint: {
    "@type": "ContactPoint";
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
    telephone: string;
    url: string;
  };
  areaServed: { "@type": "Country" | "City"; name: string }[];
  sameAs: string[];
}

export interface WebSiteSchema {
  "@type": "WebSite";
  "@id": string;
  url: string;
  name: string;
  inLanguage: string;
  publisher: OrganizationRef;
}

export interface BreadcrumbListSchema {
  "@type": "BreadcrumbList";
  itemListElement: { "@type": "ListItem"; position: number; name: string; item: string }[];
}

export interface ItemListSchema {
  "@type": "ItemList";
  itemListElement: { "@type": "ListItem"; position: number; url: string; name: string }[];
}

export interface AggregateRatingSchema {
  "@type": "AggregateRating";
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

export interface ReviewSchema {
  "@type": "Review";
  author: { "@type": "Person"; name: string };
  datePublished: string;
  reviewBody: string;
  reviewRating: { "@type": "Rating"; ratingValue: number; bestRating: number; worstRating: number };
}

export interface ProductSchema {
  "@type": "Product";
  name: string;
  sku: string;
  description: string;
  image: string[];
  category: string;
  brand: { "@type": "Brand"; name: string };
  aggregateRating?: AggregateRatingSchema;
  review?: ReviewSchema[];
  offers: {
    "@type": "Offer";
    url: string;
    priceCurrency: string;
    price: string | undefined;
    availability: string;
    seller: OrganizationRef;
    shippingDetails: {
      "@type": "OfferShippingDetails";
      shippingRate: { "@type": "MonetaryAmount"; value: number; currency: string };
      shippingDestination: { "@type": "DefinedRegion"; addressCountry: string };
    };
    hasMerchantReturnPolicy: {
      "@type": "MerchantReturnPolicy";
      applicableCountry: string;
      returnPolicyCategory: string;
    };
  };
  additionalProperty: { "@type": "PropertyValue"; name: string; value: string }[] | undefined;
}

export interface FaqPageSchema {
  "@type": "FAQPage";
  mainEntity: {
    "@type": "Question";
    name: string;
    acceptedAnswer: { "@type": "Answer"; text: string };
  }[];
}

export interface VideoObjectSchema {
  "@type": "VideoObject";
  name: string;
  description: string;
  thumbnailUrl: string[];
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
  contentUrl?: string;
}

export interface BlogPostingSchema {
  "@type": "BlogPosting";
  headline: string;
  description: string;
  image: string[];
  datePublished: string;
  dateModified: string;
  inLanguage: string;
  author: { "@type": "Organization"; name: string; url: string };
  publisher: OrganizationRef;
  mainEntityOfPage: { "@type": "WebPage"; "@id": string };
  video?: VideoObjectSchema | null;
}

export type JsonLdSchema =
  | OrganizationSchema
  | WebSiteSchema
  | BreadcrumbListSchema
  | ItemListSchema
  | ProductSchema
  | FaqPageSchema
  | VideoObjectSchema
  | BlogPostingSchema;

// SEO-тексты страницы: заголовок и описание на трёх языках.
export interface PageSeo {
  title: Localized;
  description: Localized;
  robots?: string;
}

export const SITE_URL = "https://goodantshop.md";
export const SITE_NAME = "GoodAntShop";
export const SITE_LOGO = `${SITE_URL}/logo.webp`;
export const DEFAULT_IMAGE = `${SITE_URL}/formicarium-colony.webp`;
export const SUPPORTED_LANGS: Lang[] = ["ru", "ro", "en"];

// Full international number for `tel:` links; national format for display.
export const SITE_PHONE = "+37360983052";
export const SITE_PHONE_DISPLAY = "060 983 052";

// Instagram нельзя «поделиться ссылкой» из веба - кнопка ведёт на профиль.
// TODO: заменить на реальный аккаунт GoodAntShop (https://www.instagram.com/<логин>/).
// Пока здесь заглушка, кнопка Instagram скрыта и в sameAs он не попадает:
// ссылка на главную instagram.com только подрывает доверие.
export const SITE_INSTAGRAM = "https://www.instagram.com/";
export const HAS_INSTAGRAM = /instagram\.com\/[^/?#]+/i.test(SITE_INSTAGRAM);

// Основной канал связи: и в разметке организации, и в кнопках на страницах.
export const SITE_TELEGRAM = "https://t.me/GoodAnt_Shop";

const AVAILABILITY: Record<Availability, string> = {
  inStock: "https://schema.org/InStock",
  preorder: "https://schema.org/PreOrder",
  outOfStock: "https://schema.org/OutOfStock",
};

export const getText = (value: Text | null | undefined, lang: string = "ru"): string => {
  if (value && typeof value === "object") {
    // lang приходит из URL и может быть любым - тогда индекс даёт undefined
    // и срабатывает фолбэк на ru.
    return value[lang as Lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }

  return value ?? "";
};

export const normalizePath = (path: string = "/"): string => {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
};

export const absoluteUrl = (path: string = ""): string => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const localizedUrl = (lang: string = "ru", path: string = "/"): string =>
  `${SITE_URL}/${lang}${normalizePath(path)}`;

export const priceValue = (product: { priceOptions?: PriceOption[] }): string | undefined => {
  const option = product.priceOptions?.find((entry) => entry.selected) || product.priceOptions?.[0];
  const value = String(option?.value || "").replace(/[^\d]/g, "");
  return value || undefined;
};

export const pageSeo = {
  home: {
    title: {
      ru: "Купить муравьёв и муравьиную ферму в Молдове | GoodAntShop",
      ro: "Cumpără furnici și o fermă de furnici în Moldova | GoodAntShop",
      en: "Buy Live Ants & Formicariums in Moldova | GoodAntShop",
    },
    description: {
      ru: "Муравьиная ферма для дома: живые муравьи, колония с маткой и формикарий. Большой выбор видов, гарантия качества и доставка по всей Молдове.",
      ro: "Fermă de furnici pentru acasă: furnici vii, o colonie cu regină și un formicariu. Varietate de specii, calitate garantată și livrare în toată Moldova.",
      en: "Buy live ants, a queen-right colony and a formicarium for your home ant farm. Wide choice of species, quality guarantee and delivery across Moldova.",
    },
  },
  ants: {
    title: {
      ru: "Купить муравьёв для фермы в Молдове | GoodAntShop",
      ro: "Cumpără furnici pentru fermă în Moldova | GoodAntShop",
      en: "Buy Ant Colonies in Moldova | GoodAntShop",
    },
    description: {
      ru: "Купить живых муравьёв с маткой: Messor Structor, Lasius Niger, Lasius Neglectus, Camponotus Fellah, Formica Cunicularia и Formica Rufibarbis. Колонии для новичков и опытных, доставка по Молдове.",
      ro: "Cumpără furnici vii cu regină: Messor Structor, Lasius Niger, Lasius Neglectus, Camponotus Fellah, Formica Cunicularia și Formica Rufibarbis. Colonii pentru începători și avansați, livrare în Moldova.",
      en: "Buy live queen-right ants: Messor Structor, Lasius Niger, Lasius Neglectus, Camponotus Fellah, Formica Cunicularia and Formica Rufibarbis. Colonies for beginners and pros, delivery across Moldova.",
    },
  },
  formicariums: {
    title: {
      ru: "Формикарии и муравьиные фермы: купить в Молдове | GoodAntShop",
      ro: "Fermă de furnici (formicariu): cumpără în Moldova | GoodAntShop",
      en: "Buy Formicariums in Moldova | GoodAntShop",
    },
    description: {
      ru: "Муравьиная ферма для дома - акриловый формикарий с ареной, вентиляцией, системой увлажнения и удобным обзором камер. Доставка по всей Молдове.",
      ro: "Fermă de furnici pentru acasă - formicariu cu arenă, ventilație, sistem de umidificare și vizibilitate bună a camerelor. Livrare în Moldova.",
      en: "Formicariums for home ant farms: arena, ventilation, humidity system and clear chamber view. Delivery across Moldova.",
    },
  },
  accessories: {
    title: {
      ru: "Уход за колонией муравьёв: корм и инструменты | GoodAntShop",
      ro: "Îngrijirea coloniei de furnici: hrană și instrumente | GoodAntShop",
      en: "Ant Colony Care: food and tools | GoodAntShop",
    },
    description: {
      ru: "Чем кормить муравьёв, как держать влажность и когда переселять колонию в формикарий. Зерновая смесь, живой корм и набор инструментов с доставкой по Молдове.",
      ro: "Cu ce hrănești furnicile, cum menții umiditatea și când muți colonia în formicariu. Amestec de semințe, hrană vie și set de instrumente, cu livrare în Moldova.",
      en: "What to feed ants, how to keep humidity right and when to rehouse the colony. Seed mix, live food and a tool kit, delivered across Moldova.",
    },
  },
  speciesMap: {
    title: {
      ru: "Карта муравьёв Молдовы: какие виды где водятся | GoodAntShop",
      ro: "Harta furnicilor din Moldova: ce specii unde trăiesc | GoodAntShop",
      en: "Ant Map of Moldova: which species live where | GoodAntShop",
    },
    description: {
      ru: "Открытый атлас муравьёв Молдовы по нашим сборам: какие виды встречаются на севере, в центре, в Кишинёве, Приднестровье, Гагаузии и на юге. Карта пополняется после каждой поездки.",
      ro: "Atlas deschis al furnicilor din Moldova, din colectările noastre: ce specii se întâlnesc în nord, centru, Chișinău, Transnistria, Găgăuzia și sud. Harta se completează după fiecare deplasare.",
      en: "An open atlas of the ants of Moldova from our own collecting: which species occur in the north, centre, Chișinău, Transnistria, Gagauzia and the south. The map grows after every trip.",
    },
  },
  blog: {
    title: {
      ru: "Блог о муравьях: уход, виды и запуск колонии | GoodAntShop",
      ro: "Blog despre furnici: îngrijire, specii și pornire | GoodAntShop",
      en: "Ant-Keeping Blog: care, species and colony start | GoodAntShop",
    },
    description: {
      ru: "Полезные статьи о муравьях: как выбрать первую колонию и формикарий, график кормления, уход за колонией и обзоры видов. Советы для новичков и опытных киперов.",
      ro: "Articole utile despre furnici: cum alegi prima colonie și formicariul, programul de hrănire, îngrijirea coloniei și prezentări de specii. Sfaturi pentru începători și avansați.",
      en: "Helpful ant-keeping articles: how to choose your first colony and formicarium, feeding schedule, colony care and species guides. Tips for beginners and pros.",
    },
  },
  contacts: {
    title: {
      ru: "Контакты и доставка муравьиных ферм | GoodAntShop",
      ro: "Contacte și livrare ferme de furnici | GoodAntShop",
      en: "Contacts and Ant Farm Delivery | GoodAntShop",
    },
    description: {
      ru: "Свяжитесь с GoodAntShop в Telegram, чтобы заказать муравьёв, формикарий или консультацию по уходу. Безопасная доставка по всей Молдове.",
      ro: "Contactează GoodAntShop pe Telegram pentru furnici, formicarii sau consultanță de îngrijire. Livrare sigură în toată Moldova.",
      en: "Contact GoodAntShop on Telegram to order ants, formicariums or care advice. Safe delivery across Moldova.",
    },
  },
  about: {
    title: {
      ru: "О GoodAntShop: муравьиные фермы в Молдове | GoodAntShop",
      ro: "Despre GoodAntShop: ferme de furnici în Moldova | GoodAntShop",
      en: "About GoodAntShop: ant farms in Moldova | GoodAntShop",
    },
    description: {
      ru: "Команда GoodAntShop из Молдовы выращивает здоровые колонии муравьёв, делает формикарии и помогает новичкам с запуском. 10 лет с муравьями, 5 лет продаём, доставка по всей Молдове.",
      ro: "Echipa GoodAntShop din Moldova crește colonii sănătoase de furnici, fabrică formicarii și ajută începătorii. 10 ani cu furnici, 5 ani de vânzări, livrare în toată Moldova.",
      en: "GoodAntShop is a Moldova-based team: we raise healthy ant colonies, build formicariums and help beginners get started. 10 years with ants, 5 years selling, delivery across Moldova.",
    },
  },
  cart: {
    // Корзина закрыта и в robots.txt (Disallow: /*/cart), и мета-тегом: если
    // бот всё же получит URL (например, по внешней ссылке), он не попадёт в
    // индекс. follow - чтобы ссылки из шапки/подвала оставались рабочими.
    robots: "noindex, follow",
    title: {
      ru: "Корзина | GoodAntShop",
      ro: "Coș | GoodAntShop",
      en: "Cart | GoodAntShop",
    },
    description: {
      ru: "Оформление заказа в GoodAntShop: муравьиные колонии, формикарии и товары для домашней муравьиной фермы.",
      ro: "Finalizarea comenzii GoodAntShop: colonii de furnici, formicarii și produse pentru ferma de furnici acasă.",
      en: "GoodAntShop checkout for ant colonies, formicariums and home ant farm products.",
    },
  },
} satisfies Record<string, PageSeo>;

export const productSeo = (
  product: ProductLike,
  type: ProductType,
  lang: string = "ru"
): { title: Localized; description: Localized } => {
  const title = getText(product.title, lang);
  // У аксессуаров типового существительного нет - их название уже describes
  // сам товар («Набор инструментов…»), поэтому заголовок строим без него.
  const typeName: Partial<Record<ProductType, Localized>> = {
    ant: {
      ru: "колонию муравьёв",
      ro: "o colonie de furnici",
      en: "an ant colony",
    },
    formicarium: {
      ru: "формикарий",
      ro: "un formicariu",
      en: "a formicarium",
    },
  };
  const noun = typeName[type];
  const buy = (lang_: string, verb: string) =>
    noun ? `${verb} ${getText(noun, lang_)} ` : `${verb} `;

  return {
    title: {
      ru: `${title}: ${buy("ru", "купить")}в Молдове | GoodAntShop`,
      ro: `${title}: ${buy("ro", "cumpără")}în Moldova | GoodAntShop`,
      en: `${title}: ${buy("en", "buy")}in Moldova | GoodAntShop`,
    },
    description: {
      ru: `${getText(product.excerpt, "ru")} Цена от ${priceValue(product) || ""} лей. Доставка по всей Молдове и поддержка после покупки.`,
      ro: `${getText(product.excerpt, "ro")} Preț de la ${priceValue(product) || ""} lei. Livrare în toată Moldova și suport după achiziție.`,
      en: `${getText(product.excerpt, "en")} Price from ${priceValue(product) || ""} lei. Delivery across Moldova and post-purchase support.`,
    },
  };
};

export const organizationSchema = (lang: string = "ru"): OrganizationSchema => ({
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: SITE_NAME,
  url: SITE_URL,
  logo: SITE_LOGO,
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer support",
    areaServed: "MD",
    availableLanguage: ["ru", "ro", "en"],
    telephone: SITE_PHONE,
    url: SITE_TELEGRAM,
  },
  // Реальная зона работы: доставка по Кишинёву и всей Молдове (физического
  // адреса нет, поэтому PostalAddress не выдумываем - только areaServed).
  areaServed: [
    { "@type": "Country", name: "Moldova" },
    { "@type": "City", name: "Chișinău" },
  ],
  sameAs: [SITE_TELEGRAM, SELLER_999_URL, ...(HAS_INSTAGRAM ? [SITE_INSTAGRAM] : [])],
});

export const websiteSchema = (lang: string = "ru"): WebSiteSchema => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: lang,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const breadcrumbSchema = (
  lang: string = "ru",
  items: { name: Text; path: string }[] = []
): BreadcrumbListSchema => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: getText(item.name, lang),
    item: localizedUrl(lang, item.path),
  })),
});

export const itemListSchema = <T extends { title: Text }>(
  lang: string = "ru",
  items: T[] = [],
  pathFactory: (item: T) => string
): ItemListSchema => ({
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: localizedUrl(lang, pathFactory(item)),
    name: getText(item.title, lang),
  })),
});

export const aggregateRatingSchema = (type: ProductType, slug: string): AggregateRatingSchema => {
  const stats = ownReviewStatsFor(type, slug);
  return {
    "@type": "AggregateRating",
    ratingValue: stats.ratingValue,
    reviewCount: stats.reviewCount,
    bestRating: stats.bestRating,
    worstRating: stats.worstRating,
  };
};

export const reviewSchema = (review: Review): ReviewSchema => ({
  "@type": "Review",
  author: {
    "@type": "Person",
    name: review.author,
  },
  datePublished: review.date,
  reviewBody: review.body,
  reviewRating: {
    "@type": "Rating",
    ratingValue: review.rating,
    bestRating: 5,
    worstRating: 1,
  },
});

const PRODUCT_CATEGORY: Record<ProductType, string> = {
  ant: "Ant colony",
  formicarium: "Formicarium",
  accessory: "Ant keeping accessory",
};

export const productSchema = (
  product: ProductLike,
  type: ProductType,
  lang: string = "ru",
  path: string = "/"
): ProductSchema => {
  const images = product.images?.length
    ? product.images
    : [product.image].filter((src): src is string => Boolean(src));
  // AggregateRating без отзывов невалиден - отдаём разметку только когда они есть.
  // Для всех типов товаров (колонии, формикарии, аксессуары) учитываются ТОЛЬКО
  // собственные отзывы, привязанные к товару через productSlug. Общие отзывы
  // магазина на странице показываются, но в разметку Product не идут: Google не
  // считает их отзывами о товаре. Фильтрация живёт в ownReviewsFor.
  const productReviews = ownReviewsFor(type, product.slug);

  return {
    "@type": "Product",
    name: getText(product.title, lang),
    sku: product.slug,
    description: getText(product.description, lang) || getText(product.excerpt, lang),
    image: images.map(absoluteUrl),
    category: PRODUCT_CATEGORY[type] || PRODUCT_CATEGORY.accessory,
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    ...(productReviews.length
      ? {
          aggregateRating: aggregateRatingSchema(type, product.slug),
          review: productReviews.map(reviewSchema),
        }
      : {}),
    offers: {
      "@type": "Offer",
      url: localizedUrl(lang, path),
      priceCurrency: "MDL",
      price: priceValue(product),
      availability: AVAILABILITY[product.availability] || AVAILABILITY.inStock,
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
      // Базовый тариф 150 лей по Кишинёву (бесплатно, если в заказе есть
      // формикарий); за городом - проезд плюс 100 лей, фиксированной ставкой
      // это не описать, поэтому в разметке остаётся базовый тариф.
      //
      // addressRegion здесь стоял как "Chișinău", и это ломало весь блок:
      // Google принимает в этом поле только коды регионов (вида "NY"), а
      // свободный текст обесценивает DefinedRegion целиком. Из-за этого Search
      // Console отчитывалась «отсутствует поле shippingDetails», хотя поле было.
      // Страны достаточно: доставка и так работает по всей Молдове.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 150,
          currency: "MDL",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MD",
        },
      },
      // Sales are final - returns are not offered.
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "MD",
        returnPolicyCategory: "https://schema.org/MerchantReturnNotPermitted",
      },
    },
    additionalProperty: product.characteristics?.map((entry) => ({
      "@type": "PropertyValue",
      name: getText(entry.label, lang),
      value: getText(entry.value, lang),
    })),
  };
};

// Убираем инлайн-ссылки [текст](/путь) из строк для JSON-LD (там нужен чистый текст).
const stripLinks = (value: string): string =>
  typeof value === "string" ? value.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") : value;

export const faqSchema = (lang: string = "ru", items: FaqItem[] = []): FaqPageSchema => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: stripLinks(getText(item.q, lang)),
    acceptedAnswer: {
      "@type": "Answer",
      text: stripLinks(getText(item.a, lang)),
    },
  })),
});

// VideoObject - даёт видео шанс попасть в Google Видео и в rich-результаты.
export const videoSchema = (video: BlogVideo | null | undefined, lang: string = "ru"): VideoObjectSchema | null => {
  if (!video) return null;
  return {
    "@type": "VideoObject",
    name: getText(video.name, lang),
    description: getText(video.description, lang),
    thumbnailUrl: video.thumbnail ? [absoluteUrl(video.thumbnail)] : [DEFAULT_IMAGE],
    uploadDate: video.uploadDate,
    ...(video.duration ? { duration: video.duration } : {}),
    ...(video.embedUrl ? { embedUrl: video.embedUrl } : {}),
    ...(video.contentUrl ? { contentUrl: video.contentUrl } : {}),
  };
};

// BlogPosting - статья блога. Включает автора, даты и (при наличии) вложенное
// видео, чтобы одна разметка описывала весь пост.
export const articleSchema = (post: BlogPost, lang: string = "ru", path: string = "/"): BlogPostingSchema => {
  const images = post.cover?.src ? [absoluteUrl(post.cover.src)] : [DEFAULT_IMAGE];
  const url = localizedUrl(lang, path);

  return {
    "@type": "BlogPosting",
    headline: getText(post.title, lang),
    description: getText(post.seoDescription || post.excerpt, lang),
    image: images,
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    inLanguage: lang,
    author: {
      "@type": "Organization",
      name: post.author?.name || SITE_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    ...(post.video ? { video: videoSchema(post.video, lang) } : {}),
  };
};

// Мета-теги страницы (description, robots, canonical, hreflang, og:*, twitter:*)
// вписывает scripts/prerender.mjs прямо в статический HTML каждого маршрута -
// их видят боты без JS. Здесь их намеренно НЕ дублируем: раньше Helmet после
// гидрации добавлял второй комплект (2× description, 2× robots, 2× og:image с
// разными картинками). Остаются только то, что должно меняться при клиентской
// навигации: <title>, lang у <html> и JSON-LD.
// Пропсы description / image / type / robots страницы по-прежнему передают -
// они описывают страницу и пригодятся, но в рантайме в <head> не выводятся.
interface SEOProps {
  lang?: string;
  title: Text;
  jsonLd?: JsonLdSchema | null | (JsonLdSchema | null | undefined)[];
  // Ниже - описание страницы. В <head> не выводится (см. комментарий выше),
  // но страницы его передают.
  path?: string;
  description?: Text;
  image?: string;
  type?: string;
  robots?: string;
}

export default function SEO({ lang = "ru", title, jsonLd = [] }: SEOProps) {
  const titleText = getText(title, lang);
  const schemas = [
    organizationSchema(lang),
    websiteSchema(lang),
    ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean),
  ];

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{titleText}</title>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas,
        })}
      </script>
    </Helmet>
  );
}
