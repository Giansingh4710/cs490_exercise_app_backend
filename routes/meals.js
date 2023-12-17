const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { getMeals, deleteMeal, createMeal } = require("../controllers/meals.js")

/**
 * @swagger
 * tags:
 *   name: meals
 */

/**
 *  @swagger
 *  /meals:
 *  get:
 *       summary: Returns all recorded meals of user from today
 *       tags: [meals]
 *       responses:
 *            200:
 *                description: Successful response
 *                content:
 *                   application/json:
 *                        example:
 *                            breakfast:
 *                                - foodName: Salad
 *                                  calories: 633
 *                            brunch:
 *                                - foodName: Yogurt
 *                                  calories: 1064
 *                            lunch:
 *                                - foodName: Pizza
 *                                  calories: 907
 *                            snack:
 *                                - foodName: Steak
 *                                  calories: 1140
 *                                - foodName: Steak
 *                                  calories: 275
 *            500:
 *                description: Error accessing Database.
 *                content:
 *                    application/json:
 *                        schema:
 *                            type: object
 *                            properties:
 *                                error:
 *                                    type: object
 *                                    properties:
 *                                        status:
 *                                            type: integer
 *                                            description: HTTP status code of response
 *                                            example: 500
 *                                        message:
 *                                            type: string
 *                                            description: Error message
 *                                            example: Error accessing database
 *                                        details:
 *                                            type: string
 *                                            description: Additional details about error
 *                                            example: Error getting meals from database
 */
router.get("/", requireAuthedUser, getMeals);

/**
 *  @swagger
 *  /meals/{mealID}:
 *  delete:
 *      summary: Delete a meal by meal ID
 *      tags: [meals]
 *      parameters:
 *        - in: path
 *          name: mealID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the meal to be deleted
 *      responses:
 *          200:
 *              description: Meal deleted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 200
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: Meal deleted successfully
 *                              deletedMeal:
 *                                  type: object
 *                                  properties:
 *                                      meal:
 *                                          type: object
 *                                          properties:
 *                                              fieldCount:
 *                                                  type: integer
 *                                              affectedRows:
 *                                                  type: integer
 *                                              insertId:
 *                                                  type: integer
 *                                              info:
 *                                                  type: string
 *                                              serverStatus:
 *                                                  type: integer
 *                                              warningStatus:
 *                                                  type: integer
 *                                              changedRows:
 *                                                  type: integer
 *                          example:
 *                              status: 200
 *                              message: "Meal deleted successfully"
 *                              deletedMeal:
 *                                  meal:
 *                                      fieldCount: 0
 *                                      affectedRows: 0
 *                                      insertId: 0
 *                                      info: ""
 *                                      serverStatus: 2
 *                                      warningStatus: 0
 *                                      changedRows: 0
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
 *                                          example: Error getting meals from database
 */
router.delete("/:mealID", requireAuthedUser, deleteMeal);

/**
 *  @swagger
 *  /meals:
 *  post:
 *      summary: Record a new meal
 *      tags: [meals]
 *      requestBody:
 *          description: Object containing meal details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      required:
 *                          - mealName
 *                          - calories
 *                          - protein
 *                          - fat
 *                          - mealType
 *                      properties:
 *                          mealName:
 *                              type: string
 *                              description: The name of the meal
 *                          calories:
 *                              type: integer
 *                              description: The number of calories in the meal
 *                          protein:
 *                              type: integer
 *                              description: The amount of protein in the meal
 *                          fat:
 *                              type: integer
 *                              description: The amount of fat in the meal
 *                          mealType:
 *                              type: string
 *                              description: The type of the meal
 *      responses:
 *          201:
 *              description: Meal recorded successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: Meal recorded
 *                              id:
 *                                  type: integer
 *                                  description: The unique identifier for the recorded meal
 *                          example:
 *                              message: "Meal recorded"
 *                              id: 123
 *          400:
 *              description: Bad Request.
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
 *                                          example: Nutrients values must be integers and positive
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Invalid nutrients values provided
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
 *                                          example: Error inserting meal into database
 */
router.post("/mealInput", requireAuthedUser, createMeal)

module.exports = router;
