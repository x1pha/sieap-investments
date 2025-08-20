import { useState } from "react";
import { motion } from "framer-motion"; 
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, TrendingUp, Users, Calendar, Search, Filter } from "lucide-react";

const mockStartups = [
  {
    id: 1,
    name: "TechFlow Solutions",
    industry: "SaaS",
    stage: "Series A",
    registrationDate: "2024-01-15",
    valuation: "$2.5M",
    status: "Active",
    progress: 75,
    mentorHours: 24,
    nextMilestone: "Product Launch"
  },
  {
    id: 2,
    name: "GreenEnergy Innovations",
    industry: "CleanTech",
    stage: "Seed",
    registrationDate: "2024-02-20",
    valuation: "$800K",
    status: "Active",
    progress: 45,
    mentorHours: 18,
    nextMilestone: "Prototype Testing"
  },
  {
    id: 3,
    name: "HealthTech Analytics",
    industry: "HealthTech",
    stage: "Pre-Seed",
    registrationDate: "2024-03-10",
    valuation: "$500K",
    status: "Active",
    progress: 30,
    mentorHours: 12,
    nextMilestone: "MVP Development"
  }
];

export default function StartupTrackingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");

  const filteredStartups = mockStartups.filter(startup =>
    startup.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    startup.industry.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      case "Inactive":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  const getStageColor = (stage: string) => {
    switch (stage) {
      case "Pre-Seed":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Seed":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
      case "Series A":
        return "bg-purple-500/20 text-purple-400 border-purple-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="py-12 px-4 border-b border-border/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold mb-2">Startup Registration Tracking</h1>
              <p className="text-xl text-muted-foreground">
                Monitor and manage all registered startups in your incubator
              </p>
            </div>
            <Button className="button-gradient text-white">
              Register New Startup
            </Button>
          </div>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search startups..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="all">All Startups</TabsTrigger>
                <TabsTrigger value="active">Active</TabsTrigger>
                <TabsTrigger value="recent">Recent</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Statistics Cards */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="glass">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Building2 className="w-6 h-6 text-primary" />
                  <span className="text-2xl font-bold">127</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Total Startups</p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <TrendingUp className="w-6 h-6 text-green-400" />
                  <span className="text-2xl font-bold">89</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Active Startups</p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Users className="w-6 h-6 text-blue-400" />
                  <span className="text-2xl font-bold">245</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Total Founders</p>
              </CardContent>
            </Card>
            
            <Card className="glass">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <Calendar className="w-6 h-6 text-yellow-400" />
                  <span className="text-2xl font-bold">23</span>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">This Month</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Startups Grid */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid gap-6">
            {filteredStartups.map((startup, index) => (
              <motion.div
                key={startup.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="glass hover:bg-white/10 transition-all duration-300">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{startup.name}</CardTitle>
                        <div className="flex gap-2 mb-2">
                          <Badge className={getStatusColor(startup.status)}>
                            {startup.status}
                          </Badge>
                          <Badge className={getStageColor(startup.stage)}>
                            {startup.stage}
                          </Badge>
                          <Badge variant="outline">
                            {startup.industry}
                          </Badge>
                        </div>
                        <CardDescription>
                          Registered: {startup.registrationDate} | Valuation: {startup.valuation}
                        </CardDescription>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Progress</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-secondary rounded-full h-2">
                            <div 
                              className="bg-primary h-2 rounded-full transition-all duration-300"
                              style={{ width: `${startup.progress}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{startup.progress}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Mentor Hours</p>
                        <p className="text-lg font-semibold">{startup.mentorHours} hours</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-2">Next Milestone</p>
                        <p className="text-lg font-semibold">{startup.nextMilestone}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}