# TEXTURA APPARELS — Agent Guide

## Quick Start
```sh
npm install react-router-dom axios   # required, not yet installed
npm run dev          # Vite dev server
npm run build        # production build
npm run lint         # ESLint flat config
```

## Must Fix Before Building
1. Create `.env`: `VITE_API_BASE_URL=http://localhost:5000/api`
2. Add `.env` line to `.gitignore`
3. Run `npm install react-router-dom axios`

## Tech Stack
- **Plain .jsx** — no TypeScript
- **Tailwind CSS v4** — no `tailwind.config.js`. Theme via `@theme` in `src/index.css`. No custom CSS files or inline styles.
- **ESLint flat config** (`eslint.config.js`) — add rules in array format.

## Project State
- Scaffold only: `main.jsx`, empty `App.jsx`, `index.css`, `assets/`
- **No components, pages, context, or services exist** — build everything.
- `react-router-dom` and `axios` missing.

## Architecture
```
src/
  assets/          # Static images/icons
  components/      # Navbar, Footer, ProductCard, ProtectedRoute
  context/         # AppState.jsx — user + cart via Context API
  pages/           # Login, Register, ProductList, Cart, Checkout, Order, Payment
  services/        # api.js — fetch client using import.meta.env.VITE_API_BASE_URL
```

## Auth Payloads
- **Signup**: `{ email, password, role }` — role is `"customer"` or `"admin"`
- **Login**: `{ email, password }` — no role sent; server returns user with role
- **Route guard**: unauthenticated → redirect to `/login`

## Color Palette (Strict)
| Color      | Usage |
|------------|-------|
| Dark Blue  | Main branding, primary UI |
| Light Blue | Accents, secondary elements |
| Black      | High-contrast text, borders |
| Red        | Destructive actions ONLY (delete, errors, alerts) |

No purple/magenta/indigo gradients.

## UI/UX Constraints
- **BANNED**: centered hero + giant CTA + mockup; 3-column card grids; "AI gradients"; nested `<div>` soup.
- **MANDATED**: asymmetric grids (`col-span-7 + col-span-5`); editorial typography (`tracking-tighter`, `py-24`); semantic HTML (`<figure>`/`<figcaption>` for product cards, `<section>`, `<nav>`, `<main>`, `<footer>`); micro-interactions (`hover:-translate-y-0.5`).
- **Product card**: display only `name`, `price`, `description` from API.
- **Payment page**: mock "Pay Now" clears cart on success.
- **Cart removal**: red accent color only.

## API Layer
- `services/api.js` uses `import.meta.env.VITE_API_BASE_URL` as placeholder
- Implement fetching logic only; owner swaps in real endpoints later
