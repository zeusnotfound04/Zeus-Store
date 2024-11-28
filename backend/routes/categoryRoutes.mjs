import express from "express";
const router = express.Router();
import { createCategory , updateCategory ,  removeCategory , listCategory , readCategory} from "../controllers/categoryController.mjs";
import { authenticate , authorizeAdmin } from "../middlewares/authMiddleware.mjs";

router.route("/").post(authenticate , authorizeAdmin , createCategory)
router.route("/:categoryId").put(authenticate , authorizeAdmin , updateCategory)
router.route("/:categoryId").delete(authenticate , authorizeAdmin , removeCategory  )
router.route("/categories").get(  listCategory)
router.route("/:id").get( readCategory)

export default router;