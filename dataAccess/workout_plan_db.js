const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getAssignedWorkoutPlan_DB(userID){
    const query = "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Coach'"
    const [res, _] = await connection.promise().query(query, [userID]);
    return res;
}

async function addExercise_DB(data, userID){
    try{
        connection.promise().beginTransaction();
        const sets = data.sets.length;
        data.sets.forEach(async (element) => {
            let query = null;
            if(data.metric === 'Reps'){
                query = "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek, Creator, Reps, Sets, Weight) VALUES(?, ?, ?, ?, ?, ?, ?)";
                await connection.promise().query(query, [userID, data.exerciseID, data.dayOfWeek, 'Client', element.reps, sets, element.weight]);
            }else{
                query = "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek, Creator, Duration, Sets, Weight, Reps) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
                await connection.promise().query(query, [userID, data.exerciseID, data.dayOfWeek, 'Client', element.duration, sets, element.weight, 0]);
            }
        });
        connection.commit();
    }catch(error){
        connection.rollback();
        throw new Error("Error entering exercise to workout plan");
    }
}

async function getPersonalWorkoutPlan_DB(userID){
    const query = "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Client'"
    const [res, _] = await connection.promise().query(query, [userID]);
    return res;
}

module.exports = {
    getAssignedWorkoutPlan_DB,
    addExercise_DB,
    getPersonalWorkoutPlan_DB
}