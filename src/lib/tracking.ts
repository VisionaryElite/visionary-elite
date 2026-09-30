// Eventos al dataLayer de GTM. Aquí solo se empujan eventos: los pixels y sus
// disparadores se configuran en Google Tag Manager, no en el código.

export const GTM_ID = "GTM-W3LKPW2B";

type DataLayerEvent = Record<string, unknown> & { event: string };

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export function pushEvent(data: DataLayerEvent) {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(data);
}

// Empuja el evento y navega cuando GTM confirma que procesó sus tags
// (o a los 2 s, si GTM está bloqueado o no cargó), para no perder la conversión.
export function pushEventThenGo(data: DataLayerEvent, url: string) {
  let gone = false;
  const go = () => {
    if (gone) return;
    gone = true;
    window.location.assign(url);
  };
  pushEvent({ ...data, eventCallback: go, eventTimeout: 2000 });
  setTimeout(go, 2500);
}
