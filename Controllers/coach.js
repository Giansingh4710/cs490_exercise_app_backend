const { getCoachByID_DB } = require("../DataAccess/CoachRepository.js");

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

module.exports = { getCoachByID };
