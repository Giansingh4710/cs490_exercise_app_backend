const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const {
    getAssignedWorkoutPlan,
    clientAddExercise,
    getPersonalWorkoutPlan,
    getLast5DaysOfWorkouts,
    coachAddExercise,
    clientEditExercise,
    clientDeleteExercise,
    recordWorkout,
    getAssignedWorkoutPlanForCoach,
    coachDeleteExercise,
    coachEditExercise
} = require("../controllers/workoutPlan.js");

/**
 * @swagger
 * tags:
 *   name: Workout Plan
 */

/**
 *  @swagger
 *  /workoutPlan/coach/workouts:
 *  get:
 *      summary: Get assigned workout plan for the user
 *      tags: [Workout Plan]
 *      responses:
 *          200:
 *              description: Workout plan retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              monday:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          planID:
 *                                              type: integer
 *                                              description: The unique identifier for the workout plan
 *                                              example: 1
 *                                          exercise:
 *                                              type: string
 *                                              description: The name of the exercise
 *                                              example: "Push-ups"
 *                                          sets:
 *                                              type: integer
 *                                              description: The number of sets for the exercise
 *                                              example: 3
 *                                          reps:
 *                                              type: array
 *                                              items:
 *                                                  type: integer
 *                                              description: An array of repetitions for the exercise
 *                                              example: [10, 12, 15]
 *                                          weight:
 *                                              type: array
 *                                              items:
 *                                                  type: number
 *                                              description: An array of weights used for the exercise
 *                                              example: [20, 25, 30]
 *                                          metric:
 *                                              type: string
 *                                              description: The metric for weight (e.g., "kg" or "lbs")
 *                                              example: "reps"
 *                                          equipment:
 *                                              type: string
 *                                              description: The equipment used for the exercise
 *                                              example: "Dumbbells"
 *                                          duration:
 *                                              type: array
 *                                              items:
 *                                                  type: integer
 *                                              description: An array of durations for the exercise (in minutes)
 *                                              example: [10, 15, 20]
 *                          example:
 *                              monday:
 *                                  - planID: 1
 *                                    exercise: "Push-ups"
 *                                    sets: 3
 *                                    reps: [10, 12, 15]
 *                                    weight: [20, 25, 30]
 *                                    metric: "reps"
 *                                    equipment: "Dumbbells"
 *                                    duration: [10, 15, 20]
 *                                  - planID: 2
 *                                    exercise: "Squats"
 *                                    sets: 4
 *                                    reps: [8, 10, 12]
 *                                    weight: [30, 35, 40]
 *                                    metric: "reps"
 *                                    equipment: "Barbell"
 *                                    duration: [12, 18, 22]
 *                              tuesday:
 *                                  # ... other exercises for Tuesday
 *          500:
 *              description: Error accessing workout plan.
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
 *                                          example: Database connection error.
 */
router.get("/coach/Workouts", requireAuthedUser, getAssignedWorkoutPlan); // this is for user to get their assigned workoutplan

router.get("/coach/WorkoutsFromCoach", requireAuthedUser, getAssignedWorkoutPlanForCoach)

/**
 *  @swagger
 *  /workoutPlan/client/workouts:
 *  get:
 *      summary: Get personal workout plan for the user
 *      tags: [Workout Plan]
 *      responses:
 *          200:
 *              description: Personal workout plan retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              monday:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          planID:
 *                                              type: integer
 *                                              description: The unique identifier for the workout plan
 *                                              example: 1
 *                                          exercise:
 *                                              type: string
 *                                              description: The name of the exercise
 *                                              example: "Push-ups"
 *                                          sets:
 *                                              type: integer
 *                                              description: The number of sets for the exercise
 *                                              example: 3
 *                                          reps:
 *                                              type: array
 *                                              items:
 *                                                  type: integer
 *                                              description: An array of repetitions for the exercise
 *                                              example: [10, 12, 15]
 *                                          weight:
 *                                              type: array
 *                                              items:
 *                                                  type: number
 *                                              description: An array of weights used for the exercise
 *                                              example: [20, 25, 30]
 *                                          metric:
 *                                              type: string
 *                                              description: The metric for weight (e.g., "kg" or "lbs")
 *                                              example: "reps"
 *                                          equipment:
 *                                              type: string
 *                                              description: The equipment used for the exercise
 *                                              example: "Dumbbells"
 *                                          duration:
 *                                              type: array
 *                                              items:
 *                                                  type: integer
 *                                              description: An array of durations for the exercise (in minutes)
 *                                              example: [10, 15, 20]
 *                          example:
 *                              monday:
 *                                  - planID: 1
 *                                    exercise: "Push-ups"
 *                                    sets: 3
 *                                    reps: [10, 12, 15]
 *                                    weight: [20, 25, 30]
 *                                    metric: "reps"
 *                                    equipment: "Dumbbells"
 *                                    duration: [10, 15, 20]
 *                                  - planID: 2
 *                                    exercise: "Squats"
 *                                    sets: 4
 *                                    reps: [8, 10, 12]
 *                                    weight: [30, 35, 40]
 *                                    metric: "reps"
 *                                    equipment: "Barbell"
 *                                    duration: [12, 18, 22]
 *                              tuesday:
 *                                  # ... other exercises for Tuesday
 *          500:
 *              description: Error accessing personal workout plan.
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
 *                                          example: Database connection error.
 */
