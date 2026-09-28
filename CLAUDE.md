@AGENTS.md

# Reglas del proyecto visionary-elite.com

- **Git: Antony hace SIEMPRE `git add .`, `git commit` y `git push` él mismo.** Claude nunca commitea, pushea ni toca remotos/ramas.
- Identidad fija de este repo (config local, no la global): autor `VisionaryElite <info@visionary-elite.com>`, `user.useConfigOnly true`.
- Remoto por SSH con alias propio: `git@github-visionaryelite:VisionaryElite/visionary-elite.git` → `~/.ssh/id_visionaryelite` (ver `~/.ssh/config`). No usa el Administrador de credenciales de Windows.
- Sin `Co-Authored-By` de Claude en los commits.
- Deploy en Vercel (cuenta propia de Visionary Elite) lo hace Antony; nunca desplegar sin permiso explícito.
- Dev local: `npm run dev` en el puerto 3100.
