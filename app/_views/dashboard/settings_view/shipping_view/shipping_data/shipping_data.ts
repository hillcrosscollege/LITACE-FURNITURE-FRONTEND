import {
  ShippingMethod,
  ShippingZone,
  ShippingRate,
  AddShippingMethodPayload,
  AddShippingZonePayload,
} from "../shipping_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeShippingMethods: ShippingMethod[] = [
  {
    id: "1",
    name: "Standard Delivery",
    description: "3 - 5 business days",
    deliveryTime: "3 - 5 business days",
    status: "Active",
  },
  {
    id: "2",
    name: "Express Delivery",
    description: "1 - 2 business days",
    deliveryTime: "1 - 2 business days",
    status: "Active",
  },
  {
    id: "3",
    name: "Local Pickup",
    description: "Pick up from our store",
    deliveryTime: "Same day",
    status: "Active",
  },
  {
    id: "4",
    name: "Freight Delivery",
    description: "For large items",
    deliveryTime: "5 - 7 business days",
    status: "Active",
  },
];

export const fakeShippingZones: ShippingZone[] = [
  {
    id: "1",
    name: "Gauteng",
    regions: ["Johannesburg", "Pretoria", "Sandton", "Centurion"],
    status: "Active",
  },
  {
    id: "2",
    name: "Western Cape",
    regions: ["Cape Town", "Stellenbosch", "Paarl"],
    status: "Active",
  },
  {
    id: "3",
    name: "KwaZulu-Natal",
    regions: ["Durban", "Pietermaritzburg"],
    status: "Active",
  },
  {
    id: "4",
    name: "Rest of South Africa",
    regions: ["All other provinces"],
    status: "Active",
  },
];

export const fakeShippingRates: ShippingRate[] = [
  {
    id: "1",
    methodId: "1",
    methodName: "Standard Delivery",
    zoneId: "1",
    zoneName: "Gauteng",
    rate: 150,
    freeAbove: 5000,
  },
  {
    id: "2",
    methodId: "1",
    methodName: "Standard Delivery",
    zoneId: "2",
    zoneName: "Western Cape",
    rate: 250,
    freeAbove: 5000,
  },
  {
    id: "3",
    methodId: "1",
    methodName: "Standard Delivery",
    zoneId: "3",
    zoneName: "KwaZulu-Natal",
    rate: 220,
  },
  {
    id: "4",
    methodId: "1",
    methodName: "Standard Delivery",
    zoneId: "4",
    zoneName: "Rest of South Africa",
    rate: 300,
  },
  {
    id: "5",
    methodId: "2",
    methodName: "Express Delivery",
    zoneId: "1",
    zoneName: "Gauteng",
    rate: 350,
  },
  {
    id: "6",
    methodId: "2",
    methodName: "Express Delivery",
    zoneId: "2",
    zoneName: "Western Cape",
    rate: 450,
  },
  {
    id: "7",
    methodId: "4",
    methodName: "Freight Delivery",
    zoneId: "4",
    zoneName: "Rest of South Africa",
    rate: 600,
  },
];

export const shippingSettingsApi = {
  getShippingMethods: async (): Promise<ShippingMethod[]> => {
    await delay(1000);
    return fakeShippingMethods;
  },

  getShippingZones: async (): Promise<ShippingZone[]> => {
    await delay(900);
    return fakeShippingZones;
  },

  getShippingRates: async (): Promise<ShippingRate[]> => {
    await delay(900);
    return fakeShippingRates;
  },

  addShippingMethod: async (
    payload: AddShippingMethodPayload,
  ): Promise<ShippingMethod> => {
    await delay(800);
    return {
      id: String(Date.now()),
      name: payload.name,
      description: payload.description,
      deliveryTime: payload.deliveryTime,
      status: payload.status ? "Active" : "Inactive",
    };
  },

  toggleMethodStatus: async (
    id: string,
    status: "Active" | "Inactive",
  ): Promise<void> => {
    await delay(500);
    console.log("Toggle shipping method:", { id, status });
  },

  deleteMethod: async (id: string): Promise<void> => {
    await delay(700);
    console.log("Delete shipping method:", id);
  },

  addShippingZone: async (
    payload: AddShippingZonePayload,
  ): Promise<ShippingZone> => {
    await delay(800);
    return {
      id: String(Date.now()),
      name: payload.name,
      regions: payload.regions,
      status: payload.status ? "Active" : "Inactive",
    };
  },
};
