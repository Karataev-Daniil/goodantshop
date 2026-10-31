import { useEffect, useRef, useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { STARTER_KIT_PATH, kitPrice, kitProduct } from "../data/starterKitData";
import AntTrail from "../components/AntTrail";
import ProductCard from "../components/ProductCard";
import SEO, { breadcrumbSchema, faqSchema, pageSeo, SITE_TELEGRAM } from "../components/SEO";
import Stars from "../components/Stars";
import { responsiveImg } from "../responsiveImage";
import {
  featuredReviews,
  formatReviewDate,
  reviewStatsAll,
  SELLER_999_URL,
} from "../data/reviewsData";
import messorForagingSeeds from "../assets/images/ants/messor-foraging-seeds.webp";
import messorWorkersCloseup from "../assets/images/ants/messor-workers-closeup.webp";
import formicariumOrange from "../assets/images/formicariums/terra/formicarium-orange-back-corner.webp";
import { antHeadMandibles, antTendingAphids, messorWorker, woodAntsCarryingBeetle } from "../assets/images/library";
import type { TouchEvent } from "react";
import type { OutletContext, ProductLike } from "../types";

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
  const kitPath = `/${lang}${STARTER_KIT_PATH}`;
  const lei = t({ ru: "лей", ro: "lei", en: "lei" });

  const [galleryIndex, setGalleryIndex] = useState(0);
  // Автопрокрутка галереи выключается навсегда после первого касания стрелок,
  // точек или свайпа: если человек начал листать сам, дёргать картинку под ним
  // уже нельзя.
  const [galleryAuto, setGalleryAuto] = useState(true);
  const [openFaq, setOpenFaq] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const addStarterKit = () => {
    addToCart(starterAnt.id);
    addToCart(starterFormicarium.id);
  };

  // Набор ведёт на свою страницу: там видно, что в него входит и что идёт
  // подарком, а не на страницу одного формикария.
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
      item: { ...kitProduct, id: "starter-kit", images: ["/formicarium-colony.webp"] },
      linkTo: kitPath,
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
        ru: "По Кишинёву 150 лей, и бесплатно, если в заказе есть формикарий. Рядом с Кишинёвом (например, Анений Ной) - стоимость проезда плюс 100 лей. В дальние города дороже: считаем дорогу туда и обратно и время в пути, сумму называем заранее. Доставляем по всей Молдове.",
        ro: "În Chișinău 150 lei, gratuit dacă în comandă este un formicariu. Lângă Chișinău (de exemplu, Anenii Noi) - costul transportului plus 100 lei. În orașele mai îndepărtate costă mai mult: socotim drumul dus-întors și timpul pe drum, iar suma o spunem din timp. Livrăm în toată Moldova.",
        en: "150 lei within Chișinău, free when the order includes a formicarium. Near Chișinău (for example, Anenii Noi) it is the fare plus 100 lei. Farther towns cost more: we count the round trip and the time on the road and tell you the price in advance. We deliver across Moldova.",
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

      {/* Герой стоит на соломенном поле: Messor - жнецы, зерно их ремесло.
          По нижнему краю поля идёт феромонная тропа с рабочими. */}
      <section className="home-hero bleed">
        <div className="home-hero__grid">
          <div className="home-hero__copy">
            <h1 className="home-hero__title">
              {t({
                ru: "Живые муравьи и формикарии для вашего дома",
                ro: "Furnici vii și formicarii pentru casa ta",
                en: "Live ants and formicariums for your home",
              })}
            </h1>
            <p className="home-hero__lead">
              {t({ ru: "Колонии с маткой, формикарии и всё для старта муравьиной фермы. Наблюдайте за настоящим подземным городом прямо у себя дома - с доставкой по всей Молдове.", ro: "Colonii cu regină, formicarii și tot ce trebuie pentru a porni o fermă de furnici. Urmărește un oraș subteran adevărat chiar la tine acasă - cu livrare în toată Moldova.", en: "Queen-right colonies, formicariums and everything to start an ant farm. Watch a real underground city right at home - with delivery across Moldova." })}
            </p>

            {/* Цена в первом экране: без неё человек из поиска не понимает
                порядок сумм и уходит, не долистав до карточек. */}
            {antPriceFrom && formicariumPriceFrom && (
              <dl className="home-hero__prices">
                <div>
                  <dt>{t({ ru: "Колония с маткой", ro: "Colonie cu regină", en: "Queen-right colony" })}</dt>
                  <dd>
                    <span>{t({ ru: "от", ro: "de la", en: "from" })}</span> {antPriceFrom} {lei}
                  </dd>
                </div>
                <div>
                  <dt>{t({ ru: "Формикарий", ro: "Formicariu", en: "Formicarium" })}</dt>
                  <dd>
                    <span>{t({ ru: "от", ro: "de la", en: "from" })}</span> {formicariumPriceFrom} {lei}
                  </dd>
                </div>
              </dl>
            )}

            <div className="home-hero__actions">
              <Link className="btn btn-primary" to={kitPath}>
                {t({ ru: "Выбрать стартовый набор", ro: "Alege kitul de start", en: "Choose starter kit" })}
              </Link>
              {/* Вторая кнопка для тех, кто не готов класть в корзину, но
                  готов спросить. Без неё единственный путь - форма заказа. */}
              <a className="btn btn-ghost" href={SITE_TELEGRAM} target="_blank" rel="noopener noreferrer">
                {t({ ru: "Спросить в Telegram", ro: "Întreabă pe Telegram", en: "Ask on Telegram" })}
              </a>
            </div>

            <ul className="home-hero__benefits">
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
          </div>

          <div className="home-hero__media">
            <img
              className="home-hero__photo"
              {...responsiveImg(messorWorker, "(max-width: 980px) 100vw, 560px", { priority: true })}
              alt={t({
                ru: "Муравей-жнец Messor Structor крупным планом",
                ro: "Furnică secerătoare Messor Structor de aproape",
                en: "A Messor Structor harvester ant up close",
              })}
              width="1120"
              height="1400"
            />
            <Link className="home-hero__kit" to={kitPath}>
              <img {...responsiveImg("/formicarium-colony.webp", "78px")} alt="" width="1140" height="806" />
              <span className="home-hero__kit-text">
                <span>{t({ ru: "Стартовый набор", ro: "Set de start", en: "Starter kit" })}</span>
                <strong>
                  {kitPrice} {lei}
                </strong>
              </span>
              <svg className="home-hero__kit-arrow" width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Полоса цифр, а не обещаний: обещания живут в «Почему покупают у нас»
            ниже. */}
        <ul className="home-hero__stats">
          {[
            { value: "5+", label: t({ ru: "лет с муравьями", ro: "ani cu furnici", en: "years with ants" }) },
            { value: "500+", label: t({ ru: "отправленных колоний", ro: "colonii trimise", en: "colonies shipped" }) },
            {
              value: homeReviewStats.ratingValue.toFixed(1),
              label: t({ ru: "средняя оценка на 999.md", ro: "nota medie pe 999.md", en: "average rating on 999.md" }),
            },
            {
              value: `150 ${lei}`,
              label: t({ ru: "доставка по Кишинёву", ro: "livrare în Chișinău", en: "delivery within Chișinău" }),
            },
          ].map(({ value, label }) => (
            <li key={label}>
              <strong>{value}</strong>
              <span>{label}</span>
            </li>
          ))}
        </ul>

        <AntTrail className="home-hero__trail" />
      </section>

      {/* Товар идёт сразу после героя: раньше до первой цены человек проходил
          три объясняющие секции подряд. */}
      <section className="home-products" id="popular-products">
        <div className="home-head">
          <h2>{t({ ru: "С чего начинают чаще всего", ro: "De unde încep cel mai des", en: "Where most people start" })}</h2>
          <Link className="home-head__link" to={`/${lang}/ants`}>
            {t({ ru: "Все виды муравьёв", ro: "Toate speciile de furnici", en: "All ant species" })}
          </Link>
        </div>
        <div className="grid three popular-grid">
          {popularItems.map(({ item, linkTo, onAddToCart }) => (
            <ProductCard key={item.id} item={item} linkTo={linkTo} onAddToCart={onAddToCart} />
          ))}
        </div>
      </section>

      {/* «Что это такое» и галерея слиты в один блок: обе секции показывали
          одни и те же кадры и объясняли одно и то же, только по очереди. */}
      <section className="home-showcase bleed">
        <div className="home-showcase__head">
          <h2>
            {t({ ru: "Живой мини-мир за стеклом", ro: "O mini-lume vie în spatele sticlei", en: "A living mini-world behind glass" })}
          </h2>
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

        <div className="gallery-showcase">
          <div
            className="gallery-showcase__media"
            onTouchStart={onGalleryTouchStart}
            onTouchEnd={onGalleryTouchEnd}
          >
            {gallerySlides.map((slide, i) => (
              <img
                key={slide.label}
                className={i === galleryIndex ? "is-active" : ""}
                {...responsiveImg(slide.image, "(max-width: 980px) 100vw, 740px")}
                alt={i === galleryIndex ? slide.label : ""}
                aria-hidden={i !== galleryIndex}
                loading="lazy"
              />
            ))}
            {/* Счётчик: без него галерея выглядела статичной картинкой и
                её просто не листали. */}
            <span className="gallery-showcase__counter" aria-hidden="true">
              {galleryIndex + 1} / {galleryCount}
            </span>
          </div>

          <div className="gallery-showcase__text">
            <p className="gallery-showcase__caption" aria-live="polite">{currentSlide.label}</p>
            <p className="gallery-showcase__lead">{currentSlide.text}</p>

            <div className="gallery-showcase__controls">
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
          </div>
        </div>
      </section>

      <section className="home-why">
        <div className="home-why__aside">
          <h2>
            {t({ ru: "Причины начать наблюдать живую колонию", ro: "Motivele pentru a urmări o colonie vie", en: "Reasons to start watching a living colony" })}
          </h2>
          <img
            {...responsiveImg(antHeadMandibles, "(max-width: 980px) 100vw, 520px")}
            alt={t({ ru: "Голова муравья крупным планом", ro: "Capul unei furnici de aproape", en: "An ant's head up close" })}
            loading="lazy"
          />
        </div>
        <ul className="home-why__list">
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
            <li key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="home-steps bleed">
        <h2>{t({ ru: "Простой путь к первой колонии", ro: "Drumul simplu către prima colonie", en: "A simple path to your first colony" })}</h2>
        {/* Это настоящая последовательность, поэтому шаги нумерованы и
            связаны той же тропой, что и в герое. */}
        <ol className="home-steps__list">
          {[
            {
              title: t({ ru: "Выберите набор", ro: "Alege kitul", en: "Choose your kit" }),
              text: t({ ru: "Найти стартовый набор для своего уровня.", ro: "Găsește setul de start potrivit.", en: "Pick the right starter kit." }),
            },
            {
              title: t({ ru: "Получите колонию", ro: "Primește colonie", en: "Receive the colony" }),
              text: t({ ru: "Доставка с безопасной упаковкой и понятными инструкциями.", ro: "Livrare cu ambalaj sigur și instrucțiuni clare.", en: "Delivered safely with clear instructions." }),
            },
            {
              title: t({ ru: "Наблюдайте жизнь", ro: "Observă viața", en: "Observe life" }),
              text: t({ ru: "Смотрите, как муравьи строят мир внутри.", ro: "Privește cum furnicile construiesc lumea din interior.", en: "Watch the ants build their world inside." }),
            },
          ].map((step, i) => (
            <li key={step.title}>
              <span className="home-steps__num" aria-hidden="true">{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
        {/* Секция объясняет путь и тут же даёт по нему пойти - иначе она
            заканчивается ничем. */}
        <div className="home-steps__actions">
          <Link className="btn btn-on-red" to={kitPath}>
            {t({ ru: "Посмотреть стартовый набор", ro: "Vezi setul de start", en: "See the starter kit" })}
          </Link>
          <a className="btn btn-ghost-light" href={SITE_TELEGRAM} target="_blank" rel="noopener noreferrer">
            {t({ ru: "Задать вопрос", ro: "Pune o întrebare", en: "Ask a question" })}
          </a>
        </div>
      </section>

      {/* Доставка была описана только в микроразметке - человек её не видел.
          Неизвестная стоимость доставки это классическая причина уйти.
          Блок свёрстан как посылочная этикетка. */}
      <section className="home-delivery bleed">
        <h2>{t({ ru: "Как колония доедет до вас", ro: "Cum ajunge colonia la tine", en: "How the colony gets to you" })}</h2>
        <div className="delivery-label">
          {[
            {
              value: `150 ${lei}`,
              label: t({ ru: "По Кишинёву", ro: "În Chișinău", en: "Within Chișinău" }),
              note: t({
                ru: "Бесплатно, если в заказе есть формикарий.",
                ro: "Gratuit dacă în comandă este un formicariu.",
                en: "Free when the order includes a formicarium.",
              }),
            },
            {
              value: `+100 ${lei}`,
              label: t({ ru: "Рядом с Кишинёвом", ro: "Lângă Chișinău", en: "Near Chișinău" }),
              note: t({
                ru: "Проезд плюс 100 лей, например до Анений Ной. В дальние города дороже - сумму назовём заранее.",
                ro: "Transportul plus 100 lei, de exemplu până la Anenii Noi. În orașele mai îndepărtate costă mai mult - suma o spunem din timp.",
                en: "The fare plus 100 lei, for example to Anenii Noi. Farther towns cost more - we tell you the price in advance.",
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
            <div className="delivery-label__cell" key={item.label}>
              <span className="delivery-label__label">{item.label}</span>
              <strong className="delivery-label__value">{item.value}</strong>
              <p className="delivery-label__note">{item.note}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="home-reviews">
        <div className="home-reviews__summary">
          <h2>{t({ ru: "Что говорят покупатели", ro: "Ce spun clienții", en: "What customers say" })}</h2>
          <p className="home-reviews__score">{homeReviewStats.ratingValue.toFixed(1)}</p>
          <Stars value={homeReviewStats.ratingValue} />
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

      <section className="home-trust">
        <div className="home-trust__media">
          <img
            {...responsiveImg(formicariumOrange, "(max-width: 980px) 100vw, 620px")}
            alt={t({ ru: "Акриловый формикарий Terra", ro: "Formicariul acrilic Terra", en: "The acrylic Terra formicarium" })}
            loading="lazy"
          />
        </div>
        <div className="home-trust__body">
          <h2>
            {t({ ru: "Надёжный старт муравьиной колонии", ro: "Un start sigur pentru colonie", en: "A reliable start for your colony" })}
          </h2>
          <ul className="trust-list">
            {[
              {
                icon: (
                  <>
                    <path d="M3 7h11v8H3zM14 10h3.4L21 13v2h-7z" />
                    <circle cx="7" cy="17" r="1.7" />
                    <circle cx="17" cy="17" r="1.7" />
                  </>
                ),
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
              <li key={item.title}>
                <svg className="trust-list__icon" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {item.icon}
                </svg>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-faq bleed" id="faq">
        <div className="home-faq__head">
          <h2>{t({ ru: "Часто задаваемые вопросы", ro: "Întrebări frecvente", en: "Frequently asked questions" })}</h2>
          <p>
            {t({ ru: "Не нашли свой вопрос?", ro: "Nu ți-ai găsit întrebarea?", en: "Question not here?" })}{" "}
            <a href={SITE_TELEGRAM} target="_blank" rel="noopener noreferrer">
              {t({ ru: "Напишите нам в Telegram", ro: "Scrie-ne pe Telegram", en: "Message us on Telegram" })}
            </a>
          </p>
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
            <Link to={kitPath}>{t({ ru: "Стартовый набор", ro: "Set de start", en: "Starter kit" })}</Link>
            <a href="#popular-products">{t({ ru: "Популярные товары", ro: "Produse populare", en: "Popular products" })}</a>
            <a href="#faq">{t({ ru: "Частые вопросы", ro: "Întrebări frecvente", en: "FAQ" })}</a>
          </p>
        </div>
      </section>
    </>
  );
}
