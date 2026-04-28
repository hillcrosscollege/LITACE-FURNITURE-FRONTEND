"use client";
import { useForm } from "react-hook-form";
import { ISignUpValues } from "../sign_up_types";

export const useSignUp = () => {
  const form = useForm<ISignUpValues>();

  const onSubmit = (data: ISignUpValues) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
