import { Helmet } from "react-helmet-async";
import { reviewsFor, reviewStatsFor } from "../data/reviewsData";

export const SITE_URL = "https://goodantshop.md";
export const SITE_NAME = "GoodAntShop";
export const SITE_LOGO = `${SITE_URL}/logo.webp`;
export const DEFAULT_IMAGE = `${SITE_URL}/formicarium-colony.webp`;
export const SUPPORTED_LANGS = ["ru", "ro", "en"];

// Full international number for `tel:` links; national format for display.
export const SITE_PHONE = "+37360983052";
export const SITE_PHONE_DISPLAY = "060 983 052";

const LOCALES = {
  ru: "ru_MD",
  ro: "ro_MD",
  en: "en_US",
};

const AVAILABILITY = {
  inStock: "https://schema.org/InStock",
  preorder: "https://schema.org/PreOrder",
  outOfStock: "https://schema.org/OutOfStock",
};

export const getText = (value, lang = "ru") => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }

  return value ?? "";
};

export const normalizePath = (path = "/") => {
  if (!path || path === "/") return "";
  return path.startsWith("/") ? path : `/${path}`;
};

export const absoluteUrl = (path = "") => {
  if (!path) return SITE_URL;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

export const localizedUrl = (lang = "ru", path = "/") =>
  `${SITE_URL}/${lang}${normalizePath(path)}`;

export const priceValue = (product) => {
  const option = product.priceOptions?.find((entry) => entry.selected) || product.priceOptions?.[0];
  const value = String(option?.value || "").replace(/[^\d]/g, "");
  return value || undefined;
};

export const pageSeo = {
  home: {
    title: {
      ru: "Купить муравьёв и формикарии в Молдове | GoodAntShop",
      ro: "Cumpără furnici și formicarii în Moldova | GoodAntShop",
      en: "Buy Live Ants & Formicariums in Moldova | GoodAntShop",
    },
    description: {
      ru: "Купить живых муравьёв, колонию с маткой и формикарий для домашней муравьиной фермы. Большой выбор видов, гарантия качества и доставка по всей Молдове.",
      ro: "Cumpără furnici vii, o colonie cu regină și un formicariu pentru ferma ta de acasă. Varietate de specii, calitate garantată și livrare în toată Moldova.",
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
      ru: "Купить живых муравьёв с маткой: Messor Structor, Lasius Niger, Lasius Neglectus и Camponotus Fellah. Колонии для новичков, гарантия и доставка по Молдове.",
      ro: "Cumpără furnici vii cu regină: Messor Structor, Lasius Niger, Lasius Neglectus și Camponotus Fellah. Colonii pentru începători, garanție și livrare în Moldova.",
      en: "Buy live queen-right ants: Messor Structor, Lasius Niger, Lasius Neglectus and Camponotus Fellah. Beginner colonies, guarantee and delivery across Moldova.",
    },
  },
  formicariums: {
    title: {
      ru: "Купить формикарий в Молдове | GoodAntShop",
      ro: "Cumpără formicariu în Moldova | GoodAntShop",
      en: "Buy Formicariums in Moldova | GoodAntShop",
    },
    description: {
      ru: "Акриловые формикарии для домашних муравьиных ферм: арена, вентиляция, система увлажнения и удобный обзор камер. Доставка по всей Молдове.",
      ro: "Formicarii pentru ferme de furnici acasă: arenă, ventilație, sistem de umidificare și vizibilitate bună a camerelor. Livrare în Moldova.",
      en: "Formicariums for home ant farms: arena, ventilation, humidity system and clear chamber view. Delivery across Moldova.",
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
};

export const productSeo = (product, type, lang = "ru") => {
  const title = getText(product.title, lang);
  const typeName = {
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

  return {
    title: {
      ru: `${title}: купить ${getText(typeName[type], "ru")} в Молдове | GoodAntShop`,
      ro: `${title}: cumpără ${getText(typeName[type], "ro")} în Moldova | GoodAntShop`,
      en: `${title}: buy ${getText(typeName[type], "en")} in Moldova | GoodAntShop`,
    },
    description: {
      ru: `${getText(product.excerpt, "ru")} Цена от ${priceValue(product) || ""} лей. Доставка по всей Молдове и поддержка после покупки.`,
      ro: `${getText(product.excerpt, "ro")} Preț de la ${priceValue(product) || ""} lei. Livrare în toată Moldova și suport după achiziție.`,
      en: `${getText(product.excerpt, "en")} Price from ${priceValue(product) || ""} lei. Delivery across Moldova and post-purchase support.`,
    },
  };
};

export const organizationSchema = (lang = "ru") => ({
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
    url: "https://t.me/GoodAnt_Shop",
  },
  sameAs: ["https://t.me/GoodAnt_Shop"],
});

export const websiteSchema = (lang = "ru") => ({
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: SITE_NAME,
  inLanguage: lang,
  publisher: {
    "@id": `${SITE_URL}/#organization`,
  },
});

export const breadcrumbSchema = (lang = "ru", items = []) => ({
  "@type": "BreadcrumbList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: getText(item.name, lang),
    item: localizedUrl(lang, item.path),
  })),
});

