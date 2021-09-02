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

function getImage(data){
    image = '<img src="';
    image += data.imageUrl;
    image += '" alt="';
    image += data.description;
    image += '"class ="card-img">';
    return image;
}

function getColors(data){
    let a = 0;
    while (a < data.colors.length){
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

function btnQuantity(){
    divQuantity = '<div><h2>Quantité:</h2><div class="btn-group btn-group mb-3 quantité" role="group" aria-label="Groupe de petits boutons"><button type="button" aria-label="moins" class="btn btn-secondary quantité-btn" id="btn-moins">-</button><span class="text-center quantité-text" id="quantite">0</span><button type="button" aria-label="plus" class="btn btn-secondary quantité-btn" id="btn-plus">+</button></div></div>';
    return divQuantity;
}
function formatPrice(data){
    prixFormate = data.price / 100;
    prixFormate += ',00 €';
    console.log(prixFormate);
    return prixFormate;
}

function getPrice(data){
    price = '<div class="" id="prix"><h2>Prix : <h2>'
    price += formatPrice(data);
    price += '</div>';
    return price;
}

function cardProduct(data){
    divImage = '<div class="col-12 panier-card text-center" id="carte-produit">';
    divImage += '<div class="card">'
    divImage += getImage(data);
    divImage += '<div class="card-body"><div class="card-title text-center"><select class="card-couleur form-select" name="couleur-choix" id="couleur-choix">'
    divImage += getColors(data); 
    divImage += '</select>';
    divImage += '</div>';
    divImage += '<div class="card-text">'
    divImage += btnQuantity();
    divImage += getPrice(data);
    divImage += '</div>'
    divImage += '</div>';
    divImage += '</div>';
    divImage += '</div>';
    return divImage;
}

fetch(link)
    .then((resp) => resp.json())
    .then(function(data){
        document.getElementById("row2").innerHTML = cardProduct(data);
    })