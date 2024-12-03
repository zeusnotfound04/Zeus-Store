import React from 'react'
import { useNavigate } from 'react-router'
import {useGetProductsQuery , 
    useGetProductByIdQuery , 
    useAllProductsQuery , 
    useGetProductDetailsQuery , 
    useCreateProductMutation , 
    useUpdateProductMutation , 
    useDeleteProductMutation , 
    useCreateReviewMutation , 
    useGetTopProductsQuery , 
    useGetNewProductsQuery,
    useUploadProductImageMutation} from '../../redux/api/productApiSlice'

const ProductList = () => {
  return (
    <div>ProductList</div>
  )
}

export default ProductList