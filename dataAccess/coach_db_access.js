const { connection } = require("../sql_config/database.js");

async function getCoachsByID_DB(coachID) {
  const query =
    "SELECT c.coachID, u.firstName, u.lastName, u.city, u.state, c.specialties FROM Coach c JOIN User u ON c.userID = u.userID WHERE c.coachID = ?";
  const [rows, _] = await connection.promise().query(query, [coachID]);
  return rows;
}

async function getAllCoaches_DB() {
  const query =
    "SELECT c.coachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u WHERE u.userID = c.coachID GROUP BY c.coachID ORDER BY c.coachID";
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function searchCoachByName_DB(name) {
  const query = `SELECT c.coachID, u.firstName, u.lastName 
      FROM Coach c INNER JOIN User u ON u.userID = c.coachID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE '%${name}%' 
      GROUP BY c.coachID ORDER BY c.coachID`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function getUsersOfCoach_DB(coachID) {
  const query =
    "SELECT userID, firstName, lastName from User WHERE coachID = ?";
  const res = await connection.promise().query(query, [coachID]);
  return res[0];
}

module.exports = {
  getCoachsByID_DB,
  getAllCoaches_DB,
  searchCoachByName_DB,
  getUsersOfCoach_DB,
};
