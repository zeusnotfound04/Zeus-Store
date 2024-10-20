import express from "express";
import { createUser , loginUser , logoutCurrentUser} from "../controllers/userController.mjs";

const router = express.Router();



router.route("/").post(createUser);
router.post("/auth", loginUser)
router.post("/logout" , logoutCurrentUser)



export default router;
