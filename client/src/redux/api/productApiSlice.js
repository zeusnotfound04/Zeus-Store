import { UPLOAD_URL , PRODUCT_URL} from "../features/constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints : (builder) =>({
        getProducts : builder.query({
            query : ({keyword}) =>({
                url : `${PRODUCT_URL}`,
                parmas : {keyword}
            }),
            
            keepUnusedDataFor : 5,
            providesTags : ['Product']

        }),

        getProductById : builder.query({
            query : (productId) => `${PRODUCT_URL}/${productId}`,
            providesTags : (result , error , productId) => [
                {type : 'Product' , id : productId}
              ]

        }),

        allProducts : builder.query({
            query : () => `${PRODUCT_URL}/allProducts`,

        }),

        getProductDetails : builder.query({
            query : (productId) => ({
                url : `${PRODUCT_URL}/${productId}`,
            }),
            keepUnusedDataFor : 5,
        }),

        createProduct : builder.mutation({
            query : (product) => ({
                url : `${PRODUCT_URL}`,
                method : 'POST',
                body : product
            }),
            invalidatesTags : ['Product']
        }),

        updateProduct : builder.mutation({
            query : ({productId , product}) => ({
                url : `${PRODUCT_URL}/${productId}`,
                method : 'PUT',
                body : product
            }),
            invalidatesTags : ['Product']
        }),

        uploadProductImage : builder.mutation({
            query : (formData) => ({
                url : `${UPLOAD_URL}`,
                method : 'POST',
                body : formData
            }),
        }),

        deleteProduct : builder.mutation({
            query : (productId) => ({
                url : `${PRODUCT_URL}/${productId}`,
                method : 'DELETE'
            }),
            invalidatesTags : ['Product']
        }),

        createReview : builder.mutation({
            query : (data) => ({
                url : `${PRODUCT_URL}/${data.productId}/reviews`,
                method : 'POST',
                body : data
            }),
        }),

        getTopProducts : builder.query({
            query : () => `${PRODUCT_URL}/top`,
            keepUnusedDataFor : 5,
        }),

        getNewProducts : builder.query({
            query : () => `${PRODUCT_URL}/new`,
            keepUnusedDataFor : 5,
        }),
    })
})


export const { 
    useGetProductsQuery , 
    useGetProductByIdQuery , 
    useAllProductsQuery , 
    useGetProductDetailsQuery , 
    useCreateProductMutation , 
    useUpdateProductMutation , 
    useDeleteProductMutation , 
    useCreateReviewMutation , 
    useGetTopProductsQuery , 
    useGetNewProductsQuery,
    useUploadProductImageMutation
 } = productApiSlice;