// import Products from "../models/ProductsModel.js";
const Products = require("../models/ProductsModel");
const User = require("../models/UserModel");
const { Op } = require("sequelize");

module.exports.getProducts = async (req, res) => {
  try {
    let response;
    if (req.role === "admin") {
      response = await Products.findAll({
        attributes: ["uuid", "name", "type", "serialNumber"],
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findAll({
        attributes: ["uuid", "name", "type", "serialNumber"],
        where: {
          userId: req.userId,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.getProductById = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    let response;
    if (req.role === "admin") {
      response = await Products.findOne({
        attributes: ["uuid", "name", "type", "serialNumber"],
        where: {
          id: product.id,
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    } else {
      response = await Products.findOne({
        attributes: ["uuid", "name", "type", "serialNumber"],
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
        include: [
          {
            model: User,
            attributes: ["name", "email"],
          },
        ],
      });
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.createProduct = async (req, res) => {
  const { name, type, serialNumber } = req.body;
  try {
    await Products.create({
      name: name,
      type: type,
      serialNumber: serialNumber,
      userId: req.userId,
    });
    res.status(201).json({ msg: "Product Created Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    const { name, type, serialNumber } = req.body;
    if (req.role === "admin") {
      await Products.update(
        { name, type, serialNumber },
        {
          where: {
            id: product.id,
          },
        }
      );
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Access Denied" });
      await Products.update(
        { name, type, serialNumber },
        {
          where: {
            [Op.and]: [{ id: product.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Product Updated Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports.deleteProduct = async (req, res) => {
  try {
    const product = await Products.findOne({
      where: {
        uuid: req.params.id,
      },
    });
    if (!product) return res.status(404).json({ msg: "Product not found" });
    const { name, type, serialNumber } = req.body;
    if (req.role === "admin") {
      await Products.destroy({
        where: {
          id: product.id,
        },
      });
    } else {
      if (req.userId !== product.userId)
        return res.status(403).json({ msg: "Access Denied" });
      await Products.destroy({
        where: {
          [Op.and]: [{ id: product.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Product Deleted Success" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
