const express = require("express");
const router = express.Router();

const { storeSurvey, registerAccount } = require("../Controllers/register.js");

router.post("/", registerAccount);
router.post("/initalSurvey", storeSurvey);

module.exports = router;
