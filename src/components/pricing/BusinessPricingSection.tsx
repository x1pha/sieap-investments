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
    description: "Perfect for early-stage startups",
    features: [
      "Basic mentoring sessions (2 hours/month)",
      "Pitch deck review and feedback",
      "Investor introduction (up to 3/month)",
      "Access to resource library",
      "Community forum access",
      "Email support"
    ],
    isPopular: false
  },
  {
    name: "Growth",
    price: "$299", 
    description: "Ideal for scaling startups",
    features: [
      "Enhanced mentoring (6 hours/month)",
      "Legal and CA advisory services",
      "Strategic business planning",
      "Investor pitch preparation",
      "Market research support",
      "Priority support",
      "Networking events access"
    ],
    isPopular: true
  },
  {
    name: "Scale",
    price: "$599",
    description: "Complete solution for growing businesses",
    features: [
      "Dedicated advisor assigned",
      "Unlimited mentoring sessions",
      "Priority investor matching",
      "Legal document templates",
      "Financial modeling support",
      "Demo day presentation opportunity",
      "White-glove onboarding",
      "Custom partnership opportunities"
    ],
    isPopular: false
  }
];

const BusinessTier = ({ name, price, description, features, isPopular }: typeof businessTiers[0]) => (
  <CardSpotlight>
    <Card className="relative h-full bg-transparent border-border/50">
      {isPopular && (
        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
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
          Start Trading
        </Button>
      </CardContent>
    </Card>
  </CardSpotlight>
);

export const BusinessPricingSection = () => {
  return (
    <section className="py-20 px-4 bg-background">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Choose Your <span className="text-gradient">Growth Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Select the perfect plan to accelerate your startup journey
          </p>
        </motion.div>

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
      </div>
    </section>
  );
};