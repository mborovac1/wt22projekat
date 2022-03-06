document.getElementById("potvrda").addEventListener("click", () => {
  var csvStudenti = document.getElementById("unosStudenata").value;
  StudentAjax.dodajBatch(csvStudenti, (error, data) => {});
});
