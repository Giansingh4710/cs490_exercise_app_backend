const { connection } = require("../config/database");
const Request = require("../models/Request");

class RequestRepository {

    async createRequest(requestData) {
        try{
            const request = await Request.create(requestData);
            return request;
        }catch(error){
            console.log(error);
            throw new Error("Error in Database");
        }
    }

    async getRequestsByUserID(UserID){
        try{
            const query = "SELECT * FROM Request WHERE UserID = ?"
            return connection.promise().query(query, [UserID])
            // console.log(response);
            
        }catch(error){
            throw error
        }
    }

    async getRequestsByUserIDSorted(userID){
        try{
            const query = `
            SELECT 
                Request.RequestID,
                Request.UserID,
                Request.CoachID,
                User.FirstName,
                User.LastName
            FROM Request
            JOIN Coach ON Request.CoachID = Coach.CoachID
            JOIN User ON Coach.UserID = User.UserID
            WHERE Request.UserID = ? ORDER BY User.FirstName ASC;`

            return connection.promise().query(query, [userID])
        }catch(error){
            throw error;
        }
    }
}

module.exports = new RequestRepository();
