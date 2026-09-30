import type { Metadata } from "next";
import ThankYou from "@/components/ThankYou";

export const metadata: Metadata = {
  title: "Aplicación recibida | Visionary Elite",
  robots: { index: false },
};

// Thank you para agencias que califican.
export default function ThankYouQualified() {
  return (
    <ThankYou
      eyebrow="Aplicación recibida"
      title={
        <>
          <span className="text-muted">Tu agencia</span> califica <span className="text-muted">para el siguiente paso</span>
        </>
      }
    >
      <p>
        Revisaremos tu información y un miembro de nuestro equipo te contactará para agendar la llamada previa.
      </p>
      <p>
        En esa llamada validaremos nuestra alineación y, si encajamos, coordinaremos la visita presencial a tu
        oficina.
      </p>
      <p className="text-foreground">Mantente atento a tu teléfono y a tu correo.</p>
    </ThankYou>
  );
}
