const { getCoachByID_DB } = require("../dataAccess/coach_db_access.js");
const {
  createRequest,
  getPendingRequests,
  unansweredRequestsByCoach_DB,
  getRequests,
} = require(
  "../dataAccess/request_db.js",
);
const { hasAllKeys } = require("../utils/helper_funcs.js");

async function requestCoach(req, res, err) {
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
    // const userID = req.body.userID;
    const userID = 1; //TODO

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

    const [coach] = await getCoachByID_DB(coachID);
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
    const createdRequest = await createRequest(requestData);
    return res.status(201).send({
      ...requestData,
      requestID: createdRequest.insertId,
    });
  } catch (error) {
    return res.status(errorStatus).send({
      error: {
        message: error.message,
        details: "Server Error while trying to requestCoach",
      },
    });
  }
}

async function getOpenRequests(req, res, err) {
  try {
    const pendingRequests = await getPendingRequests(req.userID);
    return res.status(200).send(pendingRequests);
  } catch (error) {
    return res.status(500).send({
      error: {
        message: error.message,
        details: "Server Error while trying to getOpenRequests",
      },
    });
  }
}

async function unansweredRequestsByCoach(req, res, err) {
  try {
    const pendingRequests = await unansweredRequestsByCoach_DB(req.userID);
    return res.status(200).send(pendingRequests);
  } catch (error) {
    return res.status(500).send({
      error: {
        error: error.message,
        message: "Server Error while trying to get unansweredRequestsByCoach",
      },
    });
  }
}

async function userRequestedCoach(userID, coachID) {
  const rows = await getRequests(userID);
  const a = rows.filter((row) => row.coachID === coachID);
  return a.length != 0;
}

module.exports = {
  requestCoach,
  getOpenRequests,
  unansweredRequestsByCoach,
};
