// import express from "express";
// import cors from "cors";
// import GoodsRoute from "./routes/GoodsRoute.js";
const express = require("express");
const cors = require("cors");
const session = require("express-session");
require("dotenv").config();
const SequelizeStore = require("connect-session-sequelize");
const ProductsRoute = require("./routes/ProductsRoute.js");
const UsersRoute = require("./routes/UsersRoute.js");
const AuthRoute = require("./routes/AuthRoute.js");
const db = require("./config/Database.js");

const app = express();

//session
const sessionStore = SequelizeStore(session.Store);
const store = new sessionStore({
  db: db,
});

// database
(async () => {
  await db.sync();
})();

// middleware
app.use(
  session({
    secret: process.env.SESS_SECRET,
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);
app.use(express.json());
app.use(ProductsRoute);
app.use(UsersRoute);
app.use(AuthRoute);

//create sessiontable
// store.sync();

app.listen(process.env.APP_PORT, () => {
  console.log("Server is running on port ");
  console.log(process.env.APP_PORT);
});
