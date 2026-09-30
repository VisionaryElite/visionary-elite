import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import TrackingCapture from "@/components/TrackingCapture";
import ProductionCalculator from "./ProductionCalculator";
import VslPlayer from "./VslPlayer";

export const metadata: Metadata = {
  title: "Visionary Elite | Para líderes de agencias de Life Insurance",
  description:
    "La fórmula: tus agentes + nuestro entrenamiento, leads y ventas = grandes resultados. Un sistema para que cada agente de tu equipo esté en posición de cerrar hasta 3 pólizas al día.",
};

const STATS = [
  { value: "+8", unit: "años", label: "Generando leads para multinacionales de seguros en todo EE. UU." },
  { value: "3", unit: "años", label: "Especializados exclusivamente en Life Insurance" },
  { value: "$3M", unit: "/mes", label: "Agencias escaladas desde $50K hasta $3M en Issue Paid" },
  { value: "3", unit: "pólizas", label: "Al día por agente: la meta para la que está diseñado el sistema" },
];

const PILLARS = [
  {
    title: "Tecnología",
    body: "Nuestra infraestructura se integra directamente en tu operación. Tus agentes venden; la tecnología hace el resto.",
  },
  {
    title: "Sistema de distribución",
    body: "Leads de alta calidad, probados y optimizados para convertir, entregados de forma predecible a cada agente.",
  },
  {
    title: "Organización",
    body: "Estructura y método dentro de tu oficina para eliminar la incertidumbre del día a día.",
  },
];

const FIT = [
  "Lideras una agencia de Life Insurance a nivel nacional",
  "Ya tienes estructura física: oficina y equipo",
  "Cuentas con 10 o más agentes activos",
  "Buscas escalar en serio, no un curso",
];

const COMPARISON = [
  { topic: "Los leads", before: "Se compran por lote y la calidad cambia cada semana", after: "Calidad probada y optimizada para convertir" },
  { topic: "El día del agente", before: "Empieza sin saber cuántas oportunidades tendrá", after: "Flujo predecible desde que se sienta" },
  { topic: "La relación", before: "Un proveedor a distancia que solo factura", after: "Integración presencial dentro de tu oficina" },
  { topic: "El crecimiento", before: "Depende de que el agente consiga sus propios clientes", after: "Depende de cuántos agentes pongas a producir" },
];

const NOT_FIT = [
  "Tu agencia tiene menos de 10 agentes activos",
  "Buscas leads baratos para probar sin compromiso",
  "Esperas un curso o una fórmula para hacerlo solo",
  "No tienes oficina ni estructura para recibir al equipo",
];

const FAQ = [
  {
    q: "¿Esto es un curso o una mentoría?",
    a: "No. El entrenamiento a tus agentes es parte del sistema, no un producto aparte: junto con los leads y el proceso de ventas, lo integramos directamente en la operación de tu agencia.",
  },
  {
    q: "¿Qué tamaño debe tener mi agencia?",
    a: "Trabajamos con agencias de Life Insurance que ya tienen estructura física y un mínimo de 10 agentes activos produciendo.",
  },
  {
    q: "¿Trabajan con agencias de cualquier estado?",
    a: "Sí. Buscamos líderes de agencia a nivel nacional en Estados Unidos.",
  },
  {
    q: "¿Qué pasa después de aplicar?",
    a: "Revisamos tu aplicación. Si hay alineación, agendamos una llamada previa; si encajamos, viajamos a tu oficina para mostrarte la estructura en persona.",
  },
  {
    q: "¿Por qué piden mi NPN?",
    a: "Porque trabajamos solo con agentes y líderes licenciados. Verificamos que el NPN coincida con el nombre de quien aplica antes de contactar.",
  },
];

const STEPS = [
  { title: "Llamada previa", body: "Conversamos sobre tu agencia, tu equipo y tus objetivos." },
  { title: "Validamos la alineación", body: "Confirmamos que encajamos antes de dar cualquier paso." },
  {
    title: "Visita presencial",
    body: "Viajamos a tu oficina para mostrarte la estructura y el sistema de distribución, y empezar a producir desde el mismo momento.",
  },
];

