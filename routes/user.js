const router = require("express").Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const { getCoachOfUser, removeCoach } = require(
  "../controllers/user.js",
);

router.get("/coach", requireAuthedUser, getCoachOfUser);

router.delete("/coach", requireAuthedUser, removeCoach)

module.exports = router;