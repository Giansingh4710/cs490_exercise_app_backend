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
 *      summary: WORK IN PROGRESS, NEED TO CONFIRM ENDPOINT USE. Returns all request from clients that have not been accepted by coach
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

router.get("/status", getStatus);

router.get("/accept", acceptRequest);
router.get("/decline", declineRequest);
router.delete("/cancel", cancelRequest);

module.exports = router;
