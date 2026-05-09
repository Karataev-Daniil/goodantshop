import { Link, useParams } from "react-router-dom";
import SpecsTable from "../components/SpecsTable";
import { ants } from "../data/antsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }

  return value ?? "";
};

export default function SingleAntPage() {
  const { slug, lang = "ru" } = useParams();
  const ant = ants.find((item) => item.slug === slug);

  if (!ant) {
    return (
      <article className="section single-page single-ant-page">
        <div className="panel">
          <h1>Муравей не найден</h1>
          <Link className="btn" to={`/${lang}/ants`}>
            Назад в каталог
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="section single-page single-ant-page">
      <header className="single-hero">
        <div className="single-hero__media">
          <img src={ant.image} alt={getText(ant.title, lang)} />
        </div>
        <div className="single-hero__content">
          <p className="single-hero__kicker">Ant Profile</p>
          <h1 className="single-hero__title">{getText(ant.title, lang)}</h1>
          <p className="single-hero__lead">{getText(ant.excerpt, lang)}</p>
          <div className="single-hero__actions">
            <Link className="btn" to={`/${lang}/ants`}>
              Назад в каталог
            </Link>
          </div>
        </div>
      </header>

      <section className="single-grid">
        <div className="panel">
          <h2>О виде</h2>
          {ant.description ? (
            <div>{getText(ant.description, lang)}</div>
          ) : (
            <div>
              <div className="panel__placeholder" />
              <div className="panel__placeholder" />
              <div className="panel__placeholder panel__placeholder--short" />
            </div>
          )}
        </div>

        <aside className="panel panel--stacked">
          <h2>Характеристики</h2>
          {ant.characteristics?.length ? (
            <SpecsTable specs={ant.characteristics} />
          ) : (
            <div className="specs-skeleton">
              <div className="specs-skeleton__row" />
              <div className="specs-skeleton__row" />
              <div className="specs-skeleton__row" />
              <div className="specs-skeleton__row" />
            </div>
          )}
        </aside>
      </section>

      <section className="section panel">
        <h2>Рекомендованные формикарии</h2>
        <div className="related-grid">
          <div className="related-card" />
          <div className="related-card" />
          <div className="related-card" />
        </div>
      </section>
    </article>
  );
}
