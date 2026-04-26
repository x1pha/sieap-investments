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
import Pricing from "./pages/Pricing";
import { Gallery } from "./pages/Gallery";
import { Blog } from "./pages/Blog";
import { BlogPost } from "./pages/BlogPost";
import LinkedInGallery from "./pages/LinkedInGallery";
import Traction from "./pages/Traction";
import About from "./pages/About";
import Mentors from "./pages/Mentors";
import Privacy from "./pages/legal/Privacy";
import Terms from "./pages/legal/Terms";
import Disclaimer from "./pages/legal/Disclaimer";
import { LinkedInFeedProvider } from "./contexts/LinkedInFeedContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LinkedInFeedProvider>
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
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:slug" element={<BlogPost />} />
              <Route path="/linkedin-gallery" element={<LinkedInGallery />} />
              <Route path="/traction" element={<Traction />} />
              <Route path="/about" element={<About />} />
              <Route path="/mentors" element={<Mentors />} />
              <Route path="/legal/privacy" element={<Privacy />} />
              <Route path="/legal/terms" element={<Terms />} />
              <Route path="/legal/disclaimer" element={<Disclaimer />} />
            </Routes>
          </BrowserRouter>
        </div>
      </LinkedInFeedProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;