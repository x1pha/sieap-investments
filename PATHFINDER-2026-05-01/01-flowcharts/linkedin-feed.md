# LinkedIn Feed System — Flowchart

```mermaid
flowchart TD
    A["Apify Actor runs<br/>harvestapi/linkedin-company-posts"] --> B["Apify Dataset<br/>(last run)"]
    B -->|"CRON: Wed/Sun 06:00 UTC"| C["refresh-posts.yml:26<br/>bun run scripts/refresh-linkedin-posts.ts"]
    C -->|"APIFY_ACTOR_ID set"| D["POST run-sync-get-dataset-items<br/>refresh-linkedin-posts.ts:49<br/>waitSecs=300"]
    C -->|"APIFY_DATASET_ID only"| E["GET dataset items<br/>refresh-linkedin-posts.ts:64"]
    D --> F["items.length === 0?<br/>refresh-linkedin-posts.ts:76"]
    E --> F
    F -->|"Yes → abort"| G["Exit 1: avoid seed wipe"]
    F -->|"No"| H["renderPost() + writeFileSync<br/>refresh-linkedin-posts.ts:88,124<br/>→ src/config/linkedin-posts.ts"]
    H --> I["git diff --staged --quiet<br/>refresh-posts.yml:40"]
    I -->|"changes"| J["git commit + push<br/>[skip ci]"]
    I -->|"no change"| K["skip commit"]
    J --> L["bun run build<br/>refresh-posts.yml:42"]
    K --> L
    L --> M["cloudflare/wrangler-action<br/>deploy Worker + Assets"]
    M --> N["Worker: src/worker.ts<br/>GET /api/linkedin-posts:22"]
    N --> O["handleLinkedInPosts:68<br/>uses last run dataset endpoint<br/>Cloudflare cache TTL 1800s"]
    O --> P["React: LinkedInFeedContext.tsx:74<br/>poll() every 30 min"]
    P --> Q["setPosts(fresh)<br/>saveCache() localStorage<br/>LinkedInFeedContext.tsx:84"]
    Q --> R["Traction.tsx:103<br/>PostsTab renders posts<br/>proxyImageUrl() for images"]
    R --> S["GET /api/img-proxy:26<br/>worker.ts:36<br/>handleImgProxy()"]
    S --> T["Upstream: media.licdn.com<br/>User-Agent bypass<br/>Cache 86400s"]
    T --> U["<img> displays on page"]
```

## Key Files

| File | Role |
|------|------|
| `scripts/refresh-linkedin-posts.ts` | Apify runner — triggers actor or reads dataset |
| `src/config/linkedin-posts.ts` | Seed file — auto-generated, committed to repo |
| `.github/workflows/refresh-posts.yml` | Scheduler — runs Wed/Sun 06:00 UTC |
| `src/worker.ts:68` | API endpoint — serves fresh data from Apify last-run |
| `src/contexts/LinkedInFeedContext.tsx` | Client polling — 30-min interval, localStorage cache |
| `src/lib/utils.ts` | `proxyImageUrl()` — routes images through Worker proxy |
| `src/components/LinkedInLightbox.tsx` | Shared modal for image + content display |
