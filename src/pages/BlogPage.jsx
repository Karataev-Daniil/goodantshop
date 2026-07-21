import { Link, useParams } from "react-router-dom";
import SEO, { breadcrumbSchema, itemListSchema, pageSeo, getText } from "../components/SEO";
import { blogPosts } from "../data/blogPostsData";

const LOCALES = { ru: "ru-RU", ro: "ro-RO", en: "en-US" };

export const formatBlogDate = (value, lang = "ru") => {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(LOCALES[lang] || LOCALES.ru, {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  } catch {
    return value;
  }
};

// Компактная карточка поста для сетки архива.
function BlogCard({ post, lang }) {
  return (
    <article className="blog-card">
      <Link className="blog-card__cover" to={`/${lang}/blog/${post.slug}`} aria-label={getText(post.title, lang)}>
        <img
          src={post.cover.src}
          alt={getText(post.cover.alt, lang)}
          width={post.cover.width}
          height={post.cover.height}
          loading="lazy"
        />
      </Link>
      <div className="blog-card__content">
        <h3>
          <Link to={`/${lang}/blog/${post.slug}`}>{getText(post.title, lang)}</Link>
        </h3>
        <p>{getText(post.excerpt, lang)}</p>
        <div className="blog-card__meta">
          <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished, lang)}</time>
          {post.readingTime && (
            <span>
              {post.readingTime} {getText({ ru: "мин", ro: "min", en: "min" }, lang)}
            </span>
          )}
        </div>
        <Link className="btn btn-light" to={`/${lang}/blog/${post.slug}`}>
          {getText({ ru: "Читать", ro: "Citește", en: "Read" }, lang)}
        </Link>
      </div>
    </article>
  );
}

export default function BlogPage() {
  const { lang = "ru" } = useParams();

  // Первый (новейший) пост показываем крупной featured-карточкой, остальные - сеткой.
  const featured = blogPosts[0] || null;
  const rest = blogPosts.slice(1);

  return (
    <>
      <SEO
        lang={lang}
        path="/blog"
        title={pageSeo.blog.title}
        description={pageSeo.blog.description}
        jsonLd={[
          breadcrumbSchema(lang, [
            { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
            { name: { ru: "Блог", ro: "Blog", en: "Blog" }, path: "/blog" },
          ]),
          itemListSchema(lang, blogPosts, (post) => `/blog/${post.slug}`),
        ]}
      />

      <section className="section blog-archive">
        <header className="section-heading blog-archive__head">
          <div>
            <p className="kicker">{getText({ ru: "Блог", ro: "Blog", en: "Blog" }, lang)}</p>
            <h1>
              {getText(
                { ru: "Гид по миру муравьёв", ro: "Ghid în lumea furnicilor", en: "A guide to the ant world" },
                lang
              )}
            </h1>
            <p className="blog-archive__lead">
              {getText(
                {
                  ru: "Полезные статьи про выбор муравьёв и формикариев, уход за колонией и обзоры видов - для новичков и опытных киперов.",
                  ro: "Articole utile despre alegerea furnicilor și formicariilor, îngrijirea coloniei și prezentări de specii - pentru începători și avansați.",
                  en: "Helpful articles on choosing ants and formicariums, colony care and species guides - for beginners and experienced keepers.",
                },
                lang
              )}
            </p>
          </div>
        </header>

        {!featured && (
          <p className="blog-archive__empty">
            {getText(
              { ru: "Статьи скоро появятся.", ro: "Articolele vor apărea în curând.", en: "Articles coming soon." },
              lang
            )}
          </p>
        )}

        {featured && (
          <Link className="blog-featured" to={`/${lang}/blog/${featured.slug}`}>
            <div className="blog-featured__media">
              <img src={featured.cover.src} alt={getText(featured.cover.alt, lang)} loading="lazy" />
            </div>
            <div className="blog-featured__body">
              <div className="blog-featured__tags">
                <span className="blog-chip blog-chip--accent">
                  {getText({ ru: "Читать в первую очередь", ro: "De citit primul", en: "Read first" }, lang)}
                </span>
              </div>
              <h2>{getText(featured.title, lang)}</h2>
              <p>{getText(featured.excerpt, lang)}</p>
              <div className="blog-card__meta">
                <time dateTime={featured.datePublished}>{formatBlogDate(featured.datePublished, lang)}</time>
                {featured.readingTime && (
                  <span>
                    {featured.readingTime} {getText({ ru: "мин чтения", ro: "min de citit", en: "min read" }, lang)}
                  </span>
                )}
              </div>
              <span className="btn blog-featured__btn">{getText({ ru: "Читать статью", ro: "Citește articolul", en: "Read article" }, lang)}</span>
            </div>
          </Link>
        )}

        {rest.length > 0 && (
          <div className="blog-grid">
            {rest.map((post) => (
              <BlogCard post={post} lang={lang} key={post.id} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
