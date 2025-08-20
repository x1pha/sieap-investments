import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { UserTypeToggle } from "@/components/UserTypeToggle";
import Footer from "@/components/Footer";
import BusinessPage from "./BusinessPage";
import InvestorPage from "./InvestorPage";
import IncubatorPage from "./IncubatorPage";

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