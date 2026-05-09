import { Link, useParams } from "react-router-dom";

export default function FormicPage() {
  const { lang = "ru" } = useParams();

  return (
    <article className="section single-page single-formic-page">
      <header className="single-hero">
        <div className="single-hero__media" />
        <div className="single-hero__content">
          <p className="single-hero__kicker">Formicarium</p>
          <h1 className="single-hero__title">...</h1>
          <p className="single-hero__lead">...</p>
          <div className="single-hero__actions">
            <Link className="btn" to={`/${lang}/formicariums`}>
              Назад в каталог
            </Link>
          </div>
        </div>
      </header>

      <section className="single-grid">
        <div className="panel">
          <h2>Описание модели</h2>
          <div className="panel__placeholder" />
          <div className="panel__placeholder" />
          <div className="panel__placeholder panel__placeholder--short" />
        </div>

        <aside className="panel panel--stacked">
          <h2>Параметры</h2>
          <div className="specs-skeleton">
            <div className="specs-skeleton__row" />
            <div className="specs-skeleton__row" />
            <div className="specs-skeleton__row" />
            <div className="specs-skeleton__row" />
          </div>
        </aside>
      </section>

      <section className="section panel">
        <h2>Галерея</h2>
        <div className="gallery-grid">
          <div className="gallery-tile" />
          <div className="gallery-tile" />
          <div className="gallery-tile" />
          <div className="gallery-tile" />
        </div>
      </section>
    </article>
  );
}
