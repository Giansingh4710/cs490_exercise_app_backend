const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const {
    getWorkoutPlan,
    addExercise
} = require("../controllers/workoutPlan.js");

// if supplying userID in query params, then coach trying to access view workout plan
/**
 *  @swagger
 *  /workoutPlan/{userID?}:
 *  get:
 *      summary: Gets workout plan of user, userID is optional. Read description. NOT FINISHED NEED UPDATES TO DATABASE. GOOD ENOUGH FOR TESTING WITH FRONTEND
 *      description: This endpoint gets the workout plan of a user. This endpoint will allow a user to view their own assigned workout plan and it will also allow a coach to view the workout plan of one of their clients
 *                  <br>GET /workoutPlan will get the signed in user's workout plan
 *                  <br>GET /workoutPlan/{userID} will allow a signed in COACH to view the workout plan of the client who's userID was passed in the path
 *      parameters:
 *        - in: path
 *          name: userID
 *          required: false
 *          description: userID of user that a coach wants to view the workout plan of
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: User's workout plan is returned by endpoint
 *          403:
 *              description: Coach is signed in user and is trying to access workout plan of user that is not their client
 *          500:
 *              description: Error accessing Database.
 */
router.get("/:userID?", requireAuthedUser, getWorkoutPlan);

/**
 *  @swagger
 *  /workoutPlan/addExercise:
 *  get:
 *      summary: User or Coach of User can add an exercise to their workout plan. NOT FINISHED NEED UPDATES TO DATABASE. GOOD ENOUGH FOR TESTING WITH FRONTEND
 *      description: This endpoint gets the workout plan of a user. This endpoint will allow a user to add an exercise to their workout plan and it will also allow a coach to add an exercise the workout plan of one of their clients
 *                  <br>
 *                  <br>GET /workoutPlan/{userID} will allow a signed in COACH to view the workout plan of the client who's userID was passed in the path
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userID:
 *                              type: integer
 *                              description: UserID of user to add exercise to workout plan for
 *                              example: 101
 *                          exerciseID:
 *                              type: integer
 *                              description: ExerciseID of exercise to be added to workout plan
 *                              example: 12
 *                          dayOfWeek:
 *                              type: string
 *                              description: Day of week to add exercise to
 *                              example: 'monday'
 *      responses:
 *          201:
 *              description: Exercise has been added to workout plan
 *          403:
 *              description: Coach is signed in user and is trying to access workout plan of user that is not their client. Or User is not a coach.
 *          500:
 *              description: Error accessing Database.
 */
router.post("/addExercise", requireAuthedUser, addExercise);

module.exports = router;
