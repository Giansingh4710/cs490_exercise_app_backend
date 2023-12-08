const { connection } = require("../sql_config/database");

async function getWorkoutPlan_DB(userID){
    const query = "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=?;"
    const [res, _] = await connection.promise().query(query, [userID]);
    let response = {}
    res.forEach(element => {
        if(!(element.DayOfWeek.toLowerCase() in response)){
            response[element.DayOfWeek.toLowerCase()] = []
        }
        response[element.DayOfWeek.toLowerCase()].push({
            exercise: element.Name,
            // temp data until DB changes are made
            sets: 3,
            reps: [8,10,8],
            weight: 120

        })
    });
    
    return response;
}

module.exports = {
    getWorkoutPlan_DB
}