"use client";

import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Link from "next/link";
import { ChevronRight as BreadcrumbArrow } from "lucide-react";
import { useRouter } from "next/navigation";
import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import { useCreateOrder } from "../order_hooks/useCreateOrder";
import Order_Stepper from "./create_order_components/Order_Stepper";
import Step_Customer from "./create_order_components/Step_Customer";
import Step_Items from "./create_order_components/Step_Items";
import Step_Payment from "./create_order_components/Step_Payment";
import Step_Review from "./create_order_components/Step_Review";
import Step_Shipping from "./create_order_components/Step_Shipping";
import Create_Order_Success from "./create_order_components/Create_Order_Success";

const Create_Order_View = () => {
  const router = useRouter();
  const {
    currentStep,
    completedSteps,
    goNext,
    goBack,
    selectedCustomer,
    selectCustomer,
    orderItems,
    addItem,
    removeItem,
    updateQty,
    shippingForm,
    deliveryMethod,
    setDeliveryMethod,
    paymentForm,
    paymentMethod,
    setPaymentMethod,
    subtotal,
    shippingFee,
    tax,
    total,
    handleSubmit,
    isSuccess,
    createdOrder,
    resetOrder,
  } = useCreateOrder();

  const canGoNext = () => {
    if (currentStep === 1) return !!selectedCustomer;
    if (currentStep === 2) return orderItems.length > 0;
    return true;
  };

  const handleNext = async () => {
    if (currentStep === 3) {
      const valid = await shippingForm.trigger();
      if (!valid) return;
    }
    goNext();
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step_Customer
            selectedCustomer={selectedCustomer}
            onSelect={selectCustomer}
          />
        );
      case 2:
        return (
          <Step_Items
            orderItems={orderItems}
            onAdd={addItem}
            onRemove={removeItem}
            onUpdateQty={updateQty}
            subtotal={subtotal}
            tax={tax}
            total={total}
          />
        );
      case 3:
        return (
          <Step_Shipping
            form={shippingForm}
            deliveryMethod={deliveryMethod}
            onMethodChange={setDeliveryMethod}
          />
        );
      case 4:
        return (
          <Step_Payment
            form={paymentForm}
            paymentMethod={paymentMethod}
            onMethodChange={setPaymentMethod}
            subtotal={subtotal}
            shippingFee={shippingFee}
            tax={tax}
            total={total}
          />
        );
      case 5:
        return (
          <Step_Review
            customer={selectedCustomer}
            orderItems={orderItems}
            shippingData={shippingForm.getValues()}
            paymentData={paymentForm.getValues()}
            deliveryMethod={deliveryMethod}
            paymentMethod={paymentMethod}
            subtotal={subtotal}
            shippingFee={shippingFee}
            tax={tax}
            total={total}
          />
        );
    }
  };

  if (isSuccess) {
    return (
      <div className="p-4 md:p-6">
        <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm">
          <Create_Order_Success
            order={createdOrder}
            onAddAnother={resetOrder}
            onViewOrder={
              () => router.push(`/dashboard/orders`)
              // router.push(`/dashboard/orders/${createdOrder?.id}`)
            }
          />
        </div>
      </div>
    );
  }

  return (
    <div className="">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 mb-4">
        <Link href="/dashboard/orders">
          <App_Text
            variant="tableCellMuted"
            className="hover:text-primary cursor-pointer transition-colors"
          >
            Orders
          </App_Text>
        </Link>
        <BreadcrumbArrow size={13} className="text-muted-foreground" />
        <App_Text variant="tableCellMuted" className="text-[#1e1a17]">
          Create Order
        </App_Text>
      </div>

      {/* Header */}
      <div className="mb-6">
        <App_Text variant="pageTitle">Create Order</App_Text>
        <App_Text variant="pageSub">
          Create a new order for a customer.
        </App_Text>
      </div>

      {/* Stepper */}
      <Order_Stepper
        currentStep={currentStep}
        completedSteps={completedSteps}
      />

      {/* Step content */}
      <div className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-6">
        {renderStep()}

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#ede8e2]">
          <App_Button
            text="Cancel"
            type="button"
            onPress={() => router.push("/dashboard/orders")}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
          />

          <div className="flex items-center gap-2">
            {currentStep > 1 && (
              <App_Button
                text="Back"
                icon={<ChevronLeft size={14} />}
                type="button"
                onPress={goBack}
                btnStyle="text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-lg px-4 py-2 h-auto"
              />
            )}

            {currentStep < 5 ? (
              <App_Button
                text="Next"
                icon={<ChevronRight size={14} />}
                type="button"
                onPress={handleNext}
                btnStyle={`text-xs rounded-lg px-4 py-2 h-auto ${
                  canGoNext()
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "bg-[#f5f2ee] text-muted-foreground cursor-not-allowed"
                }`}
              />
            ) : (
              <App_Button
                text="Place Order"
                icon={<Check size={14} />}
                type="button"
                onPress={handleSubmit}
                btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2 h-auto"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Create_Order_View;
