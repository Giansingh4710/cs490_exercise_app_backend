const {
  getAllPending_DB,
  getPendingByID_DB,
  acceptCoach_DB,
  denyCoach_DB,
  createCoachRequest_DB,
} = require(
  "../dataAccess/coach_apply_db",
);

async function getAllPending(req, res) {
  try {
    const applicationData = await getAllPending_DB();
    res.status(200);
    res.send(applicationData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to get pending coach applications from database.",
      },
    });
  }
}

async function getPendingByID(req, res) {
  let errorStatusCode = 500;
  try {
    const userID = req.query.userID;

    const userData = await getPendingByID_DB(userID);
    if (userData == undefined) {
      errorStatusCode = 404;
      throw new Error(`No user currently applying for coach found with userID:${userID}`);
    }
    res.status(200);
    res.send(userData);
  } catch (error) {
    res.status(errorStatusCode);
    res.send({
      error: {
        status: errorStatusCode,
        message: error.message,
        details: "Error fetching pending coach data from database",
      },
    });
  }
}

async function acceptCoach(req, res) {
  try {
    const coachRequestID = req.query.coachRequestID; // set in ../utils/security.js
    const coachRequestData = await acceptCoach_DB(coachRequestID);
    res.status(200);
    res.send(coachRequestData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to add coach to database.",
      },
    });
  }
}

async function denyCoach(req, res) {
  try {
    const coachRequestID = req.query.coachRequestID; // set in ../utils/security.js
    const coachRequestData = await denyCoach_DB(coachRequestID);
    res.status(200);
    res.send(coachRequestData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to update coach request status in database.",
      },
    });
  }
}

async function createCoachRequest(req, res) {
  try {
    const newApplication = await createCoachRequest_DB(req.body);
    res.status(201)
    res.send({
      message: "Coach application added to database",
    });
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error inserting coach application into database",
      },
    });
  }
}

module.exports = {
  getAllPending,
  getPendingByID,
  acceptCoach,
  denyCoach,
  createCoachRequest,
};