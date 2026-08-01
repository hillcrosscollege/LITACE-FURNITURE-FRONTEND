"use client";

import { useState } from "react";
import { X, Eye } from "lucide-react";
import { useForm } from "react-hook-form";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Text from "@/components/app_ui/App_Text";
import App_Text_Area from "@/components/app_ui/App_Text_Area";
import { useUpdateEmailTemplate } from "../email_hooks/useEmailMutation";
import { EmailTemplate } from "../email_types";

type Props = { template: EmailTemplate; onClose: () => void };
type Form = { subject: string; body: string };

type TabType = "edit" | "preview";

const Email_Template_Modal = ({ template, onClose }: Props) => {
  const [activeTab, setActiveTab] = useState<TabType>("edit");
  const { mutate: updateTemplate, isPending } = useUpdateEmailTemplate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Form>({
    defaultValues: { subject: template.subject, body: template.body },
  });

  const bodyValue = watch("body") ?? "";
  const subjectValue = watch("subject") ?? "";

  const onSubmit = (data: Form) => {
    updateTemplate({ id: template.id, data }, { onSuccess: onClose });
  };

  // Simple variable highlighting for preview
  const renderPreview = (text: string) =>
    text.split(/({{[^}]+}})/).map((part, i) =>
      part.startsWith("{{") ? (
        <span
          key={i}
          className="bg-primary/10 text-primary px-1 rounded text-xs font-mono"
        >
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      ),
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-xl max-h-[85vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#ede8e2] sticky top-0 bg-white z-10">
          <div>
            <App_Text variant="cardHeading" className="text-base">
              {template.name}
            </App_Text>
            <App_Text variant="tableCellMuted">
              Trigger: {template.trigger}
            </App_Text>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-[#f5f2ee] text-muted-foreground"
          >
            <X size={16} />
          </button>
        </div>

        {/* Sub tabs */}
        <div className="flex items-center gap-1 px-6 border-b border-[#ede8e2]">
          {(["edit", "preview"] as TabType[]).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-3 py-2.5 text-xs border-b-2 transition-colors capitalize ${
                activeTab === tab
                  ? "border-primary text-primary font-medium"
                  : "border-transparent text-muted-foreground hover:text-[text]"
              }`}
            >
              {tab === "edit" ? "Edit Template" : "Preview"}
            </button>
          ))}
        </div>

        {/* Content */}
        {activeTab === "edit" ? (
          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            <div className="space-y-1.5">
              <App_Text variant="tableCell" className="font-medium">
                Subject Line
              </App_Text>
              <App_Input
                name="subject"
                register={register}
                errors={errors}
                placeholder="Email subject..."
                showLabel={false}
                rules={{ required: "Subject is required" }}
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <App_Text variant="tableCell" className="font-medium">
                  Email Body
                </App_Text>
                <App_Text variant="tableCellMuted">
                  Use {"{{variable}}"} for dynamic content
                </App_Text>
              </div>
              <App_Text_Area
                name="body"
                register={register}
                errors={errors}
                placeholder="Email body..."
                rules={{ required: "Body is required" }}
                className="min-h-[200px] font-mono text-xs"
              />
            </div>

            {/* Available variables */}
            <div className="bg-[#faf9f7] rounded-xl border border-[#ede8e2] p-3 space-y-1.5">
              <App_Text variant="tableCellMuted" className="font-medium">
                Available Variables
              </App_Text>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "{{customer_name}}",
                  "{{order_id}}",
                  "{{order_total}}",
                  "{{order_items}}",
                  "{{tracking_id}}",
                  "{{product_name}}",
                  "{{reset_link}}",
                ].map((v) => (
                  <span
                    key={v}
                    className="text-[10px] px-2 py-1 rounded-lg bg-primary/10 text-primary font-mono"
                  >
                    {v}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-1">
              <App_Button
                text="Cancel"
                type="button"
                onPress={onClose}
                btnStyle="flex-1 text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-xl py-2.5 h-auto"
              />
              <App_Button
                text={isPending ? "Saving..." : "Save Template"}
                type="submit"
                btnStyle="flex-1 text-xs bg-primary text-white hover:bg-primary/90 rounded-xl py-2.5 h-auto"
              />
            </div>
          </form>
        ) : (
          <div className="p-6 space-y-4">
            {/* Preview card */}
            <div className="border border-[#ede8e2] rounded-xl overflow-hidden">
              {/* Mock email header */}
              <div className="bg-primary px-5 py-4 text-center">
                <App_Text
                  variant="tableCell"
                  className="text-white font-semibold"
                >
                  Litace Furniture Store
                </App_Text>
              </div>
              <div className="px-5 py-5 space-y-4 bg-white">
                <div className="border-b border-[#ede8e2] pb-3">
                  <App_Text variant="tableCellMuted">Subject:</App_Text>
                  <div className="text-sm font-medium text-[text] mt-0.5">
                    {renderPreview(subjectValue)}
                  </div>
                </div>
                <div className="text-sm text-[text] leading-relaxed whitespace-pre-line">
                  {renderPreview(bodyValue)}
                </div>
              </div>
              <div className="bg-[#faf9f7] px-5 py-3 text-center border-t border-[#ede8e2]">
                <App_Text variant="tableCellMuted">
                  © 2024 Litace Furniture Store · Johannesburg, South Africa
                </App_Text>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Email_Template_Modal;
