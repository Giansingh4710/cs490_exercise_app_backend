const express = require("express");
const router = express.Router();

const {requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
  getSpecializations,
} = require("../controllers/coach.js");

/**
 *  @swagger
 *  /coaches/searchByName:
 *  get:
 *      summary: Returns all coaches that match name in query
 *      description: Returns coachID, firstName, lastName of all coaches with matching name in query
 *      parameters:
 *        - in: query
 *          name: name
 *          required: true
 *          description: Partial or full name of coach to search for
 *          schema:
 *              type: string
 *      responses:
 *          200:
 *              description: List of all coaches matching the name given in the query
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              coachID:
 *                                  type: integer
 *                                  description: coachID of coach
 *                                  example: 1
 *                              firstName:
 *                                  type: string
 *                                  description: First name of coach
 *                                  example: Moselle
 *                              lastName:      
 *                                  type: string
 *                                  description: Last name of coach
 *                                  example: Penn
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
 *                                          example: Error trying to searchByName from database.
 */
router.get("/searchByName", searchByName);

/**
 *  @swagger
 *  /coaches/getAllCoaches:
 *  get:
 *      summary: Returns all coaches
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
 *                                  coachID:
 *                                      type: integer
 *                                      example: 1
 *                                  firstName:
 *                                      type: string
 *                                      example: Moselle
 *                                  lastName:
 *                                      type: string
 *                                      example: Penn
 *                          example:
 *                            - coachID: 1
 *                              firstName: Rawley
 *                              lastName: Comins
 *                            - coachID: 2
 *                              firstName: Moselle
 *                              lastName: Penn
 *                              
 *                                  
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
 *                                          example: Error trying to searchByName from database.
 */
router.get("/getAllCoaches", getAllCoaches);

/**
 *  @swagger
 *  /coaches/clients:
 *  get:
 *      summary: Returns all clients of coach
 *      description: Returns userID, firstName, lastName of all clients
 *      responses:
 *          200:
 *              description: List of all clients of the signed in coach
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  userID:
 *                                      type: integer
 *                                      example: 1
 *                                  firstName:
 *                                      type: string
 *                                      example: Moselle
 *                                  lastName:
 *                                      type: string
 *                                      example: Penn
 *                          example:
 *                            - userID: 1
 *                              firstName: Belva
 *                              lastName: Matushevitz
 *                            - userID: 2
 *                              firstName: Artemus
 *                              lastName: Egger              
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
 *                                          example: Error trying to getClientsOfCoach from database.
 */
router.get("/clients", requireAuthedUser, getClientsOfCoach); // get all clients of a coach

/**
 *  @swagger
 *  /coaches/specializations:
 *  get:
 *      summary: Returns all possible specializations of coaches
 *      description: Returns list of specializations
 *      responses:
 *          200:
 *              description: List of all specializations a coach can have
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  specializations:
 *                                      type: string
 *                                      example: Strength Muscle
 *                          example:
 *                            - specializations: Strength Building
 *                            - specializations: Maintain Weight
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
 *                                          example: Error trying to getSpecializations from database.
 */
router.get("/specializations", getSpecializations); // Get specializations of available coaches

/**
 *  @swagger
 *  /coaches/:CoachID:
 *  get:
 *      summary: Returns data about coach
 *      description: Returns coachID, firstName, lastName, city, state, and specialties of the coach
 *      responses:
 *          200:
 *              description: List of all clients of the signed in coach
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              userID:
 *                                  type: integer
 *                                  example: 1
 *                              firstName:
 *                                  type: string
 *                                  example: Moselle
 *                              lastName:
 *                                  type: string
 *                                  example: Penn
 *                              city:
 *                                  type: string
 *                                  example: Hamilton
 *                              state:
 *                                  type: string
 *                                  example: Ohio
 *                              specialties:
 *                                  type: string
 *                                  example: Muscle Building
 *          422:
 *              description: Invalid coachID passed
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
 *                                          example: 422
 *                                      message:
 *                                          type: string
 *                                          description: Error message
 *                                          example: Invalid CoachID(8dfs7) (must be a positive integer)
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Error accessing database.
 *          404:
 *              description: Coach with matching coachID not found
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
 *                                          example: 404
 *                                      message:
 *                                          type: string
 *                                          description: Error message
 *                                          example: "No Coach found with ID: 999"
 *                                      details:
 *                                          type: string
 *                                          description: Additional details about error
 *                                          example: Error accessing database.
 *                                          
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
 *                                          example: Error trying to getClientsOfCoach from database.
 */
router.get("/:CoachID", getCoachByID); // this needs to be last because it will catch all the other routes

module.exports = router;
