import {
  SystemSummary,
  StoreInformation,
  StoreDetails,
  BusinessInfo,
} from "../store_information_types";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const fakeSystemSummary: SystemSummary = {
  adminUsers: 5,
  roles: 3,
  permissions: 28,
  emailTemplates: 12,
  lastBackup: "19 May 2024, 02:30 AM",
  systemStatus: "Healthy",
};

export const fakeStoreInformation: StoreInformation = {
  storeDetails: {
    logo: "/conference_chair-2.png",
    storeName: "Litace Furniture Store",
    storeEmail: "info@litace.co.za",
    phoneNumber: "+27 81 234 5678",
    storeAddress: "21 Freedom Way, Sandton, Johannesburg, 2196",
    storeDescription:
      "We provide premium quality furniture for your home and office.",
    currency: "ZAR (R) - South African Rand",
    timezone: "(GMT+02:00) South Africa Standard Time",
  },
  businessInfo: {
    businessType: "Sole Proprietorship",
    ownerName: "John Doe",
    registrationNo: "2021/123456/07",
    tin: "9876543210",
    website: "https://litace.co.za",
    facebook: "https://facebook.com/litace",
    instagram: "https://instagram.com/litace",
    twitter: "https://twitter.com/litace",
  },
};

export const settingsApi = {
  getSystemSummary: async (): Promise<SystemSummary> => {
    await delay(900);
    return fakeSystemSummary;
  },

  getStoreInformation: async (): Promise<StoreInformation> => {
    await delay(1000);
    return fakeStoreInformation;
  },

  updateStoreDetails: async (data: StoreDetails): Promise<StoreDetails> => {
    await delay(800);
    return data;
  },

  updateBusinessInfo: async (data: BusinessInfo): Promise<BusinessInfo> => {
    await delay(800);
    return data;
  },
};
