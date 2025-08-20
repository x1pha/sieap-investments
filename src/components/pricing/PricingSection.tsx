import { motion } from "framer-motion";
import { Check, Building2, Users, Rocket } from "lucide-react";
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
              <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-transparent to-primary/20 rounded-2xl blur opacity-30 animate-pulse"></div>
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
    </section>
  );
};