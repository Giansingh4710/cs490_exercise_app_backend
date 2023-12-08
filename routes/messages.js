const express = require("express");
const router = express.Router();

const { requireAuthedUser } = require("../utils/security.js");
const {
    storeMessage,
} = require("../Controllers/messages.js");
/**
 * front end wont have userid, so getting from token
 * {
 *      content: "...",
 *      receiverID: "..."
 * }
 */
router.post("/", requireAuthedUser, storeMessage)


module.exports = router;