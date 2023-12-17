const router = require("express").Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const { getCoachOfUser, removeCoach, getUserData, deleteAccount } = require(
  "../controllers/user.js",
);

/**
 * @swagger
 * tags:
 *   name: Users
 */

/**
 *  @swagger
 *  /user/coach:
 *  get:
 *      summary: Get coach information for a user
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user
 *      responses:
 *          200:
 *              description: Coach information retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              coachID:
 *                                  type: integer
 *                                  description: The unique identifier for the coach
 *                                  example: 27
 *                              firstName:
 *                                  type: string
 *                                  description: The first name of the coach
 *                                  example: "Bob"
 *                              lastName:
 *                                  type: string
 *                                  description: The last name of the coach
 *                                  example: "Singer"
 *                              city:
 *                                  type: string
 *                                  description: The city where the coach is located
 *                                  example: "sdgdf"
 *                              state:
 *                                  type: string
 *                                  description: The state where the coach is located
 *                                  example: "New Jersey"
 *                              specialties:
 *                                  type: string
 *                                  description: The specialties of the coach
 *                                  example: "Lose Weight"
 *                              userID:
 *                                  type: integer
 *                                  description: The unique identifier for the user associated with the coach
 *                                  example: 102
 *                          example:
 *                              coachID: 27
 *                              firstName: "Bob"
 *                              lastName: "Singer"
 *                              city: "Newark"
 *                              state: "New Jersey"
 *                              specialties: "Lose Weight"
 *                              userID: 102
 *          500:
 *              description: Error accessing Database.
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
 *                                          example: Error accessing database
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Error trying to get coach information from database.
 */
router.get("/coach", requireAuthedUser, getCoachOfUser);

/**
 *  @swagger
 *  /user/coach:
 *  delete:
 *      summary: Remove coach from user
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user
 *      responses:
 *          200:
 *              description: Coach removed successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the success of coach removal
 *                                  example: "Coach removed"
 *                          example:
 *                              message: "Coach removed"
 *          400:
 *              description: User does not have a coach.
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
 *                                          example: User does not have a coach
 *          500:
 *              description: Error removing coach.
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
 *                                          example: Error removing coach
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Error accessing database.
 */
router.delete("/coach", requireAuthedUser, removeCoach);

/**
 *  @swagger
 *  /user/data:
 *  get:
 *      summary: Get user data
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user
 *      responses:
 *          200:
 *              description: User data retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              firstName:
 *                                  type: string
 *                                  description: The first name of the user
 *                                  example: "John"
 *                              email:
 *                                  type: string
 *                                  description: The email address of the user
 *                                  example: "john@example.com"
 *                              lastName:
 *                                  type: string
 *                                  description: The last name of the user
 *                                  example: "Doe"
 *                              activityLevel:
 *                                  type: string
 *                                  description: The activity level of the user
 *                                  example: "Moderate"
 *                              city:
 *                                  type: string
 *                                  description: The city where the user is located
 *                                  example: "New York"
 *                              dob:
 *                                  type: string
 *                                  description: The date of birth of the user (formatted as YYYY-MM-DD)
 *                                  example: "1990-01-01"
 *                              gender:
 *                                  type: string
 *                                  description: The gender of the user
 *                                  example: "Male"
 *                              height:
 *                                  type: number
 *                                  description: The height of the user (in centimeters or inches)
 *                                  example: 175
 *                              phoneNum:
 *                                  type: string
 *                                  description: The phone number of the user
 *                                  example: "+1234567890"
 *                              state:
 *                                  type: string
 *                                  description: The state where the user is located
 *                                  example: "California"
 *                              streetAddress:
 *                                  type: string
 *                                  description: The street address of the user
 *                                  example: "123 Main St"
 *                              weight:
 *                                  type: number
 *                                  description: The weight of the user (in kilograms or pounds)
 *                                  example: 70
 *                              zipCode:
 *                                  type: string
 *                                  description: The ZIP code of the user
 *                                  example: "12345"
 *                              role:
 *                                  type: string
 *                                  description: The role of the user (e.g., "User", "Coach")
 *                                  example: "User"
 *                              goal:
 *                                  type: string
 *                                  description: The goal type of the user (if applicable)
 *                                  example: "Weight Loss"
 *                              specialties:
 *                                  type: string
 *                                  description: The specialties of the coach (if applicable)
 *                                  example: "Strength Training"
 *                              cost:
 *                                  type: number
 *                                  description: The cost associated with the coach (if applicable)
 *                                  example: 50.00
 *                          example:
 *                              firstName: "John"
 *                              email: "john@example.com"
 *                              lastName: "Doe"
 *                              activityLevel: "Moderate"
 *                              city: "New York"
 *                              dob: "1990-01-01"
 *                              gender: "Male"
 *                              height: 175
 *                              phoneNum: "+1234567890"
 *                              state: "California"
 *                              streetAddress: "123 Main St"
 *                              weight: 70
 *                              zipCode: "12345"
 *                              role: "User"
 *                              goal: "Weight Loss"
 *                              specialties: "Strength Training"
 *                              cost: 50.00
 *          500:
 *              description: Error accessing user data.
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
 *                                          example: Error accessing user data
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Error accessing database.
 */
router.get("/data", requireAuthedUser, getUserData);

/**
 *  @swagger
 *  /user/deleteAccount:
 *  delete:
 *      summary: Delete user account
 *      tags: [Users]
 *      parameters:
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user
 *      responses:
 *          200:
 *              description: User account deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: A message indicating the success of the account deletion
 *                                  example: "Account deleted"
 *                          example:
 *                              message: "Account deleted"
 *          500:
 *              description: Error deleting user account.
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
 *                                          example: Error deleting account
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Error accessing database.
 */
router.delete("/deleteAccount", requireAuthedUser, deleteAccount)

module.exports = router;