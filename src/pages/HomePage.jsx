import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import ProductCard from "../components/ProductCard";
import SEO, { breadcrumbSchema, faqSchema, pageSeo } from "../components/SEO";
import Stars from "../components/Stars";
import { featuredReviews, reviewStatsAll, SELLER_999_URL } from "../data/reviewsData";
import messorForagingSeeds from "../assets/images/ants/messor-foraging-seeds.webp";
import messorSeedStore from "../assets/images/ants/messor-seed-store.webp";
import messorStructor from "../assets/images/ants/messor-structor.webp";
import messorWorkersCloseup from "../assets/images/ants/messor-workers-closeup.webp";
import messorQueenWithBrood from "../assets/images/ants/messor-queen-with-brood.webp";

export default function HomePage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();
  const starterAnt = ants[0];
  const starterFormicarium = formicariums[0];
  const homeReviewStats = reviewStatsAll();
  const homeReviews = featuredReviews();

  const [galleryIndex, setGalleryIndex] = useState(0);

  const addStarterKit = () => {
    addToCart(starterAnt.id);
    addToCart(starterFormicarium.id);
  };

  const starterKit = {
    id: "starter-kit",
    title: { ru: "Стартовый набор", ro: "Set de start", en: "Starter kit" },
    excerpt: {
      ru: "Формикарий Terra и колония Messor Structor: всё для запуска.",
      ro: "Formicariu Terra și colonie Messor Structor: tot ce trebuie pentru start.",
      en: "Terra formicarium and a Messor Structor colony: everything to get started.",
    },
    images: ["/formicarium-colony.webp"],
    availability: "inStock",
    priceOptions: [
      {
        label: { ru: "Формикарий + колония", ro: "Formicariu + colonie", en: "Formicarium + colony" },
        value: "1750 лей",
      },
    ],
  };

  const popularItems = [
    {
      item: starterAnt,
      linkTo: `/${lang}/ants/${starterAnt.slug}`,
      onAddToCart: addToCart,
    },
    {
      item: starterFormicarium,
      linkTo: `/${lang}/formic/${starterFormicarium.slug}`,
      onAddToCart: addToCart,
    },
    {
      item: starterKit,
      linkTo: `/${lang}/formic/${starterFormicarium.slug}`,
      onAddToCart: addStarterKit,
    },
  ];

  const gallerySlides = [
    { image: messorStructor, label: t({ ru: "Муравьи заботятся о потомстве", ro: "Furnicile îngrijesc puietul", en: "Ants care for their brood" }) },
    { image: messorSeedStore, label: t({ ru: "Колония хранит запасы зерна", ro: "Colonia păstrează rezerve de grâne", en: "The colony stores grain reserves" }) },
    { image: messorForagingSeeds, label: t({ ru: "Охота и добыча пищи", ro: "Vânătoare și procurarea hranei", en: "Hunting and foraging for food" }) },
    { image: messorQueenWithBrood, label: t({ ru: "Личинки будущих рабочих", ro: "Larvele viitoarelor lucrătoare", en: "Larvae of future workers" }) },
    { image: messorWorkersCloseup, label: t({ ru: "Развитая социальная система", ro: "Un sistem social dezvoltat", en: "A developed social system" }) },
    { image: "/formicarium-colony.webp", label: t({ ru: "Формикарий дома", ro: "Formicariu acasă", en: "Formicarium at home" }) },
  ];
  const galleryCount = gallerySlides.length;
  const currentSlide = gallerySlides[galleryIndex];
  const showPrevSlide = () => setGalleryIndex((i) => (i - 1 + galleryCount) % galleryCount);
  const showNextSlide = () => setGalleryIndex((i) => (i + 1) % galleryCount);
  const homeFaq = [
    {
      q: { ru: "Безопасна ли муравьиная ферма дома?", ro: "Este sigură o fermă de furnici acasă?", en: "Is a home ant farm safe?" },
      a: {
        ru: "Да. Муравьи остаются внутри закрытого формикария, а комплекты перед отправкой проверяются.",
        ro: "Da. Furnicile rămân în formicariul închis, iar seturile sunt verificate înainte de livrare.",
        en: "Yes. Ants stay inside the closed formicarium, and kits are checked before delivery.",
      },
    },
    {
      q: { ru: "Подходит ли ферма новичкам?", ro: "Este potrivită pentru începători?", en: "Is it suitable for beginners?" },
      a: {
        ru: "Да. Стартовые наборы рассчитаны на спокойный запуск первой колонии и сопровождаются консультацией.",
        ro: "Da. Seturile de start sunt gândite pentru prima colonie și includ suport.",
        en: "Yes. Starter kits are made for a calm first colony launch and include support.",
      },
    },
    {
      q: { ru: "Есть ли доставка по Молдове?", ro: "Există livrare în Moldova?", en: "Do you deliver across Moldova?" },
      a: {
        ru: "Да. GoodAntShop доставляет формикарии и колонии муравьёв по всей Молдове в безопасной упаковке.",
        ro: "Da. GoodAntShop livrează formicarii și colonii de furnici în toată Moldova, în ambalaj sigur.",
        en: "Yes. GoodAntShop delivers formicariums and ant colonies across Moldova in safe packaging.",
      },
    },
  ];

  return (
    <>
      <SEO
        lang={lang}
        path="/"
        title={pageSeo.home.title}
        description={pageSeo.home.description}
        jsonLd={[
          breadcrumbSchema(lang, [{ name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" }]),
          faqSchema(lang, homeFaq),
        ]}
      />
      <section className="store-hero">
        <div className="store-hero__content">
          <p className="kicker">{t({ ru: "Магазин муравьёв и формикариев", ro: "Magazin de furnici și formicarii", en: "Ant & formicarium shop" })}</p>
          <h1 className="store-hero__title">
            {t({
              ru: <>Живые муравьи и формикарии<br />для вашего дома</>,
              ro: <>Furnici vii și formicarii<br />pentru casa ta</>,
              en: <>Live ants and formicariums<br />for your home</>,
            })}
          </h1>
          <p className="store-hero__lead">
            {t({ ru: "Колонии с маткой, формикарии и всё для старта муравьиной фермы. Наблюдайте за настоящим подземным городом прямо у себя дома — с доставкой по всей Молдове.", ro: "Colonii cu regină, formicarii și tot ce trebuie pentru a porni o fermă de furnici. Urmărește un oraș subteran adevărat chiar la tine acasă — cu livrare în toată Moldova.", en: "Queen-right colonies, formicariums and everything to start an ant farm. Watch a real underground city right at home — with delivery across Moldova." })}
          </p>
          <ul className="hero-benefits">
            {[
              t({ ru: "Для новичков", ro: "Pentru începători", en: "For beginners" }),
              t({ ru: "Не шумит", ro: "Fără zgomot", en: "No noise" }),
              t({ ru: "Не пахнет", ro: "Fără miros", en: "No smell" }),
              t({ ru: "Прост в уходе", ro: "Ușor de îngrijit", en: "Easy to care for" }),
              t({ ru: "Доставка по всей Молдове", ro: "Livrare în toată Moldova", en: "Delivery across Moldova" }),
            ].map((benefit) => (
              <li key={benefit}>{benefit}</li>
            ))}
          </ul>
          <div className="actions store-hero__actions">
            <a className="btn btn-primary" href="#popular-products">
              {t({ ru: "Выбрать стартовый набор", ro: "Alege kitul de start", en: "Choose starter kit" })}
            </a>
          </div>
        </div>
        <div className="store-hero__media">
          <img
            className="store-hero__image"
            src="/formicarium-colony.webp"
            alt={t({ ru: "Формикарий с живой колонией муравьёв и маткой", ro: "Formicariu cu colonie vie de furnici și regină", en: "Formicarium with a live ant colony and queen" })}
            loading="eager"
            fetchpriority="high"
          />
        </div>
      </section>

      <section className="hero-trust">
        <ul className="hero-trust__strip">
          {[
            t({ ru: "5+ лет опыта", ro: "Peste 5 ani de experiență", en: "5+ years of experience" }),
            t({ ru: "500+ отправленных колоний", ro: "Peste 500 de colonii trimise", en: "500+ colonies shipped" }),
            t({ ru: "Поддержка после покупки", ro: "Suport după achiziție", en: "Support after purchase" }),
            t({ ru: "Консультация каждому клиенту", ro: "Consultanță pentru fiecare client", en: "Consultation for every customer" }),
          ].map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section what-is-explained">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Что такое муравьиная ферма", ro: "Ce este o fermă de furnici", en: "What is an ant farm" })}</p>
          <h2>
            {t({ ru: "Живой мини-мир", ro: "O mini-lume vie", en: "A living mini-world" })}
            <br />
            {t({ ru: "за стеклом", ro: "în spatele sticlei", en: "behind glass" })}
          </h2>
        </div>
        <div className="what-is__inner">
          <div className="what-is__image">
            <img
              src={messorForagingSeeds}
              alt={t({ ru: "Рабочие Messor Structor у входа в гнездо несут семена", ro: "Lucrătoare Messor Structor la intrarea în cuib cărând semințe", en: "Messor Structor workers carrying seeds at the nest entrance" })}
              loading="lazy"
            />
          </div>
          <div className="what-is__text">
            <ul>
              <li>{t({ ru: "Муравьи строят тоннели", ro: "Furnicile construiesc tunele", en: "Ants build tunnels" })}</li>
              <li>{t({ ru: "Заботятся о потомстве", ro: "Îngrijesc puietul", en: "They care for young" })}</li>
              <li>{t({ ru: "Собирают пищу", ro: "Adună hrană", en: "They collect food" })}</li>
              <li>{t({ ru: "Развивают колонию", ro: "Dezvoltă colonia", en: "They grow the colony" })}</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section why-hobby">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Почему люди выбирают это хобби", ro: "De ce oamenii aleg acest hobby", en: "Why people choose this hobby" })}</p>
          <h2>
            {t({ ru: "Причины начать", ro: "Motivele pentru a începe", en: "Reasons to start" })}
            <br />
            {t({ ru: "наблюдать живую колонию", ro: "să urmărești o colonie vie", en: "watching a living colony" })}
          </h2>
        </div>
        <div className="content-grid">
          {[
            { title: t({ ru: "Снимает стресс", ro: "Reduce stresul", en: "Reduces stress" }) },
            { title: t({ ru: "Развивает интерес к природе", ro: "Dezvoltă interesul pentru natură", en: "Develops interest in nature" }) },
            { title: t({ ru: "Подходит детям и взрослым", ro: "Potrivit copiilor și adulților", en: "Suitable for kids and adults" }) },
            { title: t({ ru: "Не требует много времени", ro: "Nu cere mult timp", en: "Requires little time" }) },
            { title: t({ ru: "Занимает мало места", ro: "Ocupa puțin spațiu", en: "Takes little space" }) },
            { title: t({ ru: "Можно наблюдать годами", ro: "Poți urmări ani de zile", en: "Can watch for years" }) },
          ].map((item) => (
            <div key={item.title}>
              <h3>{item.title}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="section gallery-section">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Галерея жизни колонии", ro: "Galeria vieții coloniei", en: "Colony life gallery" })}</p>
          <h2>{t({ ru: "Наблюдайте за настоящим подземным городом", ro: "Urmărește un oraș subteran adevărat", en: "Watch a real underground city" })}</h2>
        </div>
        <div className="gallery-showcase">
          <div className="gallery-showcase__media">
            <img src={currentSlide.image} alt={currentSlide.label} loading="lazy" />
            <button
              type="button"
              className="gallery-nav gallery-nav--prev"
              onClick={showPrevSlide}
              aria-label={t({ ru: "Предыдущее фото", ro: "Foto anterioară", en: "Previous photo" })}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 5 8 12l7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button
              type="button"
              className="gallery-nav gallery-nav--next"
              onClick={showNextSlide}
              aria-label={t({ ru: "Следующее фото", ro: "Foto următoare", en: "Next photo" })}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          <div className="gallery-showcase__text">
            <p className="gallery-showcase__lead">
              {t({
                ru: "Каждый кадр показывает момент из жизни живой колонии: от заботы о расплоде до строительства тоннелей. Листайте, чтобы рассмотреть детали.",
                ro: "Fiecare cadru este un moment din viața unei colonii vii: de la îngrijirea puietului până la construirea tunelelor. Răsfoiește pentru a vedea detaliile.",
                en: "Every frame is a moment from a living colony's life: from brood care to tunnel building. Browse through to see the details.",
              })}
            </p>
            <p className="gallery-showcase__caption">{currentSlide.label}</p>
          </div>
        </div>
      </section>

      <section className="section popular-products" id="popular-products">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Популярные товары", ro: "Produse populare", en: "Popular products" })}</p>
          <h2>{t({ ru: "Самые популярные товары", ro: "Cele mai populare produse", en: "Most popular products" })}</h2>
        </div>
        <div className="grid popular-grid">
          {popularItems.map(({ item, linkTo, onAddToCart }) => (
            <ProductCard key={item.id} item={item} linkTo={linkTo} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      <section className="section seo-prose">
        <div className="seo-prose__inner">
          <h2>{t({
            ru: "Купить живых муравьёв и формикарии в Молдове",
            ro: "Cumpără furnici vii și formicarii în Moldova",
            en: "Buy live ants and formicariums in Moldova",
          })}</h2>

          <p>{t({
            ru: "GoodAntShop — специализированный магазин для мирмекипинга: у нас можно купить живых муравьёв, колонии с маткой, формикарии и товары для содержания муравьёв дома. Мы сами разводим и проверяем колонии перед отправкой, поэтому подскажем, какой вид и формикарий подойдут под ваш опыт, бюджет и условия в квартире. Домашняя муравьиная ферма — спокойное и наглядное хобби: за колонией интересно наблюдать и детям, и взрослым, она не шумит и почти не занимает места.",
            ro: "GoodAntShop este un magazin specializat pentru mirmecologie: aici poți cumpăra furnici vii, colonii cu regină, formicarii și produse pentru creșterea furnicilor acasă. Creștem și verificăm coloniile înainte de expediere, așa că te ajutăm să alegi specia și formicariul potrivite experienței, bugetului și condițiilor din locuință. O fermă de furnici acasă este un hobby liniștit și captivant: colonia e interesantă atât pentru copii, cât și pentru adulți, nu face zgomot și ocupă foarte puțin loc.",
            en: "GoodAntShop is a specialized ant-keeping shop: here you can buy live ants, queen-right colonies, formicariums and supplies for keeping ants at home. We raise and check the colonies before shipping, so we help you pick the species and formicarium that match your experience, budget and home conditions. A home ant farm is a calm, visual hobby: the colony is fascinating for both kids and adults, it makes no noise and takes up very little space.",
          })}</p>

          <h3>{t({
            ru: "Каких муравьёв можно купить",
            ro: "Ce furnici poți cumpăra",
            en: "Which ants you can buy",
          })}</h3>
          <p>
            {t({
              ru: "В каталоге есть спокойные зерноядные Messor Structor — лучший выбор для первой колонии, выносливые Lasius Niger, быстрорастущие Lasius Neglectus и крупные эффектные Camponotus Fellah. Если вы только выбираете первых питомцев и хотите купить муравьёв в Кишинёве или с доставкой по Молдове, начните с Messor Structor. Все виды, цены и наличие — в ",
              ro: "În catalog găsești blândele granivore Messor Structor — cea mai bună alegere pentru prima colonie, rezistentele Lasius Niger, rapidele Lasius Neglectus și impunătoarele Camponotus Fellah. Dacă abia îți alegi primele furnici și vrei să cumperi furnici în Chișinău sau cu livrare în Moldova, începe cu Messor Structor. Toate speciile, prețurile și disponibilitatea — în ",
              en: "The catalog has the calm seed-eating Messor Structor — the best choice for a first colony, the hardy Lasius Niger, fast-growing Lasius Neglectus and large, striking Camponotus Fellah. If you're choosing your first ants and want to buy ants in Chișinău or with delivery across Moldova, start with Messor Structor. All species, prices and availability are in the ",
            })}
            <Link to={`/${lang}/ants`}>{t({ ru: "каталоге муравьёв", ro: "catalogul de furnici", en: "ants catalog" })}</Link>.
          </p>

          <h3>{t({
            ru: "Что такое колония и как выбрать первых муравьёв",
            ro: "Ce este o colonie și cum alegi primele furnici",
            en: "What a colony is and how to choose your first ants",
          })}</h3>
          <p>
            {t({
              ru: "Колония — это матка с расплодом, из которого постепенно вырастают рабочие. Новичкам мы советуем начинать с неприхотливого вида и компактного формикария, чтобы уход был простым и понятным. Подобрать дом для будущей семьи можно в ",
              ro: "O colonie înseamnă o regină cu puiet, din care cresc treptat lucrătoarele. Începătorilor le recomandăm o specie nepretențioasă și un formicariu compact, pentru o îngrijire simplă și clară. Poți alege o casă pentru viitoarea familie în ",
              en: "A colony is a queen with brood that gradually grows into workers. For beginners we recommend an easy species and a compact formicarium so care stays simple and clear. You can choose a home for the future family in the ",
            })}
            <Link to={`/${lang}/formicariums`}>{t({ ru: "каталоге формикариев", ro: "catalogul de formicarii", en: "formicariums catalog" })}</Link>.
          </p>

          <h3>{t({
            ru: "Доставка, гарантия и поддержка",
            ro: "Livrare, garanție și suport",
            en: "Delivery, guarantee and support",
          })}</h3>
          <p>
            {t({
              ru: "Колонии упаковываются в утеплённую защиту и безопасно доезжают по Кишинёву и всей Молдове. После покупки мы остаёмся на связи и помогаем запустить муравейник. Остались вопросы по заказу и доставке — напишите нам на странице ",
              ro: "Coloniile sunt ambalate termic și ajung în siguranță în Chișinău și în toată Moldova. După achiziție rămânem în legătură și te ajutăm să pornești colonia. Ai întrebări despre comandă sau livrare — scrie-ne pe pagina de ",
              en: "Colonies are packed with insulated protection and arrive safely across Chișinău and all of Moldova. After purchase we stay in touch and help you start the colony. Questions about an order or delivery — write to us on the ",
            })}
            <Link to={`/${lang}/contacts`}>{t({ ru: "контактов", ro: "contacte", en: "contacts page" })}</Link>.
          </p>

          <p className="seo-prose__links">
            <Link to={`/${lang}/ants`}>{t({ ru: "Купить муравьёв", ro: "Cumpără furnici", en: "Buy ants" })}</Link>
            <Link to={`/${lang}/formicariums`}>{t({ ru: "Формикарии", ro: "Formicarii", en: "Formicariums" })}</Link>
            <a href="#popular-products">{t({ ru: "Популярные товары", ro: "Produse populare", en: "Popular products" })}</a>
            <a href="#faq">{t({ ru: "Частые вопросы", ro: "Întrebări frecvente", en: "FAQ" })}</a>
          </p>
        </div>
      </section>

      <section className="section home-reviews">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Отзывы", ro: "Recenzii", en: "Reviews" })}</p>
          <h2>{t({ ru: "Что говорят покупатели", ro: "Ce spun clienții", en: "What customers say" })}</h2>
        </div>

        <div className="home-reviews__summary">
          <div className="home-reviews__rating">
            <span className="home-reviews__score">{homeReviewStats.ratingValue.toFixed(1)}</span>
            <Stars value={homeReviewStats.ratingValue} />
          </div>
          <a
            className="home-reviews__count"
            href={SELLER_999_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {homeReviewStats.reviewCount}{" "}
            {t({ ru: "отзывов на 999.md", ro: "recenzii pe 999.md", en: "reviews on 999.md" })}
          </a>
        </div>

        <div className="home-reviews__grid">
          {homeReviews.map((review) => (
            <article className="home-review-card" key={`${review.author}-${review.date}`}>
              <Stars value={review.rating} />
              <p className="home-review-card__body">{review.body}</p>
              <span className="home-review-card__author">{review.author}</span>
            </article>
          ))}
        </div>
      </section>

      <section className="section how-it-works">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Как начать", ro: "Cum să începi", en: "How to start" })}</p>
          <h2>{t({ ru: "Простой путь к первой колонии", ro: "Drumul simplu către prima colonie", en: "A simple path to your first colony" })}</h2>
        </div>
        <div className="steps-grid">
          {[
            {
              number: 1,
              title: t({ ru: "Выберите набор", ro: "Alege kitul", en: "Choose your kit" }),
              text: t({ ru: "Найти стартовый набор для своего уровня.", ro: "Găsește setul de start potrivit.", en: "Pick the right starter kit." }),
            },
            {
              number: 2,
              title: t({ ru: "Получите колонию", ro: "Primește colonie", en: "Receive the colony" }),
              text: t({ ru: "Доставка с безопасной упаковкой и понятными инструкциями.", ro: "Livrare cu ambalaj sigur și instrucțiuni clare.", en: "Delivered safely with clear instructions." }),
            },
            {
              number: 3,
              title: t({ ru: "Наблюдайте жизнь", ro: "Observă viața", en: "Observe life" }),
              text: t({ ru: "Смотрите, как муравьи строят мир внутри.", ro: "Privește cum furnicile construiesc lumea din interior.", en: "Watch the ants build their world inside." }),
            },
          ].map((step) => (
            <div key={step.number}>
              <strong>{step.number}</strong>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section why-buy-us">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Почему покупают у нас", ro: "De ce cumpără la noi", en: "Why buy from us" })}</p>
          <h2>
            {t({ ru: "Надёжный старт", ro: "Un start sigur", en: "A reliable start" })}
            <br />
            {t({ ru: "муравьиной колонии", ro: "pentru colonie", en: "for your colony" })}
          </h2>
        </div>
        <div className="trust-grid">
          {[
            {
              icon: (
                <path d="M3 7h11v8H3zM14 10h3.4L21 13v2h-7z" />
              ),
              extraIcon: <><circle cx="7" cy="17" r="1.7" /><circle cx="17" cy="17" r="1.7" /></>,
              title: t({ ru: "Безопасная доставка", ro: "Livrare sigură", en: "Safe delivery" }),
              description: t({
                ru: "Надёжно утепляем посылки в холодное время года и компенсируем риски в пути.",
                ro: "Ambalăm coletele termic pe timp rece și compensăm riscurile pe drum.",
                en: "We insulate parcels in cold weather and cover transit risks.",
              }),
            },
            {
              icon: <path d="M12 3l7 3v5c0 4.4-3 7.4-7 9-4-1.6-7-4.6-7-9V6zM9 12l2 2 4-4" />,
              title: t({ ru: "Проверенные колонии", ro: "Colonii verificate", en: "Verified colonies" }),
              description: t({
                ru: "Каждая матка проходит строгий карантин и проверку на наличие здорового расплода.",
                ro: "Fiecare regină trece prin carantină strictă și verificarea puietului sănătos.",
                en: "Every queen passes strict quarantine and a healthy-brood check.",
              }),
            },
            {
              icon: <path d="M20 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2z" />,
              title: t({ ru: "Поддержка новичков", ro: "Suport pentru începători", en: "Beginner support" }),
              description: t({
                ru: "Остаёмся на связи после покупки и помогаем адаптировать колонию на новом месте.",
                ro: "Rămânem în legătură după achiziție și ajutăm la adaptarea coloniei la noul loc.",
                en: "We stay in touch after purchase and help your colony settle in.",
              }),
            },
            {
              icon: <path d="M12 3l8 4v10l-8 4-8-4V7zM4 7l8 4 8-4M12 11v10" />,
              title: t({ ru: "Качественные формикарии", ro: "Formicarii de calitate", en: "Quality formicariums" }),
              description: t({
                ru: "Используем безопасный акрил и продуманную систему автоувлажнения.",
                ro: "Folosim acril sigur și un sistem de umidificare bine gândit.",
                en: "We use safe acrylic and a well-designed auto-humidity system.",
              }),
            },
          ].map((item) => (
            <div key={item.title}>
              <span className="trust-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {item.icon}
                  {item.extraIcon}
                </svg>
              </span>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq-wrap" id="faq">
        <h2 className="section-heading">{t({ ru: "Часто задаваемые вопросы", ro: "Întrebări frecvente", en: "Frequently asked questions" })}</h2>
        <div className="faq-wrap__list">
          <details className="faq-wrap__item" open>
            <summary>{t({ ru: "Безопасно ли это?", ro: "Este sigur?", en: "Is it safe?" })}</summary>
            <p>{t({ ru: "Да. Муравьи остаются внутри прозрачного дома, а все комплекты проверены.", ro: "Da. Furnicile rămân în interiorul unui habitat transparent, iar fiecare kit este verificat.", en: "Yes. The ants stay inside a clear habitat, and every kit is quality checked." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Убегают ли муравьи?", ro: "Furnicile scapă?", en: "Do ants escape?" })}</summary>
            <p>{t({ ru: "Нет. Формикариумы и колонии упакованы так, чтобы исключить побег.", ro: "Nu. Formicariile și coloniile sunt sigilate pentru a preveni scăparea.", en: "No. Formicariums and colonies are sealed to prevent escape." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Это сложно в уходе?", ro: "Este greu de întreținut?", en: "Is it hard to maintain?" })}</summary>
            <p>{t({ ru: "Нет. Мы предоставляем простые инструкции и всё необходимое для первых недель.", ro: "Nu. Oferim instrucțiuni simple și tot ce ai nevoie pentru primele săptămâni.", en: "No. We provide easy instructions and everything you need for the first weeks." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Как долго живут колонии?", ro: "Cât timp trăiesc coloniile?", en: "How long do colonies live?" })}</summary>
            <p>{t({ ru: "При правильном уходе колония живёт несколько лет. Это живой проект, который развивается.", ro: "Cu îngrijire corectă, colonia trăiește câțiva ani. Este un proiect viu care crește.", en: "With proper care, a colony lives several years. It is a living project that grows." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Подходит ли для новичков?", ro: "Este potrivit pentru începători?", en: "Is this suitable for beginners?" })}</summary>
            <p>{t({ ru: "Да. Наша система создана именно для новичков, с поддержкой эксперта.", ro: "Da. Sistemul nostru este conceput pentru începători, cu suport expert.", en: "Yes. Our system is designed for new hobbyists, with expert support." })}</p>
          </details>
        </div>
      </section>
    </>
  );
}
