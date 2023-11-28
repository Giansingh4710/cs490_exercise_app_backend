const CoachService  = require("../Services/CoachService");

const getCoachByID = async function(request, response){

    const coachIDRegex = new RegExp("^-?[0-9]+$")

    if(!coachIDRegex.test(request.params.CoachID)){
        return response.status(422).send({
                error: {
                status: 422,
                message: "Bad Request",
                details: "Invalid CoachID. CoachID must be an integer."
            }
        });
    }
    
    if(request.params.CoachID < 0){
        return response.status(422).send({
            error: {
                status: 422,
                message: "Bad Request",
                details: "Invalid CoachID. CoachID must be nonnegative."
            }
        });
    }

    try{
        const coachData = await CoachService.getCoachByID(request.params.CoachID);
        if(Object.keys(coachData).length === 0){
            return response.status(404).send({
                error: {
                    status: 404,
                    message: "Not Found",
                    details: "No matching data found for the specified criteria."
                }
            })
        }

        return response.status(200).send(coachData);
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

module.exports = {
    getCoachByID
};