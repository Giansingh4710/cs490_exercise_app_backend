const router = require("express").Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const { getCoachOfUser, removeCoach, getUserData } = require(
  "../controllers/user.js",
);

router.get("/coach", requireAuthedUser, getCoachOfUser);

router.delete("/coach", requireAuthedUser, removeCoach);

router.get("/data", requireAuthedUser, getUserData);

module.exports = router;