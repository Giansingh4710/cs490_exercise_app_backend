const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
  getSpecializations,
  getCities,
} = require("../controllers/coach.js");

router.get("/searchByName", searchByName);
router.get("/getAllCoaches", getAllCoaches);
router.get("/clients", requireAuthedUser, getClientsOfCoach); // get all clients of a coach
router.get("/specializations", getSpecializations); // Get specializations of available coaches
router.get("/cities", getCities); // Get specializations of available coaches
router.get("/:CoachID", getCoachByID); // this needs to be last because it will catch all the other routes

module.exports = router;
