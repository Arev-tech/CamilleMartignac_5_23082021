let orderReturn = localStorage.getItem("orderID");
let orderPrice = localStorage.getItem("orderPrice");
let confirmHTML = "";
function implementeconfirm(orderPrice, orderReturn){
    confirmHTML = '<div class="col text-center"><p>Nous vous confirmons la prise en charge de votre commande numéro :<br><strong>';
    confirmHTML += orderReturn;
    confirmHTML += '</strong><br>du montant de : <strong>';
    confirmHTML += orderPrice;
    confirmHTML += ',00€</strong></p></div>';
    return confirmHTML;
}

document.getElementById("confirm").innerHTML = implementeconfirm(orderPrice, orderReturn);