router.get("/client/Workouts", requireAuthedUser, getPersonalWorkoutPlan);

/**
 *  @swagger
 *  workoutPlan/client/addExercise:
 *  post:
 *      summary: User can add an exercise to their workout plan
 *      tags: [Workout Plan]
 *      description: This endpoint adds an exercise to the user's workout plan.
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          exerciseID:
 *                              type: integer
 *                              description: ExerciseID of the exercise to be added to the workout plan
 *                              example: 12
 *                          dayOfWeek:
 *                              type: string
 *                              description: Day of the week to add the exercise to
 *                              example: 'monday'
 *                          sets:
 *                              type: array
 *                              description: List of sets for the exercise
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      reps:
 *                                          type: integer
 *                                          description: Number of repetitions for the set
 *                                          example: 5
 *                                      weight:
 *                                          type: number
 *                                          description: Weight used for the set
 *                                          example: 110
 *      responses:
 *          201:
 *              description: Exercise has been added to the workout plan
 *          500:
 *              description: Error accessing the database.
 */
router.post("/client/addExercise", requireAuthedUser, clientAddExercise);

/**
 *  @swagger
 *  workoutPlan/coach/addExercise:
 *  post:
 *      summary: coach can add an exercise to one of their client's workout plan
 *      tags: [Workout Plan]
 *      description: This endpoint adds an exercise to the user's workout plan by a coach
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          exerciseID:
 *                              type: integer
 *                              description: ExerciseID of the exercise to be added to the workout plan
 *                              example: 12
 *                          dayOfWeek:
 *                              type: string
 *                              description: Day of the week to add the exercise to
 *                              example: 'monday'
 *                          sets:
 *                              type: array
 *                              description: List of sets for the exercise
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      reps:
 *                                          type: integer
 *                                          description: Number of repetitions for the set
 *                                          example: 5
 *                                      weight:
 *                                          type: number
 *                                          description: Weight used for the set
 *                                          example: 110
 *                          userID:
 *                              type: integer
 *                              example: 50
 *      responses:
 *          201:
 *              description: Exercise has been added to the workout plan
 *          500:
 *              description: Error accessing the database.
 */
router.post("/coach/addExercise", requireAuthedUser, coachAddExercise);

/**
 *  @swagger
 *  /workoutPlan/client/editExercise:
 *  post:
 *      summary: Add exercise to client's workout plan
 *      tags: [Workout Plan]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          planID:
 *                              type: integer
 *                              example: 5
 *                          sets:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      reps:
 *                                          type: integer
 *                                          description: The number of repetitions for the exercise
 *                                          example: 10
 *                                      weight:
 *                                          type: number
 *                                          description: The weight used for the exercise
 *                                          example: 20
 *      responses:
 *          201:
 *              description: Exercise added to client's workout plan successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 201
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: "Exercise added to workout"
 *                          example:
 *                              status: 201
 *                              message: "Exercise added to workout"
 *          500:
 *              description: Error adding exercise to client's workout plan.
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
 *                                          example: Database connection error.
 */
router.post("/client/editExercise", requireAuthedUser, clientEditExercise);

