# Telegram paste — Ink sprint 1.1.4

Sprint and release are synced on `release/1.1.4` (no npm bump until merge to main).

Portal
- PayPal checkout UI removed/disabled
- Packages: Ink (free) · Pro ($29 once, BYO AI) · AI ($19/mo, 100k tokens, hosted OpenAI)
- Masonry gallery + Cmd/Ctrl+K search
- PR merged: https://github.com/yaghobieh/ink-portal/pull/8

Backend
- Fastify + Neon Postgres (not Mongo)
- Auth, entitlements, token usage, audit logs
- PR: https://github.com/yaghobieh/ink-server/pull/1

Editor defects opened (lib)
https://github.com/yaghobieh/ink/issues/24 … #30

Jira epic INK-23 · Linear GAT-30

FE↔BE: VITE_INK_API_URL + Bearer JWT
