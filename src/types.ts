// Общие типы данных сайта: каталог, блог, отзывы, атлас видов, корзина и заказ.
// Сами данные лежат в src/data, здесь только их форма.

export type Lang = "ru" | "ro" | "en";

// Текст на трёх языках. ru обязателен: ro/en при отсутствии перевода
// подставляются из русского (см. getText в SEO.tsx).
export interface Localized {
  ru: string;
  ro?: string;
  en?: string;
}

// То, что умеет выводить getText: переведённый объект или готовая строка.
export type Text = Localized | string;

// ---------------------------------------------------------------------------
// Каталог
// ---------------------------------------------------------------------------

export type Availability = "inStock" | "preorder" | "outOfStock";

// Рацион вида; у корма то же значение лежит в forDiet.
export type Diet = "seeds" | "insects";

export type ProductType = "ant" | "formicarium" | "accessory";

export interface PriceOption {
  label: Localized;
  value: string;
  selected?: boolean;
}

export interface Characteristic {
  label: Localized;
  value: Localized;
}

// Поля, общие для колоний, формикариев и аксессуаров: на них держатся корзина,
// карточки товара и микроразметка.
export interface ProductBase {
  id: number;
  slug: string;
  title: Localized;
  excerpt: Localized;
  description: Localized;
  image?: string;
  images: string[];
  priceOptions: PriceOption[];
  availability: Availability;
  characteristics?: Characteristic[];
  relatedBlogIds?: number[];
}

export interface Ant extends ProductBase {
  image: string;
  queenSize: Localized;
  workerSize: Localized;
  soldierSize?: Localized;
  colonySize: Localized;
  food: Localized;
  diet: Diet;
  characteristics: Characteristic[];
  recommendedFormicariumIds: number[];
  relatedBlogIds: number[];
}

export interface ColorOption {
  label: Localized;
  value: string;
}

export interface Formicarium extends ProductBase {
  characteristics: Characteristic[];
  colorOptions: ColorOption[];
  defaultColor: string;
  capacity: Localized;
  humidityType: Localized;
  sizeCategory: "small" | "medium" | "large";
  careLevel: string;
  feedingType: string;
  recommendedAntIds: number[];
  relatedBlogIds: number[];
}

export interface Accessory extends ProductBase {
  image: string;
  kind: "tools" | "food";
  forDiet?: Diet;
  giftWithBundle: boolean;
  benefit: Localized;
  includes: Localized[];
  usage: Localized;
  relatedBlogIds: number[];
}

export type Product = Ant | Formicarium | Accessory;

// «Любой товар» для общих компонентов (ProductCard, ProductDetail, корзина):
// базовые поля обязательны, специфичные для вида товара - необязательны.
// Ant, Formicarium и Accessory к нему приводятся без кастов.
export type ProductLike = ProductBase &
  Partial<Omit<Ant, keyof ProductBase>> &
  Partial<Omit<Formicarium, keyof ProductBase>> &
  Partial<Omit<Accessory, keyof ProductBase>>;

// ---------------------------------------------------------------------------
// Отзывы
// ---------------------------------------------------------------------------

export type ReviewTarget = "ant" | "formicarium" | "shop" | "accessory";

export interface Review {
  author: string;
  lang: Lang;
  date: string;
  rating: number;
  target: ReviewTarget;
  body: string;
  featured?: boolean;
  productSlug?: string;
  source?: "telegram";
  draft?: boolean;
}

export interface ReviewStats {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
}

// ---------------------------------------------------------------------------
// Блог
// ---------------------------------------------------------------------------

export interface BlogCategory {
  slug: string;
  label: Localized;
}

export interface BlogImageData {
  src: string;
  alt: Text;
  caption?: Text;
}

export interface FaqItem {
  q: Text;
  a: Text;
}

export interface BlogClipData {
  src: string;
  poster?: string;
  alt?: Text;
  caption?: Text;
}

// Блоки контента статьи - см. список типов в blogPostsData.ts.
export type BlogBlock =
  | { type: "lead"; text: Text }
  | { type: "heading"; level?: 2 | 3; text: Text }
  | { type: "paragraph"; text: Text }
  | ({ type: "image" } & BlogImageData)
  | { type: "row"; images: BlogImageData[] }
  | { type: "gallery"; images: BlogImageData[] }
  | { type: "list"; ordered?: boolean; items: Text[] }
  | { type: "steps"; items: { title: Text; text: Text }[] }
  | { type: "deflist"; items: FaqItem[] }
  | { type: "accordion"; items: FaqItem[] }
  | { type: "callout"; variant?: "tip" | "note" | "warning"; title?: Text; text: Text }
  | { type: "quote"; text: Text; author?: string }
  | { type: "keytakeaways"; title?: Text; items: Text[] }
  | { type: "video"; src: string; title?: Text }
  | ({ type: "clip" } & BlogClipData)
  | { type: "cta"; text: Text; buttonLabel: Text; to: string };

// Видео поста для VideoObject.
export interface BlogVideo {
  name: Text;
  description: Text;
  thumbnail?: string;
  uploadDate: string;
  duration?: string;
  embedUrl?: string;
  contentUrl?: string;
}

export interface BlogPost {
  id: number;
  slug: string;
  category: string;
  title: Localized;
  excerpt: Localized;
  seoTitle?: Localized;
  seoDescription?: Localized;
  cover: {
    src: string;
    alt: Localized;
    width: number;
    height: number;
  };
  datePublished: string;
  dateModified?: string;
  author?: { name: string; url: string };
  readingTime?: number;
  video?: BlogVideo;
  content: BlogBlock[];
  faq?: FaqItem[];
  relatedProductIds?: number[];
  relatedPostIds?: number[];
}

// ---------------------------------------------------------------------------
// Атлас видов
// ---------------------------------------------------------------------------

// Статус находки в зоне. "none" в данных не пишется - это отсутствие записи.
export type RecordStatus = "confirmed" | "reported" | "absent";
export type ZoneStatus = RecordStatus | "none";

export interface SpeciesZone {
  code: string;
  lat: number;
  lon: number;
  name: Localized;
  anchor: Localized;
}

export interface MapSpecies {
  slug: string;
  latin: string;
  sellSlug: string | null;
  name: Localized;
  note: Localized;
  // Ключ - code зоны; зоны нет в ключах = данных нет.
  records: Partial<Record<string, RecordStatus>>;
}

export interface PinColor {
  dot: string;
  ring: string;
}

// ---------------------------------------------------------------------------
// Корзина и заказ
// ---------------------------------------------------------------------------

// Строка корзины в localStorage ("cart-ids"): одна строка = одна единица товара.
// option - снимок выбранной градации цены на момент добавления.
export interface CartItem {
  uid: string;
  id: number | string;
  option: PriceOption | null;
  qty?: number;
}

// Перевод «на лету» для текущего языка (t из Layout).
export type Translate = (map: Localized) => string;

// Контекст, который Layout (App.tsx) передаёт страницам через <Outlet>.
export interface OutletContext {
  t: Translate;
  addToCart: (id: number | string, option?: PriceOption | null) => void;
  cartIds: CartItem[];
  updateCartQty: (uid: string, qty: number) => void;
  removeFromCart: (uid: string) => void;
  clearCart: () => void;
}

// Строка заказа, как её отправляет CartPage в /api/order.
export interface OrderItem {
  title: string;
  variant?: string;
  qty: number;
  price: string;
  lineTotal: string;
}

// Тело POST /api/order.
export interface OrderPayload {
  name: string;
  phone: string;
  address: string;
  comment?: string;
  items: OrderItem[];
  itemsTotal?: string;
  total?: string;
}
