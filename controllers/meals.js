const moment = require("moment");

const {
  getMealsForToday_DB,
  deleteMeal_DB,
  createMeal_DB,
} = require("../dataAccess/meals_db");

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
        message: "Error accessing database",
        details: "Error getting meals from database",
      },
    });
  }
}

async function createMeal(req, res) {
  const date = moment().format("YYYY-MM-DD");
  // validate input
  const nutrientsRegex = new RegExp("^[0-9]+$");
  if (
    !(nutrientsRegex.test(req.body.calories) &&
      nutrientsRegex.test(req.body.protein) &&
      nutrientsRegex.test(req.body.fat))
  ) {
    return res.status(400).send({
      error: {
        status: 400,
        message: "Invalid nutrients",
        details: "Nutrients values must be integers and positive",
      },
    });
  }

  try {
    const mealInsert = await createMeal_DB(req.body, date, req.userID);
    return res.status(201).send({
      message: "Meal recorded",
      id: mealInsert.insertId,
    });
  } catch (error) {
    return res.status(500).send({
      error: {
        status: 500,
        message: "Error accessing database",
        details: "Error inserting meal into database",
      },
    });
  }
}

module.exports = {
  getMeals,
  deleteMeal,
  createMeal,
};
