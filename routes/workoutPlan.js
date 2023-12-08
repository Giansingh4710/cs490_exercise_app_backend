const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const {
    getWorkoutPlan
} = require("../controllers/workoutPlan.js");

// if supplying userID in query params, then coach trying to access view workout plan
/**
 *  @swagger
 *  /workoutPlan/{userID?}:
 *  get:
 *      summary: Gets workout plan of user, userID is optional. Read description
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



module.exports = router;
