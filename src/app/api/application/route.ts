import {
  CHOICE_QUESTIONS,
  labelOf,
  phoneDigits,
  qualify,
  validate,
  type ApplicationAnswers,
} from "@/lib/application";

type Body = { answers: ApplicationAnswers; tracking?: Record<string, string> };

const TRACKING_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
  "fbclid",
  "gclid",
  "ttclid",
  "landing_url",
  "referrer",
];

export async function POST(request: Request) {
  let body: Body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const a = body?.answers;
  const invalid = a ? validate(a) : "answers";
  if (invalid) {
    return Response.json({ ok: false, error: "invalid_field", field: invalid }, { status: 422 });
  }

  const { qualified, reasons } = qualify(a);
  const tracking = Object.fromEntries(
    TRACKING_KEYS.map((k) => [k, String(body.tracking?.[k] ?? "").slice(0, 500)]),
  );

  const payload = {
    submitted_at: new Date().toISOString(),
    funnel: "visionary-elite/application",
    qualified,
    qualification_status: qualified ? "califica" : "no_califica",
    disqualification_reasons: reasons,

    agency_name: a.agency_name.trim(),
    first_name: a.first_name.trim(),
    last_name: a.last_name.trim(),
    phone: `+1${phoneDigits(a.phone)}`,
    email: a.email.trim().toLowerCase(),
    npn: a.npn.trim(),

    // Valor crudo + etiqueta legible de cada respuesta de opción.
    ...Object.fromEntries(
      CHOICE_QUESTIONS.flatMap((q) => {
        const v = a[q.id];
        const label = Array.isArray(v)
          ? v.map((x) => labelOf(q.id, x)).join(", ")
          : labelOf(q.id, v);
        return [
          [q.id, v],
          [`${q.id}_label`, label],
        ];
      }),
    ),

    ...tracking,
    ip: request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "",
    user_agent: request.headers.get("user-agent") ?? "",
  };

  const webhook = process.env.N8N_WEBHOOK_URL;
  if (!webhook) {
    // Sin webhook configurado (local): no se envía a ningún lado, solo se registra.
    console.warn("[application] N8N_WEBHOOK_URL no configurado. Payload simulado:\n", payload);
    return Response.json({ ok: true, qualified, simulated: true });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) throw new Error(`n8n respondió ${res.status}`);
  } catch (err) {
    console.error("[application] fallo al enviar a n8n:", err);
    return Response.json({ ok: false, error: "webhook_failed" }, { status: 502 });
  }

  return Response.json({ ok: true, qualified });
}
