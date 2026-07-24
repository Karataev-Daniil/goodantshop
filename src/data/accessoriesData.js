// ============================================================================
// ДОПОЛНИТЕЛЬНЫЕ ТОВАРЫ (аксессуары и корм)
// ----------------------------------------------------------------------------
// Три позиции: набор инструментов, зерновая смесь (для жнецов) и живой корм
// (для остальных видов). Схема совместима с ants/formicariums - те же поля
// id / slug / title / excerpt / description / images / priceOptions /
// availability, чтобы корзина и карточки работали без отдельных веток.
//
// Особенности:
//   giftWithBundle - позиция идёт в подарок при покупке комплекта
//                    «колония + формикарий» (цена показывается зачёркнутой);
//   kind: "food"   - корм, подбирается под вид муравья по полю forDiet;
//   forDiet        - совпадает с полем `diet` у вида в antsData.js.
// ============================================================================

import toolKitFlatlay from "../assets/images/accessories/tool-kit-flatlay.webp";
import toolKitContents from "../assets/images/accessories/tool-kit-contents.webp";
import feederBeetleCulture from "../assets/images/accessories/feeder-beetle-culture.webp";
// Временная иллюстрация - реального фото корма пока нет. Когда появится,
// положите рядом seed-mix.webp и поменяйте только эту строку.
import seedMix from "../assets/images/accessories/seed-mix.svg";

