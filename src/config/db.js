const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("skillqfive", "doadmin", "AVNS_CFHFofZJCUaULLdSOk9", {
  host: "skill05database-do-user-14809774-0.c.db.ondigitalocean.com",
  dialect: "mysql",
  port: 25060
});
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

module.exports = sequelize;
