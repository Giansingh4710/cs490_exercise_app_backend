const express = require("express");
const router = express.Router();

const { getCoachByID, getAllCoaches, searchByName } = require(
  "../Controllers/coach.js",
);

router.get("/searchByName", searchByName);
router.get("/getAllCoaches", getAllCoaches);
router.get("/:CoachID", getCoachByID);

module.exports = router;
