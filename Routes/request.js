const express = require("express");
const router = express.Router();
const { verifyToken } = require("../Services/TokenVerification.js");
const { requestCoach, getOpenRequests } = require("../Controllers/request.js");

router.post("/", verifyToken, requestCoach)

router.get("/OpenClientRequest", verifyToken, getOpenRequests)


module.exports = router