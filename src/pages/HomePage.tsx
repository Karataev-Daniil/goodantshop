import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import ProductCard from "../components/ProductCard";
import SEO, { breadcrumbSchema, faqSchema, pageSeo, SITE_TELEGRAM } from "../components/SEO";
import Stars from "../components/Stars";
import {
  featuredReviews,
  formatReviewDate,
  reviewStatsAll,
  SELLER_999_URL,
} from "../data/reviewsData";
import messorForagingSeeds from "../assets/images/ants/messor-foraging-seeds.webp";
import messorWorkersCloseup from "../assets/images/ants/messor-workers-closeup.webp";
import { antTendingAphids, woodAntsCarryingBeetle } from "../assets/images/library";
import type { TouchEvent } from "react";
import type { ProductCardItem } from "../components/ProductCard";
import type { OutletContext, ProductLike } from "../types";

// Hero background carousel: leads with the shot that used to sit in the
// "what-is" block, followed by a few strong colony close-ups.
const heroSlides = [messorForagingSeeds];

// «От X лей» в герое считаем из каталога, а не пишем руками - иначе цифра
// разойдётся с карточками при первой же правке прайса. Товары «нет в наличии»
// не учитываем: обещать по ним цену нечестно.
const priceFrom = (items: ProductLike[]): number | null => {
  const available = items.filter((item) => item.availability !== "outOfStock");
  const pool = available.length ? available : items;
  const values = pool
    .flatMap((item) => item.priceOptions || [])
    .map((option) => Number(String(option.value).replace(/\D/g, "")))
    .filter((value) => value > 0);

  return values.length ? Math.min(...values) : null;
};

const antPriceFrom = priceFrom(ants);
const formicariumPriceFrom = priceFrom(formicariums);

const GALLERY_INTERVAL = 6000;
const SWIPE_THRESHOLD = 40;

