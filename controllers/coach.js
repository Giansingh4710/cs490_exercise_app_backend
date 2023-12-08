const {
  getCoachsByID_DB,
  getAllCoaches_DB,
  searchCoachByName_DB,
  getUsersOfCoach_DB,
} = require(
  "../DataAccess/coach_db_access.js",
);

async function getCoachByID(req, res) {
  let errorStatusCode = 500;
  try {
    const coachIDRegex = new RegExp("^-?[0-9]+$");
    const coachId = req.params.CoachID;

    if (!coachIDRegex.test(coachId) || coachId < 0) {
      errorStatusCode = 422;
      throw new Error(
        `Invalid CoachID(${coachId}) (must be a positive integer)`,
      );
    }
    const rows = await getCoachsByID_DB(coachId);
    if (rows.length === 0) {
      errorStatusCode = 404;
      new Error(`No Coach found with ID:${coachId}`);
    }
    const coachData = rows[0];
    return res.status(200).send(coachData);
  } catch (error) {
    return res.status(errorStatusCode).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error accessing database.",
      },
    });
  }
}

async function getAllCoaches(req, res) {
  try {
    const coachData = await getAllCoaches_DB();
    return res.status(200).send(coachData);
  } catch (error) {
    return res.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getAllCoaches from database.",
      },
    });
  }
}

async function searchByName(req, res) {
  try {
    const name = req.query.name;
    const coachData = await searchCoachByName_DB(name);
    return res.status(200).send(coachData);
  } catch (error) {
    return res.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchByName from database.",
      },
    });
  }
}

async function getClientsOfCoach(req, res) {
  try {
    const coachID = req.userID; // set in ../utils/security.js
    const clients = await getUsersOfCoach_DB(coachID);
    return res.status(200).send(clients);
  } catch (error) {
    return res.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getClientsOfCoach from database.",
      },
    });
  }
}

module.exports = {
  getCoachByID,
  getAllCoaches,
  searchByName,
  getClientsOfCoach,
};
