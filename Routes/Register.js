const express = require("express");
const router = express.Router();
const { register, } = require("../Controllers/register.js");

router.get("/register", register);

module.exports = router