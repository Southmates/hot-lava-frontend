# Hot Lava Agency — Frontend (Astro)

Este repositorio contiene el **frontend** del sitio de Hot Lava Agency, construido con **Astro** y consumiendo contenido desde **Sanity** (headless CMS).

El foco de este README es **desarrollo local y estructura del frontend** (no el modelado/operación editorial del CMS).

---

## Requisitos

- **Node.js**: recomendado LTS (p. ej. 20+)
- **npm** (este repo incluye `package-lock.json`)

---

## Primeros pasos (desarrollo local)

Instalar dependencias:

```bash
npm ci
```

Levantar el servidor de desarrollo:

```bash
npm run dev
```

Build de producción (estático):

```bash
npm run build
```

Previsualizar el build:

```bash
npm run preview
```

---

## Stack (frontend)

- **Framework**: Astro (`astro@4`)
- **Estilos**: SCSS (`sass`) vía Vite
- **Animación**: GSAP (+ ScrollTrigger)
- **UI/UX libs**: Swiper, Lenis, Ukiyo
- **3D**: Three.js
- **Contenido**: Sanity (headless, consumido desde el frontend)

---

## Estructura del proyecto

```text
/
├── .github/workflows/     # CI/CD (build + deploy)
├── docs/                  # Documentación de arquitectura/deploy
├── public/                # Assets estáticos no gestionados por CMS
└── src/
    ├── pages/             # Rutas Astro (entrada principal: index.astro)
    ├── layouts/           # Layouts (SEO, OG, schema.org, canonical)
    ├── components/        # Componentes Astro
    │   └── sections/      # Secciones del home (Hero/Intro/About/Work/Products)
    ├── data/              # Capa de datos (queries/fetch a Sanity por dominio)
    ├── lib/               # Integraciones (cliente Sanity, helpers)
    ├── scripts/           # JS de comportamiento (GSAP/Three/efectos)
    └── styles/            # SCSS (global.scss + parciales)
```

Alias de imports:
- `@/*` apunta a `src/*` (ver `tsconfig.json`).

---

## Dónde tocar qué (guía rápida)

- **Composición/render del home**: `src/pages/index.astro`
- **Secciones**: `src/components/sections/*.astro`
- **Layout/SEO/canonical/OG/JSON-LD**: `src/layouts/BaseLayout.astro`
- **Estilos globales**: `src/styles/global.scss`
- **Animaciones/efectos**: `src/scripts/*` y `src/scripts/utils/*`

---

## Contenido (Sanity) en el frontend

El frontend consume contenido vía `@sanity/client`, configurado en `src/lib/sanity.ts`, y expone “fetchers” por dominio en `src/data/*`.

Composición típica en `src/pages/index.astro`:
- carga `siteSettings`, `hero`, `intro`, `team`, `works`, `products`
- renderiza secciones con esos props

Nota: hoy el `projectId/dataset` están definidos en código (ver `src/lib/sanity.ts`).  
En CI existen secretos `SANITY_PROJECT_ID` y `SANITY_DATASET` (ver workflow) por si se quiere migrar a configuración por entorno.

---

## Deploy (resumen)

El deploy es **event-driven**: un publish en Sanity dispara un flujo que construye y despliega el build estático.

Documentación relevante:
- `docs/architecture-overview.md`
- `docs/deployment-flow.md`
- Workflow: `.github/workflows/deploy.yml`

---

## Notas operativas / troubleshooting

- **Cache en hosting**: el hosting aplica cache a nivel HTML; tras un deploy puede requerirse **purga manual** en SiteGround para ver cambios inmediatamente (ver `docs/deployment-flow.md`).
- **Assets**: assets “no-CMS” viven en `public/`. Media gestionada por Sanity se sirve desde el CDN de Sanity.

---

## License

Proyecto privado — todos los derechos reservados.

---

 