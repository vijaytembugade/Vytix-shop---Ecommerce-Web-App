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

//delete a product  DELETE api/products/:id private/admin
export const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (product) {
    await product.remove()
    res.json({ message: "Product Removed" })
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
});
//create a product  POST api/products/ private/admin
export const createProduct = asyncHandler(async (req, res) => {
  const product = new Product({
    name: 'Sample Name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'Sample Brand',
    category: 'Sample Category',
    countInStock: 0,
    numReviews: 0,
    description: 'Sample Description'
  })

  const createdProduct = await product.save()
  res.status(201).json(createdProduct)
});

//update a product  PUT api/products/:id private/admin
export const updateProduct = asyncHandler(async (req, res) => {

  const { name, price, description, image, brand, category, countInStock } = req.body

  const product = await Product.findById(req.params.id)

  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
  } else {
    res.status(404)
    throw new Error("Product Not Found")
  }


  const updatedProduct = await product.save()
  res.json(updatedProduct)
});