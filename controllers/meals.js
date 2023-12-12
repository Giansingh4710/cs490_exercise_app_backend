const moment = require("moment");
const {
    getMeals_DB,
    deleteMeal_DB
} = require("../dataAccess/meals_db");

async function getMeals(req, res){
    const date = moment().format("YYYY-MM-DD");
    try{
        const meals = await getMeals_DB(req.userID, date);
        return res.status(200).send(meals);
    }catch(error){
        return res.status(500).send({
            error: {
                status: 500,
                message: "Error accessing database",
                details: "Error getting meals from database"
            }
        })
    }
}

async function deleteMeal(req, res){

    try{
        const deleteMeal = await deleteMeal_DB(req.userID, req.params.mealID);
        return res.status(200).send({
            status: 200,
            message: "Meal deleted successfully",
            deletedMeal: {
                meal: deleteMeal
            }
        })
    }catch(error){
        return res.status(500).send({
            error: {
                status: 500,
                message: "Error accessing database",
                details: "Error getting meals from database"
            }
        })
    }

}

module.exports = {
    getMeals,
    deleteMeal
}