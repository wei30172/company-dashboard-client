import axios from "axios";
import { SignupPayloadValues, LoginPayloadValues } from "../store/auth/types";

// validate auth
export const validate = async () => {
  const { data } = await axios.get(`/auth/validate`);
  return data;
};

// user register
export const register = async (payload: SignupPayloadValues) => {
  const { data } = await axios.post(`auth/register`, JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};

// user login
export const login = async (payload: LoginPayloadValues) => {
  const { data } = await axios.post(`auth/login`, JSON.stringify(payload), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};

// user logout
export const logout = async () => {
  const { data } = await axios.get(`auth/logout`);
  return data;
};

// refresh token
export const refreshToken = async () => {
  const { data } = await axios.get(`auth/refreshToken`);
  return data;
};
