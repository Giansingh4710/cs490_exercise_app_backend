const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getAllPending, 
  getPendingByID,
  acceptCoach,
  denyCoach,
  createCoachRequest,
} = require("../controllers/coachApply.js");

router.get("/allPending", getAllPending);
router.get("/pending", getPendingByID),
router.get("/accept", acceptCoach);
router.get("/deny", denyCoach);
router.post("/createCoachRequest", createCoachRequest);

module.exports = router;