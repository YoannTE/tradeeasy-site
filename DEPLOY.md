# Deployment Guide — SimplifyPro

## Prerequisites

- Vercel account (Pro plan recommended for cron jobs and 60s timeout)
- Neon or Supabase account (PostgreSQL)
- Stripe account (with products/prices created)
- Resend account (with verified domain)
- PostHog account (optional, for analytics)
- Discord server (3 channels: announcements, discussion, support)

## 1. Database Setup (Neon)

1. Create a new Neon project
2. Copy the connection string
3. Set `DATABASE_URL` in Vercel environment variables

## 2. Stripe Setup

1. Create 2 products in Stripe Dashboard:
   - "SimplifyPro Monthly" — $49/month recurring
   - "SimplifyPro Annual" — $349/year recurring
2. Copy the price IDs
3. Set up webhook endpoint: `https://yourdomain.com/api/webhooks/stripe`
4. Events to listen:
   - `customer.subscription.created`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copy the webhook signing secret

## 3. Environment Variables

Set ALL these in Vercel → Settings → Environment Variables:

```
DATABASE_URL=postgresql://...
PAYLOAD_SECRET=<generate-a-strong-secret>
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
RESEND_API_KEY=re_...
NEXT_PUBLIC_APP_URL=https://yourdomain.com
ADMIN_EMAIL=your@email.com
CRON_SECRET=<generate-a-strong-secret>
NEXT_PUBLIC_POSTHOG_KEY=phc_... (optional)
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

## 4. Deploy

```bash
vercel --prod
```

## 5. Post-Deploy Checklist

- [ ] Go to `/admin` and change the default admin password (`admin@admin.com` / `password`)
- [ ] Create a test Stripe subscription to verify webhooks work
- [ ] Verify emails are sent (check Resend dashboard)
- [ ] Add your trading videos/screenshots/testimonials via `/admin`
- [ ] Test the full signup flow end-to-end
- [ ] Set up your Discord invite link
- [ ] Test responsive layout on mobile devices
