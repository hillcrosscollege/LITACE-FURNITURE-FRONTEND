"use client";

import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { UseFormReturn } from "react-hook-form";
import {
  contactMethods,
  customerGroups,
  referralSources,
} from "../../cusomer_data/customer_data";
import { AdditionalInfoForm } from "../../customers_types";

type Props = { form: UseFormReturn<AdditionalInfoForm> };

const Step3_Additional = ({ form }: Props) => {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  const contactValue = watch("preferredContact") ?? "";
  const groupValue = watch("customerGroup") ?? "";
  const referralValue = watch("referralSource") ?? "";
  const welcomeEmail = watch("sendWelcomeEmail");

  return (
    <div className="space-y-5">
      <div>
        <App_Text variant="cardHeading" className="text-base mb-0.5">
          Additional Information
        </App_Text>
        <App_Text variant="pageSub">
          Add more details about the customer.
        </App_Text>
      </div>

      {/* Preferred Contact Method */}
      <App_Select
        data={contactMethods}
        value={contactValue}
        placeholder="Select preferred contact"
        title="Preferred Contact Method"
        onChange={(val) => setValue("preferredContact", val)}
        style="gap-1.5"
      />

      {/* Customer Group */}
      <App_Select
        data={customerGroups}
        value={groupValue}
        placeholder="Select group (optional)"
        title="Customer Group"
        onChange={(val) => setValue("customerGroup", val)}
        style="gap-1.5"
      />

      {/* Referral Source */}
      <App_Select
        data={referralSources}
        value={referralValue}
        placeholder="Select referral source"
        title="Referral Source (Optional)"
        onChange={(val) => setValue("referralSource", val)}
        style="gap-1.5"
      />

      {/* Notes */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium">Notes (Optional)</label>
        <App_Text_Area
          name="notes"
          register={register}
          errors={errors}
          placeholder="Add any notes about this customer..."
          className="min-h-25"
        />
      </div>

      {/* Send Welcome Email toggle */}
      <div className="flex items-center justify-between p-4 rounded-xl border border-[#ede8e2] bg-[#faf9f7]">
        <div>
          <App_Text variant="tableCell" className="font-medium">
            Send Welcome Email
          </App_Text>
          <App_Text variant="tableCellMuted">
            Send a welcome email to this customer
          </App_Text>
        </div>
        <button
          type="button"
          onClick={() => setValue("sendWelcomeEmail", !welcomeEmail)}
          className={`w-11 h-6 rounded-full transition-colors relative shrink-0 ${
            welcomeEmail ? "bg-primary" : "bg-gray-200"
          }`}
        >
          <span
            className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
              welcomeEmail ? "translate-x-5" : "translate-x-0.5"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default Step3_Additional;
