// Фото стандартной модели Terra - папка assets/images/formicariums/terra/.
import formicariumBlueFront from "../assets/images/formicariums/terra/formicarium-blue-front.webp";
import formicariumBlueBackCorner from "../assets/images/formicariums/terra/formicarium-blue-back-corner.webp";
import formicariumBlueRear from "../assets/images/formicariums/terra/formicarium-blue-rear.webp";
import formicariumOrange from "../assets/images/formicariums/terra/formicarium-orange-back-corner.webp";
import formicariumYellow from "../assets/images/formicariums/terra/formicarium-yellow-back-corner.webp";
import formicariumGreen from "../assets/images/formicariums/terra/formicarium-green-back-corner.webp";
import formicariumBlack from "../assets/images/formicariums/terra/formicarium-black-back-corner.webp";

// Фото маленькой модели Terra Mini - папка assets/images/formicariums/terra-mini/.
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

// Terra Mini - компактная младшая модель, дешевле стандартной Terra.
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
      ru: "Средний размер: колонии хватит места на 5 лет роста.",
      ro: "Dimensiune medie: coloniei îi ajunge loc pentru 5 ani de creștere.",
      en: "Medium size: room for a colony to grow for 5 years."
    },
    description: {
      ru: "Усиленная конструкция с сетчатой вентиляцией и системой для равномерного увлажнения. Отлично подходит для видов, любящих песчаный грунт. Объёма хватает колонии Messor или любого другого вида примерно на 5 лет, то есть переселять её всё это время не придётся.",
      ro: "Construcție rezistentă cu ventilație din plasă și sistem de umidificare uniformă. Potrivit pentru speciile care preferă substratul nisipos. Volumul îi ajunge unei colonii de Messor sau oricărei alte specii circa 5 ani, așa că nu va trebui mutată în tot acest timp.",
      en: "Reinforced construction with mesh ventilation and even moisture system. Great for species that prefer sandy substrate. The volume lasts a Messor colony, or any other species, about 5 years, so you won't need to rehouse it in all that time."
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
    // Меряем вместимость сроком, а не числом муравьёв: покупателю понятнее,
    // а нам не приходится называть цифру, которую нечем подтвердить.
    capacity: { ru: "5 лет", ro: "5 ani", en: "5 years" },
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
      ru: "Компактная модель: колонии хватит места на 3 года роста.",
      ro: "Model compact: coloniei îi ajunge loc pentru 3 ani de creștere.",
      en: "Compact model: room for a colony to grow for 3 years."
    },
    description: {
      ru: "Усиленная конструкция с сетчатой вентиляцией и системой для равномерного увлажнения. Отлично подходит для видов, любящих песчаный грунт. Объёма хватает колонии примерно на 3 года - это удачный вариант для первого опыта, когда не хочется занимать много места на столе.",
      ro: "Construcție rezistentă cu ventilație din plasă și sistem de umidificare uniformă. Potrivit pentru speciile care preferă substratul nisipos. Volumul îi ajunge unei colonii circa 3 ani - o variantă bună pentru prima experiență, când nu vrei să ocupi mult loc pe masă.",
      en: "Reinforced construction with mesh ventilation and even moisture system. Great for species that prefer sandy substrate. The volume lasts a colony about 3 years - a good choice for a first try, when you don't want to take up much desk space."
    },
    // Синие ракурсы идут первыми - главное фото карточки.
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
    capacity: { ru: "3 года", ro: "3 ani", en: "3 years" },
    humidityType: { ru: "Пассивное увлажнение", ro: "Umidificare pasivă", en: "Passive humidification" },
    sizeCategory: "small",
    careLevel: "easy",
    feedingType: "seeds",
    availability: "inStock",
    priceOptions: terraMiniPriceOptions,
    recommendedAntIds: [43, 46, 47],
    relatedBlogIds: [402]
  }
];
