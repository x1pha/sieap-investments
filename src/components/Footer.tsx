import { Linkedin, Instagram, Twitter, Rss } from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="w-full py-12 mt-20">
      <div className="container px-4">
        <div className="glass glass-hover rounded-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <h3 className="font-medium text-lg">SIEAP Ecosystem</h3>
              <p className="text-sm text-muted-foreground">
                Creating real-time liquidity in India's startup ecosystem through evaluation-first investment infrastructure.
              </p>
              <div className="flex space-x-4">
                {/* TODO: Replace # with actual X/Twitter handle URL */}
                <Button variant="ghost" size="icon" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer" aria-label="Follow SIEAP on X">
                    <Twitter className="w-4 h-4" />
                  </a>
                </Button>
                {/* TODO: Replace # with actual LinkedIn company page URL */}
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/company/sieap-startup/" target="_blank" rel="noopener noreferrer" aria-label="Follow SIEAP on LinkedIn">
                    <Linkedin className="w-4 h-4" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="/rss.xml" aria-label="Subscribe to SIEAP RSS feed">
                    <Rss className="w-4 h-4" />
                  </a>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Platform</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/for-startups" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    For Startups
                  </a>
                </li>
                <li>
                  <a href="/for-investors" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    For Investors
                  </a>
                </li>
                <li>
                  <a href="/for-incubators" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    For Incubators
                  </a>
                </li>
                <li>
                  <a href="/pricing" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Pricing
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Resources</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="/mentors" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Mentor Panel
                  </a>
                </li>
                <li>
                  <a href="/traction" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Traction
                  </a>
                </li>
                <li>
                  <a href="/traction?tab=blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="/traction?tab=updates" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Announcements
                  </a>
                </li>
                <li>
                  <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Mentor Network
                  </a>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="/legal/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="/legal/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="/legal/disclaimer" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              © {new Date().getFullYear()} SIEAP Group. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground/60 text-center">
              Startup India Certified · Powered by Sapio Analytics
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;