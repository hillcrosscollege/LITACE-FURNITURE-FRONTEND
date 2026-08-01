"use client";

import App_Text from "@/components/app_ui/App_Text";
import { Check } from "lucide-react";
import { useProductContext } from "@/app/contexts/admin/Product_Context";
import { steps } from "../add_product_data/add_product_data";
import { useMemo } from "react";
import Step_Basic_Info from "./Basic_Information";
import Step_Pricing from "./Pricing_Inventory";
import Step_Variants from "./Variants";
import Step_Images from "./Add_Images";
import Step_Shipping from "./Add_Shipping";

const Product_Stepper = () => {
  const { currentStep, completedSteps, setCurrentStep, form, visibleSteps } =
    useProductContext();
  const { watch } = form;
  const hasVariants = watch("hasVariants");

  /**
   * Only display steps whose condition is true
   */
  // const visibleSteps = useMemo(() => {
  //   return allSteps.filter((step) => step.condition);
  // }, [allSteps]);

  return (
    <div className="w-64 shrink-0 hidden lg:block">
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-4 sticky top-6">
        <App_Text variant="cardHeading" className="mb-4 px-2">
          Add Product
        </App_Text>

        <div className="flex flex-col gap-1">
          {visibleSteps.map((step, i) => {
            const isActive = currentStep === step.id;
            const isCompleted = completedSteps.includes(step.id);
            const isAccessible = step.id <= currentStep || isCompleted;

            return (
              <button
                key={step.id}
                type="button"
                onClick={() => isAccessible && setCurrentStep(step.id)}
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
              {Math.round((completedSteps.length / visibleSteps.length) * 100)}%
            </App_Text>
          </div>
          <div className="h-1.5 bg-[#f5f2ee] rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{
                width: `${(completedSteps.length / visibleSteps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product_Stepper;