export const accessories = [
  // ==========================================================================
  // НАБОР ИНСТРУМЕНТОВ - 150 лей, в подарок при покупке комплекта.
  // ==========================================================================
  {
    id: 301,
    slug: "tool-kit",
    kind: "tools",
    giftWithBundle: true,
    title: {
      ru: "Набор инструментов для формикария",
      ro: "Set de instrumente pentru formicariu",
      en: "Formicarium tool kit",
    },
    excerpt: {
      ru: "Десять мелочей, без которых уход за колонией превращается в мучение.",
      ro: "Zece mărunțișuri fără de care îngrijirea coloniei devine un chin.",
      en: "Ten small things that turn colony care from a struggle into a routine.",
    },
    description: {
      ru: "Это то, чем пользуешься каждую неделю. Пинцетом достают остатки корма, пипеткой и шприцем подают воду и сироп, крючок помогает поправить что-то внутри, не разбирая гнездо. Ватные шарики закрывают вход и держат влажность, а мягкая кисточка сметает муравьёв с крышки, не придавив их. По отдельности это копеечные мелочи, которые потом ищешь по всему дому. Здесь они уже собраны в одной коробке.",
      ro: "Sunt lucrurile pe care le folosești în fiecare săptămână. Cu penseta scoți resturile de hrană, cu pipeta și seringa dai apă și sirop, iar cârligul te ajută să aranjezi ceva înăuntru fără să desfaci cuibul. Bilele de vată închid intrarea și mențin umiditatea, iar pensula moale mătură furnicile de pe capac fără să le strivească. Separat sunt fleacuri de câțiva lei, pe care apoi le cauți prin toată casa - aici sunt strânse într-o singură cutie.",
      en: "These are the things you reach for every week. Tweezers pull out leftover food, the pipette and syringe deliver water and syrup, and the hook lets you adjust something inside without taking the nest apart. Cotton balls plug the entrance and hold humidity, while the soft brush sweeps ants off the lid without crushing them. Separately these are pennies' worth of odds and ends you then hunt for around the house - here they come in one box.",
    },
    // Короткая выгода - показывается под названием в поп-апе подарков.
    benefit: {
      ru: "Без него ухаживать за колонией тяжело",
      ro: "Fără el, îngrijirea coloniei devine un chin",
      en: "Without it, caring for the colony is a pain",
    },
    image: toolKitFlatlay,
    images: [toolKitFlatlay, toolKitContents],
    includes: [
      { ru: "Пинцет с тонкими кончиками", ro: "Pensetă cu vârfuri fine", en: "Fine-tipped tweezers" },
      { ru: "Пипетка для воды и сиропа", ro: "Pipetă pentru apă și sirop", en: "Pipette for water and syrup" },
      { ru: "Шприц 5 мл с делениями", ro: "Seringă de 5 ml cu gradații", en: "Graduated 5 ml syringe" },
      { ru: "Силиконовая трубка для соединения", ro: "Tub de silicon pentru conectare", en: "Silicone connecting tube" },
      { ru: "Металлический крючок-зонд", ro: "Cârlig-sondă metalic", en: "Metal hook probe" },
      { ru: "Мягкая кисточка", ro: "Pensulă moale", en: "Soft brush" },
      { ru: "Ватные палочки и шарики", ro: "Bețișoare și bile de vată", en: "Cotton swabs and balls" },
      { ru: "Две кормушки-блюдца", ro: "Două farfurioare de hrănire", en: "Two feeding dishes" },
      { ru: "Поилка", ro: "Adăpătoare", en: "Water feeder" },
    ],
    usage: {
      ru: "Инструменты моют тёплой водой без моющих средств, потому что муравьи чувствительны к запахам химии. Кисточку и пинцет держите отдельно от кухонных.",
      ro: "Instrumentele se spală cu apă caldă, fără detergent, pentru că furnicile sunt sensibile la mirosul de chimicale. Ține pensula și penseta separat de cele de bucătărie.",
      en: "Wash the tools in warm water without detergent, because ants are sensitive to chemical smells. Keep the brush and tweezers separate from kitchen ones.",
    },
    priceOptions: [
      {
        label: { ru: "Набор целиком", ro: "Setul complet", en: "Complete kit" },
        value: "150 лей",
        selected: true,
      },
    ],
    availability: "inStock",
    relatedBlogIds: [401],
  },

  // ==========================================================================
  // ЗЕРНОВАЯ СМЕСЬ - корм для жнецов (Messor). 80 лей за контейнер с 15 г зерна.
  // ==========================================================================
  {
    id: 302,
    slug: "seed-mix",
    kind: "food",
    forDiet: "seeds",
    giftWithBundle: true,
    title: {
      ru: "Зерновая смесь для жнецов",
      ro: "Amestec de semințe pentru furnici secerătoare",
      en: "Seed mix for harvester ants",
    },
    excerpt: {
      ru: "Смесь мелких семян, из которых жнецы пекут «муравьиный хлеб». Одного контейнера хватает колонии Messor на 4-5 лет.",
      ro: "Un amestec de semințe mici din care secerătoarele fac «pâinea furnicilor». Un recipient îi ajunge unei colonii de Messor 4-5 ani.",
      en: "A mix of small seeds the harvesters turn into «ant bread». One container lasts a Messor colony 4-5 years.",
    },
    description: {
      ru: "Жнецы не охотятся. Они собирают семена, дробят их челюстями и превращают в питательную массу для личинок. Смесь подобрана из мелких зёрен, которые колония берёт охотно и может грызть даже небольшими рабочими. Идёт в удобном контейнере с 15 граммами зерна. Колонии Messor такого запаса хватает на 4-5 лет, ведь едят они граммы в месяц, а сухие семена не портятся. Отсыпать можно ровно столько, сколько нужно, не открывая весь запас.",
      ro: "Secerătoarele nu vânează. Adună semințe, le sparg cu mandibulele și le transformă într-o masă hrănitoare pentru larve. Amestecul e ales din boabe mici, pe care colonia le ia cu plăcere și le poate roade chiar și cu lucrătoare mărunte. Vine într-un recipient comod cu 15 grame de boabe. Unei colonii de Messor rezerva îi ajunge 4-5 ani, fiindcă mănâncă grame pe lună, iar semințele uscate nu se strică. Poți doza exact cât trebuie, fără să deschizi toată rezerva.",
      en: "Harvesters don't hunt. They gather seeds, crush them with their jaws and turn them into a nutritious paste for the larvae. The mix uses small grains the colony takes readily and even little workers can gnaw. It comes in a handy container with 15 grams of grain. That stock lasts a Messor colony 4-5 years, since they eat grams per month and dry seeds don't spoil. You can dispense exactly what you need without opening the whole stash.",
    },
    benefit: {
      ru: "Одного контейнера хватит колонии на 4-5 лет",
      ro: "Un recipient îi ajunge coloniei 4-5 ani",
      en: "One container lasts the colony 4-5 years",
    },
    image: seedMix,
    images: [seedMix],
    includes: [
      { ru: "Контейнер с 15 г зерновой смеси", ro: "Recipient cu 15 g de amestec de semințe", en: "Container with 15 g of seed mix" },
      { ru: "Колонии Messor хватает на 4-5 лет", ro: "Îi ajunge unei colonii de Messor 4-5 ani", en: "Lasts a Messor colony 4-5 years" },
    ],
    usage: {
      ru: "Держите контейнер закрытым, а арену сухой, ведь от сырости семена плесневеют. Отсыпайте небольшими порциями, колония сама утащит запас в гнездо.",
      ro: "Ține recipientul închis, iar arena uscată, fiindcă la umezeală semințele mucegăiesc. Dozează porții mici, colonia își duce singură rezerva în cuib.",
      en: "Keep the container closed and the arena dry, because damp makes seeds mould. Dispense small portions, the colony will carry its own stash into the nest.",
    },
    priceOptions: [
      {
        label: { ru: "Контейнер, 15 г", ro: "Recipient, 15 g", en: "Container, 15 g" },
        value: "80 лей",
        selected: true,
      },
    ],
    availability: "inStock",
    relatedBlogIds: [401],
  },

  // ==========================================================================
  // ЖУК-ЗНАХАРЬ - живой белковый корм. 100 лей за стартовую культуру.
  // ==========================================================================
  {
    id: 303,
    slug: "feeder-beetle",
    kind: "food",
    forDiet: "insects",
    giftWithBundle: true,
    title: {
      ru: "Жук-знахарь (живой корм)",
      ro: "Gândac hrană vie",
      en: "Feeder beetle culture",
    },
    excerpt: {
      ru: "Культура живого корма, которая разводится сама. Покупаете один раз.",
      ro: "O cultură de hrană vie care se înmulțește singură. O cumperi o singură dată.",
      en: "A live-food culture that breeds itself. You buy it once.",
    },
    description: {
      ru: "Почти всем видам, кроме жнецов, нужен животный белок. Без него личинки растут медленно, а матка хуже несётся. Удобнее всего держать собственную культуру жуков. Вы получаете контейнер со взрослыми жуками, личинками и субстратом. Личинок даёте муравьям, а культура тем временем восполняет себя сама, ведь жуки продолжают откладывать яйца. Ухода почти нет. Раз в неделю подсыпьте отрубей и положите кусочек моркови или яблока для влаги.",
      ro: "Aproape toate speciile, în afară de secerătoare, au nevoie de proteină animală. Fără ea larvele cresc încet, iar regina depune mai puțin. Cel mai comod e să ții propria cultură de gândaci. Primești un recipient cu adulți, larve și substrat. Larvele le dai furnicilor, iar cultura se reface singură între timp, fiindcă gândacii continuă să depună ouă. Îngrijire aproape că nu are. O dată pe săptămână presară tărâțe și pune o bucată de morcov sau de măr pentru umiditate.",
      en: "Almost every species except harvesters needs animal protein. Without it larvae grow slowly and the queen lays less. The most convenient way is to keep your own beetle culture. You get a container with adults, larvae and substrate. You feed the larvae to the ants while the culture replenishes itself, because the beetles keep laying eggs. Care is minimal. Once a week add bran and drop in a piece of carrot or apple for moisture.",
    },
    benefit: {
      ru: "Разводится сама, покупать больше не нужно",
      ro: "Se înmulțește singură, nu mai cumperi",
      en: "Breeds itself, no need to rebuy",
    },
    image: feederBeetleCulture,
    images: [feederBeetleCulture],
    includes: [
      { ru: "Стартовая культура из 25-30 взрослых жуков", ro: "Cultură de start din 25-30 de gândaci adulți", en: "Starter culture of 25-30 adult beetles" },
      { ru: "Личинки разного возраста", ro: "Larve de vârste diferite", en: "Larvae of different ages" },
      { ru: "Субстрат для разведения", ro: "Substrat pentru înmulțire", en: "Breeding substrate" },
      { ru: "Памятка по уходу за культурой", ro: "Instrucțiune de îngrijire a culturii", en: "Culture care sheet" },
    ],
    usage: {
      ru: "Держите контейнер в тепле и темноте, подальше от прямого солнца. Личинок давайте по размеру колонии, маленькой хватает одной-двух в неделю.",
      ro: "Ține recipientul la căldură și întuneric, ferit de soare direct. Dă larve pe măsura coloniei, uneia mici îi ajung una-două pe săptămână.",
      en: "Keep the container warm and dark, away from direct sun. Feed larvae sized to your colony, a small one needs just one or two a week.",
    },
    priceOptions: [
      {
        label: { ru: "Стартовая культура", ro: "Cultură de start", en: "Starter culture" },
        value: "150 лей",
        selected: true,
      },
    ],
    availability: "inStock",
    relatedBlogIds: [401],
  },
];

