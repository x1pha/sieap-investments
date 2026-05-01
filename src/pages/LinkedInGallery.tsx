import { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, RefreshCw, Linkedin } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { useLinkedInFeed } from "@/contexts/LinkedInFeedContext";
import type { LinkedInPost } from "@/config/linkedin-posts";
import { proxyImageUrl, formatDate } from "@/lib/utils";
import { LinkedInLightbox } from "@/components/LinkedInLightbox";

function PostCard({ post, onClick }: { post: LinkedInPost; onClick: () => void }) {
  const img = post.postImages?.[0];
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96 }}
      className="group cursor-pointer rounded-xl overflow-hidden glass relative"
      onClick={onClick}
    >
      {img ? (
        <div className="relative overflow-hidden">
          <img
            src={proxyImageUrl(img.url)}
            alt={post.content.slice(0, 60)}
            loading="lazy"
            className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
            style={{ aspectRatio: `${img.width}/${img.height}` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
            <p className="text-sm text-white line-clamp-3">{post.content}</p>
          </div>
        </div>
      ) : (
        <div className="p-6 min-h-[160px] flex flex-col justify-between bg-secondary/40">
          <p className="text-sm text-gray-300 leading-relaxed line-clamp-5">{post.content}</p>
          <span className="text-xs text-muted-foreground mt-4">{formatDate(post.postedAt.date)}</span>
        </div>
      )}
      <div className="px-4 py-3 text-xs text-muted-foreground">
        <span>{formatDate(post.postedAt.date)}</span>
      </div>
    </motion.div>
  );
}

export default function LinkedInGallery() {
  const { posts, lastFetchedAt, newPostCount, clearNewPostBadge } = useLinkedInFeed();
  const [selected, setSelected] = useState<LinkedInPost | null>(null);

  const postsWithImages = posts.filter((p) => p.postImages && p.postImages.length > 0);

  const open = (post: LinkedInPost) => {
    setSelected(post);
    if (newPostCount > 0) clearNewPostBadge();
  };

  // Split posts into 3 columns for masonry layout
  const col0 = postsWithImages.filter((_, i) => i % 3 === 0);
  const col1 = postsWithImages.filter((_, i) => i % 3 === 1);
  const col2 = postsWithImages.filter((_, i) => i % 3 === 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="LinkedIn Gallery | SIEAP — Startup Insights & Tips"
        description="Browse all SIEAP LinkedIn posts — expert startup tips, valuation insights, and ecosystem updates. 48+ posts and growing."
        canonical="https://sieapinvest.com/linkedin-gallery"
      />
      <Navigation />

      <section className="container px-4 pt-32 pb-12 md:pt-40 md:pb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center gap-2 bg-[#0077b5]/10 border border-[#0077b5]/20 rounded-full px-4 py-1.5 mb-6">
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
            <span className="text-sm text-[#0077b5] font-medium">SIEAP on LinkedIn</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-normal mb-6">
            Every <span className="text-gradient font-medium">#SIEAPtip</span>
            <br />In One Place
          </h1>
          <p className="text-lg text-gray-400">
            {postsWithImages.length}+ posts on valuation, growth strategy, and startup readiness — curated from our LinkedIn feed.
          </p>
        </motion.div>

        {/* Status bar */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-muted-foreground"
        >
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
              Live feed · last checked {new Date(lastFetchedAt).toLocaleTimeString()}
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
        </motion.div>
      </section>

      {/* Masonry grid */}
      <section className="container px-4 pb-24">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-start">
          {[col0, col1, col2].map((col, ci) => (
            <div key={ci} className="flex flex-col gap-4">
              {col.map((post) => (
                <PostCard key={post.id} post={post} onClick={() => open(post)} />
              ))}
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-sm text-muted-foreground mb-4">
            New posts appear here automatically when published on LinkedIn.
          </p>
          <Button
            variant="outline"
            onClick={() => window.open("https://www.linkedin.com/company/sieap-startup/", "_blank")}
            className="gap-2"
          >
            <Linkedin className="w-4 h-4 text-[#0077b5]" />
            Follow SIEAP on LinkedIn
          </Button>
        </div>
      </section>

      {selected && <LinkedInLightbox post={selected} onClose={() => setSelected(null)} />}

      <Footer />
    </div>
  );
}
