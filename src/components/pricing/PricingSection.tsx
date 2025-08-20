import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "./CardSpotlight";
import { useContext } from "react";
import { UserTypeContext, UserTypeContextType } from "@/contexts/UserTypeContext";
import { BusinessPricingSection } from "./BusinessPricingSection";
import { InvestorPricingSection } from "./InvestorPricingSection";
import { IncubatorPricingSection } from "./IncubatorPricingSection";

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
  const userType = context?.userType || 'business';

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
          className="text-lg text-gray-400"
        >
          {getDescriptionText()}
        </motion.p>
      </div>

      {context ? (
        <>
          {userType === 'business' && <BusinessPricingSection />}
          {userType === 'investor' && <InvestorPricingSection />}
          {userType === 'incubator' && <IncubatorPricingSection />}
        </>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <PricingTier
            name="Starter"
            price="$99"
            description="Perfect for entrepreneurs just getting started"
            features={[
              "Basic startup profile creation",
              "2 hours monthly mentoring",
              "Pitch deck review and feedback",
              "Basic analytics dashboard",
              "Standard customer support"
            ]}
          />
          <PricingTier
            name="Growth"
            price="$299"
            description="Ideal for growing startups seeking guidance"
            features={[
              "All Starter features",
              "4 hours monthly advisory sessions",
              "Priority investor matching",
              "Advanced analytics and insights",
              "Video conferencing tools",
              "Dedicated account manager"
            ]}
            isPopular
          />
          <PricingTier
            name="Scale"
            price="$599"
            description="Full-service solution for scaling startups"
            features={[
              "All Growth features",
              "Unlimited advisory sessions",
              "Premium investor network access",
              "Custom due diligence support",
              "White-label platform options",
              "Priority customer support"
            ]}
          />
        </div>
      )}
    </section>
  );
};