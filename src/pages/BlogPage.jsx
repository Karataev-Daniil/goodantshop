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
      <h1>Blog</h1>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <article className="blog-card" key={post.id}>
            <div className="blog-card__cover" />
            <div className="blog-card__content">
              <h3>{getText(post.title, lang)}</h3>
              <p>{getText(post.excerpt, lang)}</p>
              <Link className="btn" to={`/${lang}/blog/${post.slug}`}>
                Читать
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
