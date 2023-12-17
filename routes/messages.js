const express = require("express");
const router = express.Router();

const { requireAuthedUser } = require("../utils/security.js");
const {
    storeMessage,
    getMessages
} = require("../controllers/messages.js");

/**
 * @swagger
 * tags:
 *   name: messages
 */

/**
 *  @swagger
 *  /messages/store:
 *  post:
 *      summary: Store a new message
 *      tags: [messages]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          receiverID:
 *                              type: integer
 *                              description: The user ID of the message receiver
 *                              example: 2
 *                          content:
 *                              type: string
 *                              description: The content of the message
 *                              example: "Hello, how are you?"
 *      responses:
 *          201:
 *              description: Message created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              status: 201
 *                              message: "Message created"
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 201
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: "Message created"
 *          500:
 *              description: Error creating message.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 500
 *                              message:
 *                                  type: string
 *                                  description: Error message
 *                                  example: Error creating message
 */
router.post("/", requireAuthedUser, storeMessage)

/**
 *  @swagger
 *  /messages/{userID}:
 *  get:
 *      summary: Get messages for a specific user
 *      tags: [messages]
 *      parameters:
 *          - in: path
 *            name: userID
 *            required: true
 *            schema:
 *              type: integer
 *          - in: query
 *            name: limit
 *            schema:
 *              type: integer
 *            description: The maximum number of messages to retrieve (default is 30)
 *          - in: query
 *            name: offset
 *            schema:
 *              type: integer
 *            description: The number of messages to skip (default is 0)
 *      responses:
 *          200:
 *              description: Messages retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  senderID:
 *                                      type: integer
 *                                      description: The user ID of the message sender
 *                                  receiverID:
 *                                      type: integer
 *                                      description: The user ID of the message receiver
 *                                  content:
 *                                      type: string
 *                                      description: The content of the message
 *                                  created:
 *                                      type: string
 *                                      format: date-time
 *                                      description: The timestamp when the message was sent
 *                          example:
 *                              - senderID: 1
 *                                receiverID: 2
 *                                content: "Hello, how are you?"
 *                                timestamp: "2023-12-17T12:00:00Z"
 *          400:
 *              description: Bad request - Limit and offset must be nonnegative
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      status:
 *                                          type: integer
 *                                          description: HTTP status code of response
 *                                          example: 400
 *                                      message:
 *                                          type: string
 *                                          description: Error message
 *                                          example: "Limit and offset must be nonnegative"
 *          500:
 *              description: Error retrieving messages from the database.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      status:
 *                                          type: integer
 *                                          description: HTTP status code of response
 *                                          example: 500
 *                                      message:
 *                                          type: string
 *                                          description: Error message
 *                                          example: "Error accessing database"
 */
router.get("/:userID", requireAuthedUser, getMessages)

module.exports = router;