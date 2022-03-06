var StudentAjax = (function () {
  var dodajStudenta = function (student, callbackFja) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("ajaxstatus").textContent = JSON.parse(
          ajax.responseText
        ).status;
        callbackFja(null, ajax.responseText);
      } else if (this.readyState == 4 && this.status == 404) {
        callbackFja(ajax.statusText, null);
      }
    };
    ajax.open("POST", "http://localhost:3000/student", true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify(student));
  };

  var postaviGrupu = function (index, grupa, fnCallback) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("ajaxstatus").textContent = JSON.parse(
          ajax.responseText
        ).status;
        fnCallback(null, ajax.responseText);
      } else if (this.readyState == 4 && this.status == 404) {
        fnCallback(ajax.statusText, null);
      }
    };
    ajax.open("PUT", "http://localhost:3000/student/" + index, true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(JSON.stringify({ grupa: grupa }));
  };

  var dodajBatch = function (csvStudenti, fnCallback) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("ajaxstatus").textContent = JSON.parse(
          ajax.responseText
        ).status;
        fnCallback(null, ajax.responseText);
      } else if (this.readyState == 4 && this.status == 404) {
        fnCallback(ajax.statusText, null);
      }
    };

    ajax.open("POST", "http://localhost:3000/batch/student", true);
    ajax.setRequestHeader("Content-Type", "text/plain");
    ajax.send(csvStudenti);
  };

  return {
    dodajStudenta: dodajStudenta,
    postaviGrupu: postaviGrupu,
    dodajBatch: dodajBatch,
  };
})();
