//----- recupération de l'orderID et du prix total ----------//
let orderReturn = localStorage.getItem("orderID");
let orderPrice = localStorage.getItem("orderPrice");
let confirmHTML = "";

//--------creation code HTML de la confirmation----//
function implementeconfirm(orderPrice, orderReturn) {
    confirmHTML = '<div class="col text-center"><p>Nous vous remercions pour votre commande numéro :<br><strong>';
    confirmHTML += orderReturn;
    confirmHTML += '</strong><br>du montant de : <strong>';
    confirmHTML += orderPrice;
    confirmHTML += ',00€</strong><br> Nous mettons tout en oeuvre pour la traiter dans les plus brefs délais !</p></div>';
    return confirmHTML;
}
//--------- insert du HTML---------//
document.getElementById("confirm").innerHTML = implementeconfirm(orderPrice, orderReturn);