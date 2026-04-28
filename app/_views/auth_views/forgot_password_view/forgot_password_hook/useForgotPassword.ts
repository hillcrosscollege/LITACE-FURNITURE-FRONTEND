"use client";
import { useForm } from "react-hook-form";
import { IForgotPasswordValues } from "../forgot_password_types";
import { useRouter } from "next/navigation";

export const useForgotPassword = () => {
  const form = useForm<IForgotPasswordValues>();
  const router = useRouter();

  const onSubmit = (data: IForgotPasswordValues) => {
    console.log(data);
    router.push("/change-password");
  };

  return {
    ...form,
    onSubmit,
  };
};
