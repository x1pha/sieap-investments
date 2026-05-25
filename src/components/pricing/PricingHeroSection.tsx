import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";

// ─── Data ────────────────────────────────────────────────────────────────────

const stages = ["Idea", "Pre-Revenue", "Early Revenue", "Growth", "Scale"];
const stageRecommended = [0, 0, 1, 1, 2]; // 0=Basic, 1=Growth, 2=Premium, 3=Standalone

const startupTiers = [
  {
    id: "basic",
    name: "Basic",
    price: "₹999",
    period: "/mo",
    tagline: "Core platform access for early-stage founders",
    features: [
      "Platform registration & startup dashboard",
      "Community & webinar access",
      "Ecosystem access",
      "Service partner discounts",
      "Co-hosted webinar participation",
    ],
    cta: "Get Started",
    href: "/apply",
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹3,499",
    period: "/mo",
    tagline: "Mentorship + Pitch Review for scaling startups",
    features: [
      "Everything in Basic",
      "Core mentorship content library",
      "1:1 mentor sessions (2× / month)",
      "Pitch deck review & refinement",
      "Basic SIEAP valuation report",
      "Growth strategy support",
      "Competitive analysis & positioning",
    ],
    cta: "Get Started",
    href: "/apply",
  },
  {
    id: "premium",
    name: "Premium",
    price: "₹8,999",
    period: "/mo",
    tagline: "Full service + investor matching",
    features: [
      "Everything in Growth",
      "Priority investor matching",
      "Full 3-method valuation + CA sign-off*",
      "Dedicated mentor assigned",
      "Data room preparation",
      "Investor readiness sign-off",
      "4× monthly 1:1 mentor sessions",
    ],
    cta: "Get Started",
    href: "/apply",
  },
  {
    id: "standalone",
    name: "Standalone",
    price: "₹15,000+",
    period: " one-time",
    tagline: "Single valuation report, no subscription",
    features: [
      "Full 100-point scorecard",
      "5-pillar scored breakdown",
      "CA-verified financial review",
      "Business growth pointers per pillar",
      "Valuation range (Low / Mid / High)",
      "Shareable PDF report",
    ],
    cta: "Request Report",
    href: "/apply",
  },
];

const incubatorTiers = [
  {
    id: "scout",
    name: "Scout Incubator",
    price: "₹24,999",
    period: "/mo",
    tagline: "Essential portfolio tracking for growing incubators",
    features: [
      "Portfolio management for up to 50 startups",
      "Wealth generation analytics & performance monitoring",
      "Basic mentor coordination and communication tools",
      "Batch/cohort organisation and tracking",
      "Standard reporting and analytics",
      "Email support",
      "Basic startup onboarding tools",
    ],
    cta: "Get Started",
    href: "/apply",
  },
  {
    id: "accelerate",
    name: "Accelerate Incubator",
    price: "₹64,999",
    period: "/mo",
    tagline: "Complete incubator management platform",
    features: [
      "Everything in Scout PLUS:",
      "Unlimited portfolio capacity",
      "Demo Day Hosting Platform",
      "White-label options: custom branding & domain",
      "Premium advisory network: expert mentor marketplace",
      "Investor relations: dedicated investor network access",
      "Advanced analytics and reporting",
      "Priority support with dedicated account manager",
      "Custom integrations and API access",
    ],
    cta: "Get Started",
    href: "/apply",
    popular: true,
  },
];

const investorTiers = [
  {
    id: "solo",
    name: "Solo Investor",
    price: "₹14,999",
    period: "/mo",
    tagline: "Perfect for individual angel investors",
    features: [
      "Deal flow access to 500+ startups",
      "Basic analytics and communication tools",
      "Simple investment tracking",
      "MarketView dashboard access",
      "20 startup connections / month",
    ],
    cta: "Get Started",
    href: "/apply",
  },
  {
    id: "managed",
    name: "Managed Investor",
    price: "₹39,999",
    period: "/mo",
    tagline: "Premium solution with professional services",
    features: [
      "Everything in Solo PLUS:",
      "CA Financial Services: 4 hrs/month tax advisory",
      "Compliance support: legal consultation & due diligence",
      "Portfolio management: advanced analytics & risk assessment",
      "Unlimited connections & API access",
      "Dedicated advisor",
    ],
    cta: "Get Started",
    href: "/apply",
    popular: true,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" as const },
  }),
};

interface Tier {
  id: string;
  name: string;
  price: string;
  period: string;
  tagline: string;
  features: string[];
  cta: string;
  href: string;
  popular?: boolean;
}

