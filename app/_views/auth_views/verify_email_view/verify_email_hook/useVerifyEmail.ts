"use client";
import { useForm } from "react-hook-form";
import { IVerifyEmailValues } from "../verify_email_types";

export const useVerifyEmail = () => {
  const form = useForm<IVerifyEmailValues>();

  const onSubmit = (data: IVerifyEmailValues) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
