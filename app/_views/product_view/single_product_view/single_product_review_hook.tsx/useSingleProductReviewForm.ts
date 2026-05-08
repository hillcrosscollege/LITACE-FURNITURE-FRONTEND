"use client";

import { useForm } from "react-hook-form";
import { ISingleProductReviewValues } from "../single_product_types";

export const useSingleProductReviewForm = () => {
  const form = useForm<ISingleProductReviewValues>();

  const onSubmit = (data: ISingleProductReviewValues) => {
    console.log(data);
  };

  return {
    ...form,
    onSubmit,
  };
};
