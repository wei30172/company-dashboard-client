import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/auth/authSlice";
import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  baseUrl: "/",
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result?.error?.status === 401) {
    console.log("sending refresh token");

    // send refresh token to get new access token
    const refreshResult = await baseQuery("/auth/refreshToken", api, extraOptions);
    console.log(refreshResult);

    if (refreshResult?.data) {
      const user = (api.getState() as RootState).auth.user;

      // store the new token
      api.dispatch(setCredentials({ ...(refreshResult.data as any), user }));

      // retry the original query with new access token
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch(logOut());
    }
  }

  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
});
