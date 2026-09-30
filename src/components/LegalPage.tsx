import Link from "next/link";
import type { ReactNode } from "react";
import Logo from "@/components/Logo";

export const LEGAL_UPDATED = "30 de septiembre de 2026";
export const CONTACT_EMAIL = "info@visionary-elite.com";

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex-1">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-5">
          <Link href="/application" aria-label="Visionary Elite">
            <Logo className="w-[84px]" />
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-silver">Legal</p>
        <h1 className="mt-4 font-display text-4xl leading-tight sm:text-5xl">{title}</h1>
        <p className="mt-4 text-sm text-muted">Última actualización: {LEGAL_UPDATED}</p>

        <div className="legal mt-12 border-t border-line pt-10">{children}</div>
      </main>

      <footer className="border-t border-line px-5 py-8 text-center text-[12px] text-muted">
        <nav className="flex justify-center gap-6">
          <Link href="/privacy-policy" className="hover:text-foreground">
            Política de privacidad
          </Link>
          <Link href="/terms-of-service" className="hover:text-foreground">
            Términos del servicio
          </Link>
        </nav>
        <p className="mt-4 text-faint">© {new Date().getFullYear()} Visionary Elite</p>
      </footer>
    </div>
  );
}
