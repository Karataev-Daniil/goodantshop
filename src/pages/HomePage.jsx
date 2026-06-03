import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { useOutletContext, useParams } from "react-router-dom";

export default function HomePage() {
  const { t, addToCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  return (
    <>
      <section className="hero">
        <div>
          <p className="kicker">GOODANT SHOP</p>
          <h1>
            {t({
              ru: "Лучший магазин муравьёв и формикариев в Молдове",
              ro: "Cel mai bun magazin de furnici și formicarii din Moldova",
              en: "The best ant and formicarium shop in Moldova",
            })}
          </h1>
          <p>
            {t({
              ru: "Мы 5 лет на рынке Молдовы и более 8 лет экспертного опыта по разведению муравьев. Готовые стартеры, помощь при выборе и доставка по стране.",
              ro: "Suntem de 5 ani pe piața din Moldova și avem peste 8 ani de experiență expertă în creșterea furnicilor. Kituri gata, ajutor la alegere și livrare în țară.",
              en: "We have 5 years on the Moldova market and over 8 years of expert ant-keeping experience. Ready kits, help choosing, and delivery across the country.",
            })}
          </p>
          <div className="actions">
            <Link className="btn" to={`/${lang}/ants`}>
              {t({ ru: "Смотреть каталог", ro: "Vezi catalogul", en: "View catalog" })}
            </Link>
            <Link className="btn btn-secondary" to={`/${lang}/blog`}>
              {t({ ru: "Читать в блоге", ro: "Citește blogul", en: "Read the blog" })}
            </Link>
          </div>
        </div>
        <img className="hero-logo" src="/logo.png" alt="GoodAnt logo" loading="lazy" />
      </section>

      <section className="section start-wrap">
        <h2 className="start-wrap__title">
          {t({ ru: "Почему выбирают нас", ro: "De ce ne aleg", en: "Why customers choose us" })}
        </h2>
        <div className="start-wrap__grid">
          <div className="start-wrap__card">
            <h3>{t({ ru: "Экспертный выбор", ro: "Alegere de expert", en: "Expert selection" })}</h3>
            <p>
              {t({
                ru: "Каждый муравей и формикарий проходят проверку, мы подберём лучший вариант по вашему опыту.",
                ro: "Fiecare furnică și formicar este verificat, alegem cea mai bună opțiune după experiența ta.",
                en: "Every ant and formicarium is checked, and we choose the best option for your experience.",
              })}
            </p>
          </div>
          <div className="start-wrap__card">
            <h3>{t({ ru: "Быстрая доставка", ro: "Livrare rapidă", en: "Fast delivery" })}</h3>
            <p>
              {t({
                ru: "Доставляем по Молдове профессионально и аккуратно, чтобы муравьи прибыли в безопасности.",
                ro: "Livrăm în Moldova profesional și cu grijă, ca furnicile să ajungă în siguranță.",
                en: "We deliver across Moldova professionally and carefully so the ants arrive safely.",
              })}
            </p>
          </div>
          <div className="start-wrap__card">
            <h3>{t({ ru: "Поддержка по телефону и в Telegram", ro: "Suport prin telefon și Telegram", en: "Phone and Telegram support" })}</h3>
            <p>
              {t({
                ru: "Отвечаем на вопросы по выбору муравьёв, формикариев и уходу за колонией в Telegram и по телефону.",
                ro: "Răspundem la întrebări privind alegerea furnicilor, formicariilor și îngrijirea coloniei în Telegram și la telefon.",
                en: "We answer questions about choosing ants, formicariums, and colony care in Telegram and by phone.",
              })}
            </p>
          </div>
        </div>
      </section>

      <section className="section hobby-intro no-border">
        <h2>{t({ ru: "Начните с Messor Structor", ro: "Începe cu Messor Structor", en: "Start with Messor Structor" })}</h2>
        <p>
          {t({
            ru: "Messor Structor просто более подходит для новичков и отлично помогает начать содержать муравьиную ферму.",
            ro: "Messor Structor este pur și simplu mai potrivit pentru începători și ajută să începi cu ușurință o fermă de furnici.",
            en: "Messor Structor is simply more suitable for beginners and helps you start an ant farm easily.",
          })}
        </p>
        <Link className="btn" to={`/${lang}/ants`}>
          {t({ ru: "Перейти к видам", ro: "Vezi speciile", en: "See species" })}
        </Link>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t({ ru: "Виды в продаже", ro: "Specii în vânzare", en: "Species for sale" })}</h2>
          <Link className="link" to={`/${lang}/ants`}>
            <span>
              {t({ ru: "Показать все", ro: "Arată tot", en: "Show all" })}
            </span>
          </Link>
        </div>
        <div className="grid three">
          {ants.map((item) => (
            <ProductCard key={item.id} item={item} linkTo={`/${lang}/ants/${item.slug}`} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <h2>{t({ ru: "Формикарии", ro: "Formicarii", en: "Formicariums" })}</h2>
          <Link className="link" to={`/${lang}/formicariums`}>
            <span>
              {t({ ru: "Показать модель", ro: "Vezi modelul", en: "See the model" })}
            </span>
          </Link>
        </div>
        <div className="grid three">
          {formicariums.map((item) => (
            <ProductCard key={item.id} item={item} linkTo={`/${lang}/formic/${item.slug}`} onAddToCart={addToCart} />
          ))}
        </div>
      </section>

      <section className="section faq-wrap">
        <h2 className="faq-wrap__title">
          {t({ ru: "Часто задаваемые вопросы", ro: "Întrebări frecvente", en: "Frequently Asked Questions" })}
        </h2>
        <div className="faq-wrap__list">
          <details className="faq-wrap__item" open>
            <summary>{t({ ru: "Сложно ли ухаживать за муравьями?", ro: "Este dificil să îngrijești furnicile?", en: "Is it difficult to care for ants?" })}</summary>
            <p>{t({ ru: "Нет, муравьи являются одними из самых неприхотливых домашних питомцев. Им требуется корм, вода и минимальный уход.", ro: "Nu, furnicile sunt printre cele mai ușor de îngrijit animale de companie. Au nevoie de hrană, apă și îngrijire minimă.", en: "No, ants are among the easiest pets to care for. They only need food, water, and minimal maintenance." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Подойдут ли муравьи детям?", ro: "Sunt furnicile potrivite pentru copii?", en: "Are ants suitable for children?" })}</summary>
            <p>{t({ ru: "Да, наблюдение за муравьями помогает детям изучать природу и развивать ответственность. Рекомендуется присмотр взрослых для маленьких детей.", ro: "Da, observarea furnicilor îi ajută pe copii să învețe despre natură și responsabilitate. Pentru copiii mici se recomandă supravegherea adulților.", en: "Yes, watching ants helps children learn about nature and responsibility. Adult supervision is recommended for younger children." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Не убегут ли муравьи из формикария?", ro: "Pot furnicile să evadeze din formicariu?", en: "Can ants escape from the formicarium?" })}</summary>
            <p>{t({ ru: "При правильном использовании формикария вероятность побега минимальна. Все формикарии оснащены надёжной защитой.", ro: "Dacă formicariul este utilizat corect, șansele de evadare sunt minime. Toate formicariile au protecție fiabilă.", en: "When used correctly, the chance of ants escaping is minimal. All formicariums include reliable protection." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Чем кормить муравьёв?", ro: "Cu ce se hrănesc furnicile?", en: "What do ants eat?" })}</summary>
            <p>{t({ ru: "Большинство видов питаются семенами, сладкими сиропами и белковой пищей. Мы предоставляем рекомендации по кормлению для каждого вида.", ro: "Majoritatea speciilor consumă semințe, siropuri dulci și hrană proteică. Oferim recomandări pentru fiecare specie.", en: "Most species eat seeds, sweet syrups, and protein-rich food. We provide feeding recommendations for each species." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Есть ли неприятный запах?", ro: "Există miros neplăcut?", en: "Do ant farms smell?" })}</summary>
            <p>{t({ ru: "Нет, при правильном уходе муравьиная ферма не имеет неприятного запаха.", ro: "Nu, o fermă de furnici îngrijită corespunzător nu produce mirosuri neplăcute.", en: "No, a properly maintained ant farm does not produce unpleasant odors." })}</p>
          </details>

          <details className="faq-wrap__item">
            <summary>{t({ ru: "Какой вид лучше выбрать новичку?", ro: "Ce specie este potrivită pentru începători?", en: "Which species is best for beginners?" })}</summary>
            <p>{t({ ru: "Для новичков отлично подходят Messor Structor — неприхотливые муравьи, которые легко содержатся и интересно развиваются.", ro: "Pentru începători recomandăm Messor Structor, o specie ușor de întreținut și foarte interesantă de observat.", en: "Messor Structor is an excellent choice for beginners thanks to its easy care and fascinating colony development." })}</p>
          </details>
        </div>
      </section>
    </>
  );
}
