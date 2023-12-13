const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getAllExercises_DB() {
  const query =
    "SELECT exerciseID, name, type, difficulty, muscleGroup, equipment FROM Exercise";
  const [rows, _] = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return rows;
}

module.exports = { getAllExercises_DB };
