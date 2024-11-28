import express from "express";
import formidable from "express-formidable";

const router = express.Router();

// Controllers
import { addProduct , updateProductDetails , deleteProduct , fetchProducts , fetchProductById , fetchAllProducts ,addProductReview , fetchTopProducts , fetchNewProducts} from "../controllers/ProductController.mjs";

import { authenticate , authorizeAdmin } from "../middlewares/authMiddleware.mjs";
import checkId from "../middlewares/checkId.mjs";


router.route("/").get(fetchProducts).post(authenticate, authorizeAdmin, formidable(), addProduct);

router.route("/allProducts").get(fetchAllProducts);
router.route("/:id/reviews").post(authenticate, authorizeAdmin, checkId , addProductReview);

router.get("/top", fetchTopProducts);

router.get("/new", fetchNewProducts);

router.route("/:id").get(fetchProductById).put(authenticate, authorizeAdmin, formidable(), updateProductDetails).delete(authenticate, authorizeAdmin, deleteProduct);







export default router;