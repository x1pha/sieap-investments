#!/usr/bin/env bun
/**
 * Fetches fresh LinkedIn posts from Apify and rewrites
 * src/config/linkedin-posts.ts with the new data (sorted newest-first).
 *
 * Three modes, in priority order:
 *   1. Actor mode (preferred — always triggers a fresh scrape):
 *      APIFY_TOKEN=<token> APIFY_ACTOR_ID=harvestapi~linkedin-company-posts \
 *        bun run scripts/refresh-linkedin-posts.ts
 *      Runs the actor synchronously with a generated input and returns items.
 *
 *   2. Task mode (a pre-configured Apify task that already holds its input):
 *      APIFY_TOKEN=<token> APIFY_TASK_ID=<taskId> bun run scripts/refresh-linkedin-posts.ts
 *
 *   3. Dataset mode (legacy — reads a fixed snapshot, never refreshes):
 *      APIFY_TOKEN=<token> APIFY_DATASET_ID=<datasetId> bun run scripts/refresh-linkedin-posts.ts
 *
 * Optional (actor mode only):
 *   LINKEDIN_TARGET_URL   — company/profile URL to scrape (default: SIEAP company page)
 *   LINKEDIN_MAX_POSTS    — max posts to scrape, 0 = all (default: 50)
 */

import { writeFileSync } from "fs";
import { join } from "path";

const TOKEN = process.env.APIFY_TOKEN;
const ACTOR_ID = process.env.APIFY_ACTOR_ID;
const TASK_ID = process.env.APIFY_TASK_ID;
const DATASET_ID = process.env.APIFY_DATASET_ID;

const TARGET_URL =
  process.env.LINKEDIN_TARGET_URL ?? "https://www.linkedin.com/company/sieap-startup/";
const MAX_POSTS = Number(process.env.LINKEDIN_MAX_POSTS ?? "50");

if (!TOKEN) {
  console.error("APIFY_TOKEN must be set.");
  process.exit(1);
}

if (!ACTOR_ID && !TASK_ID && !DATASET_ID) {
  console.error("Set one of APIFY_ACTOR_ID (recommended), APIFY_TASK_ID, or APIFY_DATASET_ID.");
  process.exit(1);
}

interface RawItem {
  id?: string;
  postId?: string;
  linkedinUrl?: string;
  postUrl?: string;
  url?: string;
  content?: string;
  text?: string;
  postedAt?: { timestamp?: number; date?: string };
  publishedAt?: string | number;
  postImages?: { url?: string; width?: number; height?: number; expiresAt?: number }[];
  images?: unknown[];
  engagement?: { likes?: number; comments?: number; shares?: number };
}

let rawItems: RawItem[];

