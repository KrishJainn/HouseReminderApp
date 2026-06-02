// Vercel serverless function: proxies email sends to Resend.
// API key resolution order:
//   1. RESEND_API_KEY env var (recommended — set in Vercel dashboard)
//   2. apiKey field in request body (fallback — paste in Settings UI)

export default async function handler(req, res) {
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(204).end();
  }
  if (req.method !== "POST") {
    return res.status(405).json({ error: "POST only" });
  }

  const body = typeof req.body === "string" ? JSON.parse(req.body || "{}") : (req.body || {});
  const { to, subject, message, addedBy, fromName, fromEmail, apiKey } = body;

  const key = process.env.RESEND_API_KEY || apiKey;
  if (!key) return res.status(400).json({ error: "Missing Resend API key (set RESEND_API_KEY env var or pass apiKey)" });
  if (!to || !subject) return res.status(400).json({ error: "to + subject required" });

  const fromAddr = fromEmail || "onboarding@resend.dev";
  const fromLine = fromName ? `${fromName} <${fromAddr}>` : fromAddr;

  const html = [
    `<p>${escapeHtml(message || subject).replace(/\n/g, "<br>")}</p>`,
    addedBy ? `<p style="color:#6b7280;font-size:13px;margin-top:24px">— Added by ${escapeHtml(addedBy)}</p>` : "",
  ].join("");

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromLine,
        to: [to],
        subject,
        html,
        text: message || subject,
      }),
    });
    const text = await r.text();
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(r.status).json({ status: r.status, body: text });
  } catch (e) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    return res.status(500).json({ error: e.message });
  }
}

function escapeHtml(s) {
  return String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
