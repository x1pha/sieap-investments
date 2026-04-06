import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import MainIndex from "./pages/MainIndex";
import StartupTrackingPage from "./pages/StartupTrackingPage";
import ForStartups from "./pages/ForStartups";
import ForInvestors from "./pages/ForInvestors";
import ForIncubators from "./pages/ForIncubators";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/business" element={<MainIndex />} />
            <Route path="/investor" element={<MainIndex />} />
            <Route path="/incubator" element={<MainIndex />} />
            <Route path="/startup-tracking" element={<StartupTrackingPage />} />
            <Route path="/for-startups" element={<ForStartups />} />
            <Route path="/for-investors" element={<ForInvestors />} />
            <Route path="/for-incubators" element={<ForIncubators />} />
          </Routes>
        </BrowserRouter>
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;