export default async function handler(req, res) {
  console.log('API handler called:', {
    method: req.method,
    path: req.url,
    body: req.body ? Object.keys(req.body) : 'empty',
  });

  // Set CORS headers for all responses
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== "POST") {
    console.error('Method not POST:', req.method);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { firstName, lastName, phone, items } = req.body || {};

    if (!firstName || !lastName || !phone || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ ok: false, error: "Missing required fields" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const defaultOrderEmail = process.env.RESEND_TEST_EMAIL || process.env.ORDER_EMAIL;
    const toEmail = req.body.to || defaultOrderEmail;
    const fromEmail = req.body.from || process.env.FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
      return res.status(500).json({ ok: false, error: "Config missing" });
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

    const html = `<h2>New order</h2><p><strong>Name:</strong> ${escapeHtml(safeFirstName)} ${escapeHtml(safeLastName)}</p><p><strong>Phone:</strong> ${escapeHtml(safePhone)}</p><p><strong>Items:</strong></p><ol>${htmlItems}</ol>`;

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(toEmail) ? toEmail : [toEmail],
        subject: `New order: ${safeFirstName} ${safeLastName}`,
        text,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('Resend error:', error);
      return res.status(502).json({ ok: false, error: "Email failed" });
    }

    return res.status(200).json({ ok: true, message: "Order sent" });
  } catch (error) {
    console.error('Handler error:', error);
    return res.status(500).json({ ok: false, error: "Server error" });
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
