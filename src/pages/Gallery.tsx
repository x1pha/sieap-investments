import { useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Twitter, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { socialPosts, type SocialPost } from "@/config/social-posts";

type Filter = "All" | "LinkedIn" | "X / Twitter" | "Trust" | "Evaluation" | "Platform" | "Insights" | "Ecosystem";

const filters: Filter[] = ["All", "LinkedIn", "X / Twitter", "Trust", "Evaluation", "Platform", "Insights", "Ecosystem"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function matchesFilter(post: SocialPost, filter: Filter): boolean {
  if (filter === "All") return true;
  if (filter === "LinkedIn") return post.platform === "linkedin";
  if (filter === "X / Twitter") return post.platform === "twitter";
  return post.category === filter;
}

function PostCard({ post, index }: { post: SocialPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col gap-4 hover:border-white/20 transition-all duration-500"
    >
      {/* Row 1: Platform + Category + Date */}
      <div className="flex items-center gap-2 flex-wrap">
        {post.platform === "linkedin" ? (
          <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full font-medium">
            LinkedIn
          </span>
        ) : (
          <span className="bg-gray-600/20 text-gray-300 text-xs px-2 py-0.5 rounded-full font-medium">
            X / Twitter
          </span>
        )}
        <span className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-gray-500 ml-auto">{formatDate(post.date)}</span>
      </div>

      {/* Row 2: Title */}
      <h3 className="text-base font-medium text-white leading-snug">{post.title}</h3>

      {/* Row 3: Excerpt */}
      <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

      {/* Row 4: CTA */}
      <a
        href={post.postUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors w-fit"
      >
        View Post <ExternalLink className="w-3 h-3" />
      </a>
    </motion.div>
  );
}

export function Gallery() {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filtered = socialPosts.filter((p) => matchesFilter(p, activeFilter));

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Updates | SIEAP — LinkedIn & X Community Posts"
        description="Posts from SIEAP's LinkedIn and X accounts on startup evaluation, investment frameworks, and ecosystem building."
        canonical="https://sieapinvest.com/gallery"
      />
      <Navigation />

      {/* Hero */}
      <section className="container px-4 pt-32 pb-16 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-5xl font-normal mb-4">
            From Our <span className="text-gradient font-medium">Community</span>
          </h1>
          <p className="text-lg text-gray-400 mb-8">
            Posts from SIEAP's LinkedIn company page and X account — thinking on startup evaluation,
            investment frameworks, and building trust in India's ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-gray-300 hover:bg-white/10"
              asChild
            >
              <a
                href="https://www.linkedin.com/company/sieap-startup/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SIEAP on LinkedIn"
              >
                <Linkedin className="w-4 h-4 mr-2" /> Follow on LinkedIn
              </a>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-white/20 text-gray-300 hover:bg-white/10"
              asChild
            >
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow SIEAP on X"
              >
                {/* TODO: Replace # with actual X/Twitter handle URL */}
                <Twitter className="w-4 h-4 mr-2" /> Follow on X
              </a>
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Filter Bar */}
      <section className="container px-4 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
                activeFilter === f
                  ? "bg-white text-black font-medium"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="container px-4 py-8 pb-24">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-2">
            {filtered.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      {/* Live from X */}
      <section className="container px-4 py-16">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-16" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-normal mb-3">
            Live from <span className="text-gradient font-medium">X</span>
          </h2>
          <p className="text-gray-400">Real-time updates from @SIEAPInvest</p>
        </motion.div>

        <div className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden max-w-2xl mx-auto">
          <div
            dangerouslySetInnerHTML={{
              __html: `<a class="twitter-timeline" data-theme="dark" data-chrome="noheader nofooter noborders" data-height="600" href="https://twitter.com/SIEAPInvest">Tweets by @SIEAPInvest</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>`,
            }}
          />
        </div>
        <p className="text-xs text-gray-500 text-center mt-4">
          If the X feed doesn't load,{" "}
          <a href="#" className="hover:text-gray-300 transition-colors">
            {/* TODO: Replace # with actual X/Twitter handle URL */}
            follow us @SIEAPInvest directly.
          </a>
        </p>
      </section>

      {/* CTA */}
      <section className="container px-4 py-16 pb-24 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl font-normal mb-6">Want to stay updated?</h2>
          <Button size="lg" className="button-gradient" asChild>
            <a href="/apply">Subscribe to SIEAP Insights</a>
          </Button>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}

export default Gallery;
