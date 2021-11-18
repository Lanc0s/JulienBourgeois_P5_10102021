/*
 fetch depuis le localStorage avec une possibilité de le modifier(?)
 
 eventListener sur
        <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>

 préparer un message d'erreur sur le firstName


*/

let cartLocalStorage = JSON.parse(localStorage.getItem("cartLocalStorage"));
console.log(cartLocalStorage);

///////////////////////////////
//insertHTML couchS
///////////////////////////////

let sumTotalArticles = 0;
let sumTotalPrice = 0;

for (let i = 0; i < cartLocalStorage.length; i++) {
  const cart = cartLocalStorage[i];
  document.getElementById("cart__items").innerHTML += `
  <!--innerHTML starts here-->
  <article class="cart__item" data-id="${cart.couch._id}">
    <div class="cart__item__img">
      <img src="${cart.couch.imageUrl}" alt="${cart.couch.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__titlePrice">
        <h2>${cart.couch.name}</h2>
        <p>${cart.couch.price} €</p>
        </div>
        <p>Couleur :${cart.couchColor}</p>
        <div class='cart__item__content__settings'>
        <div class='cart__item__content__settings__quantity'>
        <p> Qté : </p>
        <input type='number' class='itemQuantity' name='itemQuantity' 
        min='1' max='100' value=${cart.quantity} onchange="changeQuantity(event, 
          '${cart.couch._id}','${cart.couchColor}');">
        </div>
        <div class="cart__item__content__settings__delete">
        <p class="deleteItem" 
        onClick="deletProduct('${cart.couch._id}','${cart.couchColor}');">Supprimer</p>
        </div>
        </div>
        </div>
        </article>`;

  ///////////////////////////////
  //calcul quantité total de couch & price
  ///////////////////////////////

  //remplacer les i par des element.closest

  let numArticles = parseInt(cartLocalStorage[i].quantity);
  sumTotalArticles += numArticles;
  sumTotalPrice +=
    cartLocalStorage[i].couch.price * cartLocalStorage[i].quantity;
}
//insertion du prix & de la quantité d'article dans l'html
document.getElementById("totalQuantity").innerHTML = sumTotalArticles;
document.getElementById("totalPrice").innerHTML = sumTotalPrice;

///////////////////////////////////////////
//modifier une quantité depuis la page cart
///////////////////////////////////////////

const changeQuantity = (event, productId, productColor) => {
  event.preventDefault();
  console.log("event.target.value = " + event.target.value);
  for (cart of cartLocalStorage) {
    if (cart.couch._id === productId && cart.couchColor === productColor) {
      cart.quantity = event.target.value;
    }
  }
  localStorage.setItem("cartLocalStorage", JSON.stringify(cartLocalStorage));
  location.reload();
};

///////////////////////////////
//supprimer un item
///////////////////////////////

const deletProduct = (productId, productColor) => {
  cartLocalStorage.splice(
    cartLocalStorage.findIndex(
      (item) => item._id === productId && item.couchColor === productColor
    ),
    1
  );
  console.log(cartLocalStorage);
  localStorage.setItem("cartLocalStorage", JSON.stringify(cartLocalStorage));
  location.reload(alert("votre produit a bien été supprimé"));
};

///////////////////////////////
//
///////////////////////////////
