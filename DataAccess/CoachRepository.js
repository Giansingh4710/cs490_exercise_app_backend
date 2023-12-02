const { connection } = require("../sql_config/database");

async function getCoachByID_DB(coachID) {
  const query = "SELECT c.CoachID, u.FirstName, u.LastName, u.City, u.State, c.Specialties FROM Coach c JOIN User u ON c.UserID = u.UserID WHERE c.coachID = ?";
  const res = await connection.promise().query(query, [coachID]);
  console.log(res[0][0]);
  return res[0][0];
}

async function validCoachID(ID) {
  const query = "SELECT * FROM Coach WHERE CoachID = ?";
  const res = await connection.promise().query(query, [ID]);
  return res[0].length > 0;
}

module.exports = { getCoachByID_DB, validCoachID };
