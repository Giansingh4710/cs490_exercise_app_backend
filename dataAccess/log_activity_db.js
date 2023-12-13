const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function insertWaterIntake_DB(obj) {
  const { userID, intakeUnit, intakeAmount, date } = obj;
  const query =
    "INSERT INTO WaterIntake (userID,date,intakeAmount,intakeUnit) VALUES (?,?,?,?)";
  const [insertData, _] = await connection.promise().query(query, [
    userID,
    date,
    intakeAmount,
    intakeUnit,
  ]);
  return insertData;
}

async function insertMentalState_DB({ userID, state, date }) {
  const query = "INSERT INTO MentalState(userID, state, date) VALUES (?, ?, ?)";
  const [insertData, _] = await connection.promise().query(query, [
    userID,
    state,
    date,
  ]);
  return insertData;
}

// waiting on goal progress table to created in DB
async function insertGoalProgress_DB({ userID, weight, date }) {
  const query =
    "INSERT INTO WeightProgress(userID, weight, date) VALUES (?, ?, ?)";
  const [insertData, _] = await connection.promise().query(query, [
    userID,
    weight,
    date,
  ]);
  return insertData;
}

async function dailySurveyIsCompleted_DB(userID, date) {
  // only checking insert of goal progress b/c daily survey is inserted using a transaction
  const query = "SELECT * FROM WeightProgress WHERE userID = ? AND date = ?";
  const [surveyData, _] = await connection.promise().query(query, [
    userID,
    date,
  ]);
  return surveyData.length >= 1;
}

async function insertDailySurvey_DB(dailySurveyData, userID, date) {
  try {
    connection.promise().beginTransaction();
    const waterIntakeInsert = await insertWaterIntake_DB({
      "userID": userID,
      intakeUnit: dailySurveyData.waterData.unit.toLowerCase(),
      intakeAmount: dailySurveyData.waterData.amount,
      "date": date,
    });
    const mentalStateInsert = await insertMentalState_DB({
      "userID": userID,
      state: dailySurveyData.moodData,
      "date": date,
    });
    const goalProgressInsert = await insertGoalProgress_DB({
      "userID": userID,
      weight: dailySurveyData.weightData,
      "date": date,
    });

    connection.promise().commit();
  } catch (error) {
    connection.promise().rollback();
    throw new Error("Error recording daily survey");
  }
}
module.exports = {
  insertDailySurvey_DB,
  dailySurveyIsCompleted_DB,
};
