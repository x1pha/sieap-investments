import { createContext, useContext, useEffect, useRef, useState, ReactNode } from "react";
import { toast } from "sonner";
import { LINKEDIN_POSTS_SEED, LinkedInPost, SEED_LATEST_ID } from "@/config/linkedin-posts";

const CACHE_KEY = "sieap_li_feed";
const POLL_INTERVAL_MS = 30 * 60 * 1000; // 30 minutes

interface CacheEntry {
  posts: LinkedInPost[];
  fetchedAt: number;
  latestId: string;
}

interface LinkedInFeedContextValue {
  posts: LinkedInPost[];
  lastFetchedAt: number | null;
  newPostCount: number;
  clearNewPostBadge: () => void;
}

const LinkedInFeedContext = createContext<LinkedInFeedContextValue>({
  posts: LINKEDIN_POSTS_SEED,
  lastFetchedAt: null,
  newPostCount: 0,
  clearNewPostBadge: () => {},
});

function loadCache(): CacheEntry | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveCache(entry: CacheEntry) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify(entry));
  } catch {}
}

// In production the Cloudflare Worker serves /api/linkedin-posts.
// In local dev set VITE_LI_FEED_URL to a full URL to enable polling;
// without it dev polling is intentionally a no-op (uses seed data).
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
    return Array.isArray(data?.posts) && data.posts.length > 0 ? data.posts : null;
  } catch {
    return null;
  }
}

export function LinkedInFeedProvider({ children }: { children: ReactNode }) {
  const cache = loadCache();
  const [posts, setPosts] = useState<LinkedInPost[]>(cache?.posts ?? LINKEDIN_POSTS_SEED);
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(cache?.fetchedAt ?? null);
  const [newPostCount, setNewPostCount] = useState(0);
  // Track the latest known post ID via ref so it's always current inside the poll closure
  const knownLatestId = useRef<string>(cache?.latestId ?? SEED_LATEST_ID);

  useEffect(() => {
    const poll = async () => {
      const fresh = await fetchLatestPosts();
      // API unavailable or empty — keep current posts, don't change anything
      if (!fresh) return;

      // Always replace posts with the full fresh list from the API.
      // This fixes the stale-closure bug (no merging with captured state)
      // and ensures the display always reflects the latest Apify dataset.
      setPosts(fresh);
      saveCache({ posts: fresh, fetchedAt: Date.now(), latestId: fresh[0].id });
      setLastFetchedAt(Date.now());

      // Detect how many posts are newer than what we last knew about
      const knownIdx = fresh.findIndex((p) => p.id === knownLatestId.current);
      const newCount = knownIdx === -1 ? 0 : knownIdx; // knownIdx === 0 means no new posts

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
