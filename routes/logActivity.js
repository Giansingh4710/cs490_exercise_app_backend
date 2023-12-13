const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { recordDailySurvey } = require("../controllers/logActivity.js");

/**
 *  /logActivity/logWaterIntake:
 *  post:
 *      summary: Logs water intake recorded by user into the database
 *      description: Logs the water intake of a user for the daily survey and stores into the database. NOTE User token is required for this endpoint
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          amount:
 *                              type: integer
 *                              description: Amount of water
 *                              example: 100
 *                          unit:
 *                              type: string
 *                              description: Unit of water
 *                              example: fl oz
 *      responses:
 *          200:
 *              description: Water intake logged successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: "Water Input Recorded"
 *                              info:
 *                                  type: object
 *                                  properties:
 *                                      fieldCount:
 *                                          type: integer
 *                                          example: 5
 *                                      affectedRows:
 *                                          type: integer
 *                                          example: 1
 *                                      insertId:
 *                                          type: integer
 *                                          example: 250
 *                                      info:
 *                                          type: string
 *                                          example: ""
 *                                      serverStatus:
 *                                          type: integer
 *                                          example: 2
 *                                      warningStatus:
 *                                          type: integer
 *                                          exmaple: 0
 *                                      changedRows:
 *                                          type: integer              
 *                                          example: 0
 *          500:
 *              description: Error accessing Database.
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: string
 *                                  example: Invalid Date Format
 *                              details: 
 *                                  type: string
 *                                  example: "Error logging water intake"                             
 */
// router.post("/logWaterIntake", requireAuthedUser, logWaterIntake);

/**
 *  @swagger
 *  /logActivity/recordDailySurvey:
 *  post:
 *      summary: Records daily survey data into database
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          waterData:
 *                              type: object
 *                              properties:
 *                                  amount:
 *                                      type: integer
 *                                      example: 100
 *                                  unit:
 *                                      type: string
 *                                      description: Unit of water
 *                                      example: fl oz
 *                          weightData:
 *                              type: integer
 *                              example: 185
 *                          moodData:
 *                              type: string
 *                              example: Happy
 *      responses:
 *          201:
 *              description: Daily survey recorded successfuly
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              message:
 *                                  type: string
 *                                  example: Daily survey recorded
 *                              details:
 *                                  type: string
 *                                  example: Water intake, weight, and mental state recorded
 *          400:
 *              description: User has already completed daily survey for the day
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
 *                                          example: 400
 *                                      message:
 *                                          type: string
 *                                          example: User already completed daily survey
 *                                      details:
 *                                          type: string
 *                                          example: User has already completed the daily survey for today 2023-12-10
 *          500:
 *              description: Error accessing database
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
 *                                          example: 500
 *                                      message:
 *                                          type: string
 *                                          example: Error inserting into database
 *                                      details:
 *                                          type: string
 *                                          example: Error recording daily survey
 */
router.post("/recordDailySurvey", requireAuthedUser, recordDailySurvey);

module.exports = router;
