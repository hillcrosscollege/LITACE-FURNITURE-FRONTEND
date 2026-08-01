export type ShippingMethod = {
  id: string;
  name: string;
  description: string;
  deliveryTime: string;
  status: "Active" | "Inactive";
};

export type ShippingZone = {
  id: string;
  name: string;
  regions: string[]; // South African provinces/cities covered
  status: "Active" | "Inactive";
};

export type ShippingRate = {
  id: string;
  methodId: string;
  methodName: string;
  zoneId: string;
  zoneName: string;
  rate: number;
  freeAbove?: number; // free shipping threshold, optional
};

export type AddShippingMethodPayload = {
  name: string;
  description: string;
  deliveryTime: string;
  status: boolean;
};

export type AddShippingZonePayload = {
  name: string;
  regions: string[];
  status: boolean;
};
