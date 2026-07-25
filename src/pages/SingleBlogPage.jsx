import { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import SEO, {
  breadcrumbSchema,
  articleSchema,
  faqSchema,
  getText,
  SITE_URL,
  SITE_INSTAGRAM,
} from "../components/SEO";
import BlogImage from "../components/BlogImage";
import BlogClip from "../components/BlogClip";
import { blogPosts, getBlogCategory } from "../data/blogPostsData";
import { formatBlogDate } from "./BlogPage";

// Инлайн-ссылки в тексте: синтаксис [подпись](/путь) -> внутренняя ссылка.
const LINK_RE = /\[([^\]]+)\]\((\/[^)]+)\)/g;
function RichText({ value, lang }) {
  const text = getText(value, lang);
  if (!text.includes("](")) return text;
  const nodes = [];
  let last = 0;
  let key = 0;
  let match;
  LINK_RE.lastIndex = 0;
  while ((match = LINK_RE.exec(text)) !== null) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    nodes.push(
      <Link key={key++} to={`/${lang}${match[2]}`}>
        {match[1]}
      </Link>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return <>{nodes}</>;
}

// Рендер одного блока контента. См. список типов в blogPostsData.js.
function ContentBlock({ block, lang, headingId }) {
  switch (block.type) {
    case "lead":
      return (
        <p className="blog-lead">
          <RichText value={block.text} lang={lang} />
        </p>
      );

    case "heading": {
      const Tag = block.level === 3 ? "h3" : "h2";
      return <Tag id={headingId}>{getText(block.text, lang)}</Tag>;
    }

    case "paragraph":
      return (
        <p>
          <RichText value={block.text} lang={lang} />
        </p>
      );

    case "image":
      return <BlogImage image={{ src: block.src, alt: block.alt, caption: block.caption }} lang={lang} />;

    // Несколько фото в ряд (каждое зумируется по отдельности, без галереи).
    case "row":
      return (
        <div className={`blog-row blog-row--${block.images.length}`}>
          {block.images.map((img, i) => (
            <BlogImage key={i} image={img} lang={lang} />
          ))}
        </div>
      );

    // Галереи в блоге нет - если блок всё же встретится, рисуем фото по отдельности.
    case "gallery":
      return (
        <>
          {block.images.map((img, i) => (
            <BlogImage key={i} image={img} lang={lang} />
          ))}
        </>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag className="blog-list">
          {block.items.map((item, i) => (
            <li key={i}>{getText(item, lang)}</li>
          ))}
        </Tag>
      );
    }

    case "steps":
      return (
        <ol className="blog-steps">
          {block.items.map((step, i) => (
            <li className="blog-steps__item" key={i}>
              <span className="blog-steps__num">{i + 1}</span>
              <div>
                <strong>{getText(step.title, lang)}</strong>
                <p>{getText(step.text, lang)}</p>
              </div>
            </li>
          ))}
        </ol>
      );

    case "deflist":
      return (
        <dl className="blog-deflist">
          {block.items.map((item, i) => (
            <div className="blog-deflist__item" key={i}>
              <dt>{getText(item.q, lang)}</dt>
              <dd>
                <RichText value={item.a} lang={lang} />
              </dd>
            </div>
          ))}
        </dl>
      );

    case "accordion":
      return (
        <div className="blog-accordion">
          {block.items.map((item, i) => (
            <details className="faq-wrap__item" key={i}>
              <summary>{getText(item.q, lang)}</summary>
              <p>
                <RichText value={item.a} lang={lang} />
              </p>
            </details>
          ))}
        </div>
      );

    case "callout":
      return (
        <aside className={`blog-callout blog-callout--${block.variant || "note"}`}>
          {block.title && <strong>{getText(block.title, lang)}</strong>}
          <p>
            <RichText value={block.text} lang={lang} />
          </p>
        </aside>
      );

    case "quote":
      return (
        <blockquote className="blog-quote">
          <p>{getText(block.text, lang)}</p>
          {block.author && <cite>{block.author}</cite>}
        </blockquote>
      );

    case "keytakeaways":
      return (
        <aside className="blog-takeaways">
          <strong>{getText(block.title || { ru: "Коротко", ro: "Pe scurt", en: "In short" }, lang)}</strong>
          <ul>
            {block.items.map((item, i) => (
              <li key={i}>{getText(item, lang)}</li>
            ))}
          </ul>
        </aside>
      );

    case "video":
      return (
        <div className="blog-video">
          <iframe
            src={block.src}
            title={getText(block.title, lang) || "video"}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      );

    // Локальный ролик (mp4 из public/videos) как «живая гифка» с зумом по клику.
    case "clip":
      return <BlogClip clip={block} lang={lang} />;

    case "cta":
      return (
        <div className="blog-cta">
          <p>{getText(block.text, lang)}</p>
          <Link className="btn" to={`/${lang}${block.to}`}>
            {getText(block.buttonLabel, lang)}
          </Link>
        </div>
      );

    default:
      return null;
  }
}

