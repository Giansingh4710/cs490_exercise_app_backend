const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getCoachByID_DB(coachID) {
  const query =
    "SELECT c.coachID, u.firstName, u.lastName, u.city, u.state, c.specialties, u.userID FROM Coach c JOIN User u ON c.userID = u.userID WHERE c.coachID = ?";
  const [rows, _] = await connection.promise().query(query, [coachID]);
  return rows[0];
}

async function getAllCoaches_DB() {
  const query =
    "SELECT c.coachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u WHERE u.userID = c.userID GROUP BY c.coachID ORDER BY c.coachID";
  const [rows, _] = await connection.promise().query(query);
  return rows;
}

async function getSpecializations_DB() {
  const query = `SELECT DISTINCT specialties FROM Coach`;
  const [rows, _] = await connection.promise().query(query);
  return rows;
}

async function searchCoachByName_DB(name) {
  const query = `SELECT c.coachID, u.firstName, u.lastName 
      FROM Coach c INNER JOIN User u ON u.userID = c.coachID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE '%${name}%' 
      GROUP BY c.coachID ORDER BY c.coachID`;
  const [rows, _] = await connection.promise().query(query);
  return rows;
}

async function searchCoachByAll_DB(name, specialty, maxPrice, state, city) {
  const query = `SELECT c.CoachID, u.firstName, u.lastName
      FROM Coach c INNER JOIN User u ON u.UserID = c.CoachID 
      WHERE (CONCAT(u.firstName, ' ', u.lastName) LIKE '%${name}%') AND 
        (c.specialties LIKE '%${specialty}%') AND 
        (c.cost <= '${maxPrice}') AND 
        (u.state LIKE '%${state}%') AND 
        (u.city LIKE '%${city}%') 
      GROUP BY c.CoachID ORDER BY u.firstName`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function getUsersOfCoach_DB(userId) {
  const query = `
      SELECT 
          R.requestID,
          R.userID,
          U.firstName,
          U.lastName
        FROM Request R
        JOIN User U ON R.userID = U.userID
        WHERE R.Status = "Pending" AND 
        R.coachID in (
            SELECT coachID From Coach WHERE UserID=?
        );
  `;
  const [rows, _] = await connection.promise().query(query, [userId]);
  return rows;
}

async function getCities_DB() {
  const query =
    `SELECT state, JSON_ARRAYAGG(city) AS cities
    FROM User WHERE role = 'coach'
    GROUP BY state ORDER BY state ASC`;
  const [rows, _] = await connection.promise().query(query);
  return rows;
}

async function getCoachIDFromUserID_DB(userID) {
  const query = "SELECT * FROM Coach WHERE UserID = ?";
  const res = await connection.promise().query(query, [userID]);
  return res[0];
}

module.exports = {
  getCoachByID_DB,
  getAllCoaches_DB,
  getCities_DB,
  getSpecializations_DB,
  searchCoachByName_DB,
  searchCoachByAll_DB,
  getUsersOfCoach_DB,
  getCoachIDFromUserID_DB,
};
