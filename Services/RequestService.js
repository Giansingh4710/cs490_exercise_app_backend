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

    async getPendingRequests(userID){
        try{
            const [response, fields] = await RequestRepository.getRequestsByUserIDSorted(userID);

            if(response.length === 0){
                return {};
            }
            const requests = response.map(row => {
                return {
                    RequestID: row.RequestID,
                    CoachID: row.CoachID,
                    FirstName: row.FirstName,
                    LastName: row.LastName,
                };
            });
            let formattedData = []
            for(let i = 0; i < requests.length; i++){
                let formattedRequest = {}
                formattedRequest["requestID"] = requests[i].RequestID;
                let formattedCoachData = {}
                formattedCoachData["coachID"] = requests[i].CoachID
                formattedCoachData["firstName"] = requests[i].FirstName
                formattedCoachData["lastName"] = requests[i].LastName
                formattedRequest["coach"] = formattedCoachData;
                formattedData.push(formattedRequest);
            }
            return formattedData;
        }catch(error){
            throw error;
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