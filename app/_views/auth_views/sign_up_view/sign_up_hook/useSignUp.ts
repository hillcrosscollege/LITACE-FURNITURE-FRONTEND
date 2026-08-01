"use client";
import { useForm } from "react-hook-form";
import { ISignUpValues, SignUpPayload, SignUpResponse } from "../sign_up_types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import { toast } from "sonner";

const signUpApi = async (payload: SignUpPayload): Promise<SignUpResponse> => {
  const { data } = await api.post<SignUpResponse>(
    "/admin/auth/register",
    payload,
  );
  return data;
};

const useSignUpMutation = (email: string) => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignUpPayload) => signUpApi(payload),
    onSuccess: (data: SignUpResponse) => {
      toast.success("Account created successfully!");
      localStorage.setItem("pending_email", email);
      router.push("/verify-email/pending");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    },
  });
};

export const useSignUp = () => {
  const form = useForm<ISignUpValues>();

  const {
    mutate: signUp,
    isPending,
    error,
  } = useSignUpMutation(form.getValues("email"));

  const onSubmit = (data: ISignUpValues) => {
    const { confirmPassword, ...payload } = data;
    signUp(payload);
  };

  return {
    ...form,
    onSubmit,
    isPending,
  };
};
