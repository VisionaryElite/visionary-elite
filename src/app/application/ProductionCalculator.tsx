"use client";

import { useState } from "react";

const usd = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
const num = new Intl.NumberFormat("en-US");

function compact(v: number) {
  if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(v >= 10_000_000 ? 0 : 1)}M`;
  if (v >= 1_000) return `$${Math.round(v / 1_000)}K`;
  return usd.format(v);
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <div className="flex items-baseline justify-between gap-4">
        <span className="text-[13px] text-muted">{label}</span>
        <span className="font-display text-2xl text-foreground">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="range mt-3 w-full"
        style={{ "--pct": `${pct}%` } as React.CSSProperties}
      />
    </label>
  );
}

// Proyección ilustrativa sobre la meta del sistema: pólizas por agente al día.
export default function ProductionCalculator() {
  const [agents, setAgents] = useState(25);
  const [perDay, setPerDay] = useState(3);
  const [premium, setPremium] = useState(1500);
  const [days, setDays] = useState(20);

  const policies = agents * perDay * days;
  const production = policies * premium;

  return (
    <div className="grid overflow-hidden rounded-lg border border-line-strong md:grid-cols-2">
      <div className="space-y-7 bg-surface-2 p-6 sm:p-8">
        <Slider label="Agentes activos" value={agents} display={String(agents)} min={10} max={200} step={5} onChange={setAgents} />
        <Slider
          label="Pólizas por agente al día"
          value={perDay}
          display={String(perDay)}
          min={1}
          max={3}
          step={1}
          onChange={setPerDay}
        />
        <Slider
          label="Prima anual promedio por póliza"
          value={premium}
          display={usd.format(premium)}
          min={600}
          max={5000}
          step={100}
          onChange={setPremium}
        />
        <Slider label="Días hábiles al mes" value={days} display={String(days)} min={16} max={26} step={1} onChange={setDays} />
      </div>

      <div className="flex flex-col justify-center border-t border-line-strong bg-black p-6 text-center sm:p-8 md:border-l md:border-t-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">Producción mensual potencial</p>
        <p className="mt-4 font-display text-6xl leading-none text-gold sm:text-7xl">{compact(production)}</p>
        <p className="mt-3 text-sm text-muted">en prima anualizada</p>

        <div className="mx-auto mt-8 grid w-full max-w-xs grid-cols-2 divide-x divide-line-strong border-y border-line-strong py-4">
          <div>
            <p className="font-display text-2xl">{num.format(policies)}</p>
            <p className="mt-1 text-[12px] text-muted">pólizas al mes</p>
          </div>
          <div>
            <p className="font-display text-2xl">{num.format(agents * perDay)}</p>
            <p className="mt-1 text-[12px] text-muted">pólizas al día</p>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-xs text-[11px] leading-relaxed text-faint">
          Cálculo ilustrativo con tus propios números. No es una garantía de resultados: la producción real depende
          de cada agencia y de su equipo.
        </p>
      </div>
    </div>
  );
}
