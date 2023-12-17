const router = require("express").Router();
const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const { 
  requestCoach, 
  getOpenRequests, 
  unansweredRequestsByCoach, 
  getStatus,
  acceptRequest,
  declineRequest,
  cancelRequest,
 } = require(
  "../controllers/request.js",
);

/**
 *  @swagger
 *  /request:
 *  post:
 *      summary: Creates request on database of user requesting coach
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          userID:
 *                              type: integer
 *                              example: 100
 *                          coachID:
 *                              type: string
 *                              example: 1
 *                          goals: 
 *                              type: string
 *                              example: "Improve endurance and strength"
 *                          note:
 *                              type: string
 *                              example: Prefer early morning sessions
 *      responses:
 *          201:
 *              description: Request created
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userID:
 *                                  type: integer
 *                                  example: 100
 *                              coachID:
 *                                  type: string
 *                                  example: 1
 *                              goals: 
 *                                  type: string
 *                                  example: "Improve endurance and strength"
 *                              note:
 *                                  type: string
 *                                  example: Prefer early morning sessions
 *                              requestID:
 *                                  type: integer
 *                                  example: 23
 *          401:
 *              description: UserID of logged in user does not match userID in request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      message:                                 
 *                                          type: string
 *                                          example: "userID in request(1) does not match userID of logged in user(21)"
 *                                      details: 
 *                                          type: string
 *                                          example: "Server Error while trying to requestCoach"
  *          404:
 *              description: Coach with CoachID supplied does not exist
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      message:                                 
 *                                          type: string
 *                                          example: "CoachID(53) does not exist"
 *                                      details: 
 *                                          type: string
 *                                          example: "Server Error while trying to requestCoach"
 *          422:
 *              description: User has already requested coach
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      message:                                 
 *                                          type: string
 *                                          example: "User(1) has already requested Coach(35)"
 *                                      details: 
 *                                          type: string
 *                                          example: "Server Error while trying to requestCoach"
 *                                    
 */
router.post("/", requireAuthedUser, requestCoach);

/**
 *  @swagger
 *  /request/openClientRequest:
 *  get:
 *      summary: Returns all request from clients that have not been accepted by coach
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
 *                                  requestID:
 *                                      type: integer
 *                                  userID:
 *                                      type: string
 *                                  coachID:
 *                                      type: string
 *                                  firstName:
 *                                      type: string
 *                                      description: First name of user
 *                                  lastName:
 *                                    type: string
 *                                    description: Last name of user
 *                          example:
 *                            - requestID: 1
 *                              userID: 24
 *                              coachID: 45
 *                              firstName: Megan
 *                              lastName: Penn
 *                            - requestID: 2
 *                              userID: 64
 *                              coachID: 45
 *                              firstName: Gavin
 *                              lastName: Egger
 *          500:
 *              description: UserID of logged in user does not match userID in request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      message:                                 
 *                                          type: string
 *                                          example: "Error getting requests"
 *                                      details: 
 *                                          type: string
 *                                          example: "Server Error while trying to getOpenRequests"
 *                                    
 */
router.get("/openClientRequest", requireAuthedUser, getOpenRequests);

/**
 *  @swagger
 *  /request/openCoachRequests:
 *  get:
 *      summary: Returns all request from clients that have not been accepted by coach
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
 *                                  requestID:
 *                                      type: integer
 *                                  userID:
 *                                      type: string
 *                                  coachID:
 *                                      type: string
 *                                  firstName:
 *                                      type: string
 *                                      description: First name of user
 *                                  lastName:
 *                                    type: string
 *                                    description: Last name of user
 *                          example:
 *                            - requestID: 1
 *                              userID: 24
 *                              coachID: 45
 *                              firstName: Megan
 *                              lastName: Penn
 *                            - requestID: 2
 *                              userID: 64
 *                              coachID: 45
 *                              firstName: Gavin
 *                              lastName: Egger
 *          500:
 *              description: UserID of logged in user does not match userID in request
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              error:
 *                                  type: object
 *                                  properties:
 *                                      message:                                 
 *                                          type: string
 *                                          example: "Error getting requests"
 *                                      details: 
 *                                          type: string
 *                                          example: "Server Error while trying to getOpenRequests"
 *                                    
 */
router.get("/openCoachRequests", requireAuthedUser, unansweredRequestsByCoach);

