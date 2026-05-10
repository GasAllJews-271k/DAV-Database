# D.A.V. Classified Database

A classified intelligence database web app for the Dawnbound Achivum Vanguard — a Roblox group. Members can view lore, factions, threats, and events publicly, and log in to access a personnel portal with role-based admin tools.

## Run & Operate

- `pnpm --filter @workspace/dav-site run dev` — run the frontend (auto-started via workflow)
- `pnpm --filter @workspace/api-server run dev` — run the API server (port 8080)
- `pnpm run typecheck` — full typecheck across all packages

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- Frontend: React + Vite (artifacts/dav-site)
- Backend: Firebase (Auth + Firestore) — no Replit DB used
- Styling: Inline styles, Courier New monospace, dark terminal aesthetic

## Where things live

- `artifacts/dav-site/src/lib/firebase.ts` — Firebase config and initialized instances (auth, db)
- `artifacts/dav-site/src/types.ts` — Shared types, RANK_META, permission helpers
- `artifacts/dav-site/src/lib/helpers.ts` — Date/color utility functions
- `artifacts/dav-site/src/components/` — Navbar, Footer, AnnouncementBanner, Primitives
- `artifacts/dav-site/src/pages/` — All page components
- `artifacts/dav-site/src/App.tsx` — Root app with auth state, page routing, Firebase listeners

## Firebase Collections

- `users` — Personnel profiles (uid, email, username, level, rank)
- `events` — Game events (title, date, type, status, host, desc, published, log[])
- `announcements` — Broadcasts (title, content, priority, published, date)

## Firestore Security Rules (required)

Public reads on `events` and `announcements`, auth-only for writes. `users` requires auth for all access.

## Architecture decisions

- No React Router — simple `page` state string with guard function for auth/permission checks
- Firebase direct client SDK — no backend proxy; Firestore listeners (`onSnapshot`) provide real-time updates
- Rank system: level 1-6 integers; `canManage(l >= 5)` and `canLog(l >= 3)` gate admin features
- User creation uses Firebase REST Identity Toolkit API directly (allows admin to create accounts without signing out)
- All components use inline styles to match the dark terminal aesthetic without Tailwind conflicts

## Product

Public pages: Home (terminal bootup hero), Lore, Factions, Enemies (threat DB), Events, Ranks, Rules.
Auth pages: Login (Firebase email/password), Personnel Portal.
Admin tools (CL-5+): Event Manager, Announcement Manager, User Manager.
Field tools (CL-3+): Operation Log.

## User preferences

_Populate as you build._

## Gotchas

- Firebase CDN imports are gone — always import from `firebase/*` npm package paths
- The `events` and `announcements` Firestore collections need public read rules or the home/events pages will show empty
- User Manager creates accounts via Firebase REST API (Identity Toolkit) so the admin stays logged in while creating new accounts
