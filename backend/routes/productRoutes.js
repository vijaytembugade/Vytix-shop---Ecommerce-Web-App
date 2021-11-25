import express from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProductById,
  updateProduct,
  createProductReview,
  getTopProducts
} from "../controllers/productController.js";

import { protect, admin } from "../middleware/authMiddleware.js";
const router = express.Router();

// Fetch all products GET api/products
router.route("/").get(getProduct).post(protect, admin,createProduct)
router.route("/:id/reviews").post(protect , createProductReview)
router.get('/top', getTopProducts)
//fetch single product GET api/products/:id
router.route("/:id")
  .get(getProductById)
  .delete(protect, admin, deleteProduct)
  .put(protect, admin, updateProduct)
  

export default router;
