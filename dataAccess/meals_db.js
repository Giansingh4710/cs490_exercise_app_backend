const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getMealsForToday_DB(userID, date) {
  const query =
    "SELECT foodID, foodName, mealType, calories, date from FoodIntake WHERE userID = ? AND date = ? ORDER BY mealType";
  const [rows, _] = await connection.promise().query(query, [userID, date]);
  let meals = {};
  rows.forEach((meal) => {
    const mealTypeKey = meal.mealType.toLowerCase();

    if (!(mealTypeKey in meals)) {
      meals[mealTypeKey] = [];
    }

    meals[mealTypeKey].push({
      id: meal.foodID,
      foodName: meal.foodName,
      calories: meal.calories,
    });
  });
  return meals;
}

async function deleteMeal_DB(userID, mealID) {
  const query = "DELETE FROM FoodIntake WHERE userID = ? AND foodID = ?";
  const [rows, _] = await connection.promise().query(query, [userID, mealID]);
  return rows;
}

async function createMeal_DB(mealData, date, userID){
    const query = "INSERT INTO FoodIntake(userID, foodName, mealType, calories, protein, fat, date) VALUES(?, ?, ?, ?, ?, ?, ?)"
    const [res, _] = await connection.promise().query(query, [userID, mealData.mealName, mealData.mealType, mealData.calories, mealData.protein, mealData.fat, date])
    return res;
}

module.exports = {
    getMealsForToday_DB,
    deleteMeal_DB,
    createMeal_DB
}

