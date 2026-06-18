"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Step } from "../add_product_types/index";
import { Check } from "lucide-react";

type Props = {
  steps: Step[];
  currentStep: number;
  completedSteps: number[];
  onStepClick: (step: number) => void;
};

const Product_Stepper = ({
  steps,
  currentStep,
  completedSteps,
  onStepClick,
}: Props) => {
  return (
    <div className="w-64 shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 sticky top-6">
        <App_Text variant="cardHeading" className="mb-4 px-2">
          Add Product
        </App_Text>

        <div className="flex flex-col gap-1">
          {steps.map((step, i) => {
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            const isAccessible = step.id <= currentStep || isCompleted;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isAccessible && onStepClick(step.id)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors w-full ${
                  isActive
                    ? "bg-primary/10 border border-primary/20"
                    : isCompleted || isAccessible
                      ? "hover:bg-[#f5f2ee] cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                }`}
              >
                {/* Step number / check */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-semibold transition-colors ${
                    isCompleted || isActive
                      ? "bg-primary text-white"
                      : "bg-[#f5f2ee] text-muted-foreground"
                  }`}
                >
                  {isCompleted ? <Check size={13} /> : step.id}
                </div>

                <div className="min-w-0">
                  <App_Text
                    variant="tableCell"
                    className={`font-medium truncate ${isActive ? "text-primary" : ""}`}
                  >
                    {step.label}
                  </App_Text>
                  <App_Text variant="tableCellMuted" className=" text-xs">
                    {step.description}
                  </App_Text>
                </div>
              </button>
            );
          })}
        </div>

        {/* Progress */}
        <div className="mt-4 px-2">
          <div className="flex items-center justify-between mb-1.5">
            <App_Text variant="tableCellMuted">Progress</App_Text>
            <App_Text
              variant="tableCellMuted"
              className="text-primary font-medium"
            >
              {Math.round((completedSteps.length / steps.length) * 100)}%
            </App_Text>
          </div>
          <div className="h-1.5 bg-[#f5f2ee] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{
                width: `${(completedSteps.length / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Stepper;
