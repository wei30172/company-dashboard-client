import {
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  REFRESHTOKEN_REQUEST,
  REFRESHTOKEN_SUCCESS,
  REFRESHTOKEN_FAILURE,
} from "./actionTypes";

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

export interface SignupFailurePayload {
  error: string;
}

export interface SignupRequest {
  type: typeof SIGNUP_REQUEST;
  payload: SignupPayload;
}

export interface SignupSuccess {
  type: typeof SIGNUP_SUCCESS;
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

export interface RefreshTokenPayload {
  callback: any;
}

export interface RefreshTokenSuccessPayload {
  accessToken: string;
}

export interface RefreshTokenFailurePayload {
  error: string;
}

export interface RefreshTokenRequest {
  type: typeof REFRESHTOKEN_REQUEST;
  payload: RefreshTokenPayload;
}

export interface RefreshTokenSuccess {
  type: typeof REFRESHTOKEN_SUCCESS;
  payload: RefreshTokenSuccessPayload;
}

export interface RefreshTokenFailure {
  type: typeof REFRESHTOKEN_FAILURE;
  payload: RefreshTokenFailurePayload;
}

export type AuthActions = SignupRequest | SignupSuccess | SignupFailure | LoginRequest | LoginSuccess | LoginFailure | LogoutRequest | RefreshTokenRequest | RefreshTokenSuccess | RefreshTokenFailure;
