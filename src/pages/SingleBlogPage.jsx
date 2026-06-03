import { Link, useParams } from "react-router-dom";
import { blogPosts } from "../data/blogPostsData";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

export default function SingleBlogPage() {
  const { slug, lang = "ru" } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  if (!post) {
    return (
      <article className="section blog-single">
        <div className="panel">
          <h1>{getText({ ru: "Статья не найдена", ro: "Articolul nu a fost găsit", en: "Article not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/blog`}>
            {getText({ ru: "Ко всем постам", ro: "La toate articolele", en: "Back to all posts" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article className="section blog-single">
      <header className="blog-single__hero">
        <div className="blog-single__media" />
        <div className="blog-single__meta">
          <p className="kicker">{getText({ ru: "Статья", ro: "Articol", en: "Article" }, lang)}</p>
          <h1>{getText(post.title, lang)}</h1>
          <p>{getText(post.excerpt, lang)}</p>
          <Link className="btn" to={`/${lang}/blog`}>
            {getText({ ru: "Ко всем постам", ro: "La toate articolele", en: "Back to all posts" }, lang)}
          </Link>
        </div>
      </header>

      <section className="blog-single__content panel">
        {post.content?.map((block, index) => (
          <p key={index}>{getText(block, lang)}</p>
        ))}
      </section>
    </article>
  );
}
