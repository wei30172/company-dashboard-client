import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE, SIGNUP_REQUEST, SIGNUP_SUCCESS, SIGNUP_FAILURE, LOGOUT_REQUEST } from "./actionTypes";

export interface SignupPayloadValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface SignupPayload {
  values: SignupPayloadValues;
  callback: any;
}

export interface SignupSuccessPayload {
  user: string;
}

export interface SignupFailurePayload {
  error: string;
}

export interface SignupRequest {
  type: typeof SIGNUP_REQUEST;
  payload: SignupPayload;
}

export interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: SignupSuccessPayload;
}

export interface SignupFailure {
  type: typeof SIGNUP_FAILURE;
  payload: SignupFailurePayload;
}

export interface LoginPayloadValues {
  email: string;
  password: string;
}

export interface LoginPayload {
  values: LoginPayloadValues;
  callback: any;
}

export interface LoginSuccessPayload {
  user: IUser;
  accessToken: string;
}

export interface LoginFailurePayload {
  error: string;
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: LoginPayload;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: LoginSuccessPayload;
}

export interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: LoginFailurePayload;
}

export interface LogoutRequest {
  type: typeof LOGOUT_REQUEST;
}

export type AuthActions = SignupRequest | SignupSuccess | SignupFailure | LogoutRequest | LoginRequest | LoginSuccess | LoginFailure;
