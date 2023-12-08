const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const { requestCoach, getOpenRequests, unansweredRequestsByCoach } = require(
  "../controllers/request.js",
);

// why would the path for requesting coach be /request? shouldn't it be /request/coach?
router.post("/", requireAuthedUser, requestCoach);
router.get("/openClientRequest", requireAuthedUser, getOpenRequests);
router.get("/openCoachRequests", requireAuthedUser, unansweredRequestsByCoach);

module.exports = router;
