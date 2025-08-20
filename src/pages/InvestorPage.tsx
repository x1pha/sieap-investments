import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, Shield, Users, Eye, Zap } from "lucide-react";
import { InvestorPricingSection } from "@/components/pricing/InvestorPricingSection";

export default function InvestorPage() {
  const features = [
    {
      title: "Deal Flow Access",
      description: "Access to 500+ pre-screened startups across various industries",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Advanced Analytics",
      description: "Comprehensive analytics and risk assessment tools for better decisions",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "Due Diligence Support",
      description: "Professional legal and financial due diligence services",
      icon: <Shield className="w-6 h-6" />
    },
    {
      title: "Portfolio Tracking",
      description: "Real-time portfolio management and performance monitoring",
      icon: <Eye className="w-6 h-6" />
    }
  ];

  const benefits = [
    "Access to exclusive startup deals",
    "Professional investment advisory",
    "Risk assessment and mitigation",
    "Regulatory compliance support",
    "Network of co-investors",
    "Market insights and trends"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 text-primary">
              FOR INVESTORS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Discover <span className="text-gradient">High-Potential</span> Startups
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">  
              Connect with promising startups, access exclusive deal flow, and build a diversified portfolio with professional support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-gradient text-white">
                Start Investing
              </Button>
              <Button variant="outline" size="lg">
                View Deal Flow
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Investment Platform Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to make informed investment decisions
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass h-full hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="text-primary mb-4">{feature.icon}</div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Why Choose Our Platform?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join a community of successful investors and access premium investment opportunities.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Zap className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <Card className="glass p-8">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <div className="text-muted-foreground mb-6">Active Startups</div>
                  <div className="text-4xl font-bold text-primary mb-2">$50M+</div>
                  <div className="text-muted-foreground mb-6">Invested Capital</div>
                  <div className="text-4xl font-bold text-primary mb-2">85%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <InvestorPricingSection />
    </div>
  );
}