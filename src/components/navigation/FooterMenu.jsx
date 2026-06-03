export default function FooterMenu({ curLang }) {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <strong>GOODANTSHOP</strong>
          <p>Муравьи, формикарии и уход для начинающих по всей Молдове.</p>
        </div>
        <div className="footer-links">
          <a href="https://t.me/goodantshop" target="_blank" rel="noreferrer">
            Telegram
          </a>
          <a href={`/${curLang}/blog`}>Блог</a>
          <a href="https://www.google.com/search?q=goodantshop+муравьи" target="_blank" rel="noreferrer">
            SEO
          </a>
        </div>
      </div>
    </footer>
  );
}
