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
}

module.exports = new RequestRepository();
