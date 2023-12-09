const express = require("express");
const router = express.Router();

const {requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const {
    getAllExercises,
  } = require("../Controllers/exercise.js");

  router.get("/allExercises", getAllExercises);

  module.exports = router;