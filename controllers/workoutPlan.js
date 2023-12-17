const moment = require("moment");
const { getUsersOfCoach_DB } = require(
  "../dataAccess/coach_db_access",
);
const {
  getAssignedWorkoutPlan_DB,
  deleteExercise_DB,
  addExercise_DB,
  getPersonalWorkoutPlan_DB,
  getLast5DaysOfWorkouts_DB,
  getExerciseDataFromPlan_DB,
  recordWorkout_DB
} = require(
  "../dataAccess/workout_plan_db",
);

// ONLY FOR USER TO GET THEIR ASSIGNED WORKOUTPLAN
async function getAssignedWorkoutPlan(req, res) {
  try {
    const workoutPlan = await getAssignedWorkoutPlan_DB(req.userID);
        let workoutPlanFormatted = {}
        workoutPlan.forEach(element => {
          element.dayOfWeek = element.dayOfWeek.toLowerCase();
          if(!(element.dayOfWeek in workoutPlanFormatted)){
            workoutPlanFormatted[element.dayOfWeek] = []
            workoutPlanFormatted[element.dayOfWeek].push({
              planID: element.planID,
              "exercise": element.name,
              sets: element.sets,
              reps: [element.reps],
              weight: [element.weight],
              metric: element.metric,
              equipment: element.equipment,
              duration: [element.duration]
            })
          }else{
            const existingExercise = workoutPlanFormatted[element.dayOfWeek].find(exercise => exercise.exercise === element.name);

            if (!existingExercise) {
              workoutPlanFormatted[element.dayOfWeek].push({
                planID: element.planID,
                "exercise": element.name,
                sets: element.sets,
                reps: [element.reps],
                weight: [element.weight],
                metric: element.metric,
                equipment: element.equipment,
                duration: [element.duration]
              });
            } else {
              existingExercise.reps.push(element.reps);
              existingExercise.weight.push(element.weight);
              existingExercise.weight.push(element.duration);
            }
          }

        });

    res.status(200);
    return res.send(workoutPlanFormatted);
  } catch (error) {
    res.status(500);
    return res.send({
      "error": {
        status: 500,
        message: "Error accessing database.",
      },
    });
  }
}

async function getAssignedWorkoutPlanForCoach(req, res){
  try {
    const workoutPlan = await getAssignedWorkoutPlan_DB(req.query.userID);
        let workoutPlanFormatted = {}
        workoutPlan.forEach(element => {
          element.dayOfWeek = element.dayOfWeek.toLowerCase();
          if(!(element.dayOfWeek in workoutPlanFormatted)){
            workoutPlanFormatted[element.dayOfWeek] = []
            workoutPlanFormatted[element.dayOfWeek].push({
              planID: element.planID,
              "exercise": element.name,
              sets: element.sets,
              reps: [element.reps],
              weight: [element.weight],
              metric: element.metric,
              equipment: element.equipment,
              duration: [element.duration]
            })
          }else{
            const existingExercise = workoutPlanFormatted[element.dayOfWeek].find(exercise => exercise.exercise === element.name);

            if (!existingExercise) {
              workoutPlanFormatted[element.dayOfWeek].push({
                planID: element.planID,
                "exercise": element.name,
                sets: element.sets,
                reps: [element.reps],
                weight: [element.weight],
                metric: element.metric,
                equipment: element.equipment,
                duration: [element.duration]
              });
            } else {
              existingExercise.reps.push(element.reps);
              existingExercise.weight.push(element.weight);
              existingExercise.weight.push(element.duration);
            }
          }

        });

    res.status(200);
    return res.send(workoutPlanFormatted);
  } catch (error) {
    res.status(500);
    return res.send({
      "error": {
        status: 500,
        message: "Error accessing database.",
      },
    });
  }
}

async function clientAddExercise(req, res) {
  try {
    const insertedExercise = await addExercise_DB(req.body, req.userID, "Client");
    res.status(201);
    return res.send({
      status: 201,
      message: "Exercise added to workout",
    });
  } catch (error) {
    res.status(500);
    return res.send({
      "error": {
        status: 500,
        message: "Error accessing database.",
        details: error.message
      }
    });
  }
}

async function coachAddExercise(req, res){
  // req.userID -> userid of caoch
  // req.body.userID -> userid of client

  try {
    console.log(req.body);
    const insertedExercise = await addExercise_DB(req.body, req.body.userID, "Coach");
    res.status(201);
    return res.send({
      status: 201,
      message: "Exercise added to workout",
    });
  } catch (error) {
    res.status(500);
    return res.send({
      "error": {
        status: 500,
        message: "Error accessing database.",
        details: error.message
      }
    });
  }

}

