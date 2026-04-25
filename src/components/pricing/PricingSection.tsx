import { motion } from "framer-motion";
import { Check, Building2, Users, Rocket, Clock, TrendingUp, Percent } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { useContext, useState } from "react";
import { UserTypeContext, UserTypeContextType, UserType } from "@/contexts/UserTypeContext";
import { BusinessPricingSection } from "./BusinessPricingSection";
import { InvestorPricingSection } from "./InvestorPricingSection";
import { IncubatorPricingSection } from "./IncubatorPricingSection";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const PricingTier = ({
  name,
  price,
  description,
  features,
  isPopular,
}: {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
}) => (
  <CardSpotlight className={`h-full ${isPopular ? "border-primary" : "border-white/10"} border-2`}>
    <div className="relative h-full p-6 flex flex-col">
      {isPopular && (
        <span className="text-xs font-medium bg-primary/10 text-primary rounded-full px-3 py-1 w-fit mb-4">
          Most Popular
        </span>
      )}
      <h3 className="text-xl font-medium mb-2">{name}</h3>
      <div className="mb-4">
        <span className="text-4xl font-bold">{price}</span>
        {price !== "Custom" && <span className="text-gray-400">/month</span>}
      </div>
      <p className="text-gray-400 mb-6">{description}</p>
      <ul className="space-y-3 mb-8 flex-grow">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center gap-2">
            <Check className="w-5 h-5 text-primary" />
            <span className="text-sm text-gray-300">{feature}</span>
          </li>
        ))}
      </ul>
      <Button className="button-gradient w-full">
        Get Started
      </Button>
    </div>
  </CardSpotlight>
);

