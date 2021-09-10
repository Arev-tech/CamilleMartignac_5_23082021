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