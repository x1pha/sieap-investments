import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle } from "lucide-react";
import { CardSpotlight } from "./CardSpotlight";

const investorTiers = [
  {
    name: "Solo Investor",
    price: "$199",
    description: "Perfect for individual angel investors",
    features: [
      "Deal flow access to 500+ startups",
      "Basic analytics and communication tools",
      "Simple investment tracking",
      "MarketView dashboard access"
    ],
    limitations: [
      "20 startup connections/month"
    ],
    isPopular: false
  },
  {
    name: "Managed Investor", 
    price: "$499",
    description: "Premium solution with professional services",
    features: [
      "Everything in Solo PLUS:",
      "CA Financial Services: 4 hours/month tax advisory",
      "Compliance Support: Legal consultation & due diligence",
      "Portfolio Management: Advanced analytics & risk assessment",
      "Premium Features: Unlimited connections, API access, dedicated advisor"
    ],
    limitations: [],
    isPopular: true
  }
];

const InvestorTier = ({ name, price, description, features, limitations, isPopular }: typeof investorTiers[0]) => (
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
        
        {limitations.length > 0 && (
          <div className="border-t border-border/50 pt-4">
            <p className="text-sm font-medium text-muted-foreground mb-2">Limitations:</p>
            <ul className="space-y-2">
              {limitations.map((limitation, index) => (
                <li key={index} className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-yellow-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-muted-foreground">{limitation}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
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

export const InvestorPricingSection = () => {
  return (
    <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
      {investorTiers.map((tier, index) => (
        <motion.div
          key={tier.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <InvestorTier {...tier} />
        </motion.div>
      ))}
    </div>
  );
};