function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function handler(req, res) {
  console.log('[ORDER] Method:', req.method, 'Path:', req.url);
  
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // Only POST
  if (req.method !== "POST") {
    console.error('[ORDER] Not POST:', req.method);
    return res.status(405).json({ ok: false, error: "Method Not Allowed" });
  }

  try {
    const { name, phone, address, comment, items, total, itemsTotal } = req.body || {};

    if (!name || !phone || !address || !Array.isArray(items) || items.length === 0) {
      console.error('[ORDER] Invalid body');
      return res.status(400).json({ ok: false, error: "Missing fields" });
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    const defaultOrderEmail = process.env.RESEND_TEST_EMAIL || process.env.ORDER_EMAIL;
    const toEmail = req.body.to || defaultOrderEmail;
    const fromEmail = req.body.from || process.env.FROM_EMAIL;

    if (!resendApiKey || !toEmail || !fromEmail) {
      console.error('[ORDER] Missing config');
      return res.status(500).json({ ok: false, error: "Config missing" });
    }

    const normalizedItems = items.map((item) => ({
      title: String(item.title || "").trim(),
      qty: Number(item.qty) > 0 ? Number(item.qty) : 1,
      price: String(item.price || "").trim(),
      lineTotal: String(item.lineTotal || "").trim(),
    }));

    const orderTotal = String(total || itemsTotal || "").trim();

    const itemsHtml = normalizedItems
      .map((item) => `<li>${escapeHtml(item.title)} × ${item.qty}${item.price ? ` — ${escapeHtml(item.price)}/шт` : ""}${item.lineTotal ? ` = ${escapeHtml(item.lineTotal)}` : ""}</li>`)
      .join("");

    const html = `<h2>Новый заказ</h2>` +
      `<p><strong>Имя:</strong> ${escapeHtml(name)}</p>` +
      `<p><strong>Телефон:</strong> ${escapeHtml(phone)}</p>` +
      `<p><strong>Адрес доставки:</strong> ${escapeHtml(address)}</p>` +
      (comment ? `<p><strong>Комментарий:</strong> ${escapeHtml(comment)}</p>` : "") +
      `<p><strong>Товары:</strong></p><ol>${itemsHtml}</ol>` +
      (orderTotal ? `<p><strong>Итого:</strong> ${escapeHtml(orderTotal)}</p>` : "");

    console.log('[ORDER] Sending to:', toEmail);

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: Array.isArray(toEmail) ? toEmail : [toEmail],
        subject: `Заказ: ${name}`,
        html,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('[ORDER] Resend error:', error);
      return res.status(502).json({ ok: false, error: "Email failed" });
    }

    return res.status(200).json({ ok: true, message: "Order sent" });
  } catch (err) {
    console.error('[ORDER] Error:', err.message);
    return res.status(500).json({ ok: false, error: "Server error" });
  }
}

export default handler;