export const PricingSection = () => {
  const context = useContext(UserTypeContext);
  const [localUserType, setLocalUserType] = useState<UserType>('business');
  const userType = context?.userType || localUserType;

  const getTitleText = () => {
    switch (userType) {
      case 'business':
        return 'Startup';
      case 'investor':
        return 'Investor';
      case 'incubator':
        return 'Incubator';
      default:
        return 'Startup';
    }
  };

  const getDescriptionText = () => {
    switch (userType) {
      case 'business':
        return 'Select the perfect plan to accelerate your startup journey';
      case 'investor':
        return 'Choose the right investment platform for your needs';
      case 'incubator':
        return 'Essential tools for managing your portfolio and growing startups';
      default:
        return 'Select the perfect plan to accelerate your startup journey';
    }
  };

  return (
    <section id="pricing" className="container px-4 py-24">
      <div className="max-w-2xl mx-auto text-center mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-5xl md:text-6xl font-normal mb-6"
        >
          Choose Your{" "}
          <span className="text-gradient font-medium">{getTitleText()} Plan</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-lg text-gray-400 mb-8"
        >
          {getDescriptionText()}
        </motion.p>
        
        {/* User Type Toggle - only show when not in context (standalone page) */}
        {!context && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <Tabs value={userType} onValueChange={(value) => setLocalUserType(value as UserType)} className="w-auto">
                <TabsList className="grid grid-cols-3 h-14 bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-1 shadow-2xl">
                  <TabsTrigger 
                    value="business" 
                    className="flex items-center gap-2 text-sm font-medium h-12 px-6 rounded-xl transition-all duration-300 ease-out data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 data-[state=active]:scale-105 hover:bg-white/5 hover:scale-102 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <Building2 className="w-4 h-4 transition-transform duration-300" />
                    <span className="font-semibold">Business</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="investor" 
                    className="flex items-center gap-2 text-sm font-medium h-12 px-6 rounded-xl transition-all duration-300 ease-out data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 data-[state=active]:scale-105 hover:bg-white/5 hover:scale-102 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <Users className="w-4 h-4 transition-transform duration-300" />
                    <span className="font-semibold">Investor</span>
                  </TabsTrigger>
                  <TabsTrigger 
                    value="incubator" 
                    className="flex items-center gap-2 text-sm font-medium h-12 px-6 rounded-xl transition-all duration-300 ease-out data-[state=active]:bg-gradient-to-r data-[state=active]:from-primary data-[state=active]:to-primary/80 data-[state=active]:text-black data-[state=active]:shadow-lg data-[state=active]:shadow-primary/25 data-[state=active]:scale-105 hover:bg-white/5 hover:scale-102 text-gray-300 hover:text-white cursor-pointer"
                  >
                    <Rocket className="w-4 h-4 transition-transform duration-300" />
                    <span className="font-semibold">Incubator</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              
              {/* Subtle glow effect */}
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur opacity-30 animate-pulse pointer-events-none"></div>
            </div>
          </motion.div>
        )}
      </div>

      {context ? (
        <motion.div
          key={userType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {userType === 'business' && <BusinessPricingSection />}
          {userType === 'investor' && <InvestorPricingSection />}
          {userType === 'incubator' && <IncubatorPricingSection />}
        </motion.div>
      ) : (
        <motion.div
          key={userType}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {userType === 'business' && <BusinessPricingSection />}
          {userType === 'investor' && <InvestorPricingSection />}
          {userType === 'incubator' && <IncubatorPricingSection />}
        </motion.div>
      )}

      {/* Why Monthly explainer + Standalone Report — shown on homepage for the business view */}
      {userType === 'business' && (
        <>
          <div className="max-w-3xl mx-auto text-center mt-24 mb-14">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-normal mb-6"
            >
              Why Monthly?{" "}
              <span className="text-gradient font-medium">
                Because Valuation Isn't a One-Time Event.
              </span>
            </motion.h3>
            <p className="text-lg text-gray-400">
              Startup valuation is not a document — it's a moving number. A startup's
              score on SIEAP changes every quarter as financials, team, product, and
              market evolve. Monthly engagement is how we actively work to improve it.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {[
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
            ].map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="glass rounded-2xl p-8 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h4 className="text-xl font-medium text-foreground">{card.title}</h4>
                  <p className="text-gray-400 leading-relaxed">{card.body}</p>
                </motion.div>
              );
            })}
          </div>

          <p className="text-sm text-gray-400 italic text-center mt-10">
            One-time engagement option available for standalone valuation reports. See below.
          </p>

          {/* Standalone Valuation Report */}
          <div className="max-w-3xl mx-auto text-center mt-24 mb-14">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-normal mb-6"
            >
              Just Need a Valuation?{" "}
              <span className="text-gradient font-medium">We Have That Too.</span>
            </motion.h3>
            <p className="text-lg text-gray-400">
              Not ready to subscribe? Get a standalone SIEAP Valuation Report for your
              startup — with business growth pointers and CA sign-off.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 md:p-12 max-w-5xl mx-auto"
          >
            <span className="inline-block bg-white/10 text-gray-300 text-xs font-medium tracking-wider rounded-full px-3 py-1 mb-6">
              STANDALONE
            </span>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
              <div>
                <h4 className="text-2xl md:text-3xl font-medium text-foreground mb-3">
                  SIEAP Standalone Valuation Report
                </h4>
                <div className="text-3xl font-bold text-white">₹15,000 – ₹25,000</div>
                <p className="text-sm text-gray-400 mt-2">
                  One-time. Pricing depends on stage and complexity.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3 mb-6">
              <ul className="space-y-3">
                {[
                  "Full 100-point evaluation scorecard",
                  "5-pillar scored breakdown",
                  "Stage-calibrated weights applied",
                  "CA-verified financial review",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-primary mt-0.5 shrink-0" />
                    <span className="text-sm text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <ul className="space-y-3">
                {[
                  "Business growth pointers per pillar",
                  "Valuation range (Low / Mid / High)",
                  "SIEAP Recommendation",
                  "Shareable PDF report",
                ].map((item) => (
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
        </>
      )}
    </section>
  );
};