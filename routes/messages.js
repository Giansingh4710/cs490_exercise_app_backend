const express = require("express");
const router = express.Router();

const { requireAuthedUser } = require("../utils/security.js");
const {
    storeMessage,
    getMessages
} = require("../controllers/messages.js");

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

/**
 * /messages/{userID}
 * get:
 *      summary: Retrieves messages between two users from database. Sorted in order with latest first. 
 *      description: Retrieves messages between two users from database. Sorted in order with latest first. Path parameter userID is the userID of the user the logged in user is messaging. There are optional query parameters limit and offset
 *      parameters:
 *          in: path
 *          name: userID
 *          required: true
 *          schema:
 *              type: integer
 *              minimum: 2
 *          in: query
 *          name: limit
 *          required: false
 *          schema:
 *              type: integer
 *              minimum: 0
 *          in: query
 *          name: offset
 *          required: false
 *              schema:
 *                  type: integer
 *                  minimum: 0
 *          
 */
router.get("/:userID", requireAuthedUser, getMessages)

module.exports = router;