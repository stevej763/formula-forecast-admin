
interface TabOption {
  key: string;
  label: string;
}

interface LeaderboardTabsProps {
  tabOptions: TabOption[];
  activeTab: string;
  setActiveTab: (key: string) => void;
}

const FfSubTabs = ({ tabOptions, activeTab, setActiveTab }: LeaderboardTabsProps) => {
  return (
    <div className="w-full bg-blue-900/30 border-b border-blue-700/50">
      <div className="flex w-full">
        {tabOptions.map(tab => (
          <button
            key={tab.key}
            className={`flex-1 px-2 sm:px-6 py-4 text-sm sm:text-base font-semibold transition-colors duration-150 focus:outline-none border-b-2 ${
              activeTab === tab.key
                ? "border-blue-500 text-white bg-blue-900/50"
                : "border-transparent text-blue-200 hover:text-white hover:bg-blue-800/30"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FfSubTabs;
