import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Eye, BarChart2, Zap, Layers, Compass, Flag, Users, ArrowRight, TrendingUp, Shield } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const stats = [
  { value: "100", label: "Point Scorecard" },
  { value: "27",  label: "Sub-Parameters" },
  { value: "6",   label: "Startup Stages" },
  { value: "1%",  label: "Success Fee Only" },
];

const values = [
  {
    icon: Eye,
    title: "Transparency Over Narrative",
    body: "We publish our evaluation framework openly. SIEAP scores 35–45 on its own scorecard today. A system that inflates its creator's score is worthless. Ours doesn't.",
  },
  {
    icon: BarChart2,
    title: "Evidence Over Claims",
    body: "Every score is backed by linked evidence in the data room. CA-verified bank statements, MCA filings, GST cross-checks. You see the math, not a black box.",
  },
  {
    icon: Zap,
    title: "Aligned Incentives",
    body: "We charge 1% on closed deals — nothing before. Zero incentive to list weak startups. Our revenue grows only when founders succeed and investors deploy.",
  },
  {
    icon: Layers,
    title: "Expertise & Rigour",
    body: "Our evaluation team applies a 27-parameter, 5-pillar framework calibrated to each startup's stage. Experienced practitioner judgment, codified into structure.",
  },
  {
    icon: Compass,
    title: "Customised Guidance",
    body: "No two startups take the same path. We assign stage-appropriate mentors, tailor valuation methodology, and create personalised improvement plans — not templates.",
  },
  {
    icon: Flag,
    title: "India-First Depth",
    body: "SEBI, DPIIT, MCA, GST, RBI — our compliance architecture is built for the Indian regulatory context, not adapted from a Western template. India is not a market. It's a mission.",
  },
];

const team = [
  {
    initials: "IS",
    name: "Ishaan Srivastava",
    role: "Lead Founder · Strategy · Product · Investor Relations",
    bio: "Architect of the SIEAP evaluation framework and platform strategy. Leads valuation methodology, investor partnerships, and product roadmap. Built SIEAP from a conviction that India's founders deserve institutional-grade evaluation, not a listing page.",
    color: "from-primary/30 to-primary/10",
  },
  {
    initials: "AS",
    name: "Ashwin Srivastava",
    role: "Co-Founder · Operations · Evaluation Framework",
    bio: "Drives SIEAP's operational backbone and evaluation rigour. Oversees the CA-verification pipeline, mentor coordination, and quality assurance across all startup assessments. Ensures every score on the platform reflects ground-truth evidence.",
    color: "from-purple-500/30 to-purple-500/10",
  },
  {
    initials: "VS",
    name: "Vaibhav Singh",
    role: "Chief Growth Officer · Startup Pipeline · Incubator Network · E-Cells",
    bio: "Owns end-to-end startup acquisition and ecosystem partnerships. Activates SIEAP's college E-Cell network, incubator relationships, and Tier 2 city outreach. Brings measurable pipeline discipline and a 10% equity stake earned through conviction.",
    color: "from-blue-500/30 to-blue-500/10",
  },
  {
    initials: "KS",
    name: "Kritarth",
    role: "Platform Lead · Technology · CRM · Dashboard Architecture",
    bio: "Leads SIEAP's full-stack platform — startup portal, incubator portal, and investor dashboard. Owns the evaluation engine, RBAC architecture, and CI/CD pipeline. Builds systems that are sharp, transparent, and scale to 500+ concurrent users.",
    color: "from-orange-500/30 to-orange-500/10",
  },
];


