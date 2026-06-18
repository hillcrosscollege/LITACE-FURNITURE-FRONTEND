"use client";

import { Check } from "lucide-react";
import { stepConfig } from "../../cusomer_data/customer_data";
import App_Text from "@/components/app_ui/App_Text";

type Props = {
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
};

const Customer_Stepper = ({
  currentStep,
  completedSteps,
  onStepClick,
}: Props) => (
  <div className="w-56 shrink-0 hidden lg:block">
    <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 sticky top-6">
      <div className="flex flex-col gap-0 relative">
        {/* Vertical connector line */}
        <div className="absolute left-4 top-8 bottom-8 w-px bg-[#ede8e2]" />

        {stepConfig.map((step) => {
          const isActive = currentStep === step.id;
          const isCompleted = completedSteps.includes(step.id);
          const isClickable = isCompleted || isActive;

          return (
            <button
              key={step.id}
              type="button"
              onClick={() => isClickable && onStepClick(step.id)}
              className={`flex items-center gap-3 px-3 py-3.5 rounded-xl text-left transition-colors relative z-10 ${
                isActive
                  ? "bg-primary/5"
                  : isClickable
                    ? "hover:bg-[#f5f2ee]"
                    : "cursor-not-allowed opacity-50"
              }`}
            >
              {/* Circle */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition-colors border-2 ${
                  isCompleted
                    ? "bg-primary border-primary text-white"
                    : isActive
                      ? "bg-primary border-primary text-white"
                      : "bg-white border-[#ede8e2] text-muted-foreground"
                }`}
              >
                {isCompleted ? <Check size={14} /> : step.id}
              </div>

              <App_Text
                variant="tableCell"
                className={`font-medium leading-tight ${
                  isActive
                    ? "text-primary"
                    : isCompleted
                      ? "text-[#1e1a17]"
                      : "text-muted-foreground"
                }`}
              >
                {step.label}
              </App_Text>
            </button>
          );
        })}
      </div>
    </div>
  </div>
);

export default Customer_Stepper;
