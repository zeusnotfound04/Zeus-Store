import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFetchCategoriesQuery, useUploadProductImageMutation, useCreateProductMutation } from '../../redux/api/productApiSlice';

const ProductList = () => {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [quantity, setQuantity] = useState("");
  const [brand, setBrand] = useState("");
  const [stock, setStock] = useState(0);
  const [imageUrl, setImageUrl] = useState(null);

  const navigate = useNavigate();

  const [uploadProductImage] = useUploadProductImageMutation();
  const [createProduct] = useCreateProductMutation();
  const { data: categories } = useFetchCategoriesQuery();

  // Handle image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // You can upload the image here
      // Example: uploadProductImage(file).then((response) => setImageUrl(response.data));
      setImageUrl(URL.createObjectURL(file)); // For preview purposes
      setImage(file);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Prepare the product data
    const productData = {
      name,
      description,
      price,
      category,
      quantity,
      brand,
      stock,
      image,
    };
    // Call the createProduct mutation
    createProduct(productData).then(() => {
      // Redirect or perform other actions after submission
      navigate('/products');
    });
  };

  return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
      <div className='flex flex-col md:flex-row'>
        {/* <AdminMenu /> */}
        <div className='md:w-3/4 p-3'>
          <div className='h-12'>Create Product</div>

          {imageUrl && (
            <div className='text-center'>
              <img src={imageUrl} alt="product" className='block mx-auto max-h-[200px]' />
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
                onChange={handleImageUpload}
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
                <label htmlFor='price block'>Price</label>
                <input
                  type="text"
                  name='price'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className='border mb-3 bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                />
              </div>
            </div>

            <div className='flex flex-wrap'>
              <div className='one'>
                <label htmlFor='quantity block'>Quantity</label>
                <input
                  type="number"
                  name='quantity'
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className='border mb-3 bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                />
              </div>
              <div className='two ml-10'>
                <label htmlFor='brand block'>Brand</label>
                <input
                  type="text"
                  name='brand'
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className='border mb-3 bg-[#101011] w-[30rem] p-4 rounded-lg text-white'
                />
              </div>
            </div>

            <label htmlFor="description" className='my-5'>Description</label>
            <textarea
              name='description'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='border mb-3 bg-[#101011] w-[95%] p-2 rounded-lg text-white'
            ></textarea>

            <div className='flex justify-between'>
              <div>
                <label htmlFor="stock">Count In Stock</label>
                <br />
                <input
                  type="text"
                  name='stock'
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                  className='border bg-[#101011] w-[30rem] p-4 mb-3 rounded-lg text-white'
                />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <br />
                <select
                  placeholder='Choose Category'
                  type="text"
                  name='category'
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='border bg-[#101011] w-[30rem] p-4 mb-3 rounded-lg text-white'
                >
                  {categories?.map((c) => (
                    <option key={c._id} value={c._id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
