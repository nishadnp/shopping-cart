# SwiftStore - Shopping Cart

## Project Overview

SwiftStore is a modular e-commerce storefront that pulls mock inventory data dynamically from the [Fake Store API](https://fakestoreapi.com/). The application is designed around a clean, single-direction flow: global cart state lives at the root `App` layout and is distributed throughout nested routes using React Router's `useOutletContext()`.

Key architectural patterns:
- Unidirectional Data Flow: All cart state mutations originate in `src/App.jsx`, while child pages consume actions and state through `Outlet` context.
- Lifted Global State Management: `App` owns `cart`, `handleAddToCart`, `handleUpdateQuantity`, and `handleRemoveFromCart` and exposes them to route children.
- Scoped Styling: All page and component styles use CSS Modules to prevent global namespace collisions, while root design tokens are defined in `src/index.css`.

## Key Feature Architecture

### Dynamic Inventory Sync
- The `Shop` page fetches inventory from `src/services/storeApi.js`.
- Requests are wrapped in `AbortController` cleanup from `useEffect()` to prevent stale network updates and race conditions when the component unmounts.

### Global State Cart Mechanics
- Cart operations are atomic and immutable, using updater callbacks inside `setCart`.
- Adding products merges duplicate items by `id` and increments quantities when necessary.
- Quantity updates and removals are performed using array transformations and filters.
- Aggregate totals are calculated via `.reduce()` in both `src/App.jsx` and `src/pages/Cart.jsx`.

### Modular Semantic Layout
- The UI prioritizes accessibility through semantic HTML elements such as `<article>`, `<figure>`, `<figcaption>`, `<header>`, and `<footer>`.
- The app layout is structured so the footer remains anchored while main content expands naturally.

## Core Technical Stack

| Area | Technology |
| --- | --- |
| Core Runtime / Framework | Vite + React 19 |
| Client Routing | React Router v7 (`createBrowserRouter`, `RouterProvider`) |
| Styling | Scoped CSS Modules + root CSS custom properties |
| Testing Engine | Vitest + React Testing Library |

## Production Build & Deployment Pipeline

The app uses a Vite-generated static bundle and deploys with fallback routing configured in `vercel.json`. Because the app uses React Router browser history, the Vercel rewrite ensures that refreshes and deep links resolve to `index.html` instead of returning 404 errors.

This deployment strategy preserves client-side routing without requiring a hash router and keeps the SPA behavior consistent across direct page loads.

Run the production build with:

```bash
npm run build
```

## Local Development Setup

```bash
git clone <repo-url>
cd shopping-cart
npm install
npm run dev
```

Run the test suite:

```bash
npm run test
```