if (ACTOR_ID) {
  // Run the ACTOR synchronously with a generated input (always a fresh scrape).
  const runUrl =
    `https://api.apify.com/v2/acts/${ACTOR_ID}/run-sync-get-dataset-items` +
    `?token=${TOKEN}&waitForFinish=300`;
  const input = {
    targetUrls: [TARGET_URL],
    maxPosts: MAX_POSTS,
    includeQuotePosts: true,
    includeReposts: true,
    scrapeReactions: false,
    scrapeComments: false,
  };
  console.log(`Running Apify actor ${ACTOR_ID} on ${TARGET_URL} (up to 5 min)...`);
  const res = await fetch(runUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  if (!res.ok) {
    console.error("Apify actor run error:", res.status, await res.text());
    process.exit(1);
  }
  rawItems = await res.json();
} else if (TASK_ID) {
  // Run a pre-configured TASK synchronously (input is stored in the task).
  const runUrl =
    `https://api.apify.com/v2/actor-tasks/${TASK_ID}/run-sync-get-dataset-items` +
    `?token=${TOKEN}&waitForFinish=300`;
  console.log(`Running Apify task ${TASK_ID} (up to 5 min)...`);
  const res = await fetch(runUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  if (!res.ok) {
    console.error("Apify task run error:", res.status, await res.text());
    process.exit(1);
  }
  rawItems = await res.json();
} else {
  // Read from the fixed dataset snapshot (no fresh scrape).
  const url = `https://api.apify.com/v2/datasets/${DATASET_ID}/items?token=${TOKEN}&limit=100`;
  console.log(`Fetching posts from Apify dataset ${DATASET_ID}...`);
  const res = await fetch(url);
  if (!res.ok) {
    console.error("Apify API error:", res.status, await res.text());
    process.exit(1);
  }
  rawItems = await res.json();
}

console.log(`Fetched ${rawItems.length} raw items.`);

if (rawItems.length === 0) {
  console.error("Apify returned 0 items — aborting to avoid wiping the seed file.");
  process.exit(1);
}

interface CleanPost {
  id: string;
  linkedinUrl: string;
  content: string;
  postedAt: { timestamp: number; date: string };
  postImages?: { url: string; width: number; height: number; expiresAt: number }[];
  engagement: { likes: number; comments: number; shares: number };
}

// LinkedIn signed image URLs embed expiry in the `e=` query param (unix seconds).
function expiryFromUrl(url: string): number {
  const m = /[?&]e=(\d+)/.exec(url);
  return m ? Number(m[1]) * 1000 : 0;
}

function normalise(raw: RawItem): CleanPost | null {
  const id = String(raw.id ?? raw.postId ?? "").trim();
  const content = (raw.content ?? raw.text ?? "").trim();
  if (!id || !content) return null;

  const linkedinUrl = (raw.linkedinUrl ?? raw.postUrl ?? raw.url ?? "").trim();

  let ts = raw.postedAt?.timestamp;
  let date = raw.postedAt?.date;
  if (!ts || !date) {
    const fallback = raw.publishedAt ?? raw.postedAt?.timestamp ?? Date.now();
    ts = typeof fallback === "number" ? fallback : new Date(fallback).getTime();
    date = new Date(ts).toISOString();
  }

  let postImages: CleanPost["postImages"];
  if (Array.isArray(raw.postImages) && raw.postImages.length > 0) {
    postImages = raw.postImages
      .filter((img) => img && img.url)
      .map((img) => ({
        url: img.url!,
        width: img.width ?? 1280,
        height: img.height ?? 1810,
        expiresAt: img.expiresAt ?? expiryFromUrl(img.url!),
      }));
    if (postImages.length === 0) postImages = undefined;
  }

  const e = raw.engagement ?? {};
  return {
    id,
    linkedinUrl,
    content,
    postedAt: { timestamp: ts, date },
    postImages,
    engagement: {
      likes: e.likes ?? 0,
      comments: e.comments ?? 0,
      shares: e.shares ?? 0,
    },
  };
}

const posts = rawItems
  .map(normalise)
  .filter((p): p is CleanPost => p !== null)
  // newest first
  .sort((a, b) => b.postedAt.timestamp - a.postedAt.timestamp);

if (posts.length === 0) {
  console.error("Normalisation produced 0 valid posts — aborting.");
  process.exit(1);
}

const today = new Date().toISOString().slice(0, 10);
const source = ACTOR_ID
  ? `Apify actor ${ACTOR_ID}`
  : TASK_ID
    ? `Apify task ${TASK_ID}`
    : `Apify dataset ${DATASET_ID}`;

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function renderPost(p: CleanPost): string {
  const images =
    p.postImages && p.postImages.length > 0
      ? `[{ url: "${esc(p.postImages[0].url)}", width: ${p.postImages[0].width}, height: ${p.postImages[0].height}, expiresAt: ${p.postImages[0].expiresAt} }]`
      : "undefined";

  return `  {
    id: "${p.id}",
    linkedinUrl: "${esc(p.linkedinUrl)}",
    content: "${esc(p.content)}",
    postedAt: { timestamp: ${p.postedAt.timestamp}, date: "${p.postedAt.date}" },
    postImages: ${images},
    engagement: { likes: ${p.engagement.likes}, comments: ${p.engagement.comments}, shares: ${p.engagement.shares} },
  }`;
}

const body = `export interface LinkedInPost {
  id: string;
  linkedinUrl: string;
  content: string;
  postedAt: { timestamp: number; date: string };
  postImages?: { url: string; width: number; height: number; expiresAt: number }[];
  engagement: { likes: number; comments: number; shares: number };
}

// Auto-generated by scripts/refresh-linkedin-posts.ts — do not edit by hand.
// Last synced: ${today}  |  Source: ${source}
export const LINKEDIN_POSTS_SEED: LinkedInPost[] = [
${posts.map(renderPost).join(",\n")}
];

export const SEED_LATEST_ID = LINKEDIN_POSTS_SEED[0]?.id ?? "";
export const SEED_FETCH_DATE = "${today}";
`;

const outPath = join(import.meta.dir, "..", "src", "config", "linkedin-posts.ts");
writeFileSync(outPath, body, "utf8");
console.log(`Wrote ${posts.length} posts to ${outPath}`);
console.log(`Newest: ${posts[0].postedAt.date} (${posts[0].id})`);
