const express = require("express");
const router = express.Router();

const { logWaterIntake } = require("../Controllers/logActivity.js");
// Controller for recording water input
router.post("/logWaterIntake", logWaterIntake);

module.exports = router