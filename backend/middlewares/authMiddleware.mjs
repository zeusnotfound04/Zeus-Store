import jwt from "jsonwebtoken";
import User from "../models/userModel.mjs";
import asyncHandler from "./asyncHandler.mjs";



const authenticate = asyncHandler(async (req, res , next)=>{
  
    //Read JWT from 'jwt' cookie

    let token = req.cookie.jwt


    if (token) {
        try{
            /+
            
        } catch (err){
            res.status(401)
            throw new Error("Not authorised, token failed")
        } else {
            res.status(401)
            throw new Error("Not authorized, token failed ")
        }
    }
})