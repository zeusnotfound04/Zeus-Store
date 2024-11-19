import { apiSlice } from "./apiSlice";
import { USERS_URL } from "../features/constants";
import { data } from "autoprefixer";



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) =>({
        login: builder.mutation({
            query :(data)=>({
                url : `${USERS_URL}/auth`,
                method: "POST",
                body : data
                
            })
        })
    })
})



export const {useLoginMutation} = userApiSlice;