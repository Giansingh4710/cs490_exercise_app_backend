const RequestRepository = require("../DataAccess/RequestRepository");
const CoachService = require("../Services/CoachService");

class RequestService{

    async userRequestedCoach(userID, coachID){
        try{
            const [response, fields] = await RequestRepository.getRequestsByUserID(userID);

            if(response.length === 0){
                return false;
            }
            const requests = response.map(row => {
                return {
                    CoachID: row.CoachID,
                    UserID: row.UserID,
                    Goals: row.Goals,
                    Note: row.Note,
                    Status: row.Status
                };
            });
            
            for(let row = 0; row < requests.length; row++){
                if(requests[row].CoachID === coachID){
                    return true;
                }
            }
            return false;


        }catch(error){
            throw new Error("Error getting data from db");
        }
    }

    async createRequest(requestData){
        console.log(requestData);
        try{
            const response = RequestRepository.createRequest(requestData);
            return response;
        }catch(error){
            console.log(error)
        }
    }

    async validCoachID(coachID){
        const coachData = await CoachService.getCoachByID(coachID);
        if(Object.keys(coachData).length === 0){
            return false;
        }
        return true;
    }
}

module.exports = new RequestService();