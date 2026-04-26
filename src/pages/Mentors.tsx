import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" as const },
  }),
};

const stages = [
  {
    stage: "Pre-Idea",
    help: "Brainstorm validation; founder skills audit. 2 mentors brainstorm and refine the core premise.",
    expertise: "Industry veterans (ex-T-Hub)",
  },
  {
    stage: "Idea",
    help: "Business model canvas; competitor deep-dive. Panel critiques core assumptions before commitment.",
    expertise: "Business development specialists",
  },
  {
    stage: "MVP",
    help: "Roadmap and tech stack review; prototype feedback. Hands-on iteration with product leads.",
    expertise: "Tech and product leads",
  },
  {
    stage: "Early Traction",
    help: "GTM and sales funnel design; metrics pivot guidance. A/B test strategy and growth loops.",
    expertise: "Growth experts (NASSCOM network)",
  },
  {
    stage: "Investor Ready",
    help: "Valuation methodology and pitch refinement. Mock investor grilling by seasoned angels.",
    expertise: "Ex-IAN angel investors",
  },
  {
    stage: "Active Investment",
    help: "Scaling operations; compliance frameworks; exit planning. Ongoing board-level governance support.",
    expertise: "AIF and SEBI-registered experts",
  },
];

const mentors = [
  { name: "Mr. Rishi Bhattanagar",    area: "Entrepreneurship & Venture Building" },
  { name: "Mr. Jai Mansharamani",     area: "Finance & Investment Strategy" },
  { name: "Dr. Pradeep Srivastava",   area: "Technology Commercialisation Strategist · Industry–Government Liaison" },
  { name: "Dr. Anupam Srivastava",    area: "Head of AYUSH (GoI), Applied Medical Sciences expert" },
  { name: "Mr. Vivek Singh",          area: "UK Market & International Expansion" },
  { name: "Mr. Saumitra Sahay",       area: "Business Strategy & Ecosystem Development" },
  { name: "Mr. Hardik Somani",        area: "Government Relations & Policy" },
  { name: "Mr. Paritosh Singh",       area: "Operations, Scaling & Execution" },
  { name: "Mr. Aayug Verma",          area: "Legal Counsel" },
  { name: "Mr. Mayank Pratap",        area: "CA Counsel & Financial Compliance" },
  { name: "Mr. Hari S. Sharma",       area: "Biotechnology Expert · Europe Market & Global Expansion" },
  { name: "Mr. Nitesh Sahani",        area: "Technology & Product Development" },
  { name: "Mr. C. Manchanda",         area: "Intellectual Property Rights (IPR)" },
  { name: "Mr. Ashwin Srivastava",    area: "Co-Founder · Evaluation Framework & Operations" },
  { name: "Ms. Chaitra Malladad",     area: "Cybersecurity & Digital Infrastructure" },
  { name: "Mr. Kritarth",             area: "Platform Architecture & Engineering" },
  { name: "Dr. R.K Singh",            area: "Government of India · Holistic Valuation Expert" },
  { name: "Dr. Pradeep Mishra",       area: "Professor IIT · Technology Mentor" },
];

