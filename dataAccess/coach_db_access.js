const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getCoachsByID_DB(coachID) {
  const query =
    "SELECT c.coachID, u.firstName, u.lastName, u.city, u.state, c.specialties FROM Coach c JOIN User u ON c.userID = u.userID WHERE c.coachID = ?";
  const [rows, _] = await connection.promise().query(query, [coachID]);
  return rows;
}

async function getAllCoaches_DB() {
  const query =
    "SELECT c.coachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u WHERE u.userID = c.coachID GROUP BY c.coachID ORDER BY c.coachID";
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

async function getUsersOfCoach_DB(coachID) {
  const query =
    "SELECT userID, firstName, lastName from User WHERE coachID = ?";
  const [rows, _] = await connection.promise().query(query, [coachID]);
  return rows;
}

async function getCities_DB() {
  const query =
    `SELECT state, GROUP_CONCAT(DISTINCT city SEPARATOR ', ') AS cities
    FROM User WHERE role = 'coach'
    GROUP BY state ORDER BY state ASC`;
  const [rows, _] = await connection.promise().query(query);
  return rows;
}

module.exports = {
  getCoachsByID_DB,
  getAllCoaches_DB,
  getCities_DB,
  getSpecializations_DB,
  searchCoachByName_DB,
  getUsersOfCoach_DB,
};
