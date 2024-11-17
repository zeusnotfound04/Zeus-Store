import User from "../models/userModel.mjs";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.mjs";
import { json } from "express";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the input fields" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).send("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        
        await newUser.save();
 
        createToken(res, newUser._id);

        return res.status(201).json({
            _id: newUser._id,
            username: newUser.username,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Invalid user data" });
    }
});

const loginUser = asyncHandler(async(req , res) =>{
    const {email , password} = req.body;
    console.log("in the login page")
    const existingUser = await User.findOne({email})
    let isPasswordValid = false;

    if (existingUser) {
        isPasswordValid = await bcrypt.compare(password, existingUser.password)
    }
    console.log("User Verification is done !")
    //Password valid hai token generate kardenge
    if (isPasswordValid){
        createToken(res , existingUser._id)
    }


    res.status(201).json({
        _id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
        isAdmin: existingUser.isAdmin,
    })

    return //Exit the func.
})

const logoutCurrentUser = asyncHandler(async(req , res)=>{
    res.cookie('jwt' , '' , {
        httpOnly : true,
        expires : new Date(0),
    })

    res.status(200).json({message : "you have beeen logged out successfully"})
})


const getAllUsers = asyncHandler( async(req , res )=>{
    const users = await User.find({})
    res.json(users)
})


const getCurrentUserProfile =  asyncHandler(async(req , res)=>{
    const user = await User.findById(req.user._id)


    if (user){
        res.json({
            _id : user._id,
            username : user.username,
            email: user.email,
        })
    } else{
        res.status(404);
        throw new Error("User Notfound!!!")
    }
})


const updateCurrentUserProfile = asyncHandler(async(req, res) => {
    const user = await User.findById(req.user._id);
    const {username, email, password} = req.body;

    if (user) {
   
        if ((email && email !== user.email) || (username && username !== user.username ) ){
            const emailExists = email !== user.email ? await User.findOne({email}) : null;
            const usernameExists = username && username ? await User.findOne({username}) : null


            if (emailExists){
                res.status(400)
                throw new Error("Emal already taken")
            }

            if (usernameExists){
                res.status(400);
                throw new Error("Username already taken")
            }
        }

        user.username = username || user.username;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt)
            user.password = hashedPassword;
        }

        const updatedUser = await user.save();

        res.json({
            _id: updatedUser._id,
            username: updatedUser.username,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});

const deleteUserById = asyncHandler(async(req , res)=>{
    const {id} = req.params;
    const user = await User.findById(id)

    if (user){
        if(user.isAdmin){
            res.status(400)
            throw new Error("Cannot delete Admin user")
        }

        await User.deleteOne({_id : id})

        res.json({message: "User Removed"})
    } else{
        res.status(404)
        throw new Error("User Notfound");
        
    }
})

const getUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id).select("-password")


    if (user){
        res.json(user)
    } else{
        res.status(404)
        throw new Error("User Notfound");
        
    }
})

const updateUserById = asyncHandler(async(req, res)=>{
    const user = await User.findById(req.params.id)
    const {username , email, isAdmin} = req.body
    if(user){
        user.username = username || user.username
        user.email = email || user.email
        user.isAdmin = Boolean(isAdmin)


        const updatedUser = await user.save()


        res.json({
            _id : updatedUser._id,
            username : updatedUser.username,
            email: updatedUser.email,
            isAdmin : updatedUser.isAdmin
        })
    } else {
        res.status(404)
        throw new Error("User Notfound");
        
    }

})


export { createUser ,
     loginUser , 
     logoutCurrentUser , 
     getAllUsers , 
     getCurrentUserProfile , 
     updateCurrentUserProfile , 
     deleteUserById, getUserById , 
     updateUserById};
