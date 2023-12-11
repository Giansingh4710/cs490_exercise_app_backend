const moment = require("moment");
const {
    getMeals_DB
} = require("../dataAccess/meals_db");

async function getMeals(req, res){
    const date = moment().format("YYYY-MM-DD");
    try{
        const meals = await getMeals_DB(req.userID, date);
        res.status(200).send(meals);
    }catch(error){
        res.status(500).send({
            error: {
                status: 500,
                message: "Error accessing database",
                details: "Error getting meals from database"
            }
        })
    }

}

module.exports = {
    getMeals
}