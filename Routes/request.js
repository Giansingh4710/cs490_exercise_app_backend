const express = require("express");
const router = express.Router();
const { verifyToken, fakeVerifyToken } = require(
  "../Services/TokenVerification.js",
);
const { requestCoach, getOpenRequests, unansweredRequestsByCoach } = require(
  "../Controllers/request.js",
);

// why would the path for requesting coach be /request? shouldn't it be /request/coach?
router.post("/", verifyToken, requestCoach);
router.get("/openClientRequest", verifyToken, getOpenRequests);
router.get("/openCoachRequests", fakeVerifyToken, unansweredRequestsByCoach);

module.exports = router;
