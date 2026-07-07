---
name: rnd-nextjs-template
description: >-
  Implements features in rnd-nextjs-template (Next.js 16, Better Auth, Drizzle,
  AAA actions, PWA, /landing, StoragePanel). Use when adding code, fixing layout,
  updating docs, or when the user mentions ARCHITECTURE, domain layer, server
  actions, IndexedDB, InstallLanding, or repetitive template mistakes.
---

# RND Next.js template

## Before writing code

1. Read [ARCHITECTURE.md](../../../ARCHITECTURE.md) for the layer you touch.
2. Read [DESIGN.MD](../../../DESIGN.MD) for UI (light-only, tonal surfaces, no 1px borders).
3. If using Next.js APIs, read the relevant guide in `node_modules/next/dist/docs/` first — **this is Next.js 16 with breaking changes** (see [AGENTS.md](../../../AGENTS.md)).

## Stack (short)

Next.js 16 App Router · React 19 · Tailwind 4 · Better Auth · Drizzle + MySQL · PWA · `proxy.ts` route guard (not middleware)

## Golden rule — domain flow

```
page / hook  →  action (AAA)  →  service  →  usecase  →  database
```

**No controllers.** Server actions live in `lib/domain/actions/<table>.actions.ts`, not `app/<route>/actions.ts`.

| I need to… | Put it here |
|------------|-------------|
| DB table | `database/schema.ts` |
| Types + permissions | `lib/entities/<table>.type.ts` |
| One DB/API operation | `lib/domain/usecases/<table>/<action>.usecase.ts` |
| Compose use cases | `lib/domain/services/<table>.service.ts` |
| Protected server action | `lib/domain/actions/<table>.actions.ts` (inline AAA) |
| UI mutation handler | `<component>.hooks.ts` next to the component |
| PWA push demo | `lib/domain/actions/push.actions.ts` |
| Browser storage demo | `lib/domain/actions/storage.actions.ts` |
| Install landing | `app/landing/page.tsx` → `InstallLanding` |

**Canonical AAA copy-paste:** `lib/domain/actions/users.actions.ts`

## AAA exceptions (do not add AAA here)

| File | Why |
|------|-----|
| `auth.actions.ts` | User not signed in yet |
| `push.actions.ts` | PWA demo; in-memory subscriptions |
| `storage.actions.ts` | **Browser-only** — import from client hooks only, never Server Components |

`proxy.ts` uses `getSessionFromHeaders()` for route guards only — **not** AAA (no roles/permissions).

## Route protection (`proxy.ts`)

```typescript
const authPaths = ["/sign-in", "/sign-up"];
const publicPaths = ["/sign-in", "/sign-up", "/landing"];
// /api/auth/* always passes through
```

Adding a public page? Append to `publicPaths` — do not only document it in README.

## Frontend conventions

- **Atomic design:** `components/atoms|molecules|organisms/<Name>/`
- **Hooks:** `<camelCase>.hooks.ts` in the same folder (no layer suffix in filename)
- **`"use client"`** only for state, events, or calling mutation hooks
- UI imports **entity types only** — never `database/` or use cases
- **Light-only UI:** `html { color-scheme: light; }` — no `dark:` classes
- **Surfaces:** use `surface-container-*` tonal layers — no 1px borders (see DESIGN.MD)
- **Pages:** `await searchParams` (Promise in Next.js 16)

## PWA & `/landing`

Primary install UX: **`/landing`** (public). Home keeps a compact `PwaPanel` demo.

**InstallLanding layout** (`max-w-[1360px]`):

1. Nav header + `StatusOrb`
2. Hero + `DesktopWindowFrame` preview (`xl:grid-cols-2`)
3. Horizontal 3-step timeline (`lg:grid-cols-3`)
4. `PwaPanel` + `StoragePanel` in `xl:grid-cols-2`, each with `embedded` + shared `controls` from parent hooks

Do not move install UX back to `/users/teachers` or other auth routes.

## StoragePanel layout rules

When `embedded={true}` (half-width column on landing):

- Full-width header: title + `StatusOrb` on one row
- Quota card spans full width above action sections
- **Stack** persistent storage + IndexedDB vertically — do **not** nest `xl:grid-cols-2` inside the half-column
- Standalone mode may use `lg:grid-cols-2` for bottom sections

Flow: `storagePanel.hooks.ts` → `storage.actions.ts` → `storage.service.ts` → `usecases/storage/` → IndexedDB (`rnd_pwa`) / `navigator.storage`

## Local dev — Docker MySQL

```bash
docker compose up -d    # host port 3307 → container 3306
npm run db:migrate
```

Default `DATABASE_URL`: `mysql://root:123@127.0.0.1:3307/rnd_template` — **3307**, not 3306.

## Docs update workflow

| Doc | How to update |
|-----|----------------|
| README | `README.md` —  hand-edit README for structural changes |
| ARCHITECTURE | Edit `ARCHITECTURE.md` directly |
| ERPNext eLibrary | `node scripts/build-elibrary-guide.mjs` → MCP `update_document` with **full** payload from `scripts/elibrary-update-payload.json` (doc `0ajees6jce`, version bumps via `patchToV6` in build script) |

**Never** call `update_document` with placeholder or truncated description.

## Pre-flight checklist

Before finishing a feature, verify:

- [ ] Protected writes/reads go through actions with inline AAA (unless listed exception)
- [ ] New public route added to `proxy.ts` `publicPaths`
- [ ] No `dark:` classes; tokens from `app/globals.css`
- [ ] UI does not import `database/` or use cases
- [ ] PWA client code stays in hooks → `storage.actions` / `push.actions`
- [ ] Embedded panels tested in narrow half-column layout
- [ ] If docs requested: README regenerated, ARCHITECTURE updated, eLibrary payload rebuilt

## Common mistakes

See [pitfalls.md](pitfalls.md) for the full anti-pattern list from past sessions.
