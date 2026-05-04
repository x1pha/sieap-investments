import { useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

interface TallyModalProps {
  title: string;
  tallySrc: string;
  iframeHeight?: number;
  onClose: () => void;
}

export function TallyModal({ title, tallySrc, iframeHeight = 800, onClose }: TallyModalProps) {
  useEffect(() => {
    const TALLY_SRC = "https://tally.so/widgets/embed.js";
    const loadEmbeds = () => {
      if (typeof (window as any).Tally !== "undefined") {
        (window as any).Tally.loadEmbeds();
      } else {
        document.querySelectorAll<HTMLIFrameElement>("iframe[data-tally-src]:not([src])").forEach((el) => {
          el.src = el.dataset.tallySrc!;
        });
      }
    };
    if (typeof (window as any).Tally !== "undefined") {
      loadEmbeds();
    } else if (!document.querySelector(`script[src="${TALLY_SRC}"]`)) {
      const s = document.createElement("script");
      s.src = TALLY_SRC;
      s.onload = loadEmbeds;
      s.onerror = loadEmbeds;
      document.body.appendChild(s);
    } else {
      loadEmbeds();
    }

    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 16 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-lg bg-[#111] rounded-2xl shadow-2xl flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <p className="font-semibold text-sm text-foreground">{title}</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-4 bg-[#1c1c1c]">
          <iframe
            data-tally-src={tallySrc}
            loading="lazy"
            width="100%"
            height={iframeHeight}
            frameBorder={0}
            marginHeight={0}
            marginWidth={0}
            title={title}
            className="w-full"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
