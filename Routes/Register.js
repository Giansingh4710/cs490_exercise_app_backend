const express = require("express");
const router = express.Router();

const { storeSurvey, registerAccount } = require("../Controllers/register.js");

router.post("/register", registerAccount);

router.post("/register/initalSurvey", storeSurvey)


module.exports = router