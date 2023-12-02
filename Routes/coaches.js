const express = require("express");
const router = express.Router();

const { verifyToken } = require("../Services/TokenVerification.js");
const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
} = require("../Controllers/coach.js");

router.get("/searchByName", searchByName);
router.get("/getAllCoaches", getAllCoaches);
router.get("/:CoachID", getCoachByID);
router.get("/clients", verifyToken, getClientsOfCoach);

module.exports = router;
