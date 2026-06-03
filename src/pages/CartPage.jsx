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
  const [itemOptions, setItemOptions] = useState({});

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

    const orderItems = cartItems.map((item) => {
      const selectedPriceIndex = itemOptions[item.lineId]?.priceIndex ?? 0;
      const selectedPrice = item.priceOptions[selectedPriceIndex];
      const selectedColorValue = itemOptions[item.lineId]?.colorValue ?? item.colorOptions?.[0]?.value ?? "";
      const selectedColor = item.colorOptions.find((option) => option.value === selectedColorValue);
      const cartItem = cartIds.find((cartItem) => cartItem.uid === item.lineId);

      return {
        title: getText(item.title),
        qty: cartItem?.qty > 0 ? cartItem.qty : 1,
        variant: selectedColor ? getText(selectedColor.label) : "",
        price: selectedPrice?.value || selectedPrice?.label || "",
      };
    });

    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          items: orderItems,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Order sending failed");
      }

      setStatus({
        type: "success",
        text: t({
          ru: "Заказ отправлен. Мы свяжемся с вами для обсуждения доставки.",
          ro: "Comanda a fost trimisa. Te contactam pentru a discuta livrarea.",
          en: "Order sent. We will contact you to discuss delivery.",
        }),
      });

      setFirstName("");
      setLastName("");
      setPhone("");
      setItemOptions({});
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
        lineId: cartItem.uid,
        id: cartItem.id,
        product,
        title: {
          ru: product.title.ru,
          ro: product.title.ro,
          en: product.title.en,
        },
        priceOptions: product.priceOptions ?? [],
        colorOptions: product.colorOptions ?? [],
      };
    })
    .filter(Boolean);

  const updateItemOptions = (lineId, option) => {
    setItemOptions((prev) => ({
      ...prev,
      [lineId]: { ...(prev[lineId] || {}), ...option },
    }));
  };

  return (
    <section className="section cart-page">
      <h1>{t({ ru: "Корзина", ro: "Cos", en: "Cart" })}</h1>

      <div className="cart-grid">
        <div className="panel cart-items">
          {cartItems.length === 0 ? (
            <p>{t({ ru: "Корзина пока пуста.", ro: "Cosul este gol.", en: "Your cart is empty." })}</p>
          ) : (
            cartItems.map((item) => {
              const selectedPriceIndex = itemOptions[item.lineId]?.priceIndex ?? 0;
              const selectedColorValue =
                itemOptions[item.lineId]?.colorValue ?? item.colorOptions?.[0]?.value ?? "";

              return (
                <article key={item.lineId} className="cart-item">
                  <div>
                    <h3>{t({ ru: item.title.ru, ro: item.title.ro, en: item.title.en })}</h3>
                    {item.priceOptions.length > 0 && (
                      <label>
                        {t({ ru: "Вариант", ro: "Opțiune", en: "Option" })}
                        <select
                          value={selectedPriceIndex}
                          onChange={(event) =>
                            updateItemOptions(item.lineId, { priceIndex: Number(event.target.value) })
                          }
                        >
                          {item.priceOptions.map((option, index) => (
                            <option key={index} value={index}>
                              {getText(option.label)} — {option.value}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                    {item.colorOptions.length > 0 && (
                      <label>
                        {t({ ru: "Цвет", ro: "Culoare", en: "Color" })}
                        <select
                          value={selectedColorValue}
                          onChange={(event) =>
                            updateItemOptions(item.lineId, { colorValue: event.target.value })
                          }
                        >
                          {item.colorOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {getText(option.label)}
                            </option>
                          ))}
                        </select>
                      </label>
                    )}
                  </div>
                  <div className="cart-item__controls">
                    <button type="button" className="btn btn-secondary" onClick={() => removeFromCart(item.lineId)}>
                      {t({ ru: "Удалить", ro: "Sterge", en: "Remove" })}
                    </button>
                  </div>
                </article>
              );
            })
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
          <p className="cart-delivery-note">
            {t({
              ru: "После оформления с вами свяжутся для обсуждения доставки.",
              ro: "După finalizare, te contactăm pentru a discuta livrarea.",
              en: "After checkout, we will contact you to discuss delivery.",
            })}
          </p>
        </form>
      </div>
    </section>
  );
}

