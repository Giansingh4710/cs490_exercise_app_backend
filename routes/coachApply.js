const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getAllPending, 
  acceptCoach,
  denyCoach,
} = require("../controllers/coachApply.js");

router.get("/allPending", getAllPending);
router.get("/accept", acceptCoach);
router.get("/deny", denyCoach);

module.exports = router;