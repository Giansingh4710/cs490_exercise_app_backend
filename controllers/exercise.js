const { getAllExercises_DB } = require("../dataAccess/exerciseDB.js");

async function getAllExercises(req, res) {
  try {
    const exerciseData = await getAllExercises_DB();
    res.status(200);
    res.send(exerciseData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to get all exercises from the database.",
      },
    });
  }
}

module.exports = { getAllExercises };
