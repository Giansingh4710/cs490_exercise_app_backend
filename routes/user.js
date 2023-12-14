const router = require("express").Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const { getCoachOfUser } = require(
  "../controllers/user.js",
);

router.get("/coach", requireAuthedUser, getCoachOfUser);

module.exports = router;