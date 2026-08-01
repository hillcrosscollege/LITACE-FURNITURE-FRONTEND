import App_Text from "./App_Text";

const App_Tabs = ({
  activeTab,
  detailTabs,
  setActiveTab,
}: {
  detailTabs: { label: string; count?: number; key?: string }[];
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="flex items-center border-b border-[#ede8e2] overflow-x-auto scrollbar-none px-4">
      {detailTabs.map((tab) => (
        <button
          key={tab.label}
          type="button"
          onClick={() => setActiveTab(tab.label)}
          className={`flex items-center gap-1.5 px-3 py-3.5 whitespace-nowrap border-b-2 transition-colors ${
            activeTab === tab.key || activeTab === tab.label
              ? "border-primary"
              : "border-transparent"
          }`}
        >
          <App_Text
            variant="sectionLabel"
            className={
              activeTab === tab.key || activeTab === tab.label
                ? "text-primary font-medium"
                : "hover:text-[text]"
            }
          >
            {tab.label}
          </App_Text>
          {tab?.count !== undefined && (
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                activeTab === tab.label
                  ? "bg-primary/10 text-primary"
                  : "bg-[#f5f2ee] text-muted-foreground"
              }`}
            >
              {tab?.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default App_Tabs;
