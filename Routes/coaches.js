const express = require("express");
const router = express.Router();

const { getCoachByID } = require("../Controllers/get-coach-by-id.js");


router.get("/:CoachID", getCoachByID);

module.exports = router