const CoachRepository = require("../DataAccess/CoachRepository.js");

class CoachService{

    async getCoachByID(coachID){
        try{
            const [rows, fields] = await CoachRepository.getCoachByID(coachID);
            if(rows.length === 0){
                return {};
            }
            const coach = rows.map(row => {
                return {
                  CoachID: row.CoachID,
                  FirstName: row.FirstName,
                  LastName: row.LastName,
                  Address: row.Address,
                  Specialties: row.Specialties
                };
              });
            return coach[0];
        }catch(error){
            throw new Error("Error getting data from db");
        }
    }

}

module.exports = new CoachService();