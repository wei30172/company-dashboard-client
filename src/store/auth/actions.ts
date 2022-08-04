import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  SIGNUP_REQUEST,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGOUT_REQUEST,
} from "./actionTypes";

import {
  AuthPayload,
  AuthSuccessPayload,
  AuthFailurePayload,
  LoginRequest,
  LoginSuccess,
  LoginFailure,
  SignupRequest,
  SignupSuccess,
  SignupFailure,
  LogoutRequest,
} from "./types";

export const loginRequest = (payload: AuthPayload): LoginRequest => ({
  type: LOGIN_REQUEST,
  payload,
});

export const loginSuccess = (payload: AuthSuccessPayload): LoginSuccess => ({
  type: LOGIN_SUCCESS,
  payload,
});

export const loginFailure = (payload: AuthFailurePayload): LoginFailure => ({
  type: LOGIN_FAILURE,
  payload,
});

export const signupRequest = (payload: AuthPayload): SignupRequest => ({
  type: SIGNUP_REQUEST,
  payload,
});

export const signupSuccess = (payload: AuthSuccessPayload): SignupSuccess => ({
  type: SIGNUP_SUCCESS,
  payload,
});

export const signupFailure = (payload: AuthFailurePayload): SignupFailure => ({
  type: SIGNUP_FAILURE,
  payload,
});

export const logoutRequest = (): LogoutRequest => ({
  type: LOGOUT_REQUEST,
});
