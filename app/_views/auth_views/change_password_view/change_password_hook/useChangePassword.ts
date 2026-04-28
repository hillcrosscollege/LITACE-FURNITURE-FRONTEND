"use client";
import { useForm } from "react-hook-form";
import { IChangePasswordValues } from "../change_password_types";

export const useChangePassword = () => {
  const form = useForm<IChangePasswordValues>();

  const onSubmit = (data: IChangePasswordValues) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
