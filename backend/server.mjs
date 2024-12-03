
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

// Connect to DB
import connectDB from "./config/db.mjs";

// Routes
import userRoutes from "./routes/userRoutes.mjs"
import categoryRoutes from "./routes/categoryRoutes.mjs"
import productRoutes from "./routes/productRoutes.mjs"
import uploadRoutes from "./routes/uploadRoutes.mjs"
import path from "path";


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
app.use("/api/category" , categoryRoutes) 
app.use("/api/products" , productRoutes)
app.use("/api/upload" , uploadRoutes)

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")))




app.listen(port, ()=> console.log(`Server started at PORT : ${port}`))

