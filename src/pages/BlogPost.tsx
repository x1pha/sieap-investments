import { motion } from "framer-motion";
import { ArrowRight, Linkedin } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { blogPosts } from "@/config/blog-posts";

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function renderContent(content: string) {
  return content.split(/\n\n+/).map((block, i) => {
    const trimmed = block.trim();
    if (trimmed.startsWith("**") && trimmed.endsWith("**")) {
      return (
        <h3 key={i} className="text-xl font-semibold text-white mt-8 mb-3">
          {trimmed.slice(2, -2)}
        </h3>
      );
    }
    return (
      <p key={i} className="text-gray-300 text-base leading-relaxed mb-4">
        {trimmed}
      </p>
    );
  });
}

export function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug && p.published);

  if (!post) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col">
        <Navigation />
        <div className="flex-1 flex flex-col items-center justify-center gap-4">
          <p className="text-xl text-gray-400">Post not found.</p>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const related = blogPosts.filter((p) => p.published && p.slug !== post.slug).slice(0, 2);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title={`${post.title} | SIEAP Blog`}
        description={post.excerpt}
        canonical={`https://sieapinvest.com/blog/${post.slug}`}
      />
      <Navigation />

      {/* Post Header */}
      <section className="container px-4 pt-32 pb-8 md:pt-40 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-3 mb-6 flex-wrap">
            <span className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded-full">
              {post.category}
            </span>
            <span className="text-xs text-gray-500">{formatDate(post.date)}</span>
            <span className="text-xs text-gray-500">·</span>
            <span className="text-xs text-gray-500">{post.readTime}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-light text-white leading-tight mb-4">
            {post.title}
          </h1>
          <p className="text-sm text-gray-500">By {post.author}</p>
        </motion.div>

        <div className="h-px bg-white/10 my-8" />

        {post.linkedinUrl !== "#" && (
          <div className="flex items-center gap-2 mb-8 text-sm text-gray-400">
            <Linkedin className="w-4 h-4 text-blue-400" />
            <span>This post was originally published on our LinkedIn company page.</span>
            <a
              href={post.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors"
            >
              View on LinkedIn →
            </a>
          </div>
        )}
      </section>

      {/* Post Content */}
      <section className="container px-4 pb-16 max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {renderContent(post.content)}
        </motion.div>
      </section>

      {/* Post Footer */}
      {related.length > 0 && (
        <section className="container px-4 pb-24 max-w-3xl mx-auto">
          <div className="h-px bg-white/10 my-12" />
          <h2 className="text-2xl font-normal mb-8">
            More from <span className="text-gradient font-medium">SIEAP</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {related.map((rp, i) => (
              <motion.div
                key={rp.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 hover:border-white/20 transition-all duration-500 flex flex-col gap-3"
              >
                <div className="flex items-center gap-2">
                  <span className="bg-white/10 text-gray-300 text-xs px-2 py-0.5 rounded-full">
                    {rp.category}
                  </span>
                  <span className="text-xs text-gray-500 ml-auto">{rp.readTime}</span>
                </div>
                <p className="text-xs text-gray-500">{formatDate(rp.date)}</p>
                <h3 className="text-base font-medium text-white leading-snug">{rp.title}</h3>
                <p className="text-sm text-gray-400 line-clamp-2">{rp.excerpt}</p>
                <Link
                  to={`/blog/${rp.slug}`}
                  className="flex items-center gap-1 text-sm text-white/70 hover:text-white transition-colors mt-auto"
                >
                  Read More <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 text-right">
            <Link to="/blog" className="text-sm text-primary hover:underline">
              View all posts →
            </Link>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}

export default BlogPost;
