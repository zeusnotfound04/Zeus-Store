import User from "../models/userModel.mjs";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.mjs";

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
    //Password valid hai tohken generate kardenge
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


export { createUser , loginUser , logoutCurrentUser };
