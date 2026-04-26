import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts, type BlogPost } from "@/config/blog-posts";

type CategoryFilter = "All" | "Trust" | "Evaluation" | "Investing" | "Platform" | "Ecosystem";
const categoryFilters: CategoryFilter[] = ["All", "Trust", "Evaluation", "Investing", "Platform", "Ecosystem"];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl overflow-hidden hover:border-white/20 transition-all duration-500 flex flex-col"
    >
      {/* Top bar */}
      <div className="flex items-center gap-2 px-6 pt-5 pb-0">
        <span className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded-full">
          {post.category}
        </span>
        <span className="text-xs text-gray-500 ml-auto">{post.readTime}</span>
      </div>

      {/* Content */}
      <div className="px-6 py-4 flex flex-col flex-1">
        <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
        <h2 className="text-xl font-medium text-white mt-2 leading-snug">{post.title}</h2>
        <p className="text-sm text-gray-400 mt-3 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>

        <div className="pt-4 mt-auto flex flex-col gap-2">
          <Link
            to={`/blog/${post.slug}`}
            className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors"
          >
            Read More <ArrowRight className="w-4 h-4" />
          </Link>
          {post.linkedinUrl !== "#" && (
            <a
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors"
            >
              Also on LinkedIn →
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function Blog() {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>("All");

  const filtered = blogPosts.filter(
    (p) => p.published && (activeCategory === "All" || p.category === activeCategory)
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Blog | SIEAP Insights"
        description="Thinking on startup evaluation, investment frameworks, and building trust in India's startup ecosystem."
        canonical="https://sieapinvest.com/blog"
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
            Insights from <span className="text-gradient font-medium">SIEAP</span>
          </h1>
          <p className="text-lg text-gray-400 mb-3">
            Thinking on startup evaluation, investment frameworks, and building trust in India's
            ecosystem.
          </p>
          <p className="text-sm text-gray-500">
            Every post is also published on our LinkedIn company page. Follow us for real-time
            updates.
          </p>
        </motion.div>
      </section>

      {/* Category Filter */}
      <section className="container px-4 pb-4">
        <div className="flex flex-wrap gap-2 justify-center">
          {categoryFilters.map((c) => (
            <button
              key={c}
              onClick={() => setActiveCategory(c)}
              className={`text-sm px-4 py-1.5 rounded-full transition-all duration-200 ${
                activeCategory === c
                  ? "bg-white text-black font-medium"
                  : "bg-white/10 text-gray-300 hover:bg-white/20"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Post Grid */}
      <section className="container px-4 py-8 pb-24 max-w-5xl mx-auto">
        {filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-16">No posts in this category yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filtered.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}

export default Blog;
