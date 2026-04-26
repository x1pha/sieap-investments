# Deploying SIEAP to Cloudflare (sieapinvest.com)

This project is a React SPA served by a **Cloudflare Worker** (`src/worker.ts`).
The Worker serves static assets from `dist/` and handles `/api/linkedin-posts`
for the live LinkedIn feed. Wrangler manages deployment.

---

## Prerequisites

```bash
# Install Bun (if not already)
curl -fsSL https://bun.sh/install | bash

# Install dependencies
bun install

# Install Wrangler globally (if not already)
bun add -g wrangler
```

---

## 1. Push code to GitHub

The current live site lives at https://github.com/x1pha/sieap-investments.
This new project replaces it entirely.

```bash
cd /Volumes/Drive/SIEAP/sieap-investments-main

# Initialise git (first time only — this project has no git repo yet)
git init
git branch -M main

# Add the existing GitHub repo as remote
git remote add origin https://github.com/x1pha/sieap-investments.git

# Stage and commit everything
git add .
git commit -m "Replace Lovable site with new SIEAP platform"

# Force-push to replace the old Lovable code
# WARNING: this overwrites the existing repo history
git push --force origin main
```

> If you want to preserve the old Lovable code, create a backup branch first:
> `git fetch origin && git checkout -b lovable-backup origin/main`

---

## 2. Authenticate Wrangler with Cloudflare

```bash
bunx wrangler login
```

This opens a browser. Log in with the Cloudflare account that owns `sieapinvest.com`.

---

## 3. Build the project

```bash
bun run build
```

Output goes to `dist/`. The Worker entry point is `src/worker.ts`.

---

## 4. Set secrets (Apify credentials for live LinkedIn feed)

The Worker reads two environment variables to fetch fresh LinkedIn posts:

| Variable           | Value                                      |
|--------------------|--------------------------------------------|
| `APIFY_TOKEN`      | Your Apify API token (Settings → API)      |
| `APIFY_DATASET_ID` | `n8BOoyfajjQiBnZfw` (the posts dataset)    |

```bash
bunx wrangler secret put APIFY_TOKEN
# paste your token when prompted

bunx wrangler secret put APIFY_DATASET_ID
# paste: n8BOoyfajjQiBnZfw
```

Secrets are stored encrypted in Cloudflare — never commit them to git.

---

## 5. Deploy

```bash
bunx wrangler deploy
```

Wrangler reads `wrangler.jsonc`, builds the Worker, and uploads:
- `src/worker.ts` as the Worker script
- `dist/` as the static asset bundle

First deploy creates the Worker at a `*.workers.dev` URL.

---

## 6. Connect the custom domain (sieapinvest.com)

The domain is already pointed at Cloudflare (DNS managed there).
You just need to route it to this Worker.

### Option A — Cloudflare Dashboard (easiest)

1. Go to **Workers & Pages → sieap-investments → Settings → Triggers**
2. Click **Add Custom Domain**
3. Enter `sieapinvest.com` and `www.sieapinvest.com`
4. Cloudflare auto-provisions the route and SSL

### Option B — `wrangler.jsonc` routes (code-first)

Add to `wrangler.jsonc`:

```jsonc
"routes": [
  { "pattern": "sieapinvest.com/*", "zone_name": "sieapinvest.com" },
  { "pattern": "www.sieapinvest.com/*", "zone_name": "sieapinvest.com" }
]
```

Then re-run `bunx wrangler deploy`.

---

## 7. Verify

```bash
curl -I https://sieapinvest.com/
# Expect: HTTP/2 200

curl https://sieapinvest.com/api/linkedin-posts | head -c 200
# Expect: {"posts":[{"id":"745162...
```

Check the Traction page: https://sieapinvest.com/traction

---

## Ongoing deployments

For every future code change:

```bash
git add . && git commit -m "your message"
git push origin main      # updates GitHub
bun run build             # rebuild dist/
bunx wrangler deploy      # push to Cloudflare
```

### Set up GitHub Actions for auto-deploy (optional)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Cloudflare
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install
      - run: bun run build
      - uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
```

Add secrets in **GitHub repo → Settings → Secrets**:
- `CF_API_TOKEN`: Cloudflare API token with "Edit Workers" permission
- `CF_ACCOUNT_ID`: Your Cloudflare account ID (visible in the dashboard URL)

After this, every `git push` auto-deploys. No manual `wrangler deploy` needed.

---

## LinkedIn feed refresh schedule

The Worker caches Apify responses for **30 minutes** (`Cache-Control: max-age=1800`).
The frontend polls `/api/linkedin-posts` every 30 minutes and shows a toast
notification when new posts arrive. No manual refresh is needed.

To change the Apify dataset (e.g. after re-running the scraper for fresh image URLs):
```bash
bunx wrangler secret put APIFY_DATASET_ID
# paste new dataset ID
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| `wrangler: command not found` | Run `bun add -g wrangler` or use `bunx wrangler` |
| `error: Missing entry-point` | Make sure `bun run build` succeeded before deploying |
| `/api/linkedin-posts` returns 503 | Secrets not set — run `wrangler secret put` steps above |
| Custom domain not routing | Check Workers → Triggers tab; allow 1–2 min for propagation |
| Old Lovable site still showing | Hard-refresh (Cmd+Shift+R) or clear Cloudflare cache |
