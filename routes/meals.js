const express = require("express");
const router = express.Router();

const {requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { getMeals } = require("../controllers/meals.js")

router.get("/", requireAuthedUser, getMeals);

module.exports = router;