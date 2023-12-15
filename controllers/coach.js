const {
  getCoachByID_DB,
  getAllCoaches_DB,
  searchCoachByName_DB,
  searchCoachByAll_DB,
  getSpecializations_DB,
  getCities_DB,
  getUsersOfCoach_DB,
  getClientInfo_DB,
} = require(
  "../dataAccess/coach_db_access",
);

async function getCoachByID(req, res) {
  let errorStatusCode = 500;
  try {
    const coachIDRegex = new RegExp("^-?[0-9]+$");
    const coachId = req.params.coachID;

    if (!coachIDRegex.test(coachId) || coachId < 0) {
      errorStatusCode = 422;
      throw new Error(
        `Invalid coachID(${coachId}) (must be a positive integer)`,
      );
    }
    const coachData = await getCoachByID_DB(coachId);
    if (coachData == undefined) {
      errorStatusCode = 404;
      throw new Error(`No Coach found with ID:${coachId}`);
    }
    res.status(200);
    res.send(coachData);
  } catch (error) {
    res.status(errorStatusCode);
    res.send({
      error: {
        status: errorStatusCode,
        message: error.message,
        details: "Error accessing database.",
      },
    });
  }
}

async function getAllCoaches(req, res) {
  try {
    const coachData = await getAllCoaches_DB();
    res.status(200);
    res.send(coachData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getAllCoaches from database.",
      },
    });
  }
}

async function searchCoachByName(req, res) {
  try {
    const name = req.query.name;
    const coachData = await searchCoachByName_DB(name);
    res.status(200);
    res.send(coachData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchCoachByName from database.",
      },
    });
  }
}

async function searchCoachByAll(req, res) {
  try {
    const name = req.query.name;
    const specialty = req.query.specialty;
    const maxPrice = req.query.maxPrice;
    const state = req.query.state;
    const city = req.query.city;
    const coachData = await searchCoachByAll_DB(
      name,
      specialty,
      maxPrice,
      maxPrice,
      state,
      city,
    );
    res.status(200);
    res.send(coachData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchCoachByAll from database.",
      },
    });
  }
}

async function getUsersOfCoach(req, res) {
  try {
    const coachID = req.userID; // set in ../utils/security.js
    const clients = await getUsersOfCoach_DB(coachID);
    res.status(200);
    res.send(clients);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getUsersOfCoach from database.",
      },
    });
  }
}

async function getClientInfo(req, res) {
  try {
    const userID = req.query.userID; // set in ../utils/security.js
    const clientData = await getClientInfo_DB(userID);
    res.status(200);
    res.send(clientData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getClientInfo from database.",
      },
    });
  }
}

async function getCities(req, res) {
  try {
    const locData = await getCities_DB();
    res.status(200);
    res.send(locData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to get states and cities from database.",
      },
    });
  }
}

async function getSpecializations(req, res) {
  try {
    const specData = await getSpecializations_DB();
    res.status(200);
    res.send(specData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to getSpecializations from database.",
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
  getClientInfo,
};