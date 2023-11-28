const waterIntakeRepository = require('../DataAccess/WaterIntakeRepository.js');

class WaterIntakeService{

    async recordWaterIntake(waterIntake){
        try{
            return await waterIntakeRepository.insertWaterIntake(waterIntake);
        }catch(error){
            console.log("WaterIntakeService.js: Error inserting water intake");
            throw new Error("Error inserting water intake");
        }
    }

}

module.exports = new WaterIntakeService();