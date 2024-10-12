import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const connectDB = async ()=>{
    try{
        await mongoose.connect("mongodb://127.0.0.1:27017/zeusStore");    
        console.log("Successfully Connected to DATABASE....")    

    } catch(err){
        console.log(err);
        process.exit(1)
    }
}

export default connectDB;