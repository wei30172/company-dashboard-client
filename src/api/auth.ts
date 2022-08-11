import axios, { axiosPrivate } from "./axios";
import { SignupPayloadValues, LoginPayloadValues } from "../types/Auth.type";

// validate auth
export const validate = async () => {
  const { data } = await axios.get(`/auth/validate`);
  return data;
};

// user register
export const register = async (payload: SignupPayloadValues) => {
  const { data } = await axiosPrivate.post(`/auth/register`, JSON.stringify(payload));
  return data;
};

// user login
export const login = async (payload: LoginPayloadValues) => {
  const { data } = await axiosPrivate.post(`/auth/login`, JSON.stringify(payload));
  return data;
};

// user logout
export const logout = async () => {
  const { data } = await axios.get(`/auth/logout`);
  return data;
};

// refresh token
export const refreshToken = async () => {
  const { data } = await axios.get(`/auth/refreshToken`, {
    withCredentials: true,
  });
  return data;
};
