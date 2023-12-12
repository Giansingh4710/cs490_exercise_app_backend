const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getAllExercises_DB() {
    const query =
      `SELECT ExerciseID, Name, Type, Difficulty, MuscleGroup FROM Exercise`;
    const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
    return res[0];
  }

module.exports = { getAllExercises_DB };