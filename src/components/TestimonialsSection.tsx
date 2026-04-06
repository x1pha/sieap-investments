"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Founder, HealthTech Startup",
    image: "https://avatars.githubusercontent.com/u/1234567?v=4",
    content: "SIEAP helped us connect with the right investors within weeks. The mentorship and advisory support accelerated our Series A journey significantly."
  },
  {
    name: "Rajesh Mehta",
    role: "Angel Investor",
    image: "https://avatars.githubusercontent.com/u/2345678?v=4",
    content: "The deal flow quality on SIEAP is exceptional. The due diligence tools and portfolio tracking have streamlined how I evaluate early-stage startups."
  },
  {
    name: "Ananya Reddy",
    role: "Incubator Director",
    image: "https://avatars.githubusercontent.com/u/3456789?v=4",
    content: "Managing our cohort of 30+ startups became effortless with SIEAP. Demo day hosting and mentor coordination features are game-changers."
  },
  {
    name: "Vikram Patel",
    role: "Co-founder, EdTech Platform",
    image: "https://avatars.githubusercontent.com/u/4567890?v=4",
    content: "From pitch deck reviews to investor introductions — SIEAP's ecosystem approach gave us everything we needed to go from idea to funded startup."
  },
  {
    name: "Kavitha Nair",
    role: "Venture Partner",
    image: "https://avatars.githubusercontent.com/u/5678901?v=4",
    content: "The AI-powered matching is remarkably accurate. We've made three investments through SIEAP and the quality of startups keeps improving."
  },
  {
    name: "Arjun Desai",
    role: "TBI Programme Manager",
    image: "https://avatars.githubusercontent.com/u/6789012?v=4",
    content: "SIEAP's white-label solution let us brand the platform as our own. Our startups love the progress tracking and investor-readiness features."
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 overflow-hidden">
      <div className="container px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-normal mb-4">Trusted by the Ecosystem</h2>
          <p className="text-muted-foreground text-lg">
            Startups, investors, and incubators growing together on SIEAP
          </p>
        </motion.div>

        <div className="relative flex flex-col antialiased">
          <div className="relative flex overflow-hidden py-4">
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-1`} className="w-[400px] shrink-0 bg-secondary/30 backdrop-blur-xl border-border/50 hover:border-border transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground/90">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
            <div className="animate-marquee flex min-w-full shrink-0 items-stretch gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={`${index}-2`} className="w-[400px] shrink-0 bg-secondary/30 backdrop-blur-xl border-border/50 hover:border-border transition-all duration-300 p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={testimonial.image} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-foreground/90">{testimonial.name}</h4>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                  <p className="text-foreground/70 leading-relaxed">
                    {testimonial.content}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
