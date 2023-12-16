const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getAllPending, 
  acceptCoach,
} = require("../controllers/coachApply.js");

router.get("/allPending", getAllPending);
router.get("/accept", acceptCoach)

module.exports = router;