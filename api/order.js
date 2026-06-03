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
    const { firstName, lastName, phone, items } = req.body || {};

    if (!firstName || !lastName || !phone || !Array.isArray(items) || items.length === 0) {
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
      variant: String(item.variant || "").trim(),
      price: String(item.price || "").trim(),
    }));

    const itemsText = normalizedItems
      .map((item, index) => `${index + 1}. ${item.title} x${item.qty}${item.variant ? ` | ${item.variant}` : ""}${item.price ? ` | ${item.price}` : ""}`)
      .join("\n");

    const html = `<h2>New order</h2><p><strong>Name:</strong> ${escapeHtml(firstName)} ${escapeHtml(lastName)}</p><p><strong>Phone:</strong> ${escapeHtml(phone)}</p><p><strong>Items:</strong></p><ol>${normalizedItems.map((i) => `<li>${escapeHtml(i.title)} x${i.qty}</li>`).join("")}</ol>`;

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
        subject: `Order: ${firstName} ${lastName}`,
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

