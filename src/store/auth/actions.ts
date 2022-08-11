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

import {
  SignupPayload,
  SignupFailurePayload,
  SignupRequest,
  SignupSuccess,
  SignupFailure,
  LoginPayload,
  LoginSuccessPayload,
  LoginFailurePayload,
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  LogoutRequest,
  RefreshTokenPayload,
  RefreshTokenSuccessPayload,
  RefreshTokenFailurePayload,
  RefreshTokenRequest,
  RefreshTokenSuccess,
  RefreshTokenFailure,
} from "./types";

export const signupRequest = (payload: SignupPayload): SignupRequest => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signupSuccess = (): SignupSuccess => ({
  type: SIGNUP_SUCCESS,
});

export const signupFailure = (payload: SignupFailurePayload): SignupFailure => ({
  type: SIGNUP_FAILURE,
  payload,
});

export const loginRequest = (payload: LoginPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: LoginSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: LoginFailurePayload): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload,
});

export const logoutRequest = (): LogoutRequest => ({
  type: LOGOUT_REQUEST,
});

export const refreshTokenRequest = (payload: RefreshTokenPayload): RefreshTokenRequest => ({
  type: REFRESHTOKEN_REQUEST,
  payload,
});

export const refreshTokenSuccess = (payload: RefreshTokenSuccessPayload): RefreshTokenSuccess => ({
  type: REFRESHTOKEN_SUCCESS,
  payload,
});

export const refreshTokenFailure = (payload: RefreshTokenFailurePayload): RefreshTokenFailure => ({
  type: REFRESHTOKEN_FAILURE,
  payload,
});
