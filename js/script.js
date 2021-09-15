let url = 'http://localhost:3000/api/teddies';
//---------- récupérer les données de l'API ---------//
fetch(url)
    .then((resp) => resp.json())
    //----- si on a pas réussi à récupérer les données----//
    .catch((error) => {
        let container = document.querySelector(".container");
        container.innerHTML = "Nous n'avons pas réussi à afficher nos nounours. Avez-vous bien lancé le serveur local (Port 3000) ? <br>Si le problème persiste, contactez-nous.";
    })
    .then(function(data) {
        let array = data;
        let nombreDOurs = 1;
        let lengthOurs = data.length;
        let divOurs = '';
        let titre = '';

        //------- création HTML du lien vers la page produit de l'ours--------//
        function creationHREF(data, n) {
            href = 'href="html/ours.html?id=';
            href += data[n]._id;
            href += '">';
            return href;
        }
        //----------- création HTML de l'image de l'ours---------//
        function creationImgOurs(n) {
            img = '<img src="';
            img += array[n].imageUrl;
            img += '" alt="';
            img += array[n].description;
            img += '" class="img-ours">';
            return img;
        }

        //------création de la ligne de code du nom de l'ours------//
        function creationNameOurs(n) {
            nom = '<h2 class="card-title text-center">';
            nom += array[n].name;
            nom += '</h2>';
            return nom;
        }

        //---------création de la div de l'ours-----------//
        function creationDivOurs(n) {
            divOurs += '<a class="card card-accueil" onclick="getId(this.id)"';
            divOurs += creationHREF(data, n);
            divOurs += creationImgOurs(n);
            divOurs += creationNameOurs(n);
            divOurs += '</a>';
        }
        // création de la boucle pour créer la div de tous les ours------//
        function incrementationOurs(nombreDOurs, lengthOurs) {
            let n = 0;
            while (nombreDOurs <= lengthOurs) {
                creationDivOurs(n);
                nombreDOurs++;
                n++;
            }
        }

        //-------- création HTML du titre de la page
        function getTitre() {
            titre += '<h1 class="text-center">Ours en peluche</h1><h2 class="text-center">Sélectionnez le modèle qui vous intéresse : </h2>';
            return titre;
        }
        incrementationOurs(nombreDOurs, lengthOurs);
        //----- Le titre va dans la div "row-hero"------//
        document.getElementById("row-hero").innerHTML = getTitre();
        document.getElementById("row1").innerHTML = divOurs;
    })