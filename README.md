# Hot Lava Agency — Frontend (Astro)

This repository contains the **frontend** for the Hot Lava Agency website, built with **Astro** and consuming content from **Sanity** (headless CMS).

The focus of this README is **local development and frontend structure** (not CMS modeling/editorial operations).

---

## Requirements

- **Node.js**: LTS recommended (e.g. 20+)
- **npm** (this repo includes `package-lock.json`)

---

## Getting started (local development)

Install dependencies:

```bash
npm ci
```

Start the dev server:

```bash
npm run dev
```

Production build (static):

```bash
npm run build
```

Preview the build:

```bash
npm run preview
```

---

## Frontend stack

- **Framework**: Astro (`astro@4`)
- **Styling**: SCSS (`sass`) via Vite
- **Animation**: GSAP (+ ScrollTrigger)
- **UI/UX libs**: Swiper, Lenis, Ukiyo
- **3D**: Three.js
- **Content**: Sanity (headless, consumed by the frontend)

---

## Project structure

```text
/
├── .github/workflows/     # CI/CD (build + deploy)
├── docs/                  # Architecture/deployment documentation
├── public/                # Static assets not managed by the CMS
└── src/
    ├── pages/             # Astro routes (entry point: index.astro)
    ├── layouts/           # Layouts (SEO, OG, schema.org, canonical)
    ├── components/        # Componentes Astro
    │   └── sections/      # Homepage sections (Hero/Intro/About/Work/Products)
    ├── data/              # Data layer (Sanity queries/fetchers by domain)
    ├── lib/               # Integrations (Sanity client, helpers)
    ├── scripts/           # Client-side behavior (GSAP/Three/effects)
    └── styles/            # SCSS (global.scss + partials)
```

Import alias:
- `@/*` maps to `src/*` (see `tsconfig.json`).

---

## Where to change what (quick guide)

- **Homepage composition/rendering**: `src/pages/index.astro`
- **Sections**: `src/components/sections/*.astro`
- **Layout/SEO/canonical/OG/JSON-LD**: `src/layouts/BaseLayout.astro`
- **Global styles**: `src/styles/global.scss`
- **Animations/effects**: `src/scripts/*` and `src/scripts/utils/*`

---

## Sanity content in the frontend

The frontend consumes content via `@sanity/client`, configured in `src/lib/sanity.ts`, and exposes domain fetchers in `src/data/*`.

Typical composition in `src/pages/index.astro`:
- loads `siteSettings`, `hero`, `intro`, `team`, `works`, `products`
- renders sections using those props

Note: today the `projectId/dataset` are defined in code (see `src/lib/sanity.ts`).  
In CI there are secrets `SANITY_PROJECT_ID` and `SANITY_DATASET` (see the workflow) in case you want to migrate to environment-based configuration.

---

## Deployment (summary)

Deployments are **event-driven**: publishing in Sanity triggers a flow that builds and deploys the static frontend.

Relevant docs:
- `docs/architecture-overview.md`
- `docs/deployment-flow.md`
- Workflow: `.github/workflows/deploy.yml`

---

## Operational notes / troubleshooting

- **Hosting cache**: the hosting environment applies HTML-level caching; after a deploy, **manual cache invalidation** in SiteGround may be required to see HTML changes immediately (see `docs/deployment-flow.md`).
- **Assets**: non-CMS assets live in `public/`. Media managed via Sanity is served from Sanity’s CDN.

---

## License

Private project — all rights reserved.

---

 