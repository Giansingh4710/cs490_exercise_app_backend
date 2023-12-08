const express = require("express");
const router = express.Router();

const { requireAuthedUser } = require("../utils/security.js");
const {
    storeMessage,
    getMessages
} = require("../Controllers/messages.js");

/**
 *  @swagger
 *  /messages:
 *  post:
 *      summary: Stores messages between 2 users to database
 *      description: Stores messages between 2 users to database. It is expected one user is the coach and one is the user, although with this setup 2 users can message
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          content:
 *                              type: string
 *                              description: Message to be sent
 *                              example: "Hi Coach Penn, when do you think I should increase my weight for bench press?"
 *                          unit:
 *                              type: receiverID
 *                              description: integer
 *                              example: 101
 * 
 * 
 */
router.post("/", requireAuthedUser, storeMessage)

router.get("/:userID", requireAuthedUser, getMessages)


module.exports = router;