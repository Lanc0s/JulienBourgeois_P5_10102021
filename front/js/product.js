
const getDataSofa = (id) => {
    return fetch ("http://localhost:3000/api/products/" + id)
    .then(
        product => {
            return product.json()
        }
    )
}

////////////////////////////////
// Mise en place page Product
////////////////////////////////
 

 //ok je sais pas ce que je fais mais ça marche
 //  https://javascript.info/url
 // ! ! ! ! ! https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams
const getUrl = () => {
    let baseUrl = (window.location).href;
    
    let url = new URL(baseUrl);
    
    let search_params = url.searchParams;
    
    let sofaId = search_params.get('id');
    
    getDataSofa(sofaId)
    
    .then(
    
        result =>{
            document.getElementById('title').innerHTML = result.name;
            document.getElementById("price").innerHTML = result.price;
            document.getElementById('description').innerHTML = result.description;
            document.getElementsByClassName('item__img')[0].innerHTML = "<img src='" 
                + result.imageUrl + "' alt=" + result.altTxt + ">";
            for (let i=0; i < result.colors.length; i++){    
            document.getElementById('colors').innerHTML += "<option value='" 
            + result.colors[i] + "'>" + result.colors[i] + "</option>";
            }
        
        }
    )
};

getUrl();