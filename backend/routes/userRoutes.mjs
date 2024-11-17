import express from "express";
import { createUser ,
     loginUser , 
     logoutCurrentUser , 
     getAllUsers , 
     getCurrentUserProfile , 
     updateCurrentUserProfile , 
     deleteUserById , 
     getUserById , 
     updateUserById} from "../controllers/userController.mjs";
import { authenticate, authorizeAdmin } from "../middlewares/authMiddleware.mjs";

const router = express.Router();



router
    .route("/")
    .post(createUser)
    .get(authenticate , authorizeAdmin, getAllUsers )

router.post("/auth", loginUser)
router.post("/logout" , logoutCurrentUser)
router.route("/profile").get(authenticate , getCurrentUserProfile).put(authenticate, updateCurrentUserProfile)

//Admin Route

router
    .route("/:id")
    .delete(authenticate, authorizeAdmin, deleteUserById)
    .get(authenticate, authorizeAdmin, getUserById)
    .put(authenticate, authorizeAdmin , updateUserById)

export default router;
