const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getAllPending_DB() {
    const query =
      `SELECT c.coachRequestID, u.firstName, u.lastName, c.status, c.specialties, c.cost
      FROM CoachRequest c INNER JOIN User u ON u.userID = c.userID
      WHERE c.status = 'Pending' ORDER BY c.coachRequestID`;
    const [rows, _] = await connection.promise().query(query);
    return rows;
  }

module.exports = {
    getAllPending_DB,
  };