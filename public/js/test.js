var assert = chai.assert;
var expect = chai.expect;
chai.should();

describe("VjezbeAjax.js", function () {
  describe("Metoda dodajInputPolja", function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });

    it("Test metode dodajInputPolja - da li se poveća broj djece diva nakon poziva funkcije", function () {
      let div = document.createElement("div");
      let brojVjezbi = 4;
      VjezbeAjax.dodajInputPolja(div, brojVjezbi);
      assert.equal(div.childNodes.length, 16);
    });

    it("Test metode dodajInputPolja - ispravni parametri, provjera da li su id i name ispravni", function () {
      let div = document.createElement("div");
      let brojVjezbi = 4;
      VjezbeAjax.dodajInputPolja(div, brojVjezbi);
      for (let i = 3; i < div.childNodes.length; i += 4) {
        assert.equal(div.childNodes[i].id, "z" + ((i + 1) / 4 - 1));
        assert.equal(div.childNodes[i].name, "z" + ((i + 1) / 4 - 1));
      }
    });

    it("Test metode dodajInputPolja - ispravni parametri, provjera da li je value na formama 4", function () {
      let div = document.createElement("div");
      let brojVjezbi = 4;
      VjezbeAjax.dodajInputPolja(div, brojVjezbi);
      for (let i = 3; i < div.childNodes.length; i += 4) {
        assert.equal(div.childNodes[i].value, 4);
      }
    });

    it("Test metode dodajInputPolja - neispravni parametri, unosi se negativan broj vježbi", function () {
      let div = document.createElement("div");
      let brojVjezbi = -5;
      VjezbeAjax.dodajInputPolja(div, brojVjezbi);
      assert.isTrue(div.childNodes.length == 0);
    });
  });
  describe("Metoda posaljiPodatke", function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });
    it("Test metode posaljiPodatke - da li je requestBody ispravan", function () {
      let data = { brojVjezbi: 3, brojZadataka: [3, 1, 4] };
      let dataString = JSON.stringify(data);

      VjezbeAjax.posaljiPodatke(data, function () {});

      expect(this.requests[0].requestBody).to.eql(dataString);
    });

    it("Test metode posaljiPodatke - da li je ispravno parsiranje zahtjeva", function () {
      let data = { brojVjezbi: 5, brojZadataka: [2, 1, 4, 5, 6] };

      VjezbeAjax.posaljiPodatke(data, function () {});

      let parsiraniZahtjev = JSON.parse(this.requests[0].requestBody);

      assert.equal(parsiraniZahtjev.brojVjezbi, 5);
      assert.equal(parsiraniZahtjev.brojZadataka.length, 5);
    });

    it("Test metode posaljiPodatke - da li POST vraća ispravan broj zadataka za vježbe", function () {
      let data = {
        brojVjezbi: 10,
        brojZadataka: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      };

      VjezbeAjax.posaljiPodatke(data, function () {});

      let brojZadataka = JSON.parse(this.requests[0].requestBody).brojZadataka;

      for (let i = 0; i < brojZadataka.length; i++) {
        assert.isTrue(brojZadataka[i] == i + 1);
      }
    });
  });
  describe("Metoda dohvatiPodatke", function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });
    it("Test metode dohvatiPodatke - da li je upućen tačno jedan zahtjev", function () {
      VjezbeAjax.dohvatiPodatke(function () {});
      assert.equal(this.requests.length, 1);
    });

    it("Test metode dohvatiPodatke - da li se izvršava asinhrono", function () {
      VjezbeAjax.dohvatiPodatke(function () {});
      assert.isTrue(this.requests[0].async);
    });

    it("Test metode dohvatiPodatke - da li je metoda GET", function () {
      VjezbeAjax.dohvatiPodatke(function () {});
      assert.equal(this.requests[0].method, "GET");
    });

    it("Test metode dohvatiPodatke - da li se šalje zahtjev na ispravan url", function () {
      VjezbeAjax.dohvatiPodatke(function () {});
      assert.equal(this.requests[0].url, "http://localhost:3000/vjezbe/");
    });
  });
  describe("Metoda iscrtajVjezbe", function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });
    it("Test metode iscrtajVjezbe - da li se ispravno iscrta 5 vježbi", function () {
      let div = document.createElement("div");
      let vjezbaObjekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5] };

      VjezbeAjax.iscrtajVjezbe(div, vjezbaObjekat);

      let brojVjezbi = div.childElementCount;

      assert.equal(brojVjezbi, 5);
    });

    it("Test metode iscrtajVjezbe - neispravan parametar brojVjezbi (veći od 15)", function () {
      let div = document.createElement("div");
      let vjezbaObjekat = { brojVjezbi: 17, brojZadataka: [0, 2, 3, 4, 5] };

      VjezbeAjax.iscrtajVjezbe(div, vjezbaObjekat);

      let brojVjezbi = div.childElementCount;
      assert.equal(brojVjezbi, 0);
    });

    it("Test metode iscrtajVjezbe - neispravan parametar brojVjezbi (manji od 0)", function () {
      let div = document.createElement("div");
      let vjezbaObjekat = { brojVjezbi: -5, brojZadataka: [0, 2, 3, 4, 5] };

      VjezbeAjax.iscrtajVjezbe(div, vjezbaObjekat);

      let brojVjezbi = div.childElementCount;
      assert.equal(brojVjezbi, 0);
    });
  });
  describe("Metoda posaljiPodatke", function () {
    beforeEach(function () {
      this.xhr = sinon.useFakeXMLHttpRequest();

      this.requests = [];
      this.xhr.onCreate = function (xhr) {
        this.requests.push(xhr);
      }.bind(this);
    });

    afterEach(function () {
      this.xhr.restore();
    });
    it("Test metode iscrtajZadatake - ispravno crtanje prvi put", function () {
      let odabirVjezbi = document.createElement("div");
      let vjezbaObjekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5] };

      VjezbeAjax.iscrtajVjezbe(odabirVjezbi, vjezbaObjekat);

      let brojZadataka = 5;
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], brojZadataka);
      assert.equal(
        odabirVjezbi.childNodes[0].childNodes[1].childElementCount,
        5
      );
    });

    it("Test metode iscrtajZadatake - provjera da li se ne crtaju zadaci dva puta za istu vježbu", function () {
      let odabirVjezbi = document.createElement("div");
      let vjezbaObjekat = { brojVjezbi: 5, brojZadataka: [1, 2, 3, 4, 5] };

      VjezbeAjax.iscrtajVjezbe(odabirVjezbi, vjezbaObjekat);

      let brojZadataka = 5;
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], brojZadataka);
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], brojZadataka);
      assert.equal(
        odabirVjezbi.childNodes[0].childNodes[1].childElementCount,
        5
      );
    });

    it("Test funkcije iscrtajZadatke() sa ispravnim parametrima, provjera da li su iscrtane 4 vjezbe", function () {
      let odabirVjezbi = document.createElement("div");
      let vjezbaObjekat = { brojVjezbi: 4, brojZadataka: [4, 4, 4, 4] };

      VjezbeAjax.iscrtajVjezbe(odabirVjezbi, vjezbaObjekat);

      let temp = odabirVjezbi.childNodes[0];
      VjezbeAjax.iscrtajZadatke(temp, 4);

      assert.equal(
        odabirVjezbi.childNodes[0].childNodes[1].length,
        temp.childNodes[1].length
      );
    });

    it("Test metode iscrtajZadatke -  ispravni parametri, unosi se različit broj zadataka za istu vježbu", function () {
      let odabirVjezbi = document.createElement("div");
      var vjezbaObjekat = { brojVjezbi: 4, brojZadataka: [4, 4, 4, 4] };
      VjezbeAjax.iscrtajVjezbe(odabirVjezbi, vjezbaObjekat);
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], 4);
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], 10);
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], 8);
      assert.equal(
        odabirVjezbi.childNodes[0].childNodes[1].childElementCount,
        4
      );
    });

    it("Test metode iscrtajZadatke -  neispravan parametar brojZadataka (veći od 10)", function () {
      var odabirVjezbi = document.createElement("div");
      var vjezbaObjekat = { brojVjezbi: 4, brojZadataka: [4, 4, 4, 4] };
      VjezbeAjax.iscrtajVjezbe(odabirVjezbi, vjezbaObjekat);
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], 14);
      assert.isUndefined(odabirVjezbi.childNodes[0].childNodes[1]);
    });

    it("Test metode iscrtajZadatke -  neispravan parametar brojZadataka (manji od 0)", function () {
      var odabirVjezbi = document.createElement("div");
      var vjezbaObjekat = { brojVjezbi: 4, brojZadataka: [4, 4, 4, 4] };
      VjezbeAjax.iscrtajVjezbe(odabirVjezbi, vjezbaObjekat);
      VjezbeAjax.iscrtajZadatke(odabirVjezbi.childNodes[0], -5);
      assert.isUndefined(odabirVjezbi.childNodes[0].childNodes[1]);
    });
  });
});
