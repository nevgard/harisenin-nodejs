// import { Sequelize } from "sequelize";
// import db from "../config/Database.js";
const Sequelize = require("sequelize");
const db = require("../config/Database.js");
const User = require("./UserModel.js");

const { DataTypes } = Sequelize;
const Products = db.define(
  "products",
  {
    uuid: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 100],
      },
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    serialNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    freezeTableName: true,
  }
);

User.hasMany(Products);
Products.belongsTo(User, { foreignKey: "userId" });

module.exports = Products;
