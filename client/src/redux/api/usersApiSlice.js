import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";
import { logout } from "../features/auth/authSlice";
import { data } from "autoprefixer";

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
                url : `${USERS_URL}`,
                method: "POST",
                body: data,
            })
        })
    }),
});

export const { useLoginMutation , useLogoutMutation , useRegisterMutation} = userApiSlice;
