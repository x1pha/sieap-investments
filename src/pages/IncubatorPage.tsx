import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Rocket, Users, BarChart3, Calendar, Globe, Star } from "lucide-react";
import { IncubatorPricingSection } from "@/components/pricing/IncubatorPricingSection";
import { SEOHead } from "@/components/SEOHead";

export default function IncubatorPage() {
  const features = [
    {
      title: "Portfolio Management",
      description: "Track and manage your entire startup portfolio in one platform",
      icon: <BarChart3 className="w-6 h-6" />
    },
    {
      title: "Demo Day Hosting",
      description: "Professional virtual and in-person demo day event management",
      icon: <Calendar className="w-6 h-6" />
    },
    {
      title: "Mentor Coordination",
      description: "Connect startups with the right mentors and track interactions",
      icon: <Users className="w-6 h-6" />
    },
    {
      title: "White-Label Solutions",
      description: "Custom branding and domain options for your incubator",
      icon: <Globe className="w-6 h-6" />
    }
  ];

  const capabilities = [
    "Unlimited startup portfolio tracking",
    "Batch and cohort management",
    "Performance analytics and reporting",
    "Investor relations management",
    "Mentor marketplace access", 
    "Custom branding options"
  ];

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="For Incubators | SIEAP Investments"
        description="Supercharge your incubator with SIEAP's ecosystem — manage cohorts, connect mentors, and grow your startup portfolio."
        canonical="https://sieapinvest.com/incubator"
      />
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-4 text-primary">
              FOR INCUBATORS
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Scale Your <span className="text-gradient">Incubator</span> Operations
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Comprehensive platform to manage your startup portfolio, host demo days, and accelerate your incubation process.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button className="button-gradient" asChild>
            <a href="/startup-tracking">View Startup Dashboard</a>
          </Button>
              <Button variant="outline" size="lg">
                Schedule Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Incubator Management Platform</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to run a successful incubator program
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

      {/* Capabilities Section */}
      <section className="py-20 px-4 bg-secondary/20">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Complete Incubator Solution</h2>
              <p className="text-xl text-muted-foreground mb-8">
                From startup tracking to demo day hosting, we provide everything you need.
              </p>
              <div className="space-y-4">
                {capabilities.map((capability, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <Star className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-lg">{capability}</span>
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
                <div className="text-center space-y-6">
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">200+</div>
                    <div className="text-muted-foreground">Incubators</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">5,000+</div>
                    <div className="text-muted-foreground">Startups Managed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-primary mb-2">92%</div>
                    <div className="text-muted-foreground">Success Rate</div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Startup Tracking Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Startup Registration Tracking</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Dedicated dashboard to track all registered startups, monitor their progress, and manage your incubation pipeline.
            </p>
            <Card className="glass max-w-4xl mx-auto p-8">
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <Rocket className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Registration Management</h3>
                  <p className="text-muted-foreground">Streamlined startup onboarding and registration process</p>
                </div>
                <div className="text-center">
                  <BarChart3 className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
                  <p className="text-muted-foreground">Real-time monitoring of startup milestones and KPIs</p>
                </div>
                <div className="text-center">
                  <Users className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Cohort Management</h3>
                  <p className="text-muted-foreground">Organize and manage startup batches and cohorts</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <IncubatorPricingSection />
    </div>
  );
}