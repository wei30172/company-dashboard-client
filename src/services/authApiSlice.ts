import { apiSlice } from "./apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    userRegister: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    refreshUserToken: builder.mutation<{ accessToken: string }, void>({
      query: () => ({
        url: "/auth/refreshToken",
        method: "GET",
      }),
    }),
    userLogout: builder.mutation<void, void>({
      query: () => ({
        url: "/auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export const { useUserLoginMutation, useUserRegisterMutation, useRefreshUserTokenMutation, useUserLogoutMutation } = authApiSlice;
