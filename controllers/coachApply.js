const {
  getAllPending_DB,
  acceptCoach_DB,
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
        details: "Error trying to update coach request status in database.",
      },
    });
  }
}

module.exports = {
  getAllPending,
  acceptCoach,
};