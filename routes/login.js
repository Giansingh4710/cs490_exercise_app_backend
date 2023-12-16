const express = require("express");
const router = express.Router();

const { login } = require("../controllers/login.js");

/**
 *  @swagger
 *  /login:
 *  post:
 *      summary: Logins user in
 *      description: Logs in the user and returns jwt token and user data including userID, email, and role
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
 *          200:
 *              description: User logged in successfully 
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "User logged in"
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
 *          404:
 *              description: User is unable to be logged in
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: "Password does not match the one with email test@test.com"
 *                              message: 
 *                                  type: string
 *                                  example: "Unable to login"                             
 */
router.post("/", login);

router.get("/test", (req, res) => {
    res.status(200);
    res.send("works without db call");
})

module.exports = router
