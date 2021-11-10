const getDataSofa = (id) => {
  return fetch("http://localhost:3000/api/products/" + id).then((product) => {
    return product.json();
  });
};

////////////////////////////////
// Mise en place page Product
////////////////////////////////
const addQuantity = document.getElementById("quantity");
let falseEntry = document.createElement("div");
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
      if (document.getElementById("colors").value === "") {
        document
          .getElementsByClassName("item__content__settings")[0]
          .appendChild(falseEntry);
        falseEntry.classList.add("errorMessage");
        falseEntry.style.color = "red";
        falseEntry.style.backgroundColor = "white";
        falseEntry.innerHTML =
          "<p> Ceci n'est pas une couleur. Merci de sélectionner une des couleurs proposées.</p>";
        return;
      } else {
        falseEntry.innerHTML = "";
      }
      const selectedProductToCart = {
        couch: product,
        couchColor: document.getElementById("colors").value,
        quantity: parseInt(addQuantity.value),
      };

      let cartLocalStorage = JSON.parse(
        localStorage.getItem("cartLocalStorage")
      );

      if (!cartLocalStorage || !cartLocalStorage.length) {
        cartLocalStorage = [];
      }

      const filteredCart = cartLocalStorage.filter(
        (item) =>
          item.couch._id === selectedProductToCart.couch._id &&
          item.couchColor === selectedProductToCart.couchColor
      );

      if (filteredCart && filteredCart.length) {
        filteredCart[0].quantity += selectedProductToCart.quantity;
      } else {
        cartLocalStorage.push(selectedProductToCart);
      }

      localStorage.setItem(
        "cartLocalStorage",
        JSON.stringify(cartLocalStorage)
      );
      console.log(selectedProductToCart);
    });
  });
};

getUrl();

/*
const hasColor = cartLocalStorage.filter(
    (item) => item._id === ???._id && item.color === coucholor
  );

if (hasColor && hasColor.length) {
    hasColor[0].quantity += quantity;
  } else {
    cart.push(???);
  }

*/
