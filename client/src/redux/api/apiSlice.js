import {fetchBaseQuery , createApi} from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../features/constants'


const baseQuery = fetchBaseQuery({ baseUrl: "localhost:5000" })



export const apiSlice = createApi({
    baseQuery,
    tagTypes :  ["Product" , "Order", "Users", "Category"],
    endpoints :() =>({

    })
})