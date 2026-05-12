"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Input from "@/components/app_ui/App_Input";
import App_Double_Text from "@/components/shared/App_Double_Text";
import { EyeIcon, Lock } from "lucide-react";
import { useChangePassword } from "./change_password_hook/useChangePassword";

const Change_Password_View = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
  } = useChangePassword();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-4 justify-center w-[70%] rounded-xl shadow-xl mx-auto my-auto flex flex-col bg-white h-fit p-8"
    >
      <App_Double_Text
        className="gap-y-1 z-1"
        header={{
          children: "Change Password",
          variant: "cardTitle",
          className: "font-semibold text-primary",
        }}
        para={{
          children: "We can help you recover your password with few steps.",
          className: "text-slate-600 text-base font-semibold",
        }}
      />
      <App_Input
        icon1={<Lock size={20} className="text-primary" />}
        icon2={<EyeIcon size={20} />}
        name="NewPassword"
        register={register}
        errors={errors}
        rules={{
          required: "Password is required",
        }}
      />
      <App_Input
        icon1={<Lock size={20} className="text-primary" />}
        icon2={<EyeIcon size={20} />}
        name="ConfirmPassword"
        register={register}
        errors={errors}
        rules={{
          required: "Password is required",
        }}
      />
      <App_Button
        text="Change Password"
        type="submit"
        btnStyle="w-full text-white py-6"
      />
    </form>
  );
};

export default Change_Password_View;
