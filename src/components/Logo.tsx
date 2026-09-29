import type { CSSProperties } from "react";

type Props = {
  variant?: "full" | "monogram";
  className?: string;
};

// Proporciones reales de los PNG de public/brand.
const ASSETS = {
  full: { src: "/brand/logo.png", ratio: "981 / 538" },
  monogram: { src: "/brand/monogram.png", ratio: "553 / 292" },
};

export default function Logo({ variant = "full", className = "" }: Props) {
  const a = ASSETS[variant];
  return (
    <div
      role="img"
      aria-label="Visionary Elite"
      className={`logo-mask gold-gradient ${className}`}
      style={{ "--logo": `url(${a.src})`, aspectRatio: a.ratio } as CSSProperties}
    />
  );
}