/**
 *  @swagger
 *  request/status:
 *  get:
 *      summary: Get status data for a user with a specific coach
 *      parameters:
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user
 *        - in: query
 *          name: coachID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the coach
 *      responses:
 *          200:
 *              description: Status data retrieved successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: string
 *                                  description: The status of the user-coach relationship
 *                                  example: Active
 *                              requestID:
 *                                  type: integer
 *                                  description: The unique identifier for the status request
 *                                  example: 123
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
 *                                          example: Error trying to get status in database.
 */
router.get("/status", getStatus);

/**
 *  @swagger
 *  /requests/accept:
 *  get:
 *      summary: Accept a coaching request
 *      parameters:
 *        - in: query
 *          name: requestID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the coaching request
 *      responses:
 *          200:
 *              description: Coaching request accepted successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              fieldCount:
 *                                  type: integer
 *                                  description: Number of columns affected
 *                                  example: 0
 *                              affectedRows:
 *                                  type: integer
 *                                  description: Number of rows affected
 *                                  example: 1
 *                              insertId:
 *                                  type: integer
 *                                  description: ID of the last inserted row
 *                                  example: 0
 *                              info:
 *                                  type: string
 *                                  description: Additional information
 *                                  example: ""
 *                              serverStatus:
 *                                  type: integer
 *                                  description: Server status code
 *                                  example: 2
 *                              warningStatus:
 *                                  type: integer
 *                                  description: Warning status code
 *                                  example: 0
 *                              changedRows:
 *                                  type: integer
 *                                  description: Number of changed rows
 *                                  example: 0
 *                          example:
 *                              fieldCount: 0
 *                              affectedRows: 1
 *                              insertId: 0
 *                              info: ""
 *                              serverStatus: 2
 *                              warningStatus: 0
 *                              changedRows: 0
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
 *                                          example: Error trying to update request status in database.
 */
router.get("/accept", acceptRequest);

/**
 *  @swagger
 *  /requests/decline:
 *  get:
 *      summary: Decline a coaching request
 *      parameters:
 *        - in: query
 *          name: requestID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the coaching request
 *      responses:
 *          200:
 *              description: Coaching request declined successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              fieldCount:
 *                                  type: integer
 *                                  description: Number of columns affected
 *                                  example: 0
 *                              affectedRows:
 *                                  type: integer
 *                                  description: Number of rows affected
 *                                  example: 1
 *                              insertId:
 *                                  type: integer
 *                                  description: ID of the last inserted row
 *                                  example: 0
 *                              info:
 *                                  type: string
 *                                  description: Additional information
 *                                  example: ""
 *                              serverStatus:
 *                                  type: integer
 *                                  description: Server status code
 *                                  example: 2
 *                              warningStatus:
 *                                  type: integer
 *                                  description: Warning status code
 *                                  example: 0
 *                              changedRows:
 *                                  type: integer
 *                                  description: Number of changed rows
 *                                  example: 0
 *                          example:
 *                              fieldCount: 0
 *                              affectedRows: 1
 *                              insertId: 0
 *                              info: ""
 *                              serverStatus: 2
 *                              warningStatus: 0
 *                              changedRows: 0
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
 *                                          example: Error trying to update request status in database.
 */
router.get("/decline", declineRequest);

/**
 *  @swagger
 *  /request/cancel:
 *  post:
 *      summary: Cancel a coaching request
 *      parameters:
 *        - in: query
 *          name: requestID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the coaching request
 *      responses:
 *          200:
 *              description: Coaching request canceled successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              fieldCount:
 *                                  type: integer
 *                                  description: Number of columns affected
 *                                  example: 0
 *                              affectedRows:
 *                                  type: integer
 *                                  description: Number of rows affected
 *                                  example: 1
 *                              insertId:
 *                                  type: integer
 *                                  description: ID of the last inserted row
 *                                  example: 0
 *                              info:
 *                                  type: string
 *                                  description: Additional information
 *                                  example: "Rows matched: 1  Changed: 1  Warnings: 0"
 *                              serverStatus:
 *                                  type: integer
 *                                  description: Server status code
 *                                  example: 2
 *                              warningStatus:
 *                                  type: integer
 *                                  description: Warning status code
 *                                  example: 0
 *                              changedRows:
 *                                  type: integer
 *                                  description: Number of changed rows
 *                                  example: 1
 *                          example:
 *                              fieldCount: 0
 *                              affectedRows: 1
 *                              insertId: 0
 *                              info: "Rows matched: 1  Changed: 1  Warnings: 0"
 *                              serverStatus: 2
 *                              warningStatus: 0
 *                              changedRows: 1
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
 *                                          example: Error trying to delete request from database.
 */
router.delete("/cancel", cancelRequest);

module.exports = router;
