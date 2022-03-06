window.onload = function () {
  VjezbeAjax.dohvatiPodatke(function (error, data) {
    var divOdabirVjezbe = document.getElementById("odabirVjezbe");
    VjezbeAjax.iscrtajVjezbe(divOdabirVjezbe, JSON.parse(data));
  });
};
