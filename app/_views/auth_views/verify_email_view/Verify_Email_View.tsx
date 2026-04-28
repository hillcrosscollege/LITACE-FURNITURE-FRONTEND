"use client";
import App_Double_Text from "@/components/shared/App_Double_Text";
import { useVerifyEmail } from "./verify_email_hook/useVerifyEmail";
import App_Input from "@/components/app_ui/App_Input";
import App_Button from "@/components/app_ui/App_Button";

const Verify_Email_View = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
  } = useVerifyEmail();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-4 justify-center w-[70%] rounded-xl shadow-xl mx-auto my-auto flex flex-col bg-white h-fit p-8"
    >
      <App_Double_Text
        textContentStyle="gap-y-1 z-1"
        header={{
          text: "Verify Email",
          type: "cardhead",
          style: "font-semibold text-primary",
        }}
        para={{
          text: "Enter the code sent to your.email.com for verification of email.",
          style: "text-slate-600 text-base font-semibold",
        }}
      />
      <App_Input
        name="OTP"
        register={register}
        errors={errors}
        rules={{
          required: "OTP is required",
        }}
      />
      <App_Button
        text="Verify Email"
        type="submit"
        btnStyle="w-full text-white py-6"
      />
    </form>
  );
};

export default Verify_Email_View;