function PricingCard({
  tier,
  recommended,
  index,
}: {
  tier: Tier;
  recommended: boolean;
  index: number;
}) {
  const highlight = recommended || tier.popular;

  return (
    <motion.div
      key={tier.id}
      layout
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      custom={index}
      className="relative flex flex-col h-full"
    >
      {highlight && (
        <div className="absolute inset-0 rounded-2xl bg-primary/10 border border-primary/40 pointer-events-none" />
      )}

      <div
        className={`relative flex flex-col h-full rounded-2xl p-7 border transition-colors duration-300 ${
          highlight ? "bg-white/5 border-primary/30" : "glass border-white/10"
        }`}
      >
        {/* Name + badges */}
        <div className="flex items-start justify-between gap-2 mb-5">
          <span className="text-sm font-medium text-gray-300">{tier.name}</span>
          <div className="flex gap-2">
            {recommended && (
              <Badge className="bg-primary/20 text-primary border border-primary/30 text-[10px] font-semibold tracking-wide">
                Recommended
              </Badge>
            )}
            {tier.popular && !recommended && (
              <Badge className="bg-white/10 text-gray-300 border border-white/10 text-[10px] font-semibold tracking-wide">
                Popular
              </Badge>
            )}
          </div>
        </div>

        {/* Price */}
        <div className="mb-1">
          <span className="text-4xl font-bold text-foreground">{tier.price}</span>
          <span className="text-sm text-gray-400 ml-1">{tier.period}</span>
        </div>
        <p className="text-sm text-gray-400 mb-6">{tier.tagline}</p>

        <hr className="border-white/10 mb-6" />

        {/* Features */}
        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className="text-sm text-gray-300">{f}</span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to={tier.href}>
          <Button
            className={`w-full ${
              highlight
                ? "button-gradient"
                : "bg-white/10 hover:bg-white/20 text-gray-200 border border-white/10"
            }`}
          >
            {tier.cta}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

type Tab = "startup" | "incubator" | "investor";

export function PricingHeroSection() {
  const [tab, setTab] = useState<Tab>("startup");
  const [stageIndex, setStageIndex] = useState(1);

  const recommendedIndex = stageRecommended[stageIndex];

  const tiersMap: Record<Tab, Tier[]> = {
    startup: startupTiers,
    incubator: incubatorTiers,
    investor: investorTiers,
  };

  const tiers = tiersMap[tab];

  return (
    <section className="container px-4 py-16 md:py-24">
      {/* 3-tab toggle */}
      <div className="flex justify-center mb-10">
        <Tabs value={tab} onValueChange={(v) => setTab(v as Tab)}>
          <TabsList className="bg-white/10 border border-white/10 rounded-full px-1 py-1 h-auto gap-1">
            <TabsTrigger
              value="startup"
              className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-semibold text-gray-400 transition-all"
            >
              Startup Plans
            </TabsTrigger>
            <TabsTrigger
              value="incubator"
              className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-semibold text-gray-400 transition-all"
            >
              Incubator
            </TabsTrigger>
            <TabsTrigger
              value="investor"
              className="rounded-full px-5 py-2 text-sm data-[state=active]:bg-white data-[state=active]:text-black data-[state=active]:font-semibold text-gray-400 transition-all"
            >
              Investor
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Stage slider — only for Startup tab */}
      <AnimatePresence>
        {tab === "startup" && (
          <motion.div
            key="slider"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-2xl mx-auto mb-12 overflow-hidden"
          >
            <div className="px-2">
              <Slider
                min={0}
                max={4}
                step={1}
                value={[stageIndex]}
                onValueChange={([v]) => setStageIndex(v)}
                className="mb-3"
              />
              <div className="flex justify-between">
                {stages.map((s, i) => (
                  <button
                    key={s}
                    onClick={() => setStageIndex(i)}
                    className={`text-xs transition-colors ${
                      i === stageIndex
                        ? "text-primary font-semibold"
                        : "text-gray-500 hover:text-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <p className="text-center text-sm text-gray-400 mt-5">
              At the{" "}
              <span className="text-foreground font-medium">{stages[stageIndex]}</span>{" "}
              stage — we recommend{" "}
              <span className="text-primary font-semibold">
                {startupTiers[recommendedIndex].name}
              </span>
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cards grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className={`grid grid-cols-1 gap-5 mx-auto ${
            tab === "startup"
              ? "sm:grid-cols-2 lg:grid-cols-4 max-w-7xl"
              : "sm:grid-cols-2 max-w-4xl"
          }`}
        >
          {tiers.map((tier, i) => (
            <PricingCard
              key={tier.id}
              tier={tier}
              recommended={tab === "startup" && i === recommendedIndex}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Footnotes */}
      {tab === "startup" && (
        <p className="text-center text-xs text-gray-600 italic mt-8 max-w-2xl mx-auto">
          *CA sign-off included in Premium. Registered Valuer charges may be additional depending on complexity. A 1% success fee applies on all funding secured via SIEAP.
        </p>
      )}
    </section>
  );
}
