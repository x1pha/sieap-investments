import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { toast } from "sonner";
import { LINKEDIN_POSTS_SEED, LinkedInPost, SEED_LATEST_ID } from "@/config/linkedin-posts";

const CACHE_KEY = "sieap_li_feed";
const CACHE_VERSION = 2; // bump to invalidate old caches with wrong structure
const POLL_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  v: number;
  posts: LinkedInPost[];
  fetchedAt: number;
  latestId: string;
}

interface LinkedInFeedContextValue {
  posts: LinkedInPost[];
  loading: boolean;
  lastFetchedAt: number | null;
  newPostCount: number;
  clearNewPostBadge: () => void;
}

const LinkedInFeedContext = createContext<LinkedInFeedContextValue>({
  posts: LINKEDIN_POSTS_SEED,
  loading: false,
  lastFetchedAt: null,
  newPostCount: 0,
  clearNewPostBadge: () => {},
});

/** A valid post must have id, content, and postedAt.date */
function isValidPost(p: unknown): p is LinkedInPost {
  if (!p || typeof p !== "object") return false;
  const post = p as any;
  return (
    typeof post.id === "string" && post.id.length > 0 &&
    typeof post.content === "string" && post.content.length > 0 &&
    typeof post.postedAt?.date === "string"
  );
}

function loadCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry: CacheEntry = JSON.parse(raw);
    // Reject old cache versions or entries with no valid posts
    if (entry.v !== CACHE_VERSION) return null;
    if (!Array.isArray(entry.posts) || !entry.posts.some(isValidPost)) return null;
    return entry;
  } catch {
    return null;
  }
}

function saveCache(entry: CacheEntry) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {}
}

function clearCache() {
  try { localStorage.removeItem(CACHE_KEY); } catch {}
}

// In production the Cloudflare Worker serves /api/linkedin-posts.
// In local dev set VITE_LI_FEED_URL to a full URL to enable polling;
// without it dev uses seed data (LinkedIn CDN blocks direct hotlinks anyway).
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const FEED_URL: string | undefined = isLocalhost
  ? (import.meta.env.VITE_LI_FEED_URL as string | undefined)
  : "/api/linkedin-posts";

async function fetchLatestPosts(): Promise<LinkedInPost[] | null> {
  if (!FEED_URL) return null;
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(15_000) });
    if (!res.ok) return null;
    const data = await res.json();
    const posts: unknown[] = Array.isArray(data?.posts) ? data.posts : [];
    const valid = posts.filter(isValidPost);
    return valid.length > 0 ? valid : null;
  } catch {
    return null;
  }
}

export function LinkedInFeedProvider({ children }: { children: ReactNode }) {
  const cache = loadCache();
  const [posts, setPosts] = useState<LinkedInPost[]>(cache?.posts ?? LINKEDIN_POSTS_SEED);
  const [loading, setLoading] = useState(!cache && !!FEED_URL);
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(cache?.fetchedAt ?? null);
  const [newPostCount, setNewPostCount] = useState(0);
  const knownLatestId = useRef<string>(cache?.latestId ?? SEED_LATEST_ID);

  useEffect(() => {
    const poll = async () => {
      const fresh = await fetchLatestPosts();

      // API unavailable or returned nothing valid — keep current posts
      if (!fresh) {
        setLoading(false);
        return;
      }

      setPosts(fresh);
      setLoading(false);
      saveCache({ v: CACHE_VERSION, posts: fresh, fetchedAt: Date.now(), latestId: fresh[0].id });
      setLastFetchedAt(Date.now());

      const knownIdx = fresh.findIndex((p) => p.id === knownLatestId.current);
      const newCount = knownIdx === -1 ? 0 : knownIdx;

      if (newCount > 0) {
        knownLatestId.current = fresh[0].id;
        setNewPostCount((n) => n + newCount);
        const noun = newCount === 1 ? "post" : "posts";
        toast(`${newCount} new SIEAP ${noun} on LinkedIn`, {
          description: fresh[0].content.slice(0, 80) + "…",
          action: { label: "View", onClick: () => window.location.assign("/traction") },
        });
      }
    };

    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <LinkedInFeedContext.Provider
      value={{
        posts,
        loading,
        lastFetchedAt,
        newPostCount,
        clearNewPostBadge: () => setNewPostCount(0),
      }}
    >
      {children}
    </LinkedInFeedContext.Provider>
  );
}

export function useLinkedInFeed() {
  return useContext(LinkedInFeedContext);
}
