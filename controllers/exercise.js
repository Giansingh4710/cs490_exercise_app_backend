const {
    getAllExercises_DB,
  } = require(
    "../DataAccess/exerciseDB.js",
  );

  async function getAllExercises(request, response) {
    try {
      const exerciseData = await getAllExercises_DB();
      return response.status(200).send(exerciseData);
    } catch (error) {
      return response.status(500).send({
        error: {
          status: 500,
          message: error.message,
          details: "Error trying to get all exercises from the database.",
        },
      });
    }
  }

  module.exports = {
    getAllExercises,
  };