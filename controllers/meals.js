const moment = require("moment");
const { getMealsForToday_DB, deleteMeal_DB } = require(
  "../dataAccess/meals_db.js",
);

async function getMeals(req, res) {
  try {
    const date = moment().format("YYYY-MM-DD");
    const meals = await getMealsForToday_DB(req.userID, date);
    res.status(200);
    res.send(meals);
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error getting meals from database",
      },
    });
  }
}

async function deleteMeal(req, res) {
  try {
    const deleteMeal = await deleteMeal_DB(req.userID, req.params.mealID);
    res.status(200);
    res.send({
      status: 200,
      message: "Meal deleted successfully",
      deletedMeal: {
        meal: deleteMeal,
      },
    });
  } catch (error) {
    res.status(500);
    res.send({
      error: {
        status: 500,
        message: error.message,
        details: "Error getting meals from database",
      },
    });
  }
}

module.exports = { getMeals, deleteMeal };
