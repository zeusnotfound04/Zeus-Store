
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes.mjs"

import connectDB from "./config/db.mjs";
import { authenticate , authorizeAdmin } from "./middlewares/authMiddleware.mjs";

dotenv.config();

const port = process.env.PORT || 5000;


connectDB();

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended : false}));
app.use(cookieParser())

//for debugging process
    console.log("Environment Variables:");
    console.log("JWT_SECRET:", process.env.JWT_SECRET);
    console.log("MONGO_URL:", process.env.MONGO_URL);


app.use("/api/users" , userRoutes)

app.listen(port, ()=> console.log(`Server started at PORT : ${port}`))

app.get("/" , (req, res)=>{
    res.send("Yessir its up!!!")
})
