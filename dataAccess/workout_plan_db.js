const { pool } = require("../sql_config/database.js");

async function getAssignedWorkoutPlan_DB(userID) {
  const connection = await pool.getConnection();
  const query =
    "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Coach'";
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
}

async function addExercise_DB(data, userID, creator) {
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const sets = data.sets.length;
    console.log(data);
    data.sets.forEach(async (element) => {
      console.log(element);
      let query = "";
      if (data.metric === "Reps") {
        query =
          "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek, Creator, Reps, Sets, Weight) VALUES(?, ?, ?, ?, ?, ?, ?)";
        await connection.execute(query, [
          userID,
          data.exerciseID,
          data.dayOfWeek,
          creator,
          element.reps,
          sets,
          element.weight,
        ]);
      } else {
        query =
          "INSERT INTO WorkoutPlan(UserID, ExerciseID, DayOfWeek, Creator, Duration, Sets, Weight, Reps) VALUES(?, ?, ?, ?, ?, ?, ?, ?)";
        await connection.execute(query, [
          userID,
          data.exerciseID,
          data.dayOfWeek,
          creator,
          element.duration,
          sets,
          0,
          0,
        ]);
      }
    });
    connection.commit();
  } catch (error) {
    connection.rollback();
    throw new Error("Error entering exercise to workout plan");
  }finally{
    connection.release();
  }
}

async function getPersonalWorkoutPlan_DB(userID) {
  const connection = await pool.getConnection();
  const query =
    "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.ExerciseID = WorkoutPlan.ExerciseID where userID=? AND creator='Client'";

  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
}

async function getLast5DaysOfWorkouts_DB(userID, startDate, endDate) {
  const connection = await pool.getConnection();
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

async function getExerciseDataFromPlan_DB(planID){
  const connection = await pool.getConnection();
  const query = "SELECT * FROM WorkoutPlan JOIN Exercise ON Exercise.exerciseID = WorkoutPlan.exerciseID WHERE planID = ?";
  const [res, _] = await connection.execute(query, [planID]);
  connection.release();
  return res[0];
}

// const updateExerciseData = {
//   planID: req.body.planID,
//   reps: req.body.reps,
//   sets: req.body.sets,
//   weight: req.body.weight,
//   duration: req.body.duration,
//   metric: exerciseData.metric
// }

async function deleteExercise_DB(exerciseID, dayOfWeek, userID, client){
  const connection = createPool().getConnection();

  const query = "DELETE FROM WorkoutPlan WHERE exerciseID = ? AND dayOfWeek = ? AND userID = ? AND creator = ?";
  (await connection).execute(query, [exerciseID, dayOfWeek, userID, client]);
  (await connection).release();
}

async function recordWorkout_DB(data){
  const connection = await pool.getConnection();
  try {
    connection.beginTransaction();
    const sets = data.sets.length;
    console.log(data);
    data.sets.forEach(async (element) => {
      console.log(element);
      let query = "";
      if (data.metric === "Reps") {
        query =
          "INSERT INTO Record(planID, exerciseID, date, reps, sets, weight) values(?, ?, ?, ?, ?, ?);";
        await connection.execute(query, [
          data.planID,
          data.exerciseID,
          data.date,
          element.reps,
          sets,
          element.weight,
        ]);
      } else {
        query =
          "INSERT INTO Record(planID, exerciseID, date, reps, sets, duration) values(?, ?, ?, ?, ?, ?);";
        await connection.execute(query, [
          data.planID,
          data.exerciseID,
          data.date,
          element.reps,
          sets,
          element.duration,
        ]);
      }
    });
    connection.commit();
  } catch (error) {
    connection.rollback();
    throw new Error("Error entering exercise to record table");
  }finally{
    connection.release();
  }
}

module.exports = {
  getAssignedWorkoutPlan_DB,
  addExercise_DB,
  getPersonalWorkoutPlan_DB,
  getLast5DaysOfWorkouts_DB,
  getExerciseDataFromPlan_DB,
  deleteExercise_DB,
  recordWorkout_DB
};
