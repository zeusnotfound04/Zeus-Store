import User from "../models/userModel.mjs";
import asyncHandler from "../middlewares/asyncHandler.mjs";
import bcrypt from "bcryptjs";
import createToken from "../utils/createToken.mjs";

const createUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    // Validate required fields
    if (!username || !email || !password) {
        return res.status(400).json({ message: "Please fill all the input fields" });
    }

    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).send("User already exists");
    }

    // Generate salt and hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
        username,
        email,
        password: hashedPassword,
    });

    try {
        // Save the user to the database
        await newUser.save();

        // Create and set the token in the response (cookie)
        createToken(res, newUser._id);

        // Send back the user data as response
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

export { createUser };
