import messorStructorImage from "../assets/images/ants/messor-structor.webp";
import lasiusNigerImage from "../assets/images/ants/lasius-niger.webp";
import lasiusNeglectusImage from "../assets/images/ants/lasius-neglectus.jpg";
import camponotusFellahImage from "../assets/images/ants/camponotus-fellah.webp";
import formicaCuniculariaImage from "../assets/images/ants/formica_cunicularia.webp";
import formicaRufibarbisImage from "../assets/images/ants/formica_rufibarbis.webp";

// Each species is sold in three colony-size tiers. Prices are written out per
// tier so they can be edited individually per species.
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
      ru: "Матка + 5-15 муравьёв",
      ro: "Regina + 5-15 furnici",
      en: "Queen + 5-15 ants",
    },
    value: "650 лей",
    selected: false,
  },
  {
    label: {
      ru: "Матка + 15-30 муравьёв",
      ro: "Regina + 15-30 furnici",
      en: "Queen + 15-30 ants",
    },
    value: "750 лей",
    selected: false,
  },
];

// У Messor сейчас в наличии только одна градация: колоний «матка + расплод» и
// крупных (15-30 рабочих) пока нет. Отдельный массив нужен потому, что базовый
// priceOptions делят Messor и Lasius Niger, а ограничение только у Messor.
export const messorPriceOptions = [
  {
    label: {
      ru: "Матка + 5-15 муравьёв",
      ro: "Regina + 5-15 furnici",
      en: "Queen + 5-15 ants",
    },
    value: "650 лей",
    selected: true,
  },
  {
    label: {
      ru: "Матка + 15-30 муравьёв",
      ro: "Regina + 15-30 furnici",
      en: "Queen + 15-30 ants",
    },
    value: "750 лей",
    selected: false,
  },
];

// Camponotus Fellah is a premium species and is priced higher than the others.
// Конкурентов по этому виду в Молдове нет (у ближайшего магазина только Messor
// и Tetramorium), поэтому цена не привязана к чужому прайсу.
export const camponotusPriceOptions = [
  {
    label: {
      ru: "Матка + расплод (стартовая колония)",
      ro: "Regina + puiet (colonie starter)",
      en: "Queen + brood (starter colony)",
    },
    value: "900 лей",
    selected: true,
  },
  {
    label: {
      ru: "Матка + 5-15 муравьёв",
      ro: "Regina + 5-15 furnici",
      en: "Queen + 5-15 ants",
    },
    value: "1000 лей",
    selected: false,
  },
  {
    label: {
      ru: "Матка + 15-30 муравьёв",
      ro: "Regina + 15-30 furnici",
      en: "Queen + 15-30 ants",
    },
    value: "1100 лей",
    selected: false,
  },
];

// Formica species are currently scarce (only a few of each), small premium.
export const formicaPriceOptions = [
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
      ru: "Матка + 5-15 муравьёв",
      ro: "Regina + 5-15 furnici",
      en: "Queen + 5-15 ants",
    },
    value: "850 лей",
    selected: false,
  },
  {
    label: {
      ru: "Матка + 15-30 муравьёв",
      ro: "Regina + 15-30 furnici",
      en: "Queen + 15-30 ants",
    },
    value: "950 лей",
    selected: false,
  },
];

