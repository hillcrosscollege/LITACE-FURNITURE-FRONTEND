// types/settings-api.ts
export type SystemSummary = {
  adminUsers: number;
  roles: number;
  permissions: number;
  emailTemplates: number;
  lastBackup: string;
  systemStatus: "Healthy" | "Degraded" | "Down";
};

export type StoreDetails = {
  logo: string;
  storeName: string;
  storeEmail: string;
  phoneNumber: string;
  storeAddress: string;
  storeDescription: string;
  currency: string;
  timezone: string;
};

export type BusinessInfo = {
  businessType: string;
  ownerName: string;
  registrationNo: string;
  tin: string;
  website: string;
  facebook: string;
  instagram: string;
  twitter: string;
};

export type StoreInformation = {
  storeDetails: StoreDetails;
  businessInfo: BusinessInfo;
};
