const {
  getCoachByID_DB,
  getAllCoaches_DB,
  searchByName_DB,
  getClientsOfCoach_DB,
} = require(
  "../DataAccess/coach_db_access.js",
);

async function getCoachByID(request, response) {
  const coachIDRegex = new RegExp("^-?[0-9]+$");
  const coachId = request.params.CoachID;

  if (!coachIDRegex.test(coachId)) {
    return response.status(422).send({
      error: {
        status: 422,
        message: "Bad Request",
        details: "Invalid CoachID. CoachID must be an integer.",
      },
    });
  }

  if (coachId < 0) {
    return response.status(422).send({
      error: {
        status: 422,
        message: "Bad Request",
        details: "Invalid CoachID. CoachID must be nonnegative.",
      },
    });
  }

  try {
    const coachData = await getCoachByID_DB(coachId);
    if (coachData === undefined) {
      return response.status(404).send({
        error: {
          status: 404,
          message: `No Coach found with ID:${coachId}`,
          details: "No matching data found for the specified criteria.",
        },
      });
    }
    return response.status(200).send(coachData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error accessing database.",
      },
    });
  }
}

async function getAllCoaches(request, response) {
  try {
    const coachData = await getAllCoaches_DB();
    return response.status(200).send(coachData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getAllCoaches from database.",
      },
    });
  }
}

async function searchByName(request, response) {
  try {
    const name = request.query.name;
    const coachData = await searchByName_DB(name);
    return response.status(200).send(coachData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchByName from database.",
      },
    });
  }
}

async function getClientsOfCoach(request, response) {
  try {
    const coachID = request.UserID; // set in ../Services/TokenVerification.js
    const clients = await getClientsOfCoach_DB(coachID);
    return response.status(200).send(clients);
  } catch (error) {
    return response.status(500).send({
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
