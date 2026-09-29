"use client";

import { useEffect } from "react";

export const TRACKING_STORAGE_KEY = "ve_tracking";
const PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term", "fbclid", "gclid", "ttclid"];

// Guarda los UTM / click ids de la primera visita para mandarlos con la aplicación,
// aunque el CTA del video lleve al formulario sin los parámetros.
export default function TrackingCapture() {
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const prev = JSON.parse(sessionStorage.getItem(TRACKING_STORAGE_KEY) || "{}");
      const next: Record<string, string> = { ...prev };
      for (const p of PARAMS) {
        const v = url.searchParams.get(p);
        if (v) next[p] = v;
      }
      next.landing_url ||= window.location.href;
      next.referrer ||= document.referrer;
      sessionStorage.setItem(TRACKING_STORAGE_KEY, JSON.stringify(next));
    } catch {
      // Sin sessionStorage (modo privado estricto): se envía sin tracking.
    }
  }, []);
  return null;
}

export function readTracking(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem(TRACKING_STORAGE_KEY) || "{}");
  } catch {
    return {};
  }
}
