import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";
import { logout } from "../features/auth/authSlice";
import { data } from "autoprefixer";
import Profile from "../../pages/User/Profile";

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({


        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: "POST",
                body: data,
            }),
        }),
        logout : builder.mutation({
            query: () =>({
                url: `${USERS_URL}/logout`,
                method: "POST",
            }),
        }),

        register : builder.mutation({
            query: (data) =>({
                url : `${USERS_URL}/register`,
                method: "POST",
                body: data,
            })
        }),

        profile : builder.mutation({
            query :(data) => ({
                url : `${USERS_URL}/profile`,
                method : "PUT",
                body : data
            })
        }),

        getUsers : builder.query({
            query : ()=>({
                url : USERS_URL,
            }),
            providesTags : ["User"],
            keepUnusedDataFor: 5,
        }),

        deleteUser : builder.mutation({
            query : userId => ({
                url : `${USERS_URL}/${userId}`,
                method : "DELETE"
            })
        }),

        getUsersDetails : builder.query({
            query : (id) => ({
                url : `${USERS_URL}/${id}`
            }),

            keepUnusedDataFor : 5,
        }), 

    }),
});

export const { useLoginMutation , useLogoutMutation , useRegisterMutation , useProfileMutation} = userApiSlice;
