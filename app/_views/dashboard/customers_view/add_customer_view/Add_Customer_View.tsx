"use client";

import Link from "next/link";
import { ChevronRight, ArrowLeft, ArrowRight, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import Add_Customer_Success from "./add_customer_components/Add_Customer_Success";
import Customer_Stepper from "./add_customer_components/Customer_Stepper";
import Customer_Stepper_Mobile from "./add_customer_components/Customer_Stepper_Mobile";
import App_Double_Text from "@/components/shared/App_Double_Text";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";

const Add_Customer_View = () => {
  const router = useRouter();
  const {
    currentStep,
    completedSteps,
    goNext,
    goBack,
    goToStep,
    handleSave,
    isPending,
    isSuccess,
    createdCustomer,
    handleAddAnother,
    handleViewCustomer,
    renderStep,
  } = useCustomerContext();

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-6">
        <Link href="/dashboard/customers">
          <App_Text
            variant="tableCellMuted"
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Customers
          </App_Text>
        </Link>
        <ChevronRight size={13} className="text-muted-foreground" />
        <App_Text variant="tableCellMuted" className="text-[#1e1a17]">
          Add Customer
        </App_Text>
      </div>

      {/* Page header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <App_Text variant="pageTitle">Add Customer</App_Text>
          <App_Text variant="pageSub">
            Create a new customer and add their details.
          </App_Text>
        </div>
        {/* <App_Double_Text header={} para={} /> */}
        <App_Button
          text="Cancel"
          type="button"
          onPress={() => {
            handleAddAnother();
            router.push("/dashboard/customers");
          }}
          btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
        />
      </div>

      {/* Success state */}
      {isSuccess ? (
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm">
          <Add_Customer_Success
            customer={createdCustomer}
            onAddAnother={handleAddAnother}
            onViewCustomer={handleViewCustomer}
          />
        </div>
      ) : (
        <div className="flex gap-6 items-start">
          {/* Vertical stepper — desktop only */}
          <Customer_Stepper
            currentStep={currentStep}
            completedSteps={completedSteps}
            onStepClick={goToStep}
          />

          {/* Form card */}
          <div className="flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-6">
              {/* Mobile stepper */}
              <Customer_Stepper_Mobile
                currentStep={currentStep}
                completedSteps={completedSteps}
              />

              {/* Step content */}
              <div className="mt-4 lg:mt-0">{renderStep()}</div>

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#ede8e2]">
                <App_Button
                  text="Previous"
                  icon={<ArrowLeft size={14} />}
                  type="button"
                  onPress={goBack}
                  btnStyle={`text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto ${
                    currentStep === 1 ? "invisible" : ""
                  }`}
                />

                {currentStep < 4 ? (
                  <App_Button
                    text="Next Step"
                    icon={<ArrowRight size={14} />}
                    type="button"
                    onPress={goNext}
                    btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                  />
                ) : (
                  <App_Button
                    text={isPending ? "Saving..." : "Save Customer"}
                    icon={<Save size={14} />}
                    type="button"
                    onPress={handleSave}
                    btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Add_Customer_View;
