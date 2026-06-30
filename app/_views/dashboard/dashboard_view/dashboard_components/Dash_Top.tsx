import App_Double_Text from "@/components/shared/App_Double_Text";
import { StatCard } from "./Stat_Card";
import { stats } from "../dash_data";

const Dash_Top = () => {
  return (
    <div>
      <div className="bg-linear-to-b from-[#1F1033] to-[#2E1246] border-white/10 p-5 rounded-2xl mb-6">
        <App_Double_Text
          className="gap-y-0 mb-4"
          header={{ children: "Welcome Admin!", className: "text-white" }}
          para={{ children: "See Details Below" }}
        />
        <div className="grid grid-cols-5 gap-4">
          {stats.map((stat) => (
            <StatCard key={stat.title} {...stat} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dash_Top;
