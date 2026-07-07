# Repetitive errors — avoid these

## Architecture & domain

| Mistake | Correct approach |
|---------|------------------|
| Server actions in `app/<route>/actions.ts` | `lib/domain/actions/<table>.actions.ts` |
| Shared AAA wrapper module | Inline `try/catch` in each action — copy `users.actions.ts` |
| Pages call services for gated data | Pages call **actions**; actions call services |
| Adding a "controller" layer | Actions + services only |
| UI imports `database/` or use cases | UI imports `@/lib/entities/*` types only |
| AAA on `signInAction`, `push.actions`, `storage.actions` | These intentionally skip AAA |
| `storage.actions.ts` in Server Components | Browser-only — call from client hooks |
| Use case in wrong folder | Folder = table you `from()` in the query |

## Next.js 16

| Mistake | Correct approach |
|---------|------------------|
| Using training-data Next.js 15 patterns | Read `node_modules/next/dist/docs/` first |
| `searchParams` without await | `const params = await searchParams` |
| Stale `.next/types` after deleting a page | Restart dev server or clear `.next` |

## Auth & routes

| Mistake | Correct approach |
|---------|------------------|
| Public page works locally but redirects to sign-in | Add path to `publicPaths` in `proxy.ts` |
| `proxy.ts` checks roles/permissions | Proxy = session cookie only; AAA in actions |
| Forgetting `/landing` in public paths | `publicPaths` includes `/sign-in`, `/sign-up`, `/landing` |

## UI & design

| Mistake | Correct approach |
|---------|------------------|
| `dark:` Tailwind classes | Light-only — `color-scheme: light` |
| 1px borders between sections | Tonal `surface-container-*` backgrounds |
| Wrong hook filename | `<name>.hooks.ts` co-located, no `.ui.hooks.ts` |
| Inputs invisible on nested cards | Use `bg-surface-container-lowest` on inputs inside low surfaces |

## PWA & landing

| Mistake | Correct approach |
|---------|------------------|
| Install UX on auth-only routes | Primary UX at `/landing` |
| `StoragePanel` 2-col grid when `embedded` | Stack sections; parent is already half-width |
| Status orb wraps below title | Header row: `flex justify-between`, orb `shrink-0` |
| Quota + header trapped in left grid column | Quota in full-width card above action sections |
| Long Storage API keys in UI | Map to readable labels (`serviceWorkerRegistrations` → "Service workers") |

## Local dev

| Mistake | Correct approach |
|---------|------------------|
| `DATABASE_URL` port 3306 with Docker | Docker maps **3307** on host |
| `&&` in PowerShell one-liners | Use `;` between commands |
| `npm run db:migrate` before container ready | Wait for MySQL `ready for connections` |

## Documentation

| Mistake | Correct approach |
|---------|------------------|
| Hand-editing README structure | `node scripts/write-readme.mjs` |
| eLibrary `update_document` with placeholder | Read full JSON from `elibrary-update-payload.json` |
| Stale `app/users/teachers` in docs | Reference `app/landing/page.tsx` instead |
| Version bump without `patchToV6` pattern | Extend `scripts/build-elibrary-guide.mjs` |

## Git / commits

| Mistake | Correct approach |
|---------|------------------|
| Committing without user request | Only commit when explicitly asked |
| Committing `.env` | Warn user — use `example.env` |
