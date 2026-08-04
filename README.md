# ink-portal

Docs + playground for [`@forgedevstack/ink`](https://www.npmjs.com/package/@forgedevstack/ink) **1.1.3**.

Light paper UI: landing with live editor, rich docs (live Demo / Code / HTML / Payload), and Format / Modules / Theme playground.

## Develop

```bash
npm install
npm run dev
```

## Deploy (Vercel)

Production deploys **only** from `main` / `master` (after `release/*` merges). Feature branches are skipped via `scripts/vercel-ignore.sh`.

```bash
git checkout release/1
# … merge features into release/1 …
git checkout main && git merge release/1 && git push origin main
```

## Routes

| Path | Purpose |
|------|---------|
| `/` | Landing + live `InkEditor` hero |
| `/docs` | Documentation — steps, live demos, HTML + JSON payloads |
| `/docs/configuration` | Prop-by-prop configuration with live editor |
| `/docs/blocks` | Blocks & slash live demo |
| `/playground` | Studio-like Format / Modules / Theme controls |
| `/get-started` | Short install + sign pad sample |
| `/changelog` | Release notes |
| `/ai` | Ink AI marketing |

## Stack

- React + Vite
- `@forgedevstack/bear`, `@forgedevstack/forge-compass`, `@forgedevstack/ink@^1.1.3`

## Links

- Package: https://www.npmjs.com/package/@forgedevstack/ink
- Library: https://github.com/yaghobieh/ink
- Backend (Sprint 2): https://github.com/yaghobieh/ink-server
- Site: https://inkforgejs.com
