"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Check } from "lucide-react";

const steps = [
  { id: 1, label: "Customer" },
  { id: 2, label: "Items" },
  { id: 3, label: "Shipping" },
  { id: 4, label: "Payment" },
  { id: 5, label: "Review" },
];

type Props = {
  currentStep: number;
  completedSteps: number[];
};

const Order_Stepper = ({ currentStep, completedSteps }: Props) => (
  <div className="flex items-center gap-0 mb-6 overflow-x-auto scrollbar-none">
    {steps.map((step, i) => {
      const isActive = currentStep === step.id;
      const isCompleted = completedSteps.includes(step.id);

      return (
        <div key={step.id} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-colors ${
                isCompleted
                  ? "bg-primary text-white"
                  : isActive
                    ? "bg-primary text-white"
                    : "bg-[#f5f2ee] text-muted-foreground"
              }`}
            >
              {isCompleted ? <Check size={14} /> : step.id}
            </div>
            <App_Text
              variant="tableCellMuted"
              className={`text-[10px] whitespace-nowrap ${isActive ? "text-primary font-medium" : ""}`}
            >
              {step.label}
            </App_Text>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 sm:w-20 h-px mx-2 mb-4 flex-shrink-0 transition-colors ${
                completedSteps.includes(step.id) ? "bg-primary" : "bg-[#ede8e2]"
              }`}
            />
          )}
        </div>
      );
    })}
  </div>
);

export default Order_Stepper;
