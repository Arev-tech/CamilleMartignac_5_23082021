let maDonnee = JSON.parse(localStorage.getItem("produit"));
let nameProduit = '<h2>Articles</h2>';
let quantité = '<h2>Quantité</h2>';
let prix = '<h2>Prix</h2>';
let htmlSupprimer = '<button class="btn btn-supp btn-supprimer-article">Supprimer</button>';
let btnSupp = '<h2>Modifier</h2>';
let a = 0;
let prixFinal = 0;

// --------- si il n'y a pas d'articles dans le panier on affiche le message panier vide ------//
if (maDonnee === null || maDonnee == 0) {
    const paniervide = '<div><h2>Le panier est vide</h2></div>';
    document.getElementById("panierVide").innerHTML = paniervide;
}
// ------ si il y a des articles dans le panier, on va recuperer les données qui nous intéresse dans le localstorage -----//
else {
    while (maDonnee[a]) {
        nameProduit += maDonnee[a].nomProduit;
        nameProduit += "<br>";
        a++;
    }
    a = 0;
    while (maDonnee[a]) {
        quantité += maDonnee[a].quantiteProduit;
        quantité += "<br>";
        a++;
    }
    a = 0;
    while (maDonnee[a]) {
        prix += maDonnee[a].prixProduit;
        prix += ",00€"
        prix += "<br>";
        a++;
    }
    a = 0;
    while (maDonnee[a]) {
        btnSupp += htmlSupprimer;
        btnSupp += "<br>";
        a++;
    }
    a = 0;

    //--------- on va calculer le prix final ------------//
    function prixCalcul(maDonnee, a) {
        while (a < maDonnee.length) {
            prixFinal += maDonnee[a].prixProduit;
            a++;
        }
        localStorage.setItem("orderPrice", JSON.stringify(prixFinal));
        return prixFinal;
    }

    function prixStructure(maDonnee, a) {
        prixTotal = "<h2>Prix Total : ";
        prixTotal += prixCalcul(maDonnee, a);
        prixTotal += ",00€</h2>";
        return prixTotal;
    }

    //------ implémentation du HTML avec les données récupérées du localStorage -----//
    document.getElementById("titre-article").innerHTML = nameProduit;
    document.getElementById("quantité-article").innerHTML = quantité;
    document.getElementById("prix-article").innerHTML = prix;
    document.getElementById("supprimerArticle").innerHTML = btnSupp;
    document.getElementById("prixTotal").innerHTML = prixStructure(maDonnee, a);
    //---Selection de tous les btn supprimer ----//
    let btn_Supprimer = document.querySelectorAll(".btn-supprimer-article");

    for (let l = 0; l < btn_Supprimer.length; l++) {
        btn_Supprimer[l].addEventListener("click", (event) => {
            event.preventDefault();
            //----- selection de l'id ------//
            let id_select_supp = maDonnee[l].idProduit;

            //methode filter pour selectionner un objet dans un tableau -----//
            maDonnee = maDonnee.filter(el => el.idProduit !== id_select_supp);

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
    btn_vider_panier.addEventListener("click", (e) => {
        e.preventDefault;

        //---- methode remove item ---//
        localStorage.removeItem("produit");

        alert("le panier a été vidé");

        //--- recharger la page pour voir le résultat ---//
        window.location.href = "panier.html";
    });
}

//----- formulaire commande -------//

const afficherFormulaireHtml = () => {
    const structureFormulaire = '<div class="col-12 mt-3 formulaire"><h2 class="formulaire-titre">Remplissez le formulaire de commande</h2><form class="formulaire-champs"><label class="formulaire-champs-label" for="firstName">Prénom :</label><input class="formulaire-champs-entry text-center" type="text" id="firstName" name="prenom" required><label class="formulaire-champs-label" for="lastName">Nom :</label><input class="formulaire-champs-entry text-center" type="text" id="lastName" name="nom" required><label class="formulaire-champs-label" for="email">Email : </label><input class="formulaire-champs-entry text-center" type="email" id="email" name="email" required><label class="formulaire-champs-label text-center" for="address" required>Adresse : </label><input class="formulaire-champs-entry text-center"type="text" id="address" required></input><label class="formulaire-champs-label" for="city">Ville : </label><input class="formulaire-champs-entry text-center" type="text" id="city" name="ville" required><button class="btn btn-success formulaire-btn" id="Envoieformulaire" type="submit" name="envoyerFormulaire">Confirmation de la commande</button></form></div>';
    document.getElementById("formulaireCommande").innerHTML = structureFormulaire;

}
//--- affichage du formulaire HTML-------//
afficherFormulaireHtml();

//------------addEventListener btn confirmer-------------//
const btnEnvoieFormulaire = document.getElementById("Envoieformulaire");

btnEnvoieFormulaire.addEventListener("click", (e) => {
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
    //---- checker les champs-------//
    if (
        !formulaireClient.firstName ||
        !formulaireClient.lastName ||
        !formulaireClient.email ||
        !formulaireClient.address ||
        !formulaireClient.city
    ) {
        alert("Veillez renseigner tous les champs !");
    } else {
        e.preventDefault();        
        //----Regrouper les valeurs du formulaire et des produits en JSON apres validation -----------//
        const produitsB = [''];
        a = 0;
        function remplissageTabId(maDonnee, a, produitsB){
            while (maDonnee[a]) {
                produitsB[a] = maDonnee[a].idProduit;
                a++;
            }
            return produitsB;
        }
        
        const order = {
            contact: formulaireClient,
            products: remplissageTabId(maDonnee, a, produitsB),
        };
        //---- envoie de l'objet au serveur------//
        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: { "Content-Type": "application/json" },
        };

        fetch("http://localhost:3000/api/teddies/order", options)
            .then((response) => response.json())
            .then((data) => {
                let orderID = '';
                orderID = data.orderId;
                localStorage.setItem("orderID", JSON.stringify(orderID));
                window.location.href = "confirmation.html"
            console.log(data.orderId);
            })
            .catch((err) => {
            alert("erreur:" ,err)
        });
        
    }    
})