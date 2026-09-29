// Preguntas del funnel /application y la regla de calificación.
// Lo usan el formulario (cliente) y el endpoint (servidor): la calificación
// se decide SIEMPRE en el servidor con esta misma función.

export type Option = { value: string; label: string; disqualifies?: boolean };

export type ChoiceField =
  | "agents_total"
  | "agents_active"
  | "issue_paid_monthly"
  | "lead_sources"
  | "marketing_spend_monthly"
  | "production_goal_90d";

export type ChoiceQuestion = {
  id: ChoiceField;
  title: string;
  hint?: string;
  multiple?: boolean;
  options: Option[];
};

export const AGENTS_TOTAL: Option[] = [
  { value: "1-9", label: "1 – 9", disqualifies: true },
  { value: "10-25", label: "10 – 25" },
  { value: "26-50", label: "26 – 50" },
  { value: "51-100", label: "51 – 100" },
  { value: "101-250", label: "101 – 250" },
  { value: "250+", label: "Más de 250" },
];

export const AGENTS_ACTIVE: Option[] = [
  { value: "<10", label: "Menos de 10", disqualifies: true },
  { value: "10-25", label: "10 – 25" },
  { value: "26-50", label: "26 – 50" },
  { value: "51-100", label: "51 – 100" },
  { value: "100+", label: "Más de 100" },
];

export const ISSUE_PAID: Option[] = [
  { value: "<50k", label: "Menos de $50K" },
  { value: "50k-100k", label: "$50K – $100K" },
  { value: "100k-250k", label: "$100K – $250K" },
  { value: "250k-500k", label: "$250K – $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m+", label: "Más de $1M" },
];

export const LEAD_SOURCES: Option[] = [
  { value: "own_ads", label: "Invierto directamente en publicidad" },
  { value: "marketing_agency", label: "Contrato una agencia de marketing" },
  { value: "in_house", label: "Tengo un departamento de marketing interno" },
  { value: "buy_leads", label: "Compro leads a proveedores" },
  { value: "referrals", label: "Referidos / orgánico" },
  { value: "other", label: "Otro" },
];

export const MARKETING_SPEND: Option[] = [
  { value: "<5k", label: "Menos de $5K" },
  { value: "5k-10k", label: "$5K – $10K" },
  { value: "10k-25k", label: "$10K – $25K" },
  { value: "25k-50k", label: "$25K – $50K" },
  { value: "50k-100k", label: "$50K – $100K" },
  { value: "100k+", label: "Más de $100K" },
];

export const PRODUCTION_GOAL: Option[] = [
  { value: "<100k", label: "Menos de $100K" },
  { value: "100k-250k", label: "$100K – $250K" },
  { value: "250k-500k", label: "$250K – $500K" },
  { value: "500k-1m", label: "$500K – $1M" },
  { value: "1m-3m", label: "$1M – $3M" },
  { value: "3m+", label: "Más de $3M" },
];

export const CHOICE_QUESTIONS: ChoiceQuestion[] = [
  { id: "agents_total", title: "¿Cuántos agentes tiene actualmente tu agencia?", options: AGENTS_TOTAL },
  {
    id: "agents_active",
    title: "¿Cuántos de tus agentes están activos y produciendo hoy?",
    options: AGENTS_ACTIVE,
  },
  {
    id: "issue_paid_monthly",
    title: "¿Cuál es el Issue Paid mensual aproximado de tu agencia?",
    options: ISSUE_PAID,
  },
  {
    id: "lead_sources",
    title: "¿Cómo generas actualmente tus leads?",
    hint: "Puedes elegir más de una opción.",
    multiple: true,
    options: LEAD_SOURCES,
  },
  {
    id: "marketing_spend_monthly",
    title: "¿Cuánto inviertes al mes en marketing, leads y llamadas?",
    options: MARKETING_SPEND,
  },
  {
    id: "production_goal_90d",
    title: "¿Cuál es tu objetivo de producción mensual para los próximos 90 días?",
    options: PRODUCTION_GOAL,
  },
];

export type ApplicationAnswers = {
  agency_name: string;
  agents_total: string;
  agents_active: string;
  issue_paid_monthly: string;
  lead_sources: string[];
  marketing_spend_monthly: string;
  production_goal_90d: string;
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  npn: string;
};

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const NPN_RE = /^\d{1,10}$/;

export function phoneDigits(v: string) {
  const d = v.replace(/\D/g, "");
  return d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
}

export function formatPhone(v: string) {
  const d = phoneDigits(v).slice(0, 10);
  if (d.length < 4) return d;
  if (d.length < 7) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
  return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
}

export function labelOf(field: ChoiceField, value: string) {
  const q = CHOICE_QUESTIONS.find((x) => x.id === field);
  return q?.options.find((o) => o.value === value)?.label ?? value;
}

// Descalificación suave: no bloquea el envío, solo marca el lead.
export function qualify(a: Pick<ApplicationAnswers, "agents_total" | "agents_active">) {
  const reasons: string[] = [];
  if (AGENTS_TOTAL.find((o) => o.value === a.agents_total)?.disqualifies)
    reasons.push("Menos de 10 agentes en la agencia");
  if (AGENTS_ACTIVE.find((o) => o.value === a.agents_active)?.disqualifies)
    reasons.push("Menos de 10 agentes activos");
  return { qualified: reasons.length === 0, reasons };
}

// Devuelve el primer campo inválido, o null si todo está bien.
export function validate(a: ApplicationAnswers): string | null {
  if (!a.agency_name?.trim()) return "agency_name";
  for (const q of CHOICE_QUESTIONS) {
    const v = a[q.id];
    const values = Array.isArray(v) ? v : [v];
    if (!values.length || !values.every((x) => q.options.some((o) => o.value === x))) return q.id;
    if (!q.multiple && Array.isArray(v)) return q.id;
  }
  if (!a.first_name?.trim()) return "first_name";
  if (!a.last_name?.trim()) return "last_name";
  if (phoneDigits(a.phone ?? "").length !== 10) return "phone";
  if (!EMAIL_RE.test(a.email?.trim() ?? "")) return "email";
  if (!NPN_RE.test(a.npn?.trim() ?? "")) return "npn";
  return null;
}
