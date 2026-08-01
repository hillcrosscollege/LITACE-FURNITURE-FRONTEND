import { PaymentMethod, AddPaymentMethodPayload } from "../payments_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakePaymentMethods: PaymentMethod[] = [
  {
    id: "1",
    gateway: "paystack",
    displayName: "Paystack",
    description: "paystack",
    icon: "credit-card",
    status: true,
    isManual: false,
  },
  {
    id: "2",
    gateway: "flutterwave",
    displayName: "Flutterwave",
    description: "flutterwave",
    icon: "zap",
    status: true,
    isManual: false,
  },
  {
    id: "3",
    gateway: "bank_transfer",
    displayName: "Bank Transfer",
    description: "Bank_transfer",
    icon: "building",
    status: true,
    isManual: true,
  },
  {
    id: "4",
    gateway: "cod",
    displayName: "Cash on Delivery",
    description: "cod",
    icon: "truck",
    status: true,
    isManual: true,
  },
  {
    id: "5",
    gateway: "stripe",
    displayName: "Stripe",
    description: "stripe",
    icon: "credit-card",
    status: false,
    isManual: false,
  },
];

export const gatewayOptions = [
  { label: "Paystack", key: "paystack" },
  { label: "Flutterwave", key: "flutterwave" },
  { label: "Stripe", key: "stripe" },
  { label: "PayFast", key: "payfast" },
  { label: "Yoco", key: "yoco" },
  { label: "Bank Transfer", key: "bank_transfer" },
  { label: "Cash on Delivery", key: "cod" },
];

export const paymentMethodsApi = {
  getPaymentMethods: async (): Promise<PaymentMethod[]> => {
    await delay(1000);
    return fakePaymentMethods;
  },

  addPaymentMethod: async (
    payload: AddPaymentMethodPayload,
  ): Promise<PaymentMethod> => {
    await delay(800);
    return {
      id: String(Date.now()),
      gateway: payload.gateway,
      displayName: payload.displayName,
      description: payload.description,
      icon: "credit-card",
      status: payload.status,
      isManual: ["bank_transfer", "cod"].includes(payload.gateway),
    };
  },

  toggleStatus: async (id: string, status: boolean): Promise<void> => {
    await delay(500);
    console.log("Toggle payment method:", { id, status });
  },

  deleteMethod: async (id: string): Promise<void> => {
    await delay(700);
    console.log("Delete payment method:", id);
  },
};
