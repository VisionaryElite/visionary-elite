"use client";

import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import Logo from "@/components/Logo";
import { readTracking } from "@/components/TrackingCapture";
import { pushEvent, pushEventThenGo } from "@/lib/tracking";
import {
  CHOICE_QUESTIONS,
  EMAIL_RE,
  NPN_RE,
  formatPhone,
  phoneDigits,
  type ApplicationAnswers,
  type ChoiceQuestion,
} from "@/lib/application";

type StepId = "agency" | ChoiceQuestion["id"] | "name" | "contact" | "npn";
const STEPS: StepId[] = ["agency", ...CHOICE_QUESTIONS.map((q) => q.id), "name", "contact", "npn"];

const EMPTY: ApplicationAnswers = {
  agency_name: "",
  agents_total: "",
  agents_active: "",
  issue_paid_monthly: "",
  lead_sources: [],
  marketing_spend_monthly: "",
  production_goal_90d: "",
  first_name: "",
  last_name: "",
  phone: "",
  email: "",
  npn: "",
};

export default function ApplicationForm() {
  const [a, setA] = useState<ApplicationAnswers>(EMPTY);
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const furthestTracked = useRef(-1);

  const step = STEPS[i];
  const question = CHOICE_QUESTIONS.find((q) => q.id === step);

  function goTo(n: number) {
    setI(Math.max(0, Math.min(n, STEPS.length - 1)));
    setTouched(false);
    setError(null);
    window.scrollTo({ top: 0 });
  }

  useEffect(() => () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
  }, []);

  // ViewContent la primera vez que el usuario llega a cada paso (al retroceder no se repite).
  useEffect(() => {
    if (i <= furthestTracked.current) return;
    furthestTracked.current = i;
    pushEvent({
      event: "ViewContent",
      funnel: "application",
      step_number: i + 1,
      step_name: STEPS[i],
      total_steps: STEPS.length,
    });
  }, [i]);

  const set = <K extends keyof ApplicationAnswers>(k: K, v: ApplicationAnswers[K]) =>
    setA((prev) => ({ ...prev, [k]: v }));

  const errors = {
    agency_name: !a.agency_name.trim() && "Escribe el nombre de tu agencia.",
    first_name: !a.first_name.trim() && "Escribe tu nombre.",
    last_name: !a.last_name.trim() && "Escribe tu apellido.",
    phone: phoneDigits(a.phone).length !== 10 && "Ingresa un número de 10 dígitos.",
    email: !EMAIL_RE.test(a.email.trim()) && "Ingresa un correo válido.",
    npn: !NPN_RE.test(a.npn.trim()) && "El NPN tiene solo números (hasta 10 dígitos).",
  };

  function stepValid(s: StepId) {
    switch (s) {
      case "agency":
        return !errors.agency_name;
      case "name":
        return !errors.first_name && !errors.last_name;
      case "contact":
        return !errors.phone && !errors.email;
      case "npn":
        return !errors.npn;
      case "lead_sources":
        return a.lead_sources.length > 0;
      default:
        return Boolean(a[s]);
    }
  }

  async function submit() {
    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: a, tracking: readTracking() }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "error");
      // Lead en cada aplicación enviada; lead_qualified permite filtrar en GTM.
      pushEventThenGo(
        {
          event: "Lead",
          funnel: "application",
          lead_qualified: Boolean(data.qualified),
          qualification_status: data.qualified ? "califica" : "no_califica",
        },
        data.qualified ? "/application/thank-you" : "/application/received",
      );
    } catch {
      setSending(false);
      setError("No pudimos enviar tu aplicación. Revisa tu conexión e inténtalo de nuevo.");
    }
  }

  function next(e?: FormEvent<HTMLFormElement>) {
    e?.preventDefault();
    if (sending) return;
    // "Siguiente" del teclado en un campo que no es el último: pasar al próximo campo.
    const inputs = e ? [...e.currentTarget.querySelectorAll("input")] : [];
    const at = inputs.indexOf(document.activeElement as HTMLInputElement);
    if (at > -1 && at < inputs.length - 1 && !(e?.nativeEvent as SubmitEvent)?.submitter) {
      inputs[at + 1].focus();
      return;
    }
    if (!stepValid(step)) return setTouched(true);
    if (i === STEPS.length - 1) return void submit();
    goTo(i + 1);
  }

  function pick(q: ChoiceQuestion, value: string) {
    if (q.multiple) {
      setA((prev) => {
        const cur = prev.lead_sources;
        return { ...prev, lead_sources: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] };
      });
      return;
    }
    set(q.id as Exclude<ChoiceQuestion["id"], "lead_sources">, value);
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = setTimeout(() => goTo(i + 1), 280);
  }

  const showError = (msg: string | false) => (touched && msg ? msg : null);

  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      {/* Encabezado + progreso por segmentos */}
      <header className="mx-auto w-full max-w-xl px-5 pt-5">
        <div className="flex items-center justify-between">
          <Logo className="w-[76px]" />
          <span className="text-[13px] font-medium tabular-nums text-muted">
            <span className="text-foreground">{String(i + 1).padStart(2, "0")}</span> / {STEPS.length}
          </span>
        </div>
        <div className="mt-5 flex gap-1" aria-hidden>
          {STEPS.map((s, n) => (
            <span
              key={s}
              className={`h-[3px] flex-1 transition-colors duration-300 ${n <= i ? "bg-foreground" : "bg-line-strong"}`}
            />
          ))}
        </div>
      </header>

      {/* Paso */}
      <main className="mx-auto flex w-full max-w-xl flex-1 flex-col px-5 pb-8 pt-10 sm:pt-14">
        <form key={step} onSubmit={next} noValidate className="step-in flex flex-1 flex-col">
          {step === "agency" && (
            <Step eyebrow="Tu agencia" title="¿Cuál es el nombre de tu agencia?">
              <Field
                label="Nombre de la agencia"
                value={a.agency_name}
                onChange={(v) => set("agency_name", v)}
                autoComplete="organization"
                error={showError(errors.agency_name)}
                autoFocus
              />
            </Step>
          )}

          {question && (
            <Step eyebrow="Tu agencia" title={question.title} hint={question.hint}>
              <div className="border-t border-line">
                {question.options.map((o, n) => {
                  const selected = question.multiple
                    ? a.lead_sources.includes(o.value)
                    : a[question.id] === o.value;
                  return (
                    <button
                      key={o.value}
                      type="button"
                      onClick={() => pick(question, o.value)}
                      aria-pressed={selected}
                      className={`flex w-full items-center gap-4 border-b border-line py-4 pr-2 text-left text-[16px] transition-colors ${
                        selected ? "text-foreground" : "text-foreground/85 hover:text-foreground"
                      }`}
                    >
                      <span
                        className={`flex h-7 w-7 shrink-0 items-center justify-center border text-[11px] font-semibold transition-colors ${
                          selected ? "border-foreground bg-foreground text-black" : "border-line-strong text-muted"
                        }`}
                      >
                        {String.fromCharCode(65 + n)}
                      </span>
                      <span className="flex-1">{o.label}</span>
                      {selected && (
                        <svg viewBox="0 0 20 20" className="h-4 w-4 text-foreground" aria-hidden>
                          <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                        </svg>
                      )}
                    </button>
                  );
                })}
              </div>
              {touched && !stepValid(step) && (
                <p className="mt-3 text-sm text-red-400">Elige una opción para continuar.</p>
              )}
            </Step>
          )}

          {step === "name" && (
            <Step eyebrow="Tus datos" title="¿Cómo te llamas?">
              <div className="space-y-7">
                <Field
                  label="Nombre"
                  value={a.first_name}
                  onChange={(v) => set("first_name", v)}
                  autoComplete="given-name"
                  error={showError(errors.first_name)}
                  autoFocus
                />
                <Field
                  label="Apellido"
                  value={a.last_name}
                  onChange={(v) => set("last_name", v)}
                  autoComplete="family-name"
                  error={showError(errors.last_name)}
                />
              </div>
            </Step>
          )}

          {step === "contact" && (
            <Step eyebrow="Tus datos" title="¿Dónde te contactamos?">
              <div className="space-y-7">
                <Field
                  label="Teléfono"
                  value={a.phone}
                  onChange={(v) => set("phone", formatPhone(v))}
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(555) 555-5555"
                  error={showError(errors.phone)}
                  autoFocus
                />
                <Field
                  label="Correo electrónico"
                  value={a.email}
                  onChange={(v) => set("email", v)}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  error={showError(errors.email)}
                />
              </div>
            </Step>
          )}

          {step === "npn" && (
            <Step eyebrow="Último paso" title="¿Cuál es tu NPN?">
              <Field
                label="NPN · National Producer Number"
                value={a.npn}
                onChange={(v) => set("npn", v.replace(/\D/g, "").slice(0, 10))}
                inputMode="numeric"
                autoComplete="off"
                enterKeyHint="send"
                error={showError(errors.npn)}
                autoFocus
              />
              <p className="mt-4 border-l-2 border-silver pl-3 text-[13px] leading-snug text-foreground/90">
                Si tu NPN no coincide con tu nombre, no serás contactado.
              </p>
              <p className="mt-10 text-[12px] leading-relaxed text-faint">
                Al enviar tu aplicación aceptas que Visionary Elite te contacte por teléfono, SMS o correo
                electrónico sobre esta aplicación, y aceptas nuestros{" "}
                <a href="/terms-of-service" target="_blank" className="underline underline-offset-2 hover:text-muted">
                  Términos del servicio
                </a>{" "}
                y nuestra{" "}
                <a href="/privacy-policy" target="_blank" className="underline underline-offset-2 hover:text-muted">
                  Política de privacidad
                </a>
                . Pueden aplicar tarifas de mensajes y datos; responde STOP para dejar de recibir SMS.
              </p>
            </Step>
          )}

          {error && (
            <p role="alert" className="mt-6 border-l-2 border-red-500 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </p>
          )}

          {/* Pasos de texto y selección múltiple llevan botón; los de una sola opción avanzan al tocar.
              En la selección múltiple el botón queda fijo abajo porque la lista es larga. */}
          <div
            className={`flex items-center gap-3 ${
              question?.multiple
                ? "sticky bottom-0 -mx-5 mt-6 bg-gradient-to-t from-background from-70% to-transparent px-5 pb-5 pt-6"
                : "mt-10"
            }`}
          >
            {i > 0 && (
              <button
                type="button"
                onClick={() => goTo(i - 1)}
                aria-label="Pregunta anterior"
                className="flex h-[52px] w-[52px] shrink-0 items-center justify-center border border-line-strong text-muted transition-colors hover:border-muted hover:text-foreground"
              >
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                  <path d="M16 10H4m5-5l-5 5 5 5" fill="none" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            )}
            {(!question || question.multiple) && (
              <button
                type="submit"
                disabled={sending}
                className="flex h-[52px] flex-1 items-center justify-between bg-foreground px-5 text-[14px] font-semibold text-black transition hover:bg-white active:translate-y-px disabled:opacity-60"
              >
                <span>{step === "npn" ? (sending ? "Enviando…" : "Enviar aplicación") : "Continuar"}</span>
                <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden>
                  <path d="M4 10h12m-5-5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.6" />
                </svg>
              </button>
            )}
          </div>
        </form>
      </main>
    </div>
  );
}

function Step({
  eyebrow,
  title,
  hint,
  children,
}: {
  eyebrow: string;
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-silver">{eyebrow}</p>
      <h1 className="mt-3 font-display text-[1.95rem] leading-[1.12] sm:text-[2.5rem]">{title}</h1>
      {hint && <p className="mt-3 text-sm text-muted">{hint}</p>}
      <div className="mt-9">{children}</div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  error,
  ...rest
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | null;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  return (
    <label className="block">
      <span className="block text-[12px] font-medium uppercase tracking-[0.14em] text-muted">{label}</span>
      <input
        enterKeyHint="next"
        {...rest}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        className={`w-full border-b bg-transparent pb-3 pt-2 text-[20px] text-foreground outline-none transition-colors placeholder:text-faint focus:border-foreground ${
          error ? "border-red-500" : "border-line-strong"
        }`}
      />
      {error && <span className="mt-2 block text-sm text-red-400">{error}</span>}
    </label>
  );
}
