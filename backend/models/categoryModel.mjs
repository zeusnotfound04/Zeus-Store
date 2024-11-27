import mongoose from "mongoose";



const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unquiue: true,
    },

}, { timestamps: true });


export default mongoose.model('Category', categorySchema);