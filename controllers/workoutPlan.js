const moment = require("moment");
const { getUsersOfCoach_DB } = require(
  "../dataAccess/coach_db_access",
);
const { getAssignedWorkoutPlan_DB, addExercise_DB, getPersonalWorkoutPlan_DB, getLast5DaysOfWorkouts_DB} = require(
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

async function clientAddExercise(req, res) {
  let errorStatus = 500;
  try {
    const insertedExercise = await addExercise_DB(req.body, req.userID);
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

module.exports = {
  getAssignedWorkoutPlan,
  clientAddExercise,
  getPersonalWorkoutPlan,
  getLast5DaysOfWorkouts
};
