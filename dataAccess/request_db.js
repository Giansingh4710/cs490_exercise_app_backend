const { createPool } = require("../sql_config/database.js");

async function createRequest(requestData) {
  const connection = await createPool().getConnection();
  const query =
    "INSERT INTO Request (userID, coachID, status, goals, note) VALUES (?, ?, ?, ?, ?)";
  const [rows, _] = await connection.execute(query, [
    requestData.userID,
    requestData.coachID,
    requestData.status,
    requestData.goals,
    requestData.note,
  ]);
  connection.release();
  return rows;
}

async function getRequests(userID) {
  const connection = await createPool().getConnection();
  const query = "SELECT * FROM Request WHERE userID = ?";
  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows;
}

async function getStatus_DB(userID, coachID) {
  const connection = await createPool().getConnection();
  const query = `SELECT status, requestID FROM Request 
    WHERE userID = '${userID}' AND coachID = '${coachID}'`;
  const [rows, fields] = await connection.execute(query);
  connection.release();

  if (rows.length > 0) {
    const row = rows[0];
    return {
      exists: true,
      status: row.status,
      requestID: row.requestID,
    };
  } else {
    return {
      exists: false,
    };
  }
}

async function getPendingRequests(userID) {
  const connection = await createPool().getConnection();
  const query = `
            SELECT 
            R.requestID,
            R.userID,
            R.coachID,
            U.firstName,
            U.lastName
        FROM Request R
        JOIN Coach C ON R.coachID = C.coachID
        JOIN User U ON C.userID = U.userID
        WHERE R.userID = ? AND R.status = 'Pending' ORDER BY U.firstName ASC;`;

  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();

  return rows.map((row) => {
    return {
      requestID: row.requestID,
      "Coach": {
        coachID: row.coachID,
        firstName: row.firstName,
        lastName: row.lastName,
      },
    };
  });
}

async function unansweredRequestsByCoach_DB(userID) {
  const connection = await createPool().getConnection();
  const query = `
    SELECT 
          R.requestID,
          R.userID,
          U.firstName,
          U.lastName
        FROM Request R
        JOIN User U ON R.userID = U.userID
        WHERE R.status = "Pending" AND 
        R.coachID in (
          SELECT coachID From Coach WHERE userID=?
        )
        ORDER BY CONCAT(U.firstName,U.lastName) ASC;`;

  const [rows, _] = await connection.execute(query, [userID]);
  connection.release();
  return rows.map((row) => {
    return {
      requestID: row.requestID,
      "User": {
        userID: row.userID,
        firstName: row.firstName,
        lastName: row.lastName,
      },
    };
  });
}

async function acceptRequest_DB(requestID) {
  const query = `UPDATE request SET status = 'Accepted' WHERE requestID = ?`;
  const [res, _] = await connection.promise().query(query, [requestID]);
  return res;
}

async function declineRequest_DB(requestID) {
  const query = `UPDATE request SET status = 'Denied' WHERE requestID = ?`;
  const [res, _] = await connection.promise().query(query, [requestID]);
  return res;
}

async function cancelRequest_DB(requestID) {
  const query = "DELETE FROM Request WHERE requestID = ?";
  const [res, _] = await connection.promise().query(query, [requestID]);
  return res;
}

module.exports = {
  createRequest,
  getPendingRequests,
  unansweredRequestsByCoach_DB,
  getRequests,
  getStatus_DB,
  acceptRequest_DB,
  declineRequest_DB,
  cancelRequest_DB
};
