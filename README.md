# RND Next.js Template — Dev Journal

Next.js 16 + React 19 + Drizzle ORM + Better Auth + PWA. Atomic Design UI, domain-driven `lib/` layout, server-side auth, and inline AAA in every protected action.

For the full structural reference, see [ARCHITECTURE.md](./ARCHITECTURE.md). UI tokens and patterns: [DESIGN.MD](./DESIGN.MD).

---

## Table of contents

- [Quick start](#quick-start)
- [Dev journal](#dev-journal)
- [FAQ](#faq)
  - [Which table does a use case belong to?](#which-table-does-a-use-case-belong-to)
  - [Reads vs writes](#reads-vs-writes--where-do-i-put-the-code)
  - [Server actions vs UI hooks](#server-actions-vs-ui-hooks)
  - [What is AAA in actions?](#what-is-aaa-in-actions)
  - [Docker MySQL](#docker-mysql)
  - [PWA & landing page](#pwa--landing-page)
  - [Local storage (IndexedDB)](#local-storage-indexeddb)
  - [Do I need app route actions.ts?](#do-i-need-approuteactionsts)
  - [Do I need a controller?](#do-i-need-a-controller)
  - [Links](#links)

---

## Quick start

### Prerequisites

- **Node.js** 20+
- **Docker** (recommended for MySQL) or local MySQL 8+

### Setup

```bash
npm install
cp example.env .env
docker compose up -d          # MySQL on host port 3307
npm run db:migrate
npm run dev
```

`DATABASE_URL` in `.env` defaults to `mysql://root:123@127.0.0.1:3307/rnd_template` (see [Docker MySQL](#docker-mysql)).

After schema changes:

```bash
npm run db:generate
npm run db:migrate
```

New sign-ups get role `dev` (schema default). Promote yourself after sign-up:

```sql
UPDATE user SET role = 'admin' WHERE email = 'you@example.com';
```

---

## Dev journal

### Where new code goes

| I need to… | Put it here |
|------------|-------------|
| DB table | `database/schema.ts` |
| Types + roles + permissions | `lib/entities/<table>.type.ts` |
| One operation | `lib/domain/usecases/<table>/<action>.usecase.ts` |
| Compose use cases | `lib/domain/services/<table>.service.ts` |
| Server action (inline AAA) | `lib/domain/actions/<table>.actions.ts` |
| Push notifications (PWA demo) | `lib/domain/actions/push.actions.ts` |
| Browser storage (PWA demo) | `lib/domain/actions/storage.actions.ts` |
| `auth()` for actions | `lib/domain/services/auth.service.ts` |
| Audit log helper | `lib/domain/usecases/auth/log_action.usecase.ts` |
| UI mutation handler | `<component>.hooks.ts` next to the component |
| PWA manifest | `app/manifest.ts` |
| Service worker | `public/sw.js` |
| Install landing UI | `app/landing/page.tsx` → `InstallLanding` |

**Flow (reads and writes):**

```
page / hook  →  action (AAA)  →  service  →  usecase  →  database
```

**PWA client flow (browser-only demos):**

```
hook  →  storage.actions / push.actions  →  service  →  usecase  →  IndexedDB / Storage API
```

**AAA building blocks:**

| Step | Import from |
|------|-------------|
| Authentication | `auth()` — `@/lib/domain/services/auth.service` |
| Authorization | `hasPermission`, `USER_PERMISSION` — `@/lib/entities/users.type` |
| Accounting | `logAction` — `@/lib/domain/usecases/auth/log_action.usecase` |

**Canonical example:** `lib/domain/actions/users.actions.ts` — `getUsersAction` (read), `deleteUserAction` (write + redirect).

---

## FAQ

### Which table does a use case belong to?

If you write `from(this_table)`, the use case belongs under the slice for **`this_table`**. See [ARCHITECTURE.md](./ARCHITECTURE.md).

---

### Reads vs writes — where do I put the code?

Both go through **actions** first (inline AAA), then **service** → **usecase**.

| Type | Page / hook | Action | Service |
|------|-------------|--------|---------|
| Read | `getUsersAction()` in `app/users/page.tsx` | AAA + `getUsers()` | use case |
| Write | `deleteUserAction` via `userCard.hooks.ts` | AAA + `deleteUser()` | use case |

Pages handle `{ ok: false }` from read actions (redirect to sign-in). Mutations use `redirect()` with `?error=` query params.

**Exceptions:**

- `auth.actions.ts`, `push.actions.ts`, and `storage.actions.ts` skip AAA (pre-auth / PWA demos).
- `storage.actions.ts` is **browser-only** — import from client hooks, not Server Components.
- `proxy.ts` uses `getSessionFromHeaders()` for route-level guards only (not AAA).

---

### Server actions vs UI hooks

| Layer | Location |
|-------|----------|
| Server action | `lib/domain/actions/<table>.actions.ts` (`"use server"`) |
| PWA client action | `lib/domain/actions/push.actions.ts`, `storage.actions.ts` |
| UI hook | `<component>.hooks.ts` — calls the action |

---

### What is AAA in actions?

Every **protected** action uses the same **inline `try/catch` template**. No shared `aaa/` folder — copy the pattern from `users.actions.ts`.

| Role | List users | Delete users |
|------|------------|--------------|
| owner, admin | yes | yes |
| tech, sales, dev, qa, po, pm, finance | yes | no |

Full docs: [ARCHITECTURE.md — AAA template](./ARCHITECTURE.md#aaa-in-actions-inline-template)

---

### Docker MySQL

`docker-compose.yml` runs **drizzle-mysql** on **host port 3307** (avoids conflict with a local MySQL on 3306).

```bash
docker compose up -d      # start
docker compose down       # stop
npm run db:migrate        # apply schema
```

| Setting | Value |
|---------|-------|
| Container | `drizzle-mysql` |
| Host port | `3307` → container `3306` |
| Database | `rnd_template` (auto-created) |
| Root password | `123` (change in compose + `.env` for production) |

If the app shows `Failed to get session` or `Unknown database`, verify `.env` port matches Docker and MySQL is running: `docker ps`.

---

### PWA & landing page

Installable progressive web app. Primary install UX lives at **`/landing`** (public — no sign-in required). Desktop-first layout: wide hero (`max-w-[1360px]`), `DesktopWindowFrame` preview, horizontal install steps, and side-by-side demo panels on `xl+`.

| Piece | Path |
|-------|------|
| Install landing | `app/landing/page.tsx` → `InstallLanding` |
| Desktop window preview | `components/molecules/DesktopWindowFrame/` |
| Futuristic backdrop | `components/molecules/FuturisticBackdrop/` |
| Manifest | `app/manifest.ts` |
| Service worker | `public/sw.js` |
| Push UI | `components/organisms/PwaPanel/` |
| Storage UI | `components/organisms/StoragePanel/` |
| Push actions | `lib/domain/actions/push.actions.ts` |
| Security headers | `next.config.ts` |

**Landing layout:** Nav header → hero + window preview (`xl:grid-cols-2`) → 3-step timeline (`lg:grid-cols-3`) → `PwaPanel` + `StoragePanel` (`xl:grid-cols-2`). Both panels accept `embedded` + shared hook `controls` from `InstallLanding`.

**Push setup:**

```bash
npx web-push generate-vapid-keys
npx next dev --experimental-https
```

Add VAPID keys to `.env`. Open [`/landing`](/landing) or home for push/storage demos.

Full docs: [ARCHITECTURE.md — PWA](./ARCHITECTURE.md#pwa-progressive-web-app)

---

### Local storage (IndexedDB)

Browser-side storage demo on `/landing` — [Storage API](https://whatpwacando.today/storage) quota + persistent mode + IndexedDB records.

| Layer | Path |
|-------|------|
| Types | `lib/entities/storage.type.ts` |
| Use cases | `lib/domain/usecases/storage/` |
| Service | `lib/domain/services/storage.service.ts` |
| Actions | `lib/domain/actions/storage.actions.ts` |
| UI | `components/organisms/StoragePanel/` |

Flow: `storagePanel.hooks.ts` → `storage.actions.ts` → `storage.service.ts` → use cases → `navigator.storage` / IndexedDB (`rnd_pwa` DB).

**StoragePanel layout:** Full-width header (title + `StatusOrb`) → quota card (available/used, progress bar, usage chips) → persistent storage + IndexedDB demo (stacked when `embedded` in the landing half-column; side-by-side when standalone).

---

### Do I need `app/<route>/actions.ts`?

**No.** Use `lib/domain/actions/<table>.actions.ts`.

---

### Do I need a controller?

**No.** Actions + services. There are no controllers in this template.

---

## Links

- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DESIGN.MD](./DESIGN.MD)
- [example.env](./example.env)
- [docker-compose.yml](./docker-compose.yml)
