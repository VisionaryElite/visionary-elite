import type { ReactNode } from "react";
import Logo from "@/components/Logo";

export default function ThankYou({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-dvh flex-1 flex-col">
      <header className="mx-auto w-full max-w-xl px-5 py-5">
        <Logo className="w-[84px] text-gold" />
      </header>

      <main className="step-in mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-5 pb-24">
        <div className="flex items-center gap-3">
          <span className="h-1.5 w-1.5 bg-gold" />
          <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-muted">{eyebrow}</p>
        </div>
        <h1 className="mt-5 font-display text-[2.4rem] leading-[1.08] sm:text-5xl">{title}</h1>
        <div className="mt-6 space-y-4 border-t border-line pt-6 text-[15px] leading-[1.7] text-muted">
          {children}
        </div>
      </main>
    </div>
  );
}