export default function About() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="About SIEAP | India's Evaluation-First Investment Platform"
        description="SIEAP evaluates startups on a published 100-point scorecard, mentors them across six stages, and connects them with a pre-partnered investor pool. We earn 1% when deals close."
        canonical="https://sieapinvest.com/about"
      />
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="container px-4 pt-32 pb-16 md:pt-44 md:pb-24 max-w-4xl mx-auto">
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp}
          className="text-xs font-semibold tracking-widest text-muted-foreground uppercase mb-6"
        >
          About SIEAP
        </motion.p>
        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="text-4xl md:text-6xl font-bold leading-tight mb-8"
        >
          Built to make India's startup capital work harder —{" "}
          <span className="text-gradient">and more rigorously.</span>
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-lg text-muted-foreground max-w-2xl leading-relaxed"
        >
          SIEAP is India's evaluation-first investment platform. We evaluate startups on a published
          100-point scorecard, mentor them across six structured stages, and connect them with a
          pre-partnered investor pool. We earn 1% when deals close — nothing before.
        </motion.p>
      </section>

      {/* ── Stats ─────────────────────────────────────────────── */}
      <section className="container px-4 pb-24 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border rounded-2xl overflow-hidden">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
              className="bg-background px-8 py-10 text-center"
            >
              <p className="text-4xl md:text-5xl font-bold text-primary">{s.value}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-widest mt-2">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission ───────────────────────────────────────────── */}
      <section className="container px-4 pb-28 max-w-3xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-10"
        >
          Our Mission
        </motion.h2>
        <motion.blockquote
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          className="border-l-2 border-primary pl-6 mb-10"
        >
          <p className="text-xl md:text-2xl font-medium italic leading-snug text-foreground">
            "Every other platform waits for startups to be ready. SIEAP makes them ready — then funds them."
          </p>
        </motion.blockquote>
        <div className="space-y-5 text-muted-foreground leading-relaxed">
          {[
            "We exist to close the structural gap between early-stage Indian founders and the capital markets available to them. Most investment platforms operate as listing services — startups post a profile, investors browse, and both sides fend for themselves. SIEAP inverts this model entirely.",
            "We mentor startups from pre-idea through funded, conduct our own CA-verified valuation, and present investor-ready companies to a curated pool of pre-partnered angels and institutional investors on a transparent, stock-market-style dashboard. Our methodology is published openly. Our incentives are aligned with outcomes, not activity.",
            "On the other side of the table, investors gain structured access to pre-evaluated, CA-verified deal flow — without the 40–60 hours of manual due diligence that most angel investing demands. Every startup on the SIEAP dashboard has already been scored, staged, and vetted. Investors deploy faster, with confidence, into companies they can track in real time.",
          ].map((p, i) => (
            <motion.p
              key={i}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i + 2}
            >
              {p}
            </motion.p>
          ))}
        </div>
      </section>

      {/* ── Two sides ─────────────────────────────────────────── */}
      <section className="container px-4 pb-28 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="glass rounded-2xl p-8 space-y-4 border-l-2 border-primary"
          >
            <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h3 className="text-xl font-bold">For Startups</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We don't wait for you to be investor-ready. We build you there — through structured
              mentorship, quarterly re-evaluation, CA-verified financials, and a score that
              improves as you execute. When you hit Stage 5 Gold, you appear on the investor
              dashboard. Not before.
            </p>
          </motion.div>
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
            className="glass rounded-2xl p-8 space-y-4 border-l-2 border-blue-500"
          >
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Shield className="w-5 h-5 text-blue-400" />
            </div>
            <h3 className="text-xl font-bold">For Investors</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Every startup you see has passed a 100-point evaluation, a CA-verified financial
              review, and at least one structured mentor panel. You get a scored, staged, and
              continuously tracked deal flow — replacing 40–60 hours of diligence with a
              dashboard built for confident capital deployment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Values ────────────────────────────────────────────── */}
      <section className="container px-4 pb-28 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Our Values
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <motion.div
                key={v.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp} custom={i}
                className="glass rounded-2xl p-7 space-y-4"
              >
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold text-base">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.body}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* ── Team ──────────────────────────────────────────────── */}
      <section className="container px-4 pb-28 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-12"
        >
          Meet the Team
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {team.map((member, i) => (
            <motion.div
              key={member.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i}
              className="glass rounded-2xl p-7 space-y-5"
            >
              <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center`}>
                <span className="text-lg font-bold text-foreground">{member.initials}</span>
              </div>
              <div>
                <p className="font-semibold text-sm leading-snug">{member.name}</p>
                <p className="text-xs text-primary mt-1 uppercase tracking-wide">{member.role}</p>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{member.bio}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mentor Panel CTA ──────────────────────────────────── */}
      <section className="container px-4 pb-32 max-w-3xl mx-auto">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="glass rounded-2xl px-8 py-12 text-center space-y-5"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Meet the Mentor Panel</h2>
          <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
            16+ domain experts across legal, finance, technology, government relations, and
            international markets — each engaged at the stage where their expertise matters most.
          </p>
          <Link to="/mentors">
            <button className="inline-flex items-center gap-2 button-gradient px-6 py-3 text-sm font-semibold rounded-full mt-2">
              View Mentor Panel <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
