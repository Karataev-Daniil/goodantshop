// Реальные отзывы покупателей с профиля продавца на 999.md.
// Используются и для блока отзывов на странице товара, и для микроразметки
// schema.org (Review + AggregateRating). Текст оставлен на языке оригинала,
// логины 999.md приведены к читаемому виду для отображения.
//
// target определяет, на каких страницах отзыв уместен:
//   "ant"         — про колонию/муравьёв      → показываем на карточках муравьёв
//   "formicarium" — про формикарий/ферму      → показываем на карточках формикариев
//   "shop"        — про сервис/доставку/детей  → показываем везде (общий опыт магазина)
//
// Отзывы, не относящиеся к муравьям/формикариям (покупка ПК, набора Lego), исключены.
export const reviews = [
  {
    author: "Iurie C.",
    lang: "ro",
    date: "2024-07-17",
    rating: 5,
    target: "shop",
    body:
      "Pot să recomand cu încredere acest vânzător. Este un tânăr responsabil care oferă servicii de calitate. Oferă și consultanță corespunzătoare produsului. Îmi place cum explică modul de creștere și de dezvoltare a familiilor de furnici. Nu ezitați și veți fi mulțumiți! Sunt satisfăcut de prestația acestui vânzător, a fost o plăcere să colaborăm!",
  },
  {
    author: "Нарзулло З.",
    lang: "ru",
    date: "2024-04-08",
    rating: 5,
    target: "shop",
    body:
      "Отличный сервис! Быстро привезли ферму с муравьями и дали грамотную консультацию. Дети в неописуемом восторге! Качество продукции на высоте, муравьи активны и здоровы. Это отличное решение для детей, увлечённых насекомыми. Очень довольны! Всем советую покупать муравьёв и фермы здесь. Спасибо большое за отличный сервис, помощь и то, что всегда на связи!",
  },
  {
    author: "Gubernator",
    lang: "ru",
    date: "2024-03-08",
    rating: 5,
    target: "formicarium",
    body:
      "Всё отлично, ферма в хорошем состоянии, как и муравьи. Пробирка была немного грязной, но для муравьёв это обычное дело. Всё отлично, советую покупать мурах и фермы плюс бесплатные личинки.",
  },
  {
    author: "Виктория",
    lang: "ru",
    date: "2023-12-31",
    rating: 5,
    target: "shop",
    featured: true,
    body:
      "Всё отлично! Быстро привезли и дали грамотную консультацию. Дети в неописуемом восторге!",
  },
  {
    author: "Molovatae",
    lang: "ru",
    date: "2023-10-18",
    rating: 5,
    target: "shop",
    featured: true,
    body:
      "Отличное решение и качество для детей, которым нравятся насекомые! Очень довольны!",
  },
  {
    author: "Serkat",
    lang: "ru",
    date: "2023-07-07",
    rating: 5,
    target: "ant",
    body:
      "Отличный сервис! Спасибо большое за колонию, за помощь и за то, что всегда на связи!",
  },
  {
    author: "Гарик",
    lang: "ru",
    date: "2023-06-25",
    rating: 5,
    target: "shop",
    body: "Дети в восторге!",
  },
  {
    author: "Drinkinskun",
    lang: "ru",
    date: "2023-06-17",
    rating: 5,
    target: "shop",
    featured: true,
    body:
      "Самые тёплые впечатления после покупки. Собираюсь продолжать консультироваться.",
  },
  {
    author: "Ирина",
    lang: "ru",
    date: "2023-06-16",
    rating: 5,
    target: "ant",
    body:
      "Отлично знает и любит своё дело, профессионал. Очень приятно иметь с ним дело. С ним вы полюбите муравьёв и всё, что с ними связано! От души рекомендую, если хотите наблюдать микромир дома и обзавестись семьёй муравьёв. Удовольствие гарантировано и вам, и вашим детям!",
  },
  {
    author: "Cristian",
    lang: "ru",
    date: "2023-04-19",
    rating: 4,
    target: "shop",
    body: "Хороший продавец.",
  },
  {
    author: "Яна Б.",
    lang: "ru",
    date: "2023-01-10",
    rating: 5,
    target: "shop",
    body: "Хороший продавец! Рекомендую.",
  },
  {
    author: "Дмитрий Б.",
    lang: "ru",
    date: "2022-12-30",
    rating: 5,
    target: "formicarium",
    body:
      "Довольны заказом очень! Формикарий сделан добротно, качественно. Муравьи живчики!",
  },
  {
    author: "Игорь М.",
    lang: "ru",
    date: "2022-12-30",
    rating: 5,
    target: "shop",
    body: "Всё супер, парень знает своё дело.",
  },
  {
    author: "Koyote",
    lang: "ru",
    date: "2022-12-29",
    rating: 5,
    target: "shop",
    body:
      "Замечательный, надёжный и неравнодушный продавец. После покупки прошло уже два месяца — до сих пор продолжает консультировать сына по любым вопросам, связанным с муравьишками. Всегда всё подскажет, расскажет как лучше, приветливо и без проблем. Приятно иметь дело!",
  },
  {
    author: "Юлия",
    lang: "ru",
    date: "2022-12-29",
    rating: 5,
    target: "ant",
    body:
      "Отзывчивый продавец, готов ответить на любые вопросы в любое время дня. Муравьи отличные, энергичные и бодрые.",
  },
  {
    author: "Lososik",
    lang: "ru",
    date: "2022-12-29",
    rating: 5,
    target: "ant",
    body:
      "Муравьишки отличные, покупкой осталась довольна. Также хочу отметить терпение и отзывчивость продавца, который отвечал на все возникающие вопросы. Однозначно рекомендую!",
  },
  {
    author: "Dtyz",
    lang: "ru",
    date: "2022-12-29",
    rating: 4,
    target: "ant",
    body: "Всё хорошо. Муравьи и покупатель остались довольны сделкой.",
  },
  {
    author: "GreenGlobal",
    lang: "ru",
    date: "2022-12-29",
    rating: 5,
    target: "formicarium",
    body:
      "Спасибо большое за формикарий. Всё вовремя и в срок было доставлено! Ребёнок очень рад.",
  },
];

