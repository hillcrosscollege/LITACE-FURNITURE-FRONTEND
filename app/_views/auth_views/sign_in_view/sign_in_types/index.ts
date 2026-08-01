export interface ISignInValues {
  email: string;
  password: string;
}

export type SignInPayload = {
  email: string;
  password: string;
};

export type SignInResponse = { accessToken: string };
