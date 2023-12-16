const { getAllExercises_DB, searchExercise_DB, deleteExercise_DB, createExercise_DB, getExerciseData_DB } = require("../dataAccess/exercise_db.js");

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

async function deleteExercise(req, res) {
  try {
    const exerciseID = req.query.exerciseID;
    const exerciseData = await deleteExercise_DB(
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
        details: "Error trying to delete Exercise from database.",
      },
    });
  }
}

async function createExercise(req, res) {
  try {
    const newExercise = await createExercise_DB(req.body);
    res.status(201)
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

async function getExerciseData(req, res){
  try{
    const exerciseData = await getExerciseData_DB(req.params.exerciseID);
    res.status(200);
    return res.send(exerciseData);
  }catch(error){
    res.send(500);
    res.send({
      error:{
        status: 500,
        message: "Error accessing database"
      }
    })
  }
}

module.exports = { getAllExercises, searchExercise, deleteExercise, createExercise, getExerciseData };
