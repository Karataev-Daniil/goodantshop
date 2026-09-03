// ============================================================================
// АТЛАС ВИДОВ МОЛДОВЫ - данные для страницы /species-map.
// ----------------------------------------------------------------------------
// Как это устроено:
//   zones      - 6 крупных зон вместо 32 районов. Дробить страну мельче нет
//                смысла: находки привязаны к местности, а не к административной
//                границе, и 36 почти пустых ячеек читались бы хуже, чем шесть
//                отметок. На карте зона показана точкой с подписью, а не
//                залитой областью: точка честно говорит «примерно здесь»,
//                тогда как круг или контур притворялись бы границей ареала,
//                которой у нас нет.
//   mapSpecies - виды муравьёв Молдовы. Список ШИРЕ каталога магазина: сюда
//                идёт вся фауна, а sellSlug стоит только у тех видов, которые
//                реально продаются (ведёт на /ants/<slug>).
//
// Как вносить находки - правится только объект `records` у нужного вида:
//   "confirmed" - находили сами, есть фото/образец;
//   "reported"  - есть в литературе или в чужих сборах, сами не подтверждали;
//   "absent"    - специально искали и не нашли.
// Зоны нет в ключах = данных нет вообще. Это НЕ то же самое, что "absent":
// отрицательный результат тоже данные, и задним числом его не восстановить.
//
// Пример:
//   records: { chisinau: "confirmed", orhei: "reported", balti: "absent" }
//
// ПРАВИЛО СПИСКА: вид попадает сюда только вместе с находками. Вида без данных
// в атласе быть не должно - пустая карточка обещает информацию, которой нет.
// Добавляете вид - сразу заполняйте records.
//
// Все внесённые находки стоят как "confirmed" - это личные наблюдения. Для вида,
// известного только по литературе, ставьте "reported": в файле это одно слово.
// Задокументированных для страны видов сильно больше (в сводке Института
// зоологии - 65), список пополняется по мере собственных сборов.
// ============================================================================

// --- Зоны -------------------------------------------------------------------
// lat/lon - точка, в которую ставится отметка. Берём середину зоны, а не город:
// подпись должна читаться как «север страны», а не как адрес.
// anchor - что входит в зону; показывается подсказкой на чипсе.
export const zones = [
  {
    code: "balti",
    lat: 47.76,
    lon: 27.93,
    name: { ru: "Север", ro: "Nord", en: "North" },
    anchor: { ru: "Бельцы, Единец, Дрокия", ro: "Bălți, Edineț, Drochia", en: "Bălți, Edineț, Drochia" },
  },
  {
    // Зоны «Запад» больше нет - Унгень, Ниспорень и Кэлэрашь ушли в Центр,
    // поэтому точка сдвинута западнее, ближе к середине объединённой области.
    code: "orhei",
    lat: 47.38,
    lon: 28.45,
    name: { ru: "Центр", ro: "Centru", en: "Centre" },
    anchor: {
      ru: "Орхей, Унгень, Кэлэрашь, Резина, Теленешть",
      ro: "Orhei, Ungheni, Călărași, Rezina, Telenești",
      en: "Orhei, Ungheni, Călărași, Rezina, Telenești",
    },
  },
  {
    code: "chisinau",
    lat: 47.02,
    lon: 28.83,
    name: { ru: "Кишинёв", ro: "Chișinău", en: "Chișinău" },
    anchor: { ru: "Кишинёв и пригороды", ro: "Chișinău și suburbiile", en: "Chișinău and suburbs" },
  },
  {
    code: "tiraspol",
    lat: 46.90,
    lon: 29.55,
    name: { ru: "Приднестровье", ro: "Transnistria", en: "Transnistria" },
    anchor: { ru: "Тирасполь, Бендеры, Дубэсарь", ro: "Tiraspol, Bender, Dubăsari", en: "Tiraspol, Bender, Dubăsari" },
  },
  {
    code: "comrat",
    lat: 46.30,
    lon: 28.66,
    name: { ru: "Гагаузия", ro: "Găgăuzia", en: "Gagauzia" },
    anchor: { ru: "Комрат, Чадыр-Лунга, Тараклия", ro: "Comrat, Ceadîr-Lunga, Taraclia", en: "Comrat, Ceadîr-Lunga, Taraclia" },
  },
  {
    code: "cahul",
    lat: 45.92,
    lon: 28.19,
    name: { ru: "Юг", ro: "Sud", en: "South" },
    anchor: { ru: "Кагул, Кантемир, Леова", ro: "Cahul, Cantemir, Leova", en: "Cahul, Cantemir, Leova" },
  },
];

export const getZone = (code) => zones.find((item) => item.code === code) || null;

