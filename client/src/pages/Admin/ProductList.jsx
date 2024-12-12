import React, { useState } from 'react'
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

  const [image , setImage] = useState("")
  const [name , setName] = useState("")
  const [description , setDescription] = useState("")
  const [price , setPrice] = useState("")
  const [category , setCategory] = useState("")
  const [quantity , setQuantity] = useState("")
  const [brand, setBrand] = useState("")
  const [stock , setStock] = useState(0)
  const [imageUrl , setImageUrl] = useState(null)

  const navigate = useNavigate()

  const [uploadProductImage] = useUploadProductImageMutation()
  const [createProduct] = useCreateProductMutation()
  const { data: products } = useGetProductsQuery()

  return (

    <div className='container xl:mx-[9rem] sm:mx-[0]'>
      <div className='flex flex-col md:flex-row'>
        {/* <AdminMenu/> */}
        <div className='md:w-3/4 p-3'>
          <div className='h-12'>Create Product</div>

          {imageUrl && (
            <div className='text-center'>
              <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]'/>
            </div>
          )}


        </div>

      </div>


    </div>
     
  )
}

export default ProductList