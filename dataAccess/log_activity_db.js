const { pool } = require("../sql_config/database.js");

async function insertWaterIntake_DB(obj) {
  const connection = await pool.getConnection();
  const { userID, intakeUnit, intakeAmount, date } = obj;
  const query =
    "INSERT INTO WaterIntake (userID,date,intakeAmount,intakeUnit) VALUES (?,?,?,?)";
  const [insertData, _] = await connection.execute(query, [
    userID,
    date,
    intakeAmount,
    intakeUnit,
  ]);
  connection.release();
  return insertData;
}

async function insertMentalState_DB({ userID, state, date }) {
  const connection = await pool.getConnection();
  const query = "INSERT INTO MentalState(userID, state, date) VALUES (?, ?, ?)";
  const [insertData, _] = await connection.execute(query, [
    userID,
    state,
    date,
  ]);
  connection.release();
  return insertData;
}

// waiting on goal progress table to created in DB
async function insertGoalProgress_DB({ userID, weight, date }) {
  const connection = await pool.getConnection();
  const query =
    "INSERT INTO WeightProgress(userID, weight, date) VALUES (?, ?, ?)";
  const [insertData, _] = await connection.execute(query, [
    userID,
    weight,
    date,
  ]);
  connection.release();
  return insertData;
}

async function dailySurveyIsCompleted_DB(userID, date) {
  const connection = await pool.getConnection();
  // only checking insert of goal progress b/c daily survey is inserted using a transaction
  const query = "SELECT * FROM WeightProgress WHERE userID = ? AND date = ?";
  const [surveyData, _] = await connection.execute(query, [
    userID,
    date,
  ]);
  connection.release();
  return surveyData.length >= 1;
}

async function dailyWeight_DB(userID) {
  const connection = await pool.getConnection();
  const query = 
    `SELECT DATE_FORMAT(date, '%Y-%m-%d') AS date, weight FROM weightProgress 
    WHERE userID = ?
    ORDER BY date`;
  const [surveyData, _] = await connection.execute(query, [
    userID,
  ]);
  connection.release();
  return surveyData;
}

// TODO: anything with transaction
async function insertDailySurvey_DB(dailySurveyData, userID, date) {
  const connection = await pool.getConnection();
  let errorMsg = "";
  try {
    connection.beginTransaction();

    errorMsg = "Error trying to insertWaterIntake_DB";
    await insertWaterIntake_DB({
      "userID": userID,
      intakeUnit: dailySurveyData.waterData.unit.toLowerCase(),
      intakeAmount: dailySurveyData.waterData.amount,
      "date": date,
    });

    errorMsg = "Error trying to insertMentalState_DB";
    await insertMentalState_DB({
      "userID": userID,
      state: dailySurveyData.moodData,
      "date": date,
    });

    errorMsg = "Error trying to insertGoalProgress_DB";
    await insertGoalProgress_DB({
      "userID": userID,
      weight: dailySurveyData.weightData,
      "date": date,
    });

    connection.commit();
  }catch(error) {
    connection.rollback();
    throw new Error(errorMsg);
  }finally{
    connection.release();
  }
}
module.exports = {
  insertDailySurvey_DB,
  dailySurveyIsCompleted_DB,
  dailyWeight_DB,
};
