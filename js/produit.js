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

function btnQuantity(quantity){
    divQuantity = '<div><h2>Quantité:</h2><div class="btn-group btn-group mb-3 quantite" role="group" aria-label="Groupe de petits boutons"><button type="button" aria-label="moins" class="btn btn-secondary quantité-btn" id="btn-moins">-</button><span class="text-center quantité-text" id="quantite">'
    divQuantity += quantity;
    divQuantity += '</span><button type="button" aria-label="plus" class="btn btn-secondary quantité-btn" id="btn-plus">+</button></div></div>';
    return divQuantity;
}
function formatPrice(data, quantity){
    prixFormate = (data.price / 100) * quantity;
    prixFormate += ',00 €';
    return prixFormate;
}

function getPrice(data, quantity){
    price = '<div class="" id="prix"><h2>Prix Total TTC : <h2>'
    price += formatPrice(data,quantity);
    price += '</div>';
    return price;
}

function getSubmit(){
    submit += '<button type="button" class="btn btn-success">Ajouter au panier</button>';
    return submit;
}

function cardProduct(data){
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

fetch(link)
    .then((resp) => resp.json())
    .then(function(data){
        document.getElementById("row2").innerHTML = cardProduct(data);
        document.getElementById("btn-moins").addEventListener("click", function(){
            --quantity;
            if (quantity < 0){
                quantity = 0;
            }
        document.getElementById("prix").innerHTML = getPrice(data, quantity);
        document.getElementById("quantite").innerHTML = quantity;
        })
        document.getElementById("btn-plus").addEventListener("click", function(){
            ++quantity;
            if (quantity > 5){
                quantity = 5;
            }
        document.getElementById("prix").innerHTML = getPrice(data, quantity);
        document.getElementById("quantite").innerHTML = quantity;
        });
    })
