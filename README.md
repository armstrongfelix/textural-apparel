# TEXTURA APPARELS — E-Commerce Web Application

A React-based e-commerce frontend built with Vite, Tailwind CSS v4, and React Router. Features user authentication, product catalog with detail pages, cart management, checkout flow, and mock payment processing.

---

## Tech Stack

| Layer          | Technology                                |
| -------------- | ----------------------------------------- |
| Framework      | React 19 with JSX (no TypeScript)         |
| Build Tool     | Vite 8                                    |
| Styling        | Tailwind CSS v4 (no config file, no PostCSS) |
| Routing        | React Router DOM v7                       |
| HTTP Client    | Axios                                     |
| State Mgmt     | Context API + useReducer                  |
| Linting        | ESLint 10 with flat config                |

---

## Getting Started

### Prerequisites

- Node.js >= 18

### Setup

```bash
# 1. Install dependencies
npm install

# 2. Create environment file
echo "VITE_API_BASE_URL=http://localhost:5000/api" > .env

# 3. Start dev server
npm run dev
```

### Available Scripts

| Command             | Description                  |
| ------------------- | ---------------------------- |
| `npm run dev`       | Start Vite dev server        |
| `npm run build`     | Production build to `dist/`  |
| `npm run preview`   | Preview production build     |
| `npm run lint`      | Run ESLint on all files      |

---

## Environment Variables

Create a `.env` file in the project root (already gitignored):

```
VITE_API_BASE_URL=http://localhost:5000/api
```

This variable is consumed by `src/services/api.js` via `import.meta.env.VITE_API_BASE_URL`. The owner swaps in the real backend URL here.

---

## Project Structure

```
src/
├── main.jsx               # Entry point: BrowserRouter + AppStateProvider
├── App.jsx                # Route definitions with ProtectedRoute guards
├── index.css              # Tailwind v4 @theme (custom color palette)
│
├── services/
│   └── api.js             # Axios instance using VITE_API_BASE_URL
│
├── context/
│   └── AppState.jsx       # Global state: user auth + cart (useReducer)
│
├── components/
│   ├── Navbar.jsx         # Responsive nav (hamburger on mobile), auth-aware
│   ├── Footer.jsx         # Footer with social media links
│   ├── ProductCard.jsx    # <figure>/<figcaption> card, links to detail page
│   └── ProtectedRoute.jsx # Redirects unauthenticated users to /login
│
└── pages/
    ├── Login.jsx          # Sign-in form → POST /auth/login
    ├── Register.jsx       # Sign-up form → POST /auth/signup
    ├── ProductList.jsx    # GET /products → grid of ProductCards
    ├── ProductDetail.jsx  # GET /products/:id → full product view
    ├── Cart.jsx           # Cart with qty controls + removal (red accent)
    ├── Checkout.jsx       # Shipping form + order summary (asymmetric grid)
    ├── Order.jsx          # Order confirmation with status
    └── Payment.jsx        # Mock "Pay Now" — clears cart on success
```

---

## Color Palette

All colors are defined in `src/index.css` using Tailwind's `@theme` directive. Usage is strictly enforced:

| Color        | Hex       | Usage                                       |
| ------------ | --------- | ------------------------------------------- |
| Dark Blue    | `#1e3a5f` | Main branding, primary buttons, headings    |
| Light Blue   | `#7ab2d3` | Accents, hover states, secondary elements   |
| Black        | `#111111` | High-contrast text, borders                 |
| Red          | `#dc2626` | Destructive actions **only** (remove, errors, logout) |

---

## Authentication & Routes

### Public Routes
| Path       | Page       |
| ---------- | ---------- |
| `/login`   | Login      |
| `/register`| Register   |

### Protected Routes (require authentication)
| Path             | Page           |
| ---------------- | -------------- |
| `/products`      | Product List   |
| `/products/:id`  | Product Detail |
| `/cart`          | Cart           |
| `/checkout`      | Checkout       |
| `/order`         | Order          |
| `/payment`       | Payment        |

Unauthenticated users are redirected to `/login`.

### API Payloads

**Signup** (`POST /auth/signup`):
```json
{ "email": "user@example.com", "password": "pass1234", "role": "customer" }
```
Role can be `"customer"` or `"admin"`.

**Login** (`POST /auth/login`):
```json
{ "email": "user@example.com", "password": "pass1234" }
```
The server returns the user object with the role attached.

---

## State Management

Global state is managed via React Context + `useReducer` in `src/context/AppState.jsx`. Exposed through the `useApp()` hook:

```jsx
const {
  user,           // Authenticated user object or null
  cart,           // Array of { _id, name, price, description, imageUrl, qty }
  cartTotal,      // Computed total price
  login(),        // (email, password) → POST /auth/login
  signup(),       // (email, password, role) → POST /auth/signup
  logout(),       // Clears user + cart
  addToCart(),    // (product) → increments qty or adds new item
  removeFromCart(),// (id) → removes item
  updateQty(),    // (id, qty) → min 1
  clearCart(),    // Empties cart
} = useApp()
```

---

## API Integration

All API calls are centralized in `src/services/api.js`:

```js
import api from '../services/api'

// GET /products
api.get('/products')

// GET /products/:id
api.get(`/products/${id}`)

// POST /auth/login
api.post('/auth/login', { email, password })

// POST /auth/signup
api.post('/auth/signup', { email, password, role })
```

The owner can swap in real endpoints by editing the `.env` file. The API response structure used:

```json
{
  "_id": "68cdaadd523d666a836e074d",
  "name": "Shoes",
  "price": 510.56,
  "stock": 5,
  "description": "3rd generation",
  "imageUrl": "https://...",
  "createdAt": "2025-09-19T19:11:25.974Z",
  "updatedAt": "2025-09-19T19:11:25.974Z"
}
```

---

## User Flow

1. **Register or Login** → redirected to Product List
2. **Browse Products** → click a card to see full details
3. **Add to Cart** → items accumulate with quantities
4. **Cart** → adjust qty or remove items (red accent)
5. **Checkout** → fill shipping form, review order summary
6. **Order** → confirmation page with pending status
7. **Payment** → "Pay Now" clears cart (mock)

---

## UI Conventions

- Semantic HTML: `<nav>`, `<main>`, `<footer>`, `<section>`, `<figure>`, `<figcaption>`
- Responsive: hamburger nav on mobile (`< sm`), full nav on larger screens
- Micro-interactions: `hover:-translate-y-0.5` on cards, `transition-colors` on links and buttons
- Cart removal uses red accent color exclusively
- No inline styles or custom CSS files — all styling via Tailwind utility classes
