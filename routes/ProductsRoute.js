// import express from "express";
// import {
//   createGoods,
//   deleteGoods,
//   getGoods,
//   getGoodsById,
//   updateGoods,
// } from "../controller/GoodsController.js";

const express = require("express");
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/ProductsController.js");
const { verifyUser } = require("../middleware/AuthUser.js");

const router = express.Router();

// endpoint

router.get("/Products", verifyUser, getProducts);
router.get("/Products/:id", verifyUser, getProductById);
router.post("/Products", verifyUser, createProduct);
router.patch("/Products/:id", verifyUser, updateProduct);
router.delete("/Products/:id", verifyUser, deleteProduct);

module.exports = router;
