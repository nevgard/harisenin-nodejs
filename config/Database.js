// import { Sequelize } from "sequelize";
const Sequelize = require("sequelize");
const db = new Sequelize("inventory_db", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = db;
