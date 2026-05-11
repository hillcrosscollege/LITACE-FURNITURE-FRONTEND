"use client";
import App_Header_Text from "@/components/app_ui/App_Text";
import App_Input from "@/components/app_ui/App_Input";
import { useSignUp } from "./sign_up_hook/useSignUp";
import { EyeIcon, Lock, Mail, User } from "lucide-react";
import App_Button from "@/components/app_ui/App_Button";
import Link from "next/link";

const Sign_Up_View = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
  } = useSignUp();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="gap-4 justify-center w-[70%] rounded-xl shadow-xl mx-auto my-auto flex flex-col bg-white h-fit p-8"
    >
      <App_Header_Text
        text="Sign Up"
        type="cardhead"
        style="font-bold text-primary text-center"
      />
      <App_Input
        icon1={<User size={20} className="text-primary" />}
        name="FullName"
        register={register}
        errors={errors}
        rules={{
          required: "Full Name is required",
        }}
      />
      <App_Input
        icon1={<Mail size={20} className="text-primary" />}
        name="Email"
        register={register}
        errors={errors}
        rules={{
          required: "Email is required",
        }}
      />
      <App_Input
        icon1={<Lock size={20} className="text-primary" />}
        icon2={<EyeIcon size={20} />}
        name="Password"
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
        text="Sign Up"
        type="submit"
        btnStyle="w-full text-white py-6"
      />
      <div className="flex justify-center gap-2 w-full">
        <div className="w-[30%] bg-primary h-3"></div>
        <p className="text-sm text-primary">or continue with</p>
        <div className="w-[30%] bg-primary h-3"></div>
      </div>
      <App_Button
        text="Sign Up With Google"
        type="button"
        btnStyle="w-full bg-white py-6 border border-primary"
      />
      <div className="flex gap-1 text-sm text-center justify-center">
        <p>Have an account?</p>
        <Link href={"/sign-in"} className="text-primary">
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default Sign_Up_View;
