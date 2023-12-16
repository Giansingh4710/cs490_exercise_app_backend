const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getAllExercises_DB() {
  const query =
    `SELECT exerciseID, name, type, difficulty, muscleGroup, equipment FROM Exercise`;
  const [rows, _] = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return rows;
}

async function searchExercise_DB(muscleGroup, equipment) {
  const query =
  `SELECT exerciseID, name, type, difficulty, muscleGroup, equipment 
  FROM Exercise 
  WHERE (muscleGroup LIKE '%${muscleGroup}%') AND 
    (equipment LIKE '%${equipment}%')`;
  const [rows, _] = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return rows;
}

async function deleteExercise_DB(exerciseID) {
  const query =
  `DELETE FROM Exercise WHERE exerciseID = ?`;
  const [rows, _] = await connection.promise().query(query, [exerciseID]); //res[0]=rows, res[1]=fields
  return rows;
}

async function createExercise_DB(exerciseData){
  const query = `INSERT INTO Exercise(exerciseID, name, muscleGroup, difficulty, equipment, type, metric) VALUES(?, ?, ?, ?, ?, ?, ?)`
  const [rows, _] = await connection.promise().query(query, [exerciseData.exerciseID, exerciseData.name, exerciseData.muscleGroup, exerciseData.difficulty, exerciseData.equipment, exerciseData.type, exerciseData.metric])
  return rows;
}

module.exports = { getAllExercises_DB, searchExercise_DB, deleteExercise_DB, createExercise_DB };
