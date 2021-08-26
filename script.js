let quantity = 0;
document
  .getElementById("btn-moins")
  .addEventListener("click", function() {
  document
    .getElementById("quantite")
    .innerText = (--quantity) + '';
});

document
  .getElementById("btn-plus")
  .addEventListener("click", function(e) {
  e.preventDefault();
  e.stopPropagation();
  
  document
    .getElementById("quantite")
    .innerText = (++quantity) + '';
});