# CI/CD Pipeline — Flowchart

## Deploy Workflow (push to main)

```mermaid
flowchart TD
    A["push to main<br/>OR workflow_dispatch<br/>deploy.yml:3"] --> B["checkout@v4:13"]
    B --> C["setup-bun@v2:15"]
    C --> D["bun install --frozen-lockfile:19"]
    D --> E["bun run build:22<br/>VITE_LI_FEED_URL=/api/linkedin-posts"]
    E --> F["dist/ output"]
    F --> G["cloudflare/wrangler-action@v3:27<br/>secrets: CF_API_TOKEN, CF_ACCOUNT_ID<br/>APIFY_TOKEN, APIFY_DATASET_ID"]
    G --> H["Worker + SPA assets deployed<br/>sieap-investments (wrangler.jsonc)"]
```

## Refresh Posts Workflow (scheduled)

```mermaid
flowchart TD
    A["Cron: 0 6 * * 3,0<br/>Wed & Sun 06:00 UTC<br/>refresh-posts.yml:4"] --> B["checkout@v4:17<br/>permissions: contents:write"]
    B --> C["setup-bun@v2:19"]
    C --> D["bun install --frozen-lockfile:23"]
    D --> E["bun run scripts/refresh-linkedin-posts.ts:26<br/>APIFY_TOKEN + APIFY_ACTOR_ID/DATASET_ID"]
    E -->|"actor run (preferred)"| F["POST run-sync-get-dataset-items<br/>wait up to 300s"]
    E -->|"dataset fallback"| G["GET dataset items snapshot"]
    F --> H["Safety check: items > 0"]
    G --> H
    H -->|"empty"| I["Exit 1 — abort"]
    H -->|"ok"| J["writeFileSync → src/config/linkedin-posts.ts"]
    J --> K["git diff --staged --quiet:40"]
    K -->|"changed"| L["git commit + push [skip ci]"]
    K -->|"no change"| M["skip commit"]
    L --> N["bun run build:42"]
    M --> N
    N --> O["cloudflare/wrangler-action@v3:47<br/>(same secrets as deploy.yml)"]
    O --> P["Fresh seed + Worker deployed"]
```

## Secrets Required

| Secret | Used In | Purpose |
|--------|---------|---------|
| `CLOUDFLARE_API_TOKEN` | Both workflows | Wrangler deploy auth |
| `CLOUDFLARE_ACCOUNT_ID` | Both workflows | Wrangler deploy target |
| `APIFY_TOKEN` | refresh-posts.yml, worker.ts | Apify API auth |
| `APIFY_ACTOR_ID` | refresh-posts.yml, worker.ts | Preferred: triggers fresh scrape |
| `APIFY_DATASET_ID` | refresh-posts.yml, worker.ts | Legacy: reads fixed snapshot |

## Remaining Duplication

`deploy.yml:19-37` and `refresh-posts.yml:42-59` share identical build+deploy steps (22 lines). Extract to `.github/workflows/build-and-deploy.yml` (reusable `workflow_call`) if these steps need to change frequently.
