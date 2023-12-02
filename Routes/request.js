const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Services/TokenVerification.js");
const { requestCoach } = require("../Controllers/request.js");

router.post("/", verifyToken, requestCoach)


module.exports = router