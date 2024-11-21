import Category from "../models/category.js";
import Product from "../models/product.js";

//create category
export const createCategory = async (req, res) => {
  const { name, description } = req.body;
  try {
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
   
    const existingCategory = await Category.findOne({
        name: { $regex: `^${name}$`, $options: "i" } 
      });
    if (existingCategory) {
      return res
        .status(400)
        .json({ success: false, message: "Category is already exists" });
    }
    await Category.create({ name, description });
    return res
      .status(200)
      .json({ success: true, message: "Category create successfully" });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};

//get all category
export const getAllCategory = async (req, res) => {
  try {
    const categories = await Category.find();
    if (!categories) {
      return res
        .status(400)
        .json({ success: false, message: "Error fetching caterogy" });
    }
    return res.status(200).json({
      success: true,
      categories,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: "Internal server Error" });
  }
};

//get a Category by ID
export const getCategory = async (req, res) => {
  const { id } = req.params;

  try {
    const categories = await Category.findById(id).populate("products");
    if (!categories) {
      return res
        .status(400)
        .json({ success: false, message: "Error fetching caterogy" });
    }
    return res.status(200).json({ success:true, categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//update category
export const updateCategory = async (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  try {
    if (name) {
        const existingCategory = await Category.findOne({
          name: { $regex: `^${name}$`, $options: "i" }, 
          _id: { $ne: id }, 
        });
  
        if (existingCategory) {
          return res
            .status(400)
            .json({ success: false, message: "Category name already exists" });
        }
      }
    
    const category = await Category.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res
      .status(200)
      .json({ message: "Category updated successfully", category });
  } catch (error) {
    res.status(500).json({ status: false, message: error.message });
  }
};

//delete category

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    await Product.updateMany(
      { categoryId: category._id },
      { $set: { categoryId: null } }
    );
    res.status(200).json({
      message: "Category deleted",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
