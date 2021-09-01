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
        
        function prix(data, n){
            let prix = data[n].price;
            prix = prix / 100;
            prix += ',00€';
            return prix;
        }
        function recuperationColors(data, n){
            let a = 0;
            let b = 0;
            while (a <= lengthOurs){
                while(b <= data[n].colors.length){

                }
                
            } 
        }
        console.log(data[1].colors.length);
        document.getElementById('prix').innerHTML = prix(data, 0);
    })