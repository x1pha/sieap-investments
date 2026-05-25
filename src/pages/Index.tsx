import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Building2, Users, Rocket, ShieldCheck, Scale, Award, Globe, ExternalLink, CheckCircle2, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import PlatformMetrics from "@/components/PlatformMetrics";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { socialPosts } from "@/config/social-posts";
import { formatDate } from "@/lib/utils";
import { HeroNetworkCanvas } from "@/components/HeroNetworkCanvas";

const audienceCards = [
  {
    icon: Building2,
    title: "Startups",
    description: "Register, get matched with investors, and access mentorship & advisory services.",
    href: "/for-startups",
    cta: "Explore Startup Plans",
  },
  {
    icon: Users,
    title: "Investors",
    description: "Discover vetted deal flow, track portfolios, and access due diligence support.",
    href: "/for-investors",
    cta: "Explore Investor Plans",
  },
  {
    icon: Rocket,
    title: "Incubators",
    description: "Manage cohorts, host demo days, coordinate mentors, and track startup progress.",
    href: "/for-incubators",
    cta: "Explore Incubator Plans",
  },
];

const trustItems = [
  {
    icon: ShieldCheck,
    title: "DPIIT-recognised under Startup India",
    description: "Officially recognised by the Department for Promotion of Industry and Internal Trade under the Startup India initiative.",
  },
  {
    icon: Scale,
    title: "SEBI-registered investment advisory compliance",
    description: "Investment advisory operations structured in compliance with SEBI's registered investment adviser regulations.",
  },
  {
    icon: Award,
    title: "Recognised by incubator / TBI partner network",
    description: "Partnered with Technology Business Incubators and accredited incubators across India.",
  },
  {
    icon: Globe,
    title: "AI-driven startup scoring and diligence",
    description: "Proprietary AI models power our 100-point scorecard, valuation engine, and due-diligence workflows.",
  },
];

const recentPosts = [...socialPosts]
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  .slice(0, 3);

// Real platform facts — no fabricated data, rotated as a spotlight
const PLATFORM_FACTS = [
  { label: "Evaluation depth", value: "27 parameters across 5 pillars" },
  { label: "Valuation methods", value: "DCF · Berkus · Scorecard" },
  { label: "Success fee model", value: "1% — no upfront cost" },
  { label: "Startup stages covered", value: "Idea · MVP · Growth · Pre-IPO" },
  { label: "Compliance built-in", value: "SEBI · DPIIT · MCA · GST" },
  { label: "Report sign-off", value: "CA-verified every quarter" },
  { label: "Matching approach", value: "Evaluation-first, not raw deal flow" },
  { label: "Advisory model", value: "Ongoing — not a one-time consultation" },
];

