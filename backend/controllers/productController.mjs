import { json } from "express";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import Product from "../models/productModel.mjs";

const requiredFields = [
  { key: "name", message: "Name is required" },
  { key: "price", message: "Price is required" },
  { key: "description", message: "Description is required" },
  { key: "category", message: "Category is required" },
  { key: "quantity", message: "Quantity is required" },
  { key: "brand", message: "Brand is required" },
];

const addProduct = asyncHandler(async (req, res) => {
  try {
    // Check for missing fields
    for (const field of requiredFields) {
      if (!req.fields[field.key]) {
        return res.status(400).json({ message: field.message });
      }
    }

    const product = new Product({ ...req.fields });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const updateProductDetails = asyncHandler(async (req, res) => {
  try {
    for (const field of requiredFields) {
      if (!req.fields[field.key]) {
        return res.status(400).json({ message: field.message });
      }
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id, 
      { ...req.fields }, 
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(400).json(error.message);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.status(200).json({ message: "Product removed" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }

});

const fetchProducts = asyncHandler(async (req, res) => {
    try {
      const pageSize = 6; // Number of products per page
      const page = Number(req.query.page) || 1; // Current page, default is 1
      const keyword = req.query.keyword
        ? {
            name: {
              $regex: req.query.keyword, // Search by name (case-insensitive)
              $options: "i",
            },
          }
        : {};
  
      // Count total matching products
      const count = await Product.countDocuments({ ...keyword });
  
      // Fetch products with pagination
      const products = await Product.find({ ...keyword })
        .skip(pageSize * (page - 1)) // Skip products for previous pages
        .limit(pageSize); // Limit to page size
  
      // Determine if there's a next page
      const hasMore = page * pageSize < count;
  
      res.json({
        products,
        page,
        pages: Math.ceil(count / pageSize),
        hasMore,
      });
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  });
  

const fetchProductById = asyncHandler(async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  });  


  const fetchAllProducts = asyncHandler(async (req, res) => {
    try {
      const products = await Product.find({}).populate("category").limit(12).sort({createdAt: -1});


      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: error.message });
    }
  });


const addProductReview = asyncHandler(async (req, res) => {
    try {
        const {rating, comment} = req.body;
        const product = await Product.findById(req.params.id);
        if(!product){
            return res.status(404).json({message: "Product not found"});
        }
        const alreadyReviewed = product.reviews.find(r => r.user.toString() === req.user._id.toString());
        if(alreadyReviewed){
            return res.status(400).json({message: "Product already reviewed"});
        }
        const review = {
            name: req.user.username,
            rating: Number(rating),
            comment,
            user: req.user._id
        };
        product.reviews.push(review);
        product.numReviews = product.reviews.length;
        product.rating = product.reviews.reduce((acc, item) => item.rating + acc, 0) / product.reviews.length;
        await product.save();
        res.status(201).json({message: "Review added"});
        
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
        
    }
});

const fetchTopProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({rating: -1}).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});


const fetchNewProducts = asyncHandler(async (req, res) => {
    try {
        const products = await Product.find({}).sort({createdAt: -1}).limit(4);
        res.json(products);
    } catch (error) {
        console.error(error);
        res.status(400).json({ message: error.message });
    }
});

export { addProduct, updateProductDetails , deleteProduct , fetchProducts , fetchProductById , fetchAllProducts , addProductReview , fetchTopProducts , fetchNewProducts};
