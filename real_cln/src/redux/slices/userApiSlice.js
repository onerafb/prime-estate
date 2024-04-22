import { apiSlice } from "./apiSlice";
const USERS_URL = "/api";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //!login mutation
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/signin`,
        method: "POST",
        body: data,
      }),
    }),
    //!register mutation
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth/signup`,
        method: "POST",
        body: data,
      }),
    }),
    //!update mutation
    update: builder.mutation({
      query: ({ data, id }) => ({
        url: `${USERS_URL}/user/update/${id}`,
        method: "POST",
        body: data,
      }),
    }),
    //!create prp mutation
    createProperty: builder.mutation({
      query: (formData) => ({
        url: `${USERS_URL}/listing/create`,
        method: "POST",
        body: formData,
      }),
    }),
    //!update prp mutation
    updateProperty: builder.mutation({
      query: ({ formDataToSend, id }) => ({
        url: `${USERS_URL}/listing/update/${id}`,
        method: "POST",
        body: formDataToSend,
      }),
    }),
    //!edit and delete prp link mutation
    showEDProperty: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/user/listings/${id}`,
        method: "GET",
      }),
    }),
    //!delete admin
    deleteProperty: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/listing/delete/${id}`,
        method: "DELETE",
      }),
    }),
    //!update info
    getUpdateInfoProperty: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/listing/get/${id}`,
        method: "GET",
      }),
    }),
    //!info property
    getInfoProperty: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/listing/get/${id}`,
        method: "GET",
      }),
    }),
    //!get all users
    getAllUsers: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/user/allusers`,
        method: "GET",
      }),
      providesTags: ['User'],
    }),
    //!delete user
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `${USERS_URL}/user/deleteUser/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["User"],
    }),
    //!signout query
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/auth/signout`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUpdateMutation,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
  useShowEDPropertyMutation,
  useDeletePropertyMutation,
  useGetUpdateInfoPropertyMutation,
  useGetInfoPropertyMutation,
  useGetAllUsersMutation,
  useDeleteUserMutation,
} = usersApiSlice;