/**
 *  @swagger
 *  /workoutPlan/coach/editExercise:
 *  post:
 *      summary: Adding exercise to client's workout plan by coach
 *      tags: [Workout Plan]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          planID:
 *                              type: integer
 *                              example: 5
 *                          sets:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      reps:
 *                                          type: integer
 *                                          description: The number of repetitions for the exercise
 *                                          example: 10
 *                                      weight:
 *                                          type: number
 *                                          description: The weight used for the exercise
 *                                          example: 20
 *                          userID:
 *                              type: integer
 *                              example: 10
 *      responses:
 *          201:
 *              description: Exercise added to client's workout plan successfully by coach
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 201
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: "Exercise added to workout"
 *                          example:
 *                              status: 201
 *                              message: "Exercise added to workout"
 *          500:
 *              description: Error adding exercise to client's workout plan by coach
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
 *                                          example: Database connection error.
 */
router.post("/coach/editExercise", requireAuthedUser, coachEditExercise);

/**
 *  @swagger
 *  /workoutPlan/client/deleteExercise:
 *  delete:
 *      summary: Delete exercise from client's workout plan
 *      tags: [Workout Plan]
 *      parameters:
 *        - in: query
 *          name: planID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the workout plan
 *      responses:
 *          200:
 *              description: Exercise deleted from client's workout plan successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: "Exercise Deleted"
 *                          example:
 *                              message: "Exercise Deleted"
 *          500:
 *              description: Error deleting exercise from client's workout plan.
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
 *                                          example: Database connection error.
 */
router.delete("/client/deleteExercise", requireAuthedUser, clientDeleteExercise)

/**
 *  @swagger
 *  /workoutPlan/coach/deleteExercise:
 *  delete:
 *      summary: Delete exercise from client's workout plan by coach
 *      tags: [Workout Plan]
 *      parameters:
 *        - in: query
 *          name: planID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the workout plan
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user
 *      responses:
 *          200:
 *              description: Exercise deleted from client's workout plan successfully by coach
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: "Exercise Deleted"
 *                          example:
 *                              message: "Exercise Deleted"
 *          500:
 *              description: Error deleting exercise from client's workout plan by coach
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
 *                                          example: Database connection error.
 */
router.delete("/coach/deleteExercise", requireAuthedUser, coachDeleteExercise)

/**
 *  @swagger
 *  /workoutPlan/getPastWorkouts:
 *  get:
 *      summary: Get recorded workouts from the last 5 days
 *      tags: [Workout Plan]
 *      responses:
 *          200:
 *              description: Recorded workouts from the last 5 days retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              "2023-12-15":
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          exerciseID:
 *                                              type: integer
 *                                              description: The unique identifier for the exercise
 *                                              example: 1
 *                                          exercise:
 *                                              type: string
 *                                              description: The name of the exercise
 *                                              example: "Push-up"
 *                                          sets:
 *                                              type: integer
 *                                              description: The number of sets for the exercise
 *                                              example: 3
 *                                          reps:
 *                                              type: array
 *                                              items:
 *                                                  type: integer
 *                                              description: The repetitions for the exercise
 *                                              example: [10, 12, 15]
 *                                          weight:
 *                                              type: array
 *                                              items:
 *                                                  type: number
 *                                              description: The weights used for the exercise
 *                                              example: [20, 25, 30]
 *                                          metric:
 *                                              type: string
 *                                              description: The metric for the exercise (e.g., "Reps" or "Duration")
 *                                              example: "Reps"
 */
router.get("/getPastWorkouts", requireAuthedUser, getLast5DaysOfWorkouts);

/**
 *  @swagger
 *  /workoutPlan/recordWorkout:
 *  post:
 *      summary: Record workout for a specific exercise plan
 *      tags: [Workout Plan]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          planID:
 *                              type: integer
 *                              description: The unique identifier for the exercise plan
 *                              example: 1
 *                          sets:
 *                              type: array
 *                              items:
 *                                  type: object
 *                                  properties:
 *                                      reps:
 *                                          type: integer
 *                                          description: The number of repetitions for the set
 *                                          example: 10
 *                                      weight:
 *                                          type: number
 *                                          description: The weight used for the set (applicable for "Reps" metric)
 *                                          example: 20
 *                          date:
 *                              type: string
 *                              format: date
 *                              description: The date on which the workout is recorded
 *                              example: "2023-12-17"
 *      responses:
 *          201:
 *              description: Workout recorded successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          example:
 *                              status: 201
 *                              message: "Workout recorded"
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 201
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: "Workout recorded"
 *          500:
 *              description: Error recording workout.
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
 *                                  example: Error recording workout
 */
router.post("/recordWorkout", requireAuthedUser, recordWorkout);

module.exports = router;
