const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const WaterIntake = sequelize.define('Coach', {

    Created: {type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false},
    LastUpdate: {type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false}
  },
  {
    tableName: "Coach",
    timestamps: false,
  }
  );

module.exports = WaterIntake;