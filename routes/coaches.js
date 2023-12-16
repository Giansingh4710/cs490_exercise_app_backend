const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getCoachByID,
  getAllCoaches,
  searchCoachByName,
  searchCoachByAll,
  getUsersOfCoach,
  getClientInfo,
  getSpecializations,
  getCities,
  getCoachIDFromUserID
} = require("../controllers/coach.js");

router.get("/searchByName", searchCoachByName);
router.get("/search", searchCoachByAll);
router.get("/getAllCoaches", getAllCoaches);
router.get("/clients", requireAuthedUser, getUsersOfCoach); // get all clients of a coach
router.get("/clientInfo", getClientInfo); // Get client info visible by a coach
router.get("/specializations", getSpecializations); // Get specializations of available coaches
router.get("/cities", getCities); // Get specializations of available coaches
router.get("/getCoachID", requireAuthedUser, getCoachIDFromUserID);
router.get("/:coachID", getCoachByID); // this needs to be last because it will catch all the other routes

module.exports = router;
