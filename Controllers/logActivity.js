const { validationResult, check } = require('express-validator');
const WaterIntakeService = require('../Services/WaterIntakeService.js')

const logWaterIntake = async function(request, response, error){

    const requiredFields = ["amount", "unit"]
    if(!hasAllKeys(request.body, requiredFields)){
        console.log("logWaterInput.js: Missing required fields.")
        return response.status(400).send({"Access-Control-Allow-Origin": '*', "error": "Missing required field", "message": "Request is missing required some field. Required Fields: amount, unit."})
    }

    // catch json format error
    if(error instanceof SyntaxError){
        console.log(error)
        return response.status(400).send({"Access-Control-Allow-Origin": '*', "error": "Invalid JSON", "message": "The request body is not well-formed JSON."})
    }

    // check for json format
    if(!request.is('*/json')){
        console.log("logWaterInput.js: Invalid request format. Please request in JSON format.")
        return response.status(415).send({"Access-Control-Allow-Origin": '*', "error": "Invalid request format. Please request in JSON format."})
    }

    // create data object for data layer
    data = {}

    /*  check for valid unit
        valid units: pints, cups, gallons,
    */
    const units = ["pints", "cups", "gallons"]
    if(!request.body.unit in units){
        console.log("logWaterInput.js: Invalid input unit.")
        return response.status(400).send({"Access-Control-Allow-Origin": '*', "error": "Invalid unit", "message": "Invalid intake unit."})
    }
    data["IntakeUnit"] = request.body.unit.toLowerCase();

    // check for valid water intake value
    // check for negative number
    if(request.body.amount <= 0){
        console.log("logWaterInput.js: Invalid water intake amount")
        return response.status(400).send({"Access-Control-Allow-Origin": '*', "error": "Bad Request", "message": "Invalid water intake amount, water intake amount must be nonnegative."})
    }
    // check for number too large to fit in db
    data["IntakeAmount"] = request.body.amount;

    // check if date included in request
    if("date" in request.body){
        // check if date is valid. date format: yyyy-mm-dd, and a real date, not in future too
        
            console.error("logWaterInput.js: Invalid Date");
            return response.status(400).send({"Access-Control-Allow-Origin": '*', "error": "Invalid Date", "message": "Invalid Date"})
        

        data["Date"] = request.body.date;
        console.log("_______________________________________________________"+data.Date)
    }else{
        data["Date"] = "2023-11-18";
    }

    /*  
        add userID field.
        adding until session is working
    */
    data["UserID"] = 1;


    // check if user is in DB. Need to wait for user sessioning to be implemented

    // Insert water input
    try{
        await WaterIntakeService.recordWaterIntake(data);
    }catch(error){
        console.log("logActivity.js: Error recording water intake")
        return response.status(500).send({"Access-Control-Allow-Origin": '*', "error": "Error recording water intake", message: "Error inserting water intake to database"});
    }

    return response.status(200).send({"Access-Control-Allow-Origin": '*', "message": "Water Input Recorded"})
}

function hasAllKeys(object, keys){
    for (const key of keys) {
        if (!(key in object)) {
          return false;
        }
    }
    return true;
}

module.exports = { 
    logWaterIntake
}