const Sequelize = require("sequelize");

module.exports = function (sequelize, DataTypes) {
  const Student = sequelize.define("student", {
    ime: Sequelize.STRING,
    prezime: Sequelize.STRING,
    index: Sequelize.STRING,
  });
  return Student;
};
