"use client";
import { useForm } from "react-hook-form";
import { ISignInValues } from "../sign_in_types";

export const useSignIn = () => {
  const form = useForm<ISignInValues>();

  const onSubmit = (data: ISignInValues) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
