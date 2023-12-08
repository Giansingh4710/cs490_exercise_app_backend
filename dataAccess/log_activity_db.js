const { connection } = require("../sql_config/database.js");

async function insertWaterIntake({ userID, intakeUnit, intakeAmount, date }) {
  const query =
    `INSERT INTO WaterIntake (userID,date,intakeAmount,intakeUnit) VALUES (?,?,?,?)`;
  const [insertData,_] = await connection.promise().query(query, [
    userID,
    date,
    intakeAmount,
    intakeUnit,
  ]);
  return insertData;
}

module.exports = { insertWaterIntake };
