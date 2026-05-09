import { Link, useParams } from "react-router-dom";

export default function SingleBlogPage() {
  const { lang = "ru" } = useParams();

  return (
    <article className="section blog-single">
      <header className="blog-single__hero">
        <div className="blog-single__media" />
        <div className="blog-single__meta">
          <p className="kicker">Blog Post</p>
          <h1>...</h1>
          <p>...</p>
          <Link className="btn" to={`/${lang}/blog`}>
            Ко всем постам
          </Link>
        </div>
      </header>

      <section className="blog-single__content panel">
        <div className="panel__placeholder" />
        <div className="panel__placeholder" />
        <div className="panel__placeholder panel__placeholder--short" />
        <div className="panel__placeholder" />
        <div className="panel__placeholder" />
      </section>
    </article>
  );
}
