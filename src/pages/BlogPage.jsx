import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPostsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function BlogPage() {
  const { lang = "ru" } = useParams();

  return (
    <section className="section">
      <header className="section-heading">
        <div>
          <h1>{getText({ ru: "Блог", ro: "Blog", en: "Blog" }, lang)}</h1>
          <p>{getText({ ru: "Полезные статьи про выбор муравьёв, формикариев и уход за колонией.", ro: "Articole utile despre alegerea furnicilor, formicariilor și îngrijirea coloniei.", en: "Helpful articles about choosing ants, formicariums, and colony care." }, lang)}</p>
        </div>
      </header>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.id}>
            <div className="blog-card__cover" />
            <div className="blog-card__content">
              <h3>{getText(post.title, lang)}</h3>
              <p>{getText(post.excerpt, lang)}</p>
              <Link className="btn" to={`/${lang}/blog/${post.slug}`}>
                {getText({ ru: "Читать", ro: "Citește", en: "Read" }, lang)}
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
