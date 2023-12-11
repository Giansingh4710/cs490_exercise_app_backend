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

async function insertMentalState({userID, state, date}){
    const query = "INSERT INTO MentalState(userID, state, date) VALUES (?, ?, ?)";
    const [insertData, _] = await connection.promise().query(query, [userID, state, date])
    return insertData;
}

// waiting on goal progress table to created in DB
async function insertGoalProgress({userID, weight, date}){
    const query = "INSERT INTO GoalProgress(userID, weight, date) VALUES (?, ?, ?)";
    const [insertData, _] = await connection.promise().query(query, [userID, weight, date])
    return insertData;
}

async function dailySurveyIsCompleted(userID, date){
    // only checking insert of goal progress b/c daily survey is inserted using a transaction
    const query = "SELECT * FROM GoalProgress WHERE userID = ? AND date = ?";
    const [surveyData, _] = await connection.promise().query(query, [userID, date])
    return surveyData.length >= 1;
}

async function insertDailySurvey(dailySurveyData, userID, date){
    try{
        connection.promise().beginTransaction();
        const waterIntakeInsert = await insertWaterIntake({
            "userID": userID,
            intakeUnit: dailySurveyData.waterData.unit.toLowerCase(),
            intakeAmount: dailySurveyData.waterData.amount,
            "date": date
        });
        const mentalStateInsert = await insertMentalState({
            "userID": userID,
            state: dailySurveyData.moodData,
            "date": date
        })
        const goalProgressInsert = await insertGoalProgress({
            "userID": userID,
            weight: dailySurveyData.weightData,
            "date": date
        })

        connection.promise().commit();
    }catch(error){
        connection.promise().rollback();
        throw new Error("Error recording daily survey");
    }
}
module.exports = { 
    insertDailySurvey, 
    dailySurveyIsCompleted};
