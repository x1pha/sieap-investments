import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Users, Award, Target, BookOpen, TrendingUp, Building2, Rocket } from "lucide-react";
import { BusinessPricingSection } from "@/components/pricing/BusinessPricingSection";

export default function BusinessPage() {
  const [registrationType, setRegistrationType] = useState("business");
  const services = [
    {
      title: "Pitch Review & Refinement",
      description: "Expert feedback on your pitch deck to make it investor-ready",
      icon: <Target className="w-6 h-6" />
    },
    {
      title: "Mentoring & Guidance", 
      description: "One-on-one sessions with industry experts and successful entrepreneurs",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "Investor Introductions",
      description: "Connect with our network of angel investors and VCs",
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      title: "Legal & Compliance Support",
      description: "Professional legal and CA services to keep your startup compliant",
      icon: <BookOpen className="w-6 h-6" />
    }
  ];

  const mentorFields = [
    "Technology & Engineering", "Marketing & Growth", "Sales & Business Development",
    "Finance & Accounting", "Operations & Strategy", "Product Management",
    "Legal & Compliance", "HR & Talent Acquisition", "International Business"
  ];

  const accreditations = [
    "Certified by Startup India Initiative",
    "SECP Registered Investment Advisory",
    "Recognized by TIFAC, Government of India",
    "Member of Technology Business Incubator Association of India",
    "Accredited by Startup India",
    "Powered by Sapio Analytics India"
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
              FOR STARTUPS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Transform Your <span className="text-gradient">Startup Vision</span> Into Reality
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Get expert mentoring, investor connections, and comprehensive support to scale your startup from idea to IPO.
            </p>
            
            {/* Registration Type Toggle */}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="button-gradient text-white">
                {registrationType === "business" && "Register Your Startup"}
                {registrationType === "investor" && "Register as Investor"}
                {registrationType === "incubator" && "Register Your Incubator"}
              </Button>
              <Button variant="outline" size="lg">
                Book a Consultation
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Comprehensive support at every stage of your startup journey
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass h-full hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="text-primary mb-4">{service.icon}</div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{service.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentor Network Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Expert Mentor Network</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Access to industry experts across diverse fields
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {mentorFields.map((field, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-card/50 backdrop-blur-sm rounded-lg p-4 text-center border border-border/50 hover:border-primary/50 transition-colors"
              >
                <span className="font-medium">{field}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Accreditations</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trusted and certified by leading industry bodies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {accreditations.map((accreditation, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center gap-3 p-4 bg-card/50 rounded-lg border border-border/50"
              >
                <Award className="w-6 h-6 text-primary flex-shrink-0" />
                <span className="font-medium">{accreditation}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <BusinessPricingSection />
    </div>
  );
}