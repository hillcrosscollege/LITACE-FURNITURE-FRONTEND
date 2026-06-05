// app/dashboard/products/add/page.tsx
"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import Step_Basic_Info from "./add_product_components/Basic_Information";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Step_Images from "./add_product_components/Add_Images";
import Product_Stepper from "./add_product_components/Add_Product_Stepper";
import Step_SEO from "./add_product_components/Add_Seo";
import Step_Shipping from "./add_product_components/Add_Shipping";
import Step_Variants from "./add_product_components/Variants";
import { ProductFormData } from "./add_product_types";
import Step_Pricing from "./add_product_components/Pricing_Inventory";
import { steps } from "./add_product_data/add_product_data";

const stepComponents = [
  Step_Basic_Info,
  Step_Pricing,
  Step_Variants,
  Step_Images,
  Step_Shipping,
  Step_SEO,
];

const Add_Product_View = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const router = useRouter();

  const form = useForm<ProductFormData>({
    defaultValues: {
      trackInventory: true,
      allowBackorders: false,
      hasVariants: false,
      freeShipping: false,
    },
  });

  const { handleSubmit, trigger } = form;

  const CurrentStepComponent = stepComponents[currentStep - 1];

  const goNext = async () => {
    const valid = await trigger();
    if (!valid) return;
    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep],
    );
    if (currentStep < steps.length) setCurrentStep((s) => s + 1);
  };

  const goBack = () => {
    if (currentStep > 1) setCurrentStep((s) => s - 1);
  };

  const onSubmit = (data: ProductFormData) => {
    console.log("Product data:", data);
    router.push("/dashboard/products");
  };

  const saveAsDraft = () => {
    console.log("Saved as draft:", form.getValues());
    router.push("/dashboard/products");
  };

  return (
    <div className="">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <App_Text variant="pageTitle">Add Product</App_Text>
          <App_Text variant="pageSub">
            Create a new product for your store.
          </App_Text>
        </div>
        <App_Button
          text="Save as Draft"
          icon={<Save size={13} />}
          onPress={saveAsDraft}
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6 items-start">
          {/* Stepper */}
          <Product_Stepper
            steps={steps}
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={setCurrentStep}
          />

          {/* Step content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-6">
              {/* Mobile step indicator */}
              <div className="lg:hidden flex items-center gap-2 mb-4 pb-4 border-b border-[#ede8e2]">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold flex-shrink-0">
                  {currentStep}
                </div>
                <App_Text variant="cardHeading">
                  {steps[currentStep - 1].label}
                </App_Text>
                <App_Text variant="tableCellMuted" className="ml-auto">
                  {currentStep}/{steps.length}
                </App_Text>
              </div>

              <CurrentStepComponent form={form} />

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#ede8e2]">
                <App_Button
                  text="Cancel"
                  onPress={() => router.push("/dashboard/products")}
                  btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
                />

                <div className="flex items-center gap-2">
                  {currentStep > 1 && (
                    <App_Button
                      text="Back"
                      icon={<ChevronLeft size={14} />}
                      onPress={goBack}
                      btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
                    />
                  )}
                  {currentStep < steps.length ? (
                    <App_Button
                      text="Next"
                      icon={<ChevronRight size={14} />}
                      onPress={goNext}
                      btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                    />
                  ) : (
                    <App_Button
                      text="Publish Product"
                      icon={<ChevronRight size={14} />}
                      btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Add_Product_View;
