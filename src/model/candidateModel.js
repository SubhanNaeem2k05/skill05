const { DataTypes, STRING } = require("sequelize");
const sequelize = require("../config/db");
const candidateSignUp = sequelize.define(
  "candidatesignup",
  {
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    userEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

const candidateapplyjob = sequelize.define(
  "candidateapplyjobs",
  {
    phonenumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    education: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    resume: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    shortList: {
      type: STRING,
      allowNull: false,
    },
    InterviewCall: {
      type: STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
module.exports = {
  candidateSignUp,
  candidateapplyjob,
};
