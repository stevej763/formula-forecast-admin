import { useState } from "react";
import Header from "./nav/Header";
import FfSubTabs from "../../shared/components/FfSubTabs";
import DriversTab from "./tabs/DriversTab";
import ConstructorsTab from "./tabs/ConstructorsTab";
import RaceWeekendsTab from "./tabs/RaceWeekendsTab";
import SeasonTab from "./tabs/SeasonTab";

const HomePage = () => {
  const [activeTab, setActiveTab] = useState("drivers");

  const tabOptions = [
    { key: "drivers", label: "Drivers" },
    { key: "constructors", label: "Constructors" },
    { key: "weekends", label: "Race Weekends" },
    { key: "season", label: "Season" }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "drivers":
        return <DriversTab />;
      case "constructors":
        return <ConstructorsTab />;
      case "weekends":
        return <RaceWeekendsTab />;
      case "season":
        return <SeasonTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900">
      <Header onAccountClick={() => {}} />
      <div className="pt-16 flex-1">
        <FfSubTabs 
          tabOptions={tabOptions}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
        {renderTabContent()}
      </div>
    </div>
  );
};

export default HomePage;