export const getAccessory = (slug) =>
  accessories.find((item) => item.slug === slug) || null;

export const getAccessoryById = (id) =>
  accessories.find((item) => String(item.id) === String(id)) || null;

// Набор инструментов - он же подарок к комплекту.
export const TOOL_KIT_ID = 301;
export const toolKit = () => getAccessoryById(TOOL_KIT_ID);

// Основной корм вида - он же уходит подарком к комплекту (подарок один).
// `diet` проставлен у каждого вида в antsData.js.
export const foodForAnt = (ant) =>
  accessories.find((item) => item.kind === "food" && item.forDiet === (ant?.diet || "insects")) || null;

// Всё, чем можно кормить этот вид. Жнецам, кроме семян, полезен и живой белок:
// на нём быстрее растёт расплод, поэтому им показываем оба корма. Насекомоядным
// видам семена не нужны - у них только живой корм.
const FOOD_SLUGS_BY_DIET = {
  seeds: ["seed-mix", "feeder-beetle"],
  insects: ["feeder-beetle"],
};

export const foodsForAnt = (ant) =>
  (FOOD_SLUGS_BY_DIET[ant?.diet] || FOOD_SLUGS_BY_DIET.insects)
    .map((slug) => getAccessory(slug))
    .filter(Boolean);
