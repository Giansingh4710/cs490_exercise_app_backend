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
 * @swagger
 * /register/initialSurvey:
 *   post:
 *     summary: Update user survey information
 *     description: |
 *       This endpoint updates the survey information for a user based on the provided data. It calculates the user's age from the provided date of birth and ensures that the user is at least 8 years old before proceeding with the update. If successful, it returns a success message along with the updated user information. If an error occurs, it returns an appropriate error message.
 *     tags: [register]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: "BobFirst"
 *               lastName:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: "BobLast"
 *               activityLevel:
 *                 type: string
 *                 description: The activity level of the user.
 *                 example: "Moderate Activity"
 *               city:
 *                 type: string
 *                 description: The city where the user resides.
 *                 example: "Newark"
 *               dob:
 *                 type: string
 *                 format: date
 *                 description: The date of birth of the user.
 *                 example: "2023-12-01"
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: "bob52@bob.com"
 *               gender:
 *                 type: string
 *                 description: The gender of the user.
 *                 example: "Male"
 *               height:
 *                 type: string
 *                 description: The height of the user.
 *                 example: "72"
 *               phoneNum:
 *                 type: string
 *                 description: The phone number of the user.
 *                 example: "1234567890"
 *               state:
 *                 type: string
 *                 description: The state where the user resides.
 *                 example: "New Jersey"
 *               streetAddress:
 *                 type: string
 *                 description: The street address of the user.
 *                 example: "1 Main st."
 *               weight:
 *                 type: string
 *                 description: The weight of the user.
 *                 example: "190"
 *               zipCode:
 *                 type: string
 *                 description: The ZIP code of the user.
 *                 example: "07734"
 *               goal:
 *                 type: string
 *                 description: The fitness goal of the user.
 *                 example: "Gain Weight"
 *               role:
 *                 type: string
 *                 description: The role of the user (Client).
 *                 example: "Client"
 *               cost:
 *                 type: string
 *                 description: The cost (for coaches only).
 *                 example: ""
 *               specialties:
 *                 type: string
 *                 description: The specialties (for coaches only).
 *                 example: ""
 *     responses:
 *       200:
 *         description: User survey information updated successfully. The response includes a success message, the result of the user information update operation, and additional information about the user's goals and coach-related details if applicable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                      fieldCount:
 *                          type: integer
 *                      affectedRows:
 *                          type: integer
 *                      insertID:
 *                          type: integer
 *                      info:
 *                          type: string
 *                      serverStatus:
 *                          type: integer
 *                      warningStatus:
 *                          type: integer
 *                      changedRows:
 *                          type: integer
 *       403:
 *         description: The user is too young to register (less than 8 years old).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: The HTTP status code indicating the error.
 *                       example: 403
 *                     message:
 *                       type: string
 *                       description: A detailed error message.
 *                       example: "7: is less than 8. Too young to register"
 *                     details:
 *                       type: string
 *                       description: Additional details about the error.
 *                       example: "Unable to update user and storeSurvey"
 *       404:
 *         description: Unable to find the requested resource.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: object
 *                   properties:
 *                     status:
 *                       type: integer
 *                       description: The HTTP status code indicating the error.
 *                       example: 404
 *                     message:
 *                       type: string
 *                       description: A detailed error message.
 *                       example: "Resource not found."
 *                     details:
 *                       type: string
 *                       example: Unable to update user and storeSurvey
 */

router.post("/initalSurvey", storeSurvey);

module.exports = router;
