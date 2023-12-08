const express = require("express");
const router = express.Router();

const {requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
} = require("../controllers/coach.js");

router.get("/searchByName", searchByName);
router.get("/getAllCoaches", getAllCoaches);
router.get("/clients", requireAuthedUser, getClientsOfCoach); // get all clients of a coach
router.get("/:CoachID", getCoachByID); // this needs to be last because it will catch all the other routes

module.exports = router;
