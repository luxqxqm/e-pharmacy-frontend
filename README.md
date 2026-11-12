# E-Pharmacy (client)

Frontend for an online pharmacy platform: medicine catalog with search and filters, pharmacy list, product pages, user registration and a shopping cart with checkout.

- **Backend:** [E-Pharmacy-server](https://github.com/luxqxqm/E-Pharmacy-server-) (Express 5 + MongoDB)
- **API docs (Swagger):** https://e-pharmacy-server-q6sm.onrender.com/api-docs

> The backend runs on Render's free tier, so the first request after a pause can take up to a minute.

## Tech stack

- **Next.js 16** (App Router) + **TypeScript**
- **CSS Modules** with design tokens (CSS custom properties), mobile-first
- **axios** for API requests (token refresh in an interceptor)
- **react-hook-form** for forms and validation
- **react-hot-toast** for notifications
- `next/font`, `next/image`, SVG sprite

## Pages

| Route             | Access  | Description                                                    |
| ----------------- | ------- | -------------------------------------------------------------- |
| `/home`           | public  | Main banner, promo banners, nearest stores, reviews            |
| `/medicine-store` | public  | All pharmacies with rating and OPEN / CLOSE status             |
| `/medicine`       | public  | Catalog: filter by category and name, server-side pagination   |
| `/product/[id]`   | public  | Product overview, quantity, Add to cart, Description / Reviews |
| `/cart`           | private | Cart items, shipping form, payment method, Place order         |
| `/login`          | public  | Login form                                                     |
| `/register`       | public  | Registration with auto login                                   |
| `/features`       | public  | Platform features ("Read more" from the promo banner)          |

## Getting started

```bash
git clone https://github.com/luxqxqm/E-Pharmacy-client.git
cd E-Pharmacy-client
npm install
cp .env.example .env
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment variables

| Variable              | Description                                                             |
| --------------------- | ----------------------------------------------------------------------- |
| `NEXT_PUBLIC_API_URL` | Backend API URL, e.g. `https://e-pharmacy-server-q6sm.onrender.com/api` |

### Scripts

| Command             | What it does              |
| ------------------- | ------------------------- |
| `npm run dev`       | start dev server          |
| `npm run build`     | production build          |
| `npm run lint`      | ESLint                    |
| `npm run typecheck` | TypeScript check          |
| `npm run format`    | format code with Prettier |
