"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Select from "@/components/app_ui/App_Select";
import App_Text from "@/components/app_ui/App_Text";
import {
  useSMTPSettings,
  useUpdateSMTPSettings,
} from "../email_hooks/useEmailMutation";
import Test_Email_Modal from "../email_modals/Test_Email_Modal";
import { SMTPSettings } from "../email_types";
import App_Loader from "@/components/app_ui/App_Loader";

const encryptionOptions = [
  { label: "TLS", key: "TLS" },
  { label: "SSL", key: "SSL" },
  { label: "None", key: "None" },
];

const SMTP_Settings_Tab = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showTestModal, setShowTestModal] = useState(false);

  const { data: smtp, isLoading } = useSMTPSettings();
  const { mutate: updateSMTP, isPending } = useUpdateSMTPSettings();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<SMTPSettings>();

  useEffect(() => {
    if (smtp) reset(smtp);
  }, [smtp]);

  const encryptionValue = watch("encryption") ?? "";

  const onSubmit = (data: SMTPSettings) => updateSMTP(data);

  if (isLoading || !smtp)
    return <App_Loader label="Loading SMTP settings..." />;

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl border border-[#ede8e2] shadow-sm p-5 space-y-4 max-w-2xl"
      >
        <App_Text variant="cardHeading">SMTP Configuration</App_Text>
        <App_Text variant="tableCellMuted">
          Configure your outgoing mail server settings.
        </App_Text>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <App_Input
            name="host"
            register={register}
            errors={errors}
            placeholder="smtp.mailgun.org"
            rules={{ required: "SMTP host is required" }}
          />
          <App_Input
            name="port"
            register={register}
            errors={errors}
            placeholder="587"
            rules={{ required: "Port is required" }}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <App_Input
            name="username"
            register={register}
            errors={errors}
            placeholder="SMTP username"
            rules={{ required: "Username is required" }}
          />
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                {...register("password", { required: "Password is required" })}
                placeholder="SMTP password"
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2.5 pr-9 bg-white outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-destructive">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <App_Select
          data={encryptionOptions}
          value={encryptionValue}
          placeholder="Select encryption"
          title="Encryption"
          onChange={(val) => setValue("encryption", val)}
          style="gap-1.5 max-w-xs"
        />

        <div className="space-y-3 pt-2 border-t border-[#ede8e2]">
          <App_Text variant="tableCell" className="font-medium">
            Sender Details
          </App_Text>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <App_Input
              name="fromName"
              register={register}
              errors={errors}
              placeholder="Litace Furniture Store"
              rules={{ required: "From name is required" }}
            />
            <App_Input
              name="fromEmail"
              register={register}
              errors={errors}
              placeholder="noreply@litace.co.za"
              rules={{ required: "From email is required" }}
            />
          </div>
        </div>

        <div className="flex items-center gap-3 pt-1">
          <App_Button
            text="Send Test Email"
            type="button"
            onPress={() => setShowTestModal(true)}
            btnStyle="text-xs border border-[#e0dbd4] bg-white text-[text] hover:bg-[#f5f2ee] rounded-lg px-4 py-2.5 h-auto"
          />
          <App_Button
            text={isPending ? "Saving..." : "Save Settings"}
            type="submit"
            btnStyle="text-xs bg-primary text-white hover:bg-primary/90 rounded-lg px-4 py-2.5 h-auto"
          />
        </div>
      </form>

      {showTestModal && (
        <Test_Email_Modal onClose={() => setShowTestModal(false)} />
      )}
    </>
  );
};

export default SMTP_Settings_Tab;
