"use client";
import { useRouter } from "next/navigation";
import { ChevronLeft, ChevronRight, Save } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Product_Stepper from "./add_product_components/Add_Product_Stepper";
// import { steps } from "./add_product_data/add_product_data";
import { useProductContext } from "@/app/contexts/admin/Product_Context";
import { ProductFormData } from "./add_product_types";
import { useAddProduct } from "../product_hook/useProductMutation";

const Add_Product_View = () => {
  const router = useRouter();
  const {
    currentStep,
    CurrentStepComponent,
    goNext,
    goBack,
    handleSubmit,
    // onSubmit,
    saveAsDraft,
    visibleSteps,
    reset,
  } = useProductContext();

  const { mutate, error, isPending } = useAddProduct(reset);

  const onSubmit = (data: ProductFormData) => {
    const payload = {
      ...data,
      price: data.hasVariants ? 0 : data.price,

      variantAttributes: buildVariantAttributes(data.variants),

      variants: data?.variants
        ? data.variants.map((variant) => ({
            name: variant.label,
            sku: variant.sku,
            price: Number(variant.price),
            stock: Number(variant.stock),
            attributes: variant.combination,
          }))
        : null,
    };

    mutate(payload);
  };

  function buildVariantAttributes(variants: ProductFormData["variants"]) {
    const map = new Map<string, Set<string>>();

    variants?.forEach((variant) => {
      Object.entries(variant.combination).forEach(([key, value]) => {
        if (!map.has(key)) {
          map.set(key, new Set());
        }
        map.get(key)!.add(value);
      });
    });

    return Array.from(map.entries()).map(([name, values]) => ({
      name,
      values: Array.from(values),
    }));
  }

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
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-6 items-start">
          {/* Stepper */}
          <Product_Stepper />

          {/* Step content */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-6">
              {/* Mobile step indicator */}
              <div className="lg:hidden flex items-center gap-2 mb-4 pb-4 border-b border-[#ede8e2]">
                <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-semibold shrink-0">
                  {currentStep}
                </div>
                <App_Text variant="cardHeading">
                  {visibleSteps[currentStep - 1].label}
                </App_Text>
                <App_Text variant="tableCellMuted" className="ml-auto">
                  {currentStep}/{visibleSteps.length}
                </App_Text>
              </div>

              <CurrentStepComponent />

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#ede8e2]">
                <App_Button
                  text="Cancel"
                  onPress={() => router.push("/dashboard/products")}
                  btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
                />

                <div className="flex items-center gap-2">
                  {currentStep > 1 && (
                    <App_Button
                      text="Back"
                      icon={<ChevronLeft size={14} />}
                      onPress={goBack}
                      btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
                    />
                  )}
                  {currentStep < visibleSteps.length && (
                    <App_Button
                      text="Next"
                      type="button"
                      icon={<ChevronRight size={14} />}
                      onPress={goNext}
                      btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                    />
                  )}
                  {currentStep == visibleSteps.length && (
                    <App_Button
                      text={isPending ? "Submitting" : "Publish Product"}
                      type="submit"
                      disabled={isPending}
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
