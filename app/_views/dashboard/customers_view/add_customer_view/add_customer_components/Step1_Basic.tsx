"use client";

import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { UseFormReturn } from "react-hook-form";
import { countryCodes } from "../../cusomer_data/customer_data";
import { BasicInfoForm } from "../../customers_types";

type Props = { form: UseFormReturn<BasicInfoForm> };

const Step1_Basic = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const countryCodeValue = watch("countryCode") ?? "+234";
  const genderValue = watch("gender") ?? "";
  const statusValue = watch("status") ?? "Active";

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Basic Information
        </App_Text>
        <App_Text variant="pageSub">
          Enter the customer's basic details.
        </App_Text>
      </div>

      {/* Full Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <App_Input
          name="fullName"
          register={register}
          errors={errors}
          placeholder="Enter full name"
          rules={{ required: "Full name is required" }}
        />
        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Email Address <span className="text-[#c0392b]">*</span>
          </label>
          <App_Input
            name="email"
            register={register}
            errors={errors}
            placeholder="Enter email address"
            showLabel={false}
            rules={{
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email",
              },
            }}
          />
        </div>
      </div>

      {/* Phone + Date of Birth */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Phone Number <span className="text-[#c0392b]">*</span>
          </label>
          <div className="flex gap-2">
            <div className="w-32 shrink-0">
              <App_Select
                data={countryCodes}
                value={countryCodeValue}
                placeholder="+234"
                title=""
                onChange={(val) => setValue("countryCode", val)}
                style="gap-0"
              />
            </div>
            <App_Input
              name="phone"
              register={register}
              errors={errors}
              placeholder="Enter phone number"
              showLabel={false}
              rules={{ required: "Phone is required" }}
              containerStyle="flex-1"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-sm font-medium">Date of Birth</label>
          <App_Input
            name="dateOfBirth"
            register={register}
            errors={errors}
            placeholder="Select date of birth"
            showLabel={false}
          />
        </div>
      </div>

      {/* Gender + Status */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <App_Select
          data={[
            { label: "Male", key: "Male" },
            { label: "Female", key: "Female" },
          ]}
          value={genderValue}
          placeholder="Select gender"
          title="Gender"
          onChange={(val) => setValue("gender", val)}
          style="gap-1.5"
        />

        <div className="space-y-1.5">
          <label className="text-sm font-medium">
            Status <span className="text-[#c0392b]">*</span>
          </label>
          <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-white">
            <span className="w-2 h-2 rounded-full bg-[#2e7d52] shrink-0" />
            <App_Select
              data={[
                { label: "Active", key: "Active" },
                { label: "Inactive", key: "Inactive" },
              ]}
              value={statusValue}
              placeholder="Select status"
              title=""
              onChange={(val) => setValue("status", val)}
              style="gap-0 border-0 shadow-none p-0"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1_Basic;
