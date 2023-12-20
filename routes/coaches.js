const express = require("express");
const router = express.Router();

const { requireAuthedUser, fakeAuthedUser } = require(
  "../utils/security.js",
);
const {
  getCoachByID,
  getAllCoaches,
  searchCoachByName,
  searchCoachByAll,
  getUsersOfCoach,
  getClientInfo,
  getSpecializations,
  getCities,
  getCoachIDFromUserID,
  terminateClient,
} = require("../controllers/coach.js");

/**
 * @swagger
 * tags:
 *   name: coaches
 */

/**
 *  @swagger
 *  /coaches/searchByName:
 *  get:
 *      summary: Returns all coaches that match name in query
 *      tags: [coaches]
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
router.get("/searchByName", searchCoachByName);

/**
 *  @swagger
 *  /coaches/search:
 *  get:
 *      summary: Returns all coaches that match fields in query
 *      tags: [coaches]
 *      description: Returns coachID, firstName, lastName of all coaches with matching fields in query
 *      parameters:
 *        - in: query
 *          name: name
 *          description: Partial or full name of coach to search for
 *          schema:
 *              type: string
 *        - in: query
 *          name: speciality
 *          description: coach speciality 
 *          schema:
 *              type: string
 *        - in: query
 *          name: maxPrice
 *          description: low end of cost
 *          schema:
 *              type: integer
 *        - in: query
 *          name: maxPrice2
 *          description: high end of cost
 *          schema:
 *              type: integer
 *        - in: query
 *          name: state
 *          description: state to search in
 *          schema:
 *              type: string
 *        - in: query
 *          name: city
 *          description: city to search in
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
 *                              cost:      
 *                                  type: integer
 *                                  description: Last name of coach
 *                                  example: 120
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
router.get("/search", searchCoachByAll);

/**
 *  @swagger
 *  /coaches/getAllCoaches:
 *  get:
 *      summary: Returns all coaches
 *      tags: [coaches]
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
 *      tags: [coaches]
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
router.get("/clients", requireAuthedUser, getUsersOfCoach); // get all clients of a coach

/**
 *  @swagger
 *  /coaches/clientInfo:
 *  get:
 *      summary: Returns all coaches that match name in query
 *      tags: [coaches]
 *      description: Returns coachID, firstName, lastName of all coaches with matching name in query
 *      parameters:
 *        - in: query
 *          name: userID
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: List of all coaches matching the name given in the query
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
 *                              goal:
 *                                type: string
 *                                example: "Strength Building"
 *                              dailySurvey:
 *                                  type: string
 *                                  example: "[surveyData: '2024-12-14', mentalState: 'content', waterIntake: 10.6, waterUnits: 'fl. oz']"                                        
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
router.get("/clientInfo", getClientInfo); // Get client info visible by a coach

/**
 *  @swagger
 *  /coaches/specializations:
 *  get:
 *      summary: Returns all possible specializations of coaches
 *      tags: [coaches]
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
 *  /coaches/cities:
 *  get:
 *      summary: Returns all cities in each state from our database
 *      tags: [coaches]
 *      responses:
 *          200:
 *              description: List of all cities in each state
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  state:
 *                                      type: string
 *                                  cities:
 *                                      type: array
 *                                      items:
 *                                          type: string
 *                                      example:
 *                                          - "San Diego"
 *                                          - "San Bernardino"
 *                                          - "Santa Rosa"
 *                          example:
 *                              - state: "California"
 *                                cities:
 *                                  - "San Diego"
 *                                  - "San Bernardino"
 *                                  - "Santa Rosa"
 *                              - state: "New York"
 *                                cities:
 *                                  - "New York City"
 *                                  - "Albany"
 *                                  - "Buffalo"
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
router.get("/cities", getCities); // Get specializations of available coaches

/**
 *  @swagger
 *  /coaches/getCoachID:
 *  get:
 *      summary: Returns the coachID for a given userID from the database
 *      tags: [coaches]
 *      parameters:
 *        - in: query
 *          name: coachID
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: CoachID for the given userID
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              coachID:
 *                                  type: integer
 *                                  description: The unique identifier for the coach
 *                          example:
 *                              coachID: 123
 *          400:
 *              description: User is not a coach.
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
 *                                          example: 400
 *                                      message:
 *                                          type: string
 *                                          description: Error message
 *                                          example: User is not a coach
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
 */
router.get("/getCoachID", requireAuthedUser, getCoachIDFromUserID);

/**
 *  @swagger
 *  /coaches/terminate:
 *  delete:
 *      summary: Terminate a client from a coach
 *      tags: [coaches]
 *      parameters:
 *        - in: query
 *          name: userID
 *          schema:
 *            type: integer
 *          required: true
 *          description: The unique identifier for the user to be terminated
 *      responses:
 *          200:
 *              description: User terminated from coach successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              status:
 *                                  type: integer
 *                                  description: HTTP status code of response
 *                                  example: 200
 *                              message:
 *                                  type: string
 *                                  description: Success message
 *                                  example: User terminated from coach
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
 *                                          example: Error trying to update user's coachID in database.
 */
router.get("/terminate", terminateClient); // Unassign a user from their coach

/**
 *  @swagger
 *  /coaches/{coachID}:
 *  get:
 *      summary: Returns data about coach
 *      tags: [coaches]
 *      description: Returns coachID, firstName, lastName, city, state, and specialties of the coach
 *      responses:
 *          200:
 *              description: List of all clients of the signed in coach
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              coachID:
 *                                  type: integer
 *                                  example: 1
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
router.get("/:coachID", getCoachByID); // this needs to be last because it will catch all the other routes

module.exports = router;
