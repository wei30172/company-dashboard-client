import axios from "axios";
import { AuthPayloadValues } from "../store/auth/types";

export const api = axios.create({
  baseURL: "https://posts-node-server.herokuapp.com/user",
});

export const login = async (authPayloadValues: AuthPayloadValues) => {
  const { data } = await api.post("/login", JSON.stringify(authPayloadValues), {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return data;
};

export const signup = async (authPayloadValues: AuthPayloadValues) => {
  const { data } = await api.post(
    "/signup",
    JSON.stringify(authPayloadValues),
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    },
  );
  return data;
};
