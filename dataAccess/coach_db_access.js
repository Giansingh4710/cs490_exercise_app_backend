const { pool } = require("../sql_config/database.js");

async function getCoachByID_DB(coachID) {
  const connection = await pool.getConnection();
  const query =
    "SELECT c.coachID, u.firstName, u.lastName, u.city, u.state, c.specialties, u.userID, ROUND(c.cost, 2) as cost FROM Coach c JOIN User u ON c.userID = u.userID WHERE c.coachID = ?";
  const [rows, _] = await connection.execute(query, [coachID]);
  connection.release();
  return rows[0];
}

async function getAllCoaches_DB() {
  const connection = await pool.getConnection();
  const query =
    "SELECT c.coachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u ON u.userID = c.userID ORDER BY c.coachID";
  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function getSpecializations_DB() {
  const connection = await pool.getConnection();
  const query = `SELECT DISTINCT specialties FROM Coach`;
  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function searchCoachByName_DB(name) {
  const connection = await pool.getConnection();
  const query = `SELECT c.coachID, u.firstName, u.lastName 
      FROM Coach c INNER JOIN User u ON u.userID = c.userID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE ?
      ORDER BY c.coachID`;
  const searchName = `%${name}%`;
  const [rows, _] = await connection.execute(query, [searchName]);
  connection.release();
  return rows;
}

async function searchCoachByAll_DB(name, specialty, maxPrice, maxPrice2, state, city) {
  const connection = await pool.getConnection();
  const query = `
      SELECT c.coachID, u.firstName, u.lastName, c.cost
      FROM Coach c INNER JOIN User u ON u.UserID = c.userID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE ? AND 
        c.specialties LIKE ? AND 
        c.cost <= IF(?=0, 999999999, ?) AND
        u.state LIKE ? AND 
        u.city LIKE ? 
      GROUP BY c.CoachID ORDER BY u.firstName`;
  const [rows, _] = await connection.execute(query, [
    `%${name}%`,
    `%${specialty}%`,
    maxPrice, maxPrice2,
    `%${state}%`,
    `%${city}%`,
  ]);
  connection.release();
  return rows;
}

async function getUsersOfCoach_DB(userId) {
  const connection = await pool.getConnection();
  const query = `
      SELECT 
          R.requestID,
          R.userID,
          U.firstName,
          U.lastName
        FROM Request R
        JOIN User U ON R.userID = U.userID
        WHERE R.Status = "Accepted" AND 
        R.coachID in (
            SELECT coachID From Coach WHERE UserID=?
        );
  `;
  const [rows, _] = await connection.execute(query, [userId]);
  connection.release();
  return rows;
}

async function getClientInfo_DB(userID) {
  const connection = await pool.getConnection();
  const query = 
    `SELECT u.userID, u.firstName, u.lastName, g.goalType AS goal,
    JSON_ARRAY('surveyDate', f.date, 'mentalState', m.state, 'waterIntake', TRUNCATE(w.intakeAmount, 1), 'waterUnits', w.intakeUnit,
    'foodEaten', f.foodName, 'mealType', f.mealType, 'calories', f.calories, 'protein', f.protein, 'carbs', f.carbs, 'fat', f.fat,
    'weightProgress', wp.weight, 'exerciseID', e.exerciseID, 'reps', e.reps, 'sets', e.sets, 'weightLifted', e.weight) AS dailySurvey
    FROM User u INNER JOIN Goal g ON u.userID = ?
    LEFT JOIN MentalState m ON u.userID = m.userID AND m.date = (SELECT MAX(m2.date) FROM MentalState m2 WHERE m2.userID = u.userID)
    LEFT JOIN FoodIntake f ON u.userID = f.userID AND f.date = (SELECT MAX(f2.date) FROM FoodIntake f2 WHERE f2.userID = u.userID)
    LEFT JOIN WaterIntake w ON u.userID = w.userID AND w.date = (SELECT MAX(w2.date) FROM WaterIntake w2 WHERE w2.userID = u.userID)
    LEFT JOIN WeightProgress wp ON u.userID = wp.userID AND wp.date = (SELECT MAX(wp2.date) FROM WeightProgress wp2 WHERE wp2.userID = u.userID)
    LEFT JOIN WorkoutPlan e ON u.userID = e.userID`;
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows[0];
}

async function getCities_DB() {
  const connection = await pool.getConnection();
  const query = `SELECT state, JSON_ARRAYAGG(city) AS cities
    FROM User WHERE role = 'coach'
    GROUP BY state ORDER BY state ASC`;
  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function getCoachIDFromUserID_DB(userID) {
  const connection = await pool.getConnection();
  const query = "SELECT * FROM Coach WHERE UserID = ?";
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows[0];
}

async function terminateClient_DB(userID, coachID, coachUserID) {
  const connection = await pool.getConnection();
  const query = "UPDATE User SET coachID = NULL WHERE userID = ?";
  const [rows, _] = await connection.execute(query, [userID]);

  const requestQuery = "UPDATE Request SET status = 'Denied' WHERE userID = ? AND coachID = ?"; // need coachID so all requests dont get set to denied for a user
  const [requestRows, __] = await connection.execute(requestQuery, [userID, coachID]);

  const deleteAssignedWorkoutQuery = "DELETE FROM WorkoutPlan WHERE userID = ? AND creator='Coach'";
  await connection.execute(deleteAssignedWorkoutQuery, [userID]);
  
  const deleteMessagesQuery = "DELETE FROM Message WHERE senderID = ? AND receiverID = ? OR senderID = ? AND receiverID = ?";
  await connection.execute(deleteMessagesQuery, [userID, coachUserID, coachUserID, userID]);

  connection.release();
  return rows[0];
}

module.exports = {
  getCoachByID_DB,
  getAllCoaches_DB,
  getCities_DB,
  getSpecializations_DB,
  searchCoachByName_DB,
  searchCoachByAll_DB,
  getClientInfo_DB,
  getUsersOfCoach_DB,
  getCoachIDFromUserID_DB,
  terminateClient_DB,
};
