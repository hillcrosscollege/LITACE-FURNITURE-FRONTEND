"use client";

import App_Button from "@/components/app_ui/App_Button";
import App_Text from "@/components/app_ui/App_Text";
import {
  BasicInfoForm,
  AddressInfoForm,
  AdditionalInfoForm,
} from "../../customers_types";

type Props = {
  basic: BasicInfoForm;
  address: AddressInfoForm;
  additional: AdditionalInfoForm;
  onEdit: (step: number) => void;
};

const ReviewRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-center justify-between py-2 border-b border-[#f5f2ee] last:border-0 gap-4">
    <App_Text variant="tableCellMuted" className="shrink-0">
      {label}
    </App_Text>
    <App_Text variant="tableCell" className="font-medium text-right truncate">
      {value || "—"}
    </App_Text>
  </div>
);

const ReviewSection = ({
  title,
  step,
  onEdit,
  children,
}: {
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) => (
  <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-4 space-y-1">
    <div className="flex items-center justify-between mb-3">
      <App_Text variant="cardHeading">{title}</App_Text>
      <App_Button
        text="Edit"
        type="button"
        onPress={() => onEdit(step)}
        btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-3 py-1.5 h-auto"
      />
    </div>
    {children}
  </div>
);

const Step4_Review = ({ basic, address, additional, onEdit }: Props) => (
  <div className="space-y-4">
    <div>
      <App_Text variant="cardHeading" className="text-base mb-0.5">
        Review & Save
      </App_Text>
      <App_Text variant="pageSub">
        Please review the customer details before saving.
      </App_Text>
    </div>

    {/* Basic Information */}
    <ReviewSection title="Basic Information" step={1} onEdit={onEdit}>
      <ReviewRow label="Full Name" value={basic.fullName} />
      <ReviewRow label="Email Address" value={basic.email} />
      <ReviewRow
        label="Phone Number"
        value={`${basic.countryCode} ${basic.phone}`}
      />
      <ReviewRow label="Date of Birth" value={basic.dateOfBirth} />
      <ReviewRow label="Gender" value={basic.gender} />
      <ReviewRow label="Status" value={basic.status} />
    </ReviewSection>

    {/* Address Information */}
    <ReviewSection title="Address Information" step={2} onEdit={onEdit}>
      <ReviewRow label="Address Type" value={address.addressType} />
      <ReviewRow label="Address" value={address.address} />
      <ReviewRow label="Landmark" value={address.landmark} />
      <ReviewRow label="City" value={address.city} />
      <ReviewRow label="State" value={address.state} />
      <ReviewRow label="Country" value={address.country} />
      <ReviewRow label="Postal Code" value={address.postalCode} />
    </ReviewSection>

    {/* Additional Information */}
    <ReviewSection title="Additional Information" step={3} onEdit={onEdit}>
      <ReviewRow
        label="Preferred Contact"
        value={additional.preferredContact}
      />
      <ReviewRow label="Customer Group" value={additional.customerGroup} />
      <ReviewRow label="Referral Source" value={additional.referralSource} />
      <ReviewRow label="Notes" value={additional.notes} />
      <ReviewRow
        label="Welcome Email"
        value={additional.sendWelcomeEmail ? "Yes" : "No"}
      />
    </ReviewSection>
  </div>
);

export default Step4_Review;
