import { useOutletContext, useParams } from "react-router-dom";
import SEO, {
  breadcrumbSchema,
  pageSeo,
  SITE_PHONE,
  SITE_PHONE_DISPLAY,
} from "../components/SEO";

export default function ContactsPage() {
  const { t } = useOutletContext();
  const { lang = "ru" } = useParams();

  const channels = [
    {
      label: t({ ru: "Телефон", ro: "Telefon", en: "Phone" }),
      value: SITE_PHONE_DISPLAY,
      href: `tel:${SITE_PHONE}`,
      hint: t({
        ru: "Звонки и сообщения с 10:00 до 22:00",
        ro: "Apeluri și mesaje între 10:00 și 22:00",
        en: "Calls and messages from 10:00 to 22:00",
      }),
    },
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
    <>
      <SEO
        lang={lang}
        path="/contacts"
        title={pageSeo.contacts.title}
        description={pageSeo.contacts.description}
        jsonLd={breadcrumbSchema(lang, [
          { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
          { name: { ru: "Контакты", ro: "Contacte", en: "Contacts" }, path: "/contacts" },
        ])}
      />

      <section className="section contacts-page">
        <header className="section-heading">
          <p className="kicker">
            {t({
              ru: "Контакты",
              ro: "Contacte",
              en: "Contacts",
            })}
          </p>

          <h1>
            {t({
              ru: "Свяжитесь с нами",
              ro: "Contactează-ne",
              en: "Get in touch",
            })}
          </h1>
        </header>

        <div className="contacts-grid">
          {channels.map((channel) => (
            <article className="contact-card" key={channel.label}>
              <span className="contact-card__label">{channel.label}</span>

              {channel.href ? (
                <a
                  className="contact-card__value"
                  href={channel.href}
                  {...(channel.external
                    ? {
                        target: "_blank",
                        rel: "noopener noreferrer",
                      }
                    : {})}
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
    </>
  );
}
