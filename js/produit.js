let link = 'http://localhost:3000/api/teddies';

fetch(link)
    .then((resp) => resp.json())
    .then(function(data){
        let array = data;
        let divImgProduit = '';
        let nombreDOurs = 1;
        let lengthOurs = data.length;

        function creationImgOurs(n){
            divImgProduit = '<img src="';
            divImgProduit += array[n].imageUrl;
            divImgProduit += '" alt="';
            divImgProduit += array[n].description;
            divImgProduit += '" class="img-ours">';
            return divImgProduit;
        }
        function getId(monId){ 
            console.log(id); 
        } 
        creationImgOurs(3);
        document.getElementById("img-ours-produit").innerHTML = divImgProduit;
        console.log(divImgProduit);
    })