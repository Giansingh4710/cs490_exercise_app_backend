const RequestService = require("../Services/RequestService");

async function requestCoach(request, response, error){
    
    if(!request.is('*/json')){
        console.log("logWaterInput.js: Invalid request format. Please request in JSON format.")
        return response.status(415).send({"Access-Control-Allow-Origin": '*', "status": 415, "error": "Invalid request format. Please request in JSON format."})
    }

    if(error instanceof SyntaxError){
        console.log(error)
        return response.status(400).send({"Access-Control-Allow-Origin": '*', "status": 400, "error": "Invalid JSON", "message": "The request body is not well-formed JSON."})
    }

    const requiredFields = ["userID", "coachID", "goals", "note"]
    if(!hasAllKeys(request.body, requiredFields)){
        console.log("logWaterInput.js: Missing required fields.")
        return response.status(400).send({"Access-Control-Allow-Origin": '*', "status": 400, "error": "Missing required field", "message": "Request is missing required some field. Required Fields: UserID, CoachID, Goals, Notes"})
    }

    // validate coach and user ID
    const userIDRegex = new RegExp("^-?[0-9]+$")
    
    if(!userIDRegex.test(request.body.coachID)){
        return response.status(422).send({
                error: {
                status: 422,
                message: "Bad Request",
                details: "Invalid CoachID. CoachID must be an integer."
            }
        });
    }
    if(request.body.coachID < 0){
        return response.status(422).send({
            error: {
                status: 422,
                message: "Bad Request",
                details: "Invalid CoachID. CoachID must be nonnegative."
            }
        });
    }

    if(!userIDRegex.test(request.body.userID)){
        return response.status(422).send({
                error: {
                status: 422,
                message: "Bad Request",
                details: "Invalid UserID. UserID must be an integer."
            }
        });
    }
    if(request.body.userID < 0){
        return response.status(422).send({
            error: {
                status: 422,
                message: "Bad Request",
                details: "Invalid UserID. UserID must be nonnegative."
            }
        });
    }

    // check if passed userID and token userid is the same
    if(request.body.userID !== request.UserID){
        return response.status(401).send({
            error: {
                status: 401,
                message: "Unauthorized",
                details: "UserID in request does not match UserID of logged in user"
            }
        })
    }
    
    // check if coachid is valid
    if(! await RequestService.validCoachID(request.body.coachID)){
        return response.status(404).send({
            error: {
                status: 404,
                message: "Not Found",
                details: "CoachID not found."
            }
        })
    }

    // check if user has already requested coach
    if(await RequestService.userRequestedCoach(request.body.userID, request.body.coachID)){
        return response.status(422).send({
            error: {
                status: 422,
                message: "Unprocessable content",
                details: "User has already request this coach"
            }
        })
    }

    requestData = {
        UserID: request.body.userID,
        CoachID: request.body.coachID,
        Status: "Pending",
        Goals: request.body.goals,
        Note: request.body.note
    }

    try{
        const createdRequest = await RequestService.createRequest(requestData);
        console.log(createdRequest.dataValues);
        responseObject = {
            requestID: createdRequest.dataValues.RequestID,
            userID: createdRequest.dataValues.UserID,
            coachID: createdRequest.dataValues.CoachID,
            status: createdRequest.dataValues.Status,
            goals: createdRequest.dataValues.Goals,
            note: createdRequest.dataValues.Note
        }
        
        return response.status(201).send(responseObject);
    }catch(error){
        return response.status(500).send({
            error: {
                status: 500,
                message: "Server Error",
                details: "Error accessing database."
            }
        })
    }
}

async function getOpenRequests(request, response, error){
    // goty UserID for coach from token 
    try{
        const pendingRequests = await RequestService.getPendingRequests(request.UserID);
        return response.status(200).send(pendingRequests);
    }catch(error){
        return response.status(500).send({
            error: {
            status: 500,
            message: "Server Error",
            details: "Error accessing database."
        }
    })
    }

}

function hasAllKeys(object, keys){
    for (const key of keys) {
        if (!(key in object)) {
          return false;
        }
    }
    return true;
}

module.exports = { 
    requestCoach,
    getOpenRequests
}