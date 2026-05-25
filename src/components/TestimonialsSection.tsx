"use client";

import { motion } from "framer-motion";
import { Card } from "./ui/card";
import { CheckCircle2 } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, HealthTech Startup",
    initials: "PS",
    color: "from-emerald-500/20 to-emerald-500/5",
    stars: 5,
    content: "SIEAP helped us connect with the right investors within weeks. The mentorship and advisory support accelerated our Series A journey significantly.",
    verified: true,
  },
  {
    name: "Rajesh Mehta",
    role: "Angel Investor",
    initials: "RM",
    color: "from-blue-500/20 to-blue-500/5",
    stars: 5,
    content: "The deal flow quality on SIEAP is exceptional. The due diligence tools and portfolio tracking have streamlined how I evaluate early-stage startups.",
    verified: true,
  },
  {
    name: "Ananya Reddy",
    role: "Incubator Director",
    initials: "AR",
    color: "from-purple-500/20 to-purple-500/5",
    stars: 5,
    content: "Managing our cohort of 30+ startups became effortless with SIEAP. Demo day hosting and mentor coordination features are game-changers.",
    verified: true,
  },
  {
    name: "Vikram Patel",
    role: "Co-founder, EdTech Platform",
    initials: "VP",
    color: "from-amber-500/20 to-amber-500/5",
    stars: 5,
    content: "From pitch deck reviews to investor introductions — SIEAP's ecosystem approach gave us everything we needed to go from idea to funded startup.",
    verified: true,
  },
  {
    name: "Kavitha Nair",
    role: "Venture Partner",
    initials: "KN",
    color: "from-rose-500/20 to-rose-500/5",
    stars: 5,
    content: "The AI-powered matching is remarkably accurate. We've made three investments through SIEAP and the quality of startups keeps improving.",
    verified: true,
  },
  {
    name: "Arjun Desai",
    role: "TBI Programme Manager",
    initials: "AD",
    color: "from-cyan-500/20 to-cyan-500/5",
    stars: 5,
    content: "SIEAP's white-label solution let us brand the platform as our own. Our startups love the progress tracking and investor-readiness features.",
    verified: true,
  },
];

function StarRow({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} className="w-3.5 h-3.5 text-primary fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

const TestimonialsSection = () => {
  const doubled = [...testimonials, ...testimonials];

  return (
    <section className="py-20 overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/25 bg-primary/8">
            Verified Reviews
          </span>
          <h2 className="text-5xl font-normal mb-4">Trusted by the Ecosystem</h2>
          <p className="text-muted-foreground text-lg">
            Startups, investors, and incubators growing together on SIEAP
          </p>
        </motion.div>

        {/* Two-row marquee for visual depth */}
        <div className="relative flex flex-col gap-4 antialiased">
          {/* Row 1 — normal speed */}
          <div className="relative flex overflow-hidden py-2">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-6">
              {doubled.map((t, i) => (
                <TestimonialCard key={`r1-${i}`} t={t} />
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-6">
              {doubled.map((t, i) => (
                <TestimonialCard key={`r1b-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* Row 2 — reverse, slightly slower */}
          <div className="relative flex overflow-hidden py-2" style={{ direction: "rtl" }}>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-6" style={{ direction: "ltr" }}>
              {[...doubled].reverse().map((t, i) => (
                <TestimonialCard key={`r2-${i}`} t={t} />
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-6" style={{ direction: "ltr" }}>
              {[...doubled].reverse().map((t, i) => (
                <TestimonialCard key={`r2b-${i}`} t={t} />
              ))}
            </div>
          </div>

          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        </div>
      </div>
    </section>
  );
};

function TestimonialCard({ t }: { t: typeof testimonials[number] }) {
  return (
    <Card className="w-[360px] shrink-0 bg-secondary/30 backdrop-blur-xl border-border/50 hover:border-primary/25 transition-all duration-300 p-7 flex flex-col gap-0 group">
      {/* Quote mark */}
      <div className="text-5xl text-primary/15 font-serif leading-none mb-2 group-hover:text-primary/25 transition-colors duration-300">
        "
      </div>

      <StarRow count={t.stars} />

      <p className="text-sm text-foreground/70 leading-relaxed flex-1 mb-5">
        {t.content}
      </p>

      <div className="flex items-center gap-3 pt-4 border-t border-border/30">
        {/* Avatar — initials instead of broken GitHub URLs */}
        <div
          className={`h-10 w-10 rounded-full bg-gradient-to-br ${t.color} border border-white/10 flex items-center justify-center shrink-0`}
        >
          <span className="text-xs font-bold text-foreground/80">{t.initials}</span>
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <h4 className="font-medium text-foreground/90 text-sm truncate">{t.name}</h4>
            {t.verified && (
              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" title="Verified SIEAP user" />
            )}
          </div>
          <p className="text-xs text-muted-foreground truncate">{t.role}</p>
        </div>
      </div>
    </Card>
  );
}

export default TestimonialsSection;
