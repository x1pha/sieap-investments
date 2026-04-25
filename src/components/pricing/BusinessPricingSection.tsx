import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { CardSpotlight } from "./CardSpotlight";

const businessTiers = [
  {
    name: "Basic",
    price: "₹999",
    description: "Register + Core Access for early-stage founders",
    features: [
      "Platform registration & startup dashboard",
      "Community & webinar access",
      "Ecosystem access",
      "Service partner discounts (legal, finance, GTM, talent)",
      "Co-hosted webinar participation"
    ],
    isPopular: false
  },
  {
    name: "Growth",
    price: "₹3,499",
    description: "Mentorship + Pitch Review for scaling startups",
    features: [
      "Everything in Basic",
      "Core mentorship content library",
      "1:1 mentor sessions (2x/month)",
      "Pitch deck review & refinement",
      "Basic SIEAP valuation report with business growth pointers",
      "Growth strategy support",
      "Competitive analysis & positioning"
    ],
    isPopular: true
  },
  {
    name: "Premium",
    price: "₹8,999",
    description: "Full Service + Investor Matching",
    features: [
      "Everything in Growth",
      "Priority investor matching",
      "Full SIEAP valuation (3-method blend + CA sign-off*)",
      "Dedicated mentor assigned",
      "Data room preparation",
      "Investor readiness sign-off",
      "4x monthly 1:1 mentor sessions"
    ],
    isPopular: false,
    footnote: "*CA sign-off is included in all Premium valuations. Registered Valuer charges may be additional, depending on valuation complexity and applicable regulatory requirements. SIEAP will advise on applicability before engagement."
  }
];

const BusinessTier = ({ name, price, description, features, isPopular }: typeof businessTiers[0]) => (
  <CardSpotlight>
    <Card className="relative h-full bg-transparent border-border/50">
      {isPopular && (
        <Badge className="absolute top-2 left-1/2 transform -translate-x-1/2 bg-primary text-black scale-[0.8]">
          Most Popular
        </Badge>
      )}
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-2xl font-bold text-foreground">{name}</CardTitle>
        <div className="flex items-center justify-center">
          <span className="text-4xl font-bold text-primary">{price}</span>
          <span className="text-muted-foreground ml-2">/month</span>
        </div>
        <CardDescription className="text-lg">{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{feature}</span>
            </li>
          ))}
        </ul>
        <Button 
          className={`w-full mt-8 ${isPopular ? 'button-gradient' : 'bg-secondary hover:bg-secondary/80'}`}
          size="lg"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  </CardSpotlight>
);

export const BusinessPricingSection = () => {
  return (
    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
      {businessTiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <BusinessTier {...tier} />
          {"footnote" in tier && tier.footnote && (
            <p className="text-xs text-gray-500 italic mt-3 text-left">
              {tier.footnote}
            </p>
          )}
        </motion.div>
      ))}
    </div>
  );
};
