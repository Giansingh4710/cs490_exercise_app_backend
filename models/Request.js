const { DataTypes, Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

const Request = sequelize.define('Request', {
    RequestID: {type: DataTypes.INTEGER, unique: true, allowNull: false, primaryKey: true, autoIncrement: true},
    UserID: {type: DataTypes.INTEGER, unique: false, allowNull: true},
    CoachID: {type: DataTypes.INTEGER, unique: false, allowNull: true},
    Status: {type: DataTypes.STRING(16), allowNull: true}, defaultValue: 'Pending',
    Goals: {type: DataTypes.TEXT, allowNull: true},
    Note: {type: DataTypes.TEXT, allowNull: true},
    Created: {type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false},
    LastUpdate: {type: DataTypes.DATE, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'), allowNull: false}
  },
  {
    tableName: "Request",
    timestamps: false,
  }
  );

module.exports = Request;