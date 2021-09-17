let params = new URL(document.location).searchParams;
let id = params.get("id");
let link = 'http://localhost:3000/api/teddies/';
link += id;
let image;
let divImage;
let colors = '';
let divQuantity = '';
let prixFormate = '';
let price = '';
let quantity = 1;
let submit = '';

//---- créer la ligne de code de l'image de l'ours cliqué-------//
function getImage(data) {
    image = '<img src="';
    image += data.imageUrl;
    image += '" alt="';
    image += data.description;
    image += '"class ="card-img">';
    return image;
}
//-------- créer les <option> de couleurs------//
function getColors(data) {
    let a = 0;
    while (a < data.colors.length) {
        colors += '<option value="';
        colors += a;
        colors += '">';
        colors += data.colors[a];
        colors += '</option>';
        a++;
    }
    a++;
    return colors;
}
//----- création HTML btn quantity--------//
function btnQuantity(quantity) {
    divQuantity = '<div><h2>Quantité:</h2><div class="btn-group btn-group mb-3 quantite" role="group" aria-label="Groupe de petits boutons"><button type="button" aria-label="moins" class="btn btn-secondary quantité-btn" id="btn-moins">-</button><span class="text-center quantité-text" id="quantite">'
    divQuantity += quantity;
    divQuantity += '</span><button type="button" aria-label="plus" class="btn btn-secondary quantité-btn" id="btn-plus">+</button></div></div>';
    return divQuantity;
}

//------- mettre le prix dans le format XX plutot que XX00-----//
function formatPrice(data, quantity) {
    prixFormate = (data.price / 100) * quantity;
    return prixFormate;
}

//---------- Création HTML du prix de chaque ours-------//
function getPrice(data, quantity) {
    price = '<div class="" id="prix"><h2>Prix Total TTC : <h2>'
    price += formatPrice(data, quantity);
    price += ',00€ </h2></h2></div>';
    return price;
}

//-----Création btn HTML ajouter au panier-------//
function getSubmit() {
    submit += '<button type="button" class="btn btn-success" id="submit">Ajouter au panier</button>';
    return submit;
}

//--------assembler tous les éléments dans une div---------//
function cardProduct(data) {
    divImage = '<div class="col-6 panier-card text-center" id="carte-produit">';
    divImage += '<div class="card">'
    divImage += getImage(data);
    divImage += '<div class="card-body"><div class="card-title text-center"><select class="card-couleur form-select" name="couleur-choix" id="couleur-choix">'
    divImage += getColors(data);
    divImage += '</select>';
    divImage += '</div>';
    divImage += '<div class="card-text">'
    divImage += btnQuantity(quantity);
    divImage += getPrice(data, quantity);
    divImage += '</div>'
    divImage += getSubmit();
    divImage += '</div>';
    divImage += '</div>';
    divImage += '</div>';
    return divImage;
}

//--------- Récupérer les données du bon ours-------//
fetch(link)
    .then((resp) => resp.json())
    .then(function(data) {
        document.getElementById("row2").innerHTML = cardProduct(data);
        //------- intéraction avec le btn quantity----------//
        document.getElementById("btn-moins").addEventListener("click", function() {
            --quantity;
            if (quantity < 0) {
                quantity = 0;
            }
            document.getElementById("prix").innerHTML = getPrice(data, quantity);
            document.getElementById("quantite").innerHTML = quantity;
        })
        document.getElementById("btn-plus").addEventListener("click", function() {
            ++quantity;
            if (quantity > 5) {
                quantity = 5;
            }
            document.getElementById("prix").innerHTML = getPrice(data, quantity);
            document.getElementById("quantite").innerHTML = quantity;

        });
        //----- Récupération des valeurs du formulaire -----//
        document.getElementById("submit").addEventListener("click", function() {
            let optionProduit = {
                nomProduit: data.name,
                idProduit: data._id,
                quantiteProduit: quantity,
                prixProduit: prixFormate,
            };
            //--------------- Local Storage -----------------//
            //---------- Stocker la récupération des valeurs des produits ------//
            let product = JSON.parse(localStorage.getItem('produit'));
            function popupConfirmation() {
                if (window.confirm(`${quantity} ${data.name} ont bien été ajouté au panier
            Pour consultez le panier cliquez sur OK ou pour revenir à l'accueil cliquez sur ANNULER`)) {
                    window.location.href = "panier.html"
                } else {
                    window.location.href = "../index.html"
                }
            }
            function isPresent (optionProduit){
                let produit = JSON.parse(localStorage.getItem('produit'));
                let a = 0;
                while(a < produit.length){
                    if(optionProduit.idProduit == produit[a].idProduit){
                        return true;
                    }
                    else{
                        a++;
                    }
                }
                return false;
            }
            //----- Vérification si le local storage existe ---------//
            //------ Si il existe ------//
            if (product != null) {
                //------- si il y a déjà le nounours similaire dans le panier ---------//
                if(isPresent(optionProduit) == true){
                    let ProduitSame = product.filter( el => el.nomProduit == optionProduit.nomProduit);
                    ProduitSame[0].quantiteProduit += optionProduit.quantiteProduit;
                    ProduitSame[0].prixProduit += optionProduit.prixProduit;
                    console.table(ProduitSame);
                    product = product.filter( el => el.nomProduit !== optionProduit.nomProduit);
                    product.push(ProduitSame[0]);
                    console.table(product);
                    localStorage.setItem("produit", JSON.stringify(product));
                    popupConfirmation();
                }
                //----------- si il n'y a pas le nounours dans le panier encore -------//
                else{
                product.push(optionProduit);
                localStorage.setItem("produit", JSON.stringify(product));
                popupConfirmation();
                }
            }
            //----- Si il n'existe pas -------//
            else {
                product = [];
                product.push(optionProduit);
                localStorage.setItem("produit", JSON.stringify(product));
                popupConfirmation();
            }

        })
    })
    .catch(() => {
        let container = document.querySelector(".container");
        container.innerHTML = "Nous n'avons pas réussi à afficher votre page. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
    })