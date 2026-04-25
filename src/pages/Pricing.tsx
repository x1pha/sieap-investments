import { motion } from "framer-motion";
import { Clock, TrendingUp, Users, Percent, Check } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BusinessPricingSection } from "@/components/pricing/BusinessPricingSection";
import { IncubatorPricingSection } from "@/components/pricing/IncubatorPricingSection";
import { InvestorPricingSection } from "@/components/pricing/InvestorPricingSection";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" as const },
  }),
};

const monthlyCards = [
  {
    icon: Clock,
    title: "Evaluation Takes Time",
    body:
      "Moving a startup from Bronze to Gold requires structural improvements in financials, product, and governance. That journey takes months — not a single session. Our team works with you across each stage.",
  },
  {
    icon: TrendingUp,
    title: "Your Score Updates Quarterly",
    body:
      "Every startup on SIEAP is re-evaluated quarterly. Your subscription means our team actively monitors, tracks, and works to improve the inputs that drive your score upward — not just evaluate you once and move on.",
  },
  {
    icon: Users,
    title: "Mentorship is Ongoing",
    body:
      "1:1 mentor sessions, pitch reviews, strategy support, and growth guidance are not deliverables — they're an ongoing relationship. A one-time fee would cover a single engagement. A subscription covers the journey.",
  },
  {
    icon: Percent,
    title: "We Win When You Win",
    body:
      "Our 1% fee on funding is our primary revenue. Monthly subscriptions cover mentorship costs — not profits. The longer you stay on the platform, the better your score, and the closer you are to our investor dashboard.",
  },
];

const standaloneLeft = [
  "Full 100-point evaluation scorecard",
  "5-pillar scored breakdown",
  "Stage-calibrated weights applied",
  "CA-verified financial review",
];

const standaloneRight = [
  "Business growth pointers per pillar",
  "Valuation range (Low / Mid / High)",
  "SIEAP Recommendation",
  "Shareable PDF report",
];

const faqs = [
  {
    q: "What's included in the monthly subscription?",
    a: "Every plan includes ongoing mentorship, quarterly re-evaluation, and progressive score improvement. Growth and Premium tiers add deeper valuation, investor visibility, and dedicated mentor sessions. All plans include the non-negotiable 1% success fee on funding received via SIEAP.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Subscriptions are month-to-month. Cancel anytime — your dashboard listing pauses at the end of the billing cycle.",
  },
  {
    q: "When does the 1% success fee apply?",
    a: "Only when you secure funding through investors connected via the SIEAP platform. No funding, no fee.",
  },
  {
    q: "Is there a one-time option instead of monthly subscription?",
    a: "Yes. The SIEAP Standalone Valuation Report is a one-time engagement priced at ₹15,000–₹25,000 depending on stage and complexity. It includes the full 100-point scorecard, CA-verified financials, business growth pointers, and valuation range (Low/Mid/High). However, standalone reports do not include ongoing mentorship, quarterly re-evaluation, or investor dashboard listing. To appear on the investor dashboard, a Growth or Premium subscription is required — because your score needs to reach Stage 5 Gold+ (70/100) and that requires active, sustained improvement over time.",
  },
];

