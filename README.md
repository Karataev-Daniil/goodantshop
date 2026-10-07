# GoodAntShop

Online store for ants and formicaria in Moldova — **[goodantshop.md](https://goodantshop.md)**.
My own product: I run the shop and built the whole site.

## Features

- Catalog of ant species, formicaria and accessories with product pages, gallery and reviews
- Cart and order form; orders go to a serverless API that sends email notifications
- Blog and an interactive map of ant species found in Moldova (Leaflet)
- Three languages: RU / RO / EN with hreflang
- **SEO-first build:** every route is prerendered to static HTML with its content, meta tags and JSON-LD, then hydrated on the client; sitemap and 404 page are generated at build time

## Stack

React · Vite · React Router · react-helmet-async · Node.js (Express for local API) · Vercel serverless functions · Resend

## Scripts

```bash
npm install
npm run dev        # Vite dev server
npm run dev:full   # dev server + local order API
npm run build      # client build + SSR build + prerender of all routes
npm run preview
```

Production order API needs `RESEND_API_KEY`, `ORDER_EMAIL`, `FROM_EMAIL` in the Vercel project settings.

## Structure

- `src/pages` — route components
- `src/components` — UI and SEO (`SEO.jsx`: meta and structured data)
- `src/data` — catalog, blog posts, reviews, species map data
- `scripts/prerender.mjs`, `scripts/routes.mjs` — static prerender, sitemap, 404
- `api/order.js` — serverless order handler
