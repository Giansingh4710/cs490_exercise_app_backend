const express = require("express");
const router = express.Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);

const { logWaterIntake } = require("../controllers/logActivity.js");

/**
 *  @swagger
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
 * 
 * 
 */
router.post("/logWaterIntake", requireAuthedUser, logWaterIntake);

module.exports = router;
