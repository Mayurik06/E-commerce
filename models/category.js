import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    required: true,
  },
  description: { 
    type: String 
},
products:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
    },
  ],
});


const Category=mongoose.model("Category",categorySchema);

export default Category