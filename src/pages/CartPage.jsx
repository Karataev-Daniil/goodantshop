import { useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";

export default function CartPage() {
  const { t, cartIds, updateCartQty, removeFromCart, clearCart } = useOutletContext();
  const { lang = "ru" } = useParams();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState({ type: "", text: "" });
  const [loading, setLoading] = useState(false);

  const submitOrder = async (event) => {
    event.preventDefault();

    if (!firstName.trim() || !lastName.trim() || !phone.trim()) {
      setStatus({
        type: "error",
        text: t({
          ru: "Заполните имя, фамилию и телефон.",
          ro: "Completeaza nume, prenume si telefon.",
          en: "Please fill first name, last name and phone.",
        }),
      });
      return;
    }

    if (cartIds.length === 0) {
      setStatus({
        type: "error",
        text: t({
          ru: "Корзина пуста.",
          ro: "Cosul este gol.",
          en: "Cart is empty.",
        }),
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", text: "" });

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          items: cartIds,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Order sending failed");
      }

      setStatus({
        type: "success",
        text: t({
          ru: "Заказ отправлен. Мы свяжемся с вами.",
          ro: "Comanda a fost trimisa. Te contactam curand.",
          en: "Order sent. We will contact you soon.",
        }),
      });

      setFirstName("");
      setLastName("");
      setPhone("");
      clearCart();
    } catch {
      setStatus({
        type: "error",
        text: t({
          ru: "Не удалось отправить заказ. Попробуйте позже.",
          ro: "Comanda nu a putut fi trimisa. Incearca mai tarziu.",
          en: "Failed to send order. Please try again later.",
        }),
      });
    } finally {
      setLoading(false);
    }
  };

  const getText = (value) => {
    if (value && typeof value === "object") {
      return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
    }
    return value ?? "";
  };

  const catalog = [...ants, ...formicariums];

  const cartItems = cartIds
    .map((cartItem) => {
      const product = catalog.find((entry) => String(entry.id) === String(cartItem.id));
      if (!product) return null;

      return {
        id: cartItem.id,
        title: getText(product.title),
        price: product.priceOptions?.[0]?.value ?? "",
      };
    })
    .filter(Boolean);

  return (
    <section className="section cart-page">
      <h1>{t({ ru: "Корзина", ro: "Cos", en: "Cart" })}</h1>

      <div className="cart-grid">
        <div className="panel cart-items">
          {cartItems.length === 0 ? (
            <p>{t({ ru: "Корзина пока пуста.", ro: "Cosul este gol.", en: "Your cart is empty." })}</p>
          ) : (
            cartItems.map((item) => (
              <article key={`${item.id}`} className="cart-item">
                <div>
                  <h3>{item.title}</h3>
                  {item.price && <p>{item.price}</p>}
                  <p>{t({ ru: "Количество", ro: "Cantitate", en: "Quantity" })}: {item.qty}</p>
                </div>
                <div className="cart-item__controls">
                  <button type="button" className="btn btn-secondary" onClick={() => removeFromCart(item.id)}>
                    {t({ ru: "Удалить", ro: "Sterge", en: "Remove" })}
                  </button>
                </div>
              </article>
            ))
          )}
        </div>

        <form className="panel cart-form" onSubmit={submitOrder}>
          <h2>{t({ ru: "Оформление", ro: "Finalizare", en: "Checkout" })}</h2>
          <label>
            {t({ ru: "Имя", ro: "Prenume", en: "First name" })}
            <input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
          </label>
          <label>
            {t({ ru: "Фамилия", ro: "Nume", en: "Last name" })}
            <input value={lastName} onChange={(e) => setLastName(e.target.value)} />
          </label>
          <label>
            {t({ ru: "Телефон", ro: "Telefon", en: "Phone" })}
            <input value={phone} onChange={(e) => setPhone(e.target.value)} />
          </label>

          {status.text && <p className={`cart-status ${status.type}`}>{status.text}</p>}

          <button type="submit" className="btn" disabled={loading || cartIds.length === 0}>
            {loading
              ? t({ ru: "Отправка...", ro: "Se trimite...", en: "Sending..." })
              : t({ ru: "Отправить заказ", ro: "Trimite comanda", en: "Send order" })}
          </button>
        </form>
      </div>
    </section>
  );
}

