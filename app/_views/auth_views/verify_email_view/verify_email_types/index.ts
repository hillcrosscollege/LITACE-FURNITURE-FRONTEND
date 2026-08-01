// app/(auth)/verify-email/verify_email_types.ts
export type VerifyEmailPayload = { token: string };
export type ResendEmailPayload = { email: string };

export type VerifyEmailResponse = {
  message: string;
  user: { id: string; email: string; emailVerified: boolean };
};
