const express = require("express");
const { login, logout, me } = require("../controller/Auth.js");

const router = express.Router();

// endpoint

router.get("/me", me);
router.post("/login", login);
router.delete("/logout", logout);

module.exports = router;
