"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { ChevronRight, Camera } from "lucide-react";
import Image from "next/image";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import Settings_Mobile_Nav from "./store_information_components/Settings_Mobile_Nav";
import Settings_Sidebar_Nav from "./store_information_components/Settings_Sidebar_Nav";
import {
  useUpdateStoreDetails,
  useUpdateBusinessInfo,
} from "./store_information_hooks/useStoreInformationMutation";
import { useStoreInformation } from "./store_information_hooks/useStoreInformationQueries";
import { StoreDetails, BusinessInfo } from "./store_information_types";
import App_Loader from "@/components/app_ui/App_Loader";

const currencyOptions = [
  {
    label: "ZAR (R) - South African Rand",
    key: "ZAR (R) - South African Rand",
  },
  { label: "USD ($) - US Dollar", key: "USD ($) - US Dollar" },
  { label: "EUR (€) - Euro", key: "EUR (€) - Euro" },
];

const timezoneOptions = [
  {
    label: "(GMT+02:00) South Africa Standard Time",
    key: "(GMT+02:00) South Africa Standard Time",
  },
  { label: "(GMT+00:00) UTC", key: "(GMT+00:00) UTC" },
  {
    label: "(GMT+01:00) West Africa Time",
    key: "(GMT+01:00) West Africa Time",
  },
];

const businessTypeOptions = [
  { label: "Sole Proprietorship", key: "Sole Proprietorship" },
  { label: "Partnership", key: "Partnership" },
  { label: "Private Company (Pty Ltd)", key: "Private Company (Pty Ltd)" },
  { label: "Non-Profit", key: "Non-Profit" },
];

