import express from 'express'
import { createProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from '../controller/productController.js';

const router=express.Router();

router.post("/create",createProduct);
router.get("/getAll",getAllProducts);
router.get("/get/:id",getProduct);
router.put("/update/:id",updateProduct);
router.delete("/delete/:id",deleteProduct);

export default router