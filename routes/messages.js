const express = require("express");
const router = express.Router();

const { requireAuthedUser } = require("../utils/security.js");
const {
    storeMessage,
    getMessages
} = require("../Controllers/messages.js");
/**
 * front end wont have userid, so getting from token
 * {
 *      content: "...",
 *      receiverID: "..."
 * }
 */
router.post("/", requireAuthedUser, storeMessage)

router.get("/:userID", requireAuthedUser, getMessages)


module.exports = router;