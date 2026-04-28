"use client";
import App_Button from "@/components/app_ui/App_Button";
import { useForgotPassword } from "./forgot_password_hook/useForgotPassword";
import App_Header_Text from "@/components/app_ui/App_Header_Text";
import App_Input from "@/components/app_ui/App_Input";
import { Mail } from "lucide-react";
import Link from "next/link";
import App_Double_Text from "@/components/shared/App_Double_Text";

const Forgot_Password_View = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
  } = useForgotPassword();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 justify-center w-[70%] rounded-xl shadow-xl mx-auto my-auto flex flex-col bg-white h-fit p-8"
    >
      <App_Double_Text
        textContentStyle="gap-y-1 z-1"
        header={{
          text: "Forgot Password?",
          type: "cardhead",
          style: "font-semibold text-primary",
        }}
        para={{
          text: "We can help you recover your password with few steps.",
          style: "text-slate-600 text-base font-semibold",
        }}
      />
      <div>
        <App_Input
          icon1={<Mail size={20} className="text-primary" />}
          name="Email"
          register={register}
          errors={errors}
          rules={{
            required: "Email is required",
          }}
        />
        <div className="flex justify-end items-end w-full">
          <Link
            href={"/sign-in"}
            className="text-sm text-primary font-semibold  mt-1 text-center"
          >
            Back to Login
          </Link>
        </div>
      </div>
      <App_Button
        text="Submit"
        type="submit"
        btnStyle="w-full text-white py-6"
      />
    </form>
  );
};

export default Forgot_Password_View;
