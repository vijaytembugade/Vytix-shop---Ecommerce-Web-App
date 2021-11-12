import express from "express";
import {
  getProduct,
  getProductById,
} from "../controllers/productController.js";
const router = express.Router();

// Fetch all products GET api/products
router.route("/").get(getProduct);

//fetch single product GET api/products/:id
router.route("/:id").get(getProductById);

export default router;
