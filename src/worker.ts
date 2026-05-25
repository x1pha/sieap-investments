import { LINKEDIN_POSTS_SEED } from "./config/linkedin-posts";

interface Env {
  ASSETS: Fetcher;
  APIFY_TOKEN: string;
  APIFY_ACTOR_ID?: string;   // actor ID — reads its most recent run's dataset
  APIFY_TASK_ID?: string;    // task ID — reads its most recent run's dataset
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
      headers: {
        // Mimic a real browser visiting LinkedIn so CDN doesn't reject server-side fetches
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": "https://www.linkedin.com/",
        "Sec-Fetch-Dest": "image",
        "Sec-Fetch-Mode": "no-cors",
        "Sec-Fetch-Site": "same-site",
      },
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

// LinkedIn signed image URLs embed expiry in the `e=` query param (unix seconds).
function expiryFromUrl(url: string): number {
  const m = /[?&]e=(\d+)/.exec(url);
  return m ? Number(m[1]) * 1000 : 0;
}

/**
 * Normalise a raw Apify item to our LinkedInPost shape.
 * Different Apify actors use different field names — map them all.
 */
function normalisePost(raw: any): any | null {
  if (!raw || typeof raw !== "object") return null;

  // id
  const id = String(raw.id ?? raw.postId ?? raw.activityId ?? "").trim();
  if (!id) return null;

  // content / text
  const content = (raw.content ?? raw.text ?? raw.description ?? raw.caption ?? "").trim();
  if (!content) return null;

  // linkedinUrl
  const linkedinUrl = (raw.linkedinUrl ?? raw.postUrl ?? raw.url ?? raw.shareUrl ?? "").trim();

  // postedAt — normalise to { timestamp: number; date: string }
  let postedAt = raw.postedAt;
  if (!postedAt || typeof postedAt !== "object" || !postedAt.date) {
    const raw_ts = raw.postedAt?.timestamp ?? raw.publishedAt ?? raw.createdAt
      ?? raw.postedAtTimestamp ?? raw.timestamp ?? raw.date ?? null;
    const ts = raw_ts
      ? (typeof raw_ts === "number" ? raw_ts : new Date(raw_ts).getTime())
      : Date.now();
    postedAt = { timestamp: ts, date: new Date(ts).toISOString() };
  }

  // postImages — try every common variant, always derive expiresAt from the URL
  let postImages: any[] | undefined = undefined;
  const rawImages =
    (Array.isArray(raw.postImages) && raw.postImages.length > 0)
      ? raw.postImages
      : (raw.images ?? raw.imageUrls ?? raw.mediaUrls ?? raw.media ?? []);
  if (Array.isArray(rawImages) && rawImages.length > 0) {
    postImages = rawImages.map((img: any) => {
      const url = typeof img === "string" ? img : (img.url ?? img.src ?? img.imageUrl ?? "");
      return {
        url,
        width:  typeof img === "string" ? 1280 : (img.width  ?? 1280),
        height: typeof img === "string" ? 1810 : (img.height ?? 1810),
        expiresAt: (typeof img !== "string" && (img.expiresAt ?? img.expiry))
          ? (img.expiresAt ?? img.expiry)
          : (url ? expiryFromUrl(url) : 0),
      };
    }).filter((img: any) => img.url);
    if (postImages.length === 0) postImages = undefined;
  }

  // engagement
  const eng = raw.engagement ?? {};
  const engagement = {
    likes:    eng.likes    ?? eng.likeCount    ?? eng.reactions  ?? raw.likeCount    ?? 0,
    comments: eng.comments ?? eng.commentCount ?? raw.commentCount ?? 0,
    shares:   eng.shares   ?? eng.shareCount   ?? raw.shareCount  ?? 0,
  };

  return { id, linkedinUrl, content, postedAt, postImages, engagement };
}

/**
 * Merge freshly-fetched posts with the bundled seed: dedupe by id (preferring
 * the live copy for fresher image URLs), then sort newest-first. This guarantees
 * the API never serves fewer or older posts than the deployed seed, even if the
 * actor's last run is stale.
 */
function mergeWithSeed(livePosts: any[]): any[] {
  const byId = new Map<string, any>();
  for (const p of LINKEDIN_POSTS_SEED) byId.set(p.id, p);
  for (const p of livePosts) if (p && p.id) byId.set(p.id, p);
  return Array.from(byId.values()).sort(
    (a, b) => (b.postedAt?.timestamp ?? 0) - (a.postedAt?.timestamp ?? 0),
  );
}

async function handleLinkedInPosts(env: Env): Promise<Response> {
  // No credentials — serve seed data so the page always has content
  if (!env.APIFY_TOKEN || (!env.APIFY_ACTOR_ID && !env.APIFY_TASK_ID && !env.APIFY_DATASET_ID)) {
    return new Response(
      JSON.stringify({ posts: LINKEDIN_POSTS_SEED, _count: LINKEDIN_POSTS_SEED.length, _source: "seed" }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=3600",
          ...CORS_HEADERS,
        },
      }
    );
  }

