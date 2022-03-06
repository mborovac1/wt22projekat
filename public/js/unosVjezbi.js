var dugme = document.getElementById("potvrda");
dugme.addEventListener("click", () => {
  let zadaci = document.getElementById("zadaci");
  let brojVjezbi = document.getElementById("broj");
  let dugme2 = document.getElementById("posalji");
  if (dugme2.style.display === "none") dugme2.style.display = "block";
  else if (
    dugme2.style.display === "block" &&
    (brojVjezbi.value < 1 || brojVjezbi.value > 15)
  ) {
    dugme2.style.display = "none";
  }
  VjezbeAjax.dodajInputPolja(zadaci, brojVjezbi.value);
});

var dugme2 = document.getElementById("posalji");
dugme2.addEventListener("click", () => {
  let brojVjezbi = document.getElementById("broj");
  var zadaciNiz = [];

  for (let i = 0; i < brojVjezbi.value; i++) {
    zadaciNiz.push(document.getElementById("z" + i).value);
  }

  vjezbeObjekat = { brojVjezbi: brojVjezbi.value, brojZadataka: zadaciNiz };

  VjezbeAjax.posaljiPodatke(vjezbeObjekat, (err, data) => {
    if (err) console.log(err);
    else console.log("Podaci su ispravni");
  });
});