async function getPersonalWorkoutPlan(req, res){
  try {
    const workoutPlan = await getPersonalWorkoutPlan_DB(req.userID);
        let workoutPlanFormatted = {}
        workoutPlan.forEach(element => {
          element.dayOfWeek = element.dayOfWeek.toLowerCase();
          if(!(element.dayOfWeek in workoutPlanFormatted)){
            workoutPlanFormatted[element.dayOfWeek] = []
            workoutPlanFormatted[element.dayOfWeek].push({
              planID: element.planID,
              "exercise": element.name,
              sets: element.sets,
              reps: [element.reps],
              weight: [element.weight],
              metric: element.metric,
              equipment: element.equipment,
              duration: [element.duration]
            })
          }else{
            const existingExercise = workoutPlanFormatted[element.dayOfWeek].find(exercise => exercise.exercise === element.name);

            if (!existingExercise) {
              workoutPlanFormatted[element.dayOfWeek].push({
                planID: element.planID,
                "exercise": element.name,
                sets: element.sets,
                reps: [element.reps],
                weight: [element.weight],
                metric: element.metric,
                equipment: element.equipment,
                duration: [element.duration]
              });
            } else {
              existingExercise.reps.push(element.reps);
              existingExercise.weight.push(element.weight);
              existingExercise.weight.push(element.duration);
            }
          }

        });

    res.status(200);
    return res.send(workoutPlanFormatted);
  } catch (error) {
    res.status(500);
    return res.send({
      "error": {
        status: 500,
        message: "Error accessing database.",
      },
    });
  }
}

async function getLast5DaysOfWorkouts(req, res){
  try{
    const today = moment().format("YYYY-MM-DD");
    const startDate = moment().subtract(5,'d').format('YYYY-MM-DD');
    const recordedWorkouts = await getLast5DaysOfWorkouts_DB(req.userID, startDate, today);
    let workoutPlanFormatted = {}
    recordedWorkouts.forEach(element => {
      element.date = new Date(element.date).toISOString().split("T")[0];
      if(!(element.date in workoutPlanFormatted)){
        workoutPlanFormatted[element.date] = []
        workoutPlanFormatted[element.date].push({
          exerciseID: element.exerciseID,
          "exercise": element.name,
          sets: element.sets,
          reps: [element.reps],
          weight: [element.weight],
          metric: element.metric,
          duration: [element.duration]
        })
      }else{
        const existingExercise = workoutPlanFormatted[element.date].find(exercise => exercise.exercise === element.name);

        if (!existingExercise) {
          workoutPlanFormatted[element.date].push({
            exerciseID: element.exerciseID,
            "exercise": element.name,
            sets: element.sets,
            reps: [element.reps],
            weight: [element.weight],
            metric: element.metric,
            equipment: element.equipment,
            duration: [element.duration]
          });
        } else {
          existingExercise.reps.push(element.reps);
          existingExercise.weight.push(element.weight);
          existingExercise.weight.push(element.duration);
        }
      }
    });
    res.status(200);
    res.send(workoutPlanFormatted);
  }catch(error){
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: "Error getting last 5 days of workouts"
      }
    })
  }
}

async function clientEditExercise(req, res){
  try{
    // get exercise information like metrics to update properly
    const exerciseData = await getExerciseDataFromPlan_DB(req.body.planID);

    const updateExerciseData = {
      planID: req.body.planID,
      sets: req.body.sets,
      metric: exerciseData.metric,
      dayOfWeek: exerciseData.dayOfWeek,
      exerciseID: exerciseData.exerciseID,
    }

    // delete old exercises
    await deleteExercise_DB(exerciseData.exerciseID, exerciseData.dayOfWeek, req.userID, 'Client');
    
    // add back exercises
    const updatedExercise = await addExercise_DB(updateExerciseData, req.userID, 'Client');

    res.status(200);
    res.send(updatedExercise);
  }catch(error){
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message
      }
    })

  }
}

async function clientDeleteExercise(req, res){
  try{
    // get exercise information like metrics to update properly
    const exerciseData = await getExerciseDataFromPlan_DB(req.query.planID);

    // delete old exercises
    await deleteExercise_DB(exerciseData.exerciseID, exerciseData.dayOfWeek, req.userID, 'Client');
    res.status(200);
    res.send({
      message: "Exercise Deleted"
    })
  }catch(error){
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message
      }
    })
  }

}

async function recordWorkout(req, res){
  try{
    console.log(req.body);
    const exerciseData = await getExerciseDataFromPlan_DB(req.body.planID);

    const insertWorkout = {
      planID: req.body.planID,
      sets: req.body.sets,
      date: req.body.date,
      metric: exerciseData.metric,
      dayOfWeek: exerciseData.dayOfWeek,
      exerciseID: exerciseData.exerciseID,
    }
    console.log(insertWorkout);
    const recordedWorkout = await recordWorkout_DB(insertWorkout);
    res.status(201);
    return res.send({
      status: 201,
      message: "Workout recorded",
    });
  }catch(error){
    res.status(500);
    return res.send({
      status: 500,
      message: "Error recording workout",
    });
  }
}

module.exports = {
  getAssignedWorkoutPlan,
  clientAddExercise,
  getPersonalWorkoutPlan,
  getLast5DaysOfWorkouts,
  coachAddExercise,
  clientEditExercise,
  clientDeleteExercise,
  recordWorkout,
  getAssignedWorkoutPlanForCoach
};
