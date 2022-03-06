var VjezbeAjax = (function () {
  var dodajInputPolja = function (DOMelementDIVauFormi, brojVjezbi) {
    var ispis = "";

    if (brojVjezbi >= 0 && brojVjezbi <= 15) {
      for (let i = 0; i < brojVjezbi; i++) {
        ispis +=
          "<br><label>Broj zadataka u vježbi " +
          i +
          ": </label><br>" +
          "<input type=number id=z" +
          i +
          " name=z" +
          i +
          " value=4>";
      }
    } else {
      console.log("Pogrešan parametar brojVjezbi");
    }

    DOMelementDIVauFormi.innerHTML = ispis;
  };

  var posaljiPodatke = function (vjezbeObjekat, callbackFja) {
    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callbackFja(null, this.responseText);
      } else if (this.readyState == 4 && this.status == 404) {
        callbackFja(this.statusText, null);
      }
    };

    ajax.open("POST", "http://localhost:3000/vjezbe", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(vjezbeObjekat));
  };

  var dohvatiPodatke = function (callbackFja) {
    const ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        callbackFja(null, this.responseText);
      } else if (this.readyState == 4 && this.status == 404) {
        callbackFja(this.statusText, null);
      }
    };

    ajax.open("GET", "http://localhost:3000/vjezbe/", true);
    ajax.send();
  };

  var iscrtajVjezbe = function (divDOMelement, vjezbaObjekat) {
    if (vjezbaObjekat["brojVjezbi"] < 1 || vjezbaObjekat["brojVjezbi"] > 15) {
      return;
    }

    for (let i = 0; i < vjezbaObjekat["brojVjezbi"]; i++) {
      let vjezba = document.createElement("div");
      vjezba.setAttribute("id", "vjezbe" + (i + 1));
      vjezba.setAttribute("class", "vjezba");
      vjezba.setAttribute("value", vjezbaObjekat["brojZadataka"][i]);
      vjezba.onclick = function () {
        iscrtajZadatke(vjezba, vjezbaObjekat["brojZadataka"][i]);
      };
      let tekstDiv = document.createElement("div");
      tekstDiv.setAttribute("class", "vjezbe");

      let tekst = document.createTextNode("VJEŽBA " + (i + 1));
      tekstDiv.appendChild(tekst);
      vjezba.appendChild(tekstDiv);
      divDOMelement.appendChild(vjezba);
    }
  };

  var iscrtajZadatke = function (vjezbaDOMelement, brojZadataka) {
    if (brojZadataka < 0 || brojZadataka > 10) {
      return;
    }

    var sveVjezbe = vjezbaDOMelement.parentNode;
    let indeks = Array.prototype.indexOf.call(
      sveVjezbe.childNodes,
      vjezbaDOMelement
    );
    for (let i = 0; i < sveVjezbe.childElementCount; i++) {
      if (sveVjezbe.childNodes[i].childElementCount > 1) {
        if (i != indeks) {
          sveVjezbe.childNodes[i].childNodes[1].style.display = "none";
        } else {
          sveVjezbe.childNodes[i].childNodes[1].style.display = "flex";
        }
      }
    }

    if (vjezbaDOMelement.childNodes.length == 1) {
      let zadaci = document.createElement("div");

      if (vjezbaDOMelement.childNodes.length == 1) {
        zadaci.setAttribute("id", "zadaci");
        for (let i = 0; i < brojZadataka; i++) {
          let zadatak = document.createElement("div");
          zadatak.setAttribute("class", "zadatak");
          let tekst = document.createTextNode("ZADATAK " + (i + 1));
          zadatak.appendChild(tekst);
          zadaci.appendChild(zadatak);
        }

        vjezbaDOMelement.appendChild(zadaci);
      }
    }
  };

  return {
    dodajInputPolja: dodajInputPolja,
    posaljiPodatke: posaljiPodatke,
    dohvatiPodatke: dohvatiPodatke,
    iscrtajVjezbe: iscrtajVjezbe,
    iscrtajZadatke: iscrtajZadatke,
  };
})();
