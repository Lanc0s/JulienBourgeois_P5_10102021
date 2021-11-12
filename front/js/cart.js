/*
 fetch depuis le localStorage avec une possibilité de le modifier(?)
 
 eventListener sur
        <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>

 préparer un message d'erreur sur le firstName


*/

let cartLocalStorage = JSON.parse(localStorage.getItem("cartLocalStorage"));
/*
let quantityInt = parseInt(cartLocalStorage.quantity);
const selectedProductToCart = {
  couch: cartLocalStorage.couch,
  couchColor: cartLocalStorage.couchColor,
  quantity: parseInt(cartLocalStorage.quantity),
};
console.log(selectedProductToCart);
*/
console.log(cartLocalStorage);

for (let i = 0; i < cartLocalStorage.length; i++) {
  document.getElementById("cart__items").innerHTML +=
    '<article class="cart__item" data-id="' +
    cartLocalStorage[i].couch._id +
    '"><div class="cart__item__img"> <img src="' +
    cartLocalStorage[i].couch.imageUrl +
    '" alt="' +
    cartLocalStorage[i].couch.altTxt +
    '"></div><div class="cart__item__content">' +
    '<div class="cart__item__content__titlePrice"><h2>' +
    cartLocalStorage[i].couch.name +
    "</h2><p>" +
    cartLocalStorage[i].couch.price +
    " €</p></div><p>Couleur : " +
    cartLocalStorage[i].couchColor +
    "</p><div class='cart__item__content__settings'>" +
    "<div class='cart__item__content__settings__quantity'><p> Qté : </p>" +
    "<input type='number' class='itemQuantity' name='itemQuantity' min='1' max='100' value=" +
    cartLocalStorage[i].quantity +
    '></div><div class="cart__item__content__settings__delete">' +
    '<p id="deleteItem">Supprimer</p></div></div></div>';
}
//supprimer un item
//ne fonctionne pas dans et hors de la boucle
document.getElementById("deleteItem").addEventListener("click", () => {
  cartLocalStorage[0].localStorage.removeItem();
});

//calcul quantité total
//ne fonctionne pas en int mais en str
for (let i = 0; i < cartLocalStorage.length; i++) {
  let sum = 0;
  document.getElementById("totalQuantity").innerHTML = sum +=
    cartLocalStorage[i].quantity;
}
