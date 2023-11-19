const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const WaterIntake = sequelize.define('WaterIntake', {
    WaterID: {type: DataTypes.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true},
    UserID: {type: DataTypes.INTEGER, unique: false, allowNull: false},
    Date: {type: DataTypes.DATE, allowNull: false},
    IntakeAmount: {type: DataTypes.FLOAT, allowNull: false},
    IntakeUnit: {type: DataTypes.STRING(32), allowNull: false},
    Created: {type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false},
    LastUpdate: {type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false}
  },
  {
    tableName: "WaterIntake",
    timestamps: false,
  }
  );

module.exports = WaterIntake;