const { getUsersOfCoach_DB, getCoachFromUserID } = require(
  "../dataAccess/coach_db_access",
);
const { getWorkoutPlan_DB, addExercise_DB } = require(
  "../dataAccess/workout_plan_db",
);

// ONLY FOR USER TO GET THEIR ASSIGNED WORKOUTPLAN
async function getAssignedWorkoutPlan(req, res) {
  try {
    const workoutPlan = await getWorkoutPlan_DB(req.userID);
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
  let userID = req.userID;
  try {
    // if userID included in request body -> coach adding exercise
    // verifying userID in request is a client of the coach
    if (req.body.userID != null) {
      const coachData = await getCoachFromUserID(req.userID);
      if (coachData == undefined) {
        errorStatus = 403;
        throw new Error("User is not a coach");
      }
      const coachID = coachData.coachID;

      let clients = await getUsersOfCoach_DB(coachID);
      clients = clients.filter((client) => {
        return client.userID == req.body.userID;
      });

      if (clients.length == 0) {
        res.status(403);
        return res.send({
          error: {
            status: 403,
            message:
              `ClientID ${req.body.userID} is not one of this coach's clients.`,
          },
        });
      }
      userID = req.body.userID;
    }

    const insertedExercise = await addExercise_DB(req.body);
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
      },
    });
  }
}

module.exports = {
  getAssignedWorkoutPlan,
  addExercise,
};
