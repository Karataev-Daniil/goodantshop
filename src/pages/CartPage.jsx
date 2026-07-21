import { useState } from "react";
import { Link, useOutletContext, useParams } from "react-router-dom";
import { ants } from "../data/antsData";
import { formicariums } from "../data/formicariumsData";
import { accessories, foodForAnt, toolKit } from "../data/accessoriesData";
import SEO, { breadcrumbSchema, pageSeo } from "../components/SEO";

const getText = (value, lang) => {
  if (value && typeof value === "object") {
    return value[lang] ?? value.ru ?? value.ro ?? value.en ?? "";
  }
  return value ?? "";
};

const optionPriceNumber = (option) =>
  parseInt(String(option?.value || "").replace(/[^\d]/g, ""), 10) || 0;

// В localStorage лежит СНИМОК опции на момент добавления в корзину. Брать цену
// оттуда нельзя: после изменения прайса корзина показывала бы и отправляла в
// заказ старую цену сколь угодно долго. Поэтому по сохранённой строке мы лишь
// узнаём, какой вариант выбрал человек, а сам вариант берём из каталога.
// Если такого варианта больше нет (градацию убрали из продажи), откатываемся
// на текущий вариант по умолчанию.
const resolveOption = (product, lineOption) => {
  const options = product.priceOptions || [];
  const savedLabel = lineOption?.label?.ru;
  const matched = savedLabel ? options.find((option) => option.label?.ru === savedLabel) : null;
  return matched || options.find((option) => option.selected) || options[0] || null;
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

  const catalog = [...ants, ...formicariums, ...accessories];

  // Group cart lines by product - one line equals one unit
  const groupsMap = new Map();
  cartIds.forEach((line) => {
    const product = catalog.find((entry) => String(entry.id) === String(line.id));
    if (!product) return;
    const option = resolveOption(product, line.option);
    const key = `${line.id}__${option?.value || ""}`;
    if (!groupsMap.has(key)) groupsMap.set(key, { product, option, qty: 0, uids: [] });
    const group = groupsMap.get(key);
    group.qty += 1;
    group.uids.push(line.uid);
  });
  const groups = [...groupsMap.values()];

  // --- Правило комплекта ----------------------------------------------------
  // Каждой колонии нужен свой дом, поэтому считаем именно количество, а не факт
  // наличия: 3 колонии и 1 формикарий - это ещё не комплект. Проверка мягкая:
  // положить колонии одни можно, но оформить заказ без домов нельзя.
  const isAnt = (product) => ants.some((entry) => entry.id === product.id);
  const isFormicarium = (product) => formicariums.some((entry) => entry.id === product.id);
  const sumQty = (list) => list.reduce((sum, group) => sum + group.qty, 0);

  const antGroups = groups.filter((group) => isAnt(group.product));
  const antQty = sumQty(antGroups);
  const formicariumQty = sumQty(groups.filter((group) => isFormicarium(group.product)));
  const missingFormicariums = Math.max(0, antQty - formicariumQty);
  const needsFormicarium = missingFormicariums > 0;
  const bundleComplete = antQty > 0 && !needsFormicarium;

  // Подарки идут на КАЖДУЮ колонию: набор инструментов и корм под её рацион
  // (жнецам семена, остальным живой белок). Две колонии - два набора и два корма.
  const giftLines = [];
  if (bundleComplete) {
    const addGift = (product, qty) => {
      if (!product) return;
      const found = giftLines.find((entry) => entry.product.id === product.id);
      if (found) found.qty += qty;
      else giftLines.push({ product, qty });
    };
    const kit = toolKit();
    antGroups.forEach((group) => {
      addGift(kit, group.qty);
      addGift(foodForAnt(group.product), group.qty);
    });
  }

  // Сколько единиц каждого товара положено бесплатно.
  const giftQtyFor = (product) =>
    giftLines.find((entry) => entry.product.id === product.id)?.qty || 0;

  // В строке корзины бесплатны только положенные единицы: если человек взял три
  // набора, а комплект даёт один, платит он за два.
  const freeQtyIn = (group) => Math.min(group.qty, giftQtyFor(group.product));
  const lineTotal = (group) =>
    optionPriceNumber(group.option) * (group.qty - freeQtyIn(group));

  // Остаток подарков, который в корзину не клали - добавим к заказу сами.
  const pendingGifts = giftLines
    .map((gift) => ({
      product: gift.product,
      qty: gift.qty - sumQty(groups.filter((group) => group.product.id === gift.product.id)),
    }))
    .filter((gift) => gift.qty > 0);

  const totalQty = groups.reduce((sum, group) => sum + group.qty, 0);
  const itemsTotal = groups.reduce((sum, group) => sum + lineTotal(group), 0);
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

    // Колония без формикария - не отказ, а просьба доложить дом.
    if (needsFormicarium) {
      setStatus({
        type: "error",
        text: t({
          ru: `Добавьте формикарий, не хватает ${missingFormicariums}. Колонии мы отправляем только вместе с домом, зато набор инструментов и корм идут в подарок.`,
          ro: `Adaugă un formicariu, lipsesc ${missingFormicariums}. Trimitem coloniile doar împreună cu casa, în schimb setul de instrumente și hrana vin cadou.`,
          en: `Please add a formicarium, ${missingFormicariums} missing. We ship colonies only together with a home, and in return the tool kit and food come free.`,
        }),
      });
      return;
    }

    setLoading(true);
    setStatus({ type: "", text: "" });

    const giftLabel = t({ ru: "подарок к комплекту", ro: "cadou la set", en: "gift with the set" });
    const orderItems = [
      ...groups.map((group) => {
        const unit = optionPriceNumber(group.option);
        const free = freeQtyIn(group);
        // Если часть единиц бесплатна, помечаем это прямо в строке заказа,
        // чтобы при сборке было видно, за что человек заплатил.
        const variant = group.option ? getText(group.option.label, lang) : "";
        return {
          title: getText(group.product.title, lang),
          variant: free > 0 ? [variant, `${free} ${giftLabel}`].filter(Boolean).join(", ") : variant,
          qty: group.qty,
          price: fmt(unit),
          lineTotal: fmt(lineTotal(group)),
        };
      }),
      // Подарки, которых не было в корзине, тоже уходят в заказ - нулевой строкой.
      ...pendingGifts.map((gift) => ({
        title: getText(gift.product.title, lang),
        variant: giftLabel,
        qty: gift.qty,
        price: fmt(0),
        lineTotal: fmt(0),
      })),
    ];

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

        {/* Мягкое напоминание: не блокируем корзину, а объясняем и предлагаем дом. */}
        {needsFormicarium && (
          <div className="checkout-bundle">
            <strong>
              {missingFormicariums > 1
                ? t({
                    ru: "Каждой колонии нужен свой дом",
                    ro: "Fiecare colonie are nevoie de casa ei",
                    en: "Every colony needs its own home",
                  })
                : t({
                    ru: "Колонии нужен свой дом",
                    ro: "Colonia are nevoie de casa ei",
                    en: "Your colony needs its own home",
                  })}
            </strong>
            <p>
              {t({
                ru: "Формикарий понадобится в любом случае, поэтому колонии мы отправляем только вместе с ним. Зато к каждой из них набор инструментов и корм идут в подарок.",
                ro: "Formicariul va fi oricum necesar, de aceea trimitem coloniile doar împreună cu el. În schimb, la fiecare dintre ele setul de instrumente și hrana vin cadou.",
                en: "You'll need a formicarium anyway, so we ship colonies only together with one. In return, each of them comes with a free tool kit and food.",
              })}
            </p>
            <Link className="btn" to={`/${lang}/formicariums`}>
              {t({ ru: "Выбрать формикарий", ro: "Alege formicariul", en: "Choose a formicarium" })}
            </Link>
          </div>
        )}

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
                const unit = optionPriceNumber(group.option);
                const free = freeQtyIn(group);
                const image = group.product.images?.[0] || group.product.image || "/placeholder-ant.svg";
                return (
                  <article className="checkout-item" key={`${group.product.id}-${group.option?.value || ""}`}>
                    <div className="checkout-item__media">
                      <img src={image} alt={getText(group.product.title, lang)} loading="lazy" />
                    </div>
                    <div className="checkout-item__info">
                      <h3>{getText(group.product.title, lang)}</h3>
                      {group.option && (
                        <p className="checkout-item__variant">{getText(group.option.label, lang)}</p>
                      )}
                      {free > 0 && (
                        <p className="checkout-item__variant checkout-item__variant--gift">
                          {free === group.qty
                            ? t({ ru: "Подарок к комплекту", ro: "Cadou la set", en: "Gift with the set" })
                            : `${free} ${t({ ru: "шт в подарок", ro: "buc cadou", en: "pcs free" })}`}
                        </p>
                      )}
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
                    <div className="checkout-item__total">{fmt(lineTotal(group))}</div>
                  </article>
                );
              })}
            </div>

            {pendingGifts.length > 0 && (
              <div className="checkout-gifts">
                <strong>
                  {t({ ru: "Добавим к заказу бесплатно", ro: "Adăugăm gratuit la comandă", en: "We'll add for free" })}
                </strong>
                <ul>
                  {pendingGifts.map((gift) => (
                    <li key={gift.product.id}>
                      <img src={gift.product.images?.[0] || gift.product.image} alt="" loading="lazy" />
                      <span>
                        {getText(gift.product.title, lang)}
                        {gift.qty > 1 && ` × ${gift.qty}`}
                      </span>
                      <s>{gift.product.priceOptions?.[0]?.value}</s>
                      <strong>{fmt(0)}</strong>
                    </li>
                  ))}
                </ul>
              </div>
            )}

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

              <button type="submit" className="btn checkout-submit" disabled={loading || needsFormicarium}>
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
