// Стартовый набор - не отдельная позиция склада, а комплект из двух товаров
// каталога: формикарий Terra и колония Messor Structor. В корзину он кладёт
// именно их, а подарки (набор инструментов и корм под вид) корзина добавляет
// сама, как только видит в заказе колонию и формикарий (см. CartPage).
// Цены здесь не пишутся руками, а считаются из каталога - иначе страница
// набора разойдётся с корзиной при первой же правке прайса.
import { ants } from "./antsData";
import { formicariums } from "./formicariumsData";
import { foodForAnt, toolKit } from "./accessoriesData";
import type { Accessory, Availability, Localized, PriceOption, ProductLike } from "../types";

export const STARTER_KIT_PATH = "/starter-kit";

// Каталог не пустой: первые позиции есть всегда.
export const kitColony = ants.find((item) => item.slug === "messor-structor") ?? ants[0]!;
export const kitFormicarium = formicariums.find((item) => item.slug === "terra") ?? formicariums[0]!;

// Подарки - те же, что корзина добавит к комплекту с этой колонией.
export const kitGifts: Accessory[] = [toolKit(), foodForAnt(kitColony)].filter(
  (item): item is Accessory => Boolean(item)
);

// Доставка по Кишинёву (150 лей) бесплатна, если в заказе есть формикарий.
export const KIT_DELIVERY_VALUE = 150;

export const priceNumber = (option: PriceOption | undefined): number =>
  Number(String(option?.value ?? "").replace(/\D/g, "")) || 0;

const firstPrice = (product: { priceOptions?: PriceOption[] }) =>
  priceNumber(product.priceOptions?.find((option) => option.selected) || product.priceOptions?.[0]);

export const kitColonyPrice = firstPrice(kitColony);
export const kitFormicariumPrice = firstPrice(kitFormicarium);
export const kitPrice = kitColonyPrice + kitFormicariumPrice;
export const kitGiftValue = kitGifts.reduce((sum, gift) => sum + firstPrice(gift), 0) + KIT_DELIVERY_VALUE;

// Набор доступен, только пока обе его части можно заказать.
const AVAILABILITY_RANK: Availability[] = ["inStock", "preorder", "outOfStock"];
export const kitAvailability: Availability = [kitColony.availability, kitFormicarium.availability].reduce(
  (worst, current) => (AVAILABILITY_RANK.indexOf(current) > AVAILABILITY_RANK.indexOf(worst) ? current : worst),
  "inStock" as Availability
);

const lei = (value: number): string => `${value} лей`;

export const kitTitle: Localized = { ru: "Стартовый набор", ro: "Set de start", en: "Starter kit" };

export const kitExcerpt: Localized = {
  ru: "Формикарий Terra и колония Messor Structor из наличия. Набор инструментов и корм в подарок.",
  ro: "Formicariu Terra și colonie Messor Structor din stoc. Setul de instrumente și hrana vin cadou.",
  en: "Terra formicarium and a Messor Structor colony from stock. Tool kit and food come as a gift.",
};

export const kitImages: string[] = [
  "/formicarium-colony.webp",
  kitColony.images?.[0] || kitColony.image,
  kitFormicarium.images?.[0],
  ...kitGifts.map((gift) => gift.images?.[0] || gift.image),
].filter((src): src is string => Boolean(src));

// Набор в форме обычного товара - для карточки на главной и Product-разметки.
export const kitProduct: ProductLike = {
  id: 900,
  slug: "starter-kit",
  title: kitTitle,
  excerpt: kitExcerpt,
  description: {
    ru: `Всё для первой муравьиной фермы в одной посылке: формикарий Terra, которого колонии хватит примерно на 5 лет роста, и колония Messor Structor с маткой - спокойный зерноядный вид, который отлично подходит новичкам. Набор инструментов и зерновая смесь идут в подарок, доставка по Кишинёву бесплатная.`,
    ro: `Tot ce trebuie pentru prima fermă de furnici într-un singur colet: formicariul Terra, care îi ajunge coloniei pentru circa 5 ani de creștere, și colonia Messor Structor cu regină - o specie granivoră calmă, potrivită pentru începători. Setul de instrumente și amestecul de semințe vin cadou, livrarea în Chișinău e gratuită.`,
    en: `Everything for a first ant farm in one parcel: the Terra formicarium, roomy enough for about 5 years of colony growth, and a queen-right Messor Structor colony - a calm seed-eating species that suits beginners. The tool kit and seed mix come as a gift, and delivery within Chișinău is free.`,
  },
  images: kitImages,
  availability: kitAvailability,
  priceOptions: [
    {
      label: { ru: "Формикарий + колония", ro: "Formicariu + colonie", en: "Formicarium + colony" },
      value: lei(kitPrice),
    },
  ],
};
