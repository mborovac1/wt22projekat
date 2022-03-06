document.getElementById("potvrda").addEventListener("click", () => {
  let index = document.getElementById("index").value;
  let grupa = document.getElementById("grupa").value;

  StudentAjax.postaviGrupu(index, grupa, function (error, data) {});
});
