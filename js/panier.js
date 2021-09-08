let maDonnee = JSON.parse(localStorage.getItem("produit"));
console.log(maDonnee);
let  nameProduit = '';
let a = 0;
while (maDonnee[a]){
    nameProduit += maDonnee[a].nomProduit;
    nameProduit += "<br>";
    a++;
}
console.log(nameProduit);
document.getElementById("titre-article").innerHTML = nameProduit;