let url = 'http://localhost:3000/api/teddies';

fetch(url)
    .then((resp) => resp.json())
    .then(function(data){
        let array = data;
        let nombreDOurs = 1;
        let lengthOurs = data.length;
        let divOurs = '';

        function creationHREF(){
            href = 'href="html/ours.html"';
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
            let ours="ours";
            divOurs += '<a class="card card-accueil" onclick="getId(this.id)"';
            divOurs += creationHREF();
            divOurs += creationID(ours, n);
            divOurs += creationImgOurs(n);
            divOurs += creationNameOurs(n);
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
        function creationImgOurs(n){
            divImgProduit = '<img src="';
            divImgProduit += array[n].imageUrl;
            divImgProduit += '" alt="';
            divImgProduit += array[n].description;
            divImgProduit += '" class="img-ours">';
            return divImgProduit;
        }
        
        function getId(id){
            if(id == "id=ours-4>"){
              let result = creationImgOurs(4);
              document.getElementById("img-ours-produit").innerHTML = result;
              
            }
           else{
             const elt = document.getElementById('test1');  
              elt.innerHTML = id;
           }
        }
        incrementationOurs(nombreDOurs, lengthOurs);
        document.getElementById("row1").innerHTML = divOurs;
        getId(id);
        console.log(id);
    })