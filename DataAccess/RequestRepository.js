const { connection } = require("../sql_config/database");
const Request = require("../models/Request");

async function createRequest(requestData) {
  try {
    const request = await Request.create(requestData);
    return request;
  } catch (error) {
    console.log(error);
    throw new Error("Error in Database");
  }
}

async function getRequestsByUserID(UserID) {
  try {
    const query = "SELECT * FROM Request WHERE UserID = ?";
    return connection.promise().query(query, [UserID]);
    // console.log(response);
  } catch (error) {
    throw error;
  }
}

async function getRequestsByUserIDSorted(userID) {
  try {
    const query = `
            SELECT 
                Request.RequestID,
                Request.UserID,
                Request.CoachID,
                User.FirstName,
                User.LastName
            FROM Request
            JOIN Coach ON Request.CoachID = Coach.CoachID
            JOIN User ON Coach.UserID = User.UserID
            WHERE Request.UserID = ? ORDER BY User.FirstName ASC;`;

    return connection.promise().query(query, [userID]);
  } catch (error) {
    throw error;
  }
}

async function userRequestedCoach(userID, coachID) {
  try {
    const [response, fields] = await getRequestsByUserID(
      userID,
    );

    if (response.length === 0) {
      return false;
    }
    const requests = response.map((row) => {
      return {
        CoachID: row.CoachID,
        UserID: row.UserID,
        Goals: row.Goals,
        Note: row.Note,
        Status: row.Status,
      };
    });

    for (let row = 0; row < requests.length; row++) {
      if (requests[row].CoachID === coachID) {
        return true; //idk if this is what you meant to do.
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error getting data from db");
  }
}

async function getPendingRequests(userID) {
  const [response, fields] = await getRequestsByUserIDSorted(userID);
  console.log(response);
  if (response.length === 0) {
    return {};
  }
  const requests = response.map((row) => {
    return {
      RequestID: row.RequestID,
      CoachID: row.CoachID,
      FirstName: row.FirstName,
      LastName: row.LastName,
    };
  });
  let formattedData = [];
  for (let i = 0; i < requests.length; i++) {
    let formattedRequest = {};
    formattedRequest["requestID"] = requests[i].RequestID;
    let formattedCoachData = {};
    formattedCoachData["coachID"] = requests[i].CoachID;
    formattedCoachData["firstName"] = requests[i].FirstName;
    formattedCoachData["lastName"] = requests[i].LastName;
    formattedRequest["coach"] = formattedCoachData;
    formattedData.push(formattedRequest);
  }
  console.log(formattedData);
  return formattedData;
}

async function unansweredRequestsByCoach_DB(coachID) {
  const query = `
    SELECT 
      R.RequestID,
      R.UserID,
      U.FirstName,
      U.LastName
    FROM Request R
    JOIN User U ON R.UserID = U.UserID
    WHERE R.Status = "Pending" AND R.CoachID = ?`;

  const res = await connection.promise().query(query, [coachID]);
  return res[0].map((row) => {
    return {
      RequestID: row.RequestID,
      "User": {
        UserID: row.UserID,
        FirstName: row.FirstName,
        LastName: row.LastName,
      },
    };
  });
}

async function validCoachID(coachID) {
  // this exists in ../utils/helper_funcs.js as coachID_exists
  const coachData = await CoachService.getCoachByID(coachID);
  if (Object.keys(coachData).length === 0) {
    return false;
  }
  return true;
}

module.exports = {
  createRequest,
  userRequestedCoach,
  getPendingRequests,
  unansweredRequestsByCoach_DB,
};