// Operador de la ecuación: trazo fino, como en una fórmula escrita.
function Op({ children }: { children: string }) {
  return (
    <span className="font-sans text-[2rem] font-extralight leading-none text-silver sm:text-5xl" aria-hidden>
      {children}
    </span>
  );
}

// Rótulo casi imperceptible bajo cada lado de la ecuación. No mueve la alineación de los términos.
function Caption({ children }: { children: string }) {
  return (
    <span className="absolute left-1/2 top-full mt-3 -translate-x-1/2 whitespace-nowrap font-sans text-[10px] font-medium uppercase tracking-[0.2em] text-faint sm:text-[11px]">
      {children}
    </span>
  );
}

// Agentes + [Entrenamiento · Leads · Ventas] = Grandes resultados
function Formula() {
  return (
    <div
      className="mt-9 flex flex-wrap items-center justify-center gap-x-4 gap-y-12 font-display text-[1.45rem] leading-tight sm:mt-12 sm:flex-nowrap sm:gap-x-7 sm:text-[2.1rem]"
      role="math"
      aria-label="Agentes más entrenamiento, leads y ventas es igual a grandes resultados"
    >
      <div className="flex items-center gap-4 sm:gap-7">
        <span className="relative">
          Agentes
          <Caption>Tu trabajo</Caption>
        </span>

        <Op>+</Op>

        {/* Los tres aportes agrupados entre corchetes, como un vector. */}
        <span className="relative flex flex-col px-4 py-1.5 text-left leading-[1.25] sm:px-6">
          <span className="absolute inset-y-0 left-0 w-2 border-y border-l border-white/35" aria-hidden />
          <span className="absolute inset-y-0 right-0 w-2 border-y border-r border-white/35" aria-hidden />
          <span>Entrenamiento</span>
          <span>Leads</span>
          <span>Ventas</span>
          <Caption>Nuestro trabajo</Caption>
        </span>
      </div>

      <div className="flex items-center gap-4 sm:gap-7">
        <Op>=</Op>
        <span className="text-left leading-[1.15]">
          Grandes
          <br />
          resultados
        </span>
      </div>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-silver">{children}</p>;
}

export default function ApplicationLanding() {
  return (
    <div className="relative flex-1 overflow-x-hidden">
      <TrackingCapture />

      {/* ---------- Hero + VSL ---------- */}
      <section className="relative px-4 pb-16 pt-8 sm:pt-12">
        <div className="glow pointer-events-none absolute left-1/2 top-40 h-[80vmin] w-[160vmin] -translate-x-1/2" />

        <div className="fade-in relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <Logo className="w-28 sm:w-36" />

          <h1 className="mt-10 font-display text-[3.4rem] leading-none tracking-[-0.01em] sm:mt-12 sm:text-8xl">
            La fórmula
          </h1>

          <Formula />

          <p className="mt-14 max-w-xl text-[15px] leading-relaxed text-muted sm:mt-16 sm:text-lg">
            Un sistema diseñado para poner a cada agente de tu equipo en posición de cerrar{" "}
            <span className="font-medium text-foreground">hasta 3 pólizas al día</span>.
          </p>
        </div>

        <div className="fade-in relative mx-auto mt-8 max-w-3xl [animation-delay:150ms] sm:mt-10">
          {/* vturb pinta el botón del CTA debajo del video, dentro del mismo reproductor.
              El marco se dibuja solo sobre el área 16:9 para que el botón quede fuera, sobre el fondo. */}
          <div className="relative">
            <VslPlayer />
            <div className="pointer-events-none absolute inset-x-0 top-0 aspect-video border border-white/15" />
          </div>
        </div>
      </section>

      {/* ---------- Números ---------- */}
      <section className="border-y border-line bg-surface px-4 py-12">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-y-10 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <div
              key={s.label}
              className={`px-3 text-center ${i % 2 === 1 ? "border-l border-line" : ""} ${i === 2 ? "lg:border-l" : ""}`}
            >
              <p className="font-display text-5xl leading-none">
                <span className="text-foreground">{s.value}</span>
                <span className="ml-1 text-base text-muted">{s.unit}</span>
              </p>
              <p className="mx-auto mt-3 max-w-[15rem] text-[13px] leading-snug text-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- El problema ---------- */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>El verdadero problema</Eyebrow>
          <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
            <span className="text-muted">El cuello de botella de tu agencia no es el talento.</span>
            <span className="mt-2 block">Es la falta de predictibilidad.</span>
          </h2>
          <p className="mt-6 text-[15px] leading-relaxed text-muted sm:text-base">
            Tus agentes saben cerrar. Lo que frena el crecimiento es no saber cuántas oportunidades reales van a
            tener mañana. Nuestros leads no son un regalo: son leads de alta calidad, probados y optimizados para
            convertir.
          </p>
        </div>
      </section>

      {/* ---------- Comparación ---------- */}
      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>La diferencia</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              Comprar leads <span className="text-muted">no es</span> tener un sistema
            </h2>
          </div>

          <div className="mt-10 overflow-hidden rounded-lg border border-line-strong">
            <div className="hidden grid-cols-[1fr_1.3fr_1.3fr] border-b border-line-strong bg-surface-2 text-[11px] font-semibold uppercase tracking-[0.2em] md:grid">
              <span className="px-6 py-4 text-muted">&nbsp;</span>
              <span className="px-6 py-4 text-muted">Modelo tradicional</span>
              <span className="px-6 py-4 text-foreground">Con Visionary Elite</span>
            </div>
            {COMPARISON.map((c) => (
              <div
                key={c.topic}
                className="grid border-b border-line-strong last:border-b-0 md:grid-cols-[1fr_1.3fr_1.3fr]"
              >
                <p className="px-5 pt-5 font-display text-xl md:px-6 md:py-5">{c.topic}</p>
                <p className="flex gap-3 px-5 pt-3 text-[14px] leading-snug text-muted md:px-6 md:py-5">
                  <span className="mt-[2px] shrink-0 text-faint" aria-hidden>
                    ✕
                  </span>
                  {c.before}
                </p>
                <p className="flex gap-3 px-5 pb-5 pt-2 text-[14px] leading-snug md:px-6 md:py-5">
                  <svg viewBox="0 0 20 20" className="mt-0.5 h-4 w-4 shrink-0 text-silver" aria-hidden>
                    <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="2" />
                  </svg>
                  {c.after}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Qué integramos ---------- */}
      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <Eyebrow>Lo que integramos en tu oficina</Eyebrow>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl">Un sistema completo, no un curso</h2>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-3 md:gap-4">
            {PILLARS.map((p, i) => (
              <article key={p.title} className="rounded-lg border border-line-strong bg-surface-2 p-6 sm:p-7">
                <div className="flex items-center justify-between">
                  <span className="h-0.5 w-8 bg-silver/70" />
                  <span className="text-[12px] font-medium tabular-nums text-faint">0{i + 1}</span>
                </div>
                <h3 className="mt-5 font-display text-[1.7rem] leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Calculadora ---------- */}
      <section className="px-4 pb-20 sm:pb-28">
        <div className="mx-auto max-w-5xl">
          <div className="mx-auto max-w-2xl text-center">
            <Eyebrow>Haz el cálculo</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              ¿Qué produce tu agencia si cada agente cierra <span className="text-muted">hasta 3 al día</span>?
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Mueve los valores con los números reales de tu equipo.
            </p>
          </div>
          <div className="mt-10">
            <ProductionCalculator />
          </div>
        </div>
      </section>

      {/* ---------- A quién buscamos ---------- */}
      <section className="border-y border-line bg-surface px-4 py-20 sm:py-28">
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-2 md:gap-16">
          <div className="text-center md:text-left">
            <Eyebrow>A quién buscamos</Eyebrow>
            <h2 className="mt-5 font-display text-4xl leading-tight sm:text-5xl">
              <span className="text-muted">Líderes de agencia que ya tienen</span> estructura
            </h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted">
              Esto no se soluciona con un mensaje ni con una llamada de cinco minutos. Trabajamos con pocas
              agencias, a fondo, para capturar juntos la cuota de mercado que nos corresponde.
            </p>
            <p className="mt-7 font-display text-2xl leading-snug sm:text-3xl">
              <span className="text-muted">No buscamos cantidad,</span> sino calidad.
            </p>
          </div>

          <ul className="divide-y divide-line-strong border-y border-line-strong">
            {FIT.map((f) => (
              <li key={f} className="flex items-start gap-4 py-4">
                <svg viewBox="0 0 20 20" className="mt-0.5 h-5 w-5 shrink-0 text-silver" aria-hidden>
                  <path d="M4.5 10.5l3.5 3.5 7.5-8" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
                <span className="text-[15px] leading-snug">{f}</span>
              </li>
            ))}
          </ul>

          <div className="rounded-lg border border-line-strong bg-black/40 p-6 sm:p-8 md:col-span-2">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted">Esto no es para ti si…</p>
            <ul className="mt-5 grid gap-x-10 gap-y-3 sm:grid-cols-2">
              {NOT_FIT.map((n) => (
                <li key={n} className="flex items-start gap-3 text-[14px] leading-snug text-muted">
                  <span className="mt-[1px] shrink-0 text-faint" aria-hidden>
                    ✕
                  </span>
                  {n}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ---------- Cómo funciona ---------- */}
      <section className="px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Cómo funciona</Eyebrow>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl">Tres pasos hasta tu oficina</h2>
          </div>

          <ol className="relative mt-12 space-y-10 before:absolute before:bottom-6 before:left-[19px] before:top-6 before:w-px before:bg-line-strong">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative flex gap-6">
                <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 bg-background text-sm font-semibold text-foreground">
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="font-display text-2xl">{s.title}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-muted">{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Preguntas frecuentes ---------- */}
      <section className="border-t border-line bg-surface px-4 py-20 sm:py-28">
        <div className="mx-auto max-w-3xl">
          <div className="text-center">
            <Eyebrow>Preguntas frecuentes</Eyebrow>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl">Antes de aplicar</h2>
          </div>
          <div className="mt-10 divide-y divide-line-strong border-y border-line-strong">
            {FAQ.map((f) => (
              <details key={f.q} className="group py-5">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-[16px] font-medium [&::-webkit-details-marker]:hidden">
                  {f.q}
                  <span className="text-xl leading-none text-silver transition-transform group-open:rotate-45" aria-hidden>
                    +
                  </span>
                </summary>
                <p className="mt-3 pr-8 text-[15px] leading-relaxed text-muted">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Cierre ---------- */}
      <section className="relative px-4 pb-20 pt-4 sm:pb-28">
        <div className="mx-auto max-w-2xl text-center">
          <span className="mx-auto block h-px w-16 bg-white/30" />
          <p className="mt-10 font-display text-3xl italic leading-snug sm:text-4xl">
            &ldquo;Mi objetivo es integrar mi tecnología, mi sistema de distribución y mi organización directamente
            en tu oficina.&rdquo;
          </p>
          <Logo variant="monogram" className="mx-auto mt-10 w-12 text-muted" />
        </div>
      </section>

      <footer className="border-t border-line px-4 py-8 text-center text-[11px] tracking-wide text-muted/70">
        <nav className="mb-3 flex justify-center gap-6 text-[12px]">
          <Link href="/privacy-policy" className="hover:text-foreground">
            Política de privacidad
          </Link>
          <Link href="/terms-of-service" className="hover:text-foreground">
            Términos del servicio
          </Link>
        </nav>
        © {new Date().getFullYear()} Visionary Elite. Todos los derechos reservados.
      </footer>
    </div>
  );
}
