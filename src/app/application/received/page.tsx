import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Gracias por aplicar | Visionary Elite",
  robots: { index: false },
};

// Thank you para quien no cumple el mínimo de 10 agentes: el lead se envía
// igual a n8n, marcado como "no_califica". El mensaje no lo rechaza de frente.
export default function ThankYouNotQualified() {
  return (
    <ThankYou eyebrow="Gracias por aplicar" title="Hemos recibido tu aplicación">
      <p>
        Por ahora trabajamos con agencias que cuentan con al menos 10 agentes activos y estructura física, para
        poder integrar nuestro sistema a fondo.
      </p>
      <p>
        Guardamos tu información. Si tu agencia está en ese camino, nos pondremos en contacto cuando sea el
        momento indicado.
      </p>
    </ThankYou>
  );
}
