"use client";

import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { UseFormReturn } from "react-hook-form";
import {
  addressTypes,
  nigerianStates,
  countries,
} from "../../cusomer_data/customer_data";
import { AddressInfoForm } from "../../customers_types";

type Props = { form: UseFormReturn<AddressInfoForm> };

const Step2_Address = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const addressTypeValue = watch("addressType") ?? "";
  const stateValue = watch("state") ?? "";
  const countryValue = watch("country") ?? "Nigeria";

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Address Information
        </App_Text>
        <App_Text variant="pageSub">
          Add the customer's address details.
        </App_Text>
      </div>
      <App_Select
        data={addressTypes}
        value={addressTypeValue}
        placeholder="Select address type"
        title="Address Type"
        onChange={(val) => setValue("addressType", val)}
        style="gap-1.5"
      />

      {/* Address textarea */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">
          Address <span className="text-[#c0392b]">*</span>
        </label>
        <App_Text_Area
          name="address"
          register={register}
          errors={errors}
          placeholder="Enter address"
          rules={{ required: "Address is required" }}
          className="min-h-20"
        />
      </div>

      {/* Landmark */}
      <App_Input
        name="landmark"
        register={register}
        errors={errors}
        placeholder="Enter landmark"
      />

      {/* City + State */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <App_Input
          name="city"
          register={register}
          errors={errors}
          placeholder="Enter city"
          rules={{ required: "City is required" }}
        />
        <App_Select
          data={nigerianStates}
          value={stateValue}
          placeholder="Select state"
          title="State"
          onChange={(val) => setValue("state", val)}
          style="gap-1.5"
        />
      </div>

      {/* Country + Postal Code */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <App_Select
          data={countries}
          value={countryValue}
          placeholder="Select country"
          title="Country"
          onChange={(val) => setValue("country", val)}
          style="gap-1.5"
        />
        <App_Input
          name="postalCode"
          register={register}
          errors={errors}
          placeholder="Enter postal code"
        />
      </div>
    </div>
  );
};

export default Step2_Address;
