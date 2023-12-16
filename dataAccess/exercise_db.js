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

async function deleteExercise_DB(exerciseID) {
  const connection = await createPool().getConnection();
  const query =
  `DELETE FROM Exercise WHERE exerciseID = ?`;
  const [rows, _] = await connection.execute(query, [exerciseID]); //res[0]=rows, res[1]=fields
  connection.release();
  return rows;
}

async function createExercise_DB(exerciseData){
  const connection = await createPool().getConnection();
  const query = `INSERT INTO Exercise(name, muscleGroup, difficulty, equipment, type, metric) VALUES(?, ?, ?, ?, ?, ?)`
  const [rows, _] = await connection.execute(query, [exerciseData.name, exerciseData.muscleGroup,
     exerciseData.difficulty, exerciseData.equipment, exerciseData.type, exerciseData.metric])
  connection.release();
  return rows;
}

async function getExerciseData_DB(exerciseID){
  const connection = await createPool().getConnection();
  const query = "SELECT * FROM Exercise WHERE ExerciseID = ?";
  const [res, _] = await connection.execute(query, [exerciseID]);
  connection.release();
  return res;
}

module.exports = { getAllExercises_DB, searchExercise_DB, deleteExercise_DB, createExercise_DB, getExerciseData_DB };
