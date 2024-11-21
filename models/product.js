import mongoose from "mongoose";
import category from "./category.js";

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required: [true, "Product name is required"],
    },
    price:{
        type:Number,
        required: [true, "Price is required"], 
      min: [0, "Price must be a positive number"],  
    },
    stock:{
        type:Number,
      required: [true, "Stock is required"],
        default:0
    },
    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required: [true, "Category is required"],
        default:null
    }
})

const Product = mongoose.model("Product", productSchema);

export default Product;