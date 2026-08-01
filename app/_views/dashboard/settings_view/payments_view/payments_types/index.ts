export type PaymentMethod = {
  id: string;
  gateway: string;
  displayName: string;
  description: string;
  icon: string; // lucide icon key, mapped in component
  status: boolean;
  isManual: boolean; // manual methods (Bank Transfer, COD) vs gateway integrations
};

export type AddPaymentMethodPayload = {
  gateway: string;
  displayName: string;
  description: string;
  status: boolean;
};
