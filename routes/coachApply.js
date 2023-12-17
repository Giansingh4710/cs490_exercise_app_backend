const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getAllPending, 
  getPendingByID,
  acceptCoach,
  denyCoach,
  createCoachRequest,
} = require("../controllers/coachApply.js");

/**
 *  @swagger
 *  coachApply/allPending:
 *  get:
 *      summary: Returns all coach applications that are pending
 *      responses:
 *          200:
 *              description: Successfully returned all pending coach applications
 *              content:
 *                  schema:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              coachRequestID:
 *                                  type: integer
 *                              userID:
 *                                  type: integer
 *                              firstName:
 *                                  type: string
 *                              lastName:
 *                                  type: string
 *                              status:
 *                                  type: string
 *                              specialties:
 *                                  type: string
 *                              cost:
 *                                  type: integer
 *                      example:
 *                        - coachRequestID: 1
 *                          userID: 30
 *                          firstName: "Vanya"
 *                          lastName: Stanbridge
 *                          specialties: Weight gain
 *                          cost: 120
 *                        - coachRequestID: 2
 *                          userID: 64
 *                          firstName: Bill
 *                          lastName: Perice
 *                          specialties: Weight lose
 *                          cost: 170
  *          500:
 *              description: Error in database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 500
 *                              message:
 *                                  type: string
 *                                  example: "Error accessing database"
 *                              details:      
 *                                  type: string
 *                                  example: "Error trying to get pending coach applications from database."
 */
router.get("/allPending", getAllPending);

/**
 *  @swagger
 *  coachApply/pending:
 *  get:
 *      parameters:
 *        - in: query
 *          name: coachRequestID
 *          required: true
 *          schema:
 *              type: integer
 *      summary: Get a pending request by request ID
 *      responses:
 *          200:
 *              description: Successfully returned the pending coach application
 *              content:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          coachRequestID:
 *                              type: integer
 *                          userID:
 *                             type: integer
 *                          firstName:
 *                              type: string
 *                          lastName:
 *                              type: string
 *                          status:
 *                              type: string
 *                          specialties:
 *                              type: string
 *                          cost:
 *                              type: integer
 *                      example:
 *                        - coachRequestID: 1
 *                          userID: 30
 *                          firstName: "Vanya"
 *                          lastName: Stanbridge
 *                          specialties: Weight gain
 *                          cost: 120
 *          404:
 *              description: No pending coach application was found for the given coachRequestID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 404
 *                              message:
 *                                  type: string
 *                                  example: "No pending coach application found with coachRequestID:2"
 *                              details:      
 *                                  type: string
 *                                  example: "Error fetching pending coach data from database"
 *          500:
 *              description: Error in database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 500
 *                              message:
 *                                  type: string
 *                                  example: "Error accessing database"
 *                              details:      
 *                                  type: string
 *                                  example: "Error trying to get pending coach applications from database."
 * 
 * 
 */
router.get("/pending", getPendingByID),

/**
 *  @swagger
 *  coachApply/accept:
 *  get:
 *      parameters:
 *        - in: query
 *          name: coachRequestID
 *          required: true
 *          schema:
 *              type: integer
 *      summary: Accepts coach request
 *      responses:
 *          200:
 *              description: Successfully accepted coach request
 *              content:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fieldCount:
 *                              type: integer
 *                          affectedRows:
 *                             type: integer
 *                          insertID:
 *                              type: integer
 *                          info:
 *                              type: string
 *                          serverStatus:
 *                              type: integer
 *                          warningStatus:
 *                              type: integer
 *                          changedRows:
 *                              type: integer
 *                      example:
 *                        - fieldCount: 1
 *                          affectedRows: 1
 *                          info: "Rows matched: 1 Changed: 1 Warnings: 0"
 *                          serverStatus: 2
 *                          warningStatus: 1
 *                          changedRows: 1
 *          500:
 *              description: Error in database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 500
 *                              message:
 *                                  type: string
 *                                  example: "Error accessing database"
 *                              details:      
 *                                  type: string
 *                                  example: "Error trying to add coach to database."
 */
router.get("/accept", acceptCoach);

/**
 *  @swagger
 *  coachApply/deny:
 *  get:
 *      parameters:
 *        - in: query
 *          name: coachRequestID
 *          required: true
 *          schema:
 *              type: integer
 *      summary: Deny coach request
 *      responses:
 *          200:
 *              description: Successfully denied coach request
 *              content:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          fieldCount:
 *                              type: integer
 *                          affectedRows:
 *                             type: integer
 *                          insertID:
 *                              type: integer
 *                          info:
 *                              type: string
 *                          serverStatus:
 *                              type: integer
 *                          warningStatus:
 *                              type: integer
 *                          changedRows:
 *                              type: integer
 *                      example:
 *                        - fieldCount: 1
 *                          affectedRows: 1
 *                          insertID: 0
 *                          info: "Rows matched: 1 Changed: 1 Warnings: 0"
 *                          serverStatus: 2
 *                          warningStatus: 1
 *                          changedRows: 1
 *          500:
 *              description: Error in database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 500
 *                              message:
 *                                  type: string
 *                                  example: "Error accessing database"
 *                              details:      
 *                                  type: string
 *                                  example: "Error trying to update coach request status in database."
 */
router.get("/deny", denyCoach);

/**
 *  @swagger
 *  coachApply/createCoachRequest:
 *  post:
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userID:
 *                              type: integer
 *                              example: 21
 *                          status:
 *                              type: string
 *                              example: Pending
 *                          specialites:
 *                              type: string
 *                              example: Weight loss
 *                          cost:
 *                              type: integer
 *                              example: 120
 *      summary: Creates coach application. Created when user registers as coach
 *      responses:
 *          200:
 *              description: Successfully created coach request
 *              content:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          message:
 *                              type: string
 *                              example: "Coach application added to database"
 *                      example:
 *                        - message: "Coach application added to database"
 *          500:
 *              description: Error in database
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  example: 500
 *                              message:
 *                                  type: string
 *                                  example: "Error accessing database"
 *                              details:      
 *                                  type: string
 *                                  example: "Error trying to get pending coach applications from database."
 */
router.post("/createCoachRequest", createCoachRequest);

module.exports = router;