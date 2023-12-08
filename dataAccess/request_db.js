const { connection } = require("../sql_config/database");

async function createRequest({ userID, coachID, status, goals, note }) {
  const query =
    "INSERT INTO Request (userID, coachID, status, goals, note) VALUES (?, ?, ?, ?, ?)";
  console.log("query: ", query);
  const [res, _] = await connection.promise().query(query, [userID, coachID, status, goals, note]);
  return res;
}

async function getRequests(userID) {
  const query = "SELECT * FROM Request WHERE userID = ?";
  const [res, _] = await connection.promise().query(query, [userID]);
  return res;
}

async function getPendingRequests(userID) {
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

  const [rows, _] = await connection.promise().query(query, [userID]);
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

  return formattedData;
}

async function unansweredRequestsByCoach_DB(userID) {
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

  const res = await connection.promise().query(query, [userID]);
  return res[0].map((row) => {
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

module.exports = {
  createRequest,
  getPendingRequests,
  unansweredRequestsByCoach_DB,
  getRequests,
};
