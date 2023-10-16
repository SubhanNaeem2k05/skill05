const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const recruiterSignUp = sequelize.define(
  "recruiterSignUp",
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
    check: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
const recruiterJobPost = sequelize.define(
  "recruiterjopposts",
  {
    companyLogo: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    JobTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Country: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    City: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    JobDescription: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    WorkType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Salary: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Tags: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    recuriterID: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);
const recruiterProfile = sequelize.define(
  "recruiterprofile",
  {
    CompanyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CompanyEmail: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CompanyWebsiteLink: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyBio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Experience: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Categories: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    WorkingTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

console.log(recruiterSignUp === sequelize.models.recruiterSignUp);
module.exports = {
  recruiterSignUp,
  recruiterJobPost,
  recruiterProfile,
};
