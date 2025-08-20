import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Building2, Users, Rocket } from "lucide-react";

interface UserTypeToggleProps {
  onTypeChange: (type: string) => void;
  currentType: string;
}

export const UserTypeToggle = ({ onTypeChange, currentType }: UserTypeToggleProps) => {
  return (
    <div className="w-full bg-card/50 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 py-6">
        <Tabs value={currentType} onValueChange={onTypeChange} className="w-full">
          <TabsList className="grid w-full grid-cols-3 max-w-2xl mx-auto h-14 bg-secondary/50 backdrop-blur-sm">
            <TabsTrigger 
              value="business" 
              className="flex items-center gap-2 text-lg font-medium h-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Building2 className="w-5 h-5" />
              Business
            </TabsTrigger>
            <TabsTrigger 
              value="investor" 
              className="flex items-center gap-2 text-lg font-medium h-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Users className="w-5 h-5" />
              Investor
            </TabsTrigger>
            <TabsTrigger 
              value="incubator" 
              className="flex items-center gap-2 text-lg font-medium h-12 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
            >
              <Rocket className="w-5 h-5" />
              Incubator
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
};