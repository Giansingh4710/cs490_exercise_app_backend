const { Error } = require('sequelize');
const WaterIntake = require('../models/WaterIntake.js');

class WaterIntakeRepository{

    async insertWaterIntake(waterIntake){
        try{
            WaterIntake.create(waterIntake);
        }catch(error){
            console.error(error)
        }
    }

}

module.exports = new WaterIntakeRepository();