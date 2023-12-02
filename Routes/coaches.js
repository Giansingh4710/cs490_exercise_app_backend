const express = require("express");
const router = express.Router();

const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
} = require("../Controllers/coach.js");

router.get("/searchByName", searchByName);
router.get("/getAllCoaches", getAllCoaches);
router.get("/:CoachID", getCoachByID);
router.get("/:CoachID/clients", getClientsOfCoach);

module.exports = router;
