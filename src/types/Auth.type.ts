export interface SignupPayloadValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayloadValues {
  email: string;
  password: string;
}
