# BuyNest Project Setup

This file explains how to run, understand, and deploy BuyNest locally and in production.

## 1. Overview

BuyNest is a full-stack ecommerce application with:

- Next.js App Router frontend
- Prisma + PostgreSQL database access
- NextAuth credentials-based authentication
- Zustand cart state
- Stripe checkout preparation
- Cloudinary-based product image flow
- Admin product management

## 2. Requirements

Install these first:

- Node.js 20+
- npm
- PostgreSQL database
- Stripe account for payment keys
- Cloudinary account for image upload credentials
- Vercel account for deployment

## 3. Environment Variables

Create a local `.env` file using `.env.example`.

Required variables:

```env
DATABASE_URL=
DIRECT_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
STRIPE_SECRET_KEY=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_WEBHOOK_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
```

### Notes

- `DATABASE_URL` and `DIRECT_URL` should point to your PostgreSQL database
- `NEXTAUTH_URL` should be `http://localhost:3000` during local development
- `NEXTAUTH_SECRET` should be a long random secret
- Stripe and Cloudinary values must come from your own accounts

## 4. Install and Run

```bash
npm ci
npm run db:generate
npm run db:push
npm run db:seed
npm run dev
```

App URL:

```text
http://localhost:3000
```

## 5. Seeded Admin Account

After `npm run db:seed`, you can sign in with:

```text
Email: admin@example.com
Password: admin123
```

Use this account to access the admin catalog page.

## 6. Main User Flows

### Customer flow

1. Browse homepage
2. Open product listing
3. Filter or search products
4. Visit product details
5. Add items to cart
6. Review cart
7. Sign in
8. Continue to checkout

### Admin flow

1. Sign in with an admin account
2. Go to `/admin/products`
3. Create, update, or delete products
4. Upload images for storefront presentation

## 7. Important Routes

```text
/                    homepage
/products            product catalog
/products/[id]       product details
/cart                cart review
/checkout            checkout flow
/login               sign in
/register            account creation
/account             customer account
/admin/products      admin catalog management
```

API routes:

```text
/api/auth/[...nextauth]
/api/register
/api/checkout
/api/admin/products
/api/admin/products/[id]
```

## 8. Data Model Summary

Main Prisma models:

- `User`
- `Product`
- `Cart`
- `Order`
- `Account`
- `Session`

Current product model includes:

- name
- description
- price
- images
- category
- stock

## 9. Development Commands

```bash
npm run dev
npm run build
npm run lint
npm run typecheck
npm run db:generate
npm run db:push
npm run db:migrate
npm run db:migrate:deploy
npm run db:seed
```

## 10. Quality and Validation

Current quality checks:

- ESLint via `npm run lint`
- TypeScript via `npm run typecheck`
- CI workflow via GitHub Actions

Known limitation:

- `npm run build` needs a live database connection because product data is fetched during rendering.

## 11. Deployment Summary

This repo is set up for:

- GitHub Actions CI/CD
- Preview deploys for non-`main` pushes
- Production deploys for `main`
- Vercel CLI prebuilt deployment flow

Files involved:

- `.github/workflows/ci-cd.yml`
- `vercel.json`
- `DEPLOYMENT_CHECKLIST.md`

## 12. Recruiter Notes

If you are reviewing this project quickly, focus on:

- UI polish across homepage and catalog
- End-to-end product flow
- Admin CRUD capability
- Authentication wiring
- Deployment readiness
- Clean project structure for a solo-built full-stack app

## 13. Suggested Evaluation Path

For a quick review:

1. Open the homepage
2. Visit `/products`
3. Open a product details page
4. Add items to the cart
5. Check `/cart`
6. Sign in with the seeded admin account
7. Open `/admin/products`

## 14. Troubleshooting

### Build fails with database error

Cause:
- The app cannot reach PostgreSQL

Fix:
- Verify `DATABASE_URL`
- Verify `DIRECT_URL`
- Ensure the database is running and reachable from your environment

### Login does not work

Cause:
- `NEXTAUTH_SECRET` missing or database user missing

Fix:
- Set `NEXTAUTH_SECRET`
- Run `npm run db:seed`

### Checkout fails

Cause:
- Stripe env vars missing

Fix:
- Set `STRIPE_SECRET_KEY`
- Set `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Set `STRIPE_WEBHOOK_SECRET`

### Image upload fails

Cause:
- Cloudinary env vars missing or invalid

Fix:
- Set all Cloudinary env vars from `.env.example`

## 15. Related Docs

- [README.md](./README.md)
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
