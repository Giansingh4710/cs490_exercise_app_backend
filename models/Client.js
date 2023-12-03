const { DataTypes } = require("sequelize");
const { sequelize } = require("../sql_config/database.js");

const Client = sequelize.define(
  "User",
  {
    UserID: {
      type: DataTypes.INTEGER,
      unique: true,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    CoachID: { type: DataTypes.INTEGER, unique: true, allowNull: true },
    Email: {
      type: DataTypes.STRING(64),
      unique: true,
      allowNull: false,
      defaultValue: "example@example.com",
    },
    FirstName: {
      type: DataTypes.STRING(32),
      unique: false,
      allowNull: false,
      defaultValue: "John",
    },
    LastName: {
      type: DataTypes.STRING(32),
      unique: false,
      allowNull: false,
      defaultValue: "Doe",
    },
    Password: { type: DataTypes.STRING(32), unique: false, allowNull: false },
    PhoneNum: {
      type: DataTypes.STRING(16),
      unique: false,
      allowNull: false,
      defaultValue: "0000000000",
    },
    Role: {
      type: DataTypes.STRING(16),
      unique: false,
      allowNull: false,
      defaultValue: "role",
    },
    Gender: {
      type: DataTypes.STRING(16),
      unique: false,
      allowNull: false,
      defaultValue: "gender",
    },
    DOB: {
      type: DataTypes.DATEONLY,
      unique: false,
      allowNull: false,
      defaultValue: "0001-01-01",
    },
    Weight: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: -1,
    },
    Height: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: false,
      defaultValue: -1,
    },
    ActivityLevel: {
      type: DataTypes.STRING(32),
      unique: false,
      allowNull: false,
      defaultValue: "ActivityLevel",
    },
  },
  {
    tableName: "User",
    timestamps: false,
  },
);

module.exports = Client;
