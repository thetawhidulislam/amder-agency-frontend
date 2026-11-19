# Amader Agency - Frontend

Next.js 16 (App Router) + TypeScript + Tailwind CSS v4. Public website and admin panel in one app. Talks to the Express backend in `../backend`.

## Setup

```bash
npm install
cp .env.example .env.local     # set the API URL and the same REVALIDATE_SECRET as the backend
npm run dev                    # http://localhost:3000
```

Start the backend first (`npm run dev` in `backend/`). Public pages fetch services and portfolio from it.
Admin panel: http://localhost:3000/admin (login with the seeded admin).

After the first `npm run dev`, `npm run typecheck` works (Next generates its types on first run).

## Where to edit

| What | File |
|---|---|
| Colors (brand, dark/light) | `app/globals.css` (top block) |
| Fonts | `app/layout.tsx` (Bricolage Grotesque + Hind Siliguri) |
| Static copy: nav, process, why, industries, philosophy, budget options | `config/site.ts` |
| Home sections | `components/home/*`, `app/(site)/page.tsx` |
| Navbar, footer, WhatsApp button | `components/layout/*` |
| Contact form | `components/shared/contact-form.tsx` |
| Services, portfolio, contact info | Admin panel (stored in the database) |

## Structure

```
app/
  (site)/              public pages (navbar + footer): /, /services, /services/[slug],
                       /portfolio, /portfolio/[slug], /about, /contact
  admin/login          sign in
  admin/(panel)/       dashboard, leads, services, portfolio, settings
  api/revalidate       webhook the backend calls after every admin change
  sitemap.ts, robots.ts
components/            ui/ (button, fields), layout/, home/, shared/, admin/
lib/                   api-server.ts (cached fetch for pages), api-client.ts (axios for browser), types.ts
proxy.ts               redirects /admin to login when the session cookie is missing
```

## How the data flows

- Public pages are server components. `lib/api-server.ts` fetches with `next: { tags, revalidate: 3600 }`.
- When an admin saves something, the backend calls `POST /api/revalidate` with the tags (`services`, `portfolio`, `settings`) and the cached pages refresh at once.
- The contact form and the admin panel run in the browser and call the API with `withCredentials: true`.
- If the API is down, public pages render with empty data instead of crashing.

## Notes

- **Next.js 15 or older:** rename `proxy.ts` to `middleware.ts` (function name `middleware`) and change `revalidateTag(tag, "max")` to `revalidateTag(tag)` in `app/api/revalidate/route.ts`.
- **Images:** `next.config.ts` allows `res.cloudinary.com`. Images from other hosts need an extra entry in `remotePatterns`.
- **Production cookies:** use `amaderagency.com` + `api.amaderagency.com` and set `COOKIE_DOMAIN=.amaderagency.com` in the backend, so `proxy.ts` can see the login cookie.
- **Run the API before `npm run build`**, so pages are generated with real data.
- **Not built yet:** testimonials (the API exists), blog, dark/light switch for the public site, analytics.
- **Logo:** the navbar shows the name as text. Replace it in `components/layout/navbar.tsx` when you have the logo file.
- **shadcn/ui:** not installed. The small UI kit in `components/ui` covers this project. You can run `npx shadcn@latest init` later and swap parts in.
