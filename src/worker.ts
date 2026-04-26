interface Env {
  ASSETS: Fetcher;
  APIFY_TOKEN: string;
  APIFY_DATASET_ID: string;
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

    return env.ASSETS.fetch(request);
  },
};

async function handleLinkedInPosts(env: Env): Promise<Response> {
  if (!env.APIFY_TOKEN || !env.APIFY_DATASET_ID) {
    return new Response(JSON.stringify({ error: "Apify credentials not configured" }), {
      status: 503,
      headers: { "Content-Type": "application/json", ...CORS_HEADERS },
    });
  }

  const fields = "id,linkedinUrl,content,postedAt,postImages,engagement";
  const apifyUrl = `https://api.apify.com/v2/datasets/${env.APIFY_DATASET_ID}/items?token=${env.APIFY_TOKEN}&fields=${fields}&limit=100`;

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
