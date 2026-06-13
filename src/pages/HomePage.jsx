import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import ProductCard from "../components/ProductCard";
import SEO, { breadcrumbSchema, faqSchema, pageSeo } from "../components/SEO";
import messorForagingSeeds from "../assets/images/ants/messor-foraging-seeds.jpg";
import messorSeedStore from "../assets/images/ants/messor-seed-store.jpg";
import messorStructor from "../assets/images/ants/messor-structor.jpg";
import messorWorkersCloseup from "../assets/images/ants/messor-workers-closeup.jpg";
import messorQueenWithBrood from "../assets/images/ants/messor-queen-with-brood.png";

export default function HomePage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();
  const starterAnt = ants[0];
  const starterFormicarium = formicariums[0];

  const [galleryIndex, setGalleryIndex] = useState(0);

  const addStarterKit = () => {
    addToCart(starterAnt.id);
    addToCart(starterFormicarium.id);
  };

  const starterKit = {
    id: "starter-kit",
    title: { ru: "Стартовый набор", ro: "Set de start", en: "Starter kit" },
    excerpt: {
      ru: "Формикарий Terra + колония Messor Structor — всё для запуска.",
      ro: "Formicariu Terra + colonie Messor Structor — tot ce trebuie pentru start.",
      en: "Terra formicarium + Messor Structor colony — everything to get started.",
    },
    images: ["/formicarium-colony.jpg"],
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
    { image: "/formicarium-colony.jpg", label: t({ ru: "Формикарий дома", ro: "Formicariu acasă", en: "Formicarium at home" }) },
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
          <p className="kicker">{t({ ru: "Для дома", ro: "Pentru acasă", en: "For home" })}</p>
          <h1 className="store-hero__title">{t({ ru: "Муравьиная ферма для дома", ro: "O fermă de furnici pentru acasă", en: "An ant farm for home" })}</h1>
          <p className="store-hero__lead">
            {t({ ru: "Наблюдайте за строительством настоящего подземного города прямо у себя дома.", ro: "Urmărește construcția unui oraș subteran adevărat chiar la tine acasă.", en: "Watch the construction of a real underground city right at home." })}
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
            src="/formicarium-colony.jpg"
            alt={t({ ru: "Формикарий с живой колонией муравьёв", ro: "Formicariu cu colonie vie de furnici", en: "Formicarium with a live ant colony" })}
            loading="lazy"
          />
        </div>
      </section>

      <section className="section hero-trust">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Доверие и опыт", ro: "Încredere și experiență", en: "Trust & experience" })}</p>
          <h2>{t({ ru: "Почему с нами удобно начинать", ro: "De ce e comod să începi cu noi", en: "Why it’s easy to start with us" })}</h2>
        </div>
        <div className="grid four">
          {[
            { title: t({ ru: "5+ лет опыта", ro: "Peste 5 ani de experiență", en: "5+ years of experience" }) },
            { title: t({ ru: "500+ отправленных колоний", ro: "Peste 500 de colonii trimise", en: "500+ colonies shipped" }) },
            { title: t({ ru: "Поддержка после покупки", ro: "Suport după achiziție", en: "Support after purchase" }) },
            { title: t({ ru: "Консультация каждому клиенту", ro: "Consultanță pentru fiecare client", en: "Consultation for every customer" }) },
          ].map((item) => (
            <div key={item.title} className="trust-card">
              <strong>{item.title}</strong>
            </div>
          ))}
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

      <section className="section what-is-explained">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Что такое муравьиная ферма", ro: "Ce este o fermă de furnici", en: "What is an ant farm" })}</p>
          <h2>{t({ ru: "Живой мини-мир за стеклом", ro: "Un mini-lume vie în spatele sticlei", en: "A living mini-world behind glass" })}</h2>
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
          <h2>{t({ ru: "Причины начать наблюдать живую колонию", ro: "Motivele pentru a începe să urmărești o colonie vie", en: "Reasons to start watching a living colony" })}</h2>
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
                ru: "Каждый кадр — момент из жизни живой колонии: от заботы о расплоде до строительства тоннелей. Листайте, чтобы рассмотреть детали.",
                ro: "Fiecare cadru este un moment din viața unei colonii vii: de la îngrijirea puietului până la construirea tunelelor. Răsfoiește pentru a vedea detaliile.",
                en: "Every frame is a moment from a living colony's life: from brood care to tunnel building. Browse through to see the details.",
              })}
            </p>
            <p className="gallery-showcase__caption">{currentSlide.label}</p>
          </div>
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
          <h2>{t({ ru: "Надёжный старт муравьиной колонии", ro: "Un start sigur pentru colonie", en: "A reliable start for your colony" })}</h2>
        </div>
        <div className="trust-grid">
          {[
            { 
              title: t({ ru: "Безопасная доставка", ro: "Livrare sigură", en: "Safe delivery" }),
              description: t({ru: "Надежно утепляем посылки в холодное время года и компенсируем риски в пути", ro: "", en: ""}) 
            },
            { 
              title: t({ ru: "Проверенные колонии", ro: "Colonii verificate", en: "Verified colonies" }),
              description: t({ru: "Каждая матка проходит строгий карантин и проверку на наличие здорового расплода", ro: "", en: ""}) 
            },
            { 
              title: t({ ru: "Поддержка новичков", ro: "Suport pentru începători", en: "Beginner support" }),
              description: t({ru: "Остаемся на связи после покупки и помогаем адаптировать колонию на новом месте", ro: "", en: ""}) 
            },
            { 
              title: t({ ru: "Качественные формикарии", ro: "Formicarii de calitate", en: "Quality formicariums" }),
              description: t({ru: "Используем безопасный акрил и продуманную систему автоувлажнения", ro: "", en: ""}) 
            },
          ].map((item) => (
            <div key={item.title}>
              <strong>{item.title}</strong>
              <p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section faq-wrap">
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
            <p>{t({ ru: "С правильным уходом — до нескольких лет. Это живой проект, который развивается.", ro: "Cu îngrijire corectă — câțiva ani. Este un proiect viu care crește.", en: "With proper care — several years. It is a living project that grows." })}</p>
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
