import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";
import asyncHandler from "./asyncHandler.mjs";



const authenticate = asyncHandler(async (req, res , next)=>{
  
    //Read JWT from 'jwt' cookie

    let token = req.cookies.jwt


    if (token) {
        try{
            const decoded = jwt.verify(token , process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password") // to exclude the password field for security.
            next()
        } catch (err){
            res.status(401)
            throw new Error("Not authorised, token failed")
        } 
    } else {
        res.status(401)
        throw new Error("Not authorized, No token found ")
    }
    
})



const authorizeAdmin = (req , res , next) =>{
    if (req.user && req.user.isAdmin){
        next()
    } else{
        res.status(401).send("User not authorized as an admin")
    }
}


export {authenticate , authorizeAdmin}