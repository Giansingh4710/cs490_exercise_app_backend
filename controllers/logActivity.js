const moment = require("moment");
const { hasAllKeys } = require("../utils/helper_funcs.js");
const { insertWaterIntake } = require("../dataAccess/log_activity_db.js");

async function logWaterIntake(req, res, err) {
  try {
    const requiredFields = ["amount", "unit"];
    if (!hasAllKeys(req.body, requiredFields)) {
      throw new Error("Missing Required Fields: amount, unit.");
    }

    const units = ["cups", "gallons", "fl oz"];
    const chosenUnit = req.body.unit.toLowerCase();
    if (!units.includes(chosenUnit)) {
      throw new Error(`Unit: ${chosenUnit} not one of : ${units.join(", ")}`);
    }

    const data = {
      userID: req.userID,
      intakeUnit: chosenUnit,
      intakeAmount: req.body.amount,
      date: moment().format("YYYY-MM-DD"),
    };
    if ("date" in req.body) {
      const parsedDate = moment(req.body.date, "YYYY-MM-DD", true);
      if (!parsedDate.isValid()) {
        throw new Error(
          `Invalid Date Format. ${req.body.date} is not in YYYY-MM-DD`,
        );
      }
      data.date = req.body.date;
    }
    const insertData = await insertWaterIntake(data);
    return res.status(200).send({
      message: "Water Input Recorded",
      info: insertData,
    });
  } catch (error) {
    return res.status(500).send({
      error: error.message,
      details: "Error logging water intake.",
    });
  }
}

module.exports = { logWaterIntake };
