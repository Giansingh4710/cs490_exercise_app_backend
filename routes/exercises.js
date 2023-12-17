const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { 
  getAllExercises,
  searchExercise,
  disableExercise,
  enableExercise,
  createExercise,
  getExerciseData
 } = require("../controllers/exercise.js");

/**
 * @swagger
 * tags:
 *   name: exercises
 */

/**
 *  @swagger
 *  /exercises/allExercises:
 *  get:
 *      summary: Returns all exercises
 *      tags: [exercises]
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

/**
 *  @swagger
 *  /exercises/search:
 *  get:
 *      summary: Search for exercises based on muscle group and equipment
 *      tags: [exercises]
 *      parameters:
 *        - in: query
 *          name: muscleGroup
 *          schema:
 *            type: string
 *          required: false
 *          description: The muscle group for which exercises are to be searched
 *        - in: query
 *          name: equipment
 *          schema:
 *            type: string
 *          required: false
 *          description: The equipment used for the exercises
 *      responses:
 *          200:
 *              description: List of exercises matching the search criteria
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  exerciseID:
 *                                      type: integer
 *                                      description: The unique identifier for the exercise
 *                                  name:
 *                                      type: string
 *                                      description: The name of the exercise
 *                                  type:
 *                                      type: string
 *                                      description: The type of the exercise
 *                                  difficulty:
 *                                      type: string
 *                                      description: The difficulty level of the exercise
 *                                  muscleGroup:
 *                                      type: string
 *                                      description: The muscle group targeted by the exercise
 *                                  equipment:
 *                                      type: string
 *                                      description: The equipment used for the exercise
 *                          example:
 *                              - exerciseID: 1
 *                                name: "Bench Press"
 *                                type: "Strength"
 *                                difficulty: "Intermediate"
 *                                muscleGroup: "Chest"
 *                                equipment: "Barbell"
 *                              - exerciseID: 2
 *                                name: "Leg Press"
 *                                type: "Strength"
 *                                difficulty: "Beginner"
 *                                muscleGroup: "Legs"
 *                                equipment: "Machine"
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
 *                                          example: Error trying to searchExercise in database.
 */
router.get("/search", searchExercise);

/**
 *  @swagger
 *  /exercises/disable:
 *  get:
 *      summary: Disable an exercise by exercise ID
 *      tags: [exercises]
 *      parameters:
 *        - in: query
 *          name: exerciseID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the exercise to be disabled
 *      responses:
 *          200:
 *              description: Exercise disabled successfully
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
 *                                  example: Exercise disabled successfully
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
 *                                          example: Error trying to disable Exercise in database.
 */
router.get("/disableExercise", disableExercise);

/**
 *  @swagger
 *  /exercises/enable:
 *  get:
 *      summary: Enable an exercise by exercise ID
 *      tags: [exercises]
 *      parameters:
 *        - in: query
 *          name: exerciseID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the exercise to be enabled
 *      responses:
 *          200:
 *              description: Exercise enabled successfully
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
 *                                  example: Exercise enabled successfully
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
 *                                          example: Error trying to enable Exercise in database.
 */
router.get("/enableExercise", enableExercise);

/**
 *  @swagger
 *  /exercises/create:
 *  post:
 *      summary: Create a new exercise and add it to the exercise bank
 *      tags: [exercises]
 *      requestBody:
 *          description: Object containing exercise details
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the exercise
 *                          type:
 *                              type: string
 *                              description: The type of the exercise
 *                          difficulty:
 *                              type: string
 *                              description: The difficulty level of the exercise
 *                          muscleGroup:
 *                              type: string
 *                              description: The muscle group targeted by the exercise
 *                          equipment:
 *                              type: string
 *                              description: The equipment used for the exercise
 *                          metric:
 *                              type: string
 *                              description: The way the exercise is counted. Reps or Duration
 *      responses:
 *          201:
 *              description: Exercise added to exercise bank successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: Exercise added to exercise bank
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
 *                                          example: Error inserting exercise into database
 */
router.post("/createExercise", createExercise);

/**
 *  @swagger
 *  /exercises/{exerciseID}:
 *  get:
 *      summary: Get data for a specific exercise by exercise ID
 *      tags: [exercises]
 *      parameters:
 *        - in: path
 *          name: exerciseID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the exercise
 *      responses:
 *          200:
 *              description: Exercise data retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              exerciseID:
 *                                  type: integer
 *                                  description: The unique identifier for the exercise
 *                              name:
 *                                  type: string
 *                                  description: The name of the exercise
 *                              type:
 *                                  type: string
 *                                  description: The type of the exercise
 *                              difficulty:
 *                                  type: string
 *                                  description: The difficulty level of the exercise
 *                              muscleGroup:
 *                                  type: string
 *                                  description: The muscle group targeted by the exercise
 *                              equipment:
 *                                  type: string
 *                                  description: The equipment used for the exercise
 *                              metric:
 *                                  type: string
 *                                  description: The way the exercise is counted. Reps or Duration
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
 */
router.get("/:exerciseID", getExerciseData);

module.exports = router;
