const { getUsersOfCoach_DB } = require("../DataAccess/coach_db_access");
const { getWorkoutPlan_DB } = require("../dataAccess/workout_plan_db");

async function getWorkoutPlan(req, res){
    // makes it so we dont have duplicate code due to where the userID is stored i.e. req.params.userID or req.userID
    let userID = req.userID;

    // check if userID supplied in path parameters
    // if userID in path then coach is trying to access their clients workout plan
    if(req.params.userID != null){
        // checking if supplied userID is the ID of one of the coach' clients
        let clients = await getUsersOfCoach_DB(8);
        clients = clients.filter((client) => {
            return client.userID == req.params.userID});

        if(clients.length == 0){
            return res.status(403).send({
                error: {
                    status: 403,
                    message: `ClientID ${req.params.userID} is not one of this coache's clients.`
                }
            })
        }

        userID = req.params.userID;
    }   

    try{
        const workoutPlan = await getWorkoutPlan_DB(userID);
        return res.status(200).send(workoutPlan);
    }catch(error){
        return res.status(500).send({
            "error": {
                status: 500,
                message: "Error accessing database.",
            }
        });
    }
    

}

module.exports = {
    getWorkoutPlan
}