export default function SingleBlogPage() {
  const { slug, lang = "ru" } = useParams();
  const post = blogPosts.find((item) => item.slug === slug);

  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(null);
  const [copied, setCopied] = useState(false);

  // Оглавление собираем из заголовков H2.
  const content = post?.content ?? [];
  const headings = useMemo(
    () =>
      content
        .map((block, index) =>
          block.type === "heading" && (block.level || 2) === 2
            ? { id: `sec-${index}`, text: block.text }
            : null
        )
        .filter(Boolean),
    [content]
  );

  // Полоса прогресса чтения (по всей странице).
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const max = el.scrollHeight - el.clientHeight;
      setProgress(max > 0 ? Math.min(100, (el.scrollTop / max) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [slug]);

  // Подсветка активного раздела в оглавлении.
  useEffect(() => {
    if (headings.length < 2) return;
    const els = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
    if (!els.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-25% 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [slug, headings.length]);

  if (!post) {
    return (
      <article className="section blog-single">
        <SEO
          lang={lang}
          path="/blog"
          title={{ ru: "Статья не найдена | GoodAntShop", ro: "Articolul nu a fost găsit | GoodAntShop", en: "Article not found | GoodAntShop" }}
          description={{ ru: "Статья не найдена.", ro: "Articolul nu a fost găsit.", en: "Article not found." }}
          robots="noindex,follow"
        />
        <div className="panel">
          <h1>{getText({ ru: "Статья не найдена", ro: "Articolul nu a fost găsit", en: "Article not found" }, lang)}</h1>
          <Link className="btn" to={`/${lang}/blog`}>
            {getText({ ru: "Ко всем постам", ro: "La toate articolele", en: "Back to all posts" }, lang)}
          </Link>
        </div>
      </article>
    );
  }

  const category = getBlogCategory(post.category);
  const postPath = `/blog/${post.slug}`;
  const shareUrl =
    typeof window !== "undefined" ? window.location.href : `${SITE_URL}/${lang}${postPath}`;
  const shareTitle = getText(post.title, lang);
  // «Читайте дальше»: сначала явно связанные посты, затем добираем остальными,
  // чтобы блок не пустовал. Максимум два - под сетку в две колонки.
  const relatedPosts = [
    ...(post.relatedPostIds ?? []).map((id) => blogPosts.find((item) => item.id === id)),
    ...blogPosts,
  ]
    .filter((item) => item && item.slug !== slug)
    .filter((item, index, arr) => arr.findIndex((x) => x.id === item.id) === index)
    .slice(0, 2);

  const breadcrumbItems = [
    { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
    { name: { ru: "Блог", ro: "Blog", en: "Blog" }, path: "/blog" },
    ...(category ? [{ name: category.label, path: postPath }] : []),
    { name: post.title, path: postPath },
  ];

  const copyLink = () => {
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(shareUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      });
    }
  };

  return (
    <article className="blog-single">
      <SEO
        lang={lang}
        path={postPath}
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        image={post.cover?.src}
        type="article"
        jsonLd={[
          breadcrumbSchema(lang, breadcrumbItems),
          articleSchema(post, lang, postPath),
          ...(post.faq?.length ? [faqSchema(lang, post.faq)] : []),
        ]}
      />

      <div className="reading-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>

      {/* Компактный full-bleed hero - как на главной, но по высоте контента */}
      <header className="blog-hero">
        <div className="blog-hero__band" aria-hidden="true">
          {post.cover?.src && (
            <div
              className="blog-hero__bg"
              style={{ backgroundImage: `url(${post.cover.src})` }}
            />
          )}
          <div className="blog-hero__scrim" />
        </div>
        <div className="blog-hero__inner">
          <nav className="blog-breadcrumbs" aria-label="breadcrumbs">
            <Link to={`/${lang}`}>{getText({ ru: "Главная", ro: "Acasă", en: "Home" }, lang)}</Link>
            <span aria-hidden="true">/</span>
            <Link to={`/${lang}/blog`}>{getText({ ru: "Блог", ro: "Blog", en: "Blog" }, lang)}</Link>
            {category && (
              <>
                <span aria-hidden="true">/</span>
                <span>{getText(category.label, lang)}</span>
              </>
            )}
          </nav>
          <div className="blog-hero__body">
            <h1>{getText(post.title, lang)}</h1>
            <p className="blog-hero__excerpt">{getText(post.excerpt, lang)}</p>
          </div>
          <div className="blog-hero__meta">
            <time dateTime={post.datePublished}>{formatBlogDate(post.datePublished, lang)}</time>
            {post.author?.name && <span>· {post.author.name}</span>}
            {post.readingTime && (
              <span>
                · {post.readingTime} {getText({ ru: "мин чтения", ro: "min de citit", en: "min read" }, lang)}
              </span>
            )}
          </div>
        </div>
      </header>

      <div className="section blog-layout">
        <div className="blog-content">
          {post.video && (
            <div className="blog-video blog-video--main">
              <iframe
                src={post.video.embedUrl}
                title={getText(post.video.name, lang)}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}

          {content.map((block, index) => (
            <ContentBlock
              key={index}
              block={block}
              lang={lang}
              headingId={block.type === "heading" ? `sec-${index}` : undefined}
            />
          ))}

          {/* Шеринг */}
          <div className="blog-share">
            <span className="blog-share__label">{getText({ ru: "Поделиться:", ro: "Distribuie:", en: "Share:" }, lang)}</span>

            <a
              className="blog-share__btn blog-share__btn--tg"
              href={`https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              title="Telegram"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 2 11 13" />
                <path d="M22 2 15 22l-4-9-9-4 20-7z" />
              </svg>
            </a>

            <a
              className="blog-share__btn blog-share__btn--vk"
              href={`https://vk.com/share.php?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="ВКонтакте"
              title="ВКонтакте"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M15.07 2H8.93C3.33 2 2 3.33 2 8.93v6.14C2 20.67 3.33 22 8.93 22h6.14c5.6 0 6.93-1.33 6.93-6.93V8.93C22 3.33 20.67 2 15.07 2zm3.15 14.27h-1.46c-.55 0-.72-.44-1.71-1.44-.86-.83-1.24-.94-1.45-.94-.3 0-.39.08-.39.5v1.31c0 .36-.12.58-1.07.58-1.57 0-3.31-.95-4.54-2.72C5.4 11.1 4.9 9.32 4.9 8.96c0-.22.08-.42.5-.42h1.46c.37 0 .51.17.66.57.72 2.09 1.93 3.92 2.43 3.92.19 0 .27-.08.27-.56V10.3c-.06-1.01-.59-1.1-.59-1.46 0-.17.14-.34.37-.34h2.3c.31 0 .42.17.42.54v2.9c0 .31.14.42.23.42.19 0 .34-.11.68-.45 1.05-1.18 1.8-3 1.8-3 .1-.22.27-.42.64-.42h1.46c.44 0 .53.22.44.54-.18.85-1.97 3.37-1.97 3.37-.16.25-.22.36 0 .64.16.22.69.66 1.04 1.07.64.73 1.13 1.34 1.27 1.76.12.42-.09.63-.51.63z" />
              </svg>
            </a>

            <a
              className="blog-share__btn blog-share__btn--x"
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareTitle)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X (Twitter)"
              title="X (Twitter)"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>

            <a
              className="blog-share__btn blog-share__btn--ig"
              href={SITE_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163C8.741 0 8.332.014 7.052.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
              </svg>
            </a>

            <button
              type="button"
              className={`blog-share__btn${copied ? " is-copied" : ""}`}
              onClick={copyLink}
              aria-label={getText(copied ? { ru: "Скопировано", ro: "Copiat", en: "Copied" } : { ru: "Копировать ссылку", ro: "Copiază linkul", en: "Copy link" }, lang)}
              title={getText(copied ? { ru: "Скопировано", ro: "Copiat", en: "Copied" } : { ru: "Копировать ссылку", ro: "Copiază linkul", en: "Copy link" }, lang)}
            >
              {copied ? (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M20 6 9 17l-5-5" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="9" y="9" width="11" height="11" rx="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}
            </button>
          </div>

          {post.faq?.length > 0 && (
            <section className="blog-single__faq">
              <h2>{getText({ ru: "Частые вопросы", ro: "Întrebări frecvente", en: "FAQ" }, lang)}</h2>
              <div className="blog-accordion">
                {post.faq.map((item) => (
                  <details className="faq-wrap__item" key={getText(item.q, lang)}>
                    <summary>{getText(item.q, lang)}</summary>
                    <p>
                      <RichText value={item.a} lang={lang} />
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {relatedPosts.length > 0 && (
            <section className="blog-single__related">
              <h2>{getText({ ru: "Читайте также", ro: "Citește și", en: "Read also" }, lang)}</h2>
              <div className="blog-grid">
                {relatedPosts.map((rel) => {
                  return (
                    <article className="blog-card" key={rel.id}>
                      <Link className="blog-card__cover" to={`/${lang}/blog/${rel.slug}`} aria-label={getText(rel.title, lang)}>
                        <img src={rel.cover.src} alt={getText(rel.cover.alt, lang)} loading="lazy" />
                      </Link>
                      <div className="blog-card__content">
                        <h3>
                          <Link to={`/${lang}/blog/${rel.slug}`}>{getText(rel.title, lang)}</Link>
                        </h3>
                        <p>{getText(rel.excerpt, lang)}</p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <Link className="btn btn-secondary blog-single__back" to={`/${lang}/blog`}>
            ← {getText({ ru: "Ко всем постам", ro: "La toate articolele", en: "Back to all posts" }, lang)}
          </Link>
        </div>

        {headings.length >= 2 && (
          <aside className="blog-toc" aria-label={getText({ ru: "Содержание", ro: "Cuprins", en: "Contents" }, lang)}>
            <p className="blog-toc__title">{getText({ ru: "В этой статье", ro: "În acest articol", en: "In this article" }, lang)}</p>
            <ul>
              {headings.map((heading) => (
                <li key={heading.id}>
                  <a
                    href={`#${heading.id}`}
                    className={activeId === heading.id ? "is-active" : ""}
                  >
                    {getText(heading.text, lang)}
                  </a>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
