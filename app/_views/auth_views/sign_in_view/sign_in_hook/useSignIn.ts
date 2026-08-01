"use client";
import { useForm } from "react-hook-form";
import { ISignInValues, SignInPayload, SignInResponse } from "../sign_in_types";
import api from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const signInApi = async (payload: SignInPayload): Promise<SignInResponse> => {
  const { data } = await api.post<SignInResponse>("/admin/auth/login", payload);
  return data;
};

const useSignInMutation = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (payload: SignInPayload) => signInApi(payload),
    onSuccess: (data: SignInResponse) => {
      toast.success("Signed in successfully!");
      localStorage.setItem("access_token", data.accessToken);
      router.push("/dashboard");
    },
    onError: (error: any) => {
      toast.error(
        error.response?.data?.message ??
          "Something went wrong. Please try again.",
      );
    },
  });
};

export const useSignIn = () => {
  const form = useForm<ISignInValues>();

  const { mutate: signIn, isPending, error } = useSignInMutation();

  const onSubmit = (data: ISignInValues) => {
    console.log({ data });

    signIn({ email: data.Email, password: data.Password });
  };

  return {
    ...form,
    onSubmit,
    isPending,
  };
};
