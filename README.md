# TRADIM CMS (Payload + Railway Postgres)

Payload CMS backend for the TRADIM corporate website.

## Stack
- Payload CMS 3
- Next.js (Payload template runtime)
- PostgreSQL (Railway)

## Required environment variables
- `DATABASE_URL`
- `PAYLOAD_SECRET`
- `PAYLOAD_PUBLIC_SERVER_URL`

## Local development
1. Copy env file: `cp .env.example .env`
2. Install deps: `npm install`
3. Start dev server: `npm run dev`
4. Open admin: `http://localhost:3000/admin`

## Railway deployment
1. Connect this repo to a Railway service.
2. Add env vars in Railway:
   - `DATABASE_URL` (Railway Postgres URL)
   - `PAYLOAD_SECRET`
   - `PAYLOAD_PUBLIC_SERVER_URL` (your Railway public URL)
3. Deploy from `master`.

## Content model (TRADIM)
- Collections: `users`, `media`, `pages`, `categories`, `products`, `projects`, `testimonials`
- Global: `settings`
