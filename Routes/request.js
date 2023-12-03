const express = require("express");
const router = express.Router();
const { verifyToken,fakeVerifyToken } = require("../Services/TokenVerification.js");
const { requestCoach, getOpenRequests } = require("../Controllers/request.js");

// why would the path for requesting coach be /request? shouldnt it be /request/coach?
router.post("/", verifyToken, requestCoach)
router.get("/openClientRequest", fakeVerifyToken, getOpenRequests)


module.exports = router