export const itemListSchema = (lang = "ru", items = [], pathFactory) => ({
  "@type": "ItemList",
  itemListElement: items.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    url: localizedUrl(lang, pathFactory(item)),
    name: getText(item.title, lang),
  })),
});

export const aggregateRatingSchema = (type) => {
  const stats = reviewStatsFor(type);
  return {
    "@type": "AggregateRating",
    ratingValue: stats.ratingValue,
    reviewCount: stats.reviewCount,
    bestRating: stats.bestRating,
    worstRating: stats.worstRating,
  };
};

export const reviewSchema = (review) => ({
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

export const productSchema = (product, type, lang = "ru", path = "/") => {
  const images = product.images?.length ? product.images : [product.image].filter(Boolean);

  return {
    "@type": "Product",
    name: getText(product.title, lang),
    description: getText(product.description, lang) || getText(product.excerpt, lang),
    image: images.map(absoluteUrl),
    category: type === "ant" ? "Ant colony" : "Formicarium",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    aggregateRating: aggregateRatingSchema(type),
    review: reviewsFor(type).map(reviewSchema),
    offers: {
      "@type": "Offer",
      url: localizedUrl(lang, path),
      priceCurrency: "MDL",
      price: priceValue(product),
      availability: AVAILABILITY[product.availability] || AVAILABILITY.inStock,
      seller: {
        "@id": `${SITE_URL}/#organization`,
      },
      // Flat 200 MDL within Chișinău. Out-of-town delivery is variable
      // (public transport fare + 100 MDL), so it can't be a fixed rate here.
      shippingDetails: {
        "@type": "OfferShippingDetails",
        shippingRate: {
          "@type": "MonetaryAmount",
          value: 200,
          currency: "MDL",
        },
        shippingDestination: {
          "@type": "DefinedRegion",
          addressCountry: "MD",
          addressRegion: "Chișinău",
        },
      },
      // Sales are final — returns are not offered.
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

export const faqSchema = (lang = "ru", items = []) => ({
  "@type": "FAQPage",
  mainEntity: items.map((item) => ({
    "@type": "Question",
    name: getText(item.q, lang),
    acceptedAnswer: {
      "@type": "Answer",
      text: getText(item.a, lang),
    },
  })),
});

export default function SEO({
  lang = "ru",
  path = "/",
  title,
  description,
  image = DEFAULT_IMAGE,
  type = "website",
  robots = "index,follow",
  jsonLd = [],
}) {
  const cleanPath = normalizePath(path);
  const canonical = localizedUrl(lang, cleanPath || "/");
  const titleText = getText(title, lang);
  const descriptionText = getText(description, lang);
  const imageUrl = absoluteUrl(image);
  const schemas = [
    organizationSchema(lang),
    websiteSchema(lang),
    ...(Array.isArray(jsonLd) ? jsonLd : [jsonLd]).filter(Boolean),
  ];

  return (
    <Helmet htmlAttributes={{ lang }}>
      <title>{titleText}</title>
      <meta name="description" content={descriptionText} />
      <meta name="robots" content={robots} />
      <link rel="canonical" href={canonical} />
      {SUPPORTED_LANGS.map((code) => (
        <link key={code} rel="alternate" hrefLang={code} href={localizedUrl(code, cleanPath || "/")} />
      ))}
      <link rel="alternate" hrefLang="x-default" href={localizedUrl("ru", cleanPath || "/")} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content={LOCALES[lang] || LOCALES.ru} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={titleText} />
      <meta property="og:description" content={descriptionText} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={titleText} />
      <meta name="twitter:description" content={descriptionText} />
      <meta name="twitter:image" content={imageUrl} />

      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@graph": schemas,
        })}
      </script>
    </Helmet>
  );
}
