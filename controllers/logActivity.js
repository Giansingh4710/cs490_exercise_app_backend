const moment = require("moment");
const { hasAllKeys } = require("../utils/helper_funcs.js");
const { insertDailySurvey, dailySurveyIsCompleted } = require("../dataAccess/log_activity_db.js");

async function recordDailySurvey(req, res){
    const date = moment().format("YYYY-MM-DD");
    // record water
    const units = ["cups", "gallons", "fl oz"];
    const chosenUnit = req.body.waterData.unit.toLowerCase();
    if (!units.includes(chosenUnit)) {
      throw new Error(`Unit: ${chosenUnit} not one of : ${units.join(", ")}`);
    }

    // transactions used to ensure all parts of daily survey are inserted together
    try{
        if(await dailySurveyIsCompleted(req.userID, date)){
            return res.status(400).send({
                error: {
                    status: 400,
                    message: "User already completed daily survey",
                    details: "User has already completed the daily survey for today " + date
                }
            });
        }
        await insertDailySurvey(req.body, req.userID, date);
        return res.status(201).send({
            status: 201,
            message: "Daily survey recorded",
            details: "Water intake, weight, and mental state recorded"
        })
    }catch(error){
        return res.status(500).send({
            "error": {
                status: 500,
                message: "Error inserting into database",
                details: error.message
            }
        })
    }
}

module.exports = { recordDailySurvey };
