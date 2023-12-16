const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getAllPending,
} = require("../controllers/coachApply.js");

router.get("/allPending", getAllPending);

module.exports = router;