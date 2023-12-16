const { createPool } = require("../sql_config/database.js");

async function getAssignedWorkoutPlan_DB(userID) {
  const connection = await createPool().getConnection();
  const query =
    "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Coach'";
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
}

//TODO begin transaction
async function addExercise_DB(data, userID) {
  try {
    connection.promise().beginTransaction();
    const sets = data.sets.length;
    data.sets.forEach(async (element) => {
      let query = null;
      if (data.metric === "Reps") {
        query =
          "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek, Creator, Reps, Sets, Weight) VALUES(?, ?, ?, ?, ?, ?, ?)";
        await connection.promise().query(query, [
          userID,
          data.exerciseID,
          data.dayOfWeek,
          "Client",
          element.reps,
          sets,
          element.weight,
        ]);
      } else {
        query =
          "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek, Creator, Duration, Sets, Weight, Reps) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        await connection.promise().query(query, [
          userID,
          data.exerciseID,
          data.dayOfWeek,
          "Client",
          element.duration,
          sets,
          element.weight,
          0,
        ]);
      }
    });
    connection.commit();
  } catch (error) {
    connection.rollback();
    throw new Error("Error entering exercise to workout plan");
  }
}

async function getPersonalWorkoutPlan_DB(userID) {
  const connection = await createPool().getConnection();
  const query =
    "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Client'";

  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
}

async function getLast5DaysOfWorkouts_DB(userID, startDate, endDate) {
  const connection = await createPool().getConnection();
  const query = `
    SELECT Record.exerciseID, Record.reps, Record.sets, Record.weight, Record.duration, Record.date, Exercise.name, Exercise.metric FROM Record
        JOIN WorkoutPlan ON Record.planID = WorkoutPlan.planID
        JOIN Exercise ON Record.exerciseID = Exercise.exerciseID
        WHERE Record.date Between ? AND ? AND WorkoutPlan.userID = ?`;

  const [rows, _] = await connection.execute(query, [
    startDate,
    endDate,
    userID,
  ]);
  connection.release();
  return rows;
}

module.exports = {
  getAssignedWorkoutPlan_DB,
  addExercise_DB,
  getPersonalWorkoutPlan_DB,
  getLast5DaysOfWorkouts_DB,
};
