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

//  https://javascript.info/url
// ! ! ! ! ! https://developer.mozilla.org/fr/docs/Web/API/URLSearchParams
const getUrl = () => {
  //Fonction pour récup l'id dans l'url après le ?id=
  let baseUrl = window.location.href;

  let url = new URL(baseUrl);

  let search_params = url.searchParams;

  let sofaId = search_params.get("id");

  //fonction gérant la page
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

    //Ajout au localStorage du/des produits
    document.getElementById("addToCart").addEventListener("click", () => {
      //Sécurité choix de couleur
      if (document.getElementById("colors").value === "") {
        document
          .getElementsByClassName("item__content__settings")[0]
          .appendChild(falseEntry);
        falseEntry.classList.add("errorMessage");
        falseEntry.style.fontWeight = "bold";
        falseEntry.style.textDecoration = "underline";
        falseEntry.innerHTML =
          "<p> Ceci n'est pas une couleur. Merci de sélectionner une des couleurs proposées.</p>";
        return;
      } else if (document.getElementById("quantity").value == 0) {
        document
          .getElementsByClassName("item__content__settings")[0]
          .appendChild(falseEntry);
        falseEntry.classList.add("errorMessage");
        falseEntry.style.fontWeight = "bold";
        falseEntry.style.textDecoration = "underline";
        falseEntry.innerHTML =
          "<p>Attention, vous n'avez pas sélectionné de quantité.</p>";
        return;
      } else {
        falseEntry.innerHTML = "";
      }
      //création de l'objet pour contenir les produits
      const selectedProductToCart = {
        couch: product,
        couchColor: document.getElementById("colors").value,
        quantity: parseInt(addQuantity.value),
      };
      //ajout au local storage

      //devrait pas être plus bas?
      let cartLocalStorage = JSON.parse(
        localStorage.getItem("cartLocalStorage")
      );
      //création d'un array pour stocker l'objet avant le JSON
      if (!cartLocalStorage || !cartLocalStorage.length) {
        cartLocalStorage = [];
      }
      //concat plusieurs ajouts même produit
      const filteredCart = cartLocalStorage.filter(
        (item) =>
          item.couch._id === selectedProductToCart.couch._id &&
          item.couchColor === selectedProductToCart.couchColor
      );

      if (filteredCart && filteredCart.length) {
        filteredCart[0].quantity += selectedProductToCart.quantity;
      } else {
        //push vers l'array
        cartLocalStorage.push(selectedProductToCart);
      }
      //morph de l'objet en JSON
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
