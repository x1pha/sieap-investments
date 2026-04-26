import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Linkedin, X as XIcon, ExternalLink, RefreshCw, Clock, ArrowRight,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLinkedInFeed } from "@/contexts/LinkedInFeedContext";
import { blogPosts } from "@/config/blog-posts";
import { socialPosts } from "@/config/social-posts";
import type { LinkedInPost } from "@/config/linkedin-posts";

// ─── helpers ────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric", month: "short", year: "numeric",
  });
}

const TABS = [
  { key: "posts",   label: "LinkedIn Posts" },
  { key: "blog",    label: "Blog"           },
  { key: "updates", label: "Announcements"  },
] as const;

type Tab = typeof TABS[number]["key"];

// ─── LinkedIn lightbox ───────────────────────────────────────────────────────

function Lightbox({ post, onClose }: { post: LinkedInPost; onClose: () => void }) {
  const img = post.postImages?.[0];
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm overflow-y-auto"
        onClick={onClose}
      >
        <div className="flex min-h-full items-center justify-center p-4 py-10">
          <motion.div
            initial={{ scale: 0.92, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.92, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative max-w-sm w-full bg-[#111] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black transition-colors"
              aria-label="Close"
            >
              <XIcon className="w-4 h-4" />
            </button>
            {img && (
              <img
                src={img.url}
                alt={post.content.slice(0, 60)}
                className="w-full rounded-t-2xl"
                style={{ aspectRatio: `${img.width}/${img.height}` }}
              />
            )}
            <div className="p-5 space-y-3">
              <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                {post.content}
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-border">
                <span className="text-xs text-muted-foreground">{formatDate(post.postedAt.date)}</span>
                <a
                  href={post.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs text-primary hover:underline"
                >
                  View on LinkedIn <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

// ─── Posts tab ───────────────────────────────────────────────────────────────

function PostsTab() {
  const { posts, lastFetchedAt, newPostCount, clearNewPostBadge } = useLinkedInFeed();
  const [selected, setSelected] = useState<LinkedInPost | null>(null);

  const postsWithImages = posts.filter((p) => p.postImages && p.postImages.length > 0);
  const col0 = postsWithImages.filter((_, i) => i % 3 === 0);
  const col1 = postsWithImages.filter((_, i) => i % 3 === 1);
  const col2 = postsWithImages.filter((_, i) => i % 3 === 2);

  const open = (post: LinkedInPost) => {
    setSelected(post);
    if (newPostCount > 0) clearNewPostBadge();
  };

  return (
    <>
      {/* status bar */}
      <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-sm text-muted-foreground">
        {newPostCount > 0 && (
          <button
            onClick={clearNewPostBadge}
            className="flex items-center gap-2 bg-primary/10 border border-primary/30 text-primary rounded-full px-4 py-1.5 text-xs font-medium hover:bg-primary/20 transition-colors"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {newPostCount} new {newPostCount === 1 ? "post" : "posts"}
          </button>
        )}
        {lastFetchedAt && (
          <span className="flex items-center gap-1.5 text-xs">
            <RefreshCw className="w-3 h-3" />
            Live · last checked {new Date(lastFetchedAt).toLocaleTimeString()}
          </span>
        )}
        <a
          href="https://www.linkedin.com/company/sieap-startup/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 text-xs text-primary hover:underline"
        >
          Follow us <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* masonry grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {[col0, col1, col2].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-4">
            {col.map((post) => (
              <motion.div
                key={post.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="group cursor-pointer rounded-xl overflow-hidden glass"
                onClick={() => open(post)}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={post.postImages![0].url}
                    alt={post.content.slice(0, 60)}
                    loading="lazy"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{
                      aspectRatio: `${post.postImages![0].width}/${post.postImages![0].height}`,
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <p className="text-sm text-white line-clamp-3">{post.content}</p>
                  </div>
                </div>
                <div className="px-4 py-3 text-xs text-muted-foreground">
                  {formatDate(post.postedAt.date)}
                </div>
              </motion.div>
            ))}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="outline"
          onClick={() =>
            window.open("https://www.linkedin.com/company/sieap-startup/", "_blank")
          }
          className="gap-2"
        >
          <Linkedin className="w-4 h-4 text-[#0077b5]" />
          Follow SIEAP on LinkedIn
        </Button>
      </div>

      {selected && <Lightbox post={selected} onClose={() => setSelected(null)} />}
    </>
  );
}

// ─── Blog tab ────────────────────────────────────────────────────────────────

function BlogTab() {
  const published = blogPosts.filter((p) => p.published);

  const categoryColor: Record<string, string> = {
    Trust: "text-primary border-primary/30 bg-primary/10",
    Evaluation: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    Investing: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10",
    Platform: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    Ecosystem: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    Announcement: "text-pink-400 border-pink-400/30 bg-pink-400/10",
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {published.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass rounded-2xl p-7 flex flex-col justify-between gap-5 group"
        >
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span
                className={`text-xs font-medium border rounded-full px-3 py-0.5 ${
                  categoryColor[post.category] ?? categoryColor.Trust
                }`}
              >
                {post.category}
              </span>
              <span className="text-xs text-muted-foreground">{post.readTime}</span>
            </div>
            <h3 className="text-lg font-semibold leading-snug group-hover:text-primary transition-colors">
              {post.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(post.date)}
            </span>
            <Link
              to={`/blog/${post.slug}`}
              className="flex items-center gap-1 text-sm text-primary hover:underline"
            >
              Read <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Updates tab ─────────────────────────────────────────────────────────────

function UpdatesTab() {
  const platformIcon = (platform: string) =>
    platform === "linkedin" ? (
      <Linkedin className="w-4 h-4 text-[#0077b5]" />
    ) : (
      <XIcon className="w-4 h-4" />
    );

  const categoryColor: Record<string, string> = {
    Trust: "bg-primary/10 text-primary",
    Evaluation: "bg-blue-500/10 text-blue-400",
    Platform: "bg-purple-500/10 text-purple-400",
    Insights: "bg-yellow-500/10 text-yellow-400",
    Ecosystem: "bg-orange-500/10 text-orange-400",
    Announcement: "bg-pink-500/10 text-pink-400",
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      {socialPosts.map((post, i) => (
        <motion.div
          key={post.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
          className="glass rounded-2xl p-6 flex flex-col justify-between gap-4"
        >
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              {platformIcon(post.platform)}
              <span
                className={`text-xs font-medium rounded-full px-2.5 py-0.5 ${
                  categoryColor[post.category] ?? categoryColor.Trust
                }`}
              >
                {post.category}
              </span>
            </div>
            <h3 className="font-semibold text-sm leading-snug">{post.title}</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">{post.excerpt}</p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">{formatDate(post.date)}</span>
            {post.postUrl !== "#" && (
              <a
                href={post.postUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-primary hover:underline"
              >
                View <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function Traction() {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeTab = (searchParams.get("tab") as Tab) ?? "posts";

  const switchTab = (tab: Tab) => setSearchParams({ tab });

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Traction | SIEAP — Posts, Blog & Announcements"
        description="Everything SIEAP publishes — LinkedIn tips, in-depth blog posts, and platform announcements. The full signal, one place."
        canonical="https://sieapinvest.com/traction"
      />
      <Navigation />

      {/* Hero */}
      <section className="container px-4 pt-32 pb-10 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Traction
          </h1>
          <p className="text-lg text-gray-400">
            LinkedIn tips, in-depth reads, and platform updates —
            every signal SIEAP puts out, in one feed.
          </p>
        </motion.div>

        {/* Tab pills */}
        <div className="flex justify-center gap-2 mt-10">
          {TABS.map((tab) => (
            <button
              key={tab.key}
              onClick={() => switchTab(tab.key)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === tab.key
                  ? "bg-primary text-black"
                  : "bg-white/8 text-gray-400 hover:bg-white/15 hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tab content */}
      <section className="container px-4 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === "posts"   && <PostsTab />}
            {activeTab === "blog"    && <BlogTab />}
            {activeTab === "updates" && <UpdatesTab />}
          </motion.div>
        </AnimatePresence>
      </section>

      <Footer />
    </div>
  );
}