export default function HomePage() {
  const { t, addToCart } = useOutletContext<OutletContext>();
  const { lang = "ru" } = useParams();
  // Каталог не пустой: первые позиции есть всегда.
  const starterAnt = ants[0]!;
  const starterFormicarium = formicariums[0]!;
  const homeReviewStats = reviewStatsAll();
  const homeReviews = featuredReviews();

  const [galleryIndex, setGalleryIndex] = useState(0);
  const [heroIndex, setHeroIndex] = useState(0);
  // Автопрокрутка галереи выключается навсегда после первого касания стрелок,
  // точек или свайпа: если человек начал листать сам, дёргать картинку под ним
  // уже нельзя.
  const [galleryAuto, setGalleryAuto] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (heroSlides.length < 2) return undefined;
    const timer = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const addStarterKit = () => {
    addToCart(starterAnt.id);
    addToCart(starterFormicarium.id);
  };

  const starterKit: ProductCardItem = {
    id: "starter-kit",
    title: { ru: "Стартовый набор", ro: "Set de start", en: "Starter kit" },
    excerpt: {
      ru: "Формикарий Terra и колония Messor Structor из наличия. Набор инструментов и корм в подарок.",
      ro: "Formicariu Terra și colonie Messor Structor din stoc. Setul de instrumente și hrana vin cadou.",
      en: "Terra formicarium and a Messor Structor colony from stock. Tool kit and food come as a gift.",
    },
    images: ["/formicarium-colony.webp"],
    availability: "inStock",
    // Цена = Terra (1600) + Messor (650). Держите её в согласии с priceOptions
    // в formicariumsData.ts и antsData.ts, иначе витрина разойдётся с корзиной.
    priceOptions: [
      {
        label: { ru: "Формикарий + колония", ro: "Formicariu + colonie", en: "Formicarium + colony" },
        value: "2250 лей",
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
    {
      image: messorForagingSeeds,
      label: t({ ru: "Охота и добыча пищи", ro: "Vânătoare și procurarea hranei", en: "Hunting and foraging for food" }),
      text: t({
        ru: "Фуражиры уходят далеко от гнезда за семенами и мелкой добычей, отмечая дорогу феромонами для остальных.",
        ro: "Culegătoarele se îndepărtează de cuib după semințe și pradă mică, marcând drumul cu feromoni pentru celelalte.",
        en: "Foragers travel far from the nest for seeds and small prey, marking the trail with pheromones for the others.",
      }),
    },
    {
      image: antTendingAphids,
      label: t({ ru: "Муравьиное скотоводство", ro: "Creșterea afidelor", en: "Ant husbandry" }),
      text: t({
        ru: "Многие муравьи «пасут» тлю, защищая её от врагов ради сладкой жидкости, совсем как фермеры со своим стадом.",
        ro: "Multe furnici «pasc» afide, apărându-le de dușmani pentru un lichid dulce, ca fermierii cu turma lor.",
        en: "Many ants «herd» aphids, protecting them from enemies for a sweet liquid, just like farmers with their herd.",
      }),
    },
    {
      image: woodAntsCarryingBeetle,
      label: t({ ru: "Сила в команде", ro: "Puterea echipei", en: "Strength in teamwork" }),
      text: t({
        ru: "Вместе муравьи одолевают и переносят добычу в десятки раз крупнее себя - то, что одиночке не под силу.",
        ro: "Împreună furnicile înving și transportă pradă de zeci de ori mai mare decât ele - imposibil pentru una singură.",
        en: "Together ants overpower and carry prey dozens of times their size - impossible for a single ant.",
      }),
    },
    {
      image: messorWorkersCloseup,
      label: t({ ru: "Развитая социальная система", ro: "Un sistem social dezvoltat", en: "A developed social system" }),
      text: t({
        ru: "У каждого муравья своя роль - от няньки до фуражира. Вместе они действуют как единый живой организм.",
        ro: "Fiecare furnică are rolul său - de la doică la culegătoare. Împreună funcționează ca un singur organism viu.",
        en: "Every ant has its role, from nurse to forager. Together they act as a single living organism.",
      }),
    },
    {
      image: "/formicarium-colony.webp",
      label: t({ ru: "Формикарий дома", ro: "Formicariu acasă", en: "Formicarium at home" }),
      text: t({
        ru: "Всё это происходит прямо у вас дома - за прозрачными стенками формикария наблюдать удобно в любой момент.",
        ro: "Toate acestea se întâmplă chiar la tine acasă - prin pereții transparenți ai formicariului poți urmări oricând.",
        en: "All of this happens right in your home - through the clear walls of the formicarium you can watch anytime.",
      }),
    },
  ];
  const galleryCount = gallerySlides.length;
  // galleryIndex всегда берётся по модулю galleryCount.
  const currentSlide = gallerySlides[galleryIndex]!;

  useEffect(() => {
    if (!galleryAuto) return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const timer = setInterval(() => {
      setGalleryIndex((i) => (i + 1) % galleryCount);
    }, GALLERY_INTERVAL);
    return () => clearInterval(timer);
  }, [galleryAuto, galleryCount]);

  const showPrevSlide = () => {
    setGalleryAuto(false);
    setGalleryIndex((i) => (i - 1 + galleryCount) % galleryCount);
  };
  const showNextSlide = () => {
    setGalleryAuto(false);
    setGalleryIndex((i) => (i + 1) % galleryCount);
  };
  const showSlide = (index: number) => {
    setGalleryAuto(false);
    setGalleryIndex(index);
  };

  // В touchstart/touchend всегда есть хотя бы одно касание.
  const onGalleryTouchStart = (event: TouchEvent<HTMLDivElement>) => {
    touchStartX.current = event.touches[0]!.clientX;
  };
  const onGalleryTouchEnd = (event: TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null) return;
    const distance = event.changedTouches[0]!.clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(distance) < SWIPE_THRESHOLD) return;
    if (distance < 0) showNextSlide();
    else showPrevSlide();
  };

  // Один источник для видимого блока вопросов и для FAQPage-разметки.
  // Расхождение между ними Google считает нарушением - разметка обязана
  // повторять то, что человек видит на странице.
  const homeFaq = [
    {
      q: { ru: "Безопасна ли муравьиная ферма дома?", ro: "Este sigură o fermă de furnici acasă?", en: "Is a home ant farm safe?" },
      a: {
        ru: "Да. Муравьи остаются внутри закрытого формикария, а каждый комплект проверяется перед отправкой.",
        ro: "Da. Furnicile rămân în formicariul închis, iar fiecare set este verificat înainte de expediere.",
        en: "Yes. Ants stay inside the closed formicarium, and every kit is checked before shipping.",
      },
    },
    {
      q: { ru: "Убегают ли муравьи?", ro: "Furnicile scapă?", en: "Do ants escape?" },
      a: {
        ru: "Нет. Формикарий и арена закрыты, а стыки обработаны так, чтобы исключить побег.",
        ro: "Nu. Formicariul și arena sunt închise, iar îmbinările sunt tratate ca să excludă evadarea.",
        en: "No. The formicarium and arena are closed, and the joints are treated to rule out escapes.",
      },
    },
    {
      q: { ru: "Сложно ли ухаживать за колонией?", ro: "Este greu de îngrijit colonia?", en: "Is a colony hard to care for?" },
      a: {
        ru: "Нет. Кормление пару раз в неделю и вода в резервуаре - весь регулярный уход. К набору идут простые инструкции.",
        ro: "Nu. Hrănire de câteva ori pe săptămână și apă în rezervor - asta e toată îngrijirea. Setul vine cu instrucțiuni simple.",
        en: "No. Feeding a couple of times a week and water in the reservoir is the whole routine. The kit comes with simple instructions.",
      },
    },
    {
      q: { ru: "Сколько живёт колония?", ro: "Cât trăiește o colonie?", en: "How long does a colony live?" },
      a: {
        ru: "При правильном уходе несколько лет. Матка живёт дольше рабочих, поэтому колония постоянно обновляется и растёт.",
        ro: "Cu îngrijire corectă, câțiva ani. Regina trăiește mai mult decât lucrătoarele, așa că colonia se reînnoiește și crește.",
        en: "Several years with proper care. The queen outlives the workers, so the colony keeps renewing itself and growing.",
      },
    },
    {
      q: { ru: "Подходит ли ферма новичкам?", ro: "Este potrivită pentru începători?", en: "Is it suitable for beginners?" },
      a: {
        ru: "Да. Стартовые наборы собраны под первую колонию, а консультацию мы даём и до, и после покупки.",
        ro: "Da. Seturile de start sunt gândite pentru prima colonie, iar consultanța o oferim și înainte, și după achiziție.",
        en: "Yes. Starter kits are built for a first colony, and we advise you both before and after the purchase.",
      },
    },
    {
      q: { ru: "Сколько стоит доставка?", ro: "Cât costă livrarea?", en: "How much does delivery cost?" },
      a: {
        ru: "По Кишинёву 150 лей, и бесплатно, если в заказе есть формикарий. За городом - стоимость проезда плюс 100 лей. Доставляем по всей Молдове.",
        ro: "În Chișinău 150 lei, gratuit dacă în comandă este un formicariu. În afara orașului - costul transportului plus 100 lei. Livrăm în toată Moldova.",
        en: "150 lei within Chișinău, free when the order includes a formicarium. Out of town it is the fare plus 100 lei. We deliver across Moldova.",
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
      <div className="home-hero-band">
        <div className="home-hero-band__bg" aria-hidden="true">
          {heroSlides.map((image, i) => (
            <div
              key={image}
              className={`store-hero__slide${i === heroIndex ? " is-active" : ""}`}
              style={{ backgroundImage: `url(${image})` }}
            />
          ))}
          <div className="store-hero__scrim" />
        </div>

        <div className="home-hero-band__inner">
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
                {t({ ru: "Колонии с маткой, формикарии и всё для старта муравьиной фермы. Наблюдайте за настоящим подземным городом прямо у себя дома - с доставкой по всей Молдове.", ro: "Colonii cu regină, formicarii și tot ce trebuie pentru a porni o fermă de furnici. Urmărește un oraș subteran adevărat chiar la tine acasă - cu livrare în toată Moldova.", en: "Queen-right colonies, formicariums and everything to start an ant farm. Watch a real underground city right at home - with delivery across Moldova." })}
              </p>

              {/* Цена в первом экране: без неё человек из поиска не понимает
                  порядок сумм и уходит, не долистав до карточек. */}
              {antPriceFrom && formicariumPriceFrom && (
                <p className="store-hero__price">
                  <span>
                    {t({ ru: "Колония с маткой", ro: "Colonie cu regină", en: "Queen-right colony" })}{" "}
                    <strong>
                      {t({ ru: "от", ro: "de la", en: "from" })} {antPriceFrom} {t({ ru: "лей", ro: "lei", en: "lei" })}
                    </strong>
                  </span>
                  <span className="store-hero__price-sep" aria-hidden="true" />
                  <span>
                    {t({ ru: "формикарий", ro: "formicariu", en: "formicarium" })}{" "}
                    <strong>
                      {t({ ru: "от", ro: "de la", en: "from" })} {formicariumPriceFrom} {t({ ru: "лей", ro: "lei", en: "lei" })}
                    </strong>
                  </span>
                </p>
              )}

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
                {/* Вторая кнопка для тех, кто не готов класть в корзину, но
                    готов спросить. Без неё единственный путь - форма заказа. */}
                <a
                  className="btn btn-light"
                  href={SITE_TELEGRAM}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t({ ru: "Спросить в Telegram", ro: "Întreabă pe Telegram", en: "Ask on Telegram" })}
                </a>
              </div>
              {heroSlides.length > 1 && (
                <div className="store-hero__dots">
                  {heroSlides.map((image, i) => (
                    <button
                      key={image}
                      type="button"
                      className={`store-hero__dot${i === heroIndex ? " is-active" : ""}`}
                      onClick={() => setHeroIndex(i)}
                      aria-label={`${t({ ru: "Слайд", ro: "Slide", en: "Slide" })} ${i + 1}`}
                      aria-current={i === heroIndex}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>

      {/* Полоса цифр, а не обещаний: обещания живут в «Почему покупают у нас»
          ниже. Раньше оба блока говорили одно и то же одними и теми же
          иконками, и повтор читался как заполнение пустоты. */}
      <section className="hero-trust">
        <ul className="hero-trust__grid">
          {[
            {
              // Clock - years of experience
              icon: <><circle cx="12" cy="12" r="9" /><path d="M12 7.5V12l3.5 2" /></>,
              value: "5+",
              label: t({ ru: "лет с муравьями", ro: "ani cu furnici", en: "years with ants" }),
            },
            {
              // Truck - shipped colonies
              icon: <><path d="M3 7h11v8H3zM14 10h3.4L21 13v2h-7z" /><circle cx="7" cy="17" r="1.7" /><circle cx="17" cy="17" r="1.7" /></>,
              value: "500+",
              label: t({ ru: "отправленных колоний", ro: "colonii trimise", en: "colonies shipped" }),
            },
            {
              // Star - marketplace rating
              icon: <path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8-5.2-2.7-5.2 2.7 1-5.8-4.3-4.1 5.9-.9z" />,
              value: homeReviewStats.ratingValue.toFixed(1),
              label: t({ ru: "средняя оценка на 999.md", ro: "nota medie pe 999.md", en: "average rating on 999.md" }),
            },
            {
              // Pin - delivery
              icon: <><path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11z" /><circle cx="12" cy="10" r="2.6" /></>,
              value: `150 ${t({ ru: "лей", ro: "lei", en: "lei" })}`,
              label: t({ ru: "доставка по Кишинёву", ro: "livrare în Chișinău", en: "delivery within Chișinău" }),
            },
          ].map(({ icon, value, label }) => (
            <li className="hero-trust-card" key={label}>
              <span className="hero-trust-card__icon" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  {icon}
                </svg>
              </span>
              <span className="hero-trust-card__text">
                <strong className="hero-trust-card__value">{value}</strong>
                <span className="hero-trust-card__label">{label}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      {/* Товар идёт сразу после героя: раньше до первой цены человек проходил
          три объясняющие секции подряд. */}
      <section className="section popular-products" id="popular-products">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Популярные товары", ro: "Produse populare", en: "Popular products" })}</p>
          <h2>{t({ ru: "С чего начинают чаще всего", ro: "De unde încep cel mai des", en: "Where most people start" })}</h2>
        </div>
        <div className="grid popular-grid">
          {popularItems.map(({ item, linkTo, onAddToCart }) => (
            <ProductCard key={item.id} item={item} linkTo={linkTo} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* «Что это такое» и галерея слиты в один блок: обе секции показывали
          одни и те же кадры и объясняли одно и то же, только по очереди. */}
      <section className="section showcase-section">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Что такое муравьиная ферма", ro: "Ce este o fermă de furnici", en: "What is an ant farm" })}</p>
          <h2>
            {t({ ru: "Живой мини-мир", ro: "O mini-lume vie", en: "A living mini-world" })}
            <br />
            {t({ ru: "за стеклом", ro: "în spatele sticlei", en: "behind glass" })}
          </h2>
        </div>

        <div className="gallery-showcase">
          <div
            className="gallery-showcase__media"
            onTouchStart={onGalleryTouchStart}
            onTouchEnd={onGalleryTouchEnd}
          >
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
            {/* Счётчик и точки: без них галерея выглядела статичной картинкой и
                её просто не листали. */}
            <span className="gallery-showcase__counter" aria-hidden="true">
              {galleryIndex + 1} / {galleryCount}
            </span>
          </div>

          <div className="gallery-showcase__text">
            <p className="gallery-showcase__caption">{currentSlide.label}</p>
            <p className="gallery-showcase__lead">{currentSlide.text}</p>

            <div className="gallery-showcase__dots">
              {gallerySlides.map((slide, i) => (
                <button
                  key={slide.label}
                  type="button"
                  className={`gallery-dot${i === galleryIndex ? " is-active" : ""}`}
                  onClick={() => showSlide(i)}
                  aria-label={`${t({ ru: "Фото", ro: "Foto", en: "Photo" })} ${i + 1}`}
                  aria-current={i === galleryIndex}
                />
              ))}
            </div>

            <ul className="showcase-facts">
              {[
                t({ ru: "Муравьи строят тоннели", ro: "Furnicile construiesc tunele", en: "Ants build tunnels" }),
                t({ ru: "Заботятся о потомстве", ro: "Îngrijesc puietul", en: "They care for young" }),
                t({ ru: "Собирают пищу", ro: "Adună hrană", en: "They collect food" }),
                t({ ru: "Развивают колонию", ro: "Dezvoltă colonia", en: "They grow the colony" }),
              ].map((fact) => (
                <li key={fact}>{fact}</li>
              ))}
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
            {
              title: t({ ru: "Снимает стресс", ro: "Reduce stresul", en: "Reduces stress" }),
              text: t({
                ru: "Наблюдать за колонией успокаивает не хуже аквариума, только смотреть здесь есть на что каждый день.",
                ro: "Privitul coloniei liniștește la fel ca un acvariu, doar că aici ai ce urmări în fiecare zi.",
                en: "Watching a colony calms you like an aquarium does, except here there is something new every day.",
              }),
            },
            {
              title: t({ ru: "Развивает интерес к природе", ro: "Dezvoltă interesul pentru natură", en: "Develops interest in nature" }),
              text: t({
                ru: "Ребёнок видит настоящую биологию вживую, а не картинку в учебнике.",
                ro: "Copilul vede biologie adevărată pe viu, nu o poză din manual.",
                en: "A child sees real biology up close instead of a picture in a textbook.",
              }),
            },
            {
              title: t({ ru: "Подходит детям и взрослым", ro: "Potrivit copiilor și adulților", en: "Suitable for kids and adults" }),
              text: t({
                ru: "Одинаково затягивает и школьника, и взрослого, который устал от экранов.",
                ro: "Prinde la fel și un școlar, și un adult sătul de ecrane.",
                en: "It hooks a schoolkid and an adult tired of screens just the same.",
              }),
            },
            {
              title: t({ ru: "Не требует много времени", ro: "Nu cere mult timp", en: "Requires little time" }),
              text: t({
                ru: "Кормление пару раз в неделю и вода в резервуаре - весь регулярный уход.",
                ro: "Hrănire de câteva ori pe săptămână și apă în rezervor - toată îngrijirea.",
                en: "Feeding twice a week and water in the reservoir is the whole routine.",
              }),
            },
            {
              title: t({ ru: "Занимает мало места", ro: "Ocupă puțin spațiu", en: "Takes little space" }),
              text: t({
                ru: "Формикарий помещается на книжной полке или на рабочем столе.",
                ro: "Formicariul încape pe un raft de cărți sau pe birou.",
                en: "A formicarium fits on a bookshelf or a desk.",
              }),
            },
            {
              title: t({ ru: "Можно наблюдать годами", ro: "Poți urmări ani de zile", en: "Can watch for years" }),
              text: t({
                ru: "Колония растёт и меняется несколько лет - это долгая история, а не разовая покупка.",
                ro: "Colonia crește și se schimbă ani la rând - e o poveste lungă, nu o achiziție de o dată.",
                en: "A colony grows and changes for years - a long story, not a one-off purchase.",
              }),
            },
          ].map((item) => (
            <div key={item.title}>
              <div className="why-hobby__text">
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
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
        {/* Секция объясняет путь и тут же даёт по нему пойти - иначе она
            заканчивается ничем. */}
        <div className="actions how-it-works__actions">
          <a className="btn btn-primary" href="#popular-products">
            {t({ ru: "Посмотреть наборы", ro: "Vezi seturile", en: "See the kits" })}
          </a>
          <a className="btn btn-light" href={SITE_TELEGRAM} target="_blank" rel="noopener noreferrer">
            {t({ ru: "Задать вопрос", ro: "Pune o întrebare", en: "Ask a question" })}
          </a>
        </div>
      </section>

      {/* Доставка была описана только в микроразметке - человек её не видел.
          Неизвестная стоимость доставки это классическая причина уйти. */}
      <section className="section delivery-section">
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Доставка", ro: "Livrare", en: "Delivery" })}</p>
          <h2>{t({ ru: "Как колония доедет до вас", ro: "Cum ajunge colonia la tine", en: "How the colony gets to you" })}</h2>
        </div>
        <div className="delivery-grid">
          {[
            {
              value: `150 ${t({ ru: "лей", ro: "lei", en: "lei" })}`,
              label: t({ ru: "По Кишинёву", ro: "În Chișinău", en: "Within Chișinău" }),
              note: t({
                ru: "Бесплатно, если в заказе есть формикарий.",
                ro: "Gratuit dacă în comandă este un formicariu.",
                en: "Free when the order includes a formicarium.",
              }),
            },
            {
              value: `+100 ${t({ ru: "лей", ro: "lei", en: "lei" })}`,
              label: t({ ru: "По Молдове", ro: "În Moldova", en: "Across Moldova" }),
              note: t({
                ru: "Стоимость проезда плюс 100 лей - доставляем в любой город.",
                ro: "Costul transportului plus 100 lei - livrăm în orice oraș.",
                en: "The fare plus 100 lei - we deliver to any city.",
              }),
            },
            {
              value: t({ ru: "Термо", ro: "Termo", en: "Thermal" }),
              label: t({ ru: "Упаковка", ro: "Ambalaj", en: "Packaging" }),
              note: t({
                ru: "В холодное время года колонии едут в утеплённой защите.",
                ro: "Pe timp rece coloniile călătoresc în ambalaj termoizolat.",
                en: "In cold weather colonies travel in insulated protection.",
              }),
            },
            {
              value: "10:00-22:00",
              label: t({ ru: "На связи", ro: "Disponibili", en: "Available" }),
              note: t({
                ru: "Договариваемся о времени в Telegram или по телефону.",
                ro: "Stabilim ora pe Telegram sau la telefon.",
                en: "We agree on a time over Telegram or by phone.",
              }),
            },
          ].map((item) => (
            <div className="delivery-card" key={item.label}>
              <strong className="delivery-card__value">{item.value}</strong>
              <span className="delivery-card__label">{item.label}</span>
              <p className="delivery-card__note">{item.note}</p>
            </div>
          ))}
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
              <span className="home-review-card__meta">
                <span className="home-review-card__author">{review.author}</span>
                {/* Дата отличает живой отзыв от выдуманного. */}
                <time className="home-review-card__date" dateTime={review.date}>
                  {formatReviewDate(review.date, lang)}
                </time>
              </span>
            </article>
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
        <div className="section-heading">
          <p className="kicker">{t({ ru: "Вопросы", ro: "Întrebări", en: "Questions" })}</p>
          <h2>{t({ ru: "Часто задаваемые вопросы", ro: "Întrebări frecvente", en: "Frequently asked questions" })}</h2>
        </div>
        <div className="faq-wrap__list">
          {homeFaq.map((item, i) => (
            <details
              className="faq-wrap__item"
              key={t(item.q)}
              open={openFaq === i}
              onToggle={(event) => {
                if (event.currentTarget.open) setOpenFaq(i);
                else if (openFaq === i) setOpenFaq(-1);
              }}
            >
              <summary>{t(item.q)}</summary>
              <p>{t(item.a)}</p>
            </details>
          ))}
        </div>
      </section>

      {/* SEO-текст стоит последним: он написан под поиск, и на пути у человека
          ему делать нечего. */}
      <section className="section seo-prose">
        <div className="seo-prose__inner">
          <h2>{t({
            ru: "Купить живых муравьёв и формикарии в Молдове",
            ro: "Cumpără furnici vii și formicarii în Moldova",
            en: "Buy live ants and formicariums in Moldova",
          })}</h2>

          <p>{t({
            ru: "GoodAntShop - специализированный магазин для мирмекипинга: у нас можно купить живых муравьёв, колонии с маткой, формикарии и товары для содержания муравьёв дома. Мы сами разводим и проверяем колонии перед отправкой, поэтому подскажем, какой вид и формикарий подойдут под ваш опыт, бюджет и условия в квартире. Домашняя муравьиная ферма - спокойное и наглядное хобби: за колонией интересно наблюдать и детям, и взрослым, она не шумит и почти не занимает места.",
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
              ru: "В каталоге есть спокойные зерноядные Messor Structor - лучший выбор для первой колонии, выносливые Lasius Niger, быстрорастущие Lasius Neglectus и крупные эффектные Camponotus Fellah. Если вы только выбираете первых питомцев и хотите купить муравьёв в Кишинёве или с доставкой по Молдове, начните с Messor Structor. Все виды, цены и наличие - в ",
              ro: "În catalog găsești blândele granivore Messor Structor - cea mai bună alegere pentru prima colonie, rezistentele Lasius Niger, rapidele Lasius Neglectus și impunătoarele Camponotus Fellah. Dacă abia îți alegi primele furnici și vrei să cumperi furnici în Chișinău sau cu livrare în Moldova, începe cu Messor Structor. Toate speciile, prețurile și disponibilitatea - în ",
              en: "The catalog has the calm seed-eating Messor Structor - the best choice for a first colony, the hardy Lasius Niger, fast-growing Lasius Neglectus and large, striking Camponotus Fellah. If you're choosing your first ants and want to buy ants in Chișinău or with delivery across Moldova, start with Messor Structor. All species, prices and availability are in the ",
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
              ru: "Колония - это матка с расплодом, из которого постепенно вырастают рабочие. Новичкам мы советуем начинать с неприхотливого вида и компактного формикария, чтобы уход был простым и понятным. Подобрать дом для будущей семьи можно в ",
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
              ru: "Колонии упаковываются в утеплённую защиту и безопасно доезжают по Кишинёву и всей Молдове. После покупки мы остаёмся на связи и помогаем запустить муравейник. Остались вопросы по заказу и доставке - напишите нам на странице ",
              ro: "Coloniile sunt ambalate termic și ajung în siguranță în Chișinău și în toată Moldova. După achiziție rămânem în legătură și te ajutăm să pornești colonia. Ai întrebări despre comandă sau livrare - scrie-ne pe pagina de ",
              en: "Colonies are packed with insulated protection and arrive safely across Chișinău and all of Moldova. After purchase we stay in touch and help you start the colony. Questions about an order or delivery - write to us on the ",
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
    </>
  );
}
