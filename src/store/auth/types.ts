import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
} from "./actionTypes";

export interface AuthPayloadValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthPayload {
  values: AuthPayloadValues;
  callback: any;
}

export interface AuthSuccessPayload {
  user: string;
  token: string;
}

export interface AuthFailurePayload {
  error: string;
}

export interface LoginRequest {
  type: typeof LOGIN_REQUEST;
  payload: AuthPayload;
}

export interface LoginSuccess {
  type: typeof LOGIN_SUCCESS;
  payload: AuthSuccessPayload;
}

export interface LoginFailure {
  type: typeof LOGIN_FAILURE;
  payload: AuthFailurePayload;
}

export interface SignupRequest {
  type: typeof SIGNUP_REQUEST;
  payload: AuthPayload;
}

export interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
  payload: AuthSuccessPayload;
}

export interface SignupFailure {
  type: typeof SIGNUP_FAILURE;
  payload: AuthFailurePayload;
}

export interface LogoutRequest {
  type: typeof LOGOUT_REQUEST;
}

export type AuthActions =
  | LoginRequest
  | LoginSuccess
  | LoginFailure
  | SignupRequest
  | SignupSuccess
  | SignupFailure
  | LogoutRequest;
