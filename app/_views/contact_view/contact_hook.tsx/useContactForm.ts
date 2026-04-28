"use client";

import { useForm } from "react-hook-form";
import { IContactFormValues } from "../contact_types";

export const useContactForm = () => {
  const form = useForm<IContactFormValues>();

  const onSubmit = (data: IContactFormValues) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
