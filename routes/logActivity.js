const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { recordDailySurvey, userDailyWeight } = require("../controllers/logActivity.js");

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

router.get("/dailyWeight", requireAuthedUser, userDailyWeight);

module.exports = router;
