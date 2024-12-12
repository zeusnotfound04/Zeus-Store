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

          <div className='mb-3'>
            <label className='border text-white px-4 black w-full text-center rounded-lg cursor-pointer font-bold py-11'>
              {imageUrl ? "Change Image" : "Upload Image"}
              <input 
                type="file" 
                name='image'
                accept='image/*'
                className={!image ? 'hidden' : 'text-white'}
                onChange=""
                
                />
            </label>

          </div>


            <div className='p-3'>
              <div className='flex flex-wrap'>
                <div className='one'>
                  <label htmlFor='name block'>Name</label>
                    <input 
                      type="text" 
                      name='name'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className='border mb-3 bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                      />

                </div>
                <div className='two ml-10'>
                  <label htmlFor='name block'>Price</label>
                    <input 
                      type="text" 
                      name='price'
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className='border mb-3  bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                      />

                </div>
              </div>

              <div className='flex flex-wrap'>
                <div className='one'>
                  <label htmlFor='name block'>Quantity</label>
                    <input 
                      type="number" 
                      name='quantity'
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className='border mb-3 bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                      />

                </div>
                <div className='two ml-10'>
                  <label htmlFor='name block'>Brand</label>
                    <input 
                      type="text" 
                      name='brand'
                      value={price}
                      onChange={(e) => setBrand(e.target.value)}
                      className='border mb-3  bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                      />

                </div>
              </div>

            </div>

        </div>

      </div>


    </div>
     
  )
}

export default ProductList