const Pricing = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navigation />

      {/* Hero */}
      <section className="container px-4 pt-32 pb-12 md:pt-40 md:pb-16">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl md:text-6xl font-normal mb-6">
            Pricing Built for Every{" "}
            <span className="text-gradient font-medium">Stage of Your Journey</span>
          </h1>
          <p className="text-lg text-gray-400">
            Transparent plans for startups, investors, and incubators. Subscribe to
            grow your SIEAP score over time — or get a one-time standalone valuation
            report. You choose the engagement that fits.
          </p>
        </motion.div>

        {/* Anchor nav */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          custom={1}
          className="flex flex-wrap justify-center gap-3 mt-10"
        >
          <a
            href="#startup-plans"
            className="bg-white/10 hover:bg-white/20 text-gray-300 text-sm px-4 py-2 rounded-full transition-all"
          >
            Startup Plans
          </a>
          <a
            href="#standalone-report"
            className="bg-white/10 hover:bg-white/20 text-gray-300 text-sm px-4 py-2 rounded-full transition-all"
          >
            Standalone Report
          </a>
          <a
            href="#other-pricing"
            className="bg-white/10 hover:bg-white/20 text-gray-300 text-sm px-4 py-2 rounded-full transition-all"
          >
            Incubator & Investor
          </a>
        </motion.div>
      </section>

      {/* Startup tier cards */}
      <section id="startup-plans" className="scroll-mt-24">
        <BusinessPricingSection />
      </section>

      {/* Why Monthly explainer */}
      <section className="container px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-6">
            Why Monthly?{" "}
            <span className="text-gradient font-medium">
              Because Valuation Isn't a One-Time Event.
            </span>
          </h2>
          <p className="text-lg text-gray-400">
            Startup valuation is not a document — it's a moving number. A startup's
            score on SIEAP changes every quarter as financials, team, product, and
            market evolve. Monthly engagement is how we actively work to improve it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {monthlyCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                custom={i}
                className="glass rounded-2xl p-8 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-xl font-medium text-foreground">{card.title}</h3>
                <p className="text-gray-400 leading-relaxed">{card.body}</p>
              </motion.div>
            );
          })}
        </div>

        <p className="text-sm text-gray-400 italic text-center mt-10">
          One-time engagement option available for standalone valuation reports. See below.
        </p>
      </section>

      {/* Standalone Valuation Report */}
      <section id="standalone-report" className="container px-4 py-24 md:py-32 scroll-mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-6">
            Just Need a Valuation?{" "}
            <span className="text-gradient font-medium">We Have That Too.</span>
          </h2>
          <p className="text-lg text-gray-400">
            Not ready to subscribe? Get a standalone SIEAP Valuation Report for your
            startup — with business growth pointers and CA sign-off.
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          custom={1}
          className="glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto"
        >
          <span className="inline-block bg-white/10 text-gray-300 text-xs font-medium tracking-wider rounded-full px-3 py-1 mb-6">
            STANDALONE
          </span>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <h3 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
                SIEAP Standalone Valuation Report
              </h3>
              <div className="text-3xl font-bold text-white">₹15,000 – ₹25,000</div>
              <p className="text-sm text-gray-400 mt-2">
                One-time. Pricing depends on stage and complexity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 mb-6">
            <ul className="space-y-3">
              {standaloneLeft.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
            <ul className="space-y-3">
              {standaloneRight.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                  <span className="text-sm text-gray-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-xs text-gray-500 italic mb-8">
            *CA sign-off included. Registered Valuer charges may be additional
            depending on valuation complexity and applicable regulatory requirements.
            Does not include investor dashboard listing — requires subscription
            upgrade to Growth or Premium tier.
          </p>

          <div className="flex flex-col items-start gap-4">
            <Link to="/apply">
              <Button size="lg" className="button-gradient">
                Request Standalone Report
              </Button>
            </Link>
            <p className="text-sm text-gray-400">
              Standalone report ≠ subscription. Subscribers get ongoing
              re-evaluation, mentor sessions, and progressive score improvement
              toward investor dashboard listing.
            </p>
          </div>
        </motion.div>
      </section>

      {/* Other Pricing */}
      <section id="other-pricing" className="container px-4 py-24 md:py-32 scroll-mt-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-6">
            Incubator &{" "}
            <span className="text-gradient font-medium">Investor Plans</span>
          </h2>
          <p className="text-lg text-gray-400">
            Built for partners powering the ecosystem alongside us.
          </p>
        </motion.div>

        <IncubatorPricingSection />
        <div className="h-12" />
        <InvestorPricingSection />
      </section>

      {/* FAQ */}
      <section className="container px-4 py-24 md:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-3xl mx-auto text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-normal mb-6">
            Pricing <span className="text-gradient font-medium">FAQ</span>
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((item, i) => (
              <AccordionItem
                key={i}
                value={`q-${i}`}
                className="glass rounded-xl px-6 border-none"
              >
                <AccordionTrigger className="text-left text-base md:text-lg font-medium text-foreground hover:no-underline">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-gray-400 leading-relaxed">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Pricing;
