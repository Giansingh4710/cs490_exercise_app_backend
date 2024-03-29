const {
  getAllExercises_DB,
  searchExercise_DB,
  disableExercise_DB,
  enableExercise_DB,
  createExercise_DB,
  getExerciseData_DB,
  getAllActiveExercises_DB,
} = require("../dataAccess/exercise_db.js");

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

async function getAllActiveExercises(req, res) {
  try {
    const exerciseData = await getAllActiveExercises_DB();
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

async function searchExercise(req, res) {
  try {
    const muscleGroup = req.query.muscleGroup;
    const equipment = req.query.equipment;
    const exerciseData = await searchExercise_DB(
      muscleGroup,
      equipment,
    );
    res.status(200);
    res.send(exerciseData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to searchExercise in database.",
      },
    });
  }
}

async function disableExercise(req, res) {
  try {
    const exerciseID = req.query.exerciseID;
    const exerciseData = await disableExercise_DB(
      exerciseID,
    );
    res.status(200);
    res.send(exerciseData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to disable Exercise in database.",
      },
    });
  }
}

async function enableExercise(req, res) {
  try {
    const exerciseID = req.query.exerciseID;
    const exerciseData = await enableExercise_DB(
      exerciseID,
    );
    res.status(200);
    res.send(exerciseData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error trying to ensable Exercise in database.",
      },
    });
  }
}

async function createExercise(req, res) {
  try {
    const newExercise = await createExercise_DB(req.body);
    res.status(201);
    res.send({
      message: "Exercise added to exercise bank",
    });
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error inserting exercise into database",
      },
    });
  }
}

async function getExerciseData(req, res) {
  try {
    const exerciseData = await getExerciseData_DB(req.params.exerciseID);
    res.status(200);
    res.send(exerciseData);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: "Error accessing database",
      },
    });
  }
}

module.exports = {
  getAllExercises,
  searchExercise,
  disableExercise,
  enableExercise,
  createExercise,
  getExerciseData,
  getAllActiveExercises,
};
