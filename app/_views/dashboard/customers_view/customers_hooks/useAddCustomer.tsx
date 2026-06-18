"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import {
  AddCustomerStep,
  BasicInfoForm,
  AddressInfoForm,
  AdditionalInfoForm,
} from "../customers_types";
import Step1_Basic from "../add_customer_view/add_customer_components/Step1_Basic";
import Step2_Address from "../add_customer_view/add_customer_components/Step2_Address";
import Step3_Additional from "../add_customer_view/add_customer_components/Step3_Additional";
import Step4_Review from "../add_customer_view/add_customer_components/Step4_Review";

export const useAddCustomer = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<AddCustomerStep>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdCustomer, setCreatedCustomer] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);

  const basicForm = useForm<BasicInfoForm>({
    defaultValues: {
      countryCode: "+234",
      status: "Active",
    },
  });

  const addressForm = useForm<AddressInfoForm>({
    defaultValues: { country: "Nigeria" },
  });

  const additionalForm = useForm<AdditionalInfoForm>({
    defaultValues: { sendWelcomeEmail: true },
  });

  const goNext = useCallback(async () => {
    let valid = false;

    if (currentStep === 1) valid = await basicForm.trigger();
    else if (currentStep === 2)
      valid = await addressForm.trigger([
        "address",
        "city",
        "state",
        "country",
      ]);
    else if (currentStep === 3) valid = true;

    if (!valid) return;

    setCompletedSteps((prev) =>
      prev.includes(currentStep) ? prev : [...prev, currentStep],
    );
    if (currentStep < 4) setCurrentStep((s) => (s + 1) as AddCustomerStep);
  }, [currentStep, basicForm, addressForm]);

  const goBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as AddCustomerStep);
  }, [currentStep]);

  const goToStep = useCallback(
    (step: number) => {
      if (completedSteps.includes(step) || step === currentStep) {
        setCurrentStep(step as AddCustomerStep);
      }
    },
    [completedSteps, currentStep],
  );

  const handleSave = useCallback(async () => {
    setIsPending(true);
    // Simulate a small delay for UX feedback
    await new Promise((res) => setTimeout(res, 800));
    setIsPending(false);

    const data = {
      basic: basicForm.getValues(),
      address: addressForm.getValues(),
      additional: additionalForm.getValues(),
    };

    // Build a local customer object from form data
    setCreatedCustomer({
      id: String(Date.now()),
      name: data.basic.fullName,
      email: data.basic.email,
      phone: `${data.basic.countryCode} ${data.basic.phone}`,
      status: data.basic.status,
      gender: data.basic.gender,
      dateOfBirth: data.basic.dateOfBirth,
      joinedOn: new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      }),
      customerId: `CUS-${Math.floor(Math.random() * 9000 + 1000)}`,
    });
    setIsSuccess(true);
  }, [basicForm, addressForm, additionalForm]);

  const handleAddAnother = useCallback(() => {
    basicForm.reset();
    addressForm.reset();
    additionalForm.reset();
    setCurrentStep(1);
    setCompletedSteps([]);
    setIsSuccess(false);
    setCreatedCustomer(null);
  }, [basicForm, addressForm, additionalForm]);

  const handleViewCustomer = useCallback(() => {
    if (createdCustomer?.id) {
      router.push(`/dashboard/customers/${createdCustomer.id}`);
    }
  }, [createdCustomer, router]);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Step1_Basic form={basicForm} />;
      case 2:
        return <Step2_Address form={addressForm} />;
      case 3:
        return <Step3_Additional form={additionalForm} />;
      case 4:
        return (
          <Step4_Review
            basic={basicForm.getValues()}
            address={addressForm.getValues()}
            additional={additionalForm.getValues()}
            onEdit={goToStep}
          />
        );
    }
  };

  return {
    currentStep,
    completedSteps,
    goNext,
    goBack,
    goToStep,
    basicForm,
    addressForm,
    additionalForm,
    handleSave,
    isPending,
    isSuccess,
    createdCustomer,
    handleAddAnother,
    handleViewCustomer,
    renderStep,
  };
};
