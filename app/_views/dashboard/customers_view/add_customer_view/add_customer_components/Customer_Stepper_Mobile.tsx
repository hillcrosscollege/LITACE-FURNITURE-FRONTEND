"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Check } from "lucide-react";
import { stepConfig } from "../../cusomer_data/customer_data";

type Props = {
  currentStep: number;
  completedSteps: number[];
};

const Customer_Stepper_Mobile = ({ currentStep, completedSteps }: Props) => (
  <div className="lg:hidden flex items-center gap-0 overflow-x-auto scrollbar-none pb-2">
    {stepConfig.map((step, i) => {
      const isCompleted = completedSteps.includes(step.id);
      const isActive = currentStep === step.id;

      return (
        <div key={step.id} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 ${
                isCompleted
                  ? "bg-primary border-primary text-white"
                  : isActive
                    ? "bg-primary border-primary text-white"
                    : "bg-white border-[#ede8e2] text-muted-foreground"
              }`}
            >
              {isCompleted ? <Check size={12} /> : step.id}
            </div>
            <App_Text
              variant="tableCellMuted"
              className={`text-[9px] whitespace-nowrap ${isActive ? "text-primary font-medium" : ""}`}
            >
              {step.label}
            </App_Text>
          </div>
          {i < stepConfig.length - 1 && (
            <div
              className={`w-8 sm:w-16 h-px mb-4 mx-1 flex-shrink-0 ${
                completedSteps.includes(step.id) ? "bg-primary" : "bg-[#ede8e2]"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default Customer_Stepper_Mobile;
