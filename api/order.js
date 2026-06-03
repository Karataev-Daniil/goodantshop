export default async function handler(req, res) {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  const { firstName, lastName, phone, items } = req.body || {};

  if (!firstName || !lastName || !phone || !Array.isArray(items) || items.length === 0) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(400).json({ ok: false, error: "firstName, lastName, phone and items are required" });
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const defaultOrderEmail = process.env.RESEND_TEST_EMAIL || process.env.ORDER_EMAIL;
  // allow override from request body, otherwise use env fallback
  const toEmail = req.body.to || defaultOrderEmail;
  const fromEmail = req.body.from || process.env.FROM_EMAIL;

  if (!resendApiKey || !toEmail || !fromEmail) {
    res.setHeader("Access-Control-Allow-Origin", "*");
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

  console.log('Order request', {
    firstName: safeFirstName,
    lastName: safeLastName,
    toEmail,
    fromEmail,
    itemCount: normalizedItems.length,
  });

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
        to: Array.isArray(toEmail) ? toEmail : [toEmail],
        subject: `New cart order: ${safeFirstName} ${safeLastName}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const provider = await response.text();
      console.error('Resend send failed', { status: response.status, provider });
      res.setHeader("Access-Control-Allow-Origin", "*");
      return res.status(502).json({ ok: false, error: "Email delivery failed", provider });
    }

    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(200).json({ ok: true, message: "Order sent successfully" });
  } catch (error) {
    console.error('Order send exception', error);
    res.setHeader("Access-Control-Allow-Origin", "*");
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
