let url = 'http://localhost:3000/api/teddies';

fetch(url)
    .then((resp) => resp.json())
    .catch((error) => {
        let container = document.querySelector(".container");
        container.innerHTML = "Nous n'avons pas réussi à afficher nos nounours. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
    })
    .then(function(data){
        let array = data;
        let nombreDOurs = 1;
        let lengthOurs = data.length;
        let divOurs = '';
        let titre = '';
        function creationHREF(data, n){
            href = 'href="html/ours.html?id=';
            href += data[n]._id;
            href += '">';
            return href;
        }
        function creationImgOurs(n){
            img = '<img src="';
            img += array[n].imageUrl;
            img += '" alt="';
            img += array[n].description;
            img += '" class="img-ours">';
            return img;
        }
        function creationNameOurs(n){
            nom = '<h2 class="card-title text-center">';
            nom += array[n].name;
            nom += '</h2>';
            return nom;
        }
        function creationDivOurs(n){
            divOurs += '<a class="card card-accueil" onclick="getId(this.id)"';
            divOurs += creationHREF(data, n);
            divOurs += creationImgOurs(n);
            divOurs += creationNameOurs(n);
            divOurs += '</a>';
            divOurs += '</div>';
        }
        function incrementationOurs(nombreDOurs,lengthOurs){
            let n = 0;
            while (nombreDOurs <= lengthOurs){
                creationDivOurs(n);
                nombreDOurs++;
                n++;
            }
        }
        function creationImgOurs(n){
            divImgProduit = '<img src="';
            divImgProduit += array[n].imageUrl;
            divImgProduit += '" alt="';
            divImgProduit += array[n].description;
            divImgProduit += '" class="img-ours">';
            return divImgProduit;
        }
        function getTitre(){
            titre += '<h1 class="text-center">Ours en peluche</h1><h2 class="text-center">Sélectionnez le modèle qui vous intéresse : </h2>';
            return titre;
        }
        incrementationOurs(nombreDOurs, lengthOurs);
        document.getElementById("row-hero").innerHTML = getTitre();
        document.getElementById("row1").innerHTML = divOurs;  
    })