const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getWorkoutPlan_DB(userID){
    const query = "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=?"
    const [res, _] = await connection.promise().query(query, [userID]);
    return res;
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