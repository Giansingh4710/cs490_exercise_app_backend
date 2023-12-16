const { createPool } = require("../sql_config/database.js");

async function getCoachByID_DB(coachID) {
  const connection = await createPool().getConnection();
  const query =
    "SELECT c.coachID, u.firstName, u.lastName, u.city, u.state, c.specialties, u.userID FROM Coach c JOIN User u ON c.userID = u.userID WHERE c.coachID = ?";
  const [rows, _] = await connection.execute(query, [coachID]);
  connection.release();
  return rows[0];
}

async function getAllCoaches_DB() {
  const connection = await createPool().getConnection();
  const query =
    "SELECT c.coachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u ON u.userID = c.userID ORDER BY c.coachID";
  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function getSpecializations_DB() {
  const connection = await createPool().getConnection();
  const query = `SELECT DISTINCT specialties FROM Coach`;
  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function searchCoachByName_DB(name) {
  const connection = await createPool().getConnection();
  const query = `SELECT c.coachID, u.firstName, u.lastName 
      FROM Coach c INNER JOIN User u ON u.userID = c.userID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE ?
      ORDER BY c.coachID`;
  const searchName = `%${name}%`;
  const [rows, _] = await connection.execute(query, [searchName]);
  connection.release();
  return rows;
}

async function searchCoachByAll_DB(name, specialty, maxPrice, state, city) {
  const connection = await createPool().getConnection();
  const query = `
      SELECT c.CoachID, u.firstName, u.lastName
      FROM Coach c INNER JOIN User u ON u.UserID = c.CoachID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE ? AND 
        c.specialties LIKE ? AND 
        c.cost <= ? AND 
        u.state LIKE ? AND 
        u.city LIKE ? 
      GROUP BY c.CoachID ORDER BY u.firstName`;
  const [rows, _] = await connection.execute(query, [
    `%${name}%`,
    `%${specialty}%`,
    maxPrice,
    `%${state}%`,
    `%${city}%`,
  ]);
  connection.release();
  return rows;
}

async function getUsersOfCoach_DB(userId) {
  const connection = await createPool().getConnection();
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
  const [rows, _] = await connection.execute(query, [userId]);
  connection.release();
  return rows;
}

async function getCities_DB() {
  const connection = await createPool().getConnection();
  const query = `SELECT state, JSON_ARRAYAGG(city) AS cities
    FROM User WHERE role = 'coach'
    GROUP BY state ORDER BY state ASC`;
  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function getCoachFromUserID(userID) {
  const connection = await createPool().getConnection();
  const query = "SELECT * FROM Coach WHERE UserID = ?";
  const [rows, _] = await connection.execute(query, [userID]);
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
  getUsersOfCoach_DB,
  getCoachFromUserID,
};
