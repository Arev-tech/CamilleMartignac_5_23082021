let url = 'http://localhost:3000/api/teddies';

fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        let array = data;
        let nombreDOurs = 1;
        let lengthOurs = data.length;
        let divOurs = '';

        function creationHREF(ours, n){
            href = 'href="html/';
            href += ours;
            href += '-';
            href += n;
            href += '.html"';
            return href;
        }

        function creationID(ours, n){
            id = 'id="';
            id += ours;
            id += '-';
            id += n;
            id += '">';
            return id;
        }
        function creationimgOurs(n){
            img = '<img src="';
            img += array[n].imageUrl;
            img += '" alt="';
            img += array[n].description;
            img += '" class="img-ours">';
            return img;
        }

        function creationnameOurs(n){
            nom = '<h2 class="card-title text-center">';
            nom += array[n].name;
            nom += '</h2>';
            return nom;
        }

        function creationDivOurs(n){
            let ours="ours";
            divOurs += '<a class="card card-accueil"';
            divOurs += creationHREF(ours, n);
            divOurs += creationID(ours, n);
            divOurs += creationimgOurs(n);
            divOurs += creationnameOurs(n);
            divOurs += '</a>';
        }
        function incrementationOurs(nombreDOurs,lengthOurs){
            let n = 0;
            while (nombreDOurs <= lengthOurs){
                creationDivOurs(n);
                nombreDOurs++;
                n++;
            }
        }
        
        incrementationOurs(nombreDOurs, lengthOurs);
        document.getElementById("row1").innerHTML = divOurs;

    })