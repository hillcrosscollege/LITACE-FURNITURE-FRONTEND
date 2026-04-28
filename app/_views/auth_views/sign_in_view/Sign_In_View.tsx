"use client";
import App_Button from "@/components/app_ui/App_Button";
import App_Header_Text from "@/components/app_ui/App_Header_Text";
import App_Input from "@/components/app_ui/App_Input";
import { useSignIn } from "./sign_in_hook/useSignIn";
import { EyeIcon, Lock, Mail } from "lucide-react";
import Link from "next/link";

const Sign_In_View = () => {
  const {
    handleSubmit,
    onSubmit,
    register,
    formState: { errors },
  } = useSignIn();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5 justify-center w-[70%] rounded-xl shadow-xl mx-auto my-auto flex flex-col bg-white h-fit p-8"
    >
      <App_Header_Text
        text="Login"
        type="cardhead"
        style="font-semibold text-primary"
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
      <div>
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
        <div className="flex justify-end items-end w-full">
          <Link
            href={"/forgot-password"}
            className="text-sm text-primary font-semibold  mt-1 text-center"
          >
            Forgot Password?
          </Link>
        </div>
      </div>
      <App_Button
        text="Login"
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
        <p>Don't an account?</p>
        <Link href={"/sign-up"} className="text-primary">
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default Sign_In_View;
