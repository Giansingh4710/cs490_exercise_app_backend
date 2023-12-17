const express = require("express");
const router = express.Router();

const { storeSurvey, registerAccount } = require("../controllers/register.js");

/**
 * @swagger
 * tags:
 *   name: register
 */

/**
 *  @swagger
 *  /register:
 *  post:
 *      summary: Registers user
 *      tags: [register]
 *      description: Registers the user and returns jwt token and user data including userID, email, and role
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email of user
 *                              example: "test@test.com"
 *                          password:
 *                              type: string
 *                              description: User's password
 *                              example: "1234567890"
 *      responses:
 *          201:
 *              description: User account created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User registered"
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      email:
 *                                          type: string
 *                                          example: "test@test.com"
 *                                      role:
 *                                          type: string
 *                                          example: Coach
 *                              token:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *          500:
 *              description: User is unable to be registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "test@test.com is already registered"
 *                              message: 
 *                                  type: string
 *                                  example: "Unable to create user and registerAccount"                             
 *          422:
 *              description: Invalid email supplied
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "test.test.com is not a valid email format"
 *                              message: 
 *                                  type: string
 *                                  example: "Unable to create user and registerAccount"
 */
router.post("/", registerAccount);

/**
 *  @swagger
 *  /register/initalSurvey:
 *  post:
 *      summary: WORK IN PROGRESS. Updates user table with initial survey information
 *      tags: [register]
 *      description: Updates user survey in database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                              description: Email of user
 *                              example: "test@test.com"
 *                          password:
 *                              type: string
 *                              description: User's password
 *                              example: "1234567890"
 *      responses:
 *          201:
 *              description: User account created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User registered"
 *                              user:
 *                                  type: object
 *                                  properties:
 *                                      id:
 *                                          type: integer
 *                                          example: 1
 *                                      email:
 *                                          type: string
 *                                          example: "test@test.com"
 *                                      role:
 *                                          type: string
 *                                          example: Coach
 *                              token:
 *                                  type: string
 *                                  example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
 *          500:
 *              description: User is unable to be registered
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "test@test.com is already registered"
 *                              message: 
 *                                  type: string
 *                                  example: "Unable to create user and registerAccount"                             
 *          422:
 *              description: Invalid email supplied
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "test.test.com is not a valid email format"
 *                              message: 
 *                                  type: string
 *                                  example: "Unable to create user and registerAccount"
 */
router.post("/initalSurvey", storeSurvey);

module.exports = router;