  const fields = "id,linkedinUrl,postUrl,content,text,postedAt,publishedAt,createdAt,postImages,images,imageUrls,engagement";

  // Read the most recent run's dataset for an actor or task; else a fixed snapshot.
  const apifyUrl = env.APIFY_ACTOR_ID
    ? `https://api.apify.com/v2/acts/${env.APIFY_ACTOR_ID}/runs/last/dataset/items?token=${env.APIFY_TOKEN}&fields=${fields}&limit=100`
    : env.APIFY_TASK_ID
      ? `https://api.apify.com/v2/actor-tasks/${env.APIFY_TASK_ID}/runs/last/dataset/items?token=${env.APIFY_TOKEN}&fields=${fields}&limit=100`
      : `https://api.apify.com/v2/datasets/${env.APIFY_DATASET_ID}/items?token=${env.APIFY_TOKEN}&fields=${fields}&limit=100`;

  try {
    const upstream = await fetch(apifyUrl, {
      headers: { "Accept": "application/json" },
      // @ts-ignore — Cloudflare-specific cache directive
      cf: { cacheTtl: 0, cacheEverything: false },
    });

    if (!upstream.ok) {
      const body = await upstream.text();
      // Apify error — fall back to seed rather than surfacing a 502 to the browser
      console.error(`Apify ${upstream.status}: ${body.slice(0, 200)}`);
      return new Response(
        JSON.stringify({ posts: LINKEDIN_POSTS_SEED, _count: LINKEDIN_POSTS_SEED.length, _source: "seed_fallback" }),
        {
          headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300", ...CORS_HEADERS },
        }
      );
    }

    const raw = await upstream.json() as unknown;
    // Apify may return { data: { items: [...] } } or a plain array
    const rawItems: unknown[] = Array.isArray(raw)
      ? raw
      : Array.isArray((raw as any)?.data?.items)
        ? (raw as any).data.items
        : [];

    // Normalise each item to our schema; drop any that lack id or content
    const posts = rawItems.map(normalisePost).filter(Boolean);

    // Merge with the bundled seed (dedupe + sort newest-first) so the response is
    // never older or smaller than what we shipped. If normalisation produced
    // nothing, this still returns the full seed.
    const finalPosts = mergeWithSeed(posts);

    return new Response(
      JSON.stringify({ posts: finalPosts, _count: finalPosts.length }),
      {
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "public, max-age=1800, stale-while-revalidate=3600",
          ...CORS_HEADERS,
        },
      }
    );
  } catch (err) {
    console.error("Apify fetch error:", err);
    return new Response(
      JSON.stringify({ posts: LINKEDIN_POSTS_SEED, _count: LINKEDIN_POSTS_SEED.length, _source: "seed_fallback" }),
      {
        headers: { "Content-Type": "application/json", "Cache-Control": "public, max-age=300", ...CORS_HEADERS },
      }
    );
  }
}