function RotatingStatSpotlight() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const cycle = setInterval(() => {
      // fade out → swap → fade in
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % PLATFORM_FACTS.length);
        setVisible(true);
      }, 350);
    }, 3200);
    return () => clearInterval(cycle);
  }, []);

  const fact = PLATFORM_FACTS[index];

  return (
    <div className="border-t border-border/30 pt-4 mt-4 flex items-center gap-3 min-h-[36px]">
      <span className="text-xs text-muted-foreground shrink-0 font-medium">{fact.label}:</span>
      <span
        className="text-xs text-primary font-semibold transition-all duration-300"
        style={{ opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(4px)" }}
      >
        {fact.value}
      </span>
      {/* progress dots */}
      <div className="ml-auto flex gap-1 shrink-0">
        {PLATFORM_FACTS.map((_, i) => (
          <span
            key={i}
            className="block rounded-full transition-all duration-300"
            style={{
              width: i === index ? "12px" : "4px",
              height: "4px",
              background: i === index ? "rgba(201,168,76,0.9)" : "rgba(201,168,76,0.2)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

const Index = () => {
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    if (!hash) return;
    // Delay lets React finish rendering before scrolling; offset clears fixed nav
    const timer = setTimeout(() => {
      const el = document.getElementById(hash);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top, behavior: "smooth" });
    }, 120);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="SIEAP | Evaluation-First Startup Investment Platform | India"
        description="SIEAP evaluates startups on a 100-point scorecard with CA-verified financials, then connects them with pre-partnered investors. 27 parameters. 5 pillars."
        canonical="https://sieapinvest.com"
      />
      <Navigation />

      {/* Hero Section */}
      <section className="relative container px-4 pt-40 pb-20 overflow-hidden">
        {/* Ambient floating orbs — purely decorative, pointer-events: none */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div
            className="animate-orb-a absolute top-[-120px] right-[-80px] w-[500px] h-[500px] rounded-full opacity-[0.07]"
            style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
          />
          <div
            className="animate-orb-b absolute bottom-[-60px] left-[-120px] w-[400px] h-[400px] rounded-full opacity-[0.05]"
            style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)" }}
          />
          <div
            className="animate-orb-c absolute top-[40%] left-[55%] w-[300px] h-[300px] rounded-full opacity-[0.04]"
            style={{ background: "radial-gradient(circle, #FFE484 0%, transparent 70%)" }}
          />
        </div>

        {/* Two-column hero layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-[460px]">

          {/* Left — text + CTAs */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full glass"
            >
              <span className="text-primary text-base leading-none">▲</span>
              <span className="text-sm font-medium">India's Startup-Investor Ecosystem Platform</span>
              <span className="flex items-center gap-1 ml-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse inline-block" />
                LIVE
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-normal mb-4 tracking-tight">
              <span className="text-muted-foreground">
                <TextGenerateEffect words="Grow with SIEAP" />
              </span>
              <br />
              <span className="text-foreground font-medium">
                <TextGenerateEffect words="Confidence & Security" />
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl"
            >
              Intelligent startup-investor matching with AI-powered insights, CA-verified financials, and enterprise-grade advisory.{" "}
              <span className="text-foreground">Start connecting in minutes.</span>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 items-start"
            >
              <div className="relative">
                <div className="absolute inset-0 rounded-full animate-ring-pulse bg-primary/30 pointer-events-none" />
                <Button size="lg" className="button-gradient relative z-10" asChild>
                  <a href="/business">Get Started</a>
                </Button>
              </div>
              <Button
                size="lg"
                variant="link"
                className="text-foreground"
                onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              >
                See How It Works <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>

          {/* Right — interactive particle network */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="hidden lg:flex flex-col relative"
            style={{ height: "560px" }}
          >
            {/* Type legend — anchored top-right */}
            <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5 pointer-events-none select-none">
              {[
                { label: "Investors",   color: "#F8EED2" },
                { label: "Incubators",  color: "#FFBC4C" },
                { label: "Startups",    color: "#B49641" },
              ].map((item) => (
                <div key={item.label} className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: item.color, boxShadow: `0 0 5px ${item.color}99` }} />
                  <span className="text-[9px] font-medium tracking-widest uppercase" style={{ color: `${item.color}bb` }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Fade edges so canvas bleeds into the dark page */}
            <div className="absolute inset-0 pointer-events-none z-10"
              style={{
                background: [
                  "linear-gradient(to right, hsl(var(--background)) 0%, transparent 10%)",
                  "linear-gradient(to left,  hsl(var(--background)) 0%, transparent 8%)",
                  "linear-gradient(to bottom, hsl(var(--background)) 0%, transparent 8%)",
                  "linear-gradient(to top,    hsl(var(--background)) 0%, transparent 8%)",
                ].join(", "),
              }}
            />
            <HeroNetworkCanvas className="w-full h-full" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-2xl p-8 md:p-12">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { value: "100", label: "Point Scorecard", sublabel: "5 pillars · 27 parameters" },
                { value: "6", label: "Startup Stages", sublabel: "Idea → Pre-IPO" },
                { value: "1%", label: "Success Fee", sublabel: "No upfront, no conflict" },
                { value: "3×", label: "Valuation Methods", sublabel: "DCF · Berkus · Scorecard" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.09, type: "spring", stiffness: 260, damping: 20 }}
                  className="text-center space-y-1"
                >
                  <div className="text-4xl md:text-5xl font-bold text-primary">{stat.value}</div>
                  <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                  <div className="text-xs text-muted-foreground">{stat.sublabel}</div>
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="mt-8 pt-8 border-t border-border/30 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { badge: "DPIIT Recognised", desc: "Startup India certified entity" },
                { badge: "SEBI Compliant", desc: "Investment advisory framework" },
                { badge: "CA-Verified", desc: "Every financial report audited" },
              ].map((item, i) => (
                <motion.div
                  key={item.badge}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <CheckCircle2 className="w-4 h-4 text-primary shrink-0" />
                  <div>
                    <span className="text-sm font-medium text-foreground">{item.badge}</span>
                    <span className="text-xs text-muted-foreground ml-2">{item.desc}</span>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Rotating platform fact spotlight */}
            <RotatingStatSpotlight />
          </div>
        </motion.div>
      </section>

      {/* 3-Audience Routing */}
      <section className="container px-4 py-24">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-normal mb-4"
          >
            Built for <span className="text-gradient font-medium">Every Stakeholder</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Whether you're building, funding, or nurturing — SIEAP has you covered.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {audienceCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/40 transition-all duration-300 p-8 flex flex-col">
                <card.icon className="w-10 h-10 text-primary mb-6" />
                <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                <p className="text-muted-foreground mb-6 flex-grow">{card.description}</p>
                <Button variant="outline" className="w-full border-primary/30 hover:bg-primary/10 text-foreground" asChild>
                  <a href={card.href}>
                    {card.cta} <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Logo Carousel */}
      <LogoCarousel />

      {/* Features Section */}
      <div id="features">
        <FeaturesSection />
      </div>

      {/* Platform Metrics / Animated Dashboard */}
      <PlatformMetrics />

      {/* Trust Architecture */}
      <section className="container px-4 py-24">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-primary mb-4 px-3 py-1 rounded-full border border-primary/25 bg-primary/8">
              Regulatory &amp; Compliance
            </span>
            <h2 className="text-4xl md:text-5xl font-normal mb-4">
              Trust <span className="text-gradient font-medium">Architecture</span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-lg text-muted-foreground"
          >
            Backed by government recognition, regulatory compliance, and data-driven intelligence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {trustItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="shimmer-hover"
            >
              <Card className="h-full bg-secondary/30 border-border/50 hover:border-primary/30 transition-colors duration-300 p-6 text-center cursor-default">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                  <item.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

      </section>

      {/* Pricing Section */}
      <div id="pricing">
        <PricingSection />
      </div>

      {/* Testimonials Section */}
      <div id="testimonials">
        <TestimonialsSection />
      </div>

      {/* Latest Updates */}
      <section className="container px-4 py-24">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-normal mb-4"
          >
            Latest <span className="text-gradient font-medium">Updates</span>
          </motion.h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {recentPosts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="bg-white/5 backdrop-blur border border-white/10 rounded-2xl p-6 flex flex-col gap-3 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-center gap-2 flex-wrap">
                {post.platform === "linkedin" ? (
                  <span className="bg-blue-600/20 text-blue-400 text-xs px-2 py-0.5 rounded-full">LinkedIn</span>
                ) : (
                  <span className="bg-gray-600/20 text-gray-300 text-xs px-2 py-0.5 rounded-full">X / Twitter</span>
                )}
                <span className="text-xs text-gray-500 ml-auto">{formatDate(post.date)}</span>
              </div>
              <h3 className="text-base font-medium text-white leading-snug">{post.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed line-clamp-3 flex-1">{post.excerpt}</p>
              <a href={post.postUrl} target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-white transition-colors w-fit">
                View Post <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
        <div className="text-right max-w-5xl mx-auto mt-6">
          <a href="/traction" className="text-sm text-primary hover:underline inline-flex items-center gap-1">
            View all updates <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: 'url("/uploads/21f3edfb-62b5-4e35-9d03-7339d803b980.png")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-background/80 backdrop-blur-lg border border-primary/20 rounded-2xl p-8 md:p-12 text-center relative z-10"
          style={{ boxShadow: "0 0 60px rgba(201,168,76,0.08), inset 0 1px 0 rgba(201,168,76,0.15)" }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/25 text-primary text-xs font-semibold px-4 py-1.5 rounded-full mb-6"
          >
            <Zap className="w-3.5 h-3.5" />
            Join the Evaluation-First Platform
          </motion.div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join the ecosystem?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of startups, investors, and incubators already growing with SIEAP.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="relative">
              <div className="absolute inset-0 rounded-full animate-ring-pulse bg-primary/30 pointer-events-none" />
              <Button size="lg" className="button-gradient relative z-10" asChild>
                <a href="/business">
                  Create Account
                  <ArrowRight className="ml-2 w-4 h-4" />
                </a>
              </Button>
            </div>
            <Button size="lg" variant="outline" className="border-border/60 hover:border-primary/40" asChild>
              <a href="/traction">See Platform in Action</a>
            </Button>
          </div>
          {/* Social proof numbers */}
          <div className="mt-10 pt-8 border-t border-border/30 flex flex-wrap gap-8 justify-center text-sm text-muted-foreground">
            {[
              { v: "49+", l: "LinkedIn posts published" },
              { v: "100pt", l: "Evaluation scorecard" },
              { v: "1%", l: "Success-only fee" },
            ].map((s) => (
              <div key={s.l} className="flex items-center gap-2">
                <span className="text-primary font-bold">{s.v}</span>
                <span>{s.l}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
