# aafc-lander

The **AAFC landing page** — a full-stack React + Express + TypeScript site with portfolio preview cards and a builds page. Maintained by the Marchitects org. Live at https://aafc-lander.vercel.app.

## What's inside

- `client/` — React 18 + TypeScript frontend (Vite, Tailwind CSS, Framer Motion, Radix UI components).
- `server/` — Express API server.
- `shared/` — shared TypeScript schema.
- `design_guidelines.md`, `drizzle.config.ts`, `vite.config.ts`, `vercel.json` — configs.

## How to run

```bash
npm install
npm run dev      # dev server
npm run build    # production build
npm start        # serve the production build
npm run db:push  # sync Drizzle schema to the database
```

The live site is deployed on Vercel at https://aafc-lander.vercel.app.
