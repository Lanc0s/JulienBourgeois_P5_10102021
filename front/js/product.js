const getDataSofa = (id) => {
  return fetch("http://localhost:3000/api/products/" + id).then((product) => {
    return product.json();
  });
};

////////////////////////////////
// Mise en place page Product
////////////////////////////////
const addQuantity = document.getElementById("quantity");

//ok je sais pas ce que je fais mais ça marche
//  https://javascript.info/url
// ! ! ! ! ! https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams
const getUrl = () => {
  //premiere fonction
  // let id = geturl()
  let baseUrl = window.location.href;

  let url = new URL(baseUrl);

  let search_params = url.searchParams;

  let sofaId = search_params.get("id");

  getDataSofa(sofaId).then((product) => {
    //deuxieme fonction
    document.getElementById("title").innerHTML = product.name;
    document.getElementById("price").innerHTML = product.price;
    document.getElementById("description").innerHTML = product.description;
    document.getElementsByClassName("item__img")[0].innerHTML =
      "<img src='" + product.imageUrl + "' alt=" + product.altTxt + ">";
    for (let i = 0; i < product.colors.length; i++) {
      document.getElementById("colors").innerHTML +=
        "<option value='" +
        product.colors[i] +
        "'>" +
        product.colors[i] +
        "</option>";
    }

    //autre truc
    document.getElementById("addToCart").addEventListener("click", () => {
      const localCart = {
        couch: product,
        couchColor: document.getElementById("colors").value,
        quantity: addQuantity.value,
      };

      let addToCart = JSON.parse(localStorage.getItem("addToCart"));
      if (!addToCart || !addToCart.length) {
        addToCart = [];
      }

      addToCart.push(localCart);

      localStorage.setItem("addToCart", JSON.stringify(addToCart));
      console.log(localCart);
    });
  });
};

getUrl();

/*
const hasColor = addToCart.filter(
    (product) => product._id === item._id && product.color === color
  );

if (hasColor && hasColor.length) {
    hasColor[0].quantity += quantity;
  } else {
    cart.push(item);
  }

storage.setItem("cart", JSON.stringify(cart));
*/
