// Реальные отзывы покупателей с профиля продавца на 999.md.
// Используются и для блока отзывов на странице товара, и для микроразметки
// schema.org (Review + AggregateRating). Текст оставлен на языке оригинала,
// логины 999.md приведены к читаемому виду для отображения.
//
// target определяет, на каких страницах отзыв уместен:
//   "ant"         - про колонию/муравьёв      → показываем на карточках муравьёв
//   "formicarium" - про формикарий/ферму      → показываем на карточках формикариев
//   "shop"        - про сервис/доставку/детей  → показываем везде (общий опыт магазина)
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
      "Замечательный, надёжный и неравнодушный продавец. После покупки прошло уже два месяца - до сих пор продолжает консультировать сына по любым вопросам, связанным с муравьишками. Всегда всё подскажет, расскажет как лучше, приветливо и без проблем. Приятно иметь дело!",
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

  // --- Отзывы на дополнительные товары -------------------------------------
  // Приходят из Telegram и от покупателей на руках, а не с 999.md, поэтому
  // source: "telegram" - блок отзывов подписывает источник честно.
  // Привязка к товару идёт по productSlug (см. accessoriesData.js).
  //
  // Осталось проставить date (формат 2026-08-14) и убрать draft - до этого
  // отзыв не показывается и в микроразметку не идёт.
  {
    author: "Андрей К.",
    lang: "ru",
    date: "",
    rating: 5,
    target: "accessory",
    productSlug: "tool-kit",
    source: "telegram",
    draft: true,
    body: "Спасибо! Очень удобно и эстетично работать с этими инструментами.",
  },
  {
    author: "Сергей М.",
    lang: "ru",
    date: "",
    rating: 5,
    target: "accessory",
    productSlug: "tool-kit",
    source: "telegram",
    draft: true,
    body:
      "Брал набор отдельно, уже после колонии. Пинцет и пипетка пригодились в первую же неделю - до этого приспосабливал что попало из дома.",
  },
  {
    author: "Дмитрий П.",
    lang: "ru",
    date: "",
    rating: 5,
    target: "accessory",
    productSlug: "tool-kit",
    source: "telegram",
    draft: true,
    body:
      "Хороший набор, всё лежит в одной коробке и не теряется. Отдельно понравилась мягкая кисточка: муравьёв с крышки сметаешь, никого не придавив.",
  },
  {
    author: "Александр Р.",
    lang: "ru",
    date: "",
    rating: 5,
    target: "accessory",
    productSlug: "seed-mix",
    source: "telegram",
    draft: true,
    body:
      "Смесь брал отдельно к мессорам. Разбирают охотно, шелуху выносят в отвал - значит, заходит.",
  },
  {
    author: "Максим С.",
    lang: "ru",
    date: "",
    rating: 5,
    target: "accessory",
    productSlug: "seed-mix",
    source: "telegram",
    draft: true,
    body:
      "Удобно, что не надо собирать зерно самому и гадать, что подойдёт. Колония ест ровно, запас в камере растёт.",
  },
  {
    author: "Илья Н.",
    lang: "ru",
    date: "",
    rating: 5,
    target: "accessory",
    productSlug: "feeder-beetle",
    source: "telegram",
    draft: true,
    body:
      "Живой корм берём регулярно. Расплод после него заметно прибавляет, и возни с разведением никакой.",
  },
];

// Профиль продавца на 999.md - источник отзывов.
export const SELLER_999_URL = "https://999.md/ru/profile/GoodAnt-Shop-MD";

const round1 = (value) => Math.round(value * 10) / 10;

// Черновик не публикуется. Нужен для отзывов, сказанных устно или в Telegram:
// текст уже записан, но пока не подставлены настоящее имя покупателя и дата
// сообщения, отзыв не должен попасть ни на страницу, ни в микроразметку.
// Заполнили author и date - убираете draft, и отзыв появляется.
// Автора и дату проверяем отдельно от флага: если draft убрали, а имя вписать
// забыли, отзыв всё равно не выйдет. Отзыв без автора Google для сниппетов не
// принимает, а на странице карточка с пустой подписью выглядит поломанной.
const isPublished = (review) => !review.draft && Boolean(review.author) && Boolean(review.date);

// Отзывы, релевантные товару.
//   ant / formicarium - профильные плюс общие про магазин (shop): человек,
//                       похваливший сервис и доставку, покупал живую колонию,
//                       так что отзыв к ней относится;
//   accessory         - ТОЛЬКО собственные, привязанные к productSlug. Общие
//                       отзывы магазина сюда не подмешиваем: Google не считает
//                       их отзывами о товаре, и собирать из них рейтинг набора
//                       инструментов - прямой путь к ручным санкциям.
export const reviewsFor = (type, slug) =>
  reviews.filter((review) => {
    if (!isPublished(review)) return false;
    if (type === "accessory") {
      return review.target === "accessory" && review.productSlug === slug;
    }
    return review.target === type || review.target === "shop";
  });

// Сводный рейтинг для AggregateRating и заголовка блока - по тем отзывам,
// которые реально показаны на странице данного товара.
export const reviewStatsFor = (type, slug) => {
  const subset = reviewsFor(type, slug);
  const total = subset.reduce((sum, review) => sum + review.rating, 0);

  return {
    ratingValue: subset.length ? round1(total / subset.length) : 0,
    reviewCount: subset.length,
    bestRating: 5,
    worstRating: 1,
  };
};

// Общий рейтинг по всем отзывам - для витрины (например, блока на главной).
export const reviewStatsAll = () => {
  const published = reviews.filter(isPublished);
  const total = published.reduce((sum, review) => sum + review.rating, 0);
  return {
    ratingValue: published.length ? round1(total / published.length) : 0,
    reviewCount: published.length,
    bestRating: 5,
    worstRating: 1,
  };
};

// Избранные короткие отзывы для главной (помечены featured).
export const featuredReviews = () => reviews.filter((review) => isPublished(review) && review.featured);

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
