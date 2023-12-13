const moment = require("moment");
const { insertDailySurvey_DB, dailySurveyIsCompleted_DB } = require(
  "../dataAccess/log_activity_db.js",
);

async function recordDailySurvey(req, res) {
  let errorStatus = 500;
  try {
    const date = moment().format("YYYY-MM-DD");
    const units = ["cups", "gallons", "fl oz"];
    const chosenUnit = req.body.waterData.unit.toLowerCase();
    if (!units.includes(chosenUnit)) {
      throw new Error(`Unit: ${chosenUnit} not one of : ${units.join(", ")}`);
    }

    if (await dailySurveyIsCompleted_DB(req.userID, date)) {
      errorStatus = 400;
      throw new Error("User already completed daily survey for today");
    }

    await insertDailySurvey_DB(req.body, req.userID, date);
    res.status(201);
    res.send({
      status: 201,
      message: "Daily survey recorded",
      details: "Water intake, weight, and mental state recorded",
    });
  } catch (error) {
    res.status(errorStatus);
    res.send({
      error: {
        status: errorStatus,
        message: error.message,
        details: "Error inserting into database",
      },
    });
  }
}

module.exports = { recordDailySurvey };
