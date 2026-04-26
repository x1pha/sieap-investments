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

// In production the Cloudflare Worker serves /api/linkedin-posts (see src/worker.ts).
// In local dev set VITE_LI_FEED_URL to override; without it dev polling is a no-op.
const isLocalhost =
  typeof window !== "undefined" &&
  (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1");

const FEED_URL: string | undefined = isLocalhost
  ? (import.meta.env.VITE_LI_FEED_URL as string | undefined)
  : "/api/linkedin-posts";

async function fetchLatestPosts(): Promise<LinkedInPost[] | null> {
  if (!FEED_URL) return null;
  try {
    const res = await fetch(FEED_URL, { signal: AbortSignal.timeout(10_000) });
    if (!res.ok) return null;
    const data = await res.json();
    return Array.isArray(data?.posts) ? data.posts : null;
  } catch {
    return null;
  }
}

export function LinkedInFeedProvider({ children }: { children: ReactNode }) {
  const cache = loadCache();
  const [posts, setPosts] = useState<LinkedInPost[]>(cache?.posts ?? LINKEDIN_POSTS_SEED);
  const [lastFetchedAt, setLastFetchedAt] = useState<number | null>(cache?.fetchedAt ?? null);
  const [newPostCount, setNewPostCount] = useState(0);
  const knownLatestId = useRef<string>(cache?.latestId ?? SEED_LATEST_ID);

  const poll = async () => {
    const fresh = await fetchLatestPosts();
    if (!fresh || fresh.length === 0) return;

    const knownIdx = fresh.findIndex((p) => p.id === knownLatestId.current);
    const incoming = knownIdx === -1 ? fresh : fresh.slice(0, knownIdx);

    if (incoming.length > 0) {
      const merged = [...incoming, ...posts];
      setPosts(merged);
      knownLatestId.current = fresh[0].id;
      setNewPostCount((n) => n + incoming.length);
      const noun = incoming.length === 1 ? "post" : "posts";
      toast(`${incoming.length} new SIEAP ${noun} on LinkedIn`, {
        description: incoming[0].content.slice(0, 80) + "…",
        action: { label: "View", onClick: () => window.location.assign("/linkedin-gallery") },
      });
      saveCache({ posts: merged, fetchedAt: Date.now(), latestId: fresh[0].id });
    }

    setLastFetchedAt(Date.now());
  };

  useEffect(() => {
    poll();
    const id = setInterval(poll, POLL_INTERVAL_MS);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
