import { motion } from "framer-motion";
import { FileSearch, BarChart3, Activity, RefreshCw, ShieldCheck, Percent, ChevronRight, Handshake, Send, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const features = [
  { icon: FileSearch, title: "Full Evaluation Reports", desc: "Downloadable PDF with complete 100-point scorecard, evidence links, and CA verification for every listed startup." },
  { icon: BarChart3, title: "Standardised Comparison", desc: "Every startup scored on the same 100-point scale. Compare a healthtech in Bangalore against a fintech in Pune on identical criteria." },
  { icon: Activity, title: "Monthly KPI Monitoring", desc: "Revenue, growth, burn, runway updated monthly. See traction or decline in real time, not from a 6-month-old pitch deck." },
  { icon: RefreshCw, title: "Quarterly Re-Evaluation", desc: "Scores update quarterly or on material events (funding round, pivot, co-founder exit). Scores go up or down." },
  { icon: ShieldCheck, title: "7-Layer Fraud Protection", desc: "7 automatic red flags. Falsified data = permanent ban. CA-verified financials. Zero tolerance." },
  { icon: Percent, title: "1% Aligned Fee", desc: "We charge 1% on completed investments only. No listing fees. No subscription. No management fees. We earn when you earn." },
];

const comparison = [
  { label: "Due Diligence", direct: "40-60 hrs per startup, your time", other: "Self-reported, minimal verification", sieap: "19-29 days structured evaluation, CA-verified" },
  { label: "Data Quality", direct: "Self-reported by founders", other: "Self-reported, some curation", sieap: "Evidence-backed, linked to data room" },
  { label: "Comparison", direct: "Apples to oranges", other: "Basic profiles, no standard", sieap: "100-point standardised scorecard" },
  { label: "Pricing", direct: "Free / informal", other: "Listing fees / subscriptions", sieap: "1% on completed deals only" },
  { label: "Monitoring", direct: "None", other: "Annual updates", sieap: "Monthly KPIs, quarterly re-evaluation" },
  { label: "Fraud Protection", direct: "Due to your diligence", other: "Platform TOS", sieap: "7 automatic red flags, permanent bans" },
];

const steps = [
  { icon: Handshake, title: "SIEAP Partnership", desc: "You partner with SIEAP. We understand your thesis, preferred sectors, cheque size, and stage preference." },
  { icon: Send, title: "Matched Deal Flow", desc: "We send you startups that match your criteria — pre-evaluated, pre-valued, with full reports." },
  { icon: CreditCard, title: "Invest via Platform", desc: "You invest directly through SIEAP. We handle documentation. 1% fee on completion." },
];

const faqs = [
  { q: "Why invest through SIEAP instead of directly?", a: "Pre-vetted deal flow (19–29 days evaluation), standardised comparison (100-point scale), ongoing monthly KPI monitoring, and aligned incentives (1% on closed deals only). Due diligence per startup saves you 40-60 hours." },
  { q: "What's the 1% fee?", a: "Covers: full evaluation, CA-verified due diligence, SIEAP Valuation Report, ongoing monthly KPI monitoring, quarterly re-evaluations. We earn only when deals close." },
  { q: "What protections exist against fraud?", a: "7 automatic red flags: falsified financial data or criminal record = permanent rejection. Undisclosed disputes = mandatory pause. 2+ critical document failures = permanent rejection." },
  { q: "Is SIEAP SEBI-compliant?", a: "Pursuing compliance: SEBI IA consultation Q1 2026, DPIIT registration in progress, SEBI AIF Cat I target Q4 2026. We comply with MCA, GST, IT Act, DPDP Act 2023." },
  { q: "How is SIEAP different from AngelList or LetsVenture?", a: "Most are listing-first. SIEAP is evaluation-first. 19–29 day evaluation before listing. 100-point standardised scoring. End-to-end mentorship. 1% on closed deals, not listing fees." },
  { q: "What happens if SIEAP shuts down?", a: "All investment agreements are between investor and startup directly. SIEAP does not hold funds or equity. Your investments don't depend on our continuity." },
];

const radarPillars = [
  { name: "Financial", score: 22, max: 30 },
  { name: "Product", score: 20, max: 25 },
  { name: "Market", score: 16, max: 20 },
  { name: "ESG", score: 10, max: 15 },
  { name: "Team", score: 8, max: 10 },
];

export default function ForInvestors() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pb-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Pre-Vetted. Pre-Valued.{" "}
            <span className="text-primary">Pre-Verified.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Every startup on SIEAP has completed 19–29 days of structured evaluation with CA-verified financials. 27 parameters. 5 pillars. No self-reported data.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <Button size="lg" className="button-gradient text-black font-semibold mt-10" onClick={() => window.location.href = "/apply"}>
              Request Investor Access <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Dashboard Mockup */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            The Investor Dashboard
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass rounded-xl overflow-hidden">
            {/* Title bar */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium">SIEAP Investor Dashboard — Live Listings</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
            </div>
            {/* Card */}
            <div className="p-6 md:p-8 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="font-bold text-lg">HealthPulse AI</h3>
                <Badge variant="secondary" className="text-xs">Healthtech SaaS</Badge>
                <Badge className="text-xs bg-primary text-black">Stage 5 — Investor Ready</Badge>
              </div>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="glass rounded-lg px-4 py-2 text-center">
                  <p className="text-2xl font-bold text-primary">76<span className="text-sm text-muted-foreground">/100</span></p>
                  <p className="text-xs text-muted-foreground">SIEAP Score</p>
                </div>
                <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">GOLD</Badge>
                <Badge className="bg-primary/20 text-primary border-primary/30">BUY</Badge>
              </div>

              {/* KPI Grid */}
              <div className="grid grid-cols-3 md:grid-cols-3 gap-3">
                {[
                  ["MRR", "₹12L"], ["ARR", "₹1.44Cr"], ["Growth", "12% MoM"],
                  ["Burn", "₹4.5L/mo"], ["Runway", "8 months"], ["LTV:CAC", "2.5:1"],
                  ["DAU", "500+"], ["Churn", "3.2%"], ["NPS", "42"],
                ].map(([label, val]) => (
                  <div key={label} className="bg-secondary/50 rounded-lg p-3 text-center">
                    <p className="text-xs text-muted-foreground">{label}</p>
                    <p className="font-semibold text-sm">{val}</p>
                  </div>
                ))}
              </div>

              {/* Valuation */}
              <div className="flex flex-wrap gap-4">
                {[["Low", "₹2.1Cr"], ["Mid", "₹2.8Cr"], ["High", "₹3.4Cr"]].map(([l, v]) => (
                  <div key={l} className="glass rounded-lg px-5 py-3 text-center flex-1 min-w-[100px]">
                    <p className="text-xs text-muted-foreground">{l}</p>
                    <p className="font-bold text-primary">{v}</p>
                  </div>
                ))}
              </div>

              {/* Radar bars */}
              <div className="space-y-2">
                {radarPillars.map(p => (
                  <div key={p.name} className="flex items-center gap-3 text-xs">
                    <span className="w-16 text-muted-foreground">{p.name}</span>
                    <div className="flex-1 bg-secondary rounded-full h-2 overflow-hidden">
                      <div className="bg-primary h-full rounded-full" style={{ width: `${(p.score / p.max) * 100}%` }} />
                    </div>
                    <span className="text-muted-foreground w-12 text-right">{p.score}/{p.max}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <Button size="sm" variant="outline">View Full Report</Button>
                <Button size="sm" className="button-gradient text-black">Express Interest</Button>
              </div>
            </div>
            <div className="px-6 pb-4">
              <p className="text-xs text-muted-foreground">Data updates monthly (automatically via Razorpay/Stripe integration where connected). Quarterly re-evaluation with updated scores.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What You Get */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            What You Get as an Investor
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-xl p-6 space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            How SIEAP Is Different
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="p-4 text-left font-medium text-muted-foreground" />
                    <th className="p-4 text-center font-medium text-muted-foreground">Direct Deals</th>
                    <th className="p-4 text-center font-medium text-muted-foreground">Other Platforms</th>
                    <th className="p-4 text-center font-semibold text-primary">SIEAP</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((r, i) => (
                    <tr key={i} className="border-b border-border/50">
                      <td className="p-4 font-medium">{r.label}</td>
                      <td className="p-4 text-center text-muted-foreground text-xs">{r.direct}</td>
                      <td className="p-4 text-center text-muted-foreground text-xs">{r.other}</td>
                      <td className="p-4 text-center text-xs font-medium bg-primary/5">{r.sieap}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Investor Pool */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
            Pre-Partnered. Not Public.
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground max-w-xl mx-auto mb-12">
            SIEAP's investor pool is curated and pre-partnered. You're not browsing a public listing — you're accessing a private evaluation ecosystem.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <p className="text-xs text-primary font-medium">Step {i + 1}</p>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-3xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            Investor FAQ
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

      {/* CTA */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-3xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
            See the evidence before you invest.
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}>
            <Button size="lg" className="button-gradient text-black font-semibold mt-6" onClick={() => window.location.href = "/apply"}>
              Request Access <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
