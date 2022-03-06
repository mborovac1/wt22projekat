let assert = chai.assert;
describe("TestoviParser", function () {
  describe("Funkcija porediRezultate", function () {
    it("Test metode porediRezultate - identični testovi, tačnost drugog testa 100%", function () {
      var test1 = {
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
            title: "should draw 2 columns in row 2 when parameter are 2,3",
            fullTitle:
              "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
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

      var test2 = {
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

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );
      assert.equal(JSON.stringify(test), '{"promjena":"100%","greske":[]}');
    });

    it("Test metode porediRezultate - identični testovi, tačnost drugog testa 0% + sortiranje", function () {
      var test1 = {
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
            title: "should draw 2 columns in row 2 when parameter are 2,3",
            fullTitle:
              "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
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

      var test2 = {
        stats: {
          suites: 2,
          tests: 2,
          passes: 0,
          pending: 0,
          failures: 2,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
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
        ],
        pending: [],
        failures: [
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
        passes: [],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "0%",
        greske: [
          "Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3",
          "Tabela crtaj() should draw 3 rows when parameter are 2,3",
        ],
      });
    });

    it("Test metode porediRezultate - identični testovi, promjena decimalan broj", function () {
      var test1 = {
        stats: {
          suites: 2,
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
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
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test2 = {
        stats: {
          suites: 3,
          tests: 3,
          passes: 2,
          pending: 0,
          failures: 1,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "66.7%",
        greske: ["Funkcija porediRezultate() test 1"],
      });
    });

    it("Test metode porediRezultate - identični testovi, promjena cijeli broj + sortiranje", function () {
      var test1 = {
        stats: {
          suites: 5,
          tests: 5,
          passes: 3,
          pending: 0,
          failures: 2,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
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
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test2 = {
        stats: {
          suites: 5,
          tests: 5,
          passes: 1,
          pending: 0,
          failures: 4,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },

          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },

          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },

          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
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
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.equal(
        JSON.stringify(test),
        '{"promjena":"20%","greske":["Funkcija porediRezultate() test 1","Funkcija porediRezultate() test 2","Funkcija porediRezultate() test 4","Funkcija porediRezultate() test 5"]}'
      );
    });

    it("Test metode porediRezultate - različiti testovi, promjena decimalan broj", function () {
      var test1 = {
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [],
      };

      var test2 = {
        stats: {
          suites: 4,
          tests: 4,
          passes: 1,
          pending: 0,
          failures: 3,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 6",
            fullTitle: "Funkcija porediRezultate() test 6",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 6",
            fullTitle: "Funkcija porediRezultate() test 6",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.equal(
        JSON.stringify(test),
        '{"promjena":"83.3%","greske":["Funkcija porediRezultate() test 1","Funkcija porediRezultate() test 2","Funkcija porediRezultate() test 3","Funkcija porediRezultate() test 4","Funkcija porediRezultate() test 5"]}'
      );
    });

    it("Test metode porediRezultate - različiti testovi, promjena cijeli broj + sortiranje", function () {
      var test1 = {
        stats: {
          suites: 5,
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test2 = {
        stats: {
          suites: 4,
          tests: 4,
          passes: 2,
          pending: 0,
          failures: 2,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 5",
            fullTitle: "Funkcija porediRezultate() test 5",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "60%",
        greske: [
          "Funkcija porediRezultate() test 2",
          "Funkcija porediRezultate() test 1",
          "Funkcija porediRezultate() test 3",
        ],
      });
    });

    it("Test metode porediRezultate - različiti testovi, svi testovi koji padaju u rezultatu1 se nalaze u rezultatu2", function () {
      var test1 = {
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
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [],
      };

      var test2 = {
        stats: {
          suites: 4,
          tests: 4,
          passes: 3,
          pending: 0,
          failures: 1,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
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
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "25%",
        greske: ["Funkcija porediRezultate() test 4"],
      });
    });

    it("Test metode porediRezultate - različiti testovi, svi testovi padaju i nema presjeka između rezultata1 i rezultata2", function () {
      var test1 = {
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
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [],
      };

      var test2 = {
        stats: {
          suites: 1,
          tests: 1,
          passes: 0,
          pending: 0,
          failures: 1,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "100%",
        greske: [
          "Funkcija porediRezultate() test 1",
          "Funkcija porediRezultate() test 2",
          "Funkcija porediRezultate() test 3",
          "Funkcija porediRezultate() test 4",
        ],
      });
    });

    it("Test metode porediRezultate - različiti testovi, nema presjeka između rezultata1 i rezultata2 te pada jedan test u rezultatu2", function () {
      var test1 = {
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
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 1",
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [],
      };

      var test2 = {
        stats: {
          suites: 2,
          tests: 2,
          passes: 1,
          pending: 0,
          failures: 1,
          start: "2021-11-05T15:00:26.343Z",
          end: "2021-11-05T15:00:26.352Z",
          duration: 9,
        },
        tests: [
          {
            title: "test 6",
            fullTitle: "Funkcija porediRezultate() test 6",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        pending: [],
        failures: [
          {
            title: "test 4",
            fullTitle: "Funkcija porediRezultate() test 4",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
        passes: [
          {
            title: "test 6",
            fullTitle: "Funkcija porediRezultate() test 6",
            file: null,
            duration: 0,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "80%",
        greske: [
          "Funkcija porediRezultate() test 1",
          "Funkcija porediRezultate() test 2",
          "Funkcija porediRezultate() test 3",
          "Funkcija porediRezultate() test 4",
        ],
      });
    });

    it("Test metode porediRezultate - testovi padaju, ne mogu se izvršiti (neispravan format prvog rezultata)", function () {
      var test1 =
        '{"stats"}:{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}';
      var test2 =
        '{"stats":{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}';

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });

    it("Test metode porediRezultate - testovi padaju, ne mogu se izvršiti (neispravan format drugog rezultata)", function () {
      var test1 =
        '{"stats":{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}';

      var test2 =
        '{"stats"}:{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}';

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });

    it("Test metode porediRezultate - testovi padaju, ne mogu se izvršiti (u prvom rezultatu nedostaje property stats.passes)", function () {
      var test1 = {
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
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
            fullTitle: "Funkcija porediRezultate() test 1",
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
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test2 =
        '{"stats"}:{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}';

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });

    it("Test metode porediRezultate - testovi padaju, ne mogu se izvršiti (u drugom rezultatu nedostaje property failures)", function () {
      var test1 =
        '{"stats":{"suites":2,"tests":2,"passes":2,"pending":0,"failures":0,"start":"2021-11-05T15:00:26.343Z","end":"2021-11-05T15:00:26.352Z","duration":9},"tests":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}],"pending":[],"failures":[],"passes":[{"title":"should draw 3 rows when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 3 rows when parameter are 2,3","file":null,"duration":1,"currentRetry":0,"speed":"fast","err":{}},{"title":"should draw 2 columns in row 2 when parameter are 2,3","fullTitle":"Tabela crtaj() should draw 2 columns in row 2 when parameter are 2,3","file":null,"duration":0,"currentRetry":0,"speed":"fast","err":{}}]}';

      var test2 = {
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
            fullTitle: "Funkcija porediRezultate() test 1",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 2",
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
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
            fullTitle: "Funkcija porediRezultate() test 2",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
          {
            title: "test 3",
            fullTitle: "Funkcija porediRezultate() test 3",
            file: null,
            duration: 1,
            currentRetry: 0,
            speed: "fast",
            err: {},
          },
        ],
      };

      var test = TestoviParser.porediRezultate(
        JSON.stringify(test1),
        JSON.stringify(test2)
      );

      assert.deepEqual(test, {
        promjena: "0%",
        greske: "Testovi se ne mogu izvršiti",
      });
    });
  });
});
