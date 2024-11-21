import express from 'express'
import { createCategory, deleteCategory, getAllCategory, getCategory, updateCategory } from '../controller/caterogyController.js';

const router=express.Router();

router.post("/create",createCategory);
router.get("/getAll",getAllCategory);
router.get("/get/:id",getCategory);
router.put("/update/:id",updateCategory);
router.delete("/delete/:id",deleteCategory);
export default router