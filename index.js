const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const db = require("./baza.js");

const app = express();

db.sequelize.sync();
//db.sequelize.sync({ force: true });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.use("/", express.static(path.join(__dirname, "/public")));
app.use("/", express.static(path.join(__dirname, "/public/html")));
app.use("/", express.static(path.join(__dirname, "/public/css")));
app.use("/", express.static(path.join(__dirname, "/public/images")));
app.use("/", express.static(path.join(__dirname, "/public/js")));

app.get("/vjezbe/", (req, res) => {
  let brojVjezbi = 0;
  let brojZadataka = [];
  db.Vjezba.findAll({
    include: [{ model: db.Zadatak, as: "zadaciVjezbe" }],
  }).then((vjezbe) => {
    vjezbe.forEach((vjezba) => {
      brojVjezbi = brojVjezbi + 1;
      brojZadataka.push(vjezba.zadaciVjezbe.length);
    });
    res.json({ brojVjezbi: brojVjezbi, brojZadataka: brojZadataka });
  });
});

app.post("/vjezbe", (req, res) => {
  let tijelo = req.body;
  let nadjenError = false;
  let listaGresaka = [];

  if (tijelo["brojVjezbi"] < 1 || tijelo["brojVjezbi"] > 15) {
    listaGresaka.push("brojVjezbi");
    nadjenError = true;
  } else {
    if (tijelo["brojVjezbi"] != tijelo["brojZadataka"].length) {
      listaGresaka.push("brojZadataka");
      nadjenError = true;
    }

    for (let i in tijelo["brojZadataka"]) {
      if (tijelo["brojZadataka"][i] > 10 || tijelo["brojZadataka"][i] < 0) {
        let temp = "z" + i;
        listaGresaka.push(temp);
        nadjenError = true;
      }
    }
  }

  var idZadatka = 1;
  var nizZadataka = [];
  var nizVjezbi = [];

  var brojVjezbi = tijelo["brojVjezbi"];
  var brojZadataka = tijelo["brojZadataka"];

  if (!nadjenError) {
    db.Zadatak.destroy({
      cascade: true,
      where: {},
    })
      .then(() => {
        return db.Vjezba.destroy({ cascade: true, where: {} });
      })
      .then(() => {
        for (let i = 0; i < brojVjezbi; i++) {
          nizVjezbi.push({ id: (i + 1).toString(), naziv: "Vjezba" + (i + 1) });
        }
        return db.Vjezba.bulkCreate(nizVjezbi);
      })
      .then((vjezbe) => {
        vjezbe.forEach((vjezba) => {
          for (let j = 0; j < brojZadataka[vjezba.id - 1]; j++) {
            nizZadataka.push({
              id: idZadatka.toString(),
              naziv: "Zadatak " + (j + 1),
              vjezbaId: vjezba.id,
            });
            idZadatka = idZadatka + 1;
          }
        });
        return db.Zadatak.bulkCreate(nizZadataka);
      })
      .then(() => {
        res.json({ brojVjezbi: brojVjezbi, brojZadataka: brojZadataka });
      });
  } else {
    res
      .status(404)
      .json({ status: "error", data: "Pogresan parametar " + listaGresaka });
  }
});

app.post("/student", (req, res) => {
  let ime = req.body["ime"];
  let prezime = req.body["prezime"];
  let index = req.body["index"];
  let grupa = req.body["grupa"];

  if (ime === "" || prezime === "" || index === "" || grupa === "") {
    res.json({ status: "Input polja za unos ne smiju biti prazna!" });
    return;
  } else {
    db.Student.findOne({ where: { index: index } }).then((student) => {
      if (student != null) {
        res.json({ status: "Student sa indexom " + index + " već postoji!" });
        return;
      } else {
        db.Grupa.findOrCreate({ where: { naziv: grupa } }).then(
          ([tag, uspjesno]) => {
            db.Student.create({
              ime: ime,
              prezime: prezime,
              index: index,
              grupaId: tag.id,
            }).then((tag) => {
              res.json({ status: "Kreiran student!" });
            });
          }
        );
      }
    });
  }
});

app.put("/student/:index", (req, res) => {
  let index = req.params.index;
  let grupa = req.body["grupa"];

  db.Student.findOne({ where: { index: index } }).then((student) => {
    if (student == null) {
      res.json({ status: "Student sa indexom " + index + " ne postoji" });
      return;
    } else {
      db.Grupa.findOrCreate({ where: { naziv: grupa } }).then(
        ([tag, uspjesno]) => {
          db.Student.findOne({ where: { index: index } }).then((s) => {
            db.Student.update(
              { grupaId: tag.dataValues.id },
              { where: { index: index } }
            );
            res.json({ status: "Promjenjena grupa studentu " + index });
          });
        }
      );
    }
  });
});

app.post("/batch/student", (req, res) => {
  var csvStudenti = req.body.split(/\r\n|\n/);
  //console.log(csvStudenti);
  var nizStudenata = [];

  for (let student of csvStudenti) {
    nizStudenata.push(student.split(","));
  }

  //console.log(nizStudenata);

  var brojDodanih = 0;
  var postojeciStudentiIndexi = [];
  var nizPromisea = [];
  for (let student of nizStudenata) {
    nizPromisea.push(
      db.Student.findOne({ where: { index: student[2] } }).then(
        (nadjeniStudent) => {
          if (nadjeniStudent == null) {
            brojDodanih = brojDodanih + 1;
            nizPromisea.push(
              db.Grupa.findOrCreate({ where: { naziv: student[3] } }).then(
                ([grupa, uspjesan]) => {
                  nizPromisea.push(
                    db.Student.create({
                      ime: student[0],
                      prezime: student[1],
                      index: student[2],
                      grupaId: grupa.id,
                    })
                  );
                }
              )
            );
          } else {
            postojeciStudentiIndexi.push(nadjeniStudent.index);
          }
        }
      )
    );
  }

  Promise.all(nizPromisea).then((temp) => {
    if (postojeciStudentiIndexi.length == 0) {
      res.json({ status: "Dodano " + brojDodanih + " studenata!" });
    } else {
      let poruka = "";
      poruka += "Dodano " + brojDodanih + " studenata, a studenti ";
      for (let i = 0; i < postojeciStudentiIndexi.length; i++) {
        if (i != postojeciStudentiIndexi.length - 1) {
          poruka += postojeciStudentiIndexi[i] + ", ";
        } else {
          poruka += postojeciStudentiIndexi[i];
        }
      }
      poruka += " već postoje!";
      res.json({ status: poruka });
    }
  });
});

let server = app.listen(3000, () => {
  console.log("Uspješno otvaranje porta 3000!");
});

module.exports = server;
