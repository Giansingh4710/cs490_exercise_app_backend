const { getCoachByID_DB } = require("../dataAccess/coach_db_access.js");
const {
  createRequest,
  getPendingRequests,
  unansweredRequestsByCoach_DB,
  getRequests,
  getStatus_DB,
  acceptRequest_DB,
  declineRequest_DB,
  cancelRequest_DB,
} = require(
  "../dataAccess/request_db.js",
);

const { createMessage_DB } = require('../dataAccess/messages_db.js');

const { hasAllKeys } = require("../utils/helper_funcs.js");

async function requestCoach(req, res) {
  let errorStatus = 500;
  try {
    const requiredFields = ["userID", "coachID", "goals", "note"];
    if (!hasAllKeys(req.body, requiredFields)) {
      errorStatus = 400;
      throw new Error(
        "Required Fields to requestCoach: userID, CoachID, Goals, Notes",
      );
    }

    const id_regex = new RegExp("^-?[0-9]+$");
    const coachID = req.body.coachID;
    const userID = req.body.userID;

    if (!id_regex.test(coachID) || !id_regex.test(userID)) {
      errorStatus = 422;
      throw new Error(
        `Invalid CoachID(${coachID}) and/or userID(${userID}) (must be a positive integer)`,
      );
    }

    if (userID !== req.userID) {
      errorStatus = 401;
      throw new Error(
        `userID in request(${userID}) does not match userID of logged in user(${req.userID})`,
      );
    }

    const coach = await getCoachByID_DB(coachID);
    if (!coach) {
      errorStatus = 404;
      throw new Error(`CoachID(${coachID}) does not exist`);
    }

    if (await userRequestedCoach(userID, coachID)) {
      errorStatus = 422;
      throw new Error(
        `User(${userID}) has already requested Coach(${coachID})`,
      );
    }

    const requestData = {
      userID: userID,
      coachID: coachID,
      status: "Pending",
      goals: req.body.goals,
      note: req.body.note,
    };

    // creating request
    const createdRequest = await createRequest(requestData);

    // sending note to coach as first message
    message = {
      content: req.body.note,
      receiverID: coach.userID,
    }

    await createMessage_DB(message, userID);

    res.status(201);
    res.send({
      ...requestData,
      requestID: createdRequest.insertId,
    });

  } catch (error) {
    res.status(errorStatus);
    res.send({
      error: {
        message: error.message,
        details: "Server Error while trying to requestCoach",
      },
    });
  }
}

async function getOpenRequests(req, res) {
  try {
    const pendingRequests = await getPendingRequests(req.userID);
    res.status(200);
    res.send(pendingRequests);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        message: error.message,
        details: "Server Error while trying to getOpenRequests",
      },
    });
  }
}

async function getStatus(req, res) {
  try {
    const userID = req.query.userID;
    const coachID = req.query.coachID;
    const statusData = await getStatus_DB(
      userID,
      coachID,
    );
    res.status(200);
    res.send(statusData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to get status in database.",
      },
    });
  }
}

async function unansweredRequestsByCoach(req, res, err) {
  try {
    const pendingRequests = await unansweredRequestsByCoach_DB(req.userID);
    res.status(200);
    res.send(pendingRequests);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        message: error.message,
        details: "Server Error while trying to get unansweredRequestsByCoach",
      },
    });
  }
}

async function userRequestedCoach(userID, coachID) {
  const rows = await getRequests(userID);
  const a = rows.filter((row) => row.coachID === coachID);
  return a.length != 0;
}

async function acceptRequest(req, res) {
  try {
    const requestID = req.query.requestID; // set in ../utils/security.js
    const requestData = await acceptRequest_DB(requestID);
    res.status(200);
    res.send(requestData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to update request status in database.",
      },
    });
  }
}

async function declineRequest(req, res) {
  try {
    const requestID = req.query.requestID; // set in ../utils/security.js
    const requestData = await declineRequest_DB(requestID);
    res.status(200);
    res.send(requestData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to update request status in database.",
      },
    });
  }
}

async function cancelRequest(req, res) {
  try {
    const requestID = req.query.requestID; // set in ../utils/security.js
    const requestData = await cancelRequest_DB(requestID);
    res.status(200);
    res.send(requestData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to delete request from database.",
      },
    });
  }
}

module.exports = {
  requestCoach,
  getOpenRequests,
  unansweredRequestsByCoach,
  getStatus,
  acceptRequest,
  declineRequest,
  cancelRequest,
};
