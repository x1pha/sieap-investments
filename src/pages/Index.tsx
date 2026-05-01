import { useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Users, Rocket, ShieldCheck, Scale, Award, Globe, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import { FeaturesSection } from "@/components/features/FeaturesSection";
import { PricingSection } from "@/components/pricing/PricingSection";
import LogoCarousel from "@/components/LogoCarousel";
import TestimonialsSection from "@/components/TestimonialsSection";
import Footer from "@/components/Footer";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Card } from "@/components/ui/card";
import { SEOHead } from "@/components/SEOHead";
import { socialPosts } from "@/config/social-posts";
import { formatDate } from "@/lib/utils";

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
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative container px-4 pt-40 pb-20"
      >
        <div className="absolute inset-0 -z-10 bg-background" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-4 px-4 py-1.5 rounded-full glass"
        >
          <span className="text-sm font-medium">
            <img
              src="/uploads/0dbe1b75-2c74-4ff8-ba55-4be4d74abe72.png"
              alt="SIEAP Logo"
              className="w-4 h-4 inline-block mr-2"
            />
            India's Startup-Investor Ecosystem Platform
          </span>
        </motion.div>

        <div className="max-w-4xl relative z-10">
          <h1 className="text-5xl md:text-7xl font-normal mb-4 tracking-tight text-left">
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
            className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl text-left"
          >
            Experience intelligent startup-investor matching with AI-powered insights, comprehensive advisory services, and enterprise-grade security.{" "}
            <span className="text-foreground">Start connecting in minutes.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <Button size="lg" className="button-gradient" asChild>
              <a href="/business">Get Started</a>
            </Button>
            <Button size="lg" variant="link" className="text-foreground">
              Learn More <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="relative mx-auto max-w-5xl mt-20"
        >
          <div className="glass rounded-xl overflow-hidden">
            <img
              src="/uploads/dashboard-preview.png"
              alt="SIEAP investor dashboard showing startup evaluation scores and portfolio metrics"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </motion.div>
      </motion.section>

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

      {/* Trust Architecture */}
      <section className="container px-4 py-24">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-normal mb-4"
          >
            Trust <span className="text-gradient font-medium">Architecture</span>
          </motion.h2>
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full bg-secondary/30 border-border/50 p-6 text-center">
                <item.icon className="w-8 h-8 text-primary mx-auto mb-4" />
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
          <a href="/gallery" className="text-sm text-primary hover:underline">
            View all updates →
          </a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container px-4 py-20 relative">
        <div
          className="absolute inset-0 opacity-40"
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
          className="bg-background/80 backdrop-blur-lg border border-border rounded-2xl p-8 md:p-12 text-center relative z-10"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to join the ecosystem?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Join hundreds of startups, investors, and incubators already growing with SIEAP.
          </p>
          <Button size="lg" className="button-gradient" asChild>
            <a href="/business">
              Create Account
              <ArrowRight className="ml-2 w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
