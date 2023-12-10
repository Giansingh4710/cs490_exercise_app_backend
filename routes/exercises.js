const express = require("express");
const router = express.Router();

const {requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const {
    getAllExercises,
  } = require("../Controllers/exercise.js");

/**
 *  @swagger
 *  /exercises/allExercises:
 *  get:
 *      summary: Returns all exercises
 *      description: Returns coachID, firstName, lastName of all coaches
 *      responses:
 *          200:
 *              description: List of all coaches matching the name given in the query
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  exerciseID:
 *                                      type: integer
 *                                  name:
 *                                      type: string
 *                                  type:
 *                                      type: string
 *                                  difficulty:
 *                                      type: string
 *                                  muscleGroup:
 *                                    type: string
 *                          example:
 *                            - exerciseID: 1
 *                              name: Push-up
 *                              type: Compound
 *                              difficulty: Beginner
 *                              muscleGroup: Chest
 *                            - exerciseID: 2
 *                              name: Diamond Push Up
 *                              type: Compound
 *                              difficulty: Intermediate
 *                              muscleGroup: Chest       
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
 *                                          example: Error trying to get all exercises from the database.
 */
  router.get("/allExercises", getAllExercises);

  module.exports = router;