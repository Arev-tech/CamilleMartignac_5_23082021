let maDonnee = JSON.parse(localStorage.getItem("produit"));
let  nameProduit = '<h2>Articles</h2>' ;
let quantité = '<h2>Quantité</h2>';
let prix = '<h2>Prix</h2>';
let htmlSupprimer = '<button class="btn btn-supp btn-supprimer-article">Supprimer</button>';
let btnSupp ='<h2>Modifier</h2>';
let a = 0;
if(maDonnee === null || maDonnee == 0){
    const paniervide= '<div><h2>Le panier est vide</h2></div>';
    document.getElementById("panierVide").innerHTML = paniervide;
}
else{
    while (maDonnee[a]){
        nameProduit += maDonnee[a].nomProduit;
        nameProduit += "<br>";
        a++;
    }
    a = 0;
    while (maDonnee[a]){
        quantité += maDonnee[a].quantiteProduit;
        quantité += "<br>";
        a++;
    }
    a = 0;
    while (maDonnee[a]){
        prix += maDonnee[a].prixProduit;
        prix += "<br>";
        a++;
    }
    a = 0;
    while (maDonnee[a]){
        btnSupp += htmlSupprimer;
        btnSupp += "<br>";
        a++;
    }

    document.getElementById("titre-article").innerHTML = nameProduit;
    document.getElementById("quantité-article").innerHTML = quantité;
    document.getElementById("prix-article").innerHTML = prix;
    document.getElementById("supprimerArticle").innerHTML = btnSupp;

    //--- bouton supprimer l'article ----//

    //---Selection de tous les btn supprimer ----//
    let btn_Supprimer = document.querySelectorAll(".btn-supprimer-article");

    for (let l = 0; l < btn_Supprimer.length; l++){
        btn_Supprimer[l].addEventListener("click",(event)=>{
            event.preventDefault();
            //----- selection de l'id ------//
            let id_select_supp = maDonnee[l].idProduit;

            //methode filter pour selectionner un objet dans un tableau -----//
            maDonnee = maDonnee.filter(el => el.idProduit !== id_select_supp);
            console.log(maDonnee);

            //---- On envoie la variable dans le localStaorage ----//
            localStorage.setItem("produit", JSON.stringify(maDonnee));

            window.location.href = "panier.html";
        })
    }

    //-- bouton pour vider le panier ---//

    const btn_vider_panier_html = '<button class="btn btn-tout-supprimer-panier">Vider le panier</button>';

    //--- insertion du bouton dans le html ---//
    document.getElementById("panierLigne").insertAdjacentHTML("beforeend", btn_vider_panier_html);

    //--- la sélection de la référence du button ---//
    const btn_vider_panier = document.querySelector(".btn-tout-supprimer-panier");

    //--- Suppression la key du localStorage ---//
    btn_vider_panier.addEventListener("click",(e)=>{
        e.preventDefault;

        //---- methode remove item ---//
        localStorage.removeItem("produit");

        alert("le panier a été vidé");

        //--- recharger la page pour voir le résultat ---//
        window.location.href = "panier.html";
    });
}

//----- formulaire commande -------//

const afficherFormulaireHtml = ()=>{
    const structureFormulaire = '<div class="col-12 mt-3 formulaire"><h2 class="formulaire-titre">Remplissez le formulaire de commande</h2><form class="formulaire-champs"><label class="formulaire-champs-label" for="firstName">Prénom :</label><input class="formulaire-champs-entry text-center" type="text" id="firstName" name="prenom" required><label class="formulaire-champs-label" for="lastName">Nom :</label><input class="formulaire-champs-entry text-center" type="text" id="lastName" name="nom" required><label class="formulaire-champs-label" for="email">Email : </label><input class="formulaire-champs-entry text-center" type="email" id="email" name="email" required><label class="formulaire-champs-label text-center" for="address">Adresse : </label><textarea class="formulaire-champs-entry text-center" type="text" id="address" required></textarea><label class="formulaire-champs-label" for="city">Ville : </label><input class="formulaire-champs-entry text-center" type="text" id="city" name="ville" required><button class="btn btn-success formulaire-btn" id="Envoieformulaire" type="submit" name="envoyerFormulaire">Confirmation de la commande</button></form></div>';
    document.getElementById("formulaireCommande").innerHTML= structureFormulaire;

}
//--- affichage du formulaire-------//
afficherFormulaireHtml();
//------------addEventListener btn confirmer-------------//
const btnEnvoieFormulaire = document.getElementById("Envoieformulaire");

btnEnvoieFormulaire.addEventListener("click", (e)=>{
    e.preventDefault();
    //--------- Stocker la récupération des valeurs du formulaire dans le localStorage-----------//
    //----------Créer un objet client-------//
    let formulaireClient = {
        firstName: document.getElementById("firstName").value,
        lastName: document.getElementById("lastName").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value,
        city: document.getElementById("city").value
    }

    //-------- gestion validation formulaire----------//
    //------ controle prenom---//
    const lePrenom = formulaireClient.firstName;
    const leNom = formulaireClient.lastName;
    const lEmail = formulaireClient.email;
    const lAdress = formulaireClient.address;
    const laVille = formulaireClient.city;

    function laVilleControl(){
        if ((/^[A-Za-zéèàùûêâôë]{3,20}$/.test(laVille))){
            let client = JSON.parse(localStorage.getItem("client")); 
            client = [];
            client.push(formulaireClient);
            localStorage.setItem("client",JSON.stringify(client));
        }
        else{
            alert("Le Champ Ville a été mal rempli");
        };
    }
    function lAdressControl(){
        if ((/^[A-Za-z0-9]{5-50}$/.test(leNom))){
            laVilleControl();
        }
        else{
            alert("Le Champ Adresse a été mal rempli");
        };
    }
    function lEmailControl(){
        if ((/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(lEmail))){
            lAdressControl();
           }
        else{
            alert("Le Champ Email a été mal rempli");
        };
    }
    function nomControl(){
        if ((/^[A-Za-zéèàùûêâôë]{3,20}$/.test(leNom))){
         lEmailControl();
        }
        else{
            alert("Le Champ Nom a été mal rempli");
        };
    }
    function prenomControl(){
        if ((/^[A-Za-zéèàùûêâôë]{3,20}$/.test(lePrenom))){
         nomControl();
        }
        else{
            alert("Le Champ Prénom a été mal rempli");
        };
    }

    prenomControl();
      

    //--------- Envoie des données vers le local Storage-------//
    
    
    //----Regrouper les valeurs du formulaire et des produits-----------//
    const aEnvoyer = {
        maDonnee,
        formulaireClient
    }

    //--------Envoie de l'objet vers le serveur----------//

})