import Category from "../models/category.js";
import Product from "../models/product.js";

//create product
export const createProduct = async (req, res) => {
  const { name, price, stock, categoryId } = req.body;
  try {
    if (!name || !price || !stock || !categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }
    if (price <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a positive number" });
    }
    if (stock <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "stock cannot be negative" });
    }
    const category = await Category.findById(categoryId);
    if (!category) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    const product = new Product({
      name,
      price,
      stock,
      categoryId,
    });

    await product.save();
    category.products.push(product._id);
    await category.save();
    return res
      .status(200)
      .json({
        success: true,
        message: "Product created successfully",
        product,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get all products

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Error fetching products" });
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//get Product by Id

export const getProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const products = await Product.findById(id);
    if (!products) {
      return res
        .status(400)
        .json({ success: false, message: "Error fetching product" });
    }
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//update product

export const updateProduct = async (req, res) => {
  const { name, price, stock, categoryId } = req.body;
  const { id } = req.params;
  try {
    if (price !== undefined && price <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Price must be a positive number" });
    }

    // Validate stock
    if (stock !== undefined && stock < 0) {
      return res
        .status(400)
        .json({ success: false, message: "Stock cannot be negative" });
    }

    const updateProducts = await Product.findByIdAndUpdate(
      id,
      { name, price, stock, categoryId },
      { new: true, runValidators: true }
    );
    if (!updateProducts) {
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });
    }
    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updateProducts,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//delete product

export const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: "Products not found" });
    }
    await Category.findByIdAndUpdate(
      product.categoryId,
      { $pull: { products: product._id } },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
