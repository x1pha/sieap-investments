import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Users, TrendingUp, Database, BookOpen, Brain, Scale } from "lucide-react";

const features = [
  {
    icon: BarChart3,
    badge: "Core",
    title: "100-Point Evaluation Scorecard",
    description:
      "27 parameters across 5 pillars — Financials, Team, Product, Market, and Governance. Stage-calibrated weights applied to every startup, CA-verified at each step.",
  },
  {
    icon: Brain,
    badge: "Intelligence",
    title: "AI-Powered Matching Engine",
    description:
      "Proprietary algorithm connects evaluated startups with pre-qualified investors aligned by sector, stage, and investment thesis — not just raw deal flow.",
  },
  {
    icon: ShieldCheck,
    badge: "Trust",
    title: "Investor-Grade Due Diligence",
    description:
      "CA sign-off on financials, MCA cross-checks, GST verification, and DPIIT compliance built into every startup report before it reaches an investor.",
  },
  {
    icon: TrendingUp,
    badge: "Active",
    title: "Quarterly Score Updates",
    description:
      "Startup scores re-evaluated every quarter. Dedicated mentors actively work to improve the inputs that drive your score — not a one-time snapshot.",
  },
  {
    icon: Database,
    badge: "Platform",
    title: "Structured Data Room",
    description:
      "Centralised, investor-ready data room with version-controlled documents, financial models, compliance artefacts, and a shareable audit trail.",
  },
  {
    icon: Users,
    badge: "Advisory",
    title: "Mentor & Expert Network",
    description:
      "1:1 mentor sessions, pitch reviews, growth strategy support, and domain-expert introductions — an ongoing engagement, not a one-off consultation.",
  },
  {
    icon: Scale,
    badge: "Compliance",
    title: "India-First Regulatory Architecture",
    description:
      "Built for SEBI, DPIIT, MCA, GST, and RBI requirements from the ground up — not adapted from a Western template. Compliance is structural, not bolt-on.",
  },
  {
    icon: BookOpen,
    badge: "Ecosystem",
    title: "Multi-Stakeholder Access",
    description:
      "Startups, investors, and incubators on one unified platform. Shared infrastructure for deal flow, cohort management, demo days, and portfolio tracking.",
  },
];

const badgeColors: Record<string, string> = {
  Core:         "bg-primary/10 text-primary",
  Intelligence: "bg-blue-500/10 text-blue-400",
  Trust:        "bg-emerald-500/10 text-emerald-400",
  Active:       "bg-yellow-500/10 text-yellow-400",
  Platform:     "bg-purple-500/10 text-purple-400",
  Advisory:     "bg-orange-500/10 text-orange-400",
  Compliance:   "bg-pink-500/10 text-pink-400",
  Ecosystem:    "bg-cyan-500/10 text-cyan-400",
};

export const FeaturesSection = () => {
  return (
    <section className="container px-4 py-24">
      <div className="max-w-2xl mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6 tracking-tight"
        >
          Platform Features
          <br />
          <span className="text-gradient font-medium">&amp; Intelligence</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg md:text-xl text-gray-400"
        >
          Evaluation-first infrastructure for India's startup ecosystem — built
          on structure, transparency, and aligned incentives.
        </motion.p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -6, transition: { type: "spring", stiffness: 300, damping: 20 } }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.06 }}
              className="group glass shimmer-hover rounded-2xl p-6 flex flex-col gap-4 border border-white/5 hover:border-primary/25 cursor-default"
              style={{ transition: "border-color 0.3s, box-shadow 0.3s" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(201,168,76,0.12)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:bg-primary/15">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <span
                  className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${badgeColors[feature.badge]}`}
                >
                  {feature.badge}
                </span>
              </div>
              <h3 className="text-base font-semibold text-foreground leading-snug group-hover:text-primary transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed flex-1">
                {feature.description}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
};
