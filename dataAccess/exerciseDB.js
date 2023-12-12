const { connection } = require("../sql_config/database.js");

async function getAllExercises_DB() {
    const query =
      `SELECT ExerciseID, Name, Type, Difficulty, MuscleGroup, Equipment FROM Exercise`;
    const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
    return res[0];
  }

module.exports = { getAllExercises_DB };