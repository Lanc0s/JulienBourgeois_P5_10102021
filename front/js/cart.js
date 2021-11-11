/*
 fetch depuis le localStorage avec une possibilité de le modifier(?)
 
 eventListener sur
        <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>

 préparer un message d'erreur sur le firstName


*/

const getDataSofas = () => {
  return fetch("http://localhost:3000/api/products").then((product) => {
    return product.json();
  });
};
let cartLocalStorage = JSON.parse(localStorage.getItem("cartLocalStorage"));
console.log(cartLocalStorage);
getDataSofas().then(() => {
  //ne boucle pas ?
  for (let i = 0; i < cartLocalStorage.length; i++) {
    document.getElementById("cart__items").innerHTML =
      '<article class="cart__item" data-id="' +
      cartLocalStorage[i].couch._id +
      '"><div class="cart__item__img"> <img src="' +
      cartLocalStorage[i].couch.imageUrl +
      '" alt="' +
      cartLocalStorage[i].couch.altTxt +
      '"></div><div class="cart__item__content">' +
      '<div class="cart__item__content__titlePrice"><h2>' +
      cartLocalStorage[i].couch.name +
      "<br>" +
      cartLocalStorage[i].couchColor +
      "</h2><p>" +
      cartLocalStorage[i].couch.price +
      " €</p></div><div class='cart__item__content__settings'>" +
      "<div class='cart__item__content__settings__quantity'><p> Qté : </p>" +
      "<input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value=" +
      cartLocalStorage[i].quantity +
      '></div><div class="cart__item__content__settings__delete">' +
      '<p class="deleteItem">Supprimer</p></div></div></div>';
    //EUH... Où sont les couleurs? Pourquoi un input à nouveau?
  }
});
