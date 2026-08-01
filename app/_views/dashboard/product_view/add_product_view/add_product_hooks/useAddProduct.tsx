"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo, ComponentType } from "react";
import { useForm } from "react-hook-form";

import {
  ProductAttribute,
  VariantCombination,
} from "../../products_data/product_types";

import Step_Images from "../add_product_components/Add_Images";
import Step_Shipping from "../add_product_components/Add_Shipping";
import Step_Basic_Info from "../add_product_components/Basic_Information";
import Step_Pricing from "../add_product_components/Pricing_Inventory";
import Step_Variants from "../add_product_components/Variants";

import { ProductFormData } from "../add_product_types";

export type Step = {
  id: number;
  label: string;
  description: string;
  component: ComponentType<any>;
  condition?: boolean;
};

const useAddProduct = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [attributes, setAttributes] = useState<ProductAttribute[]>([]);
  const [combinations, setCombinations] = useState<VariantCombination[]>([]);

  const router = useRouter();

  const form = useForm<ProductFormData>({
    defaultValues: {
      trackInventory: true,
      allowBackorders: false,
      hasVariants: false,
      freeShipping: false,
    },
  });
  const { handleSubmit, trigger, watch, setValue, reset } = form;
  const hasVariants = watch("hasVariants");

  const allSteps: Step[] = useMemo(
    () => [
      {
        id: 1,
        label: "Basic Information",
        description: "Product name, category & description",
        component: Step_Basic_Info,
        condition: true,
      },

      {
        id: 2,
        label: "Pricing & Inventory",
        description: "Price, cost & stock settings",
        component: Step_Pricing,
        condition: !hasVariants,
      },

      {
        id: 2,
        label: "Variants & Pricing",
        description: "Colors, sizes & materials",
        component: Step_Variants,
        condition: hasVariants,
      },

      {
        id: 3,
        label: "Images & Media",
        description: "Product photos & videos",
        component: Step_Images,
        condition: true,
      },

      {
        id: 4,
        label: "Shipping",
        description: "Weight, dimensions & shipping class",
        component: Step_Shipping,
        condition: true,
      },
    ],
    [hasVariants],
  );

  const visibleSteps = useMemo(() => {
    return allSteps.filter((step) => step.condition);
  }, [allSteps]);

  const CurrentStepComponent = useMemo(
    () => visibleSteps[currentStep - 1].component,
    [currentStep],
  );

  const onToggle = (value: boolean) => {
    setValue("hasVariants", value, {
      shouldValidate: true,
      shouldDirty: true,
    });
    setCompletedSteps([]);
  };

  const goNext = async () => {
    const valid = await trigger();

    if (!valid) return;

    if (currentStep === 2 && hasVariants) {
      const variants = form.getValues("variants") ?? [];
      const included = variants.filter((v) => v.included);

      if (included.length === 0) {
        // No combinations — can't proceed
        return;
      }
      const missingPrice = included.some((v) => !v.price || v.price <= 0);
      if (missingPrice) {
        // Some variants are missing prices — can't proceed
        return;
      }
    }

    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep],
    );

    if (currentStep < visibleSteps.length) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // const onSubmit = (data: ProductFormData) => {
  //   console.log("Product data:", data);
  //   // router.push("/dashboard/products");
  // };

  const saveAsDraft = () => {
    const data = form.getValues();

    console.log("Saved as draft:", data);

    router.push("/dashboard/products");
  };

  return {
    // Form
    form,
    handleSubmit,
    // onSubmit,
    saveAsDraft,
    reset,

    // Steps
    currentStep,
    setCurrentStep,
    completedSteps,
    CurrentStepComponent,
    // stepComponents,

    // Navigation
    goNext,
    goBack,

    // Variants
    hasVariants,
    // setHasVariants,
    attributes,
    setAttributes,
    combinations,
    setCombinations,
    allSteps,
    onToggle,
    visibleSteps,
  };
};

export default useAddProduct;
