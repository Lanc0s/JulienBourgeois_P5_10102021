
const getDataSofas = () => {
    return fetch ("http://localhost:3000/api/products")
    .then(
        product => {
            return product.json()
        }
    )
}

////////////////////////////////
// Mise en place page Accueil
////////////////////////////////

const insertElementHome = () => {
    getDataSofas()
    .then(
        results =>{
                for (let result of results){
                    document.getElementById('items').innerHTML += "<a href='../html/product.html?id=" 
                    + result._id + "'><article><img src='" 
                    + result.imageUrl +"' alt='" + result.altTxt + "'><h3 class='productName'>" 
                    + result.name +"</h3><p class='productDescription'>" + result.description 
                    +"</p></article></a>";
            }
        }
    )
}
insertElementHome();

