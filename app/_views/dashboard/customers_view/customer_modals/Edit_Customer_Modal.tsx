"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import { useUpdateCustomer } from "../customers_hooks/useCustomersMutations";
import { Customer } from "../customers_types";
import { useCustomerContext } from "@/app/contexts/admin/Customer_Context";
import App_Modal from "@/components/app_ui/App_Modal";

type EditForm = {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: string;
};

const tabs = ["Basic Information", "Addresses", "Preferences"];

const Edit_Customer_Modal = () => {
  const [activeTab, setActiveTab] = useState("Basic Information");
  const { mutate: updateCustomer, isPending } = useUpdateCustomer();
  const { customer, setShowEdit } = useCustomerContext();

  const onClose = () => setShowEdit(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<EditForm>({
    defaultValues: {
      name: customer?.name,
      email: customer?.email,
      phone: customer?.phone,
      dateOfBirth: customer?.dateOfBirth,
      gender: customer?.gender,
    },
  });

  const genderValue = watch("gender");

  const onSubmit = (data: EditForm) => {
    updateCustomer({ id: customer!.id, data }, { onSuccess: onClose });
  };

  return (
    <App_Modal onClose={onClose} text="Edit Customer">
      <div className="flex">
        {/* Side tabs */}
        <div className="w-40 border-r border-[#ede8e2] p-3 space-y-1 shrink-0">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`w-full text-left px-3 py-2 rounded-lg text-xs transition-colors ${
                activeTab === tab
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-[#f5f2ee]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Form content */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 p-5 space-y-4"
        >
          {activeTab === "Basic Information" && (
            <>
              <App_Input
                name="name"
                register={register}
                errors={errors}
                placeholder="Full name"
                rules={{ required: "Name is required" }}
              />
              <App_Input
                name="email"
                register={register}
                errors={errors}
                placeholder="Email address"
                rules={{ required: "Email is required" }}
              />
              <App_Input
                name="phone"
                register={register}
                errors={errors}
                placeholder="Phone number"
                rules={{ required: "Phone is required" }}
              />
              <div className="grid grid-cols-2 gap-3">
                <App_Input
                  name="dateOfBirth"
                  register={register}
                  errors={errors}
                  placeholder="MM/DD/YYYY"
                />
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
              </div>
            </>
          )}

          {activeTab === "Addresses" && (
            <App_Text
              className="py-8 text-center"
              variant="tableCellMuted"
              children=" Manage addresses from the Addresses tab on the customer detail
                page."
            />
          )}

          {activeTab === "Preferences" && (
            <App_Text
              className="py-8 text-center"
              variant="tableCellMuted"
              children="Customer preferences coming soon."
            />
          )}

          {/* Footer */}
          <div className="flex gap-3 pt-2 border-t border-[#ede8e2]">
            <App_Button
              text="Cancel"
              type="button"
              onPress={onClose}
              btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[#1e1a17] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
            />
            <App_Button
              text={isPending ? "Saving..." : "Save Changes"}
              type="submit"
              btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
            />
          </div>
        </form>
      </div>
    </App_Modal>
  );
};

export default Edit_Customer_Modal;
