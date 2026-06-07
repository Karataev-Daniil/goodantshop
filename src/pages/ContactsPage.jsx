import { useOutletContext } from "react-router-dom";

export default function ContactsPage() {
  const { t } = useOutletContext();

  const channels = [
    {
      label: "Telegram",
      value: "@goodantshop",
      href: "https://t.me/GoodAnt_Shop",
      external: true,
      hint: t({
        ru: "Быстрый ответ в течение дня",
        ro: "Răspuns rapid în aceeași zi",
        en: "Quick reply within a day",
      }),
    },
    {
      label: "Email",
      value: "info@goodantshop.md",
      href: "mailto:info@goodantshop.md",
      hint: t({
        ru: "Для заказов и сотрудничества",
        ro: "Pentru comenzi și colaborare",
        en: "For orders and partnerships",
      }),
    },
    {
      label: t({ ru: "Доставка", ro: "Livrare", en: "Delivery" }),
      value: t({ ru: "По всей Молдове", ro: "În toată Moldova", en: "Across Moldova" }),
      hint: t({
        ru: "Безопасная упаковка колоний и поддержка после покупки",
        ro: "Ambalaj sigur pentru colonii și suport după achiziție",
        en: "Safe colony packaging and post-purchase support",
      }),
    },
  ];

  return (
    <section className="section contacts-page">
      <header className="section-heading">
        <p className="kicker">{t({ ru: "Контакты", ro: "Contacte", en: "Contacts" })}</p>
        <h1>{t({ ru: "Свяжитесь с нами", ro: "Contactează-ne", en: "Get in touch" })}</h1>
      </header>

      <div className="contacts-grid">
        {channels.map((channel) => (
          <article className="contact-card" key={channel.label}>
            <span className="contact-card__label">{channel.label}</span>
            {channel.href ? (
              <a
                className="contact-card__value"
                href={channel.href}
                {...(channel.external ? { target: "_blank", rel: "noreferrer" } : {})}
              >
                {channel.value}
              </a>
            ) : (
              <span className="contact-card__value">{channel.value}</span>
            )}
            <p className="contact-card__hint">{channel.hint}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
