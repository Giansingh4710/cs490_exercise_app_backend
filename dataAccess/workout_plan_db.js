const { createPool } = require("../sql_config/database.js");

async function getWorkoutPlan_DB(userID) {
  const connection = await createPool().getConnection();
  const query =
    "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Coach'";
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
}

async function addExercise_DB(data) {
  const connection = await createPool().getConnection();
  const query =
    "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek) VALUES(?, ?, ?)";
  const [rows, _] = await connection.execute(query, [
    data.userID,
    data.exerciseID,
    data.dayOfWeek,
  ]);
  connection.release();
  return rows;
}

module.exports = {
  getWorkoutPlan_DB,
  addExercise_DB,
};
