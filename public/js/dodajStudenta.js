document.getElementById("potvrda").addEventListener("click", () => {
  let ime = document.getElementById("ime").value;
  let prezime = document.getElementById("prezime").value;
  let index = document.getElementById("index").value;
  let grupa = document.getElementById("grupa").value;

  StudentAjax.dodajStudenta(
    { ime: ime, prezime: prezime, index: index, grupa: grupa },
    function (error, data) {}
  );
});
