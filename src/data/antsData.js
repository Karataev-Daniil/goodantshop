import messorStructorImage from "../assets/images/ants/messor-structor.webp";
import lasiusNigerImage from "../assets/images/ants/lasius-niger.webp";
import lasiusNeglectusImage from "../assets/images/ants/lasius-neglectus.jpg";
import camponotusFellahImage from "../assets/images/ants/camponotus-fellah.webp";

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

// Camponotus Fellah is a premium species and is priced higher than the others.
export const camponotusPriceOptions = [
  {
    label: {
      ru: "Матка + расплод (стартовая колония)",
      ro: "Regina + puiet (colonie starter)",
      en: "Queen + brood (starter colony)",
    },
    value: "750 лей",
    selected: true,
  },
  {
    label: {
      ru: "Матка + расплод + 10-20 рабочих",
      ro: "Regina + puiet + 10-20 lucratoare",
      en: "Queen + brood + 10-20 workers",
    },
    value: "850 лей",
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
      ru: "Messor structor: зерноядный «жнец» и популярный выбор для старта. Рабочие полиморфны: крупные майоры-солдаты дробят семена мощными челюстями. Нужна сухая арена и умеренная влажность в гнезде.",
      ro: "Messor structor: o specie granivoră «secerătoare» și o alegere populară pentru start. Lucrătoarele sunt polimorfe: majorii-soldați sparg semințele cu mandibule puternice. Are nevoie de arenă uscată și umiditate moderată în cuib.",
      en: "Messor structor: a granivorous \"harvester\" and a popular starter species. Workers are polymorphic: large soldier-majors crush seeds with powerful jaws. It needs a dry arena and moderate humidity in the nest."
    },
    image: messorStructorImage,
    images: [messorStructorImage],
    queenSize: { ru: "10-12 мм", ro: "10-12 mm", en: "10-12 mm" },
    workerSize: { ru: "4-9 мм", ro: "4-9 mm", en: "4-9 mm" },
    soldierSize: { ru: "до 12 мм", ro: "până la 12 mm", en: "up to 12 mm" },
    colonySize: { ru: "Матка + 10–20 рабочих", ro: "Regină + 10–20 lucrătoare", en: "Queen + 10–20 workers" },
    food: { ru: "Семена и зёрна", ro: "Semințe și grăunțe", en: "Seeds and grains" },
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
    id: 45,
    slug: "lasius-neglectus",
    title: {
      ru: "Lasius Neglectus",
      ro: "Lasius Neglectus",
      en: "Lasius Neglectus"
    },
    excerpt: {
      ru: "Самый быстрорастущий вид: выносливая «суперколония» с несколькими матками.",
      ro: "Cea mai rapidă creștere: o „supercolonie” rezistentă cu mai multe regine.",
      en: "The fastest-growing species: a hardy multi-queen \"super colony\"."
    },
    description: {
      ru: "Lasius neglectus: выносливый полигинный вид, образующий быстрорастущие суперколонии с несколькими матками. Неприхотлив, хорошо развивается при комнатной температуре, любит сахарный сироп и белковый корм. Зимой нужен короткий период покоя. Один из самых динамичных видов для наблюдения.",
      ro: "Lasius neglectus este o specie poligină rezistentă, care formează supercolonii cu creștere rapidă și mai multe regine. Nepretențioasă, se dezvoltă bine la temperatura camerei, preferă siropul de zahăr și hrana proteică. Iarna are nevoie de o scurtă perioadă de repaus. Una dintre cele mai dinamice specii pentru observație.",
      en: "Lasius neglectus is a hardy polygynous species that forms fast-growing super colonies with multiple queens. Undemanding, it thrives at room temperature and enjoys sugar syrup and protein food. It needs a short winter rest. One of the most dynamic species to observe."
    },
    image: lasiusNeglectusImage,
    images: [lasiusNeglectusImage],
    queenSize: { ru: "6-7 мм", ro: "6-7 mm", en: "6-7 mm" },
    workerSize: { ru: "2-3 мм", ro: "2-3 mm", en: "2-3 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Сахарный сироп, насекомые", ro: "Sirop de zahăr, insecte", en: "Sugar syrup, insects" },
    priceOptions,
    availability: "inStock",
    characteristics: [
      {
        label: { ru: "Температура", ro: "Temperatura", en: "Temperature" },
        value: { ru: "20-26 C", ro: "20-26 C", en: "20-26 C" }
      },
      {
        label: { ru: "Влажность", ro: "Umiditate", en: "Humidity" },
        value: { ru: "Низкая/Средняя", ro: "Redusă/Medie", en: "Low/Medium" }
      },
      {
        label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" },
        value: { ru: "Низкая", ro: "Redusă", en: "Low" }
      },
      {
        label: { ru: "Колония", ro: "Colonie", en: "Colony" },
        value: { ru: "Полигинная (много маток)", ro: "Poligină (mai multe regine)", en: "Polygynous (multiple queens)" }
      }
    ],
    recommendedFormicariumIds: [202],
    relatedBlogIds: [401, 403]
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
      ru: "Lasius niger легко адаптируется и хорошо развивается в базовых условиях, отлично подходит для первого формикария. Важно: зимой колонии нужна спячка при 5-10 °C, иначе матка истощается.",
      ro: "Lasius niger se adaptează ușor și se dezvoltă bine în condiții de bază, fiind o alegere excelentă pentru primul formicariu. Important: iarna colonia are nevoie de hibernare la 5-10 °C, altfel regina se epuizează.",
      en: "Lasius niger adapts easily and grows well in basic conditions, a great choice for a first formicarium. Important: in winter the colony needs hibernation at 5-10 °C, otherwise the queen burns out."
    },
    image: lasiusNigerImage,
    images: [lasiusNigerImage],
    queenSize: { ru: "8-9 мм", ro: "8-9 mm", en: "8-9 mm" },
    workerSize: { ru: "3-5 мм", ro: "3-5 mm", en: "3-5 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Сахарный сироп, насекомые", ro: "Sirop de zahăr, insecte", en: "Sugar syrup, insects" },
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
      ru: "Camponotus fellah: крупный «карпентер» из засушливых регионов. Полиморфный вид с большими майорами-солдатами. Требует стабильных условий и регулярного белкового корма; зимовка не обязательна.",
      ro: "Camponotus fellah: o specie mare de „dulgher” din regiuni aride. Polimorfă, cu majori-soldați mari. Necesită condiții stabile și hrană proteică regulată; hibernarea nu este obligatorie.",
      en: "Camponotus fellah: a large \"carpenter\" ant from arid regions. A polymorphic species with big soldier-majors. It needs stable conditions and regular protein feeding; hibernation is not required."
    },
    image: camponotusFellahImage,
    images: [camponotusFellahImage],
    queenSize: { ru: "17-20 мм", ro: "17-20 mm", en: "17-20 mm" },
    workerSize: { ru: "7-14 мм", ro: "7-14 mm", en: "7-14 mm" },
    soldierSize: { ru: "14-18 мм", ro: "14-18 mm", en: "14-18 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Белок и сахарный сироп", ro: "Proteine și sirop de zahăr", en: "Protein and sugar syrup" },
    priceOptions: camponotusPriceOptions,
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
