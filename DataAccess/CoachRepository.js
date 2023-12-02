const { connection } = require("../sql_config/database");

async function getCoachByID_DB(coachID) {
  const query =
    "SELECT c.CoachID, u.FirstName, u.LastName, u.City, u.State, c.Specialties FROM Coach c JOIN User u ON c.UserID = u.UserID WHERE c.coachID = ?";
  const res = await connection.promise().query(query, [coachID]);
  return res[0][0];
}

async function getAllCoaches_DB() {
  const query =
    "SELECT c.CoachID, u.firstName, u.lastName FROM Coach c INNER JOIN User u WHERE u.UserID = c.CoachID GROUP BY c.CoachID ORDER BY c.CoachID";
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

async function searchByName_DB(name) {
  const query = `SELECT c.CoachID, u.firstName, u.lastName 
      FROM Coach c INNER JOIN User u ON u.UserID = c.CoachID 
      WHERE CONCAT(u.firstName, ' ', u.lastName) LIKE '%${name}%' 
      GROUP BY c.CoachID ORDER BY c.CoachID`;
  const res = await connection.promise().query(query); //res[0]=rows, res[1]=fields
  return res[0];
}

module.exports = { getCoachByID_DB, getAllCoaches_DB, searchByName_DB };
