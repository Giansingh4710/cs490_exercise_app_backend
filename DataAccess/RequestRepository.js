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
        return true;
      }
    }
    return false;
  } catch (error) {
    throw new Error("Error getting data from db");
  }
}

module.exports = { createRequest, userRequestedCoach };
