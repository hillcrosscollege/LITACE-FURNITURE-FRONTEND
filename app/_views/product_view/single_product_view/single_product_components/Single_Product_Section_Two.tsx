"use client";
import App_Button from "@/components/app_ui/App_Button";
import { useState } from "react";
import Single_Product_More_Info from "./Single_Product_More_Info";
import Single_Product_Add_Review from "./Single_Product_Add_Review";
type ActiveType = "More Info" | "Review";

const Single_Product_Section_Two = () => {
  const [active, selectActive] = useState<ActiveType>("More Info");
  const tabs = ["More Info", "Review"];
  const display = {
    "More Info": <Single_Product_More_Info />,
    Review: <Single_Product_Add_Review />,
  };
  return (
    <section className="containerclass mb-20 flex gap-6">
      <div className="w-[30%]">
        {tabs.map((item) => (
          <div>
            <App_Button
              text={item}
              btnStyle={`rounded-none w-full py-6 ${active == item ? "bg-primary text-white" : "bg-white text-gray-500"}`}
              onPress={() => selectActive(item as ActiveType)}
            />
          </div>
        ))}
      </div>
      <div className="p-6 bg-white rounded-xl flex-1">{display[active]}</div>
    </section>
  );
};

export default Single_Product_Section_Two;