// Массовый вид, встреченный по всей стране. Нужен, чтобы не переписывать шесть
// одинаковых строк у каждого такого вида. Если хотя бы по одной зоне статус
// другой - у этого вида пишите records объектом целиком, а не через хелпер.
const everywhere = (status = "confirmed") =>
  Object.fromEntries(zones.map((zone) => [zone.code, status]));

// Центр и зум для общего вида страны - подобраны так, чтобы влезли и Бричень,
// и Кагул, но карта не уходила в соседние страны.
export const MAP_CENTER = [47.05, 28.6];
export const MAP_ZOOM = 7;
export const MAP_ZOOM_ZONE = 9;

// --- Статусы находки --------------------------------------------------------
export const statusLabel = {
  confirmed: { ru: "Зафиксирован",     ro: "Confirmat",       en: "Confirmed" },
  reported:  { ru: "По литературе",    ro: "Din literatură",  en: "Reported" },
  absent:    { ru: "Искали, не нашли", ro: "Căutat, negăsit", en: "Searched, not found" },
  none:      { ru: "Нет данных",       ro: "Fără date",       en: "No data" },
};

// Цвета точки на карте. Держим здесь, а не в CSS: отметку рисует Leaflet через
// divIcon, и цвет ему нужно передать значением. Оттенки взяты от --accent сайта.
// dot - заливка кружка, ring - обводка. «Нет данных» и «искали, не нашли»
// намеренно светлые и полые: они не должны спорить с реальными находками.
export const statusColor = {
  confirmed: { dot: "#bd241f", ring: "#8f1714" },
  reported:  { dot: "#eeb3af", ring: "#bd241f" },
  absent:    { dot: "#ffffff", ring: "#a99e8c" },
  none:      { dot: "#f4f0e8", ring: "#d6c9b2" },
};

