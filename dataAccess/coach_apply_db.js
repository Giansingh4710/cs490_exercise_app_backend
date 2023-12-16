const { createPool } = require("../sql_config/database.js");

async function getAllPending_DB() {
  const connection = await createPool().getConnection();
  const query =
    `SELECT c.coachRequestID, u.firstName, u.lastName, c.status, c.specialties, c.cost
    FROM CoachRequest c INNER JOIN User u ON u.userID = c.userID
    WHERE c.status = 'Pending' ORDER BY c.coachRequestID`;

  const [rows, _] = await connection.execute(query);
  connection.release();
  return rows;
}

async function getPendingByID_DB(userID) {
  const connection = await createPool().getConnection();
  const query =
    `SELECT c.coachRequestID, u.firstName, u.lastName, c.status, c.specialties, c.cost 
    FROM CoachRequest c JOIN User u ON c.userID = u.userID 
    WHERE u.userID = ? AND c.status = 'Pending'`;

  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
  // return rows[0];
}

async function acceptCoach_DB(coachRequestID) {
  const connection = await createPool().getConnection();
  const query =
    `UPDATE coachRequest SET status = 'Accepted' WHERE coachRequestID = ?`;
  const [rows, _] = await connection.execute(query, [coachRequestID]);
  connection.release();
  return rows;
}

async function denyCoach_DB(coachRequestID) {
  const connection = await createPool().getConnection();
  const query =
    `UPDATE coachRequest SET status = 'Denied' WHERE coachRequestID = ?`;
  const [rows, _] = await connection.execute(query, [coachRequestID]);
  connection.release();
  return rows;
}

async function createCoachRequest_DB(coachRequestData) {
  const connection = await createPool().getConnection();
  const query =
    `INSERT INTO CoachRequest(userID, status, specialties, cost) VALUES(?, ?, ?, ?)`;
  const [rows, _] = await connection.execute(query, [
    coachRequestData.userID,
    coachRequestData.status,
    coachRequestData.specialties,
    coachRequestData.cost,
  ]);
  connection.release();
  return rows;
}

module.exports = {
  getAllPending_DB,
  getPendingByID_DB,
  acceptCoach_DB,
  denyCoach_DB,
  createCoachRequest_DB,
};
