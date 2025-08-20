import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

console.log("MainIndex: Starting imports...");

import Navigation from "@/components/Navigation";
console.log("MainIndex: Navigation imported successfully");

import { UserTypeToggle } from "@/components/UserTypeToggle";
console.log("MainIndex: UserTypeToggle imported successfully");

import Footer from "@/components/Footer";
console.log("MainIndex: Footer imported successfully");

import BusinessPage from "./BusinessPage";
console.log("MainIndex: BusinessPage imported successfully");

import InvestorPage from "./InvestorPage";
console.log("MainIndex: InvestorPage imported successfully");

import IncubatorPage from "./IncubatorPage";
console.log("MainIndex: All imports completed successfully");

export default function MainIndex() {
  const [userType, setUserType] = useState("business");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname.slice(1); // Remove leading slash
    if (path && ["business", "investor", "incubator"].includes(path)) {
      setUserType(path);
    }
  }, [location.pathname]);

  const handleTypeChange = (type: string) => {
    setUserType(type);
    navigate(`/${type}`);
  };

  const renderContent = () => {
    switch (userType) {
      case "business":
        return <BusinessPage />;
      case "investor":
        return <InvestorPage />;
      case "incubator":
        return <IncubatorPage />;
      default:
        return <BusinessPage />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <UserTypeToggle onTypeChange={handleTypeChange} currentType={userType} />
      {renderContent()}
      <Footer />
    </div>
  );
}