const {
  getCoachByID_DB,
  getAllCoaches_DB,
  searchCoachByName_DB,
  searchCoachByAll_DB,
  getSpecializations_DB,
  getCities_DB,
  getUsersOfCoach_DB,
} = require(
  "../dataAccess/coach_db_access.js",
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

async function searchCoachByName(request, response) {
  try {
    const name = request.query.name;
    const coachData = await searchCoachByName_DB(name);
    return response.status(200).send(coachData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchCoachByName from database.",
      },
    });
  }
}

async function searchCoachByAll(request, response) {
  try {
    const name = request.query.name;
    const specialty = request.query.specialty;
    const maxPrice = request.query.maxPrice;
    const state = request.query.state;
    const city = request.query.city;
    const coachData = await searchCoachByAll_DB(name, specialty, maxPrice, state, city);
    return response.status(200).send(coachData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchCoachByAll from database.",
      },
    });
  }
}

async function getSpecializations(request, response) {
  try {
    const specData = await getSpecializations_DB();
    return response.status(200).send(specData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getSpecializations from database.",
      },
    });
  }
}

async function getUsersOfCoach(request, response) {
  try {
    const coachID = request.userID; // set in ../utils/security.js
    const clients = await getUsersOfCoach_DB(coachID);
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

async function getCities(request, response) {
  try {
    const locData = await getCities_DB();
    return response.status(200).send(locData);
  } catch (error) {
    return response.status(500).send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to get states and cities from database.",
      },
    });
  }
}

module.exports = {
  getCoachByID,
  getAllCoaches,
  searchCoachByName,
  searchCoachByAll,
  getSpecializations,
  getCities,
  getUsersOfCoach,
};
