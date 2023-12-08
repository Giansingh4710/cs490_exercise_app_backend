const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { logWaterIntake } = require("../controllers/logActivity.js");
router.post("/logWaterIntake", requireAuthedUser, logWaterIntake);

module.exports = router;
