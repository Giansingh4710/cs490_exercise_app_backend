const {createPool} = require("../sql_config/database.js");

async function getAllExercises_DB() {
  const connection = await createPool().getConnection();
  const query =
    `SELECT exerciseID, name, type, difficulty, muscleGroup, equipment FROM Exercise`;
  const [rows, _] = await connection.execute(query); //res[0]=rows, res[1]=fields
  connection.release();
  return rows;
}

async function searchExercise_DB(muscleGroup, equipment) {
  const connection = await createPool().getConnection();
  const query =
  `SELECT exerciseID, name, type, difficulty, muscleGroup, equipment 
  FROM Exercise 
  WHERE (muscleGroup LIKE '%${muscleGroup}%') AND 
    (equipment LIKE '%${equipment}%')`;
  const [rows, _] = await connection.execute(query); //res[0]=rows, res[1]=fields
  connection.release();
  return rows;
}

module.exports = { getAllExercises_DB, searchExercise_DB };
