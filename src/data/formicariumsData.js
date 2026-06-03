import sandLabM1 from "../assets/images/sand-lab-m-1.svg";
import sandLabM2 from "../assets/images/sand-lab-m-2.svg";

const priceOptions = [
  {
    label: {
      ru: "Базовая модель",
      ro: "Model de bază",
      en: "Basic model",
    },
    value: "2200 лей",
  },
  {
    label: {
      ru: "Полный комплект",
      ro: "Pachet complet",
      en: "Complete kit",
    },
    value: "2600 лей",
  },
];

export const formicariums = [
  {
    id: 202,
    slug: "sand-lab-m",
    title: {
      ru: "Sand Lab M",
      ro: "Sand Lab M",
      en: "Sand Lab M"
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
    images: [sandLabM1, sandLabM2],
    characteristics: [
      {
        label: { ru: "Размер", ro: "Dimensiune", en: "Size" },
        value: { ru: "34×22×18 см", ro: "34×22×18 cm", en: "34×22×18 cm" }
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
    sizeCategory: "medium",
    careLevel: "easy",
    feedingType: "seeds",
    availability: "inStock",
    priceOptions,
    recommendedAntIds: [44],
    relatedBlogIds: [402]
  }
];
