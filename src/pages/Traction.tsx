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
import { proxyImageUrl, formatDate, isLocalDev } from "@/lib/utils";
import { LinkedInLightbox } from "@/components/LinkedInLightbox";

const TABS = [
  { key: "posts",   label: "LinkedIn Posts" },
  { key: "blog",    label: "Blog"           },
  { key: "updates", label: "Announcements"  },
] as const;

type Tab = typeof TABS[number]["key"];

// ─── Posts tab ───────────────────────────────────────────────────────────────

function PostCard({
  post,
  onClick,
}: {
  post: LinkedInPost;
  onClick: () => void;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const img = post.postImages?.[0];
  // On localhost the proxy is bypassed and LinkedIn CDN blocks direct browser requests,
  // so skip the image element entirely in dev to avoid a broken-image flash.
  const showImage = !!img && !imgFailed && !isLocalDev;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="group cursor-pointer rounded-xl overflow-hidden glass border border-white/5 hover:border-primary/20 transition-colors duration-300"
      onClick={onClick}
    >
      {showImage ? (
        <div className="relative overflow-hidden">
          <img
            src={proxyImageUrl(img.url)}
            alt={post.content.slice(0, 60)}
            loading="lazy"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ aspectRatio: `${img.width}/${img.height}` }}
            onError={() => setImgFailed(true)}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-sm text-white line-clamp-3">{post.content}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 min-h-[140px] flex flex-col justify-between gap-3 bg-gradient-to-br from-primary/5 via-transparent to-primary/8">
          <p className="text-sm text-foreground/90 leading-relaxed line-clamp-6">
            {post.content}
          </p>
        </div>
      )}
      <div className="px-4 py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">{formatDate(post.postedAt.date)}</span>
        <Linkedin className="w-3.5 h-3.5 text-[#0077b5] opacity-60" />
      </div>
    </motion.div>
  );
}

function PostsTab() {
  const { posts, loading, lastFetchedAt, newPostCount, clearNewPostBadge } = useLinkedInFeed();
  const [selected, setSelected] = useState<LinkedInPost | null>(null);

  const col0 = posts.filter((_, i) => i % 3 === 0);
  const col1 = posts.filter((_, i) => i % 3 === 1);
  const col2 = posts.filter((_, i) => i % 3 === 2);

  const open = (post: LinkedInPost) => {
    setSelected(post);
    if (newPostCount > 0) clearNewPostBadge();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {[0, 1, 2].map((ci) => (
          <div key={ci} className="flex flex-col gap-4">
            {[180, 260, 200].map((h, i) => (
              <div key={i} className="glass rounded-xl animate-pulse" style={{ height: h }} />
            ))}
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-24">
        <Linkedin className="w-12 h-12 text-[#0077b5] mx-auto mb-4 opacity-40" />
        <p className="text-muted-foreground mb-6">No posts available right now.</p>
        <Button variant="outline" asChild>
          <a href="https://www.linkedin.com/company/sieap-startup/" target="_blank" rel="noopener noreferrer" className="gap-2">
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
            View SIEAP on LinkedIn
          </a>
        </Button>
      </div>
    );
  }

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

      {/* masonry grid — ALL posts, images optional */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
        {[col0, col1, col2].map((col, ci) => (
          <div key={ci} className="flex flex-col gap-4">
            {col.map((post) => (
              <PostCard key={post.id} post={post} onClick={() => open(post)} />
            ))}
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <Button
          variant="outline"
          onClick={() => window.open("https://www.linkedin.com/company/sieap-startup/", "_blank")}
          className="gap-2"
        >
          <Linkedin className="w-4 h-4 text-[#0077b5]" />
          Follow SIEAP on LinkedIn
        </Button>
      </div>

      {selected && <LinkedInLightbox post={selected} onClose={() => setSelected(null)} />}
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
