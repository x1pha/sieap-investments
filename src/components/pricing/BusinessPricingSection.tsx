import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle } from "lucide-react";
import { CardSpotlight } from "./CardSpotlight";

const businessTiers = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for entrepreneurs just getting started",
    features: [
      "Basic startup profile creation and investor database access",
      "2 hours monthly mentoring sessions",
      "Pitch deck review and feedback",
      "Basic analytics dashboard", 
      "Standard customer support"
    ],
    isPopular: false
  },
  {
    name: "Growth",
    price: "$299",
    description: "Ideal for growing startups seeking active guidance",
    features: [
      "All Starter features",
      "4 hours monthly advisory sessions (legal, financial, strategic)",
      "Priority investor matching and introductions",
      "Advanced analytics and market insights",
      "Video conferencing and collaboration tools",
      "Dedicated account manager"
    ],
    isPopular: true
  },
  {
    name: "Scale",
    price: "$599",
    description: "Full-service solution for scaling startups",
    features: [
      "All Growth features",
      "Unlimited advisory sessions with dedicated advisor",
      "Premium investor network access",
      "Custom due diligence support",
      "White-label platform options",
      "Priority customer support and SLA"
    ],
    isPopular: false
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
          className={`w-full mt-8 ${isPopular ? 'button-gradient text-white' : 'bg-secondary hover:bg-secondary/80'}`}
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
        </motion.div>
      ))}
    </div>
  );
};