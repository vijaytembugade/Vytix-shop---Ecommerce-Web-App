import express from "express";
import Product from "../models/productModel.js";
import asyncHandler from "express-async-handler";

// Fetch all products GET api/products
export const getProduct = asyncHandler(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

//fetch single product GET api/products/:id
export const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    res.json(product);
    return;
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
