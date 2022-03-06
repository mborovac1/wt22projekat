let assert = chai.assert;
describe("TestoviParser", function () {
  describe("dajTacnost()", function () {
    it("prolaze svi testovi (prvi primjer iz postavke spirale)", function () {
      var json = {
        stats: {
          suites: 2,
          tests: 2,
          passes: 2,
          pending: 0,
          failures: 0,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "should draw 3 rows when parameter are 2,3",
            fullTitle:
              "Tabela crtaj() should draw 3 rows when parameter are 2,3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "should draw 2 columns in row 2 when parameter are 2,3",
            fullTitle:
              "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [],
        passes: [
          {
            title: "should draw 3 rows when parameter are 2,3",
            fullTitle:
              "Tabela crtaj() should draw 3 rows when parameter are 2,3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "should draw 2 columns in row 2 when parameter are 2,3",
            fullTitle:
              "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };
      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.equal(JSON.stringify(test), '{"tacnost":"100%","greske":[]}');
    });

    it("prolaze svi testovi (drugi primjer iz postavke spirale)", function () {
      var test = TestoviParser.dajTacnost(
        '{"stats":{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}'
      );
      assert.deepEqual(test, { tacnost: "100%", greske: [] });
    });

    it("padaju svi testovi", function () {
      var json = {
        stats: {
          suites: 3,
          tests: 3,
          passes: 0,
          pending: 0,
          failures: 3,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [],
      };

      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.deepEqual(test, {
        tacnost: "0%",
        greske: [
          "Funkcija dajTacnost() test 1",
          "Funkcija dajTacnost() test 2",
          "Funkcija dajTacnost() test 3",
        ],
      });
    });

    it("prolazi samo jedan test - test decimalnog prostora", function () {
      var json = {
        stats: {
          suites: 3,
          tests: 3,
          passes: 1,
          pending: 0,
          failures: 2,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.deepEqual(test, {
        tacnost: "33.3%",
        greske: [
          "Funkcija dajTacnost() test 1",
          "Funkcija dajTacnost() test 2",
        ],
      });
    });

    it("testovi padaju - ne mogu se izvršiti (neispravan format stringa)", function () {
      var test = TestoviParser.dajTacnost(
        '{"stats"}:{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}'
      );
      assert.deepEqual(test, {
        tacnost: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });

    it("prolazi samo jedan test - test cijeli broj", function () {
      var json = {
        stats: {
          suites: 4,
          tests: 5,
          passes: 2,
          pending: 0,
          failures: 3,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija dajTacnost() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija dajTacnost() test 5",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija dajTacnost() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija dajTacnost() test 5",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.deepEqual(test, {
        tacnost: "40%",
        greske: [
          "Funkcija dajTacnost() test 1",
          "Funkcija dajTacnost() test 4",
          "Funkcija dajTacnost() test 5",
        ],
      });
    });

    it("testovi padaju - ne mogu se izvršiti (u stringu nedostaje property failures)", function () {
      var json = {
        stats: {
          suites: 3,
          tests: 3,
          passes: 2,
          pending: 0,
          failures: 3,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        passes: [
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.deepEqual(test, {
        tacnost: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });

    it("testovi padaju - ne mogu se izvršiti (u stringu nedostaje property stats.passes)", function () {
      var json = {
        stats: {
          suites: 3,
          tests: 3,
          pending: 0,
          failures: 1,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 1",
            fullTitle: "Funkcija dajTacnost() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 2",
            fullTitle: "Funkcija dajTacnost() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija dajTacnost() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.deepEqual(test, {
        tacnost: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });

    it("rubni slučaj - nema nijednog testa", function () {
      var json = {
        stats: {
          suites: 0,
          tests: 0,
          passes: 0,
          pending: 0,
          failures: 0,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [],
        pending: [],
        failures: [],
        passes: [],
      };
      var test = TestoviParser.dajTacnost(JSON.stringify(json));
      assert.deepEqual(test, {
        tacnost: "0%",
        greske: [],
      });
    });
  });
});
