# INK-23 — Release 1.1.4 (overall)

**Branch:** `release/1.1.4`  
**Rule:** Sprint name = release branch. Version bump only when merging release → main.

## Packages (portal)

| Plan | Price | AI |
|------|-------|-----|
| Ink | Free | None |
| Ink Pro | $29 once | BYO key |
| Ink AI | $19/mo | Hosted OpenAI, 100k tokens |

PayPal UI removed from portal.

## FE ↔ BE

1. Portal `VITE_INK_API_URL`
2. Login / Google / GitHub → JWT
3. `Authorization: Bearer <jwt>`
4. Entitlements + usage + audit from Neon

Paste into Confluence when Atlassian Confluence app is installed (currently 403).
