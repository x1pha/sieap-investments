import { useState } from "react";
import { motion } from "framer-motion";
import { Lightbulb, FileText, Code, TrendingUp, Target, Banknote, Scale, Briefcase, Megaphone, Users, ChevronRight, Check, Minus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const stages = [
  {
    id: 1, title: "Pre-Idea", icon: Lightbulb,
    provides: ["Idea validation", "Market research", "ICP definition", "Competitive landscape mapping"],
    weight: "Team & Execution (45%)", tier: "Basic",
  },
  {
    id: 2, title: "Idea", icon: FileText,
    provides: ["Business model canvas", "Strategy design", "Financial plan", "Revenue model validation"],
    weight: "Team (35%)", tier: "Basic",
  },
  {
    id: 3, title: "MVP / Build", icon: Code,
    provides: ["GTM strategy", "Team building guidance", "Operations setup", "Product feedback"],
    weight: "Product (30%)", tier: "Growth",
  },
  {
    id: 4, title: "Early Traction", icon: TrendingUp,
    provides: ["Growth metrics tracking", "Partnership strategy", "Unit economics optimisation"],
    weight: "Financial (25%)", tier: "Growth",
  },
  {
    id: 5, title: "Investor Ready", icon: Target,
    provides: ["Pitch deck creation & refinement", "SIEAP valuation (3-method blend with CA sign-off)", "Data room preparation", "Investor readiness sign-off"],
    weight: "Financial (30%)", tier: "Premium",
    note: "Only Gold+ (70/100) at Stage 5 appear on the investor dashboard.",
  },
  {
    id: 6, title: "Funded", icon: Banknote,
    provides: ["Active introduction to SIEAP investor pool", "Investor matching by thesis/sector/cheque size", "Investment executed via SIEAP platform", "Post-investment KPI monitoring"],
    weight: "Financial (30%)", tier: "1% on investment received",
  },
];

const pricingCards = [
  {
    tier: "BASIC",
    label: "Entry Level",
    headerClass: "bg-[hsl(var(--secondary))]",
    price: "₹999",
    annual: "₹9,999",
    tagline: "Register + Core Access",
    features: [
      "Platform registration",
      "Startup dashboard access",
      "Community & webinar access",
      "Ecosystem access",
      "Service partner discounts (legal, finance, GTM, talent)",
      "Co-hosted webinar participation",
    ],
    note: "Nominal subscription fee",
    bestFor: "Pre-idea to idea stage founders exploring structure",
    cta: "Start Basic",
  },
  {
    tier: "GROWTH",
    label: "Most Popular",
    headerClass: "bg-teal-900",
    isPopular: true,
    price: "₹3,499",
    annual: "₹34,999",
    tagline: "Mentorship + Pitch Review",
    features: [
      "Everything in Basic",
      "Core mentorship content library",
      "1:1 mentor sessions (2x/month)",
      "Pitch deck review & refinement",
      "Basic SIEAP valuation report with business growth pointers",
      "Growth strategy support",
      "Competitive analysis & positioning",
    ],
    note: "Tiered upgrade pricing",
    bestFor: "MVP to traction stage startups building towards investment",
    cta: "Start Growth",
  },
  {
    tier: "PREMIUM",
    label: "Investor Ready",
    headerClass: "bg-amber-900/80",
    price: "₹8,999",
    annual: "₹89,999",
    tagline: "Full Service + Investor Matching",
    features: [
      "Everything in Growth",
      "Priority investor matching",
      "Full SIEAP valuation (3-method blend + CA sign-off*)",
      "Dedicated mentor assigned",
      "Data room preparation",
      "Investor readiness sign-off",
      "4x monthly 1:1 mentor sessions",
    ],
    note: "+1% only on funding secured",
    bestFor: "Investor-ready startups seeking funded status",
    cta: "Start Premium",
    footnote: "*CA sign-off is included in all Premium valuations. Registered Valuer charges may be additional, depending on valuation complexity and applicable regulatory requirements. SIEAP will advise on applicability before engagement.",
  },
];

const servicePartners = [
  { icon: Scale, title: "Legal", desc: "Company incorporation, IP protection, ESOP structuring, SHA drafting", badge: "Discounted via SIEAP" },
  { icon: Briefcase, title: "Finance", desc: "CA services, GST filing, bookkeeping, audit & compliance", badge: "Discounted via SIEAP" },
  { icon: Megaphone, title: "GTM", desc: "Marketing, PR, branding & growth strategy", badge: "Discounted via SIEAP" },
  { icon: Users, title: "Talent", desc: "Hiring support, internships & fractional CxO", badge: "Discounted via SIEAP" },
];

const faqs = [
  { q: "Why share sensitive data with SIEAP?", a: "Encrypted, access-controlled per DPDP Act 2023. Investors see reports and scores, not raw bank statements. You control sharing. Full deletion on exit." },
  { q: "What if I disagree with my score?", a: "14-day formal appeal with additional evidence. Different evaluator reviews. Scores can go up or down. Quarterly re-evaluation." },
  { q: "I'm pre-revenue. Can SIEAP help?", a: "Yes. Stages 1–3 are the mentorship track. You get validation, strategy, financial planning, MVP support. Investor dashboard only at Stage 5 Gold+." },
  { q: "What does the subscription cover vs. the 1% fee?", a: "Subscription covers mentorship, tools, dashboard, community, and service partner access. The 1% is charged only on actual investment received via SIEAP. Subscription is the growth engine; 1% is the alignment engine." },
  { q: "What service partners are available?", a: "Legal (incorporation, IP, SHA), Finance (CA, GST, audit), GTM (marketing, PR, growth), and Talent (hiring, fractional CxO) — all at SIEAP-negotiated discounted rates." },
  { q: "Can I switch tiers?", a: "Yes. Upgrade anytime. Downgrade at end of billing cycle. Annual plans are non-refundable but transferable to a higher tier." },
];

export default function ForStartups() {
  const [activeStage, setActiveStage] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pb-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold tracking-tight leading-tight"
          >
            From Idea to Investment.{" "}
            <span className="text-primary">We Walk With You.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            SIEAP mentors startups through 6 structured stages — from pre-idea validation to secured funding. Not just a listing platform. We build investor-ready startups.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button size="lg" className="button-gradient text-black font-semibold" onClick={() => window.location.href = "/apply"}>
              Apply as a Startup <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = "/pricing"}>
              See Pricing
            </Button>
          </motion.div>
        </div>
      </section>

      {/* 6-Stage Timeline */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-4">
            The 6-Stage Mentorship Journey
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground text-center mb-16 max-w-xl mx-auto">
            Click any stage to see what SIEAP provides at that point.
          </motion.p>

          {/* Desktop horizontal */}
          <div className="hidden md:flex items-start justify-between gap-2 mb-8">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeStage === s.id;
              return (
                <motion.button
                  key={s.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  onClick={() => setActiveStage(isActive ? null : s.id)}
                  className={`flex-1 glass rounded-xl p-5 text-center transition-all cursor-pointer ${isActive ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-primary/40"}`}
                >
                  <div className={`w-10 h-10 rounded-full mx-auto flex items-center justify-center mb-3 ${isActive ? "bg-primary text-black" : "bg-secondary"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="font-semibold text-sm">Stage {s.id}</p>
                  <p className="text-xs text-muted-foreground mt-1">{s.title}</p>
                </motion.button>
              );
            })}
          </div>

          {/* Mobile vertical */}
          <div className="md:hidden space-y-3">
            {stages.map((s, i) => {
              const Icon = s.icon;
              const isActive = activeStage === s.id;
              return (
                <motion.button
                  key={s.id}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  onClick={() => setActiveStage(isActive ? null : s.id)}
                  className={`w-full glass rounded-xl p-4 flex items-center gap-4 text-left transition-all ${isActive ? "ring-2 ring-primary" : ""}`}
                >
                  <div className={`w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center ${isActive ? "bg-primary text-black" : "bg-secondary"}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">Stage {s.id} — {s.title}</p>
                    <p className="text-xs text-muted-foreground">{s.tier}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Expanded detail */}
          {activeStage && (() => {
            const s = stages.find(x => x.id === activeStage)!;
            return (
              <motion.div
                key={activeStage}
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                className="glass rounded-xl p-8 mt-6"
              >
                <h3 className="text-xl font-bold mb-1">Stage {s.id} — {s.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">Dominant evaluation weight: {s.weight} · Subscription: {s.tier}</p>
                <ul className="space-y-2">
                  {s.provides.map(p => (
                    <li key={p} className="flex items-start gap-2 text-sm">
                      <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                {s.note && <p className="mt-4 text-xs text-primary font-medium">{s.note}</p>}
              </motion.div>
            );
          })()}
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-6xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-4">
            Choose Your Growth Path
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground text-center mb-12 max-w-xl mx-auto">
            Choose the tier that matches your stage.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-6">
            {pricingCards.map((card, i) => (
              <div key={card.tier} className="flex flex-col">
                <motion.div
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i}
                  className={`glass rounded-xl overflow-hidden flex flex-col flex-1 ${card.isPopular ? "ring-2 ring-primary" : ""}`}
                >
                  {/* Header bar */}
                  <div className={`${card.headerClass} px-6 py-4 flex items-center justify-between`}>
                    <span className="font-bold text-sm text-foreground">{card.tier}</span>
                    <span className="text-xs text-muted-foreground">{card.isPopular ? "" : card.label}</span>
                    {card.isPopular && <Badge className="bg-primary text-black text-xs">Most Popular</Badge>}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Price */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-primary">{card.price}</span>
                        <span className="text-muted-foreground text-sm">/month</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">{card.annual}/year (save 17%)</p>
                    </div>

                    <p className="text-sm font-medium text-foreground mb-4">{card.tagline}</p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-6 flex-1">
                      {card.features.map(f => (
                        <li key={f} className="flex items-start gap-2 text-sm">
                          <Check className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Bottom note */}
                    <p className="text-xs text-primary font-medium mb-4">{card.note}</p>

                    <p className="text-xs text-muted-foreground mb-4">Best for: {card.bestFor}</p>

                    <Button
                      className={`w-full ${card.isPopular ? "button-gradient text-black" : "bg-secondary hover:bg-secondary/80"}`}
                      size="lg"
                      onClick={() => window.location.href = "/apply"}
                    >
                      {card.cta}
                    </Button>
                  </div>
                </motion.div>
                {(card as any).footnote && (
                  <p className="text-xs text-gray-500 italic mt-3 text-left px-1">
                    {(card as any).footnote}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Footer notes */}
          <div className="mt-8 text-center space-y-4">
            <p className="text-xs text-muted-foreground italic">
              All tiers include: Startup dashboard · Ecosystem access · Service partner discounts · SIEAP community · Co-hosted webinars
            </p>
            <div className="glass rounded-xl p-6 max-w-2xl mx-auto border border-primary/30">
              <p className="text-sm text-foreground">
                The <span className="text-primary font-semibold">1% success fee</span> on funding received via SIEAP is non-negotiable and applies across all tiers. It aligns our incentives with your success — we only earn when you get funded.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Partners */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-4">
            Every SIEAP Startup Gets More Than Mentorship
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {servicePartners.map((sp, i) => {
              const Icon = sp.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{sp.title}</h3>
                  <p className="text-sm text-muted-foreground">{sp.desc}</p>
                  <Badge variant="secondary" className="text-xs">{sp.badge}</Badge>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Evaluation Advantage */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
            When You Reach Stage 5, Investors See Evidence — Not a Pitch Deck
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass rounded-xl p-8 mt-10 max-w-2xl mx-auto">
            <div className="flex justify-between text-xs text-muted-foreground mb-4">
              {["Financial", "Product", "Market", "ESG", "Team"].map(p => (
                <span key={p} className="text-center flex-1">{p}</span>
              ))}
            </div>
            <div className="flex justify-between gap-2 mb-6">
              {[30, 25, 20, 15, 10].map((max, i) => (
                <div key={i} className="flex-1 bg-secondary rounded-full h-3 overflow-hidden">
                  <div className="bg-primary h-full rounded-full" style={{ width: `${(([22, 20, 16, 10, 8][i]) / max) * 100}%` }} />
                </div>
              ))}
            </div>
            <p className="text-sm text-muted-foreground">
              Our 100-point scorecard with CA-verified financials means investors don't second-guess your numbers.
            </p>
            <a href="/evaluation" className="text-sm text-primary hover:underline mt-3 inline-block">
              See the full evaluation methodology →
            </a>
          </motion.div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            Startup FAQ
          </motion.h2>
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`q-${i}`} className="glass rounded-xl px-6 border-none">
                <AccordionTrigger className="text-sm font-medium hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="text-sm text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
            Ready to get evaluated? It takes 10 minutes.
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <Button size="lg" className="button-gradient text-black font-semibold mt-6" onClick={() => window.location.href = "/apply"}>
              Start Application <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