// Профиль продавца на 999.md — источник отзывов.
export const SELLER_999_URL = "https://999.md/ru/profile/GoodAnt-Shop-MD";

const round1 = (value) => Math.round(value * 10) / 10;

// Отзывы, релевантные типу товара: профильные (ant/formicarium) + общие (shop).
export const reviewsFor = (type) =>
  reviews.filter((review) => review.target === type || review.target === "shop");

// Сводный рейтинг для AggregateRating и заголовка блока — по тем отзывам,
// которые реально показаны на странице данного типа товара.
export const reviewStatsFor = (type) => {
  const subset = reviewsFor(type);
  const total = subset.reduce((sum, review) => sum + review.rating, 0);

  return {
    ratingValue: subset.length ? round1(total / subset.length) : 0,
    reviewCount: subset.length,
    bestRating: 5,
    worstRating: 1,
  };
};

// Общий рейтинг по всем отзывам — для витрины (например, блока на главной).
export const reviewStatsAll = () => {
  const total = reviews.reduce((sum, review) => sum + review.rating, 0);
  return {
    ratingValue: round1(total / reviews.length),
    reviewCount: reviews.length,
    bestRating: 5,
    worstRating: 1,
  };
};

// Избранные короткие отзывы для главной (помечены featured).
export const featuredReviews = () => reviews.filter((review) => review.featured);

const LOCALE_TAGS = { ru: "ru-RU", ro: "ro-RO", en: "en-US" };

export const formatReviewDate = (iso, lang = "ru") => {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return iso;
  return new Intl.DateTimeFormat(LOCALE_TAGS[lang] || LOCALE_TAGS.ru, {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
};
