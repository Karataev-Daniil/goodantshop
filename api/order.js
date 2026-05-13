export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { firstName, lastName, phone, items } = req.body || {};

  if (!firstName || !lastName || !phone || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ ok: false, error: "firstName, lastName, phone and items are required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.ORDER_TO_EMAIL || process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.ORDER_FROM_EMAIL || process.env.CONTACT_FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    return res.status(500).json({ ok: false, error: "Email provider is not configured" });
  }

  const safeFirstName = String(firstName).trim();
  const safeLastName = String(lastName).trim();
  const safePhone = String(phone).trim();

  const normalizedItems = items.map((item) => ({
    title: String(item.title || "").trim(),
    qty: Number(item.qty) > 0 ? Number(item.qty) : 1,
    variant: String(item.variant || "").trim(),
    price: String(item.price || "").trim(),
  }));

  const itemsText = normalizedItems
    .map((item, index) => `${index + 1}. ${item.title} x${item.qty}${item.variant ? ` | ${item.variant}` : ""}${item.price ? ` | ${item.price}` : ""}`)
    .join("\n");

  const text = [
    "New order from cart",
    `First name: ${safeFirstName}`,
    `Last name: ${safeLastName}`,
    `Phone: ${safePhone}`,
    "",
    "Items:",
    itemsText,
  ].join("\n");

  const htmlItems = normalizedItems
    .map(
      (item) =>
        `<li><strong>${escapeHtml(item.title)}</strong> x${item.qty}${item.variant ? ` - ${escapeHtml(item.variant)}` : ""}${item.price ? ` - ${escapeHtml(item.price)}` : ""}</li>`
    )
    .join("");

  const html = `
    <h2>New order from cart</h2>
    <p><strong>First name:</strong> ${escapeHtml(safeFirstName)}</p>
    <p><strong>Last name:</strong> ${escapeHtml(safeLastName)}</p>
    <p><strong>Phone:</strong> ${escapeHtml(safePhone)}</p>
    <p><strong>Items:</strong></p>
    <ol>${htmlItems}</ol>
  `;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        subject: `New cart order: ${safeFirstName} ${safeLastName}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const provider = await response.text();
      return res.status(502).json({ ok: false, error: "Email delivery failed", provider });
    }

    return res.status(200).json({ ok: true, message: "Order sent successfully" });
  } catch {
    return res.status(502).json({ ok: false, error: "Email delivery failed" });
  }
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}
