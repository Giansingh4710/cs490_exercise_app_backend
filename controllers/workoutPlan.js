const { getUsersOfCoach_DB, getCoachFromUserID } = require(
  "../dataAccess/coach_db_access",
);
const { getAssignedWorkoutPlan_DB, addExercise_DB, getPersonalWorkoutPlan_DB} = require(
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
              "exercise": element.name,
              sets: element.sets,
              reps: [element.reps],
              weight: element.weight,
              metric: element.metric,
              equipment: element.equipment
            })
          }else{
            const existingExercise = workoutPlanFormatted[element.dayOfWeek].find(exercise => exercise.exercise === element.name);

            if (!existingExercise) {
              workoutPlanFormatted[element.dayOfWeek].push({
                "exercise": element.name,
                sets: element.sets,
                reps: [element.reps],
                weight: element.weight,
                metric: element.metric,
                equipment: element.equipment
              });
            } else {
              existingExercise.reps.push(element.reps);
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

async function addExercise(req, res) {
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
              "exercise": element.name,
              sets: element.sets,
              reps: [element.reps],
              weight: element.weight,
              metric: element.metric,
              equipment: element.equipment
            })
          }else{
            const existingExercise = workoutPlanFormatted[element.dayOfWeek].find(exercise => exercise.exercise === element.name);

            if (!existingExercise) {
              workoutPlanFormatted[element.dayOfWeek].push({
                "exercise": element.name,
                sets: element.sets,
                reps: [element.reps],
                weight: element.weight,
                metric: element.metric,
                equipment: element.equipment
              });
            } else {
              existingExercise.reps.push(element.reps);
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

module.exports = {
  getAssignedWorkoutPlan,
  addExercise,
  getPersonalWorkoutPlan
};
