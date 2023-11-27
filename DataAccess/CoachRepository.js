const { Error } = require('sequelize');
const connection = require('../config/database')

class CoachRepository{

    async getCoachByID(coachID){
        try{
            const query = "SELECT c.CoachID, FirstName, LastName, City, State, Specialties FROM Coach c JOIN User ON c.UserID = User.UserID WHERE c.coachID = ?"
            const response = connection.promise().query(query, [coachID]);
            return response;
        }catch(error){
            console.log(error);
            throw new Error("Error retrieving data from database")
        }
    }

}

module.exports = new CoachRepository();