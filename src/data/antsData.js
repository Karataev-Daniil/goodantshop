import messorStructorImage from "../assets/images/messor-structor.webp";
import lasiusNigerImage from "../assets/images/lasius-niger.webp";
import camponotusFellahImage from "../assets/images/camponotus-fellah.webp";

export const priceOptions = [
  {
    label: {
      ru: "Матка + расплод (стартовая колония)",
      ro: "Regina + puiet (colonie starter)",
      en: "Queen + brood (starter colony)",
    },
    value: "550 лей",
    selected: true,
  },
  {
    label: {
      ru: "Матка + расплод + 10-20 рабочих",
      ro: "Regina + puiet + 10-20 lucratoare",
      en: "Queen + brood + 10-20 workers",
    },
    value: "650 лей",
    selected: false,
  },
];

export const ants = [
  {
    id: 44,
    slug: "messor-structor",
    title: {
      ru: "Messor Structor",
      ro: "Messor Structor",
      en: "Messor Structor"
    },
    excerpt: {
      ru: "Спокойный зерноядный вид, отлично подходит новичкам.",
      ro: "Specie granivora calma, potrivita excelent pentru incepatori.",
      en: "A calm seed-eating species, great for beginners."
    },
    description: {
      ru: "Messor structor - популярный стартовый вид для наблюдения. Нуждается в сухой арене и умеренной влажности в гнездовой части.",
      ro: "Messor structor este o specie populara pentru start. Are nevoie de arena uscata si umiditate moderata in zona cuibului.",
      en: "Messor structor is a popular starter species. It needs a dry arena and moderate humidity in the nest area."
    },
    image: messorStructorImage,
    images: [messorStructorImage, "/placeholder-ant.svg"],
    priceOptions,
    availability: "inStock",
    characteristics: [
      {
        label: { ru: "Температура", ro: "Temperatura", en: "Temperature" },
        value: { ru: "23-27 C", ro: "23-27 C", en: "23-27 C" }
      },
      {
        label: { ru: "Влажность", ro: "Umiditate", en: "Humidity" },
        value: { ru: "Средняя", ro: "Medie", en: "Medium" }
      },
      {
        label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" },
        value: { ru: "Низкая", ro: "Redusa", en: "Low" }
      }
    ],
    recommendedFormicariumIds: [202],
    relatedBlogIds: [401, 402, 404]
  },
  {
    id: 43,
    slug: "lasius-niger",
    title: {
      ru: "Lasius Niger",
      ro: "Lasius Niger",
      en: "Lasius Niger"
    },
    excerpt: {
      ru: "Выносливый и неприхотливый вид для ежедневного наблюдения.",
      ro: "Specie rezistenta si nepretentioasa pentru observatie zilnica.",
      en: "A hardy and low-maintenance species for daily observation."
    },
    description: {
      ru: "Lasius niger легко адаптируется и хорошо развивается в базовых условиях. Отличный вариант для первого формикария.",
      ro: "Lasius niger se adapteaza usor si se dezvolta bine in conditii de baza. O alegere excelenta pentru primul formicar.",
      en: "Lasius niger adapts easily and grows well in basic conditions. A great option for a first formicarium."
    },
    image: lasiusNigerImage,
    images: [lasiusNigerImage, "/placeholder-ant.svg"],
    priceOptions,
    availability: "preorder",
    characteristics: [
      {
        label: { ru: "Температура", ro: "Temperatura", en: "Temperature" },
        value: { ru: "21-25 C", ro: "21-25 C", en: "21-25 C" }
      },
      {
        label: { ru: "Влажность", ro: "Umiditate", en: "Humidity" },
        value: { ru: "Средняя", ro: "Medie", en: "Medium" }
      },
      {
        label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" },
        value: { ru: "Низкая", ro: "Redusa", en: "Low" }
      }
    ],
    recommendedFormicariumIds: [202],
    relatedBlogIds: [401, 403]
  },
  {
    id: 42,
    slug: "camponotus-fellah",
    title: {
      ru: "Camponotus Fellah",
      ro: "Camponotus Fellah",
      en: "Camponotus Fellah"
    },
    excerpt: {
      ru: "Крупный и эффектный вид для тех, кто хочет выразительную колонию.",
      ro: "Specie mare si impresionanta pentru cei care vor o colonie expresiva.",
      en: "A large and striking species for those who want a standout colony."
    },
    description: {
      ru: "Camponotus fellah требует стабильных условий и регулярного белкового кормления. Подходит для уверенных новичков и профи.",
      ro: "Camponotus fellah necesita conditii stabile si hranire proteica regulata. Potrivit pentru incepatori siguri si avansati.",
      en: "Camponotus fellah needs stable conditions and regular protein feeding. Suitable for confident beginners and experienced keepers."
    },
    image: camponotusFellahImage,
    images: [camponotusFellahImage, "/placeholder-ant.svg"],
    priceOptions,
    availability: "preorder",
    characteristics: [
      {
        label: { ru: "Температура", ro: "Temperatura", en: "Temperature" },
        value: { ru: "24-29 C", ro: "24-29 C", en: "24-29 C" }
      },
      {
        label: { ru: "Влажность", ro: "Umiditate", en: "Humidity" },
        value: { ru: "Средняя/Высокая", ro: "Medie/Ridicata", en: "Medium/High" }
      },
      {
        label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" },
        value: { ru: "Средняя", ro: "Medie", en: "Medium" }
      }
    ],
    recommendedFormicariumIds: [202],
    relatedBlogIds: [402, 403]
  }
];

export const popularAntIds = [44, 43, 42];
