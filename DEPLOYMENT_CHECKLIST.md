# BuyNest Deployment Checklist

This repository now uses GitHub Actions for CI/CD and Vercel CLI for deployments.

## 1. One-Time Setup
- [ ] Push this repository to GitHub.
- [ ] Create or import the `BuyNest` project in Vercel.
- [ ] Run `npx vercel login` locally.
- [ ] Run `npx vercel link` from the repo root.
- [ ] Open `.vercel/project.json` and copy the generated `orgId` and `projectId`.
- [ ] Add these GitHub Actions repository secrets:
  - `VERCEL_TOKEN`
  - `VERCEL_ORG_ID`
  - `VERCEL_PROJECT_ID`
- [ ] Confirm Vercel automatic Git deployments are disabled for this repo.
  This project already includes `vercel.json` with `"git.deploymentEnabled": false` so GitHub Actions remains the single deploy path.

## 2. Required Vercel Environment Variables
- [ ] Add `DATABASE_URL`
- [ ] Add `DIRECT_URL`
- [ ] Add `NEXTAUTH_SECRET`
- [ ] Add `NEXTAUTH_URL`
- [ ] Add `STRIPE_SECRET_KEY`
- [ ] Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- [ ] Add `STRIPE_WEBHOOK_SECRET`
- [ ] Add `CLOUDINARY_CLOUD_NAME`
- [ ] Add `CLOUDINARY_API_KEY`
- [ ] Add `CLOUDINARY_API_SECRET`
- [ ] Add `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- [ ] Verify both Preview and Production environments use the correct values.

## 3. Local Pre-Deploy Validation
- [ ] Run `npm ci`
- [ ] Run `npm run db:generate`
- [ ] Run `npm run lint`
- [ ] Run `npm run typecheck`
- [ ] Run `npm run build`
  Note: the build needs a reachable database because the homepage fetches product data during build.
- [ ] If Prisma schema changes exist, run `npm run db:migrate:deploy` against the target database.
- [ ] If a fresh environment needs demo data, run `npm run db:seed`.

## 4. CI/CD Workflow Already Added
- [x] `.github/workflows/ci-cd.yml`
- [x] Pull requests run quality checks only
- [x] Pushes to non-`main` branches create Vercel preview deployments
- [x] Pushes to `main` create Vercel production deployments
- [x] Deployments use `vercel pull`, `vercel build`, and `vercel deploy --prebuilt`
- [x] ESLint is configured with `.eslintrc.json` so CI does not stop for interactive setup

## 5. Recommended GitHub Protection Rules
- [ ] Protect the `main` branch
- [ ] Require the `Quality Checks` workflow job before merge
- [ ] Block direct pushes to `main`
- [ ] Merge only after the preview deployment has been reviewed

## 6. First Preview Deployment Test
- [ ] Push a feature branch
- [ ] Confirm `Vercel Preview Deploy` passes in GitHub Actions
- [ ] Open the preview URL from the workflow summary
- [ ] Verify homepage product data renders correctly
- [ ] Verify `/products` works
- [ ] Verify at least one `/products/[id]` page works
- [ ] Verify login and register pages load
- [ ] Verify cart interactions work
- [ ] Verify checkout route responds without runtime errors

## 7. First Production Deployment Test
- [ ] Merge the verified branch into `main`
- [ ] Confirm `Vercel Production Deploy` passes in GitHub Actions
- [ ] Open the production URL
- [ ] Repeat the core smoke test on production

## 8. Database, Auth, and Payments
- [ ] Production database is reachable from Vercel
- [ ] `NEXTAUTH_URL` matches the final production domain exactly
- [ ] `NEXTAUTH_SECRET` is set in Vercel
- [ ] Prisma migrations are applied before or during release
- [ ] Stripe keys match the intended environment: test or live
- [ ] Stripe webhook secret is configured before live checkout is enabled
- [ ] Cloudinary credentials are valid and image flows work

## 9. Post-Deploy Smoke Test
- [ ] Visit `/`
- [ ] Visit `/products`
- [ ] Visit one product details page
- [ ] Visit `/cart`
- [ ] Visit `/login`
- [ ] Visit `/register`
- [ ] If enabled, complete one Stripe test checkout
- [ ] Check Vercel runtime logs for errors

## 10. Rollback Plan
- [ ] Record the last known good commit SHA in the PR or release notes
- [ ] If production fails, redeploy the previous good commit through GitHub or Vercel
- [ ] If the issue is data-related, restore the database before retrying deployment

## 11. Useful Commands
```bash
npm run lint
npm run typecheck
npm run build
npm run db:migrate:deploy
npm run db:seed
npx vercel link
npx vercel --prod
```

## 12. Deployment References
- Vercel GitHub Actions guide: https://examples.vercel.com/guides/how-can-i-use-github-actions-with-vercel
- Vercel static project configuration: https://vercel.com/docs/project-configuration/vercel-json
- Next.js on Vercel: https://vercel.com/docs/concepts/next.js/overview
