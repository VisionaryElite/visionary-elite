import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No hay home todavía: la raíz lleva al funnel. Temporal (307) para poder
  // poner un home más adelante sin que los navegadores lo tengan cacheado.
  // Los parámetros de la URL (UTM, fbclid) se conservan en la redirección.
  async redirects() {
    return [{ source: "/", destination: "/application", permanent: false }];
  },
};

export default nextConfig;