const Store_Information_View = () => {
  const { data, isLoading } = useStoreInformation();
  const { mutate: updateStoreDetails, isPending: isSavingStore } =
    useUpdateStoreDetails();
  const { mutate: updateBusinessInfo, isPending: isSavingBusiness } =
    useUpdateBusinessInfo();

  const storeForm = useForm<StoreDetails>();
  const businessForm = useForm<BusinessInfo>();

  useEffect(() => {
    if (data) {
      storeForm.reset(data.storeDetails);
      businessForm.reset(data.businessInfo);
    }
  }, [data]);

  const currencyValue = storeForm.watch("currency") ?? "";
  const timezoneValue = storeForm.watch("timezone") ?? "";
  const businessTypeValue = businessForm.watch("businessType") ?? "";
  const description = storeForm.watch("storeDescription") ?? "";

  const onSaveStore = (formData: StoreDetails) => updateStoreDetails(formData);
  const onSaveBusiness = (formData: BusinessInfo) =>
    updateBusinessInfo(formData);

  return (
    <div className="">
      <div className="flex gap-6 items-start">
        {/* <Settings_Sidebar_Nav /> */}

        <div className="flex-1 min-w-0 space-y-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-1.5">
            <Link href="/dashboard/settings">
              <App_Text
                variant="tableCellMuted"
                className="hover:text-primary cursor-pointer"
              >
                Settings
              </App_Text>
            </Link>
            <ChevronRight size={13} className="text-muted-foreground" />
            <App_Text variant="tableCellMuted" className="text-[text]">
              Store Information
            </App_Text>
          </div>

          <Settings_Mobile_Nav />

          <div className="flex items-center justify-between">
            <div>
              <App_Text variant="pageTitle">Store Information</App_Text>
              <App_Text variant="pageSub">
                Update your store details and contact information.
              </App_Text>
            </div>
          </div>

          {isLoading || !data ? (
            <App_Loader label="Loading store information..." />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Store Details */}
              <form
                onSubmit={storeForm.handleSubmit(onSaveStore)}
                className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-4"
              >
                <App_Text variant="cardHeading">Store Details</App_Text>

                {/* Logo */}
                <div className="space-y-1.5">
                  <App_Text variant="tableCellMuted">Store Logo</App_Text>
                  <div className="flex items-center gap-3">
                    <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center overflow-hidden flex-shrink-0">
                      <Image
                        src={data.storeDetails.logo}
                        alt="Logo"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <App_Button
                        text="Change Logo"
                        icon={<Camera size={13} />}
                        type="button"
                        btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-2 h-auto"
                      />
                      <App_Text variant="tableCellMuted" className="mt-1">
                        PNG, JPG or SVG. Max size 2MB.
                      </App_Text>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <App_Input
                    name="storeName"
                    register={storeForm.register}
                    errors={storeForm.formState.errors}
                    placeholder="Store Name"
                    rules={{ required: "Store name is required" }}
                  />
                  <App_Input
                    name="storeEmail"
                    register={storeForm.register}
                    errors={storeForm.formState.errors}
                    placeholder="Store Email"
                    rules={{ required: "Store email is required" }}
                  />
                </div>

                <App_Input
                  name="phoneNumber"
                  register={storeForm.register}
                  errors={storeForm.formState.errors}
                  placeholder="Phone Number"
                />

                <div className="space-y-1.5">
                  <App_Text variant="tableCell" className="font-medium">
                    Store Address
                  </App_Text>
                  <App_Text_Area
                    name="storeAddress"
                    register={storeForm.register}
                    errors={storeForm.formState.errors}
                    placeholder="Store address"
                    className="min-h-[60px]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <App_Select
                    data={currencyOptions}
                    value={currencyValue}
                    placeholder="Select currency"
                    title="Currency"
                    onChange={(val) => storeForm.setValue("currency", val)}
                    style="gap-1.5"
                  />
                  <App_Select
                    data={timezoneOptions}
                    value={timezoneValue}
                    placeholder="Select timezone"
                    title="Timezone"
                    onChange={(val) => storeForm.setValue("timezone", val)}
                    style="gap-1.5"
                  />
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <App_Text variant="tableCell" className="font-medium">
                      Store Description
                    </App_Text>
                    <App_Text variant="tableCellMuted">
                      {description.length} / 200
                    </App_Text>
                  </div>
                  <App_Text_Area
                    name="storeDescription"
                    register={storeForm.register}
                    errors={storeForm.formState.errors}
                    placeholder="Describe your store..."
                    rules={{
                      maxLength: { value: 200, message: "Max 200 characters" },
                    }}
                  />
                </div>

                <App_Button
                  text={isSavingStore ? "Saving..." : "Save Changes"}
                  type="submit"
                  btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2.5 h-auto"
                />
              </form>

              {/* Business Information */}
              <form
                onSubmit={businessForm.handleSubmit(onSaveBusiness)}
                className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-4"
              >
                <App_Text variant="cardHeading">Business Information</App_Text>

                <App_Select
                  data={businessTypeOptions}
                  value={businessTypeValue}
                  placeholder="Select business type"
                  title="Business Type"
                  onChange={(val) => businessForm.setValue("businessType", val)}
                  style="gap-1.5"
                />

                <App_Input
                  name="ownerName"
                  register={businessForm.register}
                  errors={businessForm.formState.errors}
                  placeholder="Owner Name"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <App_Input
                    name="registrationNo"
                    register={businessForm.register}
                    errors={businessForm.formState.errors}
                    placeholder="Business Registration No."
                  />
                  <App_Input
                    name="tin"
                    register={businessForm.register}
                    errors={businessForm.formState.errors}
                    placeholder="Tax Identification No."
                  />
                </div>

                <div className="space-y-3 pt-2 border-t border-[#ede8e2]">
                  <App_Text variant="tableCell" className="font-medium">
                    Social Media Links
                  </App_Text>
                  <App_Input
                    name="website"
                    register={businessForm.register}
                    errors={businessForm.formState.errors}
                    placeholder="Website"
                  />
                  <App_Input
                    name="facebook"
                    register={businessForm.register}
                    errors={businessForm.formState.errors}
                    placeholder="Facebook"
                  />
                  <App_Input
                    name="instagram"
                    register={businessForm.register}
                    errors={businessForm.formState.errors}
                    placeholder="Instagram"
                  />
                  <App_Input
                    name="twitter"
                    register={businessForm.register}
                    errors={businessForm.formState.errors}
                    placeholder="Twitter / X"
                  />
                </div>

                <App_Button
                  text={isSavingBusiness ? "Saving..." : "Save Changes"}
                  type="submit"
                  btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2.5 h-auto"
                />
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Store_Information_View;
