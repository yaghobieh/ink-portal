# ink-portal

Docs + playground for [`@forgedevstack/ink`](https://www.npmjs.com/package/@forgedevstack/ink) (current published: **1.1.3**).

Sprint / release sync: work targets **`release/1.1.4`**. Do **not** bump portal or lib versions until that release merges to `main`.

## Develop

```bash
npm install
npm run dev
```

Optional API base for Sprint 1.1.4:

```bash
# .env
VITE_INK_API_URL=http://localhost:4000
```

## Pricing packages (portal)

| Plan | Price | Includes |
|------|-------|----------|
| **Ink** | Free | Editor core, no AI unlock |
| **Ink Pro** | $29 once | Premium UI + BYO AI key + typo |
| **Ink AI** | $19 / mo | Pro + hosted OpenAI, 100k tokens/mo |

PayPal checkout UI is **removed / disabled**. Billing will go through [ink-server](https://github.com/yaghobieh/ink-server).

## FE ↔ BE

1. Portal calls `VITE_INK_API_URL` (REST JSON).
2. `POST /api/auth/login|register` or Google/GitHub OAuth start → JWT.
3. Authenticated calls: `Authorization: Bearer <jwt>`.
4. `GET /api/entitlements` + `GET /api/usage` drive plan / token meter.
5. Audit: `GET /api/audit-logs`.

## Deploy (Vercel)

Production deploys **only** from `main` / `master` after `release/*` merges (`scripts/vercel-ignore.sh`).

## Search

`⌘K` / `Ctrl+K` focuses docs search in the navbar.

## Links

- Package: https://www.npmjs.com/package/@forgedevstack/ink
- Library: https://github.com/yaghobieh/ink
- Backend: https://github.com/yaghobieh/ink-server
- Site: https://inkforgejs.com
