interface Env {
  ASSETS: Fetcher;
  APIFY_TOKEN: string;
  APIFY_ACTOR_ID: string;   // actor or task ID — uses last-run dataset
  APIFY_DATASET_ID?: string; // legacy fallback: a specific dataset snapshot
}

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (request.method === "OPTIONS") {
      return new Response(null, { headers: CORS_HEADERS });
    }

    if (url.pathname === "/api/linkedin-posts") {
      return handleLinkedInPosts(env);
    }

    if (url.pathname === "/api/img-proxy") {
      return handleImgProxy(url);
    }

    return env.ASSETS.fetch(request);
  },
};

const ALLOWED_IMG_HOSTS = ["media.licdn.com", "static.licdn.com", "apify-image.s3.amazonaws.com"];

async function handleImgProxy(url: URL): Promise<Response> {
  const target = url.searchParams.get("url");
  if (!target) return new Response("missing url", { status: 400 });

  let parsed: URL;
  try { parsed = new URL(target); } catch { return new Response("invalid url", { status: 400 }); }

  if (!ALLOWED_IMG_HOSTS.some((h) => parsed.hostname === h || parsed.hostname.endsWith("." + h))) {
    return new Response("disallowed domain", { status: 403 });
  }

  try {
    const upstream = await fetch(target, {
      headers: { "User-Agent": "Mozilla/5.0" },
      // @ts-ignore — Cloudflare-specific cache directive
      cf: { cacheTtl: 86400, cacheEverything: true },
    });
    if (!upstream.ok) return new Response("upstream error", { status: 502 });

    const body = await upstream.arrayBuffer();
    return new Response(body, {
      headers: {
        "Content-Type": upstream.headers.get("Content-Type") ?? "image/jpeg",
        "Cache-Control": "public, max-age=86400, stale-while-revalidate=604800",
        "Access-Control-Allow-Origin": "*",
      },
    });
  } catch {
    return new Response("fetch failed", { status: 502 });
  }
}

async function handleLinkedInPosts(env: Env): Promise<Response> {
  if (!env.APIFY_TOKEN || (!env.APIFY_ACTOR_ID && !env.APIFY_DATASET_ID)) {
    return new Response(JSON.stringify({ error: "Apify credentials not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  const fields = "id,linkedinUrl,content,postedAt,postImages,engagement";

  // Prefer actor last-run endpoint (always fresh); fall back to fixed dataset snapshot
  const apifyUrl = env.APIFY_ACTOR_ID
    ? `https://api.apify.com/v2/acts/${env.APIFY_ACTOR_ID}/runs/last/dataset/items?token=${env.APIFY_TOKEN}&fields=${fields}&limit=100`
    : `https://api.apify.com/v2/datasets/${env.APIFY_DATASET_ID}/items?token=${env.APIFY_TOKEN}&fields=${fields}&limit=100`;

  try {
    const upstream = await fetch(apifyUrl, {
      headers: { "Accept": "application/json" },
      // @ts-ignore — Cloudflare-specific cache directive
      cf: { cacheTtl: 1800, cacheEverything: true },
    });

    if (!upstream.ok) {
      throw new Error(`Apify returned ${upstream.status}`);
    }

    const items = await upstream.json();
    return new Response(JSON.stringify({ posts: items }), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
        ...CORS_HEADERS,
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), {
      status: 502,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }
}
