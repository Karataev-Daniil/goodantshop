import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import SEO, { breadcrumbSchema, pageSeo } from "../components/SEO";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

const priceNumber = (product) => {
  const option = product.priceOptions?.find((o) => o.selected) || product.priceOptions?.[0];
  return parseInt(String(option?.value || "").replace(/[^\d]/g, ""), 10) || 0;
};

const countWord = (count, lang) => {
  if (lang === "ro") return count === 1 ? "produs" : "produse";
  if (lang === "en") return count === 1 ? "item" : "items";
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return "товар";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20)) return "товара";
  return "товаров";
};

export default function CartPage() {
  const { t, cartIds, removeFromCart, clearCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const catalog = [...ants, ...formicariums];

  // Group cart lines by product — one line equals one unit
  const groupsMap = new Map();
  cartIds.forEach((line) => {
    const product = catalog.find((entry) => String(entry.id) === String(line.id));
    if (!product) return;
    const key = String(line.id);
    if (!groupsMap.has(key)) groupsMap.set(key, { product, qty: 0, uids: [] });
    const group = groupsMap.get(key);
    group.qty += 1;
    group.uids.push(line.uid);
  });
  const groups = [...groupsMap.values()];

  const totalQty = groups.reduce((sum, group) => sum + group.qty, 0);
  const itemsTotal = groups.reduce((sum, group) => sum + priceNumber(group.product) * group.qty, 0);
  const currency = t({ ru: "лей", ro: "lei", en: "lei" });
  const fmt = (value) => `${value} ${currency}`;

  const removeGroup = (uids) => uids.forEach((uid) => removeFromCart(uid));

  const submitOrder = async (event) => {
    event.preventDefault();

    if (!name.trim() || !phone.trim() || !address.trim()) {
      setStatus({
        type: "error",
        text: t({
          ru: "Заполните имя, телефон и адрес доставки.",
          ro: "Completează numele, telefonul și adresa de livrare.",
          en: "Please fill in name, phone and delivery address.",
        }),
      });
      return;
    }

    if (groups.length === 0) {
      setStatus({ type: "error", text: t({ ru: "Корзина пуста.", ro: "Coșul este gol.", en: "Cart is empty." }) });
      return;
    }

    setLoading(true);
    setStatus({ type: "", text: "" });

    const orderItems = groups.map((group) => {
      const unit = priceNumber(group.product);
      return {
        title: getText(group.product.title, lang),
        qty: group.qty,
        price: fmt(unit),
        lineTotal: fmt(unit * group.qty),
      };
    });

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          address,
          comment,
          items: orderItems,
          itemsTotal: fmt(itemsTotal),
          total: fmt(itemsTotal),
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Order sending failed");
      }

      setStatus({
        type: "success",
        text: t({
          ru: "Заказ отправлен. Мы свяжемся с вами для подтверждения доставки.",
          ro: "Comanda a fost trimisă. Te contactăm pentru a confirma livrarea.",
          en: "Order sent. We will contact you to confirm delivery.",
        }),
      });

      setName("");
      setPhone("");
      setAddress("");
      setComment("");
      clearCart();
    } catch {
      setStatus({
        type: "error",
        text: t({
          ru: "Не удалось отправить заказ. Попробуйте позже.",
          ro: "Comanda nu a putut fi trimisă. Încearcă mai târziu.",
          en: "Failed to send order. Please try again later.",
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        lang={lang}
        path="/cart"
        title={pageSeo.cart.title}
        description={pageSeo.cart.description}
        robots="noindex,nofollow"
        jsonLd={breadcrumbSchema(lang, [
          { name: { ru: "Главная", ro: "Acasă", en: "Home" }, path: "/" },
          { name: { ru: "Корзина", ro: "Coș", en: "Cart" }, path: "/cart" },
        ])}
      />
      <section className="section checkout">
        <header className="checkout__head">
          <h1>{t({ ru: "Корзина", ro: "Coș", en: "Cart" })}</h1>
          {totalQty > 0 && (
            <p className="checkout__count">
              {totalQty} {countWord(totalQty, lang)}
            </p>
          )}
        </header>

        {status.text && <p className={`checkout-status checkout-status--${status.type}`}>{status.text}</p>}

        {groups.length === 0 ? (
          <div className="checkout-empty">
            {status.type !== "success" && (
              <p>{t({ ru: "Корзина пока пуста.", ro: "Coșul este încă gol.", en: "Your cart is empty." })}</p>
            )}
            <Link className="btn" to={`/${lang}/ants`}>
              {t({ ru: "Перейти к каталогу", ro: "Mergi la catalog", en: "Go to catalog" })}
            </Link>
          </div>
        ) : (
          <>
            <div className="checkout-items">
              {groups.map((group) => {
                const unit = priceNumber(group.product);
                const image = group.product.images?.[0] || group.product.image || "/placeholder-ant.svg";
                return (
                  <article className="checkout-item" key={group.product.id}>
                    <div className="checkout-item__media">
                      <img src={image} alt={getText(group.product.title, lang)} loading="lazy" />
                    </div>
                    <div className="checkout-item__info">
                      <h3>{getText(group.product.title, lang)}</h3>
                      <p>{getText(group.product.excerpt, lang)}</p>
                      <div className="checkout-item__meta">
                        <span>
                          {t({ ru: "Цена за единицу", ro: "Preț per unitate", en: "Unit price" })}: {fmt(unit)}
                        </span>
                        <span>
                          {t({ ru: "Количество", ro: "Cantitate", en: "Quantity" })}: {group.qty}
                        </span>
                      </div>
                      <button type="button" className="checkout-item__remove" onClick={() => removeGroup(group.uids)}>
                        {t({ ru: "Удалить", ro: "Șterge", en: "Remove" })}
                      </button>
                    </div>
                    <div className="checkout-item__total">{fmt(unit * group.qty)}</div>
                  </article>
                );
              })}
            </div>

            <div className="checkout-summary">
              <div className="checkout-summary__row">
                <span>{t({ ru: "Стоимость товаров", ro: "Costul produselor", en: "Items cost" })}</span>
                <span>{fmt(itemsTotal)}</span>
              </div>
              <div className="checkout-summary__row checkout-summary__row--total">
                <span>{t({ ru: "Общая сумма", ro: "Total", en: "Total" })}</span>
                <strong>{fmt(itemsTotal)}</strong>
              </div>
            </div>

            <form className="checkout-form" onSubmit={submitOrder}>
              <h2>{t({ ru: "Оформление заказа", ro: "Finalizarea comenzii", en: "Checkout" })}</h2>

              <label className="checkout-field">
                <span>{t({ ru: "Имя", ro: "Nume", en: "Name" })}</span>
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>

              <label className="checkout-field">
                <span>{t({ ru: "Телефон", ro: "Telefon", en: "Phone" })}</span>
                <input value={phone} onChange={(e) => setPhone(e.target.value)} inputMode="tel" autoComplete="tel" />
              </label>

              <label className="checkout-field">
                <span>{t({ ru: "Адрес доставки", ro: "Adresa de livrare", en: "Delivery address" })}</span>
                <input value={address} onChange={(e) => setAddress(e.target.value)} autoComplete="street-address" />
              </label>

              <label className="checkout-field">
                <span>
                  {t({ ru: "Комментарий к заказу", ro: "Comentariu la comandă", en: "Order comment" })}{" "}
                  <em>{t({ ru: "(необязательно)", ro: "(opțional)", en: "(optional)" })}</em>
                </span>
                <textarea value={comment} onChange={(e) => setComment(e.target.value)} rows={3} />
              </label>

              <button type="submit" className="btn checkout-submit" disabled={loading}>
                {loading
                  ? t({ ru: "Отправка...", ro: "Se trimite...", en: "Sending..." })
                  : t({ ru: "Оформить заказ", ro: "Trimite comanda", en: "Place order" })}
              </button>

              <p className="checkout-note">
                {t({
                  ru: "После оформления мы свяжемся с вами для подтверждения доставки.",
                  ro: "După plasarea comenzii te contactăm pentru a confirma livrarea.",
                  en: "After you place the order we will contact you to confirm delivery.",
                })}
              </p>
            </form>
          </>
        )}
      </section>
    </>
  );
}
