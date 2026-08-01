import api from "@/lib/axios";
export interface ISignUpValues {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}

export type SignUpPayload = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignUpResponse = {
  token: string;
  user: {
    id: string;
    fullName: string;
    email: string;
  };
};

// export const authApi = {
//   signUp: async (payload: SignUpPayload): Promise<SignUpResponse> => {
//     const { data } = await api.post<SignUpResponse>("/auth/register", payload);
//     return data;
//   },

// signIn: async (payload: SignInPayload): Promise<SignInResponse> => {
//   const { data } = await api.post<SignInResponse>("/auth/login", payload);
//   return data;
// },

// signOut: async (): Promise<void> => {
//   await api.post("/auth/logout");
// },
// };