// Lasius neglectus is a popular fast-growing super colony, small premium.
export const neglectusPriceOptions = [
  {
    label: {
      ru: "Матка + расплод (стартовая колония)",
      ro: "Regina + puiet (colonie starter)",
      en: "Queen + brood (starter colony)",
    },
    value: "650 лей",
    selected: true,
  },
  {
    label: {
      ru: "Матка + 5-15 муравьёв",
      ro: "Regina + 5-15 furnici",
      en: "Queen + 5-15 ants",
    },
    value: "750 лей",
    selected: false,
  },
  {
    label: {
      ru: "Матка + 15-30 муравьёв",
      ro: "Regina + 15-30 furnici",
      en: "Queen + 15-30 ants",
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
      ru: "Messor structor, степной муравей-жнец и один из самых удачных видов для старта. Рабочие разного размера: крупные майоры мощными челюстями дробят зёрна и готовят из них «муравьиный хлеб» для личинок. В природе вид запасает семена в подземных амбарах, поэтому арену держат сухой, а кормят смесью семян и мелких насекомых. Зимой колонии нужен период покоя, тогда матка живёт дольше.",
      ro: "Messor structor, furnica secerătoare de stepă și una dintre cele mai potrivite specii pentru început. Lucrătoarele au mărimi diferite: majorii cu mandibule puternice sparg semințele și pregătesc din ele «pâinea furnicilor» pentru larve. În natură depozitează semințe în hambare subterane, de aceea arena se ține uscată, iar hrana este un amestec de semințe și insecte mici. Iarna colonia are nevoie de o perioadă de repaus, astfel regina trăiește mai mult.",
      en: "Messor structor, the steppe harvester ant and one of the best species to begin with. Workers come in different sizes: large majors crush grains with powerful jaws and turn them into \"ant bread\" for the larvae. In the wild it stores seeds in underground granaries, so keep the arena dry and feed a mix of seeds and small insects. In winter the colony needs a rest period, which helps the queen live longer."
    },
    image: messorStructorImage,
    images: [messorStructorImage],
    queenSize: { ru: "10-12 мм", ro: "10-12 mm", en: "10-12 mm" },
    workerSize: { ru: "4-9 мм", ro: "4-9 mm", en: "4-9 mm" },
    soldierSize: { ru: "до 12 мм", ro: "până la 12 mm", en: "up to 12 mm" },
    colonySize: { ru: "Матка + 5-15 рабочих", ro: "Regină + 5-15 lucrătoare", en: "Queen + 5-15 workers" },
    food: { ru: "Семена и зёрна", ro: "Semințe și grăunțe", en: "Seeds and grains" },
    // Рацион определяет, какой корм предлагаем к колонии (см. foodForAnt в accessoriesData.js).
    diet: "seeds",
    priceOptions: messorPriceOptions,
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
    recommendedFormicariumIds: [202, 203],
    relatedBlogIds: [401, 402, 404]
  },
  {
    id: 46,
    slug: "formica-cunicularia",
    title: {
      ru: "Formica Cunicularia",
      ro: "Formica Cunicularia",
      en: "Formica Cunicularia"
    },
    excerpt: {
      ru: "Быстрый и активный полевой муравей, живая колония для увлечённых наблюдателей.",
      ro: "Furnică de câmp rapidă și activă, o colonie vie pentru observatori pasionați.",
      en: "A fast, active field ant, a lively colony for keen observers."
    },
    description: {
      ru: "Formica cunicularia, быстрый полевой муравей серо-бурого цвета из группы Serviformica. Рабочие одного размера, очень подвижные и хорошо заметны в арене, а колония сохраняет активность почти весь день. Вид всеядный: сахарный сироп даёт энергию, насекомые обеспечивают белок. Матка основывает семью сама, а зимой обязателен покой при 5-10 °C. Живой и любопытный вид для тех, кто уже пробовал базовых муравьёв.",
      ro: "Formica cunicularia, o furnică de câmp rapidă, de culoare cenușiu-brună, din grupul Serviformica. Lucrătoarele au aceeași mărime, sunt foarte active și ușor de observat în arenă, iar colonia rămâne activă aproape toată ziua. Specie omnivoră: siropul de zahăr oferă energie, insectele asigură proteinele. Regina întemeiază familia singură, iar iarna repausul la 5-10 °C este obligatoriu. O specie vie și curioasă pentru cei care au încercat deja furnici de bază.",
      en: "Formica cunicularia, a fast grey-brown field ant from the Serviformica group. Workers are all one size, very active and easy to watch in the arena, and the colony stays busy for most of the day. An omnivore: sugar syrup gives energy while insects provide protein. The queen founds the colony herself, and in winter a rest at 5-10 °C is mandatory. A lively, curious species for keepers who have already tried the basic ants."
    },
    image: formicaCuniculariaImage,
    images: [formicaCuniculariaImage],
    queenSize: { ru: "9-11 мм", ro: "9-11 mm", en: "9-11 mm" },
    workerSize: { ru: "5-7 мм", ro: "5-7 mm", en: "5-7 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Сахарный сироп, насекомые", ro: "Sirop de zahăr, insecte", en: "Sugar syrup, insects" },
    diet: "insects",
    priceOptions: formicaPriceOptions,
    availability: "inStock",
    characteristics: [
      {
        label: { ru: "Температура", ro: "Temperatura", en: "Temperature" },
        value: { ru: "24-27 C", ro: "24-27 C", en: "24-27 C" }
      },
      {
        label: { ru: "Влажность", ro: "Umiditate", en: "Humidity" },
        value: { ru: "Низкая/Средняя", ro: "Redusă/Medie", en: "Low/Medium" }
      },
      {
        label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" },
        value: { ru: "Средняя", ro: "Medie", en: "Medium" }
      },
      {
        label: { ru: "Зимовка", ro: "Hibernare", en: "Hibernation" },
        value: { ru: "Обязательна, 5-10 °C", ro: "Obligatorie, 5-10 °C", en: "Required, 5-10 °C" }
      }
    ],
    recommendedFormicariumIds: [203, 202],
    relatedBlogIds: [401, 403]
  },
  {
    id: 47,
    slug: "formica-rufibarbis",
    title: {
      ru: "Formica Rufibarbis",
      ro: "Formica Rufibarbis",
      en: "Formica Rufibarbis"
    },
    excerpt: {
      ru: "Красногрудый муравей-охотник: стремительная и выразительная колония с контрастной окраской.",
      ro: "Furnică vânătoare cu toracele roșcat: o colonie rapidă și expresivă, cu colorit contrastant.",
      en: "The red-barbed hunter ant: a swift, striking colony with contrasting colours."
    },
    description: {
      ru: "Formica rufibarbis, эффектный муравей с контрастной окраской: тёмные голова и брюшко, рыжая грудка. Рабочие одного размера, очень быстрые и азартные охотники, поэтому в рационе много белка, а сахарный сироп поддерживает энергию. Матка основывает колонию сама, зимой обязателен покой при 5-10 °C. Вид любит тепло и свет и славится прытью, так что арену держат надёжно закрытой от побега.",
      ro: "Formica rufibarbis, o furnică spectaculoasă cu colorit contrastant: cap și abdomen închise la culoare, torace roșcat. Lucrătoarele au aceeași mărime, sunt vânători foarte rapizi și entuziaști, de aceea dieta conține multe proteine, iar siropul de zahăr menține energia. Regina întemeiază colonia singură, iar iarna repausul la 5-10 °C este obligatoriu. Specia iubește căldura și lumina și este renumită pentru viteză, așa că arena se ține bine închisă împotriva evadării.",
      en: "Formica rufibarbis, a striking ant with contrasting colours: a dark head and gaster with a reddish mesosoma. Workers are all one size and are very fast, eager hunters, so the diet is rich in protein while sugar syrup keeps the energy up. The queen founds the colony herself, and in winter a rest at 5-10 °C is mandatory. This species loves warmth and light and is famous for its speed, so keep the arena well sealed against escapes."
    },
    image: formicaRufibarbisImage,
    images: [formicaRufibarbisImage],
    queenSize: { ru: "9-11 мм", ro: "9-11 mm", en: "9-11 mm" },
    workerSize: { ru: "6-9 мм", ro: "6-9 mm", en: "6-9 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Насекомые, сахарный сироп", ro: "Insecte, sirop de zahăr", en: "Insects, sugar syrup" },
    diet: "insects",
    priceOptions: formicaPriceOptions,
    availability: "inStock",
    characteristics: [
      {
        label: { ru: "Температура", ro: "Temperatura", en: "Temperature" },
        value: { ru: "23-28 C", ro: "23-28 C", en: "23-28 C" }
      },
      {
        label: { ru: "Влажность", ro: "Umiditate", en: "Humidity" },
        value: { ru: "Низкая/Средняя", ro: "Redusă/Medie", en: "Low/Medium" }
      },
      {
        label: { ru: "Сложность", ro: "Dificultate", en: "Difficulty" },
        value: { ru: "Средняя", ro: "Medie", en: "Medium" }
      },
      {
        label: { ru: "Зимовка", ro: "Hibernare", en: "Hibernation" },
        value: { ru: "Обязательна, 5-10 °C", ro: "Obligatorie, 5-10 °C", en: "Required, 5-10 °C" }
      }
    ],
    recommendedFormicariumIds: [203, 202],
    relatedBlogIds: [401, 403]
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
      ru: "Lasius neglectus, выносливый вид с несколькими матками, который образует быстрорастущие «суперколонии». Развивается при комнатной температуре, охотно берёт сахарный сироп и белковый корм, а численность растёт заметно быстрее, чем у большинства видов. Зимой достаточно короткого периода покоя. Один из самых динамичных видов, за считанные месяцы колония преображается на глазах.",
      ro: "Lasius neglectus, o specie rezistentă cu mai multe regine, care formează «supercolonii» cu creștere rapidă. Se dezvoltă la temperatura camerei, acceptă cu plăcere siropul de zahăr și hrana proteică, iar numărul crește vizibil mai repede decât la majoritatea speciilor. Iarna este suficientă o scurtă perioadă de repaus. Una dintre cele mai dinamice specii, colonia se transformă vizibil în doar câteva luni.",
      en: "Lasius neglectus, a hardy multi-queen species that forms fast-growing \"super colonies\". It develops at room temperature, happily takes sugar syrup and protein food, and its numbers grow noticeably faster than most species. In winter a short rest period is enough. One of the most dynamic species, the colony transforms before your eyes within a few months."
    },
    image: lasiusNeglectusImage,
    images: [lasiusNeglectusImage],
    queenSize: { ru: "6-7 мм", ro: "6-7 mm", en: "6-7 mm" },
    workerSize: { ru: "2-3 мм", ro: "2-3 mm", en: "2-3 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Сахарный сироп, насекомые", ro: "Sirop de zahăr, insecte", en: "Sugar syrup, insects" },
    diet: "insects",
    priceOptions: neglectusPriceOptions,
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
    recommendedFormicariumIds: [202, 203],
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
      ru: "Lasius niger, чёрный садовый муравей и классический выбор для первого формикария. Вид очень вынослив, прощает колебания температуры и влажности, поэтому идеально подходит новичкам. Матка основывает семью сама и первый месяц обходится без корма. Зимой обязательна спячка при 5-10 °C, иначе матка быстро истощается.",
      ro: "Lasius niger, furnica neagră de grădină și alegerea clasică pentru primul formicariu. Specia este foarte rezistentă, tolerează variațiile de temperatură și umiditate, fiind ideală pentru începători. Regina întemeiază familia singură și se descurcă fără hrană în prima lună. Iarna este obligatorie hibernarea la 5-10 °C, altfel regina se epuizează rapid.",
      en: "Lasius niger, the black garden ant and the classic choice for a first formicarium. The species is very hardy and forgives swings in temperature and humidity, which makes it ideal for beginners. The queen founds the colony on her own and needs no food for the first month. In winter hibernation at 5-10 °C is mandatory, otherwise the queen wears out quickly."
    },
    image: lasiusNigerImage,
    images: [lasiusNigerImage],
    queenSize: { ru: "8-9 мм", ro: "8-9 mm", en: "8-9 mm" },
    workerSize: { ru: "3-5 мм", ro: "3-5 mm", en: "3-5 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Сахарный сироп, насекомые", ro: "Sirop de zahăr, insecte", en: "Sugar syrup, insects" },
    diet: "insects",
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
    recommendedFormicariumIds: [203, 202],
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
      ru: "Camponotus fellah, гигантский муравей-древоточец из засушливых регионов и один из самых зрелищных видов. Сильно полиморфный: рядом с мелкими рабочими живут крупные майоры с массивными головами. Любит тепло и сухость, регулярно нуждается в белке и сахарном сиропе, а холодная зимовка не обязательна. Вид активный и любопытный, поэтому лучше раскрывается у кипера с небольшим опытом.",
      ro: "Camponotus fellah, furnica dulgher uriașă din regiuni aride și una dintre cele mai spectaculoase specii. Puternic polimorfă: alături de lucrătoarele mici trăiesc majori mari, cu capete masive. Iubește căldura și mediul uscat, are nevoie regulat de proteine și sirop de zahăr, iar hibernarea rece nu este obligatorie. Specie activă și curioasă, care se dezvăluie cel mai bine la un crescător cu puțină experiență.",
      en: "Camponotus fellah, a giant carpenter ant from arid regions and one of the most spectacular species. Strongly polymorphic: tiny workers live alongside large majors with massive heads. It loves warmth and a dry setup, needs regular protein and sugar syrup, and cold hibernation is not required. An active, curious species that shines best with a keeper who already has a little experience."
    },
    image: camponotusFellahImage,
    images: [camponotusFellahImage],
    queenSize: { ru: "17-20 мм", ro: "17-20 mm", en: "17-20 mm" },
    workerSize: { ru: "7-14 мм", ro: "7-14 mm", en: "7-14 mm" },
    soldierSize: { ru: "14-18 мм", ro: "14-18 mm", en: "14-18 mm" },
    colonySize: { ru: "Матка + расплод", ro: "Regină + puiet", en: "Queen + brood" },
    food: { ru: "Белок и сахарный сироп", ro: "Proteine și sirop de zahăr", en: "Protein and sugar syrup" },
    diet: "insects",
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
    recommendedFormicariumIds: [202, 203],
    relatedBlogIds: [402, 403]
  }
];

export const popularAntIds = [44, 43, 42];
