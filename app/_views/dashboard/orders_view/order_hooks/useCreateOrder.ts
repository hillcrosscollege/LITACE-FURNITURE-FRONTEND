"use client";

import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useSubmitOrder } from "./useCreateOrderApi";
import {
  OrderProduct,
  OrderCustomer,
  CreateOrderItem,
  CreateOrderStep,
  PaymentForm,
  ShippingForm,
} from "../order_view_types";

const SHIPPING_COSTS: Record<string, number> = {
  standard: 15000,
  express: 30000,
  pickup: 0,
};

const TAX_RATE = 0.075;

export const useCreateOrder = () => {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState<CreateOrderStep>(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [selectedCustomer, setSelectedCustomer] =
    useState<OrderCustomer | null>(null);
  const [orderItems, setOrderItems] = useState<CreateOrderItem[]>([]);
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("bank_transfer");
  const [createdOrder, setCreatedOrder] = useState<any>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const shippingForm = useForm<ShippingForm>({
    defaultValues: { deliveryMethod: "standard" },
  });
  const paymentForm = useForm<PaymentForm>({
    defaultValues: { paymentMethod: "bank_transfer" },
  });

  const { mutate: submitOrder, isPending } = useSubmitOrder();

  // Computed totals
  const subtotal = orderItems.reduce((s, i) => s + i.price * i.qty, 0);
  const shippingFee = SHIPPING_COSTS[deliveryMethod] ?? 15000;
  const tax = Math.round(subtotal * TAX_RATE);
  const total = subtotal + shippingFee + tax;

  const goNext = useCallback(
    async (validate?: () => Promise<boolean>) => {
      if (validate) {
        const valid = await validate();
        if (!valid) return;
      }
      setCompletedSteps((prev) =>
        prev.includes(currentStep) ? prev : [...prev, currentStep],
      );
      if (currentStep < 5) setCurrentStep((s) => (s + 1) as CreateOrderStep);
    },
    [currentStep],
  );

  const goBack = useCallback(() => {
    if (currentStep > 1) setCurrentStep((s) => (s - 1) as CreateOrderStep);
  }, [currentStep]);

  const selectCustomer = useCallback((customer: OrderCustomer) => {
    setSelectedCustomer(customer);
  }, []);

  const addItem = useCallback((product: OrderProduct) => {
    setOrderItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing)
        return prev.map((i) =>
          i.id === product.id ? { ...i, qty: i.qty + 1 } : i,
        );
      return [...prev, { ...product, qty: 1 }];
    });
  }, []);

  const removeItem = useCallback(
    (id: string) => setOrderItems((prev) => prev.filter((i) => i.id !== id)),
    [],
  );
  const updateQty = useCallback((id: string, qty: number) => {
    if (qty < 1) return;
    setOrderItems((prev) => prev.map((i) => (i.id === id ? { ...i, qty } : i)));
  }, []);

  const handleSubmit = useCallback(() => {
    if (!selectedCustomer) return;
    const shippingData = shippingForm.getValues();
    const paymentData = paymentForm.getValues();

    submitOrder(
      {
        customerId: selectedCustomer.id,
        items: orderItems.map((i) => ({
          productId: i.id,
          qty: i.qty,
          price: i.price,
        })),
        deliveryMethod,
        shippingAddress: {
          fullName: shippingData.fullName,
          address: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          phone: shippingData.phone,
        },
        paymentMethod,
        note: paymentData.note ?? "",
        subtotal,
        shippingFee,
        tax,
        total,
      },
      {
        onSuccess: (order) => {
          setCreatedOrder(order);
          setIsSuccess(true);
        },
      },
    );
  }, [
    selectedCustomer,
    orderItems,
    deliveryMethod,
    paymentMethod,
    subtotal,
    shippingFee,
    tax,
    total,
    shippingForm,
    paymentForm,
    submitOrder,
  ]);

  const resetOrder = useCallback(() => {
    setCurrentStep(1);
    setCompletedSteps([]);
    setSelectedCustomer(null);
    setOrderItems([]);
    setDeliveryMethod("standard");
    setPaymentMethod("bank_transfer");
    setIsSuccess(false);
    shippingForm.reset();
    paymentForm.reset();
  }, [shippingForm, paymentForm]);

  return {
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
    isPending,
    isSuccess,
    createdOrder,
    resetOrder,
  };
};
