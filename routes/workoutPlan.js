const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const {
    getWorkoutPlan
} = require("../controllers/workoutPlan.js");

// if supplying userID in query params, then coach trying to access view workout plan
router.get("/:userID?", requireAuthedUser, getWorkoutPlan);



module.exports = router;
