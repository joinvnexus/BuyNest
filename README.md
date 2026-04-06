# BuyNest

BuyNest is a modern full-stack ecommerce storefront built with Next.js App Router, Prisma, PostgreSQL, NextAuth, Stripe, and Cloudinary.

It is designed as a portfolio-ready product that demonstrates product thinking, UI refinement, authentication, catalog management, checkout flow integration, and deployment readiness.

## Why This Project Matters

This project is not just a static UI clone. It includes:

- A polished storefront homepage and product discovery experience
- Product listing and product details pages
- Customer authentication and account access
- Cart and checkout flow
- Admin product management
- Prisma-backed database modeling
- Stripe-ready checkout backend
- CI/CD workflow for Vercel deployment

For recruiters and reviewers, BuyNest shows the ability to build and organize a real-world web product end to end.

## Core Features

- **Storefront UI**
  - Responsive homepage with curated sections
  - Product cards with price, stock, category, and actions
  - Product listing with filters, search, sorting, and pagination
  - Product detail page with gallery and related products

- **Authentication**
  - Email/password login with NextAuth credentials provider
  - Register flow for new users
  - Account page support
  - Role-aware sessions with admin access

- **Shopping Flow**
  - Zustand-powered cart state
  - Cart review and quantity updates
  - Checkout preparation and payment intent flow
  - Stripe integration hooks for payment handling

- **Admin Experience**
  - Admin catalog dashboard
  - Create, edit, and delete products
  - Image upload support through Cloudinary-backed flows

- **Deployment Readiness**
  - GitHub Actions CI/CD workflow
  - Vercel deployment configuration
  - Deployment checklist and setup documentation

## Tech Stack

- **Frontend:** Next.js 15, React 18, TypeScript, Tailwind CSS
- **UI:** shadcn-style primitives, Lucide icons, custom responsive layouts
- **Auth:** NextAuth
- **Database:** PostgreSQL with Prisma ORM
- **State:** Zustand
- **Payments:** Stripe
- **Media:** Cloudinary
- **Deployment:** Vercel + GitHub Actions

## Project Structure

```text
app/
  page.tsx                  # homepage
  products/                 # product listing and details
  cart/                     # cart review
  checkout/                 # checkout flow
  login/ register/          # auth pages
  account/                  # customer account
  admin/products/           # admin catalog dashboard
  api/                      # route handlers

components/
  product-card.tsx          # shared product card UI
  related-products.tsx      # product recommendations
  add-to-cart.tsx           # cart interaction
  checkout-form.tsx         # Stripe checkout form
  admin/product-form.tsx    # admin product create/edit form

lib/
  auth.ts                   # NextAuth configuration
  db.ts                     # product and user data queries
  prisma.ts                 # Prisma client

prisma/
  schema.prisma             # database models
  seed.ts                   # sample products + admin seed
```

## Demo-Friendly Highlights

- Seeded sample products for quick showcase
- Seeded admin account for local evaluation
- Cleaner storefront branding under the `BuyNest` name
- Recruiter-friendly documentation and deployment checklist

## Local Setup

Quick start:

```bash
npm ci
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

Default seeded admin credentials:

```text
Email: admin@example.com
Password: admin123
```

Environment variables are documented in `.env.example`.

For full setup, CI/CD, Vercel deployment, and troubleshooting, see:

- [PROJECT_SETUP.md](./PROJECT_SETUP.md)
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## Important Notes

- `npm run build` requires a reachable database because product data is fetched during build/runtime rendering.
- Stripe and Cloudinary features require valid external service credentials.
- There is currently no dedicated automated test suite; linting and typechecking are the main CI quality gates.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run db:generate
npm run db:push
npm run db:migrate:deploy
npm run db:seed
```

## What This Demonstrates

- Building a production-style Next.js App Router application
- Structuring server and client concerns cleanly
- Integrating auth, database, admin CRUD, and checkout
- Improving UI quality beyond boilerplate defaults
- Preparing a project for CI/CD and Vercel deployment

## Next Improvements

- Add automated integration or e2e tests
- Add order persistence after successful payment confirmation
- Improve observability with error tracking and analytics
- Add richer admin reporting and order management