// --- Виды -------------------------------------------------------------------
// Только виды с собственными находками. Порядок = порядок чипсов на карте,
// первый выбран по умолчанию.
// sellSlug должен совпадать со slug в antsData.js, иначе ссылка будет битой.
export const mapSpecies = [
  {
    slug: "messor-structor",
    latin: "Messor structor",
    sellSlug: "messor-structor",
    name: { ru: "Муравей-жнец", ro: "Furnica secerătoare", en: "Harvester ant" },
    note: {
      ru: "Степные и залежные участки, склоны с плотной почвой. Гнёзда выдают дорожки шелухи от семян.",
      ro: "Zone de stepă și terenuri necultivate, pante cu sol tare. Cuiburile se recunosc după potecile de pleavă.",
      en: "Steppe and fallow ground, slopes with firm soil. Nests are given away by trails of seed husks.",
    },
    records: everywhere(),
  },
  {
    slug: "lasius-niger",
    latin: "Lasius niger",
    sellSlug: "lasius-niger",
    name: { ru: "Чёрный садовый муравей", ro: "Furnica neagră de grădină", en: "Black garden ant" },
    note: {
      ru: "Самый обычный вид: сады, дворы, обочины, трещины в асфальте. Лёт в июле-августе после дождя.",
      ro: "Cea mai comună specie: grădini, curți, margini de drum, crăpături în asfalt. Zborul nupțial în iulie-august.",
      en: "The most common species: gardens, yards, roadsides, cracks in tarmac. Nuptial flight in July-August.",
    },
    records: everywhere(),
  },
  {
    slug: "lasius-neglectus",
    latin: "Lasius neglectus",
    sellSlug: "lasius-neglectus",
    name: { ru: "Инвазивный садовый муравей", ro: "Furnica invazivă de grădină", en: "Invasive garden ant" },
    note: {
      ru: "Инвазивный вид, расселяется с посадочным материалом. Держится в городах и парках, образует суперколонии.",
      ro: "Specie invazivă, se răspândește cu material săditor. Preferă orașele și parcurile, formează supercolonii.",
      en: "Invasive species spread with nursery stock. Sticks to towns and parks, forms supercolonies.",
    },
    records: everywhere(),
  },
  {
    slug: "formica-cunicularia",
    latin: "Formica cunicularia",
    sellSlug: "formica-cunicularia",
    name: { ru: "Полевой муравей", ro: "Furnica de câmp", en: "Field ant" },
    note: {
      ru: "Открытые сухие участки, обочины и залежи. Быстрые фуражиры, активны в жару.",
      ro: "Terenuri deschise și uscate, margini de drum și pârloage. Furajere rapide, active pe căldură.",
      en: "Open dry ground, roadsides and fallow land. Fast foragers, active in the heat.",
    },
    records: everywhere(),
  },
  {
    slug: "formica-rufibarbis",
    latin: "Formica rufibarbis",
    sellSlug: "formica-rufibarbis",
    name: { ru: "Красногрудый полевой муравей", ro: "Furnica de câmp cu torace roșu", en: "Red-barbed ant" },
    note: {
      ru: "Песчаные и щебнистые прогреваемые склоны, опушки. Похож на cunicularia, отличается опушением.",
      ro: "Pante nisipoase și pietroase însorite, liziere. Seamănă cu cunicularia, se deosebește prin pilozitate.",
      en: "Warm sandy and stony slopes, woodland edges. Similar to cunicularia, told apart by its hairs.",
    },
    records: everywhere(),
  },
  {
    slug: "formica-rufa",
    latin: "Formica rufa",
    sellSlug: null,
    name: { ru: "Рыжий лесной муравей", ro: "Furnica roșie de pădure", en: "Red wood ant" },
    note: {
      ru: "Строит высокие купола из хвои и веточек в лесу. Вид охраняется, гнёзда разорять нельзя.",
      ro: "Construiește mușuroaie înalte din ace și crenguțe în pădure. Specie protejată, cuiburile nu se distrug.",
      en: "Builds tall mounds of needles and twigs in woodland. A protected species - nests must not be disturbed.",
    },
    records: { tiraspol: "confirmed" },
  },
  {
    slug: "polyergus-rufescens",
    latin: "Polyergus rufescens",
    sellSlug: null,
    name: { ru: "Муравей-амазонка", ro: "Furnica amazoană", en: "Amazon ant" },
    note: {
      ru: "Рабочих у амазонок нет вовсе: саблевидными челюстями они только воюют, а всю работу в гнезде делают уведённые в набегах Formica. Редкая и заметная находка.",
      ro: "Amazoanele nu au lucrătoare proprii: cu mandibulele în formă de sabie doar luptă, iar toată munca din cuib o fac furnicile Formica răpite în raiduri. O găsire rară și spectaculoasă.",
      en: "Amazon ants have no working caste at all: their sabre-shaped jaws only fight, and all nest work is done by Formica captured in raids. A rare and striking find.",
    },
    records: { balti: "confirmed" },
  },
  {
    slug: "tetramorium-caespitum",
    latin: "Tetramorium caespitum",
    sellSlug: null,
    name: { ru: "Дерновый муравей", ro: "Furnica de gazon", en: "Pavement ant" },
    note: {
      ru: "Дворы, тротуары, газоны. Мелкий и очень массовый вид, часто воюет с соседними колониями.",
      ro: "Curți, trotuare, gazon. Specie măruntă și foarte numeroasă, se bate des cu coloniile vecine.",
      en: "Yards, pavements, lawns. Small and abundant, often at war with neighbouring colonies.",
    },
    records: everywhere(),
  },
  {
    slug: "camponotus-fellah",
    latin: "Camponotus fellah",
    sellSlug: "camponotus-fellah",
    name: { ru: "Муравей-древоточец Феллах", ro: "Furnica tâmplară Fellah", en: "Fellah carpenter ant" },
    // Определение требует проверки: природный ареал вида - Ближний Восток и
    // Северная Африка, в европейских базах находок нет. Похожие крупные
    // древоточцы Молдовы - C. aethiops, C. vagus, C. fallax.
    note: {
      ru: "Крупный древоточец. Природный ареал вида - Ближний Восток и Северная Африка; наши отметки требуют проверки по образцу.",
      ro: "Furnică tâmplară mare. Arealul natural al speciei este Orientul Apropiat și Africa de Nord; observațiile noastre necesită verificare pe exemplar.",
      en: "A large carpenter ant. The species' natural range is the Near East and North Africa; our records still need verification against a specimen.",
    },
    records: { tiraspol: "confirmed", chisinau: "confirmed" },
  },
  {
    slug: "camponotus-vagus",
    latin: "Camponotus vagus",
    sellSlug: null,
    name: { ru: "Чёрный муравей-древоточец", ro: "Furnica tâmplară neagră", en: "Black carpenter ant" },
    note: {
      ru: "Крупный чёрный древоточец. Гнездится в сухих пнях и мёртвой древесине на прогретых опушках.",
      ro: "Furnică tâmplară mare și neagră. Cuibărește în cioate uscate și lemn mort pe liziere însorite.",
      en: "Large black carpenter ant. Nests in dry stumps and deadwood along warm forest edges.",
    },
    records: { tiraspol: "confirmed" },
  },
];

export const getSpecies = (slug) => mapSpecies.find((item) => item.slug === slug) || null;

// --- Производные ------------------------------------------------------------

// Зоны с находкой вида (confirmed + reported), в порядке `zones`.
export const zonesWithSpecies = (species) =>
  zones.filter((zone) => {
    const status = species?.records?.[zone.code];
    return status === "confirmed" || status === "reported";
  });

// Сколько видов отмечено в зоне - для режима «все виды».
export const speciesCountInZone = (code) =>
  mapSpecies.filter((species) => {
    const status = species.records?.[code];
    return status === "confirmed" || status === "reported";
  }).length;

export const totalRecordedZones = () =>
  zones.filter((zone) => speciesCountInZone(zone.code) > 0).length;
