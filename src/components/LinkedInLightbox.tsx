import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink } from "lucide-react";
import type { LinkedInPost } from "@/config/linkedin-posts";
import { proxyImageUrl, formatDate } from "@/lib/utils";

export function LinkedInLightbox({ post, onClose }: { post: LinkedInPost; onClose: () => void }) {
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
              <X className="w-4 h-4" />
            </button>
            {img && (
              <img
                src={proxyImageUrl(img.url)}
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
                <span className="text-xs text-muted-foreground">{formatDate(post.postedAt.date, "en-IN")}</span>
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
