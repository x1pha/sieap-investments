import { motion } from "framer-motion";
import { LayoutDashboard, Users, TrendingUp, Banknote, Video, BarChart2, ChevronRight, GraduationCap, Megaphone, Rocket, ShieldCheck, Target, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.1, duration: 0.5 } }),
};

const partnerFeatures = [
  { icon: LayoutDashboard, title: "Full Startup Visibility", desc: "See every referred startup's SIEAP performance, scores, and progress in one dashboard." },
  { icon: Users, title: "Mentor Pool Access", desc: "Your startups access SIEAP's complete mentor pool — same quality as direct SIEAP applicants." },
  { icon: TrendingUp, title: "Stage Progression Tracking", desc: "Track each startup through SIEAP's 6 stages: Pre-Idea → Idea → MVP → Traction → Investor Ready → Funded." },
  { icon: Banknote, title: "Investment Status Updates", desc: "See when your startups receive investor interest, term sheets, and closed funding." },
  { icon: Video, title: "Co-Hosted Programs", desc: "Joint webinars, demo days, and mentorship sessions branded with your incubator + SIEAP." },
  { icon: BarChart2, title: "Reporting & Analytics", desc: "Downloadable reports for your incubator's own use — board presentations, impact reports, government submissions." },
];

const chapterSteps = [
  { icon: GraduationCap, title: "E-Cell Partnership", desc: "Official SIEAP Chapter established in the college with E-Cell leadership." },
  { icon: Megaphone, title: "Brand Ambassadors", desc: "Student ambassadors recruited and incentivised per successful startup registration." },
  { icon: Rocket, title: "Pipeline", desc: "College startups enter SIEAP's mentorship track. Best ones progress to investor dashboard." },
];

const partnershipAdds = [
  { icon: ShieldCheck, title: "Standardised Evaluation", desc: "100-point scorecard applied consistently to every referred startup." },
  { icon: Target, title: "Professional Valuation", desc: "Three-method blend (Revenue Multiple, Comparable Transactions, Scorecard) with CA sign-off." },
  { icon: Scale, title: "Direct Investor Access", desc: "Pre-partnered investor pool. 1% transaction model. No middlemen." },
];

const portalRows = [
  { name: "NovaPay", sector: "Fintech", stage: "Stage 4", score: "62 (Silver)", status: "In Evaluation" },
  { name: "CropSense", sector: "AgriTech", stage: "Stage 5", score: "78 (Gold)", status: "Investor Interest" },
  { name: "EduBridge", sector: "EdTech", stage: "Stage 3", score: "48 (Bronze)", status: "In Mentorship" },
];

const faqs = [
  { q: "What does the incubator portal include?", a: "Full visibility of all referred startups, access to SIEAP's mentor pool, per-startup dashboards, stage tracking, investment status, and downloadable reports for your own use." },
  { q: "How is SIEAP different from existing incubator programs?", a: "We don't replace incubators — we extend them. We add standardised evaluation (100-point scorecard), professional valuation (3-method with CA), and direct investor access (pre-partnered pool, 1% model)." },
  { q: "What does the portal cost?", a: "Incubator portal access is available via a flat monthly or per-startup licence fee. Contact us for partnership pricing tailored to your portfolio size." },
  { q: "Can our startups also apply directly to SIEAP?", a: "Yes. Referred startups get the same evaluation as direct applicants. The incubator portal gives you visibility of their progress — it doesn't limit their access." },
];

export default function ForIncubators() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-24 md:pb-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
            Extend Your Incubator.{" "}
            <span className="text-primary">Don't Replace It.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.6 }} className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Partner with SIEAP for standardised evaluation, professional valuation, and direct investor access — through a dedicated digital portal.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.6 }}>
            <Button size="lg" className="button-gradient text-black font-semibold mt-10" onClick={() => window.location.href = "/apply"}>
              Become a Partner <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Portal Mockup */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-4">
            Your Startups. Your Dashboard. Full Visibility.
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="glass rounded-xl overflow-hidden mt-12">
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <span className="text-sm font-medium">[Partner Incubator Name] — SIEAP Partner Portal</span>
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/60" />
                <div className="w-3 h-3 rounded-full bg-primary/60" />
              </div>
            </div>
            <div className="p-6 md:p-8">
              {/* Summary Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[["12", "Referred Startups"], ["3", "At Stage 5"], ["1", "Funded"], ["₹45L", "Pipeline"]].map(([val, label]) => (
                  <div key={label} className="bg-secondary/50 rounded-lg p-4 text-center">
                    <p className="text-2xl font-bold text-primary">{val}</p>
                    <p className="text-xs text-muted-foreground mt-1">{label}</p>
                  </div>
                ))}
              </div>

              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="p-3 text-left font-medium text-muted-foreground">Name</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Sector</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Stage</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">SIEAP Score</th>
                      <th className="p-3 text-left font-medium text-muted-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {portalRows.map((r, i) => (
                      <tr key={i} className="border-b border-border/50">
                        <td className="p-3 font-medium">{r.name}</td>
                        <td className="p-3 text-muted-foreground">{r.sector}</td>
                        <td className="p-3 text-muted-foreground">{r.stage}</td>
                        <td className="p-3"><Badge variant="secondary" className="text-xs">{r.score}</Badge></td>
                        <td className="p-3"><Badge variant="outline" className="text-xs">{r.status}</Badge></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What Partners Get */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-5xl mx-auto">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Incubator Partners Get
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerFeatures.map((f, i) => {
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

      {/* SIEAP Chapters */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
            From Campus to Capital — SIEAP Chapters
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground max-w-2xl mx-auto mb-12">
            We partner with college Entrepreneurship Cells to create official SIEAP Chapters. Student startups get the same structured evaluation and investor access as any startup on the platform.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {chapterSteps.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{s.title}</h3>
                  <p className="text-sm text-muted-foreground">{s.desc}</p>
                </motion.div>
              );
            })}
          </div>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={3} className="text-xs text-muted-foreground mt-8">
            Target: IITs, NITs, BITS, IIMs, and top private universities — Tier 1 and Tier 2 cities across India.
          </motion.p>
        </div>
      </section>

      {/* Partnership Model */}
      <section className="py-24 md:py-32">
        <div className="container px-4 max-w-4xl mx-auto text-center">
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-4">
            The Last Mile — From Incubation to Investable
          </motion.h2>
          <motion.p initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="text-muted-foreground mb-12">
            Incubators build startups. SIEAP makes them investable.
          </motion.p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {partnershipAdds.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div key={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={i} className="glass rounded-xl p-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
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
            Incubator FAQ
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
          <motion.h2 initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={0} className="text-3xl md:text-4xl font-bold mb-6">
            Partner with SIEAP.
          </motion.h2>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1} className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="button-gradient text-black font-semibold" onClick={() => window.location.href = "/apply"}>
              Apply as Incubator Partner <ChevronRight className="ml-1 w-4 h-4" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => window.location.href = "/apply"}>
              Schedule a Call
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
