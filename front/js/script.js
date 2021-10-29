////////////////////////////////
// Mise en place page Accueil
////////////////////////////////

const sofaData = () => {
    return fetch ("http://localhost:3000/api/products")
    .then(
        product => {
            return product.json()
        }
    )
}
const automat = () => {
    i=0;
    sofaData()
    .then(
        result =>{
            for (results in result[i]){
            innerHTML = "<a href=''><article><img src='" 
            + result.imageUrl +"' alt='" + result.altTxt + "'><h3 class='productName'>" 
            + result.name +"</h3><p class='productDescription'>" + result.description 
            +"</p></article>"
            i++;
            }
        }
    )
}


let insertData = document.getElementById('ask-hello')

insertData+=automat(sofaData());
