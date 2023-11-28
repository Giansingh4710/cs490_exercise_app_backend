const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Services/TokenVerification.js");

const { logWaterIntake } = require("../Controllers/logActivity.js");
// Controller for recording water input
router.post("/logWaterIntake", verifyToken ,logWaterIntake);

module.exports = router