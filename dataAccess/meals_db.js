const { connection } = require("../sql_config/database");

async function getMeals_DB(userID, date){
    const query = "SELECT foodName, mealType, calories, date from FoodIntake WHERE userID = ? AND date = ? ORDER BY mealType"
    const [res, _] = await connection.promise().query(query, [userID, date]);
    let meals = {}
    res.forEach(meal => {
        const mealTypeKey = meal.mealType.toLowerCase();
    
        if (!(mealTypeKey in meals)) {
            meals[mealTypeKey] = [];
        }
    
        meals[mealTypeKey].push({
            foodName: meal.foodName,
            calories: meal.calories
        });
    });
    return meals;
}

module.exports = {
    getMeals_DB
}