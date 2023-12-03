const express = require("express");
const router = express.Router();

const { verifyToken, fakeVerifyToken } = require(
  "../Services/TokenVerification.js",
);
const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
} = require("../Controllers/coach.js");

router.get("/searchByName", searchByName);
router.get("/getAllCoaches", getAllCoaches);
router.get("/clients", verifyToken, getClientsOfCoach); // get all clients of a coach
router.get("/:CoachID", getCoachByID); // this needs to be last because it will catch all the other routes

module.exports = router;
