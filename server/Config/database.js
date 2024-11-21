const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("avodocamusics", "root", "NawinPham01042003", {
  host: "localhost",
  port: 3308,
  dialect: "mysql",
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

module.exports = sequelize;
