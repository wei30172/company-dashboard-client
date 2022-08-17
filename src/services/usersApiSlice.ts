import { apiSlice } from "./apiSlice";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query<{ users: IUser[] }, void>({
      query: () => "/users/get",
      keepUnusedDataFor: 5, // 5s
    }),
  }),
});

export const { useGetUsersQuery } = usersApiSlice;
