const chai = require("chai");
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

var assert = chai.assert;
var expect = chai.expect;
chai.should();

const server = require("./index.js");
const Sequelize = require("sequelize");
const db = require("./baza.js");

function isprazniBazu(done) {
  db.Student.destroy({ where: {} }).then(() => {
    db.Grupa.destroy({ where: {} }).then(() => {
      db.Zadatak.destroy({ where: {} }).then(() => {
        db.Vjezba.destroy({ where: {} }).then(() => {
          db.Vjezba.destroy({ where: {} }).then(function () {
            db.query("ALTER TABLE vjezba AUTO_INCREMENT = 1").then(() => {
              db.query("ALTER TABLE zadatak AUTO_INCREMENT = 1").then(() => {
                db.query("ALTER TABLE grupa AUTO_INCREMENT = 1").then(() => {
                  db.query("ALTER TABLE student AUTO_INCREMENT = 1").then(() =>
                    done()
                  );
                });
              });
            });
          });
        });
      });
    });
  });
}

describe("StudentAjax.js", function () {
  describe("Ruta POST/student", function () {
    before((done) => {
      db.sequelize.sync();
      done();
    });

    beforeEach((done) => {
      isprazniBazu(done);
      done();
    });

    after((done) => {
      done();
    });

    it("Dodavanje studenta na praznu bazu", (done) => {
      chai
        .request(server)
        .post("/student")
        .set("Content-Type", "application/json")
        .send({
          ime: "Muhamed",
          prezime: "Borovac",
          index: "18753",
          grupa: "Grupa 1",
        })
        .end((err, res) => {
          res.should.have.status(200);
          db.Student.count().then((rezultat) => {
            assert.equal(rezultat, 4);
            done();
          });
          done();
        });
    });

    it("Kreiranje studenta koji već postoji", (done) => {
      db.Grupa.create({ naziv: "Grupa 1" })
        .then(() => {
          db.Student.create({
            ime: "Muhamed",
            prezime: "Borovac",
            index: "18753",
            grupaId: 1,
          });
        })
        .then(() => {
          chai
            .request(server)
            .post("/student")
            .set("Content-Type", "application/json")
            .send({
              ime: "Test",
              prezime: "Test",
              index: "18753",
              grupa: "Grupa 1",
            })
            .end((err, res) => {
              assert.equal(res.body.status, "Kreiran student!");
              done();
            });
        });
    });
  });
  describe("Ruta PUT/student/:index", function () {
    before((done) => {
      db.sequelize.sync();
      done();
    });

    beforeEach((done) => {
      isprazniBazu(done);
      done();
    });

    after((done) => {
      done();
    });

    it("Mijenjanje grupe studentu koji već postoji", (done) => {
      db.Grupa.bulkCreate([{ naziv: "Grupa 1" }, { naziv: "Grupa 2" }]).then(
        () => {
          db.Student.create({
            ime: "Muhamed",
            prezime: "Borovac",
            index: "18753",
            grupaId: 1,
          })
            .then(() => {
              chai
                .request(server)
                .put("/student/18753")
                .set("Content-Type", "application/json")
                .send({
                  grupa: "Grupa 2",
                })
                .end((err, res) => {
                  assert.equal(
                    res.body.status,
                    "Promjenjena grupa studentu 18753"
                  );
                  db.Student.findOne({
                    where: {
                      index: "18753",
                    },
                  }).then(function (result) {
                    assert.exists(result);
                    assert.equal(result.dataValues.grupaId, 2);
                    db.Grupa.count().then(function (result) {
                      assert.equal(result, 2);
                      done();
                    });
                  });
                });
            })
            .catch(() => done());
        }
      );
    });

    it("Slanje studenta koji ne postoji", function (done) {
      chai
        .request(server)
        .put("/student/99999")
        .set("Content-Type", "application/json")
        .send({
          grupa: "Grupa 9",
        })
        .end(function (err, res) {
          assert.equal(res.body.status, "Student sa indexom 99999 ne postoji");
          done();
        });
    });
  });
  describe("Ruta POST/batch/student", function () {
    before((done) => {
      db.sequelize.sync();
      done();
    });

    beforeEach((done) => {
      isprazniBazu(done);
      done();
    });

    after((done) => {
      done();
    });
    it("Dodavanje batch za studenta, baza već ima drugog i četvrtog studenta", (done) => {
      chai
        .request(server)
        .post("/student")
        .set("Content-Type", "application/json")
        .send({
          ime: "hasa",
          prezime: "hasic",
          index: "2",
          grupa: "Grupa1",
        })
        .end(function (err, res) {
          chai
            .request(server)
            .post("/student")
            .set("Content-Type", "application/json")
            .send({
              ime: "fata",
              prezime: "fatic",
              index: "4",
              grupa: "Grupa1",
            })
            .end(function (err, res) {
              csvString =
                "huso,husic,1,Grupa1\r\nhasa,hasic,2,Grupa2\r\nneko,nekic,3,Grupa3\r\nfata,fatic,4,Grupa1\r\nneko,nekic,3,Grupa3\r\nneko,nekic,3,Grupa3\r\nneko,nekic,3,Grupa3";
              chai
                .request(server)
                .post("/batch/student")
                .set("Content-Type", "text/plain")
                .send(csvString)
                .end(function (err, res) {
                  assert.equal(
                    res.body.status,
                    "Dodano 5 studenata, a studenti 2, 4 već postoje!"
                  );
                  db.Student.count()
                    .then(function (result) {
                      assert.equal(result, 4);
                      db.Grupa.count().then(function (result) {
                        assert.equal(result, 2);
                        done();
                      });
                    })
                    .catch(() => done());
                });
            });
        });
    });

    it("Kreiranje studenata koji ne postoje u grupe koje postoje", function (done) {
      let csv = "Fata,Fatic,18532,Grupa 2\r\nSuljo,Suljic,19423,Grupa 1";
      chai
        .request(server)
        .post("/batch/student")
        .set("Content-Type", "text/plain")
        .send(csv)
        .end(function (err, res) {
          assert.equal(res.body.status, "Dodano 2 studenata!");
          db.Student.findOne({ where: { index: 18532 } })
            .then(function (s) {
              assert.equal(s.dataValues.ime, "Fata");
              assert.equal(s.dataValues.grupaId, 2);
              done();
            })
            .catch(() => done());
        });
    });
  });
});
