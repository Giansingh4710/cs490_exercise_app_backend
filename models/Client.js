const { DataTypes, Sequelize } = require("sequelize");

// Replace 'your-mysql-database-uri' with your actual MySQL database URI
const sequelize = new Sequelize(
  // `mysql://dbuser:${process.env.DB_PASSWORD}@45.56.108.221/fitnessDB`
  "mysql://root:password@localhost/fitnessDB"
);

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
      allowNull: true,
      defaultValue: "John",
    },
    LastName: {
      type: DataTypes.STRING(32),
      unique: false,
      allowNull: true,
      defaultValue: "Doe",
    },
    Password: { type: DataTypes.STRING(32), unique: false, allowNull: true },
    PhoneNum: {
      type: DataTypes.STRING(16),
      unique: false,
      allowNull: true,
      defaultValue: "0000000000",
    },
    Role: {
      type: DataTypes.STRING(16),
      unique: false,
      allowNull: true,
      defaultValue: "role",
    },
    Gender: {
      type: DataTypes.STRING(16),
      unique: false,
      allowNull: true,
      defaultValue: "gender",
    },
    DOB: {
      type: DataTypes.DATEONLY,
      unique: false,
      allowNull: true,
      defaultValue: "0001-01-01",
    },
    Weight: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true,
      defaultValue: -1,
    },
    Height: {
      type: DataTypes.INTEGER,
      unique: false,
      allowNull: true,
      defaultValue: -1,
    },
    ActivityLevel: {
      type: DataTypes.STRING(32),
      unique: false,
      allowNull: true,
      defaultValue: "ActivityLevel",
    },
  },
  {
    tableName: "User",
    timestamps: false,
  }
);

module.exports = Client;
