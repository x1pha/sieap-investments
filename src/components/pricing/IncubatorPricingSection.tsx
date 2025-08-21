import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { CardSpotlight } from "./CardSpotlight";

const incubatorTiers = [
  {
    name: "Scout Incubator",
    price: "$299",
    description: "Essential portfolio tracking for growing incubators",
    features: [
      "Portfolio management for up to 50 startups",
      "Wealth generation analytics and performance monitoring",
      "Basic mentor coordination and communication tools",
      "Batch/cohort organization and tracking",
      "Standard reporting and analytics",
      "Email support",
      "Basic startup onboarding tools"
    ],
    isPopular: false
  },
  {
    name: "Accelerate Incubator",
    price: "$799",
    description: "Complete incubator management platform",
    features: [
      "Everything in Scout PLUS:",
      "Unlimited Portfolio Capacity",
      "Demo Day Hosting Platform: Virtual/in-person event management",
      "White-Label Options: Custom branding and domain",
      "Premium Advisory Network: Expert mentor marketplace",
      "Investor Relations: Dedicated investor network access",
      "Advanced analytics and reporting",
      "Priority support with dedicated account manager",
      "Custom integrations and API access"
    ],
    isPopular: true
  }
];

const IncubatorTier = ({ name, price, description, features, isPopular }: typeof incubatorTiers[0]) => (
  <CardSpotlight>
    <Card className="relative h-full bg-transparent border-border/50">
      {isPopular && (
        <Badge className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-primary text-black">
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
          className={`w-full mt-8 ${isPopular ? 'button-gradient text-white' : 'bg-secondary hover:bg-secondary/80'}`}
          size="lg"
        >
          Get Started
        </Button>
      </CardContent>
    </Card>
  </CardSpotlight>
);

export const IncubatorPricingSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {incubatorTiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <IncubatorTier {...tier} />
        </motion.div>
      ))}
    </div>
  );
};