function initials(name: string) {
  return name
    .replace(/^(Mr\.|Dr\.|Mrs\.)\s*/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const avatarColors = [
  "from-primary/40 to-primary/10",
  "from-blue-500/40 to-blue-500/10",
  "from-purple-500/40 to-purple-500/10",
  "from-orange-500/40 to-orange-500/10",
  "from-pink-500/40 to-pink-500/10",
  "from-cyan-500/40 to-cyan-500/10",
  "from-yellow-500/40 to-yellow-500/10",
  "from-emerald-500/40 to-emerald-500/10",
];

export default function Mentors() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEOHead
        title="Mentor Panel | SIEAP — Expert Guidance at Every Stage"
        description="SIEAP's mentor panel comprises 16+ domain experts across legal, finance, technology, government, and international markets — guiding startups from Pre-Idea to Active Investment."
        canonical="https://sieapinvest.com/mentors"
      />
      <Navigation />

      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="container px-4 pt-32 pb-16 md:pt-44 md:pb-24 max-w-4xl mx-auto text-center">
        <motion.div
          initial="hidden" animate="visible" variants={fadeUp}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-8"
        >
          <Users className="w-4 h-4 text-primary" />
          <span className="text-sm text-primary font-medium">SIEAP Mentor Panel</span>
        </motion.div>
        <motion.h1
          initial="hidden" animate="visible" variants={fadeUp} custom={1}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Domain experts.<br />
          <span className="text-gradient">Every stage of your journey.</span>
        </motion.h1>
        <motion.p
          initial="hidden" animate="visible" variants={fadeUp} custom={2}
          className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          SIEAP's mentor panel is not a directory — it's an active, stage-matched advisory
          network. Each mentor is a practicing SME engaged at the specific stage where their
          expertise creates the most measurable impact for the startups they guide.
        </motion.p>
      </section>

      {/* ── Stage engagement table ─────────────────────────────── */}
      <section className="container px-4 pb-28 max-w-5xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          How mentors engage
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          className="text-muted-foreground mb-10 max-w-2xl"
        >
          Mentor panels are assigned based on a startup's current SIEAP stage. As the
          startup progresses, the panel composition evolves to match the new challenges.
        </motion.p>

        <div className="overflow-x-auto rounded-2xl border border-border">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/30">
                <th className="text-left px-6 py-4 font-semibold text-foreground w-36">Stage</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Panel Focus</th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">Mentor Expertise</th>
              </tr>
            </thead>
            <tbody>
              {stages.map((row, i) => (
                <motion.tr
                  key={row.stage}
                  initial="hidden" whileInView="visible" viewport={{ once: true }}
                  variants={fadeUp} custom={i}
                  className="border-b border-border/50 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-primary whitespace-nowrap">{row.stage}</td>
                  <td className="px-6 py-4 text-muted-foreground leading-relaxed">{row.help}</td>
                  <td className="px-6 py-4 text-muted-foreground italic">{row.expertise}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ── Mentor grid ───────────────────────────────────────── */}
      <section className="container px-4 pb-28 max-w-6xl mx-auto">
        <motion.h2
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="text-3xl md:text-4xl font-bold mb-3"
        >
          The panel
        </motion.h2>
        <motion.p
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} custom={1}
          className="text-muted-foreground mb-12 max-w-2xl"
        >
          Practitioners, not lecturers. Every mentor on the SIEAP panel is an active
          professional with a verifiable track record in their domain.
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {mentors.map((mentor, i) => (
            <motion.div
              key={mentor.name}
              initial="hidden" whileInView="visible" viewport={{ once: true }}
              variants={fadeUp} custom={i % 8}
              className="glass rounded-2xl p-6 space-y-4"
            >
              <div
                className={`w-12 h-12 rounded-full bg-gradient-to-br ${
                  avatarColors[i % avatarColors.length]
                } flex items-center justify-center`}
              >
                <span className="text-sm font-bold">{initials(mentor.name)}</span>
              </div>
              <div>
                <p className="font-semibold text-sm leading-snug">{mentor.name}</p>
                <p className="text-xs text-primary mt-1 leading-snug">{mentor.area}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="container px-4 pb-32 max-w-3xl mx-auto text-center">
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="glass rounded-2xl px-8 py-14 space-y-6"
        >
          <div className="w-14 h-14 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto">
            <Users className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            Join the SIEAP Mentor Panel
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto leading-relaxed">
            SIEAP selectively onboards domain experts who demonstrate a verifiable track
            record, active industry presence, and a commitment to structured, outcome-driven
            mentorship. If you are a practitioner with measurable expertise and an interest
            in shaping India's next generation of fundable startups, we invite you to express
            your interest.
          </p>
          <Link to="/apply">
            <Button size="lg" className="button-gradient gap-2">
              Express Interest <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
