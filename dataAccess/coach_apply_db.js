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

async function getPendingByID_DB(userID) {
  const query =
    `SELECT c.coachRequestID, u.firstName, u.lastName, c.status, c.specialties, c.cost 
    FROM CoachRequest c JOIN User u ON c.userID = u.userID 
    WHERE u.userID = ? AND c.status = 'Pending'`;
  const [rows, _] = await connection.promise().query(query, [userID]);
  return rows[0];
}

async function acceptCoach_DB(coachRequestID) {
  const query = `UPDATE coachRequest SET status = 'Accepted' WHERE coachRequestID = ?`;
  const [res, _] = await connection.promise().query(query, [coachRequestID]);
  return res;
}

async function denyCoach_DB(coachRequestID) {
  const query = `UPDATE coachRequest SET status = 'Denied' WHERE coachRequestID = ?`;
  const [res, _] = await connection.promise().query(query, [coachRequestID]);
  return res;
}

async function createCoachRequest_DB(coachRequestData){
  const query = `INSERT INTO CoachRequest(userID, status, specialties, cost) VALUES(?, ?, ?, ?)`
  const [res, _] = await connection.promise().query(query, [coachRequestData.userID, 
    coachRequestData.status, coachRequestData.specialties, coachRequestData.cost])
  return res;
}

module.exports = {
    getAllPending_DB,
    getPendingByID_DB,
    acceptCoach_DB,
    denyCoach_DB,
    createCoachRequest_DB,
  };