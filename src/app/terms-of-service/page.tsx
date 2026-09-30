import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Términos del servicio | Visionary Elite",
  description: "Condiciones de uso del sitio y de la aplicación al programa de Visionary Elite.",
};

export default function TermsOfService() {
  return (
    <LegalPage title="Términos del servicio">
      <p>
        Estos términos regulan el uso de <strong>visionaryelite.net</strong> y de la aplicación a nuestro programa.
        Al usar el sitio o enviar una aplicación, aceptas estos términos. Si no estás de acuerdo, no uses el sitio.
      </p>

      <h2>1. Qué hace Visionary Elite</h2>
      <p>
        Visionary Elite trabaja con agencias de seguros de vida en los Estados Unidos para integrar tecnología,
        distribución de leads y organización en su operación. El contenido del sitio es informativo y no constituye
        una oferta vinculante. Cualquier relación comercial se rige por un acuerdo escrito aparte, firmado por ambas
        partes.
      </p>

      <h2>2. Quién puede aplicar</h2>
      <ul>
        <li>Debes ser mayor de 18 años.</li>
        <li>Debes ser un agente o líder de agencia con licencia de seguros vigente en los Estados Unidos.</li>
        <li>Debes tener autoridad para representar a la agencia por la que aplicas.</li>
      </ul>

      <h2>3. Tu aplicación</h2>
      <ul>
        <li>
          Te comprometes a dar información verdadera, completa y actual. Verificamos el NPN: si no coincide con tu
          nombre, no serás contactado.
        </li>
        <li>
          Enviar una aplicación no garantiza que seas aceptado ni crea obligación alguna para ninguna de las partes.
          Nos reservamos el derecho de aceptar o rechazar aplicaciones a nuestra discreción.
        </li>
      </ul>

      <h2>4. Resultados y proyecciones</h2>
      <p>
        Las cifras, metas y ejemplos del sitio, incluidos la calculadora de producción, la meta de pólizas diarias
        por agente y los casos de agencias, son ilustrativos. <strong>No garantizamos resultados.</strong> La
        producción de cada agencia depende de factores como su equipo, su mercado, su gestión y su cumplimiento
        normativo.
      </p>

      <h2>5. Comunicaciones</h2>
      <p>
        Al enviar tu aplicación aceptas que te contactemos por teléfono, SMS y correo electrónico según lo descrito
        en nuestra <a href="/privacy-policy">Política de privacidad</a>. Puedes darte de baja de los SMS
        respondiendo STOP.
      </p>

      <h2>6. Cumplimiento</h2>
      <p>
        Cada agencia y cada agente son responsables de cumplir las leyes y regulaciones que les aplican, incluidas
        las de licencias de seguros, protección al consumidor y telemercadeo.
      </p>

      <h2>7. Propiedad intelectual</h2>
      <p>
        El contenido del sitio, incluidos textos, videos, logotipos y diseño, pertenece a Visionary Elite o a sus
        licenciantes. No puedes copiarlo, modificarlo ni distribuirlo sin nuestra autorización por escrito.
      </p>

      <h2>8. Uso permitido</h2>
      <p>
        No puedes usar el sitio con fines ilegales, enviar información falsa o de terceros, intentar acceder sin
        autorización a nuestros sistemas ni interferir con su funcionamiento.
      </p>

      <h2>9. Limitación de responsabilidad</h2>
      <p>
        El sitio se ofrece &ldquo;tal cual&rdquo; y &ldquo;según disponibilidad&rdquo;. En la medida en que la ley
        lo permita, Visionary Elite no será responsable por daños indirectos, incidentales o consecuentes, ni por
        pérdidas de ingresos o de negocio derivadas del uso del sitio o de decisiones tomadas con base en su
        contenido.
      </p>

      <h2>10. Enlaces y servicios de terceros</h2>
      <p>
        El sitio puede incluir servicios o enlaces de terceros, como el reproductor de video o herramientas para
        agendar llamadas. No controlamos esos servicios y no somos responsables de su contenido ni de sus políticas.
      </p>

      <h2>11. Cambios</h2>
      <p>
        Podemos modificar estos términos en cualquier momento. La versión vigente estará siempre publicada en esta
        página con su fecha de actualización.
      </p>

      <h2>12. Ley aplicable</h2>
      <p>Estos términos se rigen por las leyes aplicables de los Estados Unidos.</p>

      <h2>13. Contacto</h2>
      <p>
        Si tienes preguntas sobre estos términos, escríbenos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
