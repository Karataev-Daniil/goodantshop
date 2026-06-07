import formicariumBlueFront from "../assets/images/formicariums/formicarium-blue-front.avif";
import formicariumBlueBackCorner from "../assets/images/formicariums/formicarium-blue-back-corner.avif";
import formicariumBlueRear from "../assets/images/formicariums/formicarium-blue-rear.avif";
import formicariumOrange from "../assets/images/formicariums/formicarium-orange-back-corner.avif";
import formicariumYellow from "../assets/images/formicariums/formicarium-yellow-back-corner.avif";
import formicariumGreen from "../assets/images/formicariums/formicarium-green-back-corner.avif";
import formicariumBlack from "../assets/images/formicariums/formicarium-black-back-corner.avif";

const priceOptions = [
  {
    label: {
      ru: "Базовая модель",
      ro: "Model de bază",
      en: "Basic model",
    },
    value: "1200 лей",
  }
];

export const formicariums = [
  {
    id: 202,
    slug: "terra",
    title: {
      ru: "Terra",
      ro: "Terra",
      en: "Terra"
    },
    excerpt: {
      ru: "Стабильная влажность и удобный обзор камер.",
      ro: "Umiditate stabilă și vizibilitate bună a camerelor.",
      en: "Stable humidity and a convenient chamber view."
    },
    description: {
      ru: "Усиленная конструкция с сетчатой вентиляцией и системой для равномерного увлажнения. Отлично подходит для видов, любящих песчаный грунт.",
      ro: "Construcție rezistentă cu ventilație din plasă și sistem de umidificare uniformă. Potrivit pentru speciile care preferă substratul nisipos.",
      en: "Reinforced construction with mesh ventilation and even moisture system. Great for species that prefer sandy substrate."
    },
    images: [
      formicariumBlueBackCorner,
      formicariumBlueRear,
      formicariumBlueFront,
      formicariumOrange,
      formicariumYellow,
      formicariumGreen,
      formicariumBlack,
    ],
    characteristics: [
      {
        label: { ru: "Размер", ro: "Dimensiune", en: "Size" },
        value: { ru: "15×15×10 см", ro: "15×15×10 cm", en: "15×15×10 cm" }
      },
      {
        label: { ru: "Материал", ro: "Material", en: "Material" },
        value: { ru: "Прочный пластик", ro: "Plastic rezistent", en: "Durable plastic" }
      },
      {
        label: { ru: "Цвет", ro: "Culoare", en: "Color" },
        value: { ru: "Песочный", ro: "Nisipiu", en: "Sand" }
      }
    ],
    colorOptions: [
      { label: { ru: "Песочный", ro: "Nisipiu", en: "Sand" }, value: "sand" },
      { label: { ru: "Прозрачный", ro: "Transparent", en: "Clear" }, value: "clear" }
    ],
    defaultColor: "sand",
    capacity: { ru: "До средней колонии", ro: "Până la o colonie medie", en: "Up to a medium colony" },
    humidityType: { ru: "Пассивное увлажнение", ro: "Umidificare pasivă", en: "Passive humidification" },
    sizeCategory: "medium",
    careLevel: "easy",
    feedingType: "seeds",
    availability: "inStock",
    priceOptions,
    recommendedAntIds: [44],
    relatedBlogIds: [402]
  }
];
