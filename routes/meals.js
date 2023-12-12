const express = require("express");
const router = express.Router();

const {requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { getMeals, deleteMeal } = require("../controllers/meals.js")

/**
 *  @swagger
 *  /meals:
 *  get:
 *       summary: Returns all recorded meals of user from today
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

router.delete("/:mealID", requireAuthedUser, deleteMeal)

module.exports = router;