"use client";

import api from "@/lib/axios";
import { useMutation, useQuery } from "@tanstack/react-query";
import { VerifyEmailResponse } from "../verify_email_types";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

const verifyEmailApi = async (
  token: string | null,
): Promise<VerifyEmailResponse> => {
  const { data } = await api.get(`/admin/auth/verify-email?token=${token}`);
  return data;
};

const resendEmailTokenApi = async (
  email: string,
): Promise<{ message: string }> => {
  const { data } = await api.post("/admin/auth/resend-verification", { email });
  return data;
};

export const useVerifyEmail = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [sent, setSent] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["verify-email", token],
    queryFn: () => verifyEmailApi(token),
    enabled: !!token,
    retry: false,
  });

  const {
    mutate: resend,
    isPending,
    error,
  } = useMutation({
    mutationFn: (email: string) => resendEmailTokenApi(email),
    onSuccess: () => setSent(true),
  });

  const serverError: string | null = error
    ? ((error as any).response?.data?.message ??
      (error as any).response?.data?.error ??
      "Something went wrong. Please try again.")
    : null;

  return {
    data,
    isLoading,
    isError,
    resend,
    isPending,
    error,
    token,
    sent,
    setSent,
    serverError,
  };
};
