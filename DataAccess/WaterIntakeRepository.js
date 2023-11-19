const WaterIntake = require('../models/WaterIntake.js');

class WaterIntakeRepository{

    async insertWaterIntake(waterIntake){
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++"+waterIntake.Date)
        WaterIntake.create(waterIntake);
    }

}

module.exports = new WaterIntakeRepository();