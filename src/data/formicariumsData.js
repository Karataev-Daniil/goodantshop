// Фото стандартной модели Terra — папка assets/images/formicariums/terra/.
import formicariumBlueFront from "../assets/images/formicariums/terra/formicarium-blue-front.webp";
import formicariumBlueBackCorner from "../assets/images/formicariums/terra/formicarium-blue-back-corner.webp";
import formicariumBlueRear from "../assets/images/formicariums/terra/formicarium-blue-rear.webp";
import formicariumOrange from "../assets/images/formicariums/terra/formicarium-orange-back-corner.webp";
import formicariumYellow from "../assets/images/formicariums/terra/formicarium-yellow-back-corner.webp";
import formicariumGreen from "../assets/images/formicariums/terra/formicarium-green-back-corner.webp";
import formicariumBlack from "../assets/images/formicariums/terra/formicarium-black-back-corner.webp";

// Фото маленькой модели Terra Mini — папка assets/images/formicariums/terra-mini/.
import miniBlueFront from "../assets/images/formicariums/terra-mini/formicarium-blue-front.webp";
import miniBlueFrontTwo from "../assets/images/formicariums/terra-mini/formicarium-blue-front-two.webp";
import miniBlueBackCorner from "../assets/images/formicariums/terra-mini/formicarium-blue-back-corner.webp";
import miniGreenBackCorner from "../assets/images/formicariums/terra-mini/formicarium-green-back-corner.webp";
import miniOrangeBackCorner from "../assets/images/formicariums/terra-mini/formicarium-orange-back-corner.webp";
import miniRedBackCorner from "../assets/images/formicariums/terra-mini/formicarium-red-back-corner.webp";

const priceOptions = [
  {
    label: {
      ru: "Базовая модель",
      ro: "Model de bază",
      en: "Basic model",
    },
    value: "1300 лей",
  }
];

// Terra Mini — компактная младшая модель, дешевле стандартной Terra.
const terraMiniPriceOptions = [
  {
    label: {
      ru: "Базовая модель",
      ro: "Model de bază",
      en: "Basic model",
    },
    value: "1100 лей",
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
    recommendedAntIds: [42, 44, 45],
    relatedBlogIds: [402]
  },
  {
    id: 203,
    slug: "terra-mini",
    title: {
      ru: "Terra Mini",
      ro: "Terra Mini",
      en: "Terra Mini"
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
    // Синие ракурсы идут первыми — главное фото карточки.
    images: [
      miniBlueBackCorner,
      miniBlueFront,
      miniBlueFrontTwo,
      miniGreenBackCorner,
      miniOrangeBackCorner,
      miniRedBackCorner,
    ],
    characteristics: [
      {
        label: { ru: "Размер", ro: "Dimensiune", en: "Size" },
        value: { ru: "10×9×13 см", ro: "10×9×13 cm", en: "10×9×13 cm" }
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
    priceOptions: terraMiniPriceOptions,
    recommendedAntIds: [43, 46, 47],
    relatedBlogIds: [402]
  }
];
