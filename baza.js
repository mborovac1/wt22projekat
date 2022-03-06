const Sequelize = require("sequelize");

const sequelize = new Sequelize("wt2118753", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  logging: false,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Grupa = require("./models/Grupa.js")(sequelize);
db.Student = require("./models/Student.js")(sequelize);
db.Vjezba = require("./models/Vjezba.js")(sequelize);
db.Zadatak = require("./models/Zadatak.js")(sequelize);

db.Vjezba.hasMany(db.Zadatak, { as: "zadaciVjezbe" });
db.Grupa.hasMany(db.Student, { as: "studentiGrupe" });

module.exports = db;
