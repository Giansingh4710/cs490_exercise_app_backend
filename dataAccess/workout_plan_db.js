const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getWorkoutPlan_DB(userID){
    const query = "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=?"
    const [res, _] = await connection.promise().query(query, [userID]);
    let response = {}
    res.forEach(element => {
        element.dayOfWeek = element.dayOfWeek.toLowerCase();
        if(!(element.dayOfWeek in response)){
            response[element.dayOfWeek] = []
        }
        response[element.dayOfWeek].push({
            exercise: element.name,
            sets: element.sets,
            reps: element.reps,
            weight: element.weight
        })
    });
    
    return response;
}

async function addExercise_DB(data){
    const query = "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek) VALUES(?, ?, ?)"
    const [res, _] = await connection.promise().query(query, [data.userID, data.exerciseID, data.dayOfWeek]);
    return res;
}

module.exports = {
    getWorkoutPlan_DB,
    addExercise_DB
}