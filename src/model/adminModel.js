const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const defineAdmin = sequelize.define(
  "admin",
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = {
  defineAdmin,
};
