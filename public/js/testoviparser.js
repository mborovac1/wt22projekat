var TestoviParser = (function () {
  // pomoćne funkcije
  var imaLiObjekatSvePropertye = function (objekat) {
    return (
      objekat.hasOwnProperty("stats") &&
      objekat.hasOwnProperty("tests") &&
      objekat.hasOwnProperty("pending") &&
      objekat.hasOwnProperty("failures") &&
      objekat.hasOwnProperty("passes") &&
      objekat.stats.tests !== undefined &&
      objekat.stats.passes !== undefined &&
      objekat.stats.failures !== undefined
    );
  };

  var zaokruziRezultat = function (rezultat) {
    const eps = 0.001;
    var rez;
    // provjera da li je broj cijeli broj
    if (Math.abs(rezultat - Math.round(rezultat)) < eps) {
      rez = Math.round(rezultat); // ako je rezultat cijeli broj vraćamo ga bez decimala
    } else {
      rez = rezultat.toFixed(1); // ako rezultat nije cijeli broj vraća se zaokružen na jednu decimalu
    }
    return rez;
  };

  var dajNaziveGresaka = function (nizGresaka) {
    var rez = [];
    for (let i = 0; i < nizGresaka.length; i++)
      rez.push(nizGresaka[i].fullTitle);
    return rez;
  };

  var identicniTestovi = function (rezultat1, rezultat2) {
    // ako im je različit broj testova
    if (rezultat1.stats.tests != rezultat2.stats.tests) return false;

    var prviTestovi = rezultat1.tests;
    var drugiTestovi = rezultat2.tests;

    var nadjen = false;
    for (let i = 0; i < prviTestovi.length; i++) {
      nadjen = false;
      for (let j = 0; j < drugiTestovi.length; j++) {
        if (prviTestovi[i].fullTitle == drugiTestovi[j].fullTitle) {
          nadjen = true;
          break;
        }
      }

      if (!nadjen) return false;
    }

    return true;
  };

  var pojavljujeLiSeTestUDrugomRezultatu = function (test, rezultat) {
    for (let i = 0; i < rezultat.length; i++) {
      if (rezultat[i].fullTitle == test.fullTitle) {
        return true;
      }
    }
    return false;
  };

  var dajSveTestoveKojiSeNePojavljujuUDrugomRezultatu = function (
    rezultat1,
    rezultat2
  ) {
    var testovi = [];
    var brojTestova = 0;
    for (let i = 0; i < rezultat1.length; i++) {
      if (!pojavljujeLiSeTestUDrugomRezultatu(rezultat1[i], rezultat2)) {
        testovi.push(rezultat1[i].fullTitle);
        brojTestova++;
      }
    }
    return { testovi: testovi, brojTestova: brojTestova };
  };

  var dajTacnost = function (jsonString) {
    var tacnost;
    var greske = [];
    var parsiraniString;

    try {
      parsiraniString = JSON.parse(jsonString);
    } catch (error) {
      // ako parsiranje baci izuzetak smatramo da se testovi ne mogu izvršiti
      tacnost = "0%";
      greske = "Testovi se ne mogu izvršiti";
      return { tacnost: tacnost, greske: greske };
    }

    // ako u objektu nije dostupan neki property smatramo da se testovi ne mogu izvršiti
    if (!imaLiObjekatSvePropertye(parsiraniString)) {
      tacnost = "0%";
      greske = "Testovi se ne mogu izvršiti";
      return { tacnost: tacnost, greske: greske };
    }

    var ukupanBrojTestova = parsiraniString.stats.tests;
    var brojProslihTestova = parsiraniString.stats.passes;

    // da ne bi došlo do dijeljenja s nulom (ako je ukupanBrojTestova == 0)
    if (ukupanBrojTestova == 0) {
      tacnost = "0%";
      greske = [];
    } else {
      var rezultat = (brojProslihTestova * 100) / ukupanBrojTestova;

      tacnost = zaokruziRezultat(rezultat);
      tacnost = tacnost + "%";

      greske = dajNaziveGresaka(parsiraniString.failures);
    }

    return { tacnost: tacnost, greske: greske };
  };

  var porediRezultate = function (rezultat1, rezultat2) {
    var promjena;
    var greske = [];
    var parsiraniRezultat1, parsiraniRezultat2;

    try {
      parsiraniRezultat1 = JSON.parse(rezultat1);
      parsiraniRezultat2 = JSON.parse(rezultat2);
    } catch (error) {
      // ako parsiranje nekog od rezultata baci izuzetak smatramo da se testovi ne mogu izvršiti
      promjena = "0%";
      greske = "Testovi se ne mogu izvršiti";
      return { promjena: promjena, greske: greske };
    }

    // ako u nekom od rezultata nije dostupan neki property smatramo da se testovi ne mogu izvršiti
    if (
      !imaLiObjekatSvePropertye(parsiraniRezultat1) ||
      !imaLiObjekatSvePropertye(parsiraniRezultat2)
    ) {
      promjena = "0%";
      greske = "Testovi se ne mogu izvršiti";
      return { promjena: promjena, greske: greske };
    }

    if (identicniTestovi(parsiraniRezultat1, parsiraniRezultat2)) {
      var tacnost = dajTacnost(JSON.stringify(parsiraniRezultat2));
      promjena = tacnost.tacnost;
      greske = tacnost.greske.sort(function (a, b) {
        return a.toUpperCase().localeCompare(b.toUpperCase());
      });
    } else {
      var testoviRezultat1 = dajSveTestoveKojiSeNePojavljujuUDrugomRezultatu(
        parsiraniRezultat1.failures,
        parsiraniRezultat2.tests
      );

      // da ne bi došlo do dijeljenja s nulom
      if (testoviRezultat1.brojTestova + parsiraniRezultat2.stats.tests == 0) {
        promjena = 0 + "%";
        greske = [];
      } else {
        var rezultat =
          ((testoviRezultat1.brojTestova + parsiraniRezultat2.stats.failures) *
            100) /
          (testoviRezultat1.brojTestova + parsiraniRezultat2.stats.tests);

        promjena = zaokruziRezultat(rezultat);
        promjena = promjena + "%";

        var prvi = testoviRezultat1.testovi.sort(function (a, b) {
          return a.toUpperCase().localeCompare(b.toUpperCase());
        });
        var drugi = dajNaziveGresaka(parsiraniRezultat2.failures).sort(
          function (a, b) {
            return a.toUpperCase().localeCompare(b.toUpperCase());
          }
        );
        greske = prvi.concat(drugi);
      }
    }

    return { promjena: promjena, greske: greske };
  };

  return { dajTacnost: dajTacnost, porediRezultate: porediRezultate };
})();
