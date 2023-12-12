const { createConnection } = require("../sql_config/database.js");
const connection = createConnection();

async function getMeals_DB(userID, date){
    const query = "SELECT foodID, foodName, mealType, calories, date from FoodIntake WHERE userID = ? AND date = ? ORDER BY mealType"
    const [res, _] = await connection.promise().query(query, [userID, date]);
    let meals = {}
    res.forEach(meal => {
        const mealTypeKey = meal.mealType.toLowerCase();
    
        if (!(mealTypeKey in meals)) {
            meals[mealTypeKey] = [];
        }
    
        meals[mealTypeKey].push({
            id: meal.foodID,
            foodName: meal.foodName,
            calories: meal.calories
        });
    });
    return meals;
}

async function deleteMeal_DB(userID, mealID){
    const query = "DELETE FROM FoodIntake WHERE userID = ? AND foodID = ?"
    const[res, _] = await connection.promise().query(query, [userID, mealID])
    return res;
}

module.exports = {
    getMeals_DB,
    deleteMeal_DB
}