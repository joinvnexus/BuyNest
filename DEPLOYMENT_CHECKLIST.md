# Deployment & Readiness Checklist

## 1. Code & Build Sanity
- [ ] `npm run lint` (if configured) completes without errors.
- [ ] `npx tsc --noEmit` passes in current env.
- [ ] `npm run test` (unit/integration) or relevant suite has been run.
- [ ] `npm run build` produces a clean output without warnings/failures.

## 2. Environment & Secrets
- [ ] `.env.example` reflects all required env vars (`DATABASE_URL`, `DIRECT_URL`, `NEXTAUTH_SECRET`, `STRIPE_*`, etc.).
- [ ] Secrets stored in deployment target (Vercel/Env vars) match `.env.example` names.
- [ ] Stripe keys set for live/test environments as needed.
- [ ] Database migrations (Prisma) have been generated and applied.

## 3. Data & External Services
- [ ] Seed data verified (`npx prisma db seed` or equivalent) if needed.
- [ ] Cloudinary/Stripe endpoints reachable; API configs tested.
- [ ] Third-party webhooks secured (verify signature secret in env).

## 4. Monitoring & Observability
- [ ] Logging/monitoring hooks (Sentry/LogRocket/console) configured for production.
- [ ] Alerts/ping routes verified (e.g., `/api/health`).
- [ ] Analytics/tracking scripts enabled only where intended.

## 5. UX & Accessibility
- [ ] Critical flows (browse → cart → checkout) verified locally.
- [ ] Responsive breakpoints tested on major viewports.
- [ ] Accessibility spot-checks run (keyboard nav, focus states, alt text).

## 6. Release & Post-Deploy
- [ ] `vercel --prod` (or `next deploy`) run with current branch and env.
- [ ] Post-deploy smoke test (home/cart/checkout/auth) executed.
- [ ] Safety rollback plan documented (branch/tag + backups).
