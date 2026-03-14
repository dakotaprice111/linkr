# DropLink Platform

**The Future of Influencer Commerce** — A full-stack multi-niche dropshipping influencer affiliate platform with an iOS 26 Liquid Glass + Neon Futurism design system.

## Features

- **Landing & Marketing**: Cinematic homepage with hero, niche strip, featured products, how-it-works, niche showcase, stats counter, testimonials
- **Products**: Browse, search, filter by niche, sort; product detail with tracking link CTA; niche-specific storefronts with earnings calculator
- **Auth**: Register (with niche selection, influencer toggle, social handles), Login, NextAuth credentials + Google OAuth
- **Influencer Dashboard**: Overview KPIs, Quick Share, Recent Activity; My Links table with copy/share; Analytics (traffic, sales by product, sources, geo); Payout (balance, connect methods, history)
- **Admin**: Overview stats; Products CRUD; Influencers list with approve/suspend
- **Tracking**: Generate unique tracking links; redirect endpoint logs clicks and redirects to product
- **Design**: Liquid glass panels, neon orbs background, custom cursor orb, Framer Motion animations, neon toasts, custom scrollbar

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js 15+ (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + custom CSS (glass/neon) |
| Animations | Framer Motion |
| Database | PostgreSQL via Prisma ORM |
| Auth | NextAuth.js v4 (credentials + Google) |
| Storage | Supabase Storage (product images) |
| Charts | Recharts |
| State | Zustand |
| Forms | React Hook Form + Zod |
| Toasts | React Hot Toast |
| Icons | Lucide React |
| Fonts | Syne, DM Sans (next/font/google) |

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url> droplink-platform
cd droplink-platform
npm install
```

### 2. Environment variables

Copy the example file and fill in values:

```bash
cp .env.example .env
```

**Easiest: use local Postgres with Docker**

```bash
docker compose up -d
```

Then in `.env` set:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/droplink?schema=public"
NEXTAUTH_SECRET=any-random-string-at-least-32-chars
NEXTAUTH_URL=http://localhost:3000
```

(No Docker? Use a free [Neon](https://neon.tech) or [Supabase](https://supabase.com) Postgres and paste their connection string as `DATABASE_URL`.)

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL URL: `postgresql://USER:PASSWORD@HOST:PORT/DATABASE` (user must not be empty) |
| `NEXTAUTH_SECRET` | Random string for JWT signing (e.g. `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | App URL (e.g. `http://localhost:3000`) |
| `GOOGLE_CLIENT_ID` | Optional; Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Optional; Google OAuth client secret |
| `SUPABASE_URL` | Optional; Supabase project URL for storage |
| `SUPABASE_ANON_KEY` | Optional; Supabase anon key |

### 3. Database

```bash
# Generate Prisma client
npm run db:generate

# Create schema in DB (no migrations yet)
npm run db:push

# Seed admin user (admin@droplink.com / admin123) and sample products
npm run db:seed
```

Or with migrations:

```bash
npm run db:migrate
npm run db:seed
```

### 4. Run dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Create GitHub repo and push

From the project root:

```bash
# Create a new public repo and add remote (requires GitHub CLI)
gh repo create droplink-platform --public --source=. --remote=origin

# Push initial commit
git push -u origin main
```

If you don’t use `gh`, create the repo on GitHub manually, then:

```bash
git remote add origin https://github.com/YOUR_USERNAME/droplink-platform.git
git branch -M main
git push -u origin main
```

## Deployment (Vercel)

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), import the repo.
3. Add environment variables (same as `.env`).
4. Use a hosted PostgreSQL (e.g. Vercel Postgres, Neon, Supabase) and set `DATABASE_URL`.
5. Set `NEXTAUTH_URL` to your production URL (e.g. `https://droplink.vercel.app`).
6. Deploy.

After first deploy, run migrations and seed on your production DB (e.g. from your machine with `DATABASE_URL` pointing to prod, or via a one-off script).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB (no migration files) |
| `npm run db:migrate` | Run migrations (dev) |
| `npm run db:seed` | Seed admin + sample products |

## License

Private / MIT (as you prefer).
