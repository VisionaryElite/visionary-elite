import type { Metadata } from "next";
import LegalPage, { CONTACT_EMAIL } from "@/components/LegalPage";

export const metadata: Metadata = {
  title: "Política de privacidad | Visionary Elite",
  description: "Cómo Visionary Elite recopila, usa y protege la información de quienes aplican a su programa.",
};

export default function PrivacyPolicy() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        En Visionary Elite (&ldquo;Visionary Elite&rdquo;, &ldquo;nosotros&rdquo;) trabajamos con líderes y
        agencias de seguros de vida en los Estados Unidos. Esta política explica qué información recopilamos cuando
        visitas <strong>visionaryelite.net</strong> o envías una aplicación, cómo la usamos y qué opciones tienes.
      </p>

      <h2>1. Información que recopilamos</h2>
      <p>Cuando completas nuestra aplicación, recopilamos la información que tú nos das:</p>
      <ul>
        <li>Nombre, apellido, número de teléfono y correo electrónico.</li>
        <li>Tu NPN (National Producer Number).</li>
        <li>
          Datos de tu agencia: nombre, número de agentes totales y activos, rango de Issue Paid mensual, cómo generas
          tus leads, inversión mensual aproximada en marketing y objetivo de producción.
        </li>
      </ul>
      <p>También recopilamos información de forma automática cuando navegas el sitio:</p>
      <ul>
        <li>Dirección IP, tipo de navegador y dispositivo.</li>
        <li>La página desde la que llegaste y los parámetros de campaña de la URL (por ejemplo, UTM).</li>
        <li>
          Datos de uso obtenidos mediante cookies y tecnologías similares, incluidas herramientas de medición y
          publicidad de terceros.
        </li>
      </ul>

      <h2>2. Cómo usamos la información</h2>
      <ul>
        <li>Evaluar tu aplicación y determinar si tu agencia encaja con nuestro programa.</li>
        <li>Verificar tu licencia, incluido que tu NPN corresponda con tu nombre en registros públicos.</li>
        <li>Contactarte por teléfono, SMS o correo electrónico sobre tu aplicación y agendar llamadas o visitas.</li>
        <li>Medir y mejorar nuestro sitio, nuestros anuncios y nuestros procesos.</li>
        <li>Cumplir obligaciones legales y proteger nuestros derechos.</li>
      </ul>

      <h2>3. Comunicaciones por teléfono y SMS</h2>
      <p>
        Al enviar tu aplicación aceptas que Visionary Elite te contacte al número que proporcionaste, incluso mediante
        llamadas y mensajes de texto, sobre tu aplicación y nuestros servicios. La frecuencia de los mensajes varía.
        Pueden aplicar tarifas de mensajes y datos de tu operador. Puedes dejar de recibir SMS en cualquier momento
        respondiendo <strong>STOP</strong>, y pedir ayuda respondiendo <strong>HELP</strong>. El consentimiento no
        es una condición para contratar ningún servicio.
      </p>
      <p>
        No vendemos ni compartimos tu número de teléfono ni tu consentimiento para recibir SMS con terceros para
        fines de marketing.
      </p>

      <h2>4. Con quién compartimos la información</h2>
      <p>No vendemos tu información personal. Solo la compartimos con:</p>
      <ul>
        <li>
          Proveedores que nos ayudan a operar: alojamiento del sitio, automatización, CRM, telefonía y correo. Solo
          la usan para prestarnos el servicio.
        </li>
        <li>Plataformas de publicidad y analítica, a través de cookies, para medir el rendimiento de campañas.</li>
        <li>Autoridades, cuando la ley lo exija o para proteger nuestros derechos.</li>
        <li>Un sucesor, en caso de fusión, adquisición o venta de activos.</li>
      </ul>

      <h2>5. Cookies</h2>
      <p>
        Usamos cookies para que el sitio funcione, recordar datos de tu visita y medir campañas. Puedes bloquearlas
        o borrarlas desde la configuración de tu navegador; algunas funciones del sitio podrían dejar de funcionar.
      </p>

      <h2>6. Conservación y seguridad</h2>
      <p>
        Conservamos tu información mientras sea necesaria para los fines descritos o mientras la ley lo requiera.
        Aplicamos medidas técnicas y organizativas razonables para protegerla, aunque ningún sistema es
        completamente seguro.
      </p>

      <h2>7. Tus derechos</h2>
      <p>
        Puedes pedirnos acceder a tu información, corregirla o eliminarla, y dejar de recibir comunicaciones.
        Según tu estado de residencia (por ejemplo, California), puedes tener derechos adicionales. Para ejercerlos,
        escríbenos a <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>

      <h2>8. Menores de edad</h2>
      <p>
        Este sitio está dirigido a profesionales licenciados. No recopilamos a sabiendas información de menores de
        18 años.
      </p>

      <h2>9. Cambios a esta política</h2>
      <p>
        Podemos actualizar esta política. Publicaremos la versión vigente en esta página con su fecha de
        actualización.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Si tienes preguntas sobre esta política, escríbenos a{" "}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
      </p>
    </LegalPage>
  